import useSWR from "swr";
import { chartService } from "../api/services";

export function useTop100(week?: string) {
  const { data, error, isLoading } = useSWR(["charts", "top100", week], () =>
    chartService.getTop100(week)
  );

  return {
    artists: data?.data || [],
    isLoading,
    isError: !!error,
    error,
  };
}

export function useLeaderboard(week: string, limit = 10) {
  const { data, error, isLoading } = useSWR(["leaderboard", week, limit], () =>
    chartService.getLeaderboard(week, limit)
  );

  return {
    topFans: data?.data || [],
    isLoading,
    isError: !!error,
    error,
  };
}

export function useGlobalLeaderboard(limit = 50) {
  const { data, error, isLoading } = useSWR(
    ["leaderboard", "global", limit],
    () => chartService.getGlobalLeaderboard(limit)
  );

  return {
    topFans: data?.data || [],
    isLoading,
    isError: !!error,
    error,
  };
}

export function useLastWeekWinners(limit = 10) {
  const { data, error, isLoading } = useSWR(
    ["winners", "last-week", limit],
    () => chartService.getLastWeekWinners(limit)
  );

  return {
    winners: data?.data || [],
    isLoading,
    isError: !!error,
    error,
  };
}

export function useSocialStats() {
  const { data, error, isLoading } = useSWR("social-stats", () =>
    chartService.getSocialStats()
  );

  return {
    stats: data?.data,
    isLoading,
    isError: !!error,
    error,
  };
}
