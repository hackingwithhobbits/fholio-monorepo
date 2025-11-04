// apps/cron-jobs/src/scripts/test-sync.ts

import dotenv from "dotenv";
import { runSync } from "../jobs/sync-emerging-artists.job";
import { Logger } from "../utils/logger";

dotenv.config();

const logger = new Logger("TestSync");

async function testSync() {
  logger.info("🧪 Running manual sync test...");

  try {
    const result = await runSync();

    logger.success("Sync test completed!", result);

    process.exit(0);
  } catch (error) {
    logger.error("Sync test failed", error);
    process.exit(1);
  }
}

testSync();
