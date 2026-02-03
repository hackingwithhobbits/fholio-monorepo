// apps/backend/src/services/lineup.service.ts

import { supabase } from '../config/database';
import { FanLineup, LineupArtist } from '../types/database.types';
import { WeekService } from './week.service';

export class LineupService {
  private weekService: WeekService;

  constructor() {
    this.weekService = new WeekService();
  }

  /**
   * Get user's lineup for a specific week
   */
  async getUserLineup(userId: string, weekId: string): Promise<FanLineup | null> {
    // First get the lineup
    const { data: lineup, error: lineupError } = await supabase
      .from('fan_lineups')
      .select('*')
      .eq('user_id', userId)
      .eq('week_id', weekId)
      .single();

    if (lineupError && lineupError.code !== 'PGRST116') throw lineupError;
    if (!lineup) return null;

    // Get lineup_artists separately
    const { data: lineupArtists, error: laError } = await supabase
      .from('lineup_artists')
      .select(
        `
        *,
        artist:artists(
          id,
          name,
          genre,
          image_url,
          league
        )
      `
      )
      .eq('lineup_id', lineup.id)
      .order('position', { ascending: true });

    if (laError) throw laError;

    // Get artist_week data for these artists
    const artistIds = (lineupArtists || []).map((la) => la.artist_id);
    const { data: artistWeeks, error: awError } = await supabase
      .from('artist_week')
      .select('artist_id, final_score, rank, social_growth')
      .eq('week_id', weekId)
      .in('artist_id', artistIds);

    if (awError) throw awError;

    // Map artist_week data
    const artistWeekMap = new Map((artistWeeks || []).map((aw) => [aw.artist_id, aw]));

    // Combine data
    const enrichedLineupArtists = (lineupArtists || []).map((la) => ({
      ...la,
      artist_week: artistWeekMap.get(la.artist_id) || null,
    }));

    return {
      ...lineup,
      lineup_artists: enrichedLineupArtists,
    } as any;
  }

  /**
   * Create or update user's lineup
   * Validates: tier limits, no duplicates, artist eligibility
   */
  async saveLineup(userId: string, weekId: string, artistIds: string[], captainId?: string) {
    // 1. Validate week phase
    const week = await this.weekService.getCurrentWeek();
    if (!week || week.id !== weekId) {
      throw new Error('Invalid week');
    }

    if (!this.weekService.isPicksOpen(week)) {
      throw new Error('Picks are not open for this week');
    }

    // 2. Check user's subscription limits
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!subscription) throw new Error('No subscription found');

    if (artistIds.length > subscription.picks_limit) {
      throw new Error(`Picks limit exceeded. Your limit is ${subscription.picks_limit}`);
    }

    // 3. Validate no duplicate artists
    const uniqueArtists = new Set(artistIds);
    if (uniqueArtists.size !== artistIds.length) {
      throw new Error('Duplicate artists not allowed');
    }

    // 4. Validate all artists are eligible
    const { data: weekArtists } = await supabase
      .from('week_artists')
      .select('artist_id')
      .eq('week_id', weekId)
      .eq('is_eligible_for_picking', true) // FIXED: correct column name
      .in('artist_id', artistIds);

    if (!weekArtists || weekArtists.length !== artistIds.length) {
      throw new Error('Some artists are not eligible for picks this week');
    }

    // 5. Check if lineup exists
    const existingLineup = await this.getUserLineup(userId, weekId);

    if (existingLineup?.is_locked) {
      throw new Error('Lineup is locked and cannot be modified');
    }

    let lineupId: string;

    if (existingLineup) {
      // Update existing lineup
      lineupId = existingLineup.id;

      // Delete old lineup_artists
      await supabase.from('lineup_artists').delete().eq('lineup_id', lineupId);
    } else {
      // Create new lineup
      const { data: newLineup, error } = await supabase
        .from('fan_lineups')
        .insert({
          user_id: userId,
          week_id: weekId,
          total_score: 0,
          is_locked: false,
          picks_count: artistIds.length,
          captain_artist_id: captainId || null,
        })
        .select()
        .single();

      if (error) throw error;
      lineupId = newLineup.id;
    }

    // 6. Insert lineup artists
    const lineupArtists = artistIds.map((artistId, index) => ({
      lineup_id: lineupId,
      artist_id: artistId,
      position: index + 1,
      score_contribution: 0,
      is_captain: artistId === captainId,
    }));

    const { error: insertError } = await supabase.from('lineup_artists').insert(lineupArtists);

    if (insertError) throw insertError;

    // 7. Return updated lineup
    return this.getUserLineup(userId, weekId);
  }

  /**
   * Lock all lineups for a week
   * Called by cron job on Thursday 10am
   */
  async lockAllLineups(weekId: string) {
    const { error } = await supabase
      .from('fan_lineups')
      .update({
        is_locked: true,
        locked_at: new Date().toISOString(),
      })
      .eq('week_id', weekId)
      .eq('is_locked', false);

    if (error) throw error;
  }

  /**
   * Calculate real-time score for a lineup
   */
  async calculateLineupScore(lineupId: string): Promise<number> {
    // Get lineup info
    const { data: lineup } = await supabase
      .from('fan_lineups')
      .select('week_id, captain_artist_id')
      .eq('id', lineupId)
      .single();

    if (!lineup) return 0;

    // Get lineup_artists
    const { data: lineupArtists } = await supabase
      .from('lineup_artists')
      .select('artist_id, is_captain')
      .eq('lineup_id', lineupId);

    if (!lineupArtists || lineupArtists.length === 0) return 0;

    // Get artist_week scores
    const artistIds = lineupArtists.map((la) => la.artist_id);
    const { data: artistWeeks } = await supabase
      .from('artist_week')
      .select('artist_id, final_score') // FIXED: correct column name
      .eq('week_id', lineup.week_id)
      .in('artist_id', artistIds);

    const artistScoreMap = new Map(
      (artistWeeks || []).map((aw) => [aw.artist_id, aw.final_score || 0])
    );

    // Calculate total score
    let totalScore = 0;
    for (const la of lineupArtists) {
      const artistScore = artistScoreMap.get(la.artist_id) || 0;
      const multiplier = la.is_captain ? 1.5 : 1.0;
      totalScore += artistScore * multiplier;
    }

    // Update lineup total_score
    await supabase.from('fan_lineups').update({ total_score: totalScore }).eq('id', lineupId);

    return totalScore;
  }

  /**
   * Calculate rankings for all lineups in a week
   */
  async calculateRankings(weekId: string) {
    // Get all lineups with scores
    const { data: lineups } = await supabase
      .from('fan_lineups')
      .select('id, total_score')
      .eq('week_id', weekId)
      .order('total_score', { ascending: false });

    if (!lineups) return;

    // Update ranks
    for (let i = 0; i < lineups.length; i++) {
      await supabase
        .from('fan_lineups')
        .update({ rank: i + 1 })
        .eq('id', lineups[i].id);
    }
  }

  /**
   * Get lineup by ID
   */
  async getLineupById(lineupId: string) {
    const { data: lineup, error: lineupError } = await supabase
      .from('fan_lineups')
      .select('*')
      .eq('id', lineupId)
      .single();

    if (lineupError && lineupError.code !== 'PGRST116') throw lineupError;
    if (!lineup) return null;

    // Get lineup_artists
    const { data: lineupArtists, error: laError } = await supabase
      .from('lineup_artists')
      .select(
        `
        *,
        artist:artists(*)
      `
      )
      .eq('lineup_id', lineupId)
      .order('position', { ascending: true });

    if (laError) throw laError;

    return {
      ...lineup,
      lineup_artists: lineupArtists || [],
    } as any;
  }

  /**
   * Lock lineup manually
   */
  async lockLineup(lineupId: string) {
    const { error } = await supabase
      .from('fan_lineups')
      .update({
        is_locked: true,
        locked_at: new Date().toISOString(),
      })
      .eq('id', lineupId);

    if (error) throw error;
  }

  /**
   * Delete lineup (only before lock)
   */
  async deleteLineup(lineupId: string) {
    // Get lineup to check if it's locked
    const lineup = await this.getLineupById(lineupId);

    if (!lineup) {
      throw new Error('Lineup not found');
    }

    if (lineup.is_locked) {
      throw new Error('Cannot delete locked lineup');
    }

    // Delete lineup_artists first (foreign key constraint)
    await supabase.from('lineup_artists').delete().eq('lineup_id', lineupId);

    // Delete the lineup
    const { error } = await supabase.from('fan_lineups').delete().eq('id', lineupId);

    if (error) throw error;
  }

  /**
   * Get user's lineup history
   */
  async getUserLineupHistory(userId: string, limit: number = 10) {
    // Get lineups
    const { data: lineups, error: lineupsError } = await supabase
      .from('fan_lineups')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (lineupsError) throw lineupsError;
    if (!lineups || lineups.length === 0) return [];

    // Get weeks
    const weekIds = lineups.map((l) => l.week_id);
    const { data: weeks } = await supabase
      .from('weeks')
      .select('id, week_number, week_starting, week_ending')
      .in('id', weekIds);

    const weekMap = new Map((weeks || []).map((w) => [w.id, w]));

    // Get lineup_artists for all lineups
    const lineupIds = lineups.map((l) => l.id);
    const { data: allLineupArtists } = await supabase
      .from('lineup_artists')
      .select(
        `
        lineup_id,
        artist:artists(name, image_url)
      `
      )
      .in('lineup_id', lineupIds);

    // Group by lineup_id
    const lineupArtistsMap = new Map();
    (allLineupArtists || []).forEach((la: any) => {
      if (!lineupArtistsMap.has(la.lineup_id)) {
        lineupArtistsMap.set(la.lineup_id, []);
      }
      lineupArtistsMap.get(la.lineup_id).push(la);
    });

    // Combine data
    return lineups.map((lineup) => ({
      ...lineup,
      week: weekMap.get(lineup.week_id) || null,
      lineup_artists: lineupArtistsMap.get(lineup.id) || [],
    }));
  }
}

export const lineupService = new LineupService();
