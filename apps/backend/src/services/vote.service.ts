import { supabase } from '@/config/supabase';
import { AppError } from '@/types';
import type { CastVoteInput } from '@/validators/vote.validator';

export class VoteService {
  /**
   * Cast a vote for an artist
   */
  async castVote(userId: string, voteData: CastVoteInput) {
    const { artistId, weekStarting } = voteData;

    // Determine week if not provided
    const week = weekStarting || this.getCurrentWeekStart();

    // Check if user has already voted for this artist this week
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id')
      .eq('user_id', userId)
      .eq('artist_id', artistId)
      .eq('week_starting', week)
      .single();

    if (existingVote) {
      throw new AppError(400, 'You have already voted for this artist this week', 'VOTE_EXISTS');
    }

    // Check total votes this week
    const { count } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('week_starting', week);

    if ((count || 0) >= 10) {
      throw new AppError(
        400,
        'You have reached the maximum votes for this week',
        'MAX_VOTES_REACHED'
      );
    }

    // Cast vote
    const { data, error } = await supabase
      .from('votes')
      .insert({
        user_id: userId,
        artist_id: artistId,
        week_starting: week,
      })
      .select()
      .single();

    if (error) {
      throw new AppError(500, 'Failed to cast vote', 'DATABASE_ERROR', error);
    }

    // Update artist vote count
    await supabase.rpc('increment_artist_votes', { artist_id: artistId });

    return data;
  }

  /**
   * Get user's votes for current week
   */
  async getUserVotes(userId: string, weekStarting?: string) {
    const week = weekStarting || this.getCurrentWeekStart();

    const { data, error } = await supabase
      .from('votes')
      .select(
        `
        *,
        artist:artists (id, name, image_url, score, league)
      `
      )
      .eq('user_id', userId)
      .eq('week_starting', week);

    if (error) {
      throw new AppError(500, 'Failed to fetch votes', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get remaining votes for user
   */
  async getRemainingVotes(userId: string) {
    const week = this.getCurrentWeekStart();

    const { count } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('week_starting', week);

    return {
      used: count || 0,
      remaining: 10 - (count || 0),
      total: 10,
    };
  }

  /**
   * Remove a vote
   */
  async removeVote(userId: string, voteId: string) {
    const { error } = await supabase.from('votes').delete().eq('id', voteId).eq('user_id', userId);

    if (error) {
      throw new AppError(500, 'Failed to remove vote', 'DATABASE_ERROR', error);
    }
  }

  private getCurrentWeekStart(): string {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to Monday
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString().split('T')[0];
  }
}

export const voteService = new VoteService();
