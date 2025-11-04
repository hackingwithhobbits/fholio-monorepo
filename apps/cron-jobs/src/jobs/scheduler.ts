import cron from "node-cron";
import { runSync } from "./sync-emerging-artists.job";
import { Logger } from "../utils/logger";
import { SyncConfig } from "../config/sync.config";

const logger = new Logger("Scheduler");

export function setupScheduler() {
  if (!SyncConfig.features.syncEnabled) {
    logger.warn("⚠️  Sync is DISABLED in configuration");
    return;
  }

  logger.info("⏰ Setting up cron schedules...");

  // Daily sync at 2:00 PM
  cron.schedule(
    SyncConfig.schedule.dailySync,
    async () => {
      logger.info("🔔 Triggered: Daily sync job");

      try {
        const result = await runSync();
        logger.success("Daily sync completed successfully", result);
      } catch (error) {
        logger.error("Daily sync failed", error);
        // TODO: Send alert to monitoring system (Sentry, Slack, etc.)
        await sendAlert("Daily sync failed", error);
      }
    },
    {
      timezone: "America/New_York", // Adjust to your timezone
    }
  );

  logger.success(`✅ Daily sync scheduled: ${SyncConfig.schedule.dailySync}`);
  logger.info("Cron job is active and waiting for scheduled time...");

  // Log next run time
  const nextRun = getNextRunTime(SyncConfig.schedule.dailySync);
  logger.info(`Next sync will run at: ${nextRun.toLocaleString()}`);
}

/**
 * Get next run time for cron expression
 */
function getNextRunTime(cronExpression: string): Date {
  const interval = cron.validate(cronExpression);
  if (!interval) {
    throw new Error(`Invalid cron expression: ${cronExpression}`);
  }

  // Simple calculation for next 2 PM
  const now = new Date();
  const next = new Date();
  next.setHours(14, 0, 0, 0);

  // If already past 2 PM today, schedule for tomorrow
  if (now.getHours() >= 14) {
    next.setDate(next.getDate() + 1);
  }

  return next;
}

/**
 * Send alert on failure (implement based on your alerting system)
 */
async function sendAlert(message: string, error: any) {
  // TODO: Implement alerting
  // Examples:
  // - Send to Sentry
  // - Post to Slack webhook
  // - Send email via SendGrid
  // - Create PagerDuty incident

  logger.error("ALERT:", { message, error });
}

/**
 * Graceful shutdown
 */
export function stopScheduler() {
  logger.info("Stopping scheduler...");
  cron.getTasks().forEach((task) => task.stop());
  logger.success("Scheduler stopped");
}
