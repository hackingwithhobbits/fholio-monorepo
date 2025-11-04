import useSWR from "swr";
import { artistService } from "../api/services";
import type { Artist, GetArtistsParams } from "../api/types";

export function useArtists(params?: GetArtistsParams) {
  const key = params ? ["artists", JSON.stringify(params)] : "artists";

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    artistService.getArtists(params)
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
    () => artistService.getArtistById(id!)
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
    () => artistService.getTrending(limit)
  );

  return {
    artists: data?.data || [],
    isLoading,
    isError: !!error,
    error,
  };
}
