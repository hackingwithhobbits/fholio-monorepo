// apps/backend/src/services/wallet.service.ts

import { supabase } from '../config/database';

export class WalletService {
  /**
   * Get user's wallet
   */
  async getUserWallet(userId: string) {
    const { data: wallet, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !wallet) {
      // Create wallet if doesn't exist
      const { data: newWallet, error: createError } = await supabase
        .from('wallets')
        .insert({
          user_id: userId,
          balance: 0,
          lifetime_earnings: 0,
        })
        .select()
        .single();

      if (createError) throw createError;
      return newWallet;
    }

    return wallet;
  }

  /**
   * Get wallet transactions with week info
   */
  async getTransactions(userId: string, limit: number = 20) {
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select(
        `
        *,
        week:weeks (
          id,
          week_number,
          start_date,
          end_date
        ),
        lineup:fan_lineups (
          id,
          total_score,
          rank
        )
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return transactions || [];
  }

  /**
   * Get earnings by week (from transactions)
   */
  async getWeeklyEarnings(userId: string) {
    const { data: earnings, error } = await supabase
      .from('transactions')
      .select(
        `
        *,
        week:weeks (
          id,
          week_number,
          start_date,
          end_date
        )
      `
      )
      .eq('user_id', userId)
      .eq('transaction_type', 'prize_payout')
      .eq('status', 'completed')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Group by week
    const weeklyMap = new Map();
    (earnings || []).forEach((earning: any) => {
      const weekId = earning.week_id;
      if (!weeklyMap.has(weekId)) {
        weeklyMap.set(weekId, {
          week: earning.week,
          totalAmount: 0,
          transactions: [],
        });
      }
      const weekData = weeklyMap.get(weekId);
      weekData.totalAmount += parseFloat(earning.amount);
      weekData.transactions.push(earning);
    });

    return Array.from(weeklyMap.values());
  }

  /**
   * Get current week earnings
   */
  async getCurrentWeekEarnings(userId: string) {
    // Get current active week
    const { data: currentWeek } = await supabase
      .from('weeks')
      .select('id')
      .eq('is_active', true)
      .single();

    if (!currentWeek) return 0;

    // Get earnings for current week
    const { data: earnings } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', userId)
      .eq('week_id', currentWeek.id)
      .eq('transaction_type', 'prize_payout')
      .eq('status', 'completed');

    const total = (earnings || []).reduce((sum, e) => sum + parseFloat(e.amount), 0);

    return total;
  }

  /**
   * Get referral stats
   */
  async getReferralStats(userId: string) {
    // Get user's referral code
    const { data: user } = await supabase
      .from('users')
      .select('referral_code')
      .eq('id', userId)
      .single();

    if (!user?.referral_code) {
      return {
        referralCount: 0,
        referralBonus: 0,
        referralCode: null,
      };
    }

    // Count referrals
    const { count: referralCount } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .eq('referred_by', user.referral_code);

    // Get referral earnings from transactions
    const { data: referralEarnings } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', userId)
      .eq('transaction_type', 'referral_bonus')
      .eq('status', 'completed');

    const totalReferralBonus = (referralEarnings || []).reduce(
      (sum, e) => sum + parseFloat(e.amount),
      0
    );

    return {
      referralCount: referralCount || 0,
      referralBonus: totalReferralBonus,
      referralCode: user.referral_code,
    };
  }

  /**
   * Get top earners for current week
   */
  async getTopEarners(limit: number = 5) {
    // Get current week
    const { data: currentWeek } = await supabase
      .from('weeks')
      .select('id')
      .eq('is_active', true)
      .single();

    if (!currentWeek) return [];

    // Get top earners from transactions
    const { data: earnings, error } = await supabase
      .from('transactions')
      .select(
        `
        user_id,
        amount,
        user:users (
          id,
          username,
          display_name
        )
      `
      )
      .eq('week_id', currentWeek.id)
      .eq('transaction_type', 'prize_payout')
      .eq('status', 'completed')
      .order('amount', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (earnings || []).map((earning: any, index: number) => ({
      rank: index + 1,
      userId: earning.user_id,
      username: earning.user.username || earning.user.display_name,
      earnings: parseFloat(earning.amount),
    }));
  }

  /**
   * Create withdrawal request
   */
  async createWithdrawal(userId: string, amount: number) {
    // Check if user has sufficient balance
    const wallet = await this.getUserWallet(userId);

    if (wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Minimum withdrawal amount
    if (amount < 10) {
      throw new Error('Minimum withdrawal amount is $10');
    }

    // Create withdrawal transaction
    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        transaction_type: 'withdrawal',
        amount: -amount,
        currency: 'USD',
        status: 'pending',
        description: 'Withdrawal request',
        balance_before: wallet.balance,
        balance_after: wallet.balance - amount,
      })
      .select()
      .single();

    if (error) throw error;

    // Update wallet balance
    await supabase
      .from('wallets')
      .update({
        balance: wallet.balance - amount,
      })
      .eq('user_id', userId);

    return transaction;
  }

  /**
   * Get wallet summary
   */
  async getWalletSummary(userId: string) {
    const wallet = await this.getUserWallet(userId);
    const currentWeekEarnings = await this.getCurrentWeekEarnings(userId);
    const referralStats = await this.getReferralStats(userId);
    const weeklyEarnings = await this.getWeeklyEarnings(userId);

    // Calculate average weekly earnings
    const totalWeeks = weeklyEarnings.length;
    const avgWeeklyEarnings = totalWeeks > 0 ? wallet.lifetime_earnings / totalWeeks : 0;

    return {
      balance: wallet.balance,
      lifetimeEarnings: wallet.lifetime_earnings,
      currentWeekEarnings,
      avgWeeklyEarnings,
      referralCount: referralStats.referralCount,
      referralBonus: referralStats.referralBonus,
      referralCode: referralStats.referralCode,
      totalWeeksActive: totalWeeks,
    };
  }
}

export const walletService = new WalletService();
