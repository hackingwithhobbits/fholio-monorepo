// apps/frontend/src/lib/api/services/week.service.ts
import { apiClient } from "../client";

export class WeekService {
  async getCurrentWeek() {
    return apiClient.get("/week/current");
  }

  async getWeekById(weekId: string) {
    return apiClient.get(`/week/${weekId}`);
  }

  async getWeekHistory(limit: number = 10) {
    return apiClient.get("/week/history", { limit });
  }
}
