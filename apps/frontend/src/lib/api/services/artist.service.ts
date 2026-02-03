// apps/frontend/src/lib/api/services/artist.service.ts
import { apiClient } from "../client";

export interface GetArtistsParams {
  league?: "Major" | "Minor";
  genre?: string;
  limit?: number;
}

class ArtistService {
  async getArtistById(artistId: string) {
    return apiClient.get(`/artists/${artistId}`);
  }

  /**
   * Get complete artist profile
   */
  async getArtistProfile(artistId: string) {
    return apiClient.get(`/artists/${artistId}/profile`);
  }

  /**
   * Get artist tracks
   */
  async getArtistTracks(artistId: string) {
    return apiClient.get(`/artists/${artistId}/tracks`);
  }

  /**
   * Get artist stats
   */
  async getArtistStats(artistId: string) {
    return apiClient.get(`/artists/${artistId}/stats`);
  }

  /**
   * Get artist weekly history
   */
  async getArtistHistory(artistId: string, limit: number = 12) {
    return apiClient.get(`/artists/${artistId}/history`, { limit });
  }

  /**
   * Get artist leaderboard
   */
  async getLeaderboard(weekId?: string, league?: string, limit: number = 50) {
    return apiClient.get("/artists/leaderboard", {
      week_id: weekId,
      league,
      limit,
    });
  }

  /**
   * Search artists
   */
  async searchArtists(query?: string, genre?: string, limit: number = 20) {
    return apiClient.get("/artists/search", { q: query, genre, limit });
  }

  async getArtists(params?: GetArtistsParams) {
    return apiClient.get("/artists", params);
  }

  async getArtistPerformance(id: string) {
    return apiClient.get(`/artists/${id}/performance`);
  }

  async getTrending(limit: number = 20) {
    return apiClient.get("/artists/trending", { limit });
  }

  async getByGenre(genre: string) {
    return apiClient.get("/artists", { genre });
  }

  async getGenres() {
    return apiClient.get("/artists/genres");
  }

  async getCurrentPool() {
    return apiClient.get("/artists/pool/current");
  }

  async getTop50() {
    return apiClient.get("/artists/top50");
  }
  async getMySubmissions(artistId: string) {
    return apiClient.get("/artists/my-submissions", { artistId });
  }

  async getMyStats(artistId: string) {
    return apiClient.get("/artists/my-stats", { artistId });
  }
}

export const artistService = new ArtistService();
