// apps/cron-jobs/src/jobs/weekly-cycle.ts

import cron from "node-cron";
import { WeekService } from "../../../backend/src/services/week.service";
import { ArtistService } from "../../../backend/src/services/artist.service";
import { PoolService } from "../../../backend/src/services/pool.service";

export class WeeklyCycleJobs {
  private weekService: WeekService;
  private artistService: ArtistService;
  private poolService: PoolService;

  constructor() {
    this.weekService = new WeekService();
    this.artistService = new ArtistService();
    this.poolService = new PoolService();
  }

  /**
   * Friday 8am ET: Create new week + publish 100-song pool
   */
  scheduleWeekCreation() {
    // Run every Friday at 8am ET
    cron.schedule(
      "0 8 * * 5",
      async () => {
        console.log("[CRON] Creating new week...");

        const week = await this.weekService.createNewWeek();
        await this.artistService.publishWeeklyPool(week.id, 100);

        console.log(`[CRON] Week ${week.week_number} created`);
      },
      {
        timezone: "America/New_York",
      }
    );
  }

  /**
   * Monday 6am ET: Calculate Top 50 from voting
   */
  scheduleTop50Calculation() {
    cron.schedule(
      "0 6 * * 1",
      async () => {
        console.log("[CRON] Calculating Top 50...");

        const week = await this.weekService.getCurrentWeek();
        if (!week) return;

        await this.artistService.calculateTop50(week.id);
        await this.weekService.updatePhase(week.id, "picks_open");

        console.log("[CRON] Top 50 published");
      },
      {
        timezone: "America/New_York",
      }
    );
  }

  /**
   * Thursday 10am ET: Lock all lineups + finalize scores
   */
  scheduleLineupLock() {
    cron.schedule(
      "0 10 * * 4",
      async () => {
        console.log("[CRON] Locking lineups...");

        const week = await this.weekService.getCurrentWeek();
        if (!week) return;

        await this.weekService.lockAllLineups(week.id);
        await this.artistService.finalizeScores(week.id);

        console.log("[CRON] Lineups locked, scores finalized");
      },
      {
        timezone: "America/New_York",
      }
    );
  }

  /**
   * Thursday 7pm ET: Trigger live show + distribute payouts
   */
  scheduleLiveShow() {
    cron.schedule(
      "0 19 * * 4",
      async () => {
        console.log("[CRON] Starting live show...");

        const week = await this.weekService.getCurrentWeek();
        if (!week) return;

        await this.weekService.updatePhase(week.id, "live_show");
        await this.poolService.distributePayouts(week.id);
        await this.weekService.completeWeek(week.id);

        console.log("[CRON] Live show complete, payouts distributed");
      },
      {
        timezone: "America/New_York",
      }
    );
  }

  startAll() {
    this.scheduleWeekCreation();
    this.scheduleTop50Calculation();
    this.scheduleLineupLock();
    this.scheduleLiveShow();
    console.log("[CRON] All weekly cycle jobs scheduled");
  }
}
