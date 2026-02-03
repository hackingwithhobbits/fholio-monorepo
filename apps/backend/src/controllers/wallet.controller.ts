// apps/backend/src/controllers/wallet.controller.ts

import { Request, Response } from 'express';
import { WalletService } from '../services/wallet.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { logger } from '../utils/logger';

const walletService = new WalletService();

export const walletController = {
  /**
   * GET /api/wallet
   * Get user's wallet
   */
  async getWallet(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const wallet = await walletService.getUserWallet(req.user.id);

      res.json({
        success: true,
        data: wallet,
      });
    } catch (error: any) {
      logger.error('Get wallet error', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch wallet',
      });
    }
  },

  /**
   * GET /api/wallet/summary
   * Get wallet summary with stats
   */
  async getWalletSummary(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const summary = await walletService.getWalletSummary(req.user.id);

      res.json({
        success: true,
        data: summary,
      });
    } catch (error: any) {
      logger.error('Get wallet summary error', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch wallet summary',
      });
    }
  },

  /**
   * GET /api/wallet/transactions
   * Get transaction history
   */
  async getTransactions(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const limit = parseInt(req.query.limit as string) || 20;
      const transactions = await walletService.getTransactions(req.user.id, limit);

      res.json({
        success: true,
        data: transactions,
      });
    } catch (error: any) {
      logger.error('Get transactions error', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch transactions',
      });
    }
  },

  /**
   * GET /api/wallet/weekly-earnings
   * Get weekly earnings breakdown
   */
  async getWeeklyEarnings(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const earnings = await walletService.getWeeklyEarnings(req.user.id);

      res.json({
        success: true,
        data: earnings,
      });
    } catch (error: any) {
      logger.error('Get weekly earnings error', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch weekly earnings',
      });
    }
  },

  /**
   * GET /api/wallet/top-earners
   * Get top earners
   */
  async getTopEarners(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const topEarners = await walletService.getTopEarners(limit);

      res.json({
        success: true,
        data: topEarners,
      });
    } catch (error: any) {
      logger.error('Get top earners error', { error: error.message });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch top earners',
      });
    }
  },

  /**
   * POST /api/wallet/withdraw
   * Create withdrawal request
   */
  async createWithdrawal(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid amount',
        });
      }

      const transaction = await walletService.createWithdrawal(req.user.id, amount);

      logger.info('Withdrawal requested', {
        userId: req.user.id,
        amount,
        transactionId: transaction.id,
      });

      res.json({
        success: true,
        data: transaction,
        message: 'Withdrawal request created',
      });
    } catch (error: any) {
      logger.error('Create withdrawal error', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
