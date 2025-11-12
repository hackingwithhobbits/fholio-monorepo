// apps/frontend/src/services/api.service.ts

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class ApiService {
  private baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

  /**
   * Generic fetch wrapper with auth
   */
  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API request failed");
    }

    return response.json();
  }

  // ============================================
  // WEEK ENDPOINTS
  // ============================================

  async getCurrentWeek() {
    return this.fetch("/week/current");
  }

  // ============================================
  // ARTIST ENDPOINTS
  // ============================================

  async getArtistLeaderboard(league?: "Major" | "Minor", limit: number = 50) {
    const params = new URLSearchParams();
    if (league) params.append("league", league);
    params.append("limit", limit.toString());

    return this.fetch(`/artists/leaderboard?${params}`);
  }

  async getArtistProfile(artistId: string) {
    return this.fetch(`/artists/${artistId}`);
  }

  // ============================================
  // VOTING ENDPOINTS
  // ============================================

  async submitVote(artistId: string, weekId: string) {
    return this.fetch("/votes", {
      method: "POST",
      body: JSON.stringify({ artist_id: artistId, week_id: weekId }),
    });
  }

  async getMyVotes(weekId?: string) {
    const params = weekId ? `?week_id=${weekId}` : "";
    return this.fetch(`/votes/my-votes${params}`);
  }

  async getRemainingVotes(weekId: string) {
    return this.fetch(`/votes/remaining?week_id=${weekId}`);
  }

  // ============================================
  // LINEUP ENDPOINTS
  // ============================================

  async getMyLineup(weekId?: string) {
    const params = weekId ? `?week_id=${weekId}` : "";
    return this.fetch(`/lineups/my-lineup${params}`);
  }

  async saveLineup(artistIds: string[], captainId?: string) {
    return this.fetch("/lineups", {
      method: "POST",
      body: JSON.stringify({ artist_ids: artistIds, captain_id: captainId }),
    });
  }

  async lockLineup(lineupId: string) {
    return this.fetch(`/lineups/${lineupId}/lock`, {
      method: "PUT",
    });
  }

  async getLineupScore(lineupId: string) {
    return this.fetch(`/lineups/${lineupId}/score`);
  }

  // ============================================
  // USER ENDPOINTS
  // ============================================

  async getUserProfile() {
    return this.fetch("/users/me");
  }

  async getUserWallet() {
    return this.fetch("/users/me/wallet");
  }

  async getUserStats() {
    return this.fetch("/users/me/stats");
  }

  async updateProfile(data: { display_name?: string; avatar_url?: string }) {
    return this.fetch("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // ============================================
  // LEADERBOARD ENDPOINTS
  // ============================================

  async getFanLeaderboard(limit: number = 100) {
    return this.fetch(`/fans/leaderboard?limit=${limit}`);
  }

  // ============================================
  // CHALLENGES ENDPOINTS
  // ============================================

  async getActiveChallenges() {
    return this.fetch("/challenges/active");
  }

  async enterChallenge(challengeId: string) {
    return this.fetch(`/challenges/${challengeId}/enter`, {
      method: "POST",
    });
  }
}

export const apiService = new ApiService();
