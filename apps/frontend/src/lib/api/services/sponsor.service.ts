import { apiFetch } from "../client";
import type {
  Sponsor,
  Challenge,
  ApiResponse,
} from "../../../../../backend/src/types";

export const sponsorService = {
  /**
   * Get all sponsors
   */
  async getSponsors(): Promise<ApiResponse<Sponsor[]>> {
    return apiFetch<Sponsor[]>("/sponsors");
  },

  /**
   * Get active challenges
   */
  async getActiveChallenges(): Promise<ApiResponse<Challenge[]>> {
    return apiFetch<Challenge[]>("/sponsors/challenges/active");
  },

  /**
   * Get sponsor by ID
   */
  async getSponsorById(id: string): Promise<ApiResponse<Sponsor>> {
    return apiFetch<Sponsor>(`/sponsors/${id}`);
  },
};
