// apps/frontend/src/lib/api/services/lineup.service.ts

import { apiClient } from "../client";

export interface SaveLineupData {
  artist_ids: string[];
  captain_id?: string;
}

class LineupService {
  /**
   * Get current lineup for logged-in user
   */
  async getMyCurrentLineup(weekId?: string) {
    const params = weekId ? { week_id: weekId } : {};
    return apiClient.get("/lineups/my-lineup", params);
  }

  /**
   * Save or update lineup
   */
  async saveLineup(data: SaveLineupData) {
    return apiClient.post("/lineups", data);
  }

  /**
   * Lock lineup
   */
  async lockLineup(lineupId: string) {
    return apiClient.put(`/lineups/${lineupId}/lock`, {});
  }

  /**
   * Get lineup score
   */
  async getLineupScore(lineupId: string) {
    return apiClient.get(`/lineups/${lineupId}/score`);
  }

  /**
   * Delete lineup
   */
  async deleteLineup(lineupId: string) {
    return apiClient.delete(`/lineups/${lineupId}`);
  }

  /**
   * Get lineup history
   */
  async getLineupHistory(limit: number = 10) {
    return apiClient.get("/lineups/history", { limit });
  }
}

export const lineupService = new LineupService();
