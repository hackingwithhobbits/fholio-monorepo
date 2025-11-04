import { apiFetch } from "../client";
import type { Artist, TopFan, SocialStats, ApiResponse } from "../types";

export const chartService = {
  /**
   * Get Top 100 artists
   */
  async getTop100(week?: string): Promise<ApiResponse<Artist[]>> {
    const url = week ? `/charts/top100?week=${week}` : "/charts/top100";
    return apiFetch<Artist[]>(url);
  },

  /**
   * Get leaderboard
   */
  async getLeaderboard(
    week: string,
    limit = 10
  ): Promise<ApiResponse<TopFan[]>> {
    return apiFetch<TopFan[]>(
      `/charts/leaderboard?week=${week}&limit=${limit}`
    );
  },

  /**
   * Get global leaderboard
   */
  async getGlobalLeaderboard(limit = 50): Promise<ApiResponse<any[]>> {
    return apiFetch<any[]>(`/charts/leaderboard/global?limit=${limit}`);
  },

  /**
   * Get last week's winners
   */
  async getLastWeekWinners(limit = 10): Promise<ApiResponse<TopFan[]>> {
    return apiFetch<TopFan[]>(`/charts/winners/last-week?limit=${limit}`);
  },

  /**
   * Get social stats
   */
  async getSocialStats(): Promise<ApiResponse<SocialStats>> {
    return apiFetch<SocialStats>("/charts/stats");
  },
};
