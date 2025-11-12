// apps/backend/src/services/user.service.ts

import { supabase } from '../config/database';

export class UserService {
  /**
   * Get user profile
   */
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Create user profile (called on signup)
   */
  async createUserProfile(
    userId: string,
    email: string,
    displayName?: string,
    userType: 'fan' | 'artist' = 'fan'
  ) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: userId,
        email,
        display_name: displayName || email.split('@')[0],
        user_type: userType,
        tier: 'Bronze',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    // Create default subscription
    const subscriptionService = new (await import('./subscription.service')).SubscriptionService();
    await subscriptionService.createDefaultSubscription(userId);

    // Create wallet
    await supabase.from('wallets').insert({
      user_id: userId,
      balance: 0
    });

    return data;
  }

  /**
   * Update user profile
   */
  async updateUserProfile(
    userId: string,
    updates: {
      display_name?: string;
      avatar_url?: string;
      bio?: string;
    }
  ) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get user stats
   */
  async getUserStats(userId: string) {
    // Get lineup stats
    const { data: lineups } = await supabase
      .from('fan_lineups')
      .select('total_score, rank')
      .eq('user_id', userId)
      .order('week.week_starting', { ascending: false });

    // Get earnings
    const { data: transactions } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', userId)
      .eq('type', 'payout');

    const totalEarnings = (transactions || []).reduce((sum, t) => sum + t.amount, 0);
    const weeklyEarnings = (transactions || [])
      .slice(0, 1)
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate tier based on earnings
    const tier = this.calculateTier(totalEarnings);

    // Get best rank
    const bestRank = lineups && lineups.length > 0
      ? Math.min(...lineups.map(l => l.rank || 9999))
      : null;

    // Get average score
    const avgScore = lineups && lineups.length > 0
      ? lineups.reduce((sum, l) => sum + l.total_score, 0) / lineups.length
      : 0;

    return {
      totalEarnings,
      weeklyEarnings,
      lifetimeEarnings: totalEarnings,
      tier,
      weeksPlayed: lineups?.length || 0,
      bestRank,
      averageScore: avgScore,
      winRate: this.calculateWinRate(lineups || [])
    };
  }

  /**
   * Get public profile (for viewing other users)
   */
  async getPublicProfile(userId: string) {
    const profile = await this.getUserProfile(userId);
    const stats = await this.getUserStats(userId);

    // Return only public information
    return {
      id: profile.id,
      display_name: profile.display_name,
      avatar_url: profile.avatar_url,
      tier: profile.tier,
      stats: {
        weeksPlayed: stats.weeksPlayed,
        bestRank: stats.bestRank,
        tier: stats.tier
        // Don't expose earnings in public profile
      }
    };
  }

  /**
   * Calculate tier based on earnings
   */
  private calculateTier(totalEarnings: number): string {
    if (totalEarnings >= 10000) return 'Platinum';
    if (totalEarnings >= 5000) return 'Gold';
    if (totalEarnings >= 1000) return 'Silver';
    return 'Bronze';
  }

  /**
   * Calculate win rate (top 10 finishes / total weeks)
   */
  private calculateWinRate(lineups: any[]): number {
    if (lineups.length === 0) return 0;
    const top10Finishes = lineups.filter(l => l.rank && l.rank <= 10).length;
    return (top10Finishes / lineups.length) * 100;
  }

  /**
   * Search users by display name
   */
  async searchUsers(query: string, limit: number = 20) {
    const { data, error } = await supabase
      .from('users')
      .select('id, display_name, avatar_url, tier')
      .ilike('display_name', `%${query}%`)
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get user's followers (for social features)
   */
  async getUserFollowers(userId: string) {
    const { data, error } = await supabase
      .from('user_follows')
      .select(`
        follower:follower_id(id, display_name, avatar_url)
      `)
      .eq('following_id', userId);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get users that user is following
   */
  async getUserFollowing(userId: string) {
    const { data, error } = await supabase
      .from('user_follows')
      .select(`
        following:following_id(id, display_name, avatar_url)
      `)
      .eq('follower_id', userId);

    if (error) throw error;
    return data || [];
  }

  /**
   * Follow a user
   */
  async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new Error('Cannot follow yourself');
    }

    const { data, error } = await supabase
      .from('user_follows')
      .insert({
        follower_id: followerId,
        following_id: followingId
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('Already following this user');
      }
      throw error;
    }

    return data;
  }

  /**
   * Unfollow a user
   */
  async unfollowUser(followerId: string, followingId: string) {
    const { error } = await supabase
      .from('user_follows')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId);

    if (error) throw error;
  }
}