// apps/backend/src/services/referral.service.ts

import { supabase } from '../config/database';

export class ReferralService {
  /**
   * Generate referral code for user
   */
  async generateReferralCode(userId: string): Promise<string> {
    // Check if user already has a code
    const { data: existing } = await supabase
      .from('referral_stats')
      .select('referral_code')
      .eq('user_id', userId)
      .single();

    if (existing?.referral_code) {
      return existing.referral_code;
    }

    // Generate unique code
    const code = this.createUniqueCode();

    // Create referral stats record
    await supabase.from('referral_stats').insert({
      user_id: userId,
      referral_code: code,
      total_referrals: 0,
      successful_referrals: 0,
      total_earnings: 0,
    });

    return code;
  }

  /**
   * Create unique referral code
   */
  private createUniqueCode(): string {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  /**
   * Apply referral code during signup
   */
  async applyReferralCode(newUserId: string, referralCode: string) {
    // Find referrer by code
    const { data: referrerStats } = await supabase
      .from('referral_stats')
      .select('user_id')
      .eq('referral_code', referralCode)
      .single();

    if (!referrerStats) {
      throw new Error('Invalid referral code');
    }

    const referrerId = referrerStats.user_id;

    // Prevent self-referral
    if (referrerId === newUserId) {
      throw new Error('Cannot use your own referral code');
    }

    // Create referral record
    const { data: referral, error } = await supabase
      .from('referrals')
      .insert({
        referrer_user_id: referrerId,
        referred_user_id: newUserId,
        referral_code: referralCode,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Update referrer stats
    await supabase
      .from('referral_stats')
      .update({
        total_referrals: supabase.sql`total_referrals + 1`,
      })
      .eq('user_id', referrerId);

    // Give signup bonus to new user
    const { WalletService } = await import('./wallet.service');
    const walletService = new WalletService();
    await walletService.addFunds(newUserId, 10, 'bonus', 'signup_bonus');

    return referral;
  }

  /**
   * Mark referral as successful (after first lineup)
   */
  async markReferralSuccessful(referredUserId: string) {
    const { data: referral } = await supabase
      .from('referrals')
      .select('*')
      .eq('referred_user_id', referredUserId)
      .eq('status', 'pending')
      .single();

    if (!referral) return;

    // Calculate reward based on tier
    const { data: tier } = await supabase
      .from('referral_tiers')
      .select('*')
      .order('min_referrals', { ascending: false })
      .limit(1)
      .single();

    const rewardAmount = tier?.reward_per_referral || 35; // Default $35

    // Update referral status
    await supabase
      .from('referrals')
      .update({
        status: 'completed',
        reward_amount: rewardAmount,
        completed_at: new Date().toISOString(),
      })
      .eq('id', referral.id);

    // Update referrer stats
    await supabase
      .from('referral_stats')
      .update({
        successful_referrals: supabase.sql`successful_referrals + 1`,
        total_earnings: supabase.sql`total_earnings + ${rewardAmount}`,
      })
      .eq('user_id', referral.referrer_user_id);

    // Give reward to referrer
    const { WalletService } = await import('./wallet.service');
    const walletService = new WalletService();
    await walletService.addFunds(
      referral.referrer_user_id,
      rewardAmount,
      'bonus',
      `referral_${referral.id}`
    );

    // Create notification
    await supabase.from('notifications').insert({
      user_id: referral.referrer_user_id,
      type: 'referral_success',
      title: 'Referral Bonus!',
      message: `You earned $${rewardAmount} from a successful referral!`,
      data: { referralId: referral.id, amount: rewardAmount },
      is_read: false,
    });
  }

  /**
   * Get user's referral stats
   */
  async getReferralStats(userId: string) {
    const { data: stats } = await supabase
      .from('referral_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    const { data: referrals } = await supabase
      .from('referrals')
      .select(
        `
        *,
        referred_user:users!referred_user_id(display_name, avatar_url)
      `
      )
      .eq('referrer_user_id', userId)
      .order('created_at', { ascending: false });

    return {
      referralCode: stats?.referral_code || (await this.generateReferralCode(userId)),
      totalReferrals: stats?.total_referrals || 0,
      successfulReferrals: stats?.successful_referrals || 0,
      totalEarnings: stats?.total_earnings || 0,
      referrals: referrals || [],
    };
  }

  /**
   * Get referral leaderboard
   */
  async getReferralLeaderboard(limit: number = 100) {
    const { data, error } = await supabase
      .from('referral_stats')
      .select(
        `
        *,
        user:users(id, display_name, avatar_url)
      `
      )
      .order('successful_referrals', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}
