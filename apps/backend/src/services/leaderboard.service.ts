// apps/backend/src/services/leaderboard.service.ts

import { supabase } from '../config/database';

export class LeaderboardService {
  /**
   * Get global leaderboard (all-time top fans)
   */
  async getGlobalLeaderboard(limit: number = 50) {
    // Get all fan_lineups and sum their scores
    const { data: rankings, error } = await supabase.rpc('get_global_leaderboard', {
      result_limit: limit,
    });

    if (error) {
      // Fallback: manual query if RPC doesn't exist
      const { data: lineups } = await supabase
        .from('fan_lineups')
        .select(
          `
          user_id,
          total_score,
          users (
            id,
            username,
            display_name,
            email
          )
        `
        )
        .order('total_score', { ascending: false })
        .limit(limit);

      // Group by user and sum scores
      const userScores = new Map();

      (lineups || []).forEach((lineup: any) => {
        const userId = lineup.user_id;
        const username = lineup.users?.username || lineup.users?.display_name || 'Anonymous';

        if (!userScores.has(userId)) {
          userScores.set(userId, {
            user_id: userId,
            username,
            total_score: 0,
            weeks_played: 0,
          });
        }

        const userStats = userScores.get(userId);
        userStats.total_score += lineup.total_score || 0;
        userStats.weeks_played += 1;
      });

      // Convert to array and sort
      const rankedUsers = Array.from(userScores.values())
        .sort((a, b) => b.total_score - a.total_score)
        .map((user, index) => ({
          ...user,
          rank: index + 1,
        }));

      return rankedUsers;
    }

    return rankings || [];
  }

  /**
   * Get weekly leaderboard for specific week
   */
  async getWeeklyLeaderboard(weekId: string, limit: number = 50) {
    const { data: lineups, error } = await supabase
      .from('fan_lineups')
      .select(
        `
        id,
        user_id,
        total_score,
        rank,
        is_locked,
        picks_count,
        users (
          id,
          username,
          display_name
        )
      `
      )
      .eq('week_id', weekId)
      .order('total_score', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (lineups || []).map((lineup: any, index) => ({
      rank: index + 1,
      user_id: lineup.user_id,
      username: lineup.users?.username || lineup.users?.display_name || 'Anonymous',
      total_score: lineup.total_score || 0,
      picks_count: lineup.picks_count || 0,
      is_locked: lineup.is_locked,
    }));
  }

  /**
   * Get current week leaderboard
   */
  async getCurrentWeekLeaderboard(limit: number = 50) {
    // Get current week
    const { data: currentWeek } = await supabase
      .from('weeks')
      .select('id')
      .eq('is_active', true)
      .single();

    if (!currentWeek) {
      throw new Error('No active week found');
    }

    return this.getWeeklyLeaderboard(currentWeek.id, limit);
  }

  /**
   * Get user's rank in current week
   */
  async getUserRank(userId: string, weekId?: string) {
    let targetWeekId = weekId;

    if (!targetWeekId) {
      const { data: currentWeek } = await supabase
        .from('weeks')
        .select('id')
        .eq('is_active', true)
        .single();

      if (!currentWeek) return null;
      targetWeekId = currentWeek.id;
    }

    const { data: lineup } = await supabase
      .from('fan_lineups')
      .select('rank, total_score, picks_count')
      .eq('user_id', userId)
      .eq('week_id', targetWeekId)
      .single();

    if (!lineup) return null;

    // Get total participants
    const { count } = await supabase
      .from('fan_lineups')
      .select('id', { count: 'exact', head: true })
      .eq('week_id', targetWeekId);

    return {
      rank: lineup.rank,
      total_score: lineup.total_score,
      picks_count: lineup.picks_count,
      total_participants: count || 0,
    };
  }

  /**
   * Get user's global stats
   */
  async getUserGlobalStats(userId: string) {
    const { data: lineups } = await supabase
      .from('fan_lineups')
      .select('total_score, rank, week_id')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!lineups || lineups.length === 0) {
      return {
        total_score: 0,
        weeks_played: 0,
        avg_score: 0,
        best_rank: null,
        total_wins: 0,
      };
    }

    const totalScore = lineups.reduce((sum, l) => sum + (l.total_score || 0), 0);
    const avgScore = totalScore / lineups.length;
    const bestRank = Math.min(...lineups.map((l) => l.rank || 999));
    const totalWins = lineups.filter((l) => l.rank === 1).length;

    return {
      total_score: totalScore,
      weeks_played: lineups.length,
      avg_score: avgScore,
      best_rank: bestRank === 999 ? null : bestRank,
      total_wins: totalWins,
    };
  }

  /**
   * Get prize pool info for a week
   */
  async getWeekPrizePool(weekId: string) {
    const { data: prizePool } = await supabase
      .from('prize_pools')
      .select('*')
      .eq('week_id', weekId)
      .single();

    if (!prizePool) {
      // Return default prize structure
      return {
        total_pool: 1000,
        first_place: 500,
        second_place: 300,
        third_place: 200,
        currency: 'USD',
      };
    }

    return prizePool;
  }
}

export const leaderboardService = new LeaderboardService();
