// apps/frontend/src/hooks/useWeek.ts
import useSWR from "swr";
import { WeekService } from "@/lib/api/services";
import { useMemo } from "react";

export function useCurrentWeek() {
  const {
    data: week,
    error,
    mutate,
  } = useSWR("/week/current", WeekService.getCurrentWeek, {
    refreshInterval: 60000,
  });

  const phase = useMemo(() => {
    if (!week) return null;

    const now = new Date();
    const votingOpen = new Date(week.voting_open_at);
    const votingClose = new Date(week.voting_close_at);
    const picksOpen = new Date(week.picks_open_at);
    const picksLock = new Date(week.picks_lock_at);
    const showTime = new Date(week.show_at);

    if (now >= votingOpen && now <= votingClose) return "voting";
    if (now > votingClose && now < picksOpen) return "calculating";
    if (now >= picksOpen && now < picksLock) return "picks_open";
    if (now >= picksLock && now < showTime) return "locked";
    if (now >= showTime) return "live_show";

    return "pending";
  }, [week]);

  const timeRemaining = useMemo(() => {
    if (!week || !phase) return null;

    const now = new Date();
    let targetTime: Date;

    switch (phase) {
      case "voting":
        targetTime = new Date(week.voting_close_at);
        break;
      case "picks_open":
        targetTime = new Date(week.picks_lock_at);
        break;
      case "locked":
        targetTime = new Date(week.show_at);
        break;
      default:
        return null;
    }

    const diff = targetTime.getTime() - now.getTime();
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      total: diff,
      days,
      hours,
      minutes,
      seconds,
      formatted: `${days}d ${hours}h ${minutes}m`,
    };
  }, [week, phase]);

  return {
    week,
    phase,
    timeRemaining,
    isLoading: !error && !week,
    error,
    refresh: mutate,
  };
}
