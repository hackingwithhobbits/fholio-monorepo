// apps/cron-jobs/src/index.ts

import { WeeklyCycleJobs } from "./jobs/weekly-cycle";

const cycleTasks = new WeeklyCycleJobs();
cycleTasks.startAll();

console.log("🕐 Cron jobs started");

// Keep process alive
process.on("SIGINT", () => {
  console.log("Shutting down cron jobs...");
  process.exit(0);
});
