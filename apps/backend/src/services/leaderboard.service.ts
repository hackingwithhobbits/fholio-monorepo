// apps/backend/src/services/leaderboard.service.ts

import { supabase } from '../config/database';

export class LeaderboardService {
  /**
   * Get top fans for a week
   */
  async getTopFans(weekId: string, limit: number = 100) {
    const { data, error } = await supabase
      .from('fan_lineups')
      .select(
        `
        *,
        user:users(
          id,
          display_name,
          avatar_url,
          tier
        )
      `
      )
      .eq('week_id', weekId)
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) throw error;

    // Calculate earnings estimate (placeholder until payout calculated)
    return (data || []).map((lineup, index) => ({
      ...lineup,
      estimatedEarnings: this.estimateEarnings(index + 1),
    }));
  }

  /**
   * Get top artists for a week
   */
  async getTopArtists(weekId: string, limit: number = 50) {
    const { data, error } = await supabase
      .from('artist_week')
      .select(
        `
        *,
        artist:artists(
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
      .eq('is_top_50', true)
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get global all-time leaderboard
   */
  async getGlobalLeaderboard(type: 'fans' | 'artists', limit: number = 100) {
    if (type === 'fans') {
      // Aggregate fan earnings across all weeks
      const { data, error } = await supabase
        .from('transactions')
        .select(
          `
          user_id,
          user:users(id, display_name, avatar_url, tier),
          amount
        `
        )
        .eq('type', 'payout')
        .order('amount', { ascending: false });

      if (error) throw error;

      // Group by user and sum earnings
      const userEarnings = (data || []).reduce((acc, transaction) => {
        const userId = transaction.user_id;
        if (!acc[userId]) {
          acc[userId] = {
            user: transaction.user,
            totalEarnings: 0,
            payoutCount: 0,
          };
        }
        acc[userId].totalEarnings += transaction.amount;
        acc[userId].payoutCount += 1;
        return acc;
      }, {} as any);

      // Convert to array and sort
      const leaderboard = Object.values(userEarnings)
        .sort((a: any, b: any) => b.totalEarnings - a.totalEarnings)
        .slice(0, limit)
        .map((entry: any, index) => ({
          rank: index + 1,
          ...entry,
        }));

      return leaderboard;
    } else {
      // Artist global leaderboard
      const { data, error } = await supabase
        .from('artist_week')
        .select(
          `
          artist_id,
          artist:artists(id, name, image_url, genre, league),
          score
        `
        )
        .order('score', { ascending: false });

      if (error) throw error;

      // Group by artist and calculate average score
      const artistScores = (data || []).reduce((acc, aw) => {
        const artistId = aw.artist_id;
        if (!acc[artistId]) {
          acc[artistId] = {
            artist: aw.artist,
            totalScore: 0,
            weekCount: 0,
            avgScore: 0,
          };
        }
        acc[artistId].totalScore += aw.score;
        acc[artistId].weekCount += 1;
        acc[artistId].avgScore = acc[artistId].totalScore / acc[artistId].weekCount;
        return acc;
      }, {} as any);

      // Convert to array and sort by average score
      const leaderboard = Object.values(artistScores)
        .sort((a: any, b: any) => b.avgScore - a.avgScore)
        .slice(0, limit)
        .map((entry: any, index) => ({
          rank: index + 1,
          ...entry,
        }));

      return leaderboard;
    }
  }

  /**
   * Get user's rank in current week
   */
  async getUserRank(userId: string, weekId: string) {
    const { data, error } = await supabase
      .from('fan_lineups')
      .select('rank, total_score')
      .eq('user_id', userId)
      .eq('week_id', weekId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  /**
   * Get user's rank history
   */
  async getUserRankHistory(userId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('fan_lineups')
      .select(
        `
        rank,
        total_score,
        week:weeks(week_number, week_starting)
      `
      )
      .eq('user_id', userId)
      .order('week.week_starting', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Estimate earnings based on rank (before payout)
   */
  private estimateEarnings(rank: number): number {
    // Placeholder estimates based on typical $20k pool
    const poolSize = 20000;
    const fanShare = poolSize * 0.6; // 60% to fans

    if (rank === 1) return fanShare * 0.2;
    if (rank === 2) return fanShare * 0.12;
    if (rank === 3) return fanShare * 0.08;
    if (rank <= 10) return fanShare * 0.05;
    if (rank <= 50) return fanShare * 0.01;
    if (rank <= 100) return fanShare * 0.003;
    return 0;
  }

  /**
   * Get leaderboard statistics
   */
  async getLeaderboardStats(weekId: string) {
    const { data: fanData } = await supabase
      .from('fan_lineups')
      .select('total_score')
      .eq('week_id', weekId);

    const scores = (fanData || []).map((f) => f.total_score);

    return {
      totalParticipants: scores.length,
      averageScore: scores.reduce((a, b) => a + b, 0) / scores.length || 0,
      medianScore: this.calculateMedian(scores),
      highScore: Math.max(...scores, 0),
      lowScore: Math.min(...scores, 0),
    };
  }

  private calculateMedian(values: number[]): number {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
  }
}
