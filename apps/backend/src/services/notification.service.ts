// apps/backend/src/services/notification.service.ts

import { supabase } from '../config/database';

export class NotificationService {
  /**
   * Get user's notifications
   */
  async getUserNotifications(userId: string, limit: number = 50) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) throw error;
    return count || 0;
  }

  /**
   * Mark notification as read
   */
  async markAsRead(userId: string, notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', notificationId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Mark all as read
   */
  async markAllAsRead(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) throw error;
  }

  /**
   * Create notification
   */
  async createNotification(
    userId: string,
    type: string,
    title: string,
    message: string,
    data?: any
  ) {
    // Check user preferences
    const { data: prefs } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Check if this type is enabled
    if (prefs && !this.isTypeEnabled(type, prefs)) {
      return null;
    }

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        title,
        message,
        data,
        is_read: false,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // TODO: Send push notification if enabled
    // TODO: Send email if enabled

    return notification;
  }

  /**
   * Check if notification type is enabled
   */
  private isTypeEnabled(type: string, prefs: any): boolean {
    const typeMap: { [key: string]: string } = {
      lineup_locked: 'lineup_updates',
      payout_received: 'payout_alerts',
      challenge_start: 'challenge_updates',
      streak_milestone: 'achievement_alerts',
      badge_earned: 'achievement_alerts',
      referral_success: 'referral_updates',
    };

    const prefKey = typeMap[type] || 'general_updates';
    return prefs[prefKey] !== false; // Default to true if not set
  }

  /**
   * Delete notification
   */
  async deleteNotification(userId: string, notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Get notification preferences
   */
  async getPreferences(userId: string) {
    const { data, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    // Return defaults if not set
    if (!data) {
      return this.getDefaultPreferences();
    }

    return data;
  }

  /**
   * Update notification preferences
   */
  async updatePreferences(userId: string, preferences: any) {
    const { data: existing } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('notification_preferences')
        .update(preferences)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('notification_preferences')
        .insert({
          user_id: userId,
          ...preferences,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }

  /**
   * Get default preferences
   */
  private getDefaultPreferences() {
    return {
      lineup_updates: true,
      payout_alerts: true,
      challenge_updates: true,
      achievement_alerts: true,
      referral_updates: true,
      general_updates: true,
      email_enabled: true,
      push_enabled: true,
    };
  }

  /**
   * Send bulk notifications (Admin)
   */
  async sendBulkNotification(
    userIds: string[],
    type: string,
    title: string,
    message: string,
    data?: any
  ) {
    const notifications = userIds.map((userId) => ({
      user_id: userId,
      type,
      title,
      message,
      data,
      is_read: false,
      created_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from('notifications').insert(notifications);

    if (error) throw error;
  }
}
