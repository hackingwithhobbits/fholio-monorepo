// apps/frontend/src/hooks/useLineup.ts

import useSWR from "swr";
import { useState } from "react";
import { apiService } from "../services/api.service";
import { useCurrentWeek } from "./useWeek";

export function useMyLineup() {
  const { week } = useCurrentWeek();
  const [isSaving, setIsSaving] = useState(false);

  const { data, error, mutate } = useSWR(
    week ? `/lineups/my-lineup?week_id=${week.id}` : null,
    () => apiService.getMyLineup(week?.id),
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );

  const saveLineup = async (artistIds: string[], captainId?: string) => {
    setIsSaving(true);
    try {
      const result = await apiService.saveLineup(artistIds, captainId);
      mutate(result); // Update cache
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const lockLineup = async (lineupId: string) => {
    try {
      await apiService.lockLineup(lineupId);
      mutate(); // Refresh data
    } catch (error) {
      throw error;
    }
  };

  return {
    lineup: data,
    isLoading: !error && !data,
    isError: error,
    isSaving,
    saveLineup,
    lockLineup,
    refresh: mutate,
  };
}
