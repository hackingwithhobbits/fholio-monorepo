// apps/frontend/src/hooks/useLeaderboard.ts

import useSWR from "swr";
import { leaderboardService } from "@/lib/api/services";

export function useGlobalLeaderboard(limit: number = 50) {
  const { data, error, isLoading } = useSWR(
    ["/leaderboard/global", limit],
    () => leaderboardService.getGlobalLeaderboard(limit),
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
    },
  );

  return {
    leaderboard: data || [],
    isLoading,
    error,
  };
}

export function useWeeklyLeaderboard(weekId?: string, limit: number = 50) {
  const { data, error, isLoading } = useSWR(
    weekId
      ? ["/leaderboard/weekly", weekId, limit]
      : ["/leaderboard/weekly", limit],
    () => leaderboardService.getWeeklyLeaderboard(weekId, limit),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    },
  );

  return {
    leaderboard: data || [],
    isLoading,
    error,
  };
}

export function useMyRank(weekId?: string) {
  const { data, error, isLoading } = useSWR(
    weekId ? ["/leaderboard/my-rank", weekId] : "/leaderboard/my-rank",
    () => leaderboardService.getMyRank(weekId),
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    },
  );

  return {
    rank: data,
    isLoading,
    error,
  };
}

export function useMyStats() {
  const { data, error, isLoading } = useSWR(
    "/leaderboard/my-stats",
    () => leaderboardService.getMyStats(),
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
    },
  );

  return {
    stats: data,
    isLoading,
    error,
  };
}
