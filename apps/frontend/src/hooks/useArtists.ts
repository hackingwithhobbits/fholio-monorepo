// apps/frontend/src/hooks/useArtists.ts

import useSWR from "swr";
import { apiService } from "../services/api.service";

export function useArtistLeaderboard(
  league?: "Major" | "Minor",
  limit: number = 50
) {
  const { data, error, mutate } = useSWR(
    ["/artists/leaderboard", league, limit],
    () => apiService.getArtistLeaderboard(league, limit),
    {
      refreshInterval: 30000, // Refresh every 30 seconds during live show
    }
  );

  return {
    artists: data || [],
    isLoading: !error && !data,
    isError: error,
    refresh: mutate,
  };
}

export function useArtistProfile(artistId: string) {
  const { data, error } = useSWR(artistId ? `/artists/${artistId}` : null, () =>
    apiService.getArtistProfile(artistId)
  );

  return {
    artist: data,
    isLoading: !error && !data,
    isError: error,
  };
}
