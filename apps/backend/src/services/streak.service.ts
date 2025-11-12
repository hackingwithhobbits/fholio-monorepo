// apps/backend/src/services/streak.service.ts

import { supabase } from '../config/database';

export class StreakService {
  /**
   * Get user's current streak
   */
  async getUserStreak(userId: string, type: string = 'weekly_lineup') {
    const { data, error } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', userId)
      .eq('type', type)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  /**
   * Update streak (called after each week)
   */
  async updateStreak(userId: string, weekId: string, participated: boolean) {
    const streakType = 'weekly_lineup';
    const currentStreak = await this.getUserStreak(userId, streakType);

    if (participated) {
      if (currentStreak) {
        // Increment streak
        const newCount = currentStreak.current_count + 1;

        await supabase
          .from('streaks')
          .update({
            current_count: newCount,
            last_updated: new Date().toISOString(),
          })
          .eq('id', currentStreak.id);

        // Check for milestone rewards
        await this.checkMilestones(userId, newCount, streakType);

        return newCount;
      } else {
        // Start new streak
        const { data } = await supabase
          .from('streaks')
          .insert({
            user_id: userId,
            type: streakType,
            current_count: 1,
            longest_count: 1,
            is_active: true,
            last_updated: new Date().toISOString(),
          })
          .select()
          .single();

        return 1;
      }
    } else {
      if (currentStreak && currentStreak.current_count > 0) {
        // Break streak
        await supabase
          .from('streaks')
          .update({
            current_count: 0,
            is_active: false,
            broken_at: new Date().toISOString(),
          })
          .eq('id', currentStreak.id);

        return 0;
      }
    }

    return 0;
  }

  /**
   * Check and award milestone rewards
   */
  private async checkMilestones(userId: string, streakCount: number, streakType: string) {
    const milestones = [3, 5, 10, 15, 20, 30, 50, 100];

    if (milestones.includes(streakCount)) {
      // Check if milestone already awarded
      const { data: existing } = await supabase
        .from('streak_milestones')
        .select('*')
        .eq('user_id', userId)
        .eq('streak_type', streakType)
        .eq('milestone_count', streakCount)
        .single();

      if (!existing) {
        // Award milestone
        const reward = this.calculateMilestoneReward(streakCount);

        await supabase.from('streak_milestones').insert({
          user_id: userId,
          streak_type: streakType,
          milestone_count: streakCount,
          reward_amount: reward,
          achieved_at: new Date().toISOString(),
        });

        // Add reward to wallet
        const { WalletService } = await import('./wallet.service');
        const walletService = new WalletService();
        await walletService.addFunds(userId, reward, 'bonus', `streak_${streakCount}`);

        // Create notification
        await this.createStreakNotification(userId, streakCount, reward);
      }
    }
  }

  /**
   * Calculate milestone reward
   */
  private calculateMilestoneReward(streakCount: number): number {
    const rewards: { [key: number]: number } = {
      3: 10,
      5: 25,
      10: 50,
      15: 75,
      20: 100,
      30: 200,
      50: 500,
      100: 1000,
    };

    return rewards[streakCount] || 0;
  }

  /**
   * Create streak notification
   */
  private async createStreakNotification(userId: string, streakCount: number, reward: number) {
    await supabase.from('notifications').insert({
      user_id: userId,
      type: 'streak_milestone',
      title: `${streakCount}-Week Streak!`,
      message: `Congratulations! You've earned $${reward} for your ${streakCount}-week streak!`,
      data: { streakCount, reward },
      is_read: false,
    });
  }

  /**
   * Get user's streak statistics
   */
  async getStreakStats(userId: string) {
    const { data: streaks } = await supabase.from('streaks').select('*').eq('user_id', userId);

    const { data: milestones } = await supabase
      .from('streak_milestones')
      .select('*')
      .eq('user_id', userId)
      .order('milestone_count', { ascending: false });

    const currentStreak = streaks?.find((s) => s.is_active);
    const longestStreak = Math.max(...(streaks?.map((s) => s.longest_count) || [0]));
    const totalMilestones = milestones?.length || 0;
    const totalRewards = milestones?.reduce((sum, m) => sum + m.reward_amount, 0) || 0;

    return {
      currentStreak: currentStreak?.current_count || 0,
      longestStreak,
      totalMilestones,
      totalRewards,
      milestones: milestones || [],
    };
  }

  /**
   * Get streak leaderboard
   */
  async getStreakLeaderboard(limit: number = 100) {
    const { data, error } = await supabase
      .from('streaks')
      .select(
        `
        *,
        user:users(id, display_name, avatar_url)
      `
      )
      .eq('is_active', true)
      .order('current_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}
