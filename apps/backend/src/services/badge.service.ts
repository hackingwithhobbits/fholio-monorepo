// apps/backend/src/services/badge.service.ts

import { supabase } from '../config/database';

export class BadgeService {
  /**
   * Get all available badges
   */
  async getAllBadges() {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .order('category', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get user's badges
   */
  async getUserBadges(userId: string) {
    const { data, error } = await supabase
      .from('user_badges')
      .select(
        `
        *,
        badge:badges(*)
      `
      )
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Award badge to user
   */
  async awardBadge(userId: string, badgeId: string, metadata?: any) {
    // Check if already has badge
    const { data: existing } = await supabase
      .from('user_badges')
      .select('*')
      .eq('user_id', userId)
      .eq('badge_id', badgeId)
      .single();

    if (existing) {
      throw new Error('Badge already earned');
    }

    // Get badge details
    const { data: badge } = await supabase.from('badges').select('*').eq('id', badgeId).single();

    if (!badge) throw new Error('Badge not found');

    // Award badge
    const { data: userBadge, error } = await supabase
      .from('user_badges')
      .insert({
        user_id: userId,
        badge_id: badgeId,
        earned_at: new Date().toISOString(),
        metadata,
      })
      .select()
      .single();

    if (error) throw error;

    // Create notification
    await supabase.from('notifications').insert({
      user_id: userId,
      type: 'badge_earned',
      title: `New Badge: ${badge.name}!`,
      message: badge.description,
      data: { badgeId, badgeName: badge.name },
      is_read: false,
    });

    // Award points if applicable
    if (badge.points) {
      // Update user tier/rank based on points
      await this.updateUserPoints(userId, badge.points);
    }

    return userBadge;
  }

  /**
   * Check and award achievement badges
   */
  async checkAndAwardBadges(userId: string) {
    // Get user stats
    const { data: lineups } = await supabase
      .from('fan_lineups')
      .select('rank')
      .eq('user_id', userId);

    const { data: transactions } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', userId)
      .eq('type', 'payout');

    const totalEarnings = (transactions || []).reduce((sum, t) => sum + t.amount, 0);
    const top10Finishes = (lineups || []).filter((l) => l.rank && l.rank <= 10).length;
    const weekCount = lineups?.length || 0;

    // Check badges
    const badgesToAward = [];

    // First Win
    if (top10Finishes >= 1) {
      badgesToAward.push({ slug: 'first_win', name: 'First Win' });
    }

    // Big Earner
    if (totalEarnings >= 1000) {
      badgesToAward.push({ slug: 'big_earner', name: 'Big Earner' });
    }

    // Veteran
    if (weekCount >= 10) {
      badgesToAward.push({ slug: 'veteran', name: 'Veteran' });
    }

    // Award each badge
    for (const badge of badgesToAward) {
      try {
        const { data: badgeData } = await supabase
          .from('badges')
          .select('id')
          .eq('slug', badge.slug)
          .single();

        if (badgeData) {
          await this.awardBadge(userId, badgeData.id);
        }
      } catch (error) {
        // Badge might already be awarded
        continue;
      }
    }
  }

  /**
   * Update user points
   */
  private async updateUserPoints(userId: string, points: number) {
    // This could update a user_stats table or user tier
    // For now, we'll just log it
    console.log(`User ${userId} earned ${points} points`);
  }

  /**
   * Create badge (Admin)
   */
  async createBadge(data: {
    name: string;
    description: string;
    category: string;
    icon_url: string;
    slug: string;
    points?: number;
  }) {
    const { data: badge, error } = await supabase.from('badges').insert(data).select().single();

    if (error) throw error;
    return badge;
  }

  /**
   * Get badge categories
   */
  getBadgeCategories() {
    return [
      {
        category: 'achievement',
        badges: [
          { name: 'First Win', slug: 'first_win', description: 'Finish in top 10' },
          { name: 'Perfect Week', slug: 'perfect_week', description: 'All 5 artists in top 10' },
          { name: 'Big Earner', slug: 'big_earner', description: 'Earn $1000+' },
          { name: 'Champion', slug: 'champion', description: 'Win 1st place' },
        ],
      },
      {
        category: 'participation',
        badges: [
          { name: 'Newcomer', slug: 'newcomer', description: 'Complete first lineup' },
          { name: 'Veteran', slug: 'veteran', description: 'Play 10 weeks' },
          { name: 'Loyal', slug: 'loyal', description: '5-week streak' },
          { name: 'Dedicated', slug: 'dedicated', description: 'Play 50 weeks' },
        ],
      },
      {
        category: 'social',
        badges: [
          { name: 'Influencer', slug: 'influencer', description: '10 successful referrals' },
          { name: 'Community Leader', slug: 'community_leader', description: '100 post likes' },
          { name: 'Helper', slug: 'helper', description: 'Help 5 new users' },
        ],
      },
      {
        category: 'special',
        badges: [
          { name: 'Early Adopter', slug: 'early_adopter', description: 'Joined in beta' },
          { name: 'Premium Member', slug: 'premium_member', description: 'Subscribe to Premium' },
          { name: 'Challenge Master', slug: 'challenge_master', description: 'Win 10 challenges' },
        ],
      },
    ];
  }
}
