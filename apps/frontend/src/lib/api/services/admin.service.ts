// apps/frontend/src/lib/api/services/admin.service.ts

import { apiClient } from "../client";

class AdminService {
  /**
   * Get platform statistics
   */
  async getPlatformStats() {
    return apiClient.get("/admin/stats");
  }

  /**
   * Get pending track submissions
   */
  async getPendingTracks(limit: number = 50) {
    return apiClient.get("/admin/tracks/pending", { limit });
  }

  /**
   * Approve a track
   */
  async approveTrack(trackId: string) {
    return apiClient.post(`/admin/tracks/${trackId}/approve`);
  }

  /**
   * Reject a track
   */
  async rejectTrack(trackId: string, reason?: string) {
    return apiClient.post(`/admin/tracks/${trackId}/reject`, { reason });
  }

  /**
   * Get all weeks
   */
  async getAllWeeks() {
    return apiClient.get("/admin/weeks");
  }

  /**
   * Create a new week
   */
  async createWeek(weekData: any) {
    return apiClient.post("/admin/weeks", weekData);
  }

  /**
   * Update a week
   */
  async updateWeek(weekId: string, weekData: any) {
    return apiClient.put(`/admin/weeks/${weekId}`, weekData);
  }

  /**
   * Delete a week
   */
  async deleteWeek(weekId: string) {
    return apiClient.delete(`/admin/weeks/${weekId}`);
  }

  /**
   * Get all users
   */
  async getAllUsers(limit: number = 100, offset: number = 0) {
    return apiClient.get("/admin/users", { limit, offset });
  }

  /**
   * Suspend a user
   */
  async suspendUser(userId: string, reason?: string) {
    return apiClient.post(`/admin/users/${userId}/suspend`, { reason });
  }

  /**
   * Unsuspend a user
   */
  async unsuspendUser(userId: string) {
    return apiClient.post(`/admin/users/${userId}/unsuspend`);
  }

  /**
   * Get prize pool configuration
   */
  async getPrizePoolConfig() {
    return apiClient.get("/admin/prize-pool");
  }

  /**
   * Update prize pool configuration
   */
  async updatePrizePoolConfig(config: any) {
    return apiClient.put("/admin/prize-pool", config);
  }

  /**
   * Get activity logs
   */
  async getActivityLogs(limit: number = 50) {
    return apiClient.get("/admin/activity", { limit });
  }
}

export const adminService = new AdminService();
