import { ChartmetricAPIService } from "../services/chartmetric/chartmetric-api.service";
import { BatchWriter } from "../services/database/batch-writer";
import { Logger } from "../utils/logger";
import { SyncConfig } from "../config/sync.config";
import {
  getArtistsNeedingSync,
  updateArtistStats,
  checkEmergingCriteria,
  createSyncLog,
  updateSyncLog,
} from "@fholio/database";
import { SyncJobResult, SyncError } from "@fholio/database";

export class SyncEmergingArtistsJob {
  private api: ChartmetricAPIService;
  private batchWriter: BatchWriter;
  private logger: Logger;
  private errors: SyncError[] = [];
  private startTime: Date;
  private syncLogId: string | null = null;

  constructor() {
    this.api = new ChartmetricAPIService();
    this.batchWriter = new BatchWriter();
    this.logger = new Logger("SyncJob");
    this.startTime = new Date();
  }

  /**
   * Main sync function
   */
  async run(): Promise<SyncJobResult> {
    this.logger.info(
      "🚀 Starting Chartmetric sync job for emerging artists..."
    );
    this.startTime = new Date();

    // Create sync log
    const syncLog = await createSyncLog({
      sync_type: "daily_sync",
      status: "partial",
      started_at: this.startTime.toISOString(),
    });
    this.syncLogId = syncLog.id;

    let artistsSynced = 0;
    let snapshotsCreated = 0;
    let apiCallsUsed = 0;

    try {
      // Step 1: Get artists that need syncing
      const artists = await this.getArtistsToSync();
      this.logger.info(`Found ${artists.length} artists to sync`);

      if (artists.length === 0) {
        this.logger.info("No artists need syncing at this time");
        await this.finalizeSyncLog("success", 0, 0, 0);
        return this.buildResult(0, 0, 0);
      }

      // Step 2: Sync each artist
      for (let i = 0; i < artists.length; i++) {
        const artist = artists[i];

        try {
          this.logger.info(
            `[${i + 1}/${artists.length}] Syncing ${artist.stage_name}...`
          );

          // Fetch Spotify stats from Chartmetric
          const spotifyStats = await this.api.getArtistSpotifyStats(
            artist.chartmetric_id
          );
          apiCallsUsed++;

          // Fetch playlist data
          const playlistData = await this.api.getArtistPlaylistData(
            artist.chartmetric_id
          );
          apiCallsUsed++;

          // Check if still meets emerging criteria
          const stillEmerging = await checkEmergingCriteria(
            spotifyStats.followers,
            spotifyStats.monthlyListeners,
            artist.momentum_score || undefined,
            artist.tier || undefined
          );

          // Create snapshot
          const snapshotDate = new Date().toISOString().split("T")[0];
          this.batchWriter.add({
            artist_id: artist.id,
            snapshot_date: snapshotDate,
            spotify_followers: spotifyStats.followers,
            spotify_monthly_listeners: spotifyStats.monthlyListeners,
            spotify_popularity: spotifyStats.popularity,
            playlist_count: playlistData.totalPlaylists,
            playlist_reach: playlistData.totalReach,
          });

          // Update artist record
          await updateArtistStats(artist.id, {
            spotify_followers: spotifyStats.followers,
            spotify_monthly_listeners: spotifyStats.monthlyListeners,
            is_emerging: stillEmerging,
            chartmetric_last_synced: new Date().toISOString(),
          });

          artistsSynced++;

          // Auto-flush if buffer is full
          await this.batchWriter.autoFlush();

          // Log progress
          this.logger.progress(i + 1, artists.length, artist.stage_name);

          // Log stats every 10 artists
          if ((i + 1) % 10 === 0) {
            this.api.logRateLimiterStats();
          }
        } catch (error) {
          this.logger.error(`Failed to sync ${artist.stage_name}`, error);
          this.errors.push({
            artistId: artist.id,
            chartmetricId: artist.chartmetric_id,
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
          });
        }
      }

      // Step 3: Final flush
      const flushed = await this.batchWriter.flush();
      snapshotsCreated = this.batchWriter.getTotalWritten();

      // Step 4: Wait for rate limiter to drain
      await this.api.drain();

      // Step 5: Finalize sync log
      const status =
        this.errors.length === 0
          ? "success"
          : this.errors.length < artists.length
          ? "partial"
          : "failed";

      await this.finalizeSyncLog(
        status,
        artistsSynced,
        snapshotsCreated,
        apiCallsUsed
      );

      // Step 6: Log summary
      this.logSummary(artistsSynced, snapshotsCreated, apiCallsUsed);

      return this.buildResult(artistsSynced, snapshotsCreated, apiCallsUsed);
    } catch (error) {
      this.logger.error("Sync job failed", error);

      if (this.syncLogId) {
        await this.finalizeSyncLog(
          "failed",
          artistsSynced,
          snapshotsCreated,
          apiCallsUsed
        );
      }

      throw error;
    }
  }

  /**
   * Get artists that need syncing
   */
  private async getArtistsToSync() {
    const maxAgeHours = 24; // Sync once per day
    const artists = await getArtistsNeedingSync(maxAgeHours);

    // Limit to batch size
    return artists.slice(0, SyncConfig.batch.artistBatchSize);
  }

  /**
   * Finalize sync log
   */
  private async finalizeSyncLog(
    status: "success" | "failed" | "partial",
    artistsSynced: number,
    snapshotsCreated: number,
    apiCallsUsed: number
  ) {
    if (!this.syncLogId) return;

    const endTime = new Date();
    const duration = (endTime.getTime() - this.startTime.getTime()) / 1000;

    await updateSyncLog(this.syncLogId, {
      status,
      artists_synced: artistsSynced,
      snapshots_created: snapshotsCreated,
      errors: this.errors.length,
      api_calls_used: apiCallsUsed,
      duration_seconds: duration,
      completed_at: endTime.toISOString(),
      error_message:
        this.errors.length > 0
          ? `${this.errors.length} errors occurred`
          : undefined,
      error_details: this.errors.length > 0 ? this.errors : undefined,
    });
  }

  /**
   * Log summary
   */
  private logSummary(
    artistsSynced: number,
    snapshotsCreated: number,
    apiCallsUsed: number
  ) {
    const endTime = new Date();
    const duration = (endTime.getTime() - this.startTime.getTime()) / 1000;

    this.logger.success("✅ Sync job completed!", {
      artistsSynced,
      snapshotsCreated,
      errors: this.errors.length,
      apiCallsUsed,
      durationSeconds: duration.toFixed(2),
      durationMinutes: (duration / 60).toFixed(2),
    });

    if (this.errors.length > 0) {
      this.logger.warn(`${this.errors.length} errors occurred during sync`, {
        errors: this.errors,
      });
    }

    // Log rate limiter stats
    this.api.logRateLimiterStats();
  }

  /**
   * Build result object
   */
  private buildResult(
    artistsSynced: number,
    snapshotsCreated: number,
    apiCallsUsed: number
  ): SyncJobResult {
    const endTime = new Date();
    const duration = endTime.getTime() - this.startTime.getTime();

    return {
      artistsSynced,
      tracksDiscovered: 0, // Not implemented in this version
      snapshotsCreated,
      errors: this.errors.length,
      duration,
      apiCallsUsed,
      startTime: this.startTime.toISOString(),
      endTime: endTime.toISOString(),
    };
  }
}

/**
 * Execute sync job (for manual runs)
 */
export async function runSync(): Promise<SyncJobResult> {
  const job = new SyncEmergingArtistsJob();
  return job.run();
}
