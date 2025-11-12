// apps/backend/src/services/admin.service.ts

import { supabase } from '../config/database';

export class AdminService {
  /**
   * Check if user is admin
   */
  async isAdmin(userId: string): Promise<boolean> {
    const { data } = await supabase
      .from('user_admin_roles')
      .select('role_id')
      .eq('user_id', userId)
      .single();

    return !!data;
  }

  /**
   * Get all users (paginated)
   */
  async getAllUsers(page: number = 1, limit: number = 50) {
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      users: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    };
  }

  /**
   * Ban user
   */
  async banUser(userId: string, reason: string, bannedBy: string) {
    // Update user status
    const { error } = await supabase
      .from('users')
      .update({
        is_banned: true,
        ban_reason: reason,
        banned_at: new Date().toISOString(),
        banned_by: bannedBy,
      })
      .eq('id', userId);

    if (error) throw error;

    // Log to audit
    await this.logAudit(bannedBy, 'ban_user', { userId, reason });
  }

  /**
   * Unban user
   */
  async unbanUser(userId: string, unbannedBy: string) {
    const { error } = await supabase
      .from('users')
      .update({
        is_banned: false,
        ban_reason: null,
        banned_at: null,
        banned_by: null,
      })
      .eq('id', userId);

    if (error) throw error;

    await this.logAudit(unbannedBy, 'unban_user', { userId });
  }

  /**
   * Manually adjust wallet balance (Admin)
   */
  async adjustWalletBalance(userId: string, amount: number, reason: string, adjustedBy: string) {
    const { data: wallet } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (!wallet) throw new Error('Wallet not found');

    const newBalance = wallet.balance + amount;

    await supabase.from('wallets').update({ balance: newBalance }).eq('user_id', userId);

    // Create transaction
    await supabase.from('transactions').insert({
      user_id: userId,
      type: amount > 0 ? 'bonus' : 'refund',
      amount: Math.abs(amount),
      status: 'completed',
      metadata: { reason, adjustedBy },
    });

    await this.logAudit(adjustedBy, 'adjust_wallet', { userId, amount, reason });
  }

  /**
   * Log admin action
   */
  async logAudit(adminId: string, action: string, data: any) {
    await supabase.from('audit_logs').insert({
      admin_id: adminId,
      action,
      data,
      created_at: new Date().toISOString(),
    });
  }

  /**
   * Get audit logs
   */
  async getAuditLogs(limit: number = 100) {
    const { data, error } = await supabase
      .from('audit_logs')
      .select(
        `
        *,
        admin:users(display_name)
      `
      )
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Manually trigger week creation (Admin)
   */
  async manuallyCreateWeek(adminId: string) {
    const { WeekService } = await import('./week.service');
    const weekService = new WeekService();

    const week = await weekService.createNewWeek();
    await this.logAudit(adminId, 'create_week', { weekId: week.id });

    return week;
  }

  /**
   * Manually trigger payout (Admin)
   */
  async manuallyTriggerPayout(weekId: string, adminId: string) {
    const { PoolService } = await import('./pool.service');
    const poolService = new PoolService();

    await poolService.distributePayouts(weekId);
    await this.logAudit(adminId, 'trigger_payout', { weekId });
  }
}
