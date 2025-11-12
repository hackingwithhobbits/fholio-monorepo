// apps/backend/src/services/week.service.ts

import { supabase } from '../config/database';
import { Week } from '../types/database.types';

export class WeekService {
  /**
   * Get week by ID
   */
  async getWeekById(weekId: string) {
    const { data, error } = await supabase.from('weeks').select('*').eq('id', weekId).single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  /**
   * Get week history
   */
  async getWeekHistory(limit: number = 10) {
    const { data, error } = await supabase
      .from('weeks')
      .select('*')
      .eq('status', 'completed')
      .order('week_starting', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get time remaining in current phase
   */
  getTimeRemaining(week: any) {
    const now = new Date();
    const phase = this.getCurrentPhase(week);

    let targetTime: Date;

    switch (phase) {
      case 'voting':
        targetTime = new Date(week.voting_close_at);
        break;
      case 'picks_open':
        targetTime = new Date(week.picks_lock_at);
        break;
      case 'locked':
        targetTime = new Date(week.show_at);
        break;
      default:
        return null;
    }

    const diff = targetTime.getTime() - now.getTime();

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      total: diff,
      days,
      hours,
      minutes,
      seconds,
      formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`,
    };
  }

  /**
   * Create new week
   */
  async createNewWeek() {
    // Get last week number
    const { data: lastWeek } = await supabase
      .from('weeks')
      .select('week_number')
      .order('week_number', { ascending: false })
      .limit(1)
      .single();

    const newWeekNumber = (lastWeek?.week_number || 0) + 1;

    // Calculate dates (Friday to Thursday cycle)
    const now = new Date();
    const nextFriday = this.getNextFriday(now);
    const thursday = new Date(nextFriday);
    thursday.setDate(thursday.getDate() + 6); // Next Thursday

    // Set specific times (Eastern Time)
    const weekStarting = new Date(nextFriday);
    weekStarting.setHours(8, 0, 0, 0); // Friday 8am ET

    const weekEnding = new Date(thursday);
    weekEnding.setHours(23, 59, 59, 999); // Thursday 11:59pm ET

    const votingOpenAt = new Date(nextFriday);
    votingOpenAt.setHours(8, 0, 0, 0); // Friday 8am ET

    const votingCloseAt = new Date(nextFriday);
    votingCloseAt.setDate(votingCloseAt.getDate() + 2); // Sunday
    votingCloseAt.setHours(23, 59, 59, 999); // Sunday 11:59pm ET

    const picksOpenAt = new Date(nextFriday);
    picksOpenAt.setDate(picksOpenAt.getDate() + 3); // Monday
    picksOpenAt.setHours(6, 0, 0, 0); // Monday 6am ET

    const picksLockAt = new Date(thursday);
    picksLockAt.setHours(10, 0, 0, 0); // Thursday 10am ET

    const showAt = new Date(thursday);
    showAt.setHours(19, 0, 0, 0); // Thursday 7pm ET

    // Create week
    const { data: week, error } = await supabase
      .from('weeks')
      .insert({
        week_number: newWeekNumber,
        week_starting: weekStarting.toISOString(),
        week_ending: weekEnding.toISOString(),
        voting_open_at: votingOpenAt.toISOString(),
        voting_close_at: votingCloseAt.toISOString(),
        picks_open_at: picksOpenAt.toISOString(),
        picks_lock_at: picksLockAt.toISOString(),
        show_at: showAt.toISOString(),
        phase: 'voting',
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;
    return week;
  }

  /**
   * Get next Friday date
   */
  private getNextFriday(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const daysUntilFriday = (5 - day + 7) % 7;
    result.setDate(result.getDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday));
    return result;
  }

  /**
   * Complete week (set status to completed)
   */
  async completeWeek(weekId: string) {
    const { error } = await supabase
      .from('weeks')
      .update({
        status: 'completed',
        phase: 'completed',
      })
      .eq('id', weekId);

    if (error) throw error;
  }

  /**
   * Update week phase
   */
  async updatePhase(weekId: string, phase: string) {
    const { error } = await supabase.from('weeks').update({ phase }).eq('id', weekId);

    if (error) throw error;
  }
  /**
   * Get the current active week
   */
  async getCurrentWeek(): Promise<Week | null> {
    const { data, error } = await supabase
      .from('weeks')
      .select('*')
      .eq('status', 'active')
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Determine current phase based on timestamps
   */
  getCurrentPhase(week: Week): string {
    const now = new Date();
    const votingOpen = new Date(week.voting_open_at);
    const votingClose = new Date(week.voting_close_at);
    const picksOpen = new Date(week.picks_open_at);
    const picksLock = new Date(week.picks_lock_at);
    const show = new Date(week.show_at);

    if (now < votingOpen) return 'pre_voting';
    if (now >= votingOpen && now <= votingClose) return 'voting';
    if (now > votingClose && now < picksOpen) return 'calculating_top50';
    if (now >= picksOpen && now < picksLock) return 'picks_open';
    if (now >= picksLock && now < show) return 'locked';
    if (now >= show) return 'live_show';

    return 'unknown';
  }

  /**
   * Check if voting is open
   */
  isVotingOpen(week: Week): boolean {
    const phase = this.getCurrentPhase(week);
    return phase === 'voting';
  }

  /**
   * Check if picks are open
   */
  isPicksOpen(week: Week): boolean {
    const phase = this.getCurrentPhase(week);
    return phase === 'picks_open';
  }

  /**
   * Check if lineups are locked
   */
  areLineupsLocked(week: Week): boolean {
    const now = new Date();
    const lockTime = new Date(week.picks_lock_at);
    return now >= lockTime;
  }
}
