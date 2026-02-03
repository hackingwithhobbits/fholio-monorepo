// apps/frontend/src/hooks/useWallet.ts

import useSWR from "swr";
import { walletService } from "@/lib/api/services";
import { toast } from "sonner";
import { useState } from "react";

export function useWallet() {
  const { data, error, isLoading, mutate } = useSWR(
    "/wallet",
    () => walletService.getWallet(),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    },
  );

  return {
    wallet: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useWalletSummary() {
  const { data, error, isLoading, mutate } = useSWR(
    "/wallet/summary",
    () => walletService.getWalletSummary(),
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    },
  );

  return {
    summary: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useTransactions(limit: number = 20) {
  const { data, error, isLoading } = useSWR(
    ["/wallet/transactions", limit],
    () => walletService.getTransactions(limit),
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
    },
  );

  return {
    transactions: data || [],
    isLoading,
    error,
  };
}

export function useWeeklyEarnings() {
  const { data, error, isLoading } = useSWR(
    "/wallet/weekly-earnings",
    () => walletService.getWeeklyEarnings(),
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
    },
  );

  return {
    weeklyEarnings: data || [],
    isLoading,
    error,
  };
}

export function useTopEarners(limit: number = 5) {
  const { data, error, isLoading } = useSWR(
    ["/wallet/top-earners", limit],
    () => walletService.getTopEarners(limit),
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    },
  );

  return {
    topEarners: data || [],
    isLoading,
    error,
  };
}

export function useWalletActions() {
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const withdraw = async (amount: number) => {
    setIsWithdrawing(true);
    try {
      await walletService.createWithdrawal(amount);
      toast.success("Withdrawal request submitted!", {
        description: `$${amount.toFixed(2)} will be processed within 3-5 business days`,
      });
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to create withdrawal");
      return false;
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    withdraw,
    isWithdrawing,
  };
}
