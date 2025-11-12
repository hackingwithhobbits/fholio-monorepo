// apps/backend/src/services/subscription.service.ts

import { supabase } from '../config/database';
import { Subscription } from '../types/database.types';

export class SubscriptionService {
  /**
   * Get user's current subscription
   */
  async getUserSubscription(userId: string): Promise<Subscription | null> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  /**
   * Create default free subscription for new user
   */
  async createDefaultSubscription(userId: string): Promise<Subscription> {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        tier: 'Free',
        picks_limit: 5,
        votes_limit: 10,
        started_at: new Date().toISOString(),
        renews_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Upgrade user's subscription tier
   */
  async upgradeTier(userId: string, newTier: 'Standard' | 'Premium'): Promise<Subscription> {
    // Define tier limits
    const tierLimits = {
      Standard: { picks_limit: 5, votes_limit: 20 },
      Premium: { picks_limit: 10, votes_limit: 50 },
    };

    const limits = tierLimits[newTier];

    // Get current subscription
    const currentSub = await this.getUserSubscription(userId);

    if (!currentSub) {
      throw new Error('No active subscription found');
    }

    // Check if already at this tier or higher
    if (currentSub.tier === newTier) {
      throw new Error('Already subscribed to this tier');
    }

    if (currentSub.tier === 'Premium' && newTier === 'Standard') {
      throw new Error('Cannot downgrade from Premium to Standard');
    }

    // Update subscription
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        tier: newTier,
        picks_limit: limits.picks_limit,
        votes_limit: limits.votes_limit,
        started_at: new Date().toISOString(),
        renews_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .eq('user_id', userId)
      .eq('is_active', true)
      .select()
      .single();

    if (error) throw error;

    // TODO: Process payment here (Stripe integration)

    return data;
  }

  /**
   * Cancel subscription (downgrade to Free)
   */
  async cancelSubscription(userId: string): Promise<void> {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        tier: 'Free',
        picks_limit: 5,
        votes_limit: 10,
        is_active: true,
      })
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) throw error;
  }

  /**
   * Get available subscription tiers
   */
  async getAvailableTiers() {
    return [
      {
        tier: 'Free',
        price: 0,
        picks_limit: 5,
        votes_limit: 10,
        features: [
          '5 artist picks per week',
          '10 votes per week',
          'Basic leaderboard access',
          'Weekly challenges',
        ],
      },
      {
        tier: 'Standard',
        price: 9.99,
        picks_limit: 5,
        votes_limit: 20,
        features: [
          '5 artist picks per week',
          '20 votes per week',
          'Full leaderboard access',
          'All weekly challenges',
          'Early lineup lock',
          'Performance analytics',
        ],
      },
      {
        tier: 'Premium',
        price: 19.99,
        picks_limit: 10,
        votes_limit: 50,
        features: [
          '10 artist picks per week',
          '50 votes per week',
          'Full leaderboard access',
          'All weekly challenges',
          'Early lineup lock',
          'Advanced analytics',
          'Captain bonus (1.5x)',
          'Exclusive challenges',
          'Priority support',
        ],
      },
    ];
  }

  /**
   * Check if user has premium features
   */
  async hasPremiumAccess(userId: string): Promise<boolean> {
    const subscription = await this.getUserSubscription(userId);
    return subscription?.tier === 'Premium';
  }

  /**
   * Renew expired subscriptions
   */
  async renewSubscription(userId: string): Promise<Subscription> {
    const subscription = await this.getUserSubscription(userId);

    if (!subscription) {
      throw new Error('No subscription found');
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        renews_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .eq('user_id', userId)
      .eq('is_active', true)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
