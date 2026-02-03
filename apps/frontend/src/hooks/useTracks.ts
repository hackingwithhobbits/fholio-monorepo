// apps/frontend/src/hooks/useTracks.ts
import useSWR from "swr";
import { trackService } from "@/lib/api/services";

export function useCurrentWeekTracks() {
  const { data, error, mutate } = useSWR(
    "/tracks/current-week",
    trackService.getCurrentWeekTracks,
    {
      refreshInterval: 60000, // Refresh every minute
    },
  );

  return {
    tracks: data || [],
    isLoading: !error && !data,
    error,
    refresh: mutate,
  };
}

export function useTrendingTracks(limit: number = 20) {
  const { data, error, mutate } = useSWR(
    ["/tracks/trending", limit],
    () => trackService.getTrendingTracks(limit),
    {
      refreshInterval: 30000,
    },
  );

  return {
    tracks: data || [],
    isLoading: !error && !data,
    error,
    refresh: mutate,
  };
}
