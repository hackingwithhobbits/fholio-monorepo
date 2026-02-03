// apps/backend/src/services/artist.service.ts

import { supabase } from '../config/database';

export class ArtistService {
  /**
   * Get artist by ID with full details
   */
  async getArtistById(artistId: string) {
    const { data: artist, error } = await supabase
      .from('artists')
      .select(
        `
        *,
        user:users (
          id,
          email,
          username,
          display_name
        )
      `
      )
      .eq('id', artistId)
      .single();

    if (error) throw error;
    return artist;
  }

  /**
   * Get artist's tracks
   */
  async getArtistTracks(artistId: string) {
    const { data: tracks, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('artist_id', artistId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return tracks || [];
  }

  /**
   * Get artist performance stats for current week
   */
  async getArtistPerformanceStats(artistId: string) {
    // Get current week
    const { data: currentWeek } = await supabase
      .from('weeks')
      .select('id')
      .eq('is_active', true)
      .single();

    if (!currentWeek) {
      return {
        currentScore: 0,
        currentRank: null,
        totalVotes: 0,
        streams: 0,
        engagement: 0,
        socialGrowth: 0,
        status: 'N/A',
      };
    }

    // Get artist_week stats for current week
    const { data: artistWeek } = await supabase
      .from('artist_week')
      .select('*')
      .eq('artist_id', artistId)
      .eq('week_id', currentWeek.id)
      .single();

    return {
      currentScore: artistWeek?.final_score || 0,
      currentRank: artistWeek?.rank || null,
      totalVotes: artistWeek?.votes || 0,
      streams: artistWeek?.streams || 0,
      engagement: artistWeek?.engagement_score || 0,
      socialGrowth: artistWeek?.social_growth || 0,
      status: artistWeek?.status || 'N/A',
    };
  }

  /**
   * Get artist weekly performance history (for charts)
   */
  async getArtistWeeklyHistory(artistId: string, limit: number = 12) {
    const { data: history, error } = await supabase
      .from('artist_week')
      .select(
        `
        *,
        week:weeks (
          id,
          week_number,
          start_date,
          end_date
        )
      `
      )
      .eq('artist_id', artistId)
      .order('week_id', { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Reverse to get chronological order for charts
    return (history || []).reverse();
  }

  /**
   * Get fan backer count for artist
   */
  async getArtistFanBackers(artistId: string) {
    // Count unique fans who have voted for this artist
    const { count: voteCount } = await supabase
      .from('votes')
      .select('user_id', { count: 'exact', head: true })
      .eq('artist_id', artistId);

    // Count fans who have this artist in their lineup
    const { count: lineupCount } = await supabase
      .from('lineup_artists')
      .select('lineup_id', { count: 'exact', head: true })
      .eq('artist_id', artistId);

    return {
      totalBackers: (voteCount || 0) + (lineupCount || 0),
      voters: voteCount || 0,
      lineupPicks: lineupCount || 0,
    };
  }

  /**
   * Get complete artist profile (combines all data)
   */
  async getArtistProfile(artistId: string) {
    const artist = await this.getArtistById(artistId);
    const tracks = await this.getArtistTracks(artistId);
    const stats = await this.getArtistPerformanceStats(artistId);
    const history = await this.getArtistWeeklyHistory(artistId, 12);
    const backers = await this.getArtistFanBackers(artistId);

    return {
      artist,
      tracks,
      stats,
      history,
      backers,
    };
  }

  /**
   * Get artist's weekly performance history (alternate version)
   */
  async getArtistHistory(artistId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('artist_week')
      .select(
        `
        *,
        week:weeks(week_number, start_date, end_date)
      `
      )
      .eq('artist_id', artistId)
      .order('created_at', { ascending: false })
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
    // First get week_artists with artist data
    const { data: weekArtists, error: waError } = await supabase
      .from('week_artists')
      .select(
        `
        *,
        artist:artists(*)
      `
      )
      .eq('week_id', weekId);

    if (waError) {
      console.error('Week artists query error:', waError);
      throw waError;
    }

    // Then get artist_week data separately
    const artistIds = weekArtists?.map((wa) => wa.artist_id) || [];

    const { data: artistWeekData, error: awError } = await supabase
      .from('artist_week')
      .select('*')
      .eq('week_id', weekId)
      .in('artist_id', artistIds);

    if (awError) {
      console.error('Artist week query error:', awError);
      throw awError;
    }

    // Merge the data
    const result = weekArtists?.map((wa) => {
      const aw = artistWeekData?.find((a) => a.artist_id === wa.artist_id);
      return {
        ...wa,
        artist_week: aw,
        final_score: aw?.final_score || 0,
        votes: aw?.votes || 0,
        rank: aw?.rank || null,
      };
    });

    return result || [];
  }

  /**
   * Get Top 50 artists eligible for picks
   */
  async getTop50(weekId: string) {
    const { data, error } = await supabase
      .from('artist_week')
      .select(
        `
        *,
        artist:artists(*)
      `
      )
      .eq('week_id', weekId)
      .order('rank', { ascending: true })
      .limit(50);

    if (error) throw error;
    return data || [];
  }

  /**
   * Submit track for consideration (Artist accounts)
   */
  async submitTrack(userId: string, trackUrl: string, title: string, genre: string) {
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
        spotify_url: trackUrl,
        genre,
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
        submitted_at: new Date().toISOString(),
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
    let dbQuery = supabase.from('artists').select('*');

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
      .order('final_score', { ascending: false })
      .limit(50);

    // Combine and dedupe
    const selectedArtists = this.selectTop100(newSubmissions || [], pastPerformers || []);

    // Insert into week_artists
    const weekArtists = selectedArtists.map((item) => ({
      week_id: weekId,
      artist_id: item.artist_id,
      track_id: item.track_id,
      source_flag: item.source,
      is_top_50: false,
      is_eligible_for_picking: false,
    }));

    const { error } = await supabase.from('week_artists').insert(weekArtists);

    if (error) throw error;

    // Create empty artist_week records for scoring
    const artistWeekRecords = selectedArtists.map((item) => ({
      week_id: weekId,
      artist_id: item.artist_id,
      final_score: 0,
      streams: 0,
      votes: 0,
      engagement_score: 0,
      social_growth: 0,
      rank: 0,
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
      .select('artist_id')
      .eq('week_id', weekId);

    // Count votes per artist
    const voteCounts = new Map();
    voteAggregates?.forEach((vote) => {
      const count = voteCounts.get(vote.artist_id) || 0;
      voteCounts.set(vote.artist_id, count + 1);
    });

    // 2. Update artist_week with vote counts
    for (const [artistId, voteCount] of voteCounts.entries()) {
      await supabase
        .from('artist_week')
        .update({ votes: voteCount })
        .eq('week_id', weekId)
        .eq('artist_id', artistId);
    }

    // 3. Fetch artist_week records and calculate scores
    const { data: artistWeeks } = await supabase
      .from('artist_week')
      .select('*')
      .eq('week_id', weekId);

    // Calculate composite score for each artist
    const scoredArtists = (artistWeeks || []).map((aw) => ({
      ...aw,
      composite_score: this.calculateCompositeScore(aw),
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
          final_score: artist.composite_score,
          rank: i + 1,
          status: this.determineStatus(artist, i),
        })
        .eq('id', artist.id);

      // Mark as pickable in week_artists
      await supabase
        .from('week_artists')
        .update({ is_top_50: true, is_eligible_for_picking: true })
        .eq('week_id', weekId)
        .eq('artist_id', artist.artist_id);
    }

    return top50;
  }

  /**
   * Calculate composite score from multiple metrics
   */
  private calculateCompositeScore(artistWeek: any): number {
    const weights = {
      votes: 0.4,
      streams: 0.3,
      engagement_score: 0.2,
      social_growth: 0.1,
    };

    return (
      (artistWeek.votes || 0) * weights.votes +
      ((artistWeek.streams || 0) / 1000) * weights.streams +
      (artistWeek.engagement_score || 0) * weights.engagement_score +
      (artistWeek.social_growth || 0) * weights.social_growth
    );
  }

  /**
   * Finalize scores on Thursday morning
   * Pull latest data from Chartmetric API
   */
  async finalizeScores(weekId: string) {
    const { data: artistWeeks } = await supabase
      .from('artist_week')
      .select('*')
      .eq('week_id', weekId);

    for (const aw of artistWeeks || []) {
      // Fetch latest metrics
      const latestData = await this.fetchLatestMetrics(aw.artist_id);

      const finalScore = this.calculateCompositeScore({
        ...aw,
        streams: latestData.streams,
        engagement_score: latestData.engagement_score,
      });

      await supabase
        .from('artist_week')
        .update({
          final_score: finalScore,
          streams: latestData.streams,
          engagement_score: latestData.engagement_score,
        })
        .eq('id', aw.id);
    }
  }

  /**
   * Get artist's submissions
   */
  async getArtistSubmissions(artistId: string) {
    // First, get week_artists with week and track data
    const { data: weekArtists, error: weekError } = await supabase
      .from('week_artists')
      .select(
        `
        *,
        week:weeks(*),
        track:tracks(*),
        artist:artists(*)
      `
      )
      .eq('artist_id', artistId)
      .order('created_at', { ascending: false });

    if (weekError) throw weekError;

    if (!weekArtists || weekArtists.length === 0) {
      return [];
    }

    // Get artist_week data separately
    const weekIds = weekArtists.map((wa) => wa.week_id);
    const { data: artistWeekData, error: awError } = await supabase
      .from('artist_week')
      .select('*')
      .eq('artist_id', artistId)
      .in('week_id', weekIds);

    if (awError) throw awError;

    // Create a map for quick lookup
    const artistWeekMap = new Map((artistWeekData || []).map((aw) => [aw.week_id, aw]));

    // Merge the data
    const result = weekArtists.map((wa) => ({
      ...wa,
      artist_week: artistWeekMap.get(wa.week_id) || null,
    }));

    return result;
  }

  /**
   * Get artist stats
   */
  async getArtistStats(artistId: string) {
    // Get total submissions
    const { count: totalSubmissions } = await supabase
      .from('week_artists')
      .select('*', { count: 'exact', head: true })
      .eq('artist_id', artistId);

    // Get total votes and scores from artist_week
    const { data: artistWeeks, error: awError } = await supabase
      .from('artist_week')
      .select('votes, final_score')
      .eq('artist_id', artistId);

    if (awError) throw awError;

    const totalVotes = (artistWeeks || []).reduce((sum, aw) => sum + (aw.votes || 0), 0);
    const avgScore =
      artistWeeks && artistWeeks.length > 0
        ? artistWeeks.reduce((sum, aw) => sum + (aw.final_score || 0), 0) / artistWeeks.length
        : 0;

    // Get current rank (if in current week)
    let currentRank = null;

    // Get current week
    const { data: currentWeek, error: weekError } = await supabase
      .from('weeks')
      .select('id')
      .eq('is_active', true)
      .single();

    if (!weekError && currentWeek) {
      const { data: rankings, error: rankError } = await supabase
        .from('artist_week')
        .select('artist_id, final_score')
        .eq('week_id', currentWeek.id)
        .order('final_score', { ascending: false });

      if (!rankError && rankings) {
        const index = rankings.findIndex((r) => r.artist_id === artistId);
        if (index !== -1) {
          currentRank = index + 1;
        }
      }
    }

    return {
      totalSubmissions: totalSubmissions || 0,
      totalVotes,
      avgScore: avgScore.toFixed(1),
      currentRank,
    };
  }

  /**
   * Get current week
   */
  async getCurrentWeek() {
    const { data, error } = await supabase.from('weeks').select('*').eq('is_active', true).single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  /**
   * Get leaderboard for current week
   */
  async getLeaderboard(weekId: string, league?: 'Major' | 'Minor', limit: number = 50) {
    let query = supabase
      .from('artist_week')
      .select(
        `
        *,
        artist:artists (
          id,
          name,
          genre,
          image_url,
          league,
          location
        )
      `
      )
      .eq('week_id', weekId)
      .order('rank', { ascending: true })
      .limit(limit);

    if (league) {
      query = query.eq('artist.league', league);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Leaderboard query error:', error);
      throw error;
    }

    return data || [];
  }

  /**
   * Select top 100 from new submissions and past performers
   */
  private selectTop100(newSubmissions: any[], pastPerformers: any[]) {
    const combined = [
      ...newSubmissions.map((s) => ({ ...s, source: 'new' })),
      ...pastPerformers.map((p) => ({ ...p, source: 'past_performer' })),
    ];

    // Dedupe by artist_id
    const unique = combined.reduce((acc, curr) => {
      if (!acc.find((a) => a.artist_id === curr.artist_id)) {
        acc.push(curr);
      }
      return acc;
    }, [] as any[]);

    return unique.slice(0, 100);
  }

  /**
   * Determine artist status based on rank and growth
   */
  private determineStatus(artist: any, rank: number): string {
    if (rank < 5) return 'Hot Streak';
    if (artist.social_growth > 10) return 'Rising';
    if (rank > 40) return 'New Entrant';
    return 'Trending';
  }

  /**
   * Fetch latest metrics from external APIs
   */
  private async fetchLatestMetrics(artistId: string) {
    // TODO: Integrate with Chartmetric API
    // For now, return mock data
    return {
      streams: Math.floor(Math.random() * 100000),
      engagement_score: Math.floor(Math.random() * 10000),
    };
  }
}

export const artistService = new ArtistService();
