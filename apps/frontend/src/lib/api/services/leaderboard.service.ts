// apps/frontend/src/lib/api/services/leaderboard.service.ts

import { apiClient } from "../client";

class LeaderboardService {
  /**
   * Get global leaderboard
   */
  async getGlobalLeaderboard(limit: number = 50) {
    return apiClient.get("/leaderboard/global", { limit });
  }

  /**
   * Get weekly leaderboard
   */
  async getWeeklyLeaderboard(weekId?: string, limit: number = 50) {
    const params: any = { limit };
    if (weekId) params.week_id = weekId;
    return apiClient.get("/leaderboard/weekly", params);
  }

  /**
   * Get my current rank
   */
  async getMyRank(weekId?: string) {
    const params = weekId ? { week_id: weekId } : {};
    return apiClient.get("/leaderboard/my-rank", params);
  }

  /**
   * Get my global stats
   */
  async getMyStats() {
    return apiClient.get("/leaderboard/my-stats");
  }

  /**
   * Get prize pool info
   */
  async getPrizePool(weekId: string) {
    return apiClient.get("/leaderboard/prizes", { week_id: weekId });
  }
}

export const leaderboardService = new LeaderboardService();
