// apps/frontend/src/lib/api/services/user.service.ts
import { apiClient } from "../client";

class UserService {
  async getProfile() {
    return apiClient.get("/user/profile");
  }

  async updateProfile(data: any) {
    return apiClient.put("/user/profile", data);
  }

  async getStats() {
    return apiClient.get("/user/stats");
  }

  async getWallet() {
    return apiClient.get("/user/wallet");
  }
}

export const userService = new UserService();
