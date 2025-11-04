import dotenv from "dotenv";
import { setupScheduler, stopScheduler } from "./jobs/scheduler";
import { Logger } from "./utils/logger";
import { SyncConfig } from "./config/sync.config";

// Load environment variables
dotenv.config();

const logger = new Logger("Main");

async function main() {
  logger.info("🎵 Starting Fholio Chartmetric Sync Service...");

  // Log configuration
  logger.info("Configuration:", {
    syncEnabled: SyncConfig.features.syncEnabled,
    rateLimitPerSecond: SyncConfig.rateLimit.requestsPerSecond,
    batchSize: SyncConfig.batch.artistBatchSize,
    schedule: SyncConfig.schedule.dailySync,
  });

  // Validate environment
  try {
    validateEnvironment();
    logger.success("Environment validated");
  } catch (error) {
    logger.error("Environment validation failed", error);
    process.exit(1);
  }

  // Setup cron scheduler
  setupScheduler();

  logger.success("✅ Sync service started successfully");
  logger.info("Service is running. Press Ctrl+C to stop.");

  // Handle graceful shutdown
  setupGracefulShutdown();
}

function validateEnvironment() {
  const required = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_KEY",
    "CHARTMETRIC_REFRESH_TOKEN",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

function setupGracefulShutdown() {
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully...`);

    try {
      stopScheduler();
      logger.success("Shutdown complete");
      process.exit(0);
    } catch (error) {
      logger.error("Error during shutdown", error);
      process.exit(1);
    }
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

// Start the service
main().catch((error) => {
  logger.error("Fatal error", error);
  process.exit(1);
});
