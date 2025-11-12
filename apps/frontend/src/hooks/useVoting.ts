// apps/frontend/src/hooks/useVoting.ts

import useSWR from "swr";
import { useState } from "react";
import { apiService } from "../services/api.service";
import { useCurrentWeek } from "./useWeek";

export function useVoting() {
  const { week } = useCurrentWeek();
  const [isVoting, setIsVoting] = useState(false);

  const { data: votes, mutate } = useSWR(
    week ? `/votes/my-votes?week_id=${week.id}` : null,
    () => apiService.getMyVotes(week?.id)
  );

  const { data: remaining } = useSWR(
    week ? `/votes/remaining?week_id=${week.id}` : null,
    () => apiService.getRemainingVotes(week?.id),
    {
      refreshInterval: 5000,
    }
  );

  const submitVote = async (artistId: string) => {
    if (!week) throw new Error("No active week");

    setIsVoting(true);
    try {
      await apiService.submitVote(artistId, week.id);
      mutate(); // Refresh votes
    } catch (error) {
      throw error;
    } finally {
      setIsVoting(false);
    }
  };

  return {
    votes: votes || [],
    remainingVotes: remaining || 0,
    isVoting,
    submitVote,
  };
}
