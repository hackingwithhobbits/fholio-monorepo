// src/jobs/chartmetric-sync.job.ts

import { createClient } from "@supabase/supabase-js";
import { ChartmetricSyncService } from "../services/chartmetric/chartmetric-sync.service";
import { Logger } from "../utils/logger";
import { SyncConfig } from "../config/sync.config";

const logger = new Logger("SyncJob");

export async function runChartmetricSync() {
  const startTime = Date.now();

  try {
    logger.info("🌙 Nightly sync job starting...");

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY! // Use service key for admin access
    );

    // Run sync
    const syncService = new ChartmetricSyncService(supabase);
    const result = await syncService.syncAll();

    // Log results
    const duration = (Date.now() - startTime) / 1000;
    logger.info(
      `✅ Sync job completed successfully in ${duration.toFixed(2)}s`
    );
    logger.info(`Results: ${JSON.stringify(result, null, 2)}`);

    // Log to database for monitoring
    await supabase.from("sync_logs").insert({
      sync_type: "chartmetric_nightly",
      status: "success",
      artists_synced: result.artistsSynced,
      tracks_synced: result.tracksSynced,
      errors: result.errors,
      duration_seconds: result.duration / 1000,
      api_calls_used: result.apiCallsUsed,
      completed_at: new Date().toISOString(),
    });

    return result;
  } catch (error) {
    const duration = (Date.now() - startTime) / 1000;
    logger.error(`❌ Sync job failed after ${duration.toFixed(2)}s`, error);

    // Log failure
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    await supabase.from("sync_logs").insert({
      sync_type: "chartmetric_nightly",
      status: "failed",
      error_message: error instanceof Error ? error.message : "Unknown error",
      duration_seconds: duration,
      completed_at: new Date().toISOString(),
    });

    // Re-throw to alert monitoring systems
    throw error;
  }
}
