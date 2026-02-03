// apps/backend/src/services/phase.service.ts

import { supabase } from '../config/database';
import { ArtistService } from './artist.service';
import { logger } from '../utils/logger';

const artistService = new ArtistService();

export class PhaseService {
  /**
   * Get current phase for active week
   */
  async getCurrentPhase() {
    const { data: week } = await supabase.from('weeks').select('*').eq('is_active', true).single();

    if (!week) {
      return null;
    }

    const now = new Date();

    // Determine current phase based on timestamps
    if (now < new Date(week.submission_open_at)) {
      return { phase: 'pending', week };
    }

    if (now >= new Date(week.submission_open_at) && now < new Date(week.submission_close_at)) {
      return { phase: 'submission', week };
    }

    if (now >= new Date(week.voting_open_at) && now < new Date(week.voting_close_at)) {
      return { phase: 'voting', week };
    }

    if (now >= new Date(week.voting_close_at) && now < new Date(week.lineup_lock_at)) {
      return { phase: 'lineup_selection', week };
    }

    if (now >= new Date(week.lineup_lock_at) && now < new Date(week.show_date_time)) {
      return { phase: 'locked', week };
    }

    if (now >= new Date(week.show_date_time)) {
      return { phase: 'show', week };
    }

    return { phase: 'unknown', week };
  }

  /**
   * Lock all lineups at deadline
   */
  async lockLineups(weekId: string) {
    try {
      logger.info('Starting lineup lock process', { weekId });

      // Update all lineups for this week to locked
      const { data, error } = await supabase
        .from('lineups')
        .update({ is_locked: true })
        .eq('week_id', weekId)
        .eq('is_locked', false);

      if (error) throw error;

      logger.info('Lineups locked successfully', { weekId });

      return { success: true, message: 'All lineups locked' };
    } catch (error: any) {
      logger.error('Lineup lock failed', { error: error.message, weekId });
      throw error;
    }
  }

  /**
   * Publish weekly pool (100 tracks)
   */
  async publishWeeklyPool(weekId: string) {
    try {
      logger.info('Publishing weekly pool', { weekId });

      const count = await artistService.publishWeeklyPool(weekId, 100);

      logger.info('Weekly pool published', { weekId, count });

      return { success: true, count };
    } catch (error: any) {
      logger.error('Pool publication failed', { error: error.message, weekId });
      throw error;
    }
  }

  /**
   * Calculate Top 50 after voting closes
   */
  async calculateTop50(weekId: string) {
    try {
      logger.info('Calculating Top 50', { weekId });

      const top50 = await artistService.calculateTop50(weekId);

      logger.info('Top 50 calculated', { weekId, count: top50.length });

      return { success: true, top50 };
    } catch (error: any) {
      logger.error('Top 50 calculation failed', { error: error.message, weekId });
      throw error;
    }
  }

  /**
   * Finalize scores on Thursday morning
   */
  async finalizeScores(weekId: string) {
    try {
      logger.info('Finalizing scores', { weekId });

      await artistService.finalizeScores(weekId);

      logger.info('Scores finalized', { weekId });

      return { success: true };
    } catch (error: any) {
      logger.error('Score finalization failed', { error: error.message, weekId });
      throw error;
    }
  }

  /**
   * Calculate and distribute prizes
   */
  async distributePrizes(weekId: string) {
    try {
      logger.info('Starting prize distribution', { weekId });

      // Get prize pool configuration
      const { data: prizePool } = await supabase
        .from('prize_pools')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!prizePool) {
        throw new Error('No prize pool configuration found');
      }

      // Calculate pool amounts
      const artistPool = (prizePool.total_pool * prizePool.artist_percentage) / 100;
      const fanPool = (prizePool.total_pool * prizePool.fan_percentage) / 100;

      // Distribute to artists (Top 10)
      await this.distributeArtistPrizes(weekId, artistPool);

      // Distribute to fans (Top 10 lineups)
      await this.distributeFanPrizes(weekId, fanPool);

      logger.info('Prize distribution completed', { weekId });

      return { success: true, artistPool, fanPool };
    } catch (error: any) {
      logger.error('Prize distribution failed', { error: error.message, weekId });
      throw error;
    }
  }

  /**
   * Distribute prizes to top 10 artists
   */
  private async distributeArtistPrizes(weekId: string, totalPool: number) {
    // Get top 10 artists by rank
    const { data: topArtists } = await supabase
      .from('artist_week')
      .select(
        `
        *,
        artist:artists (
          id,
          user_id
        )
      `
      )
      .eq('week_id', weekId)
      .order('rank', { ascending: true })
      .limit(10);

    if (!topArtists || topArtists.length === 0) {
      logger.warn('No artists to distribute prizes to', { weekId });
      return;
    }

    // Distribution weights (descending)
    const weights = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]; // Total = 101 (will normalize)
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    for (let i = 0; i < topArtists.length; i++) {
      const artist = topArtists[i];
      const weight = weights[i] || 1;
      const amount = (totalPool * weight) / totalWeight;

      // Get or create wallet for artist
      const { data: wallet } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', artist.artist.user_id)
        .single();

      if (wallet) {
        // Update wallet balance
        await supabase
          .from('wallets')
          .update({
            balance: parseFloat(wallet.balance) + amount,
            lifetime_earnings: parseFloat(wallet.lifetime_earnings) + amount,
          })
          .eq('id', wallet.id);

        // Create transaction record
        await supabase.from('transactions').insert({
          user_id: artist.artist.user_id,
          wallet_id: wallet.id,
          transaction_type: 'prize_payout',
          amount: amount.toString(),
          status: 'completed',
          week_id: weekId,
          description: `Week prize - Rank #${i + 1}`,
          balance_before: wallet.balance,
          balance_after: (parseFloat(wallet.balance) + amount).toString(),
        });

        logger.info('Artist prize distributed', {
          artistId: artist.artist_id,
          rank: i + 1,
          amount,
        });
      }
    }
  }

  /**
   * Distribute prizes to top 10 fan lineups
   */
  private async distributeFanPrizes(weekId: string, totalPool: number) {
    // Get top 10 lineups by total score
    const { data: topLineups } = await supabase
      .from('lineups')
      .select('*')
      .eq('week_id', weekId)
      .order('total_score', { ascending: false })
      .limit(10);

    if (!topLineups || topLineups.length === 0) {
      logger.warn('No lineups to distribute prizes to', { weekId });
      return;
    }

    // Distribution weights (descending)
    const weights = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    for (let i = 0; i < topLineups.length; i++) {
      const lineup = topLineups[i];
      const weight = weights[i] || 1;
      const amount = (totalPool * weight) / totalWeight;

      // Get or create wallet for fan
      const { data: wallet } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', lineup.user_id)
        .single();

      if (wallet) {
        // Update wallet balance
        await supabase
          .from('wallets')
          .update({
            balance: parseFloat(wallet.balance) + amount,
            lifetime_earnings: parseFloat(wallet.lifetime_earnings) + amount,
          })
          .eq('id', wallet.id);

        // Create transaction record
        await supabase.from('transactions').insert({
          user_id: lineup.user_id,
          wallet_id: wallet.id,
          transaction_type: 'prize_payout',
          amount: amount.toString(),
          status: 'completed',
          week_id: weekId,
          lineup_id: lineup.id,
          description: `Week prize - Rank #${i + 1}`,
          balance_before: wallet.balance,
          balance_after: (parseFloat(wallet.balance) + amount).toString(),
        });

        logger.info('Fan prize distributed', {
          userId: lineup.user_id,
          rank: i + 1,
          amount,
        });
      }
    }
  }

  /**
   * Run all phase transitions for current week
   */
  async runPhaseTransitions() {
    try {
      const currentPhase = await this.getCurrentPhase();

      if (!currentPhase || !currentPhase.week) {
        logger.warn('No active week found');
        return { success: false, message: 'No active week' };
      }

      const { phase, week } = currentPhase;
      const now = new Date();

      logger.info('Running phase transitions', { phase, weekId: week.id });

      // Check if it's time to close submissions and publish pool
      if (phase === 'submission') {
        const closeTime = new Date(week.submission_close_at);
        if (now >= closeTime) {
          await this.publishWeeklyPool(week.id);
        }
      }

      // Check if it's time to calculate Top 50
      if (phase === 'voting') {
        const closeTime = new Date(week.voting_close_at);
        if (now >= closeTime) {
          await this.calculateTop50(week.id);
        }
      }

      // Check if it's time to lock lineups
      if (phase === 'lineup_selection') {
        const lockTime = new Date(week.lineup_lock_at);
        if (now >= lockTime) {
          await this.lockLineups(week.id);
        }
      }

      // Check if it's time to finalize scores
      if (phase === 'locked') {
        const finalizeTime = new Date(week.show_date_time);
        finalizeTime.setHours(7, 0, 0, 0); // 7 AM on show day
        if (now >= finalizeTime && now < new Date(week.show_date_time)) {
          await this.finalizeScores(week.id);
        }
      }

      // Check if it's time to distribute prizes
      if (phase === 'show') {
        const showTime = new Date(week.show_date_time);
        showTime.setHours(23, 59, 59, 999); // End of show day
        if (now >= showTime) {
          await this.distributePrizes(week.id);

          // Mark week as completed
          await supabase.from('weeks').update({ is_active: false }).eq('id', week.id);
        }
      }

      return { success: true, phase };
    } catch (error: any) {
      logger.error('Phase transition failed', { error: error.message });
      throw error;
    }
  }
}

export const phaseService = new PhaseService();
