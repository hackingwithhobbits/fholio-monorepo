// apps/frontend/src/hooks/useAdmin.ts

import useSWR from "swr";
import { adminService } from "@/lib/api/services";
import { toast } from "sonner";
import { useState } from "react";

export function useAdminStats() {
  const { data, error, isLoading, mutate } = useSWR(
    "/admin/stats",
    () => adminService.getPlatformStats(),
    {
      refreshInterval: 30000,
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

export function usePendingTracks(limit: number = 50) {
  const { data, error, isLoading, mutate } = useSWR(
    ["/admin/tracks/pending", limit],
    () => adminService.getPendingTracks(limit),
    {
      refreshInterval: 15000,
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

export function useAdminWeeks() {
  const { data, error, isLoading, mutate } = useSWR(
    "/admin/weeks",
    () => adminService.getAllWeeks(),
    {
      revalidateOnFocus: true,
    },
  );

  return {
    weeks: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useAdminUsers(limit: number = 100, offset: number = 0) {
  const { data, error, isLoading, mutate } = useSWR(
    ["/admin/users", limit, offset],
    () => adminService.getAllUsers(limit, offset),
    {
      revalidateOnFocus: true,
    },
  );

  return {
    users: data?.users || [],
    total: data?.total || 0,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function usePrizePoolConfig() {
  const { data, error, isLoading, mutate } = useSWR(
    "/admin/prize-pool",
    () => adminService.getPrizePoolConfig(),
    {
      revalidateOnFocus: true,
    },
  );

  return {
    config: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useActivityLogs(limit: number = 50) {
  const { data, error, isLoading } = useSWR(
    ["/admin/activity", limit],
    () => adminService.getActivityLogs(limit),
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    },
  );

  return {
    logs: data || [],
    isLoading,
    error,
  };
}

export function useAdminActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const approveTrack = async (trackId: string) => {
    setIsProcessing(true);
    try {
      await adminService.approveTrack(trackId);
      toast.success("Track approved successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to approve track");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const rejectTrack = async (trackId: string, reason?: string) => {
    setIsProcessing(true);
    try {
      await adminService.rejectTrack(trackId, reason);
      toast.success("Track rejected");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to reject track");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const createWeek = async (weekData: any) => {
    setIsProcessing(true);
    try {
      await adminService.createWeek(weekData);
      toast.success("Week created successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to create week");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const updateWeek = async (weekId: string, weekData: any) => {
    setIsProcessing(true);
    try {
      await adminService.updateWeek(weekId, weekData);
      toast.success("Week updated successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to update week");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteWeek = async (weekId: string) => {
    setIsProcessing(true);
    try {
      await adminService.deleteWeek(weekId);
      toast.success("Week deleted successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to delete week");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const suspendUser = async (userId: string, reason?: string) => {
    setIsProcessing(true);
    try {
      await adminService.suspendUser(userId, reason);
      toast.success("User suspended");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to suspend user");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const unsuspendUser = async (userId: string) => {
    setIsProcessing(true);
    try {
      await adminService.unsuspendUser(userId);
      toast.success("User unsuspended");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to unsuspend user");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const updatePrizePool = async (config: any) => {
    setIsProcessing(true);
    try {
      await adminService.updatePrizePoolConfig(config);
      toast.success("Prize pool configuration updated");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to update prize pool");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    approveTrack,
    rejectTrack,
    createWeek,
    updateWeek,
    deleteWeek,
    suspendUser,
    unsuspendUser,
    updatePrizePool,
    isProcessing,
  };
}
