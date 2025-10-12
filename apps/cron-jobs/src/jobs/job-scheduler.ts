// src/jobs/job-scheduler.ts

import cron from "node-cron";
import { runChartmetricSync } from "./chartmetric-sync.job";
import { Logger } from "../utils/logger";
import { SyncConfig } from "../config/sync.config";

const logger = new Logger("JobScheduler");

export function setupJobs() {
  logger.info("Setting up scheduled jobs...");

  // Nightly sync at 3 AM
  cron.schedule(SyncConfig.schedule.cronExpression, async () => {
    logger.info("Triggered nightly Chartmetric sync");

    try {
      await runChartmetricSync();
    } catch (error) {
      logger.error("Nightly sync failed", error);
      // Alert dev team (Sentry, Slack, PagerDuty, etc.)
      await alertDevTeam(error);
    }
  });

  logger.info(
    `✅ Nightly sync scheduled: ${SyncConfig.schedule.cronExpression}`
  );
}

async function alertDevTeam(error: any) {
  // Send to Sentry, Slack, email, etc.
  logger.error("ALERT: Sync job failed!", error);
}
