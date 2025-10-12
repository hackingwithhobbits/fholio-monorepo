// src/services/chartmetric/chartmetric-sync.service.ts

import { SupabaseClient } from "@supabase/supabase-js";
import {
  ChartmetricAPIService,
  ArtistStats,
  TrackStats,
} from "./chartmetric-api.service";
import { BatchWriter } from "../database/batch-writer";
import { Logger } from "../../utils/logger";
import { SyncConfig } from "../../config/sync.config";

interface SyncResult {
  artistsSynced: number;
  tracksSynced: number;
  errors: number;
  duration: number;
  apiCallsUsed: number;
}

export class ChartmetricSyncService {
  private logger: Logger;
  private api: ChartmetricAPIService;
  private batchWriter: BatchWriter;
  private syncDate: string;

  constructor(private supabase: SupabaseClient) {
    this.logger = new Logger("ChartmetricSync");
    this.api = new ChartmetricAPIService();
    this.batchWriter = new BatchWriter(supabase);
    this.syncDate = new Date().toISOString().split("T")[0];
  }

  /**
   * Main sync function
   */
  async syncAll(): Promise<SyncResult> {
    const startTime = Date.now();
    let artistsSynced = 0;
    let tracksSynced = 0;
    let errors = 0;

    this.logger.info("🚀 Starting Chartmetric sync job...");

    try {
      // Step 1: Get artists prioritized by importance
      const artists = await this.getPrioritizedArtists();
      this.logger.info(`Found ${artists.length} artists to sync`);

      // Step 2: Sync artists in batches
      artistsSynced = await this.syncArtists(artists);

      // Step 3: Get tracks that need syncing
      const tracks = await this.getPrioritizedTracks();
      this.logger.info(`Found ${tracks.length} tracks to sync`);

      // Step 4: Sync tracks in batches
      tracksSynced = await this.syncTracks(tracks);

      // Step 5: Final flush
      await this.batchWriter.flush();

      // Step 6: Update trending data
      await this.updateTrendingData();

      const duration = Date.now() - startTime;
      const apiCalls = artistsSynced * 3 + tracksSynced; // Estimate

      this.logger.info(`✅ Sync complete! 
        Artists: ${artistsSynced}
        Tracks: ${tracksSynced}
        Errors: ${errors}
        Duration: ${(duration / 1000).toFixed(2)}s
        API Calls: ~${apiCalls}
      `);

      return {
        artistsSynced,
        tracksSynced,
        errors,
        duration,
        apiCallsUsed: apiCalls,
      };
    } catch (error) {
      this.logger.error("Sync job failed", error);
      throw error;
    }
  }

  /**
   * Get artists prioritized by activity
   */
  private async getPrioritizedArtists(): Promise<any[]> {
    const { data: artists, error } = await this.supabase.rpc(
      "get_prioritized_artists",
      {
        high_priority_days: SyncConfig.priority.highPriority.maxDaysSinceSync,
        medium_priority_days:
          SyncConfig.priority.mediumPriority.maxDaysSinceSync,
        low_priority_days: SyncConfig.priority.lowPriority.maxDaysSinceSync,
      }
    );

    if (error) {
      this.logger.error("Failed to get prioritized artists", error);
      throw error;
    }

    return artists || [];
  }

  /**
   * Sync artists efficiently
   */
  private async syncArtists(artists: any[]): Promise<number> {
    let synced = 0;

    // Process in batches
    for (let i = 0; i < artists.length; i += SyncConfig.batch.artistBatchSize) {
      const batch = artists.slice(i, i + SyncConfig.batch.artistBatchSize);

      this.logger.info(
        `Processing artist batch ${i / SyncConfig.batch.artistBatchSize + 1}...`
      );

      // Get chartmetric IDs
      const chartmetricIds = batch
        .filter((a) => a.chartmetric_id)
        .map((a) => a.chartmetric_id);

      // Batch fetch from Chartmetric
      const statsMap = await this.api.batchGetArtistStats(chartmetricIds);

      // Write to buffer
      for (const artist of batch) {
        if (!artist.chartmetric_id) continue;

        const stats = statsMap.get(artist.chartmetric_id);
        if (!stats) continue;

        this.batchWriter.add({
          artist_id: artist.id,
          snapshot_date: this.syncDate,
          spotify_followers: stats.spotifyFollowers,
          spotify_monthly_listeners: stats.spotifyMonthlyListeners,
          spotify_popularity: stats.spotifyPopularity,
          instagram_followers: stats.instagramFollowers,
          tiktok_followers: stats.tiktokFollowers,
          playlist_count: stats.playlistCount,
          playlist_reach: stats.playlistReach,
        });

        synced++;

        // Auto-flush if buffer is full
        await this.batchWriter.autoFlush();
      }

      // Update last_synced timestamps
      await this.updateLastSyncedTimestamps(batch.map((a) => a.id));

      this.logger.info(`Synced ${synced}/${artists.length} artists`);
    }

    return synced;
  }

  /**
   * Get tracks prioritized by activity
   */
  private async getPrioritizedTracks(): Promise<any[]> {
    const { data: tracks, error } = await this.supabase.rpc(
      "get_prioritized_tracks",
      {
        high_priority_days: SyncConfig.priority.highPriority.maxDaysSinceSync,
        medium_priority_days:
          SyncConfig.priority.mediumPriority.maxDaysSinceSync,
        low_priority_days: SyncConfig.priority.lowPriority.maxDaysSinceSync,
      }
    );

    if (error) {
      this.logger.error("Failed to get prioritized tracks", error);
      return [];
    }

    return tracks || [];
  }

  /**
   * Sync tracks efficiently
   */
  private async syncTracks(tracks: any[]): Promise<number> {
    let synced = 0;

    for (let i = 0; i < tracks.length; i += SyncConfig.batch.trackBatchSize) {
      const batch = tracks.slice(i, i + SyncConfig.batch.trackBatchSize);

      this.logger.info(
        `Processing track batch ${i / SyncConfig.batch.trackBatchSize + 1}...`
      );

      // Process tracks in parallel (with rate limiting)
      const results = await Promise.allSettled(
        batch.map(async (track) => {
          if (!track.chartmetric_track_id) return null;

          const stats = await this.api.getTrackStats(
            track.chartmetric_track_id
          );

          return {
            track_id: track.id,
            snapshot_date: this.syncDate,
            spotify_streams: stats.spotifyStreams,
            spotify_popularity: stats.spotifyPopularity,
            playlist_count: stats.playlistCount,
          };
        })
      );

      // Add to buffer
      for (const result of results) {
        if (result.status === "fulfilled" && result.value) {
          this.batchWriter.add(result.value);
          synced++;
        }
      }

      // Auto-flush
      await this.batchWriter.autoFlush();

      this.logger.info(`Synced ${synced}/${tracks.length} tracks`);
    }

    return synced;
  }

  /**
   * Update last synced timestamps
   */
  private async updateLastSyncedTimestamps(artistIds: string[]): Promise<void> {
    const { error } = await this.supabase
      .from("artists")
      .update({ chartmetric_last_synced: new Date().toISOString() })
      .in("id", artistIds);

    if (error) {
      this.logger.error("Failed to update last_synced timestamps", error);
    }
  }

  /**
   * Update trending data
   */
  private async updateTrendingData(): Promise<void> {
    try {
      const trendingArtists = await this.api.getTrendingArtists("us");

      // Store trending data (simplified)
      // In reality, you'd match trending artists with your tracks
      this.logger.info(`Fetched ${trendingArtists.length} trending artists`);
    } catch (error) {
      this.logger.error("Failed to update trending data", error);
    }
  }
}
