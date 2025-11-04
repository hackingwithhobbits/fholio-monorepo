import type { Request, Response } from 'express';

import { walletService } from '@/services/wallet.service';
import type { ApiResponse } from '@/types';
import { asyncHandler } from '@/utils/asyncHandler';

export class WalletController {
  /**
   * GET /api/v1/wallet
   * Get wallet balance and stats
   */
  getWallet = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;

    const wallet = await walletService.getWallet(userId);

    const response: ApiResponse = {
      success: true,
      data: wallet,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/wallet/payouts
   * Get payout history
   */
  getPayoutHistory = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

    const payouts = await walletService.getPayoutHistory(userId, limit);

    const response: ApiResponse = {
      success: true,
      data: payouts,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/wallet/transactions
   * Get transaction history
   */
  getTransactions = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;

    const transactions = await walletService.getTransactionHistory(userId, limit);

    const response: ApiResponse = {
      success: true,
      data: transactions,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/wallet/referrals
   * Get referral stats
   */
  getReferrals = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;

    const referrals = await walletService.getReferralStats(userId);

    const response: ApiResponse = {
      success: true,
      data: referrals,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });
}

export const walletController = new WalletController();
