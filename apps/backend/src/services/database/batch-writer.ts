// src/services/database/batch-writer.ts

import { SupabaseClient } from "@supabase/supabase-js";
import { Logger } from "../../utils/logger";
import { SyncConfig } from "../../config/sync.config";

export interface ChartmetricSnapshot {
  artist_id?: string;
  track_id?: string;
  snapshot_date: string;
  spotify_followers?: number;
  spotify_monthly_listeners?: number;
  spotify_popularity?: number;
  instagram_followers?: number;
  tiktok_followers?: number;
  playlist_count?: number;
  playlist_reach?: number;
  spotify_streams?: number;
}

export class BatchWriter {
  private logger: Logger;
  private buffer: ChartmetricSnapshot[] = [];

  constructor(private supabase: SupabaseClient) {
    this.logger = new Logger("BatchWriter");
  }

  /**
   * Add record to buffer
   */
  add(snapshot: ChartmetricSnapshot): void {
    this.buffer.push(snapshot);
  }

  /**
   * Flush buffer to database (batch insert)
   */
  async flush(): Promise<void> {
    if (this.buffer.length === 0) {
      return;
    }

    const batchSize = SyncConfig.batch.dbBatchSize;
    const totalBatches = Math.ceil(this.buffer.length / batchSize);

    this.logger.info(
      `Flushing ${this.buffer.length} records in ${totalBatches} batches...`
    );

    for (let i = 0; i < this.buffer.length; i += batchSize) {
      const batch = this.buffer.slice(i, i + batchSize);

      try {
        // Use upsert to handle duplicates (on conflict update)
        const { error } = await this.supabase
          .from("chartmetric_snapshots")
          .upsert(batch, {
            onConflict: "artist_id,track_id,snapshot_date",
            ignoreDuplicates: false,
          });

        if (error) {
          this.logger.error(
            `Batch insert failed for batch ${i / batchSize + 1}`,
            error
          );
          throw error;
        }

        this.logger.info(`Inserted batch ${i / batchSize + 1}/${totalBatches}`);
      } catch (error) {
        this.logger.error("Failed to insert batch", error);
        // Continue with next batch
      }
    }

    // Clear buffer
    const inserted = this.buffer.length;
    this.buffer = [];

    this.logger.info(`Successfully flushed ${inserted} records`);
  }

  /**
   * Get current buffer size
   */
  getBufferSize(): number {
    return this.buffer.length;
  }

  /**
   * Auto-flush when buffer reaches threshold
   */
  async autoFlush(): Promise<void> {
    if (this.buffer.length >= SyncConfig.batch.dbBatchSize) {
      await this.flush();
    }
  }
}
