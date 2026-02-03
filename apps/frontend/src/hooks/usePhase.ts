// apps/frontend/src/hooks/usePhase.ts

import useSWR from "swr";
import { phaseService } from "@/lib/api/services";
import { toast } from "sonner";
import { useState } from "react";

export function useCurrentPhase() {
  const { data, error, isLoading, mutate } = useSWR(
    "/phase/current",
    () => phaseService.getCurrentPhase(),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    },
  );

  return {
    phase: data?.phase,
    week: data?.week,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function usePhaseActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const lockLineups = async (weekId: string) => {
    setIsProcessing(true);
    try {
      await phaseService.lockLineups(weekId);
      toast.success("Lineups locked successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to lock lineups");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTop50 = async (weekId: string) => {
    setIsProcessing(true);
    try {
      await phaseService.calculateTop50(weekId);
      toast.success("Top 50 calculated successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to calculate Top 50");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const finalizeScores = async (weekId: string) => {
    setIsProcessing(true);
    try {
      await phaseService.finalizeScores(weekId);
      toast.success("Scores finalized successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to finalize scores");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const distributePrizes = async (weekId: string) => {
    setIsProcessing(true);
    try {
      await phaseService.distributePrizes(weekId);
      toast.success("Prizes distributed successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to distribute prizes");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const runPhaseTransitions = async () => {
    setIsProcessing(true);
    try {
      await phaseService.runPhaseTransitions();
      toast.success("Phase transitions completed");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to run phase transitions");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const publishWeeklyPool = async (weekId: string) => {
    setIsProcessing(true);
    try {
      await phaseService.publishWeeklyPool(weekId);
      toast.success("Weekly pool published successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to publish pool");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    lockLineups,
    calculateTop50,
    finalizeScores,
    distributePrizes,
    runPhaseTransitions,
    publishWeeklyPool,
    isProcessing,
  };
}
