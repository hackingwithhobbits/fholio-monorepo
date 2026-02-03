// apps/backend/src/services/pool.service.ts

import { supabase } from '../config/database';
import { PrizePool, Transaction } from '../types/database.types';

export class PoolService {
  /**
   * Calculate prize pool for a week
   * Sources: entry fees, sponsors, bonuses
   */
  async calculateWeeklyPool(weekId: string): Promise<PrizePool> {
    // 1. Get all entry fees for this week
    const { data: entryFees } = await supabase
      .from('transactions')
      .select('amount')
      .eq('week_id', weekId)
      .eq('type', 'entry_fee');

    const entryTotal = entryFees?.reduce((sum, t) => sum + t.amount, 0) || 0;

    // 2. Get sponsor contributions
    const { data: sponsors } = await supabase
      .from('prize_pools')
      .select('amount')
      .eq('week_id', weekId)
      .eq('pool_type', 'sponsor');

    const sponsorTotal = sponsors?.reduce((sum, p) => sum + p.amount, 0) || 0;

    // 3. Calculate distribution
    const totalPool = entryTotal + sponsorTotal;

    const distribution = {
      fanShare: totalPool * 0.6, // 60% to fans
      artistPool: totalPool * 0.3, // 30% to artists
      platform: totalPool * 0.05, // 5% platform fee
      bonusEvents: totalPool * 0.05, // 5% bonus pool
    };

    // 4. Create or update prize pool record
    const { data: pool, error } = await supabase
      .from('prize_pools')
      .upsert({
        week_id: weekId,
        pool_type: 'core',
        source: 'entry_fees_sponsors',
        amount: totalPool,
        distributed: false,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      ...pool,
      distribution,
    };
  }

  /**
   * Distribute payouts after live show
   * Implements payout curve: top positions get larger shares
   */
  async distributePayouts(weekId: string) {
    const pool = await this.calculateWeeklyPool(weekId);

    // 1. Get fan rankings
    const { data: fanLineups } = await supabase
      .from('fan_lineups')
      .select('*, users(*)')
      .eq('week_id', weekId)
      .order('rank', { ascending: true });

    if (!fanLineups || fanLineups.length === 0) return;

    // 2. Get artist rankings
    const { data: artistWeeks } = await supabase
      .from('artist_week')
      .select('*, artists(*)')
      .eq('week_id', weekId)
      .eq('is_top_50', true)
      .order('rank', { ascending: true });

    // 3. Distribute to fans (top 100 get paid)
    await this.distributeFanPayouts(weekId, fanLineups.slice(0, 100), pool.distribution.fanShare);

    // 4. Distribute to artists (top 10 get paid)
    await this.distributeArtistPayouts(
      weekId,
      artistWeeks?.slice(0, 10) || [],
      pool.distribution.artistPool
    );

    // 5. Mark pool as distributed
    await supabase
      .from('prize_pools')
      .update({ distributed: true })
      .eq('week_id', weekId)
      .eq('pool_type', 'core');
  }

  /**
   * Fan payout curve: top positions get larger shares
   * Example: 1st: 20%, 2nd: 12%, 3rd: 8%, 4-10: 5% each, 11-50: 1% each, 51-100: 0.3% each
   */
  private async distributeFanPayouts(weekId: string, lineups: any[], totalAmount: number) {
    const payoutCurve = this.calculateFanPayoutCurve(lineups.length);

    for (let i = 0; i < lineups.length; i++) {
      const lineup = lineups[i];
      const percentage = payoutCurve[i];
      const amount = totalAmount * percentage;

      // Create transaction
      await supabase.from('transactions').insert({
        user_id: lineup.user_id,
        type: 'payout',
        amount: amount,
        week_id: weekId,
        ref_id: lineup.id,
        status: 'completed',
      });

      // Update user wallet
      await this.updateWalletBalance(lineup.user_id, amount);
    }
  }

  /**
   * Artist payout curve
   */
  private async distributeArtistPayouts(weekId: string, artistWeeks: any[], totalAmount: number) {
    const payoutCurve = this.calculateArtistPayoutCurve(artistWeeks.length);

    for (let i = 0; i < artistWeeks.length; i++) {
      const artistWeek = artistWeeks[i];
      const percentage = payoutCurve[i];
      const amount = totalAmount * percentage;

      // Find artist's user account
      const { data: artistUser } = await supabase
        .from('users')
        .select('id')
        .eq('user_type', 'artist')
        .eq('id', artistWeek.artist_id)
        .single();

      if (!artistUser) continue;

      // Create transaction
      await supabase.from('transactions').insert({
        user_id: artistUser.id,
        type: 'payout',
        amount: amount,
        week_id: weekId,
        ref_id: artistWeek.id,
        status: 'completed',
      });

      // Update artist wallet
      await this.updateWalletBalance(artistUser.id, amount);
    }
  }

  /**
   * Calculate fan payout percentages
   * Top-heavy distribution
   */
  private calculateFanPayoutCurve(count: number): number[] {
    const curve: number[] = [];
    let remaining = 1.0; // 100%

    // Positions 1-3
    const topThree = [0.2, 0.12, 0.08];
    for (let i = 0; i < Math.min(3, count); i++) {
      curve.push(topThree[i]);
      remaining -= topThree[i];
    }

    // Positions 4-10
    const positions4to10 = Math.min(7, count - 3);
    for (let i = 0; i < positions4to10; i++) {
      curve.push(0.05);
      remaining -= 0.05;
    }

    // Positions 11-50
    const positions11to50 = Math.min(40, count - 10);
    for (let i = 0; i < positions11to50; i++) {
      curve.push(0.01);
      remaining -= 0.01;
    }

    // Positions 51-100
    const positions51to100 = Math.min(50, count - 50);
    const shareFor51to100 = remaining / positions51to100;
    for (let i = 0; i < positions51to100; i++) {
      curve.push(shareFor51to100);
    }

    return curve;
  }

  /**
   * Calculate artist payout percentages
   */
  private calculateArtistPayoutCurve(count: number): number[] {
    // Top 10 artists split: 30%, 20%, 15%, 10%, 8%, 6%, 4%, 3%, 2%, 2%
    const baseCurve = [0.3, 0.2, 0.15, 0.1, 0.08, 0.06, 0.04, 0.03, 0.02, 0.02];
    return baseCurve.slice(0, count);
  }

  /**
   * Update user's wallet balance
   */
  private async updateWalletBalance(userId: string, amount: number) {
    const { data: wallet } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (wallet) {
      await supabase
        .from('wallets')
        .update({ balance: wallet.balance + amount })
        .eq('user_id', userId);
    } else {
      await supabase.from('wallets').insert({
        user_id: userId,
        balance: amount,
      });
    }
  }

  /**
   * Get payout history for a user
   */
  async getPayoutHistory(userId: string, limit: number = 20) {
    const { data, error } = await supabase
      .from('transactions')
      .select(
        `
        *,
        week:weeks(week_number, week_starting)
      `
      )
      .eq('user_id', userId)
      .eq('type', 'payout')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get current pool status for display
   */
  async getCurrentPoolStatus(weekId: string) {
    const pool = await this.calculateWeeklyPool(weekId);

    // Get participant count
    const { count: fanCount } = await supabase
      .from('fan_lineups')
      .select('*', { count: 'exact', head: true })
      .eq('week_id', weekId);

    return {
      totalPool: pool.amount,
      distribution: pool.distribution,
      participantCount: fanCount || 0,
      averageEarningsTop100: pool.distribution.fanShare / 100,
    };
  }
}
