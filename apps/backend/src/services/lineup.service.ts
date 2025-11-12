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
    const { data, error } = await supabase
      .from('fan_lineups')
      .select(
        `
        *,
        lineup_artists (
          *,
          artist:artists (
            id,
            name,
            genre,
            image_url,
            league
          ),
          artist_week (
            score,
            rank,
            change:growth_percentage
          )
        )
      `
      )
      .eq('user_id', userId)
      .eq('week_id', weekId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
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
      .eq('eligible_for_picks', true)
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
    const { data: lineupArtists } = await supabase
      .from('lineup_artists')
      .select(
        `
        is_captain,
        artist_week (score)
      `
      )
      .eq('lineup_id', lineupId);

    if (!lineupArtists) return 0;

    let totalScore = 0;
    for (const la of lineupArtists) {
      const artistScore = la.artist_week?.[0]?.score || 0;
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
  // Add these to apps/backend/src/services/lineup.service.ts

  /**
   * Get lineup by ID
   */
  async getLineupById(lineupId: string) {
    const { data, error } = await supabase
      .from('fan_lineups')
      .select(
        `
      *,
      lineup_artists(
        *,
        artist:artists(*)
      )
    `
      )
      .eq('id', lineupId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
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
   * Get user's lineup history
   */
  async getUserLineupHistory(userId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('fan_lineups')
      .select(
        `
      *,
      week:weeks(week_number, week_starting, week_ending),
      lineup_artists(
        *,
        artist:artists(name, image_url)
      )
    `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}
