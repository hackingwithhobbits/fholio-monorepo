// apps/frontend/src/lib/api/services/voting.service.ts

import { apiClient } from "../client";

export interface SubmitVoteData {
  artist_id: string;
  week_id?: string;
}

class VotingService {
  /**
   * Submit a vote for an artist
   */
  async submitVote(data: SubmitVoteData) {
    return apiClient.post("/votes", data);
  }

  /**
   * Get my votes for current or specific week
   */
  async getMyVotes(weekId?: string) {
    const params = weekId ? { week_id: weekId } : {};
    return apiClient.get("/votes/my-votes", params);
  }

  /**
   * Get remaining votes
   */
  async getRemainingVotes(weekId?: string) {
    const params = weekId ? { week_id: weekId } : {};
    return apiClient.get("/votes/remaining", params);
  }

  /**
   * Remove a vote
   */
  async removeVote(voteId: string) {
    return apiClient.delete(`/votes/${voteId}`);
  }

  /**
   * Get top voted artists
   */
  async getTopVoted(weekId?: string, limit: number = 10) {
    const params: any = { limit };
    if (weekId) params.week_id = weekId;
    return apiClient.get("/votes/top-voted", params);
  }
}

export const votingService = new VotingService();
