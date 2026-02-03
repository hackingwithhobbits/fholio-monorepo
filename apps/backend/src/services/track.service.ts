// apps/backend/src/services/track.service.ts

import { supabase } from '../config/database';
import { WeekService } from './week.service';

export class TrackService {
  private weekService: WeekService;

  constructor() {
    this.weekService = new WeekService();
  }

  /**
   * Upload track audio file to Supabase Storage
   */
  async uploadTrackFile(file: Buffer, fileName: string, mimeType: string) {
    const filePath = `${Date.now()}-${fileName}`;

    const { data, error } = await supabase.storage.from('tracks').upload(filePath, file, {
      contentType: mimeType,
      upsert: false,
    });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('tracks').getPublicUrl(filePath);

    return {
      filePath: data.path,
      publicUrl: publicUrlData.publicUrl,
    };
  }

  /**
   * Submit a new track
   */
  async submitTrack(data: {
    artistId: string;
    title: string;
    genre: string;
    description?: string;
    coverImageUrl?: string;
    audioPreviewUrl?: string;
    audioFilePath?: string;
    spotifyUrl?: string;
    appleMusicUrl?: string;
    youtubeUrl?: string;
  }) {
    const {
      artistId,
      title,
      genre,
      description,
      coverImageUrl,
      audioPreviewUrl,
      audioFilePath,
      spotifyUrl,
      appleMusicUrl,
      youtubeUrl,
    } = data;

    // Verify artist exists
    const { data: artist, error: artistError } = await supabase
      .from('artists')
      .select('id')
      .eq('id', artistId)
      .single();

    if (artistError || !artist) {
      throw new Error('Artist not found');
    }

    // Create track
    const { data: track, error } = await supabase
      .from('tracks')
      .insert({
        artist_id: artistId,
        title,
        genre,
        description,
        cover_image_url: coverImageUrl,
        audio_preview_url: audioPreviewUrl,
        audio_file_path: audioFilePath,
        spotify_url: spotifyUrl,
        apple_music_url: appleMusicUrl,
        youtube_url: youtubeUrl,
        status: 'pending', // Needs approval
        release_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      })
      .select()
      .single();

    if (error) throw error;

    return track;
  }

  /**
   * Submit track to current week's competition
   */
  async submitTrackToWeek(trackId: string, artistId: string, weekId?: string) {
    let targetWeekId = weekId;

    if (!targetWeekId) {
      const currentWeek = await this.weekService.getCurrentWeek();
      if (!currentWeek) {
        throw new Error('No active week found');
      }
      targetWeekId = currentWeek.id;

      // Check if submissions are open
      const now = new Date();
      const submissionStart = new Date(currentWeek.submission_open_at);
      const submissionEnd = new Date(currentWeek.submission_close_at);

      if (now < submissionStart || now > submissionEnd) {
        throw new Error('Track submissions are not open for this week');
      }
    }

    // Verify track belongs to artist
    const { data: track } = await supabase
      .from('tracks')
      .select('artist_id')
      .eq('id', trackId)
      .single();

    if (!track || track.artist_id !== artistId) {
      throw new Error('Track not found or unauthorized');
    }

    // Check if artist already submitted for this week
    const { data: existing } = await supabase
      .from('week_artists')
      .select('id')
      .eq('week_id', targetWeekId)
      .eq('artist_id', artistId)
      .single();

    if (existing) {
      throw new Error('You have already submitted a track for this week');
    }

    // Add to week_artists
    const { data: weekArtist, error } = await supabase
      .from('week_artists')
      .insert({
        week_id: targetWeekId,
        artist_id: artistId,
        track_id: trackId,
        source_flag: 'artist_submitted',
        is_eligible_for_picking: false, // Set to true after approval
      })
      .select()
      .single();

    if (error) throw error;

    // Create or update artist_week entry
    const { data: existingArtistWeek } = await supabase
      .from('artist_week')
      .select('id')
      .eq('week_id', targetWeekId)
      .eq('artist_id', artistId)
      .single();

    if (!existingArtistWeek) {
      await supabase.from('artist_week').insert({
        week_id: targetWeekId,
        artist_id: artistId,
        votes: 0,
        final_score: 0,
        status: 'Pending',
      });
    }

    return weekArtist;
  }

  /**
   * Get artist's track submissions
   */
  async getArtistSubmissions(artistId: string) {
    const { data: submissions, error } = await supabase
      .from('week_artists')
      .select(
        `
        id,
        week_id,
        track_id,
        source_flag,
        is_eligible_for_picking,
        created_at,
        week:weeks (
          id,
          week_number,
          start_date,
          end_date
        ),
        track:tracks (
          id,
          title,
          genre,
          cover_image_url,
          audio_preview_url,
          status,
          description
        ),
        artist_week:artist_week (
          votes,
          final_score,
          rank,
          status
        )
      `
      )
      .eq('artist_id', artistId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return submissions || [];
  }

  /**
   * Get artist stats
   */
  async getArtistStats(artistId: string) {
    const { data: submissions } = await supabase
      .from('week_artists')
      .select('id, artist_week (votes, final_score, rank)')
      .eq('artist_id', artistId);

    const totalSubmissions = submissions?.length || 0;

    let totalVotes = 0;
    let totalScore = 0;
    let bestRank: number | null = null;

    submissions?.forEach((sub: any) => {
      if (sub.artist_week) {
        totalVotes += sub.artist_week.votes || 0;
        totalScore += sub.artist_week.final_score || 0;
        if (sub.artist_week.rank) {
          if (bestRank === null || sub.artist_week.rank < bestRank) {
            bestRank = sub.artist_week.rank;
          }
        }
      }
    });

    const avgScore = totalSubmissions > 0 ? totalScore / totalSubmissions : 0;

    // Get current week rank
    const currentWeek = await this.weekService.getCurrentWeek();
    let currentRank: number | null = null;

    if (currentWeek) {
      const { data: currentArtistWeek } = await supabase
        .from('artist_week')
        .select('rank')
        .eq('week_id', currentWeek.id)
        .eq('artist_id', artistId)
        .single();

      currentRank = currentArtistWeek?.rank || null;
    }

    return {
      totalSubmissions,
      totalVotes,
      avgScore: avgScore.toFixed(1),
      bestRank,
      currentRank,
    };
  }

  /**
   * Get artist's tracks
   */
  async getArtistTracks(artistId: string) {
    const { data: tracks, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('artist_id', artistId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return tracks || [];
  }

  /**
   * Approve a track (admin only)
   */
  async approveTrack(trackId: string) {
    const { data, error } = await supabase
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

    return data;
  }
}

export const trackService = new TrackService();
