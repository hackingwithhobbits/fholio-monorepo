// src/index.ts

import dotenv from "dotenv";
import { setupJobs } from "./jobs/job-scheduler";
import { Logger } from "./utils/logger";

dotenv.config();

const logger = new Logger("Main");

async function main() {
  logger.info("Starting Fholio Backend...");

  // Setup cron jobs
  setupJobs();

  logger.info("All systems operational ✅");
}

main().catch((error) => {
  logger.error("Fatal error", error);
  process.exit(1);
});
