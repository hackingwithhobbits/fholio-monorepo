import { apiFetch } from "../client";
import type { Portfolio, ApiResponse } from "../types";

export const portfolioService = {
  /**
   * Get current portfolio
   */
  async getCurrentPortfolio(): Promise<ApiResponse<Portfolio>> {
    return apiFetch<Portfolio>("/portfolio/current");
  },

  /**
   * Get portfolio history
   */
  async getPortfolioHistory(limit = 10): Promise<ApiResponse<Portfolio[]>> {
    return apiFetch<Portfolio[]>(`/portfolio/history?limit=${limit}`);
  },

  /**
   * Create portfolio
   */
  async createPortfolio(data: {
    weekStarting: string;
    artistIds: string[];
  }): Promise<ApiResponse<Portfolio>> {
    return apiFetch<Portfolio>("/portfolio", {
      method: "POST",
      data,
    });
  },

  /**
   * Update portfolio
   */
  async updatePortfolio(
    portfolioId: string,
    data: { artistIds: string[] }
  ): Promise<ApiResponse<Portfolio>> {
    return apiFetch<Portfolio>(`/portfolio/${portfolioId}`, {
      method: "PUT",
      data,
    });
  },
};
