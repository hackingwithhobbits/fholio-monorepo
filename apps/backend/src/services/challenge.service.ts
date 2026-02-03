// apps/backend/src/services/challenge.service.ts

import { supabase } from '../config/database';

export class ChallengeService {
  /**
   * Get active challenges for a week
   */
  async getActiveChallenges(weekId: string) {
    const { data, error } = await supabase
      .from('challenges')
      .select(
        `
        *,
        sponsor:sponsors(*),
        prize_pool:prize_pools(*)
      `
      )
      .eq('week_id', weekId)
      .gte('ends_at', new Date().toISOString())
      .order('starts_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get challenges with user's entry status
   */
  async getChallengesWithUserStatus(weekId: string, userId: string) {
    const challenges = await this.getActiveChallenges(weekId);

    // Get user's entries
    const { data: entries } = await supabase
      .from('challenge_entries')
      .select('challenge_id, score, rank')
      .eq('user_id', userId)
      .in(
        'challenge_id',
        challenges.map((c) => c.id)
      );

    // Merge entry data with challenges
    return challenges.map((challenge) => {
      const entry = entries?.find((e) => e.challenge_id === challenge.id);
      return {
        ...challenge,
        userEntry: entry || null,
        isEntered: !!entry,
      };
    });
  }

  /**
   * Get challenge by ID
   */
  async getChallengeById(challengeId: string) {
    const { data, error } = await supabase
      .from('challenges')
      .select(
        `
        *,
        sponsor:sponsors(*),
        prize_pool:prize_pools(*)
      `
      )
      .eq('id', challengeId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get challenge leaderboard
   */
  async getChallengeLeaderboard(challengeId: string, limit: number = 100) {
    const { data, error } = await supabase
      .from('challenge_entries')
      .select(
        `
        *,
        user:users(id, display_name, avatar_url)
      `
      )
      .eq('challenge_id', challengeId)
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Enter a challenge
   */
  async enterChallenge(userId: string, challengeId: string) {
    // Validate challenge exists and is active
    const challenge = await this.getChallengeById(challengeId);

    if (!challenge) {
      throw new Error('Challenge not found');
    }

    const now = new Date();
    const startsAt = new Date(challenge.starts_at);
    const endsAt = new Date(challenge.ends_at);

    if (now < startsAt) {
      throw new Error('Challenge has not started yet');
    }

    if (now > endsAt) {
      throw new Error('Challenge has ended');
    }

    // Check if already entered
    const { data: existingEntry } = await supabase
      .from('challenge_entries')
      .select('*')
      .eq('challenge_id', challengeId)
      .eq('user_id', userId)
      .single();

    if (existingEntry) {
      throw new Error('Already entered this challenge');
    }

    // Create entry
    const { data, error } = await supabase
      .from('challenge_entries')
      .insert({
        challenge_id: challengeId,
        user_id: userId,
        score: 0,
        rank: null,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get user's challenge entry
   */
  async getUserChallengeEntry(userId: string, challengeId: string) {
    const { data, error } = await supabase
      .from('challenge_entries')
      .select('*')
      .eq('challenge_id', challengeId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  /**
   * Update challenge entry score
   */
  async updateChallengeScore(entryId: string, score: number) {
    const { data, error } = await supabase
      .from('challenge_entries')
      .update({ score })
      .eq('id', entryId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Calculate challenge rankings
   */
  async calculateChallengeRankings(challengeId: string) {
    const { data: entries } = await supabase
      .from('challenge_entries')
      .select('id, score')
      .eq('challenge_id', challengeId)
      .order('score', { ascending: false });

    if (!entries) return;

    // Update ranks
    for (let i = 0; i < entries.length; i++) {
      await supabase
        .from('challenge_entries')
        .update({ rank: i + 1 })
        .eq('id', entries[i].id);
    }
  }

  /**
   * Create a new challenge (Admin)
   */
  async createChallenge(
    weekId: string,
    sponsorId: string | null,
    name: string,
    description: string,
    rulesJson: any,
    prizePoolAmount: number,
    startsAt: string,
    endsAt: string
  ) {
    // Create prize pool first
    const { data: prizePool, error: poolError } = await supabase
      .from('prize_pools')
      .insert({
        week_id: weekId,
        pool_type: 'challenge',
        source: sponsorId ? 'sponsor' : 'platform',
        amount: prizePoolAmount,
        distributed: false,
      })
      .select()
      .single();

    if (poolError) throw poolError;

    // Create challenge
    const { data, error } = await supabase
      .from('challenges')
      .insert({
        week_id: weekId,
        sponsor_id: sponsorId,
        name,
        description,
        rules_json: rulesJson,
        prize_pool_id: prizePool.id,
        starts_at: startsAt,
        ends_at: endsAt,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get challenge types/templates
   */
  getChallengeTypes() {
    return [
      {
        type: 'most_accurate',
        name: 'Most Accurate Picker',
        description: 'Pick artists closest to final Top 10',
        rules: {
          scoring: 'Points based on position accuracy',
          tiebreaker: 'Earliest lineup lock time',
        },
      },
      {
        type: 'rookie_only',
        name: 'Rookie Challenge',
        description: 'Pick only new or rising artists',
        rules: {
          eligibility: 'Artists marked as "New Entrant" or "Rising"',
          picks: 5,
        },
      },
      {
        type: 'genre_specific',
        name: 'Genre Ladder',
        description: 'Pick artists from specific genre',
        rules: {
          genre: 'Hip-Hop, Pop, Rock, etc.',
          picks: 5,
        },
      },
      {
        type: 'vote_streak',
        name: 'Vote Streak Challenge',
        description: 'Vote every day during voting window',
        rules: {
          requirement: 'Vote at least once per day',
          duration: 'Friday to Sunday',
        },
      },
      {
        type: 'underdog',
        name: 'Underdog Special',
        description: 'Pick artists ranked 30-50 only',
        rules: {
          eligibility: 'Artists ranked 30-50 in current pool',
          bonus: '2x multiplier on scores',
        },
      },
    ];
  }
}
