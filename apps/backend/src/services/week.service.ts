// apps/backend/src/services/week.service.ts

import { supabase } from '../config/database';
import { Week } from '../types/database.types';

export class WeekService {
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
