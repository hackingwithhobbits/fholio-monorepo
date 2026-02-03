// apps/frontend/src/lib/api/services/wallet.service.ts

import { apiClient } from "../client";

class WalletService {
  /**
   * Get user's wallet
   */
  async getWallet() {
    return apiClient.get("/wallet");
  }

  /**
   * Get wallet summary with stats
   */
  async getWalletSummary() {
    return apiClient.get("/wallet/summary");
  }

  /**
   * Get transaction history
   */
  async getTransactions(limit: number = 20) {
    return apiClient.get("/wallet/transactions", { limit });
  }

  /**
   * Get weekly earnings breakdown
   */
  async getWeeklyEarnings() {
    return apiClient.get("/wallet/weekly-earnings");
  }

  /**
   * Get top earners
   */
  async getTopEarners(limit: number = 5) {
    return apiClient.get("/wallet/top-earners", { limit });
  }

  /**
   * Create withdrawal request
   */
  async createWithdrawal(amount: number) {
    return apiClient.post("/wallet/withdraw", { amount });
  }
}

export const walletService = new WalletService();
