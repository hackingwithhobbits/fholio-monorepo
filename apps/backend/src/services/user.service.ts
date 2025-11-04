import { supabase } from '@/config/supabase';
import { AppError } from '@/types';

export class UserService {
  /**
   * Get user profile
   */
  async getUserProfile(userId: string) {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new AppError(404, 'User not found', 'USER_NOT_FOUND');
      }
      throw new AppError(500, 'Failed to fetch user profile', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, updates: { username?: string; avatar_url?: string }) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new AppError(500, 'Failed to update profile', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get user stats
   */
  async getUserStats(userId: string) {
    const user = await this.getUserProfile(userId);

    // Get current week portfolio
    const { data: currentPortfolio } = await supabase
      .from('user_portfolios')
      .select('total_score, rank')
      .eq('user_id', userId)
      .order('week_starting', { ascending: false })
      .limit(1)
      .single();

    return {
      tier: user.tier,
      rank: user.rank,
      lifetimeEarnings: user.lifetime_earnings,
      weeklyEarnings: user.weekly_earnings,
      totalScore: user.total_score,
      currentWeekScore: currentPortfolio?.total_score || 0,
      currentWeekRank: currentPortfolio?.rank || null,
      referralCount: user.referral_count,
    };
  }
}

export const userService = new UserService();
