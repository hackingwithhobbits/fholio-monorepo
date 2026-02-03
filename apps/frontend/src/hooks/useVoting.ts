// apps/frontend/src/hooks/useVoting.ts

import useSWR from "swr";
import { votingService } from "@/lib/api/services";
import { toast } from "sonner";
import { useState } from "react";

export function useMyVotes(weekId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    weekId ? ["/votes/my-votes", weekId] : "/votes/my-votes",
    () => votingService.getMyVotes(weekId),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    },
  );

  return {
    votes: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useRemainingVotes(weekId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    weekId ? ["/votes/remaining", weekId] : "/votes/remaining",
    () => votingService.getRemainingVotes(weekId),
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    },
  );

  return {
    remaining: data?.remaining || 0,
    limit: data?.limit || 0,
    used: data?.used || 0,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useTopVoted(weekId?: string, limit: number = 10) {
  const { data, error, isLoading } = useSWR(
    weekId ? ["/votes/top-voted", weekId, limit] : ["/votes/top-voted", limit],
    () => votingService.getTopVoted(weekId, limit),
    {
      refreshInterval: 15000, // Refresh every 15 seconds for live updates
      revalidateOnFocus: true,
    },
  );

  return {
    topVoted: data || [],
    isLoading,
    error,
  };
}

export function useVotingActions() {
  const [isVoting, setIsVoting] = useState(false);

  const submitVote = async (artistId: string, weekId?: string) => {
    setIsVoting(true);
    try {
      await votingService.submitVote({
        artist_id: artistId,
        week_id: weekId,
      });
      toast.success("Vote submitted!", {
        description: "Your vote has been counted",
      });
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to submit vote");
      return false;
    } finally {
      setIsVoting(false);
    }
  };

  const removeVote = async (voteId: string) => {
    try {
      await votingService.removeVote(voteId);
      toast.success("Vote removed");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to remove vote");
      return false;
    }
  };

  return {
    submitVote,
    removeVote,
    isVoting,
  };
}
