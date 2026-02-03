// apps/backend/src/services/admin.service.ts

import { supabase } from '../config/database';

export class AdminService {
  /**
   * Get platform statistics
   */
  async getPlatformStats() {
    // Total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Total fans
    const { count: totalFans } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('user_type', 'fan');

    // Total artists
    const { count: totalArtists } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('user_type', 'artist');

    // Total tracks
    const { count: totalTracks } = await supabase
      .from('tracks')
      .select('*', { count: 'exact', head: true });

    // Pending tracks
    const { count: pendingTracks } = await supabase
      .from('tracks')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Active weeks
    const { count: activeWeeks } = await supabase
      .from('weeks')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    // Total transactions
    const { data: transactions } = await supabase
      .from('transactions')
      .select('amount')
      .eq('status', 'completed');

    const totalRevenue = transactions?.reduce((sum, t) => sum + parseFloat(t.amount), 0) || 0;

    return {
      totalUsers: totalUsers || 0,
      totalFans: totalFans || 0,
      totalArtists: totalArtists || 0,
      totalTracks: totalTracks || 0,
      pendingTracks: pendingTracks || 0,
      activeWeeks: activeWeeks || 0,
      totalRevenue: totalRevenue,
    };
  }

  /**
   * Get pending track submissions
   */
  async getPendingTracks(limit: number = 50) {
    const { data: tracks, error } = await supabase
      .from('tracks')
      .select(
        `
        *,
        artist:artists (
          id,
          name,
          genre,
          image_url
        )
      `
      )
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return tracks || [];
  }

  /**
   * Approve a track
   */
  async approveTrack(trackId: string) {
    const { data: track, error } = await supabase
      .from('tracks')
      .update({ status: 'approved' })
      .eq('id', trackId)
      .select()
      .single();

    if (error) throw error;

    // Update week_artists to make eligible for picking
    await supabase
      .from('week_artists')
      .update({ is_eligible_for_picking: true })
      .eq('track_id', trackId);

    return track;
  }

  /**
   * Reject a track
   */
  async rejectTrack(trackId: string, reason?: string) {
    const { data: track, error } = await supabase
      .from('tracks')
      .update({
        status: 'rejected',
        description: reason ? `Rejected: ${reason}` : 'Rejected by admin',
      })
      .eq('id', trackId)
      .select()
      .single();

    if (error) throw error;
    return track;
  }

  /**
   * Get all weeks
   */
  async getAllWeeks() {
    const { data: weeks, error } = await supabase
      .from('weeks')
      .select('*')
      .order('week_number', { ascending: false });

    if (error) throw error;
    return weeks || [];
  }

  /**
   * Create a new week
   */
  async createWeek(weekData: {
    week_number: number;
    start_date: string;
    end_date: string;
    submission_open_at: string;
    submission_close_at: string;
    voting_open_at: string;
    voting_close_at: string;
    lineup_lock_at: string;
    show_date_time: string;
  }) {
    // Set all other weeks to inactive
    await supabase
      .from('weeks')
      .update({ is_active: false })
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Update all

    // Create new week
    const { data: week, error } = await supabase
      .from('weeks')
      .insert({
        ...weekData,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;
    return week;
  }

  /**
   * Update week
   */
  async updateWeek(weekId: string, weekData: any) {
    const { data: week, error } = await supabase
      .from('weeks')
      .update(weekData)
      .eq('id', weekId)
      .select()
      .single();

    if (error) throw error;
    return week;
  }

  /**
   * Delete week
   */
  async deleteWeek(weekId: string) {
    const { error } = await supabase.from('weeks').delete().eq('id', weekId);

    if (error) throw error;
    return { success: true };
  }

  /**
   * Get all users
   */
  async getAllUsers(limit: number = 100, offset: number = 0) {
    const {
      data: users,
      error,
      count,
    } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return {
      users: users || [],
      total: count || 0,
    };
  }

  /**
   * Suspend user
   */
  async suspendUser(userId: string, reason?: string) {
    const { data: user, error } = await supabase
      .from('users')
      .update({
        is_suspended: true,
        suspension_reason: reason,
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return user;
  }

  /**
   * Unsuspend user
   */
  async unsuspendUser(userId: string) {
    const { data: user, error } = await supabase
      .from('users')
      .update({
        is_suspended: false,
        suspension_reason: null,
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return user;
  }

  /**
   * Get prize pool configuration
   */
  async getPrizePoolConfig() {
    const { data: config, error } = await supabase
      .from('prize_pools')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    // Return default if no config exists
    return (
      config || {
        total_pool: 1000,
        artist_percentage: 40,
        fan_percentage: 30,
        platform_percentage: 20,
        bonus_percentage: 10,
      }
    );
  }

  /**
   * Update prize pool configuration
   */
  async updatePrizePoolConfig(config: {
    total_pool: number;
    artist_percentage: number;
    fan_percentage: number;
    platform_percentage: number;
    bonus_percentage: number;
  }) {
    // Validate percentages add up to 100
    const total =
      config.artist_percentage +
      config.fan_percentage +
      config.platform_percentage +
      config.bonus_percentage;

    if (total !== 100) {
      throw new Error('Percentages must add up to 100');
    }

    const { data, error } = await supabase.from('prize_pools').insert(config).select().single();

    if (error) throw error;
    return data;
  }

  /**
   * Get recent activity logs
   */
  async getActivityLogs(limit: number = 50) {
    const { data: logs, error } = await supabase
      .from('transactions')
      .select(
        `
        *,
        user:users (
          username,
          email
        )
      `
      )
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return logs || [];
  }
}

export const adminService = new AdminService();
