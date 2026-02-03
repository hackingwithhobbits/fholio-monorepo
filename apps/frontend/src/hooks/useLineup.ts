// apps/frontend/src/hooks/useLineup.ts

import useSWR from "swr";
import { lineupService } from "@/lib/api/services";
import { toast } from "sonner";

export function useMyCurrentLineup(weekId?: string) {
  const { data, error, mutate, isLoading } = useSWR(
    weekId ? ["/lineups/my-lineup", weekId] : "/lineups/my-lineup",
    () => lineupService.getMyCurrentLineup(weekId),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    },
  );

  return {
    lineup: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useLineupHistory(limit: number = 10) {
  const { data, error, isLoading } = useSWR(
    ["/lineups/history", limit],
    () => lineupService.getLineupHistory(limit),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    history: data || [],
    isLoading,
    error,
  };
}

export function useLineupActions() {
  const saveLineup = async (artistIds: string[], captainId?: string) => {
    try {
      const result = await lineupService.saveLineup({
        artist_ids: artistIds,
        captain_id: captainId,
      });
      toast.success("Lineup saved successfully!");
      return result;
    } catch (error: any) {
      toast.error(error.message || "Failed to save lineup");
      throw error;
    }
  };

  const lockLineup = async (lineupId: string) => {
    try {
      await lineupService.lockLineup(lineupId);
      toast.success("Lineup locked! Good luck!");
    } catch (error: any) {
      toast.error(error.message || "Failed to lock lineup");
      throw error;
    }
  };

  const deleteLineup = async (lineupId: string) => {
    try {
      await lineupService.deleteLineup(lineupId);
      toast.success("Lineup deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete lineup");
      throw error;
    }
  };

  return {
    saveLineup,
    lockLineup,
    deleteLineup,
  };
}
