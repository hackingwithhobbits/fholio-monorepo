// apps/frontend/src/hooks/useArtists.ts
import useSWR from "swr";

import { artistService } from "@/lib/api/services/artist.service";
import { GetArtistsParams } from "@/lib/api/types";
import { trackService } from "@/lib/api/services";

export function useArtists(params?: GetArtistsParams) {
  const key = params ? ["artists", JSON.stringify(params)] : "artists";

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    artistService.getArtists(params),
  );

  return {
    artists: data?.data || [],
    pagination: data?.meta,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

export function useArtist(id?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ["artist", id] : null,
    () => artistService.getArtistById(id!),
  );

  return {
    artist: data?.data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

export function useTrendingArtists(limit = 10) {
  const { data, error, isLoading } = useSWR(
    ["artists", "trending", limit],
    () => artistService.getTrending(limit),
  );

  return {
    artists: data?.data || [],
    isLoading,
    isError: !!error,
    error,
  };
}

export function useArtistLeaderboard(
  league?: "Major" | "Minor",
  limit: number = 50,
) {
  const { data, error, mutate } = useSWR(
    ["/artists/leaderboard", league, limit],
    () => artistService.getLeaderboard(league, limit.toString()),
    {
      refreshInterval: 30000,
    },
  );

  return {
    artists: data || [],
    isLoading: !error && !data,
    error,
    refresh: mutate,
  };
}

export function useArtistProfile(artistId: string) {
  const { data, error } = useSWR(artistId ? `/artists/${artistId}` : null, () =>
    artistService.getArtistProfile(artistId),
  );

  return {
    artist: data,
    isLoading: !error && !data,
    error,
  };
}

export function useCurrentPool() {
  const { data, error, mutate } = useSWR(
    "/artists/pool/current",
    artistService.getCurrentPool,
    {
      refreshInterval: 60000,
    },
  );

  return {
    pool: data || [],
    isLoading: !error && !data,
    error,
    refresh: mutate,
  };
}
export function useArtistSubmissions(artistId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    artistId ? "/tracks/my-submissions" : null,
    () => trackService.getMySubmissions(),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    },
  );

  return {
    submissions: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useArtistStats(artistId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    artistId ? "/tracks/my-stats" : null,
    () => trackService.getMyStats(),
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
    },
  );

  return {
    stats: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useArtistTracks(artistId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    artistId ? "/tracks/my-tracks" : null,
    () => trackService.getMyTracks(),
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    },
  );

  return {
    tracks: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
}
