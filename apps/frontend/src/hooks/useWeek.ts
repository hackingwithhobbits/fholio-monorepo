// apps/frontend/src/hooks/useWeek.ts

import useSWR from "swr";
import { apiService } from "../services/api.service";

export function useCurrentWeek() {
  const { data, error, mutate } = useSWR(
    "/week/current",
    () => apiService.getCurrentWeek(),
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
    }
  );

  return {
    week: data,
    isLoading: !error && !data,
    isError: error,
    refresh: mutate,
  };
}

export function useWeekPhase() {
  const { week } = useCurrentWeek();

  if (!week) return null;

  const now = new Date();
  const votingOpen = new Date(week.voting_open_at);
  const votingClose = new Date(week.voting_close_at);
  const picksOpen = new Date(week.picks_open_at);
  const picksLock = new Date(week.picks_lock_at);
  const show = new Date(week.show_at);

  if (now < votingOpen) return "pre_voting";
  if (now >= votingOpen && now <= votingClose) return "voting";
  if (now > votingClose && now < picksOpen) return "calculating_top50";
  if (now >= picksOpen && now < picksLock) return "picks_open";
  if (now >= picksLock && now < show) return "locked";
  if (now >= show) return "live_show";

  return "unknown";
}
