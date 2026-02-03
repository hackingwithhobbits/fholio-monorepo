// apps/backend/src/services/liveshow.service.ts

import { supabase } from '../config/database';

export class LiveShowService {
  /**
   * Get current live show
   */
  async getCurrentLiveShow() {
    const { data, error } = await supabase
      .from('live_shows')
      .select('*')
      .eq('status', 'live')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  /**
   * Get live show by week
   */
  async getLiveShowByWeek(weekId: string) {
    const { data, error } = await supabase
      .from('live_shows')
      .select('*')
      .eq('week_id', weekId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  /**
   * Create live show (called by cron on Thursday 7pm)
   */
  async createLiveShow(weekId: string) {
    // Get week details
    const { data: week } = await supabase.from('weeks').select('*').eq('id', weekId).single();

    if (!week) throw new Error('Week not found');

    // Create live show
    const { data: liveShow, error } = await supabase
      .from('live_shows')
      .insert({
        week_id: weekId,
        title: `Week ${week.week_number} Live Show`,
        scheduled_at: week.show_at,
        status: 'live',
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Get top artists for highlights
    const { data: topArtists } = await supabase
      .from('artist_week')
      .select(
        `
        *,
        artist:artists(*)
      `
      )
      .eq('week_id', weekId)
      .order('rank', { ascending: true })
      .limit(10);

    // Get top fans for highlights
    const { data: topFans } = await supabase
      .from('fan_lineups')
      .select(
        `
        *,
        user:users(*)
      `
      )
      .eq('week_id', weekId)
      .order('rank', { ascending: true })
      .limit(10);

    // Create highlights
    await this.createHighlights(liveShow.id, topArtists || [], topFans || []);

    return liveShow;
  }

  /**
   * Create live show highlights
   */
  private async createHighlights(liveShowId: string, topArtists: any[], topFans: any[]) {
    const highlights = [];

    // Top Artist highlight
    if (topArtists.length > 0) {
      const winner = topArtists[0];
      highlights.push({
        live_show_id: liveShowId,
        type: 'top_artist',
        title: `Artist Champion: ${winner.artist.name}`,
        description: `${winner.artist.name} dominated this week with a score of ${winner.score}!`,
        data: {
          artistId: winner.artist.id,
          artistName: winner.artist.name,
          score: winner.score,
          imageUrl: winner.artist.image_url,
        },
        display_order: 1,
      });
    }

    // Top Fan highlight
    if (topFans.length > 0) {
      const winner = topFans[0];
      highlights.push({
        live_show_id: liveShowId,
        type: 'top_fan',
        title: `Fan Champion: ${winner.user.display_name}`,
        description: `${winner.user.display_name} took first place with ${winner.total_score} points!`,
        data: {
          userId: winner.user.id,
          userName: winner.user.display_name,
          score: winner.total_score,
          avatarUrl: winner.user.avatar_url,
        },
        display_order: 2,
      });
    }

    // Biggest Mover highlight
    const biggestMover = topArtists.find((a) => a.growth_percentage > 20);
    if (biggestMover) {
      highlights.push({
        live_show_id: liveShowId,
        type: 'biggest_mover',
        title: `Biggest Mover: ${biggestMover.artist.name}`,
        description: `${biggestMover.artist.name} surged ${biggestMover.growth_percentage}% this week!`,
        data: {
          artistId: biggestMover.artist.id,
          artistName: biggestMover.artist.name,
          growth: biggestMover.growth_percentage,
        },
        display_order: 3,
      });
    }

    // Insert all highlights
    if (highlights.length > 0) {
      await supabase.from('live_show_highlights').insert(highlights);
    }
  }

  /**
   * Get live show highlights
   */
  async getLiveShowHighlights(liveShowId: string) {
    const { data, error } = await supabase
      .from('live_show_highlights')
      .select('*')
      .eq('live_show_id', liveShowId)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * End live show
   */
  async endLiveShow(liveShowId: string) {
    const { error } = await supabase
      .from('live_shows')
      .update({
        status: 'completed',
        ended_at: new Date().toISOString(),
      })
      .eq('id', liveShowId);

    if (error) throw error;
  }

  /**
   * Get past live shows
   */
  async getPastLiveShows(limit: number = 10) {
    const { data, error } = await supabase
      .from('live_shows')
      .select(
        `
        *,
        week:weeks(week_number, week_starting)
      `
      )
      .eq('status', 'completed')
      .order('scheduled_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get live show stats
   */
  async getLiveShowStats(liveShowId: string) {
    const { data: liveShow } = await supabase
      .from('live_shows')
      .select('week_id')
      .eq('id', liveShowId)
      .single();

    if (!liveShow) throw new Error('Live show not found');

    // Get total participants
    const { count: fanCount } = await supabase
      .from('fan_lineups')
      .select('*', { count: 'exact', head: true })
      .eq('week_id', liveShow.week_id);

    // Get prize pool
    const { data: prizePool } = await supabase
      .from('prize_pools')
      .select('amount')
      .eq('week_id', liveShow.week_id)
      .eq('pool_type', 'core')
      .single();

    // Get vote count
    const { count: voteCount } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('week_id', liveShow.week_id);

    return {
      totalParticipants: fanCount || 0,
      prizePool: prizePool?.amount || 0,
      totalVotes: voteCount || 0,
    };
  }
}
