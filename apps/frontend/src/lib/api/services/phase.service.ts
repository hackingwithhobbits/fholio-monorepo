// apps/frontend/src/lib/api/services/phase.service.ts

import { apiClient } from "../client";

class PhaseService {
  /**
   * Get current phase
   */
  async getCurrentPhase() {
    return apiClient.get("/phase/current");
  }

  /**
   * Lock lineups (Admin only)
   */
  async lockLineups(weekId: string) {
    return apiClient.post("/phase/lock-lineups", { week_id: weekId });
  }

  /**
   * Calculate Top 50 (Admin only)
   */
  async calculateTop50(weekId: string) {
    return apiClient.post("/phase/calculate-top50", { week_id: weekId });
  }

  /**
   * Finalize scores (Admin only)
   */
  async finalizeScores(weekId: string) {
    return apiClient.post("/phase/finalize-scores", { week_id: weekId });
  }

  /**
   * Distribute prizes (Admin only)
   */
  async distributePrizes(weekId: string) {
    return apiClient.post("/phase/distribute-prizes", { week_id: weekId });
  }

  /**
   * Run phase transitions (Admin only)
   */
  async runPhaseTransitions() {
    return apiClient.post("/phase/run-transitions");
  }

  /**
   * Publish weekly pool (Admin only)
   */
  async publishWeeklyPool(weekId: string) {
    return apiClient.post("/phase/publish-pool", { week_id: weekId });
  }
}

export const phaseService = new PhaseService();
