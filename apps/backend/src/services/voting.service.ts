// apps/backend/src/services/voting.service.ts

import { supabase } from '../config/database';
import { WeekService } from './week.service';

export class VotingService {
  private weekService: WeekService;

  constructor() {
    this.weekService = new WeekService();
  }

  /**
   * Submit a vote for an artist
   */
  async submitVote(userId: string, artistId: string, weekId?: string) {
    // Get current week if not provided
    let targetWeekId = weekId;
    if (!targetWeekId) {
      const currentWeek = await this.weekService.getCurrentWeek();
      if (!currentWeek) {
        throw new Error('No active week found');
      }
      targetWeekId = currentWeek.id;

      // Check if voting is open
      if (!this.weekService.isVotingOpen(currentWeek)) {
        throw new Error('Voting is not open for this week');
      }
    }

    // Get user's subscription to check vote limit
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('votes_limit')
      .eq('user_id', userId)
      .single();

    if (!subscription) {
      throw new Error('No subscription found');
    }

    // Check current vote count for this week
    const { count: currentVotes } = await supabase
      .from('votes')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('week_id', targetWeekId);

    if (currentVotes !== null && currentVotes >= subscription.votes_limit) {
      throw new Error(
        `Vote limit reached. Your limit is ${subscription.votes_limit} votes per week`
      );
    }

    // Check if artist is eligible for voting this week
    const { data: weekArtist } = await supabase
      .from('week_artists')
      .select('id')
      .eq('week_id', targetWeekId)
      .eq('artist_id', artistId)
      .eq('is_eligible_for_picking', true)
      .single();

    if (!weekArtist) {
      throw new Error('Artist is not available for voting this week');
    }

    // Check if user already voted for this artist this week
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id')
      .eq('user_id', userId)
      .eq('week_id', targetWeekId)
      .eq('artist_id', artistId)
      .single();

    if (existingVote) {
      throw new Error('You have already voted for this artist this week');
    }

    // Create the vote
    const { data: vote, error } = await supabase
      .from('votes')
      .insert({
        user_id: userId,
        week_id: targetWeekId,
        artist_id: artistId,
        vote_count: 1,
        is_valid: true,
      })
      .select()
      .single();

    if (error) throw error;

    // Update artist_week vote count
    const { data: artistWeek } = await supabase
      .from('artist_week')
      .select('votes')
      .eq('week_id', targetWeekId)
      .eq('artist_id', artistId)
      .single();

    if (artistWeek) {
      await supabase
        .from('artist_week')
        .update({ votes: (artistWeek.votes || 0) + 1 })
        .eq('week_id', targetWeekId)
        .eq('artist_id', artistId);
    }

    return vote;
  }

  /**
   * Get user's votes for a specific week
   */
  async getUserVotes(userId: string, weekId?: string) {
    let targetWeekId = weekId;
    if (!targetWeekId) {
      const currentWeek = await this.weekService.getCurrentWeek();
      if (!currentWeek) return [];
      targetWeekId = currentWeek.id;
    }

    const { data: votes, error } = await supabase
      .from('votes')
      .select(
        `
        id,
        artist_id,
        vote_count,
        voted_at,
        artists (
          id,
          name,
          genre,
          image_url,
          league
        )
      `
      )
      .eq('user_id', userId)
      .eq('week_id', targetWeekId)
      .order('voted_at', { ascending: false });

    if (error) throw error;
    return votes || [];
  }

  /**
   * Get remaining votes for user
   */
  async getRemainingVotes(userId: string, weekId?: string) {
    let targetWeekId = weekId;
    if (!targetWeekId) {
      const currentWeek = await this.weekService.getCurrentWeek();
      if (!currentWeek) {
        return { remaining: 0, limit: 0, used: 0 };
      }
      targetWeekId = currentWeek.id;
    }

    // Get subscription limit
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('votes_limit')
      .eq('user_id', userId)
      .single();

    if (!subscription) {
      throw new Error('No subscription found');
    }

    const votesLimit = subscription.votes_limit;

    // Get current vote count
    const { count: votesUsed } = await supabase
      .from('votes')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('week_id', targetWeekId);

    const used = votesUsed || 0;
    const remaining = Math.max(0, votesLimit - used);

    return {
      remaining,
      limit: votesLimit,
      used,
    };
  }

  /**
   * Remove a vote
   */
  async removeVote(voteId: string, userId: string) {
    // Get the vote to ensure it belongs to the user
    const { data: vote } = await supabase
      .from('votes')
      .select('*')
      .eq('id', voteId)
      .eq('user_id', userId)
      .single();

    if (!vote) {
      throw new Error('Vote not found or unauthorized');
    }

    // Check if voting is still open
    const week = await this.weekService.getWeekById(vote.week_id);
    if (!week || !this.weekService.isVotingOpen(week)) {
      throw new Error('Cannot remove vote after voting period has closed');
    }

    // Delete the vote
    const { error } = await supabase.from('votes').delete().eq('id', voteId);

    if (error) throw error;

    // Update artist_week vote count
    const { data: artistWeek } = await supabase
      .from('artist_week')
      .select('votes')
      .eq('week_id', vote.week_id)
      .eq('artist_id', vote.artist_id)
      .single();

    if (artistWeek && artistWeek.votes > 0) {
      await supabase
        .from('artist_week')
        .update({ votes: artistWeek.votes - 1 })
        .eq('week_id', vote.week_id)
        .eq('artist_id', vote.artist_id);
    }
  }

  /**
   * Get vote count for a specific artist
   */
  async getArtistVoteCount(artistId: string, weekId?: string) {
    let targetWeekId = weekId;
    if (!targetWeekId) {
      const currentWeek = await this.weekService.getCurrentWeek();
      if (!currentWeek) return 0;
      targetWeekId = currentWeek.id;
    }

    const { data: artistWeek } = await supabase
      .from('artist_week')
      .select('votes')
      .eq('week_id', targetWeekId)
      .eq('artist_id', artistId)
      .single();

    return artistWeek?.votes || 0;
  }

  /**
   * Get top voted artists for a week
   */
  async getTopVotedArtists(weekId?: string, limit: number = 10) {
    let targetWeekId = weekId;
    if (!targetWeekId) {
      const currentWeek = await this.weekService.getCurrentWeek();
      if (!currentWeek) return [];
      targetWeekId = currentWeek.id;
    }

    const { data: topArtists, error } = await supabase
      .from('artist_week')
      .select(
        `
        artist_id,
        votes,
        artists (
          id,
          name,
          genre,
          image_url,
          league
        )
      `
      )
      .eq('week_id', targetWeekId)
      .order('votes', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return topArtists || [];
  }
}

export const votingService = new VotingService();
