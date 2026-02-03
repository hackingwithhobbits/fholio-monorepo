// apps/frontend/src/hooks/useArtist.ts

import useSWR from "swr";
import { artistService } from "@/lib/api/services";

export function useArtistProfile(artistId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    artistId ? `/artists/${artistId}/profile` : null,
    () => artistService.getArtistProfile(artistId!),
    {
      revalidateOnFocus: true,
    },
  );

  return {
    profile: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useArtistById(artistId?: string) {
  const { data, error, isLoading } = useSWR(
    artistId ? `/artists/${artistId}` : null,
    () => artistService.getArtistById(artistId!),
    {
      revalidateOnFocus: true,
    },
  );

  return {
    artist: data,
    isLoading,
    error,
  };
}

export function useArtistHistory(artistId?: string, limit: number = 12) {
  const { data, error, isLoading } = useSWR(
    artistId ? [`/artists/${artistId}/history`, limit] : null,
    () => artistService.getArtistHistory(artistId!, limit),
    {
      revalidateOnFocus: true,
    },
  );

  return {
    history: data || [],
    isLoading,
    error,
  };
}
