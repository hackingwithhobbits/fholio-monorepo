import { apiFetch } from "../client";
import type { ApiResponse } from "../types";

export const walletService = {
  /**
   * Get wallet
   */
  async getWallet(): Promise<ApiResponse<any>> {
    return apiFetch("/wallet");
  },

  /**
   * Get payout history
   */
  async getPayoutHistory(limit = 20): Promise<ApiResponse<any[]>> {
    return apiFetch(`/wallet/payouts?limit=${limit}`);
  },

  /**
   * Get transactions
   */
  async getTransactions(limit = 50): Promise<ApiResponse<any[]>> {
    return apiFetch(`/wallet/transactions?limit=${limit}`);
  },

  /**
   * Get referrals
   */
  async getReferrals(): Promise<ApiResponse<any>> {
    return apiFetch("/wallet/referrals");
  },
};
