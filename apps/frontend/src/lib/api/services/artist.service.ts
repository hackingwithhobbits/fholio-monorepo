import { apiFetch } from "../client";
import type { Artist, GetArtistsParams, ApiResponse } from "../types";

export const artistService = {
  /**
   * Get all artists with filters
   */
  async getArtists(params?: GetArtistsParams): Promise<ApiResponse<Artist[]>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }

    return apiFetch<Artist[]>(`/artists?${searchParams.toString()}`);
  },

  /**
   * Get single artist by ID
   */
  async getArtistById(id: string): Promise<ApiResponse<Artist>> {
    return apiFetch<Artist>(`/artists/${id}`);
  },

  /**
   * Get artist performance history
   */
  async getArtistPerformance(id: string): Promise<ApiResponse<any>> {
    return apiFetch(`/artists/${id}/performance`);
  },

  /**
   * Get trending artists
   */
  async getTrending(limit = 10): Promise<ApiResponse<Artist[]>> {
    return apiFetch<Artist[]>(`/artists/trending?limit=${limit}`);
  },

  /**
   * Get artists by genre
   */
  async getByGenre(genre: string): Promise<ApiResponse<Artist[]>> {
    return apiFetch<Artist[]>(`/artists/genre/${genre}`);
  },

  /**
   * Get all genres
   */
  async getGenres(): Promise<ApiResponse<string[]>> {
    return apiFetch<string[]>("/artists/genres");
  },
};
