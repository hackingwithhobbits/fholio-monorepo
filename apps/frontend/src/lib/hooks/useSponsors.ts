import useSWR from "swr";
import { sponsorService } from "../api/services";

export function useSponsors() {
  const { data, error, isLoading, mutate } = useSWR("sponsors", () =>
    sponsorService.getSponsors()
  );

  return {
    sponsors: data?.data || [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

export function useActiveChallenges() {
  const { data, error, isLoading } = useSWR("challenges-active", () =>
    sponsorService.getActiveChallenges()
  );

  return {
    challenges: data?.data || [],
    isLoading,
    isError: !!error,
    error,
  };
}

export function useSponsor(id?: string) {
  const { data, error, isLoading } = useSWR(id ? ["sponsor", id] : null, () =>
    sponsorService.getSponsorById(id!)
  );

  return {
    sponsor: data?.data,
    isLoading,
    isError: !!error,
    error,
  };
}
