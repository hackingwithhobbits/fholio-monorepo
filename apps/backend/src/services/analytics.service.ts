// apps/backend/src/services/analytics.service.ts

import { supabase } from '../config/database';

export class AnalyticsService {
  /**
   * Get platform-wide statistics
   */
  async getPlatformStats() {
    // Total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Active users (played in last 4 weeks)
    const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString();
    const { count: activeUsers } = await supabase
      .from('fan_lineups')
      .select('user_id', { count: 'exact', head: true })
      .gte('created_at', fourWeeksAgo);

    // Total money distributed
    const { data: payouts } = await supabase
      .from('transactions')
      .select('amount')
      .eq('type', 'payout');

    const totalDistributed = (payouts || []).reduce((sum, t) => sum + t.amount, 0);

    // Total weeks completed
    const { count: weeksCompleted } = await supabase
      .from('weeks')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    // Average participants per week
    const { data: weeklyParticipation } = await supabase
      .from('fan_lineups')
      .select('week_id')
      .eq('is_locked', true);

    const weekGroups = (weeklyParticipation || []).reduce((acc, curr) => {
      acc[curr.week_id] = (acc[curr.week_id] || 0) + 1;
      return acc;
    }, {} as any);

    const avgParticipants =
      Object.keys(weekGroups).length > 0
        ? Object.values(weekGroups).reduce((sum: number, count: any) => sum + count, 0) /
          Object.keys(weekGroups).length
        : 0;

    return {
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      totalDistributed,
      weeksCompleted: weeksCompleted || 0,
      avgParticipantsPerWeek: Math.round(avgParticipants),
    };
  }

  /**
   * Get weekly analytics
   */
  async getWeeklyAnalytics(weekId: string) {
    // Participant count
    const { count: participants } = await supabase
      .from('fan_lineups')
      .select('*', { count: 'exact', head: true })
      .eq('week_id', weekId);

    // Vote count
    const { count: votes } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('week_id', weekId);

    // Prize pool
    const { data: prizePool } = await supabase
      .from('prize_pools')
      .select('amount')
      .eq('week_id', weekId)
      .eq('pool_type', 'core')
      .single();

    // Lineups by tier
    const { data: lineupsByTier } = await supabase
      .from('fan_lineups')
      .select(
        `
        user_id,
        users(tier)
      `
      )
      .eq('week_id', weekId);

    const tierDistribution = (lineupsByTier || []).reduce((acc, curr) => {
      const tier = curr.users?.tier || 'Bronze';
      acc[tier] = (acc[tier] || 0) + 1;
      return acc;
    }, {} as any);

    // Top genres
    const { data: topGenres } = await supabase
      .from('lineup_artists')
      .select(
        `
        artist:artists(genre)
      `
      )
      .in(
        'lineup_id',
        (await supabase.from('fan_lineups').select('id').eq('week_id', weekId)).data?.map(
          (l) => l.id
        ) || []
      );

    const genreCounts = (topGenres || []).reduce((acc, curr) => {
      const genre = curr.artist?.genre || 'Unknown';
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {} as any);

    return {
      participants: participants || 0,
      votes: votes || 0,
      prizePool: prizePool?.amount || 0,
      tierDistribution,
      topGenres: Object.entries(genreCounts)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 5)
        .map(([genre, count]) => ({ genre, count })),
    };
  }

  /**
   * Get user analytics
   */
  async getUserAnalytics(userId: string) {
    // Participation stats
    const { data: lineups } = await supabase
      .from('fan_lineups')
      .select('total_score, rank, week_id')
      .eq('user_id', userId);

    // Voting stats
    const { count: totalVotes } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Earnings
    const { data: earnings } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', userId)
      .eq('type', 'payout');

    const totalEarnings = (earnings || []).reduce((sum, t) => sum + t.amount, 0);

    // Performance over time
    const performanceData = (lineups || []).map((l) => ({
      weekId: l.week_id,
      score: l.total_score,
      rank: l.rank,
    }));

    // Best and worst weeks
    const sortedByScore = [...(lineups || [])].sort((a, b) => b.total_score - a.total_score);
    const bestWeek = sortedByScore[0];
    const worstWeek = sortedByScore[sortedByScore.length - 1];

    return {
      weeksPlayed: lineups?.length || 0,
      totalVotes: totalVotes || 0,
      totalEarnings,
      averageScore:
        lineups && lineups.length > 0
          ? lineups.reduce((sum, l) => sum + l.total_score, 0) / lineups.length
          : 0,
      averageRank:
        lineups && lineups.length > 0
          ? lineups.reduce((sum, l) => sum + (l.rank || 0), 0) / lineups.length
          : 0,
      bestWeek,
      worstWeek,
      performanceData,
    };
  }

  /**
   * Get artist analytics
   */
  async getArtistAnalytics(artistId: string) {
    // Weekly performance
    const { data: weeklyPerformance } = await supabase
      .from('artist_week')
      .select(
        `
        *,
        week:weeks(week_number, week_starting)
      `
      )
      .eq('artist_id', artistId)
      .order('week.week_starting', { ascending: false })
      .limit(10);

    // Times picked
    const { count: timesPicked } = await supabase
      .from('lineup_artists')
      .select('*', { count: 'exact', head: true })
      .eq('artist_id', artistId);

    // Total votes received
    const { data: votes } = await supabase
      .from('votes')
      .select('vote_count')
      .eq('artist_id', artistId);

    const totalVotes = (votes || []).reduce((sum, v) => sum + v.vote_count, 0);

    // Average score
    const avgScore =
      weeklyPerformance && weeklyPerformance.length > 0
        ? weeklyPerformance.reduce((sum, w) => sum + w.score, 0) / weeklyPerformance.length
        : 0;

    return {
      weeksActive: weeklyPerformance?.length || 0,
      timesPicked: timesPicked || 0,
      totalVotes,
      averageScore: avgScore,
      weeklyPerformance,
    };
  }

  /**
   * Generate report
   */
  async generateReport(type: string, startDate: string, endDate: string) {
    const reportData: any = {
      type,
      startDate,
      endDate,
      generatedAt: new Date().toISOString(),
    };

    switch (type) {
      case 'weekly_summary':
        // Get all weeks in date range
        const { data: weeks } = await supabase
          .from('weeks')
          .select('*')
          .gte('week_starting', startDate)
          .lte('week_starting', endDate);

        reportData.weeks = await Promise.all(
          (weeks || []).map((w) => this.getWeeklyAnalytics(w.id))
        );
        break;

      case 'user_engagement':
        reportData.platformStats = await this.getPlatformStats();
        break;

      case 'revenue':
        const { data: transactions } = await supabase
          .from('transactions')
          .select('*')
          .gte('created_at', startDate)
          .lte('created_at', endDate);

        reportData.transactions = transactions;
        reportData.totalRevenue = (transactions || [])
          .filter((t) => t.type === 'entry_fee')
          .reduce((sum, t) => sum + t.amount, 0);
        break;
    }

    // Save report
    const { data: report, error } = await supabase
      .from('reports')
      .insert({
        type,
        start_date: startDate,
        end_date: endDate,
        data: reportData,
        generated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return report;
  }
}
