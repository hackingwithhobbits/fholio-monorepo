// apps/backend/src/services/wallet.service.ts

import { supabase } from '../config/database';
import { Transaction } from '../types/database.types';

export class WalletService {
  /**
   * Get user's wallet
   */
  async getUserWallet(userId: string) {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    
    // Create wallet if doesn't exist
    if (!data) {
      return this.createWallet(userId);
    }

    return data;
  }

  /**
   * Create wallet for new user
   */
  async createWallet(userId: string) {
    const { data, error } = await supabase
      .from('wallets')
      .insert({
        user_id: userId,
        balance: 0
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get recent transactions
   */
  async getRecentTransactions(userId: string, limit: number = 20) {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        week:weeks(week_number)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Add funds to wallet
   */
  async addFunds(userId: string, amount: number, type: string = 'payout', refId?: string) {
    // Update wallet balance
    const wallet = await this.getUserWallet(userId);
    const newBalance = wallet.balance + amount;

    const { error: walletError } = await supabase
      .from('wallets')
      .update({ balance: newBalance })
      .eq('user_id', userId);

    if (walletError) throw walletError;

    // Create transaction record
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type,
        amount,
        ref_id: refId,
        status: 'completed',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Deduct funds from wallet
   */
  async deductFunds(userId: string, amount: number, type: string = 'purchase', refId?: string) {
    const wallet = await this.getUserWallet(userId);

    if (wallet.balance < amount) {
      throw new Error('Insufficient funds');
    }

    const newBalance = wallet.balance - amount;

    const { error: walletError } = await supabase
      .from('wallets')
      .update({ balance: newBalance })
      .eq('user_id', userId);

    if (walletError) throw walletError;

    // Create transaction record
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type,
        amount: -amount, // Negative for deductions
        ref_id: refId,
        status: 'completed',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Request withdrawal
   */
  async requestWithdrawal(userId: string, amount: number, method: string = 'paypal') {
    const wallet = await this.getUserWallet(userId);

    // Minimum withdrawal amount
    if (amount < 10) {
      throw new Error('Minimum withdrawal amount is $10');
    }

    if (wallet.balance < amount) {
      throw new Error('Insufficient funds');
    }

    // Create pending withdrawal transaction
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: 'withdrawal',
        amount: -amount,
        status: 'pending',
        metadata: { method },
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    // Reserve the amount (don't deduct yet until withdrawal is approved)
    // In production, you'd have a separate reserved_balance field

    return data;
  }

  /**
   * Process withdrawal (Admin function)
   */
  async processWithdrawal(transactionId: string, approved: boolean) {
    const { data: transaction } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .single();

    if (!transaction || transaction.type !== 'withdrawal') {
      throw new Error('Invalid withdrawal transaction');
    }

    if (approved) {
      // Deduct from wallet
      const wallet = await this.getUserWallet(transaction.user_id);
      const newBalance = wallet.balance + transaction.amount; // Amount is negative

      await supabase
        .from('wallets')
        .update({ balance: newBalance })
        .eq('user_id', transaction.user_id);

      // Update transaction status
      await supabase
        .from('transactions')
        .update({ status: 'completed' })
        .eq('id', transactionId);
    } else {
      // Reject withdrawal
      await supabase
        .from('transactions')
        .update({ status: 'failed' })
        .eq('id', transactionId);
    }
  }

  /**
   * Get wallet statistics
   */
  async getWalletStats(userId: string) {
    const transactions = await this.getRecentTransactions(userId, 1000);

    const stats = {
      totalEarned: 0,
      totalSpent: 0,
      totalWithdrawn: 0,
      pendingWithdrawals: 0
    };

    transactions.forEach(t => {
      if (t.type === 'payout' && t.status === 'completed') {
        stats.totalEarned += t.amount;
      } else if (t.type === 'purchase' && t.status === 'completed') {
        stats.totalSpent += Math.abs(t.amount);
      } else if (t.type === 'withdrawal') {
        if (t.status === 'completed') {
          stats.totalWithdrawn += Math.abs(t.amount);
        } else if (t.status === 'pending') {
          stats.pendingWithdrawals += Math.abs(t.amount);
        }
      }
    });

    return stats;
  }
}