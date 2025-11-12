// apps/backend/src/services/voting.service.ts

import { supabase } from '../config/database';
import { Vote } from '../types/database.types';
import { WeekService } from './week.service';

export class VotingService {
  private weekService: WeekService;

  constructor() {
    this.weekService = new WeekService();
  }

  /**
   * Submit a vote for an artist
   * Validates: voting window, rate limits, user tier limits
   */
  async submitVote(userId: string, artistId: string, weekId: string): Promise<Vote> {
    // 1. Validate voting window
    const week = await this.weekService.getCurrentWeek();
    if (!week || week.id !== weekId) {
      throw new Error('Invalid week');
    }

    if (!this.weekService.isVotingOpen(week)) {
      throw new Error('Voting is not open for this week');
    }

    // 2. Check user's subscription limits
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!subscription) throw new Error('No subscription found');

    // 3. Count user's existing votes for this week
    const { count } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('week_id', weekId);

    if (count && count >= subscription.votes_limit) {
      throw new Error(
        `Vote limit exceeded. Your limit is ${subscription.votes_limit} votes per week`
      );
    }

    // 4. Rate limiting check (prevent spam)
    const recentVotes = await this.checkRateLimit(userId);
    if (recentVotes > 10) {
      // Max 10 votes per minute
      throw new Error('Rate limit exceeded. Please slow down.');
    }

    // 5. Validate artist is in this week's pool
    const { data: weekArtist } = await supabase
      .from('week_artists')
      .select('*')
      .eq('week_id', weekId)
      .eq('artist_id', artistId)
      .single();

    if (!weekArtist) {
      throw new Error('Artist is not eligible for voting this week');
    }

    // 6. Check if user already voted for this artist this week
    const { data: existingVote } = await supabase
      .from('votes')
      .select('*')
      .eq('user_id', userId)
      .eq('artist_id', artistId)
      .eq('week_id', weekId)
      .single();

    if (existingVote) {
      // Increment vote count
      const { data: updatedVote, error } = await supabase
        .from('votes')
        .update({
          vote_count: existingVote.vote_count + 1,
          voted_at: new Date().toISOString(),
        })
        .eq('id', existingVote.id)
        .select()
        .single();

      if (error) throw error;

      // Update artist_week votes
      await this.updateArtistVoteCount(artistId, weekId);

      return updatedVote;
    }

    // 7. Create new vote
    const { data: newVote, error } = await supabase
      .from('votes')
      .insert({
        user_id: userId,
        artist_id: artistId,
        week_id: weekId,
        vote_count: 1,
        voted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // 8. Update artist_week votes
    await this.updateArtistVoteCount(artistId, weekId);

    return newVote;
  }

  /**
   * Get user's votes for current week
   */
  async getUserVotes(userId: string, weekId: string): Promise<Vote[]> {
    const { data, error } = await supabase
      .from('votes')
      .select(
        `
        *,
        artist:artists (
          id,
          name,
          image_url,
          genre
        )
      `
      )
      .eq('user_id', userId)
      .eq('week_id', weekId)
      .order('voted_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get vote count for user in current week
   */
  async getUserVoteCount(userId: string, weekId: string): Promise<number> {
    const { count } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('week_id', weekId);

    return count || 0;
  }

  /**
   * Get remaining votes for user
   */
  async getRemainingVotes(userId: string, weekId: string): Promise<number> {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('votes_limit')
      .eq('user_id', userId)
      .single();

    if (!subscription) return 0;

    const usedVotes = await this.getUserVoteCount(userId, weekId);
    return Math.max(0, subscription.votes_limit - usedVotes);
  }

  /**
   * Get top voted artists for current week (for display during voting)
   */
  async getTopVotedArtists(weekId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('artist_week')
      .select(
        `
        *,
        artist:artists (
          id,
          name,
          image_url,
          genre,
          league
        )
      `
      )
      .eq('week_id', weekId)
      .order('votes', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Check rate limiting - votes in last minute
   */
  private async checkRateLimit(userId: string): Promise<number> {
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();

    const { count } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('voted_at', oneMinuteAgo);

    return count || 0;
  }

  /**
   * Update artist_week vote count
   */
  private async updateArtistVoteCount(artistId: string, weekId: string) {
    // Aggregate total votes for this artist in this week
    const { data: votes } = await supabase
      .from('votes')
      .select('vote_count')
      .eq('artist_id', artistId)
      .eq('week_id', weekId);

    if (!votes) return;

    const totalVotes = votes.reduce((sum, v) => sum + v.vote_count, 0);

    // Update artist_week
    await supabase
      .from('artist_week')
      .update({ votes: totalVotes })
      .eq('artist_id', artistId)
      .eq('week_id', weekId);
  }

  /**
   * Get voting analytics (for admin dashboard)
   */
  async getVotingAnalytics(weekId: string) {
    const { data: voteStats, error } = await supabase.rpc('get_voting_analytics', {
      week_id: weekId,
    });

    if (error) throw error;

    return {
      totalVotes: voteStats?.total_votes || 0,
      uniqueVoters: voteStats?.unique_voters || 0,
      avgVotesPerUser: voteStats?.avg_votes_per_user || 0,
      topArtists: await this.getTopVotedArtists(weekId, 10),
    };
  }
}
