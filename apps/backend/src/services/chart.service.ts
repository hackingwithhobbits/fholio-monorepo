import { supabase } from '@/config/supabase';
import { AppError } from '@/types';

export class ChartService {
  /**
   * Get Top 100 artists
   */
  async getTop100(week?: string) {
    let query = supabase
      .from('artists')
      .select('*')
      .order('score', { ascending: false })
      .limit(100);

    // If specific week requested, you might need historical data table
    // For now, return current rankings

    const { data, error } = await query;

    if (error) {
      throw new AppError(500, 'Failed to fetch top 100', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get leaderboard (top fans)
   */
  async getLeaderboard(week: string, limit = 10) {
    const { data, error } = await supabase
      .from('top_fans')
      .select(
        `
        *,
        user:users (id, username, avatar_url, tier)
      `
      )
      .eq('week_starting', week)
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) {
      throw new AppError(500, 'Failed to fetch leaderboard', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get global leaderboard (all-time)
   */
  async getGlobalLeaderboard(limit = 50) {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, avatar_url, tier, rank, lifetime_earnings')
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) {
      throw new AppError(500, 'Failed to fetch global leaderboard', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get last week's winners
   */
  async getLastWeekWinners(limit = 10) {
    // Get most recent week
    const { data: recentWeek } = await supabase
      .from('top_fans')
      .select('week_starting')
      .order('week_starting', { ascending: false })
      .limit(1)
      .single();

    if (!recentWeek) {
      return [];
    }

    return this.getLeaderboard(recentWeek.week_starting, limit);
  }

  /**
   * Get social stats
   */
  async getSocialStats() {
    const { data, error } = await supabase
      .from('social_stats')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      throw new AppError(500, 'Failed to fetch social stats', 'DATABASE_ERROR', error);
    }

    return data;
  }
}

export const chartService = new ChartService();
