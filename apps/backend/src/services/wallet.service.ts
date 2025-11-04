import { supabase } from '@/config/supabase';
import { AppError } from '@/types';

export class WalletService {
  /**
   * Get user wallet balance and stats
   */
  async getWallet(userId: string) {
    const { data: user, error } = await supabase
      .from('users')
      .select('weekly_earnings, lifetime_earnings, referral_bonus')
      .eq('id', userId)
      .single();

    if (error) {
      throw new AppError(500, 'Failed to fetch wallet', 'DATABASE_ERROR', error);
    }

    // Get current week earnings
    const weekStart = this.getCurrentWeekStart();
    const { data: weekData } = await supabase
      .from('payout_history')
      .select('amount')
      .eq('user_id', userId)
      .gte('week_starting', weekStart)
      .single();

    return {
      totalBalance: user.lifetime_earnings,
      thisWeek: weekData?.amount || 0,
      referralBonus: user.referral_bonus,
      weeklyEarnings: user.weekly_earnings,
    };
  }

  /**
   * Get payout history
   */
  async getPayoutHistory(userId: string, limit = 20) {
    const { data, error } = await supabase
      .from('payout_history')
      .select('*')
      .eq('user_id', userId)
      .order('week_starting', { ascending: false })
      .limit(limit);

    if (error) {
      throw new AppError(500, 'Failed to fetch payout history', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new AppError(500, 'Failed to fetch transactions', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get referral stats
   */
  async getReferralStats(userId: string) {
    const { data: user, error } = await supabase
      .from('users')
      .select('referral_count, referral_bonus')
      .eq('id', userId)
      .single();

    if (error) {
      throw new AppError(500, 'Failed to fetch referral stats', 'DATABASE_ERROR', error);
    }

    // Get referred users
    const { data: referrals } = await supabase
      .from('users')
      .select('id, username, avatar_url, created_at')
      .eq('referred_by', userId);

    return {
      count: user.referral_count,
      totalBonus: user.referral_bonus,
      referrals: referrals || [],
    };
  }

  private getCurrentWeekStart(): string {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString();
  }
}

export const walletService = new WalletService();
