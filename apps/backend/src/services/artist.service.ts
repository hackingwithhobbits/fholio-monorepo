// apps/backend/src/services/artist.service.ts

import { supabase } from '../config/database';
import { Artist, ArtistWeek, WeekArtist } from '../types/database.types';

export class ArtistService {
    /**
 * Get artist profile
 */
async getArtistProfile(artistId: string) {
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('id', artistId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get artist's weekly performance history
 */
async getArtistHistory(artistId: string, limit: number = 10) {
  const { data, error } = await supabase
    .from('artist_week')
    .select(`
      *,
      week:weeks(week_number, week_starting, week_ending)
    `)
    .eq('artist_id', artistId)
    .order('week.week_starting', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

/**
 * Get artist performance for specific week
 */
async getArtistWeekPerformance(artistId: string, weekId: string) {
  const { data, error } = await supabase
    .from('artist_week')
    .select('*')
    .eq('artist_id', artistId)
    .eq('week_id', weekId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

/**
 * Get weekly pool (100 artists for the week)
 */
async getWeeklyPool(weekId: string) {
  const { data, error } = await supabase
    .from('week_artists')
    .select(`
      *,
      artist:artists(*),
      artist_week!inner(score, votes, rank, status)
    `)
    .eq('week_id', weekId)
    .order('artist_week.score', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get Top 50 artists eligible for picks
 */
async getTop50(weekId: string) {
  const { data, error } = await supabase
    .from('artist_week')
    .select(`
      *,
      artist:artists(*)
    `)
    .eq('week_id', weekId)
    .eq('is_top_50', true)
    .order('rank', { ascending: true })
    .limit(50);

  if (error) throw error;
  return data || [];
}

/**
 * Submit track for consideration (Artist accounts)
 */
async submitTrack(
  userId: string,
  trackUrl: string,
  title: string,
  genre: string
) {
  // Check if user is an artist
  const { data: user } = await supabase
    .from('users')
    .select('user_type')
    .eq('id', userId)
    .single();

  if (!user || user.user_type !== 'artist') {
    throw new Error('Only artist accounts can submit tracks');
  }

  // Check for existing pending submissions
  const { data: existingSubmission } = await supabase
    .from('artist_submissions')
    .select('*')
    .eq('artist_id', userId)
    .eq('status', 'pending')
    .single();

  if (existingSubmission) {
    throw new Error('You already have a pending submission');
  }

  // Create track record first
  const { data: track, error: trackError } = await supabase
    .from('tracks')
    .insert({
      title,
      artist_id: userId,
      url: trackUrl,
      genre
    })
    .select()
    .single();

  if (trackError) throw trackError;

  // Create submission
  const { data: submission, error } = await supabase
    .from('artist_submissions')
    .insert({
      artist_id: userId,
      track_id: track.id,
      status: 'pending',
      submitted_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return submission;
}

/**
 * Search artists by name or genre
 */
async searchArtists(query?: string, genre?: string, limit: number = 20) {
  let dbQuery = supabase
    .from('artists')
    .select('*');

  if (query) {
    dbQuery = dbQuery.ilike('name', `%${query}%`);
  }

  if (genre) {
    dbQuery = dbQuery.eq('genre', genre);
  }

  dbQuery = dbQuery.limit(limit);

  const { data, error } = await dbQuery;

  if (error) throw error;
  return data || [];
}

/**
 * Publish the 100-song pool for a new week
 * Mix of: new submissions + past high performers
 */
async publishWeeklyPool(weekId: string, poolSize: number = 100) {
    // Algorithm:
    // 1. Get all new submissions (status='pending')
    // 2. Get past top performers from last 4 weeks
    // 3. Mix and select top 100 by weighted score

    // Get new submissions
    const { data: newSubmissions } = await supabase
      .from('artist_submissions')
      .select('artist_id, track_id')
      .eq('status', 'pending')
      .limit(50);

    // Get past performers
    const { data: pastPerformers } = await supabase
      .from('artist_week')
      .select('artist_id')
      .order('score', { ascending: false })
      .limit(50);

    // Combine and dedupe
    const selectedArtists = this.selectTop100(
      newSubmissions || [],
      pastPerformers || []
    );

    // Insert into week_artists
    const weekArtists = selectedArtists.map((item, index) => ({
      week_id: weekId,
      artist_id: item.artist_id,
      track_id: item.track_id,
      source_flag: item.source,
      is_top_50: false,
      eligible_for_picks: false
    }));

    const { error } = await supabase
      .from('week_artists')
      .insert(weekArtists);

    if (error) throw error;

    // Create empty artist_week records for scoring
    const artistWeekRecords = selectedArtists.map(item => ({
      week_id: weekId,
      artist_id: item.artist_id,
      score: 0,
      streams: 0,
      votes: 0,
      engagement: 0,
      growth_percentage: 0,
      rank: 0,
      is_top_50: false
    }));

    await supabase.from('artist_week').insert(artistWeekRecords);

    return weekArtists.length;
  }

  /**
   * Calculate Top 50 after voting closes
   * Updates is_top_50 flag and makes them pickable
   */
  async calculateTop50(weekId: string) {
    // 1. Aggregate all votes for this week
    const { data: voteAggregates } = await supabase
      .from('votes')
      .select('artist_id, vote_count')
      .eq('week_id', weekId);

    // 2. Update artist_week with vote counts
    for (const aggregate of voteAggregates || []) {
      await supabase
        .from('artist_week')
        .update({ votes: aggregate.vote_count })
        .eq('week_id', weekId)
        .eq('artist_id', aggregate.artist_id);
    }

    // 3. Fetch artist_week records and calculate scores
    const { data: artistWeeks } = await supabase
      .from('artist_week')
      .select('*')
      .eq('week_id', weekId);

    // Calculate composite score for each artist
    const scoredArtists = (artistWeeks || []).map(aw => ({
      ...aw,
      composite_score: this.calculateCompositeScore(aw)
    }));

    // Sort and select top 50
    scoredArtists.sort((a, b) => b.composite_score - a.composite_score);
    const top50 = scoredArtists.slice(0, 50);

    // 4. Update database
    for (let i = 0; i < top50.length; i++) {
      const artist = top50[i];
      
      await supabase
        .from('artist_week')
        .update({
          score: artist.composite_score,
          rank: i + 1,
          is_top_50: true,
          status: this.determineStatus(artist, i)
        })
        .eq('id', artist.id);

      // Mark as pickable in week_artists
      await supabase
        .from('week_artists')
        .update({ is_top_50: true, eligible_for_picks: true })
        .eq('week_id', weekId)
        .eq('artist_id', artist.artist_id);
    }

    return top50;
  }

  /**
   * Calculate composite score from multiple metrics
   */
  private calculateCompositeScore(artistWeek: ArtistWeek): number {
    const weights = {
      votes: 0.4,
      streams: 0.3,
      engagement: 0.2,
      growth: 0.1
    };

    return (
      artistWeek.votes * weights.votes +
      (artistWeek.streams / 1000) * weights.streams +
      artistWeek.engagement * weights.engagement +
      artistWeek.growth_percentage * weights.growth
    );
  }

  /**
   * Finalize scores on Thursday morning
   * Pull latest data from Chartmetric API
   */
  async finalizeScores(weekId: string) {
    const { data: artistWeeks } = await supabase
      .from('artist_week')
      .select('*, artists(*)')
      .eq('week_id', weekId)
      .eq('is_top_50', true);

    for (const aw of artistWeeks || []) {
      // Fetch latest metrics from Chartmetric or other APIs
      const latestData = await this.fetchLatestMetrics(aw.artist_id);
      
      const finalScore = this.calculateCompositeScore({
        ...aw,
        streams: latestData.streams,
        engagement: latestData.engagement
      });

      await supabase
        .from('artist_week')
        .update({
          score: finalScore,
          streams: latestData.streams,
          engagement: latestData.engagement
        })
        .eq('id', aw.id);
    }
  }

  /**
   * Get leaderboard for current week
   */
  async getLeaderboard(weekId: string, league?: 'Major' | 'Minor', limit: number = 50) {
    let query = supabase
      .from('artist_week')
      .select(`
        *,
        artists (
          id,
          name,
          genre,
          image_url,
          league,
          location,
          social_links
        )
      `)
      .eq('week_id', weekId)
      .eq('is_top_50', true)
      .order('rank', { ascending: true })
      .limit(limit);

    if (league) {
      query = query.eq('artists.league', league);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data;
  }

  private selectTop100(newSubmissions: any[], pastPerformers: any[]) {
    // Implement mixing logic
    // For now, simple concatenation with deduplication
    const combined = [
      ...newSubmissions.map(s => ({ ...s, source: 'new' })),
      ...pastPerformers.map(p => ({ ...p, source: 'past_performer' }))
    ];

    // Dedupe by artist_id
    const unique = combined.reduce((acc, curr) => {
      if (!acc.find(a => a.artist_id === curr.artist_id)) {
        acc.push(curr);
      }
      return acc;
    }, [] as any[]);

    return unique.slice(0, 100);
  }

  private determineStatus(artist: any, rank: number): string {
    if (rank < 5) return 'Hot Streak';
    if (artist.growth_percentage > 10) return 'Rising';
    if (rank > 40) return 'New Entrant';
    return 'Trending';
  }

  private async fetchLatestMetrics(artistId: string) {
    // Integrate with Chartmetric or mock data for now
    return {
      streams: Math.floor(Math.random() * 100000),
      engagement: Math.floor(Math.random() * 10000)
    };
  }
}