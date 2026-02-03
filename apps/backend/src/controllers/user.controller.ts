// apps/backend/src/controllers/user.controller.ts

import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { WalletService } from '../services/wallet.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const userService = new UserService();
const walletService = new WalletService();

export const userController = {
  /**
   * GET /api/users/me
   * Get current user profile
   */
  async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const profile = await userService.getUserProfile(req.user.id);

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'User profile not found'
        });
      }

      res.json({
        success: true,
        data: profile
      });
    } catch (error: any) {
      logger.error('Error fetching user profile', {
        error: error.message,
        userId: req.user?.id
      });
      
      res.status(500).json({
        success: false,
        message: 'Failed to fetch profile'
      });
    }
  },

  /**
   * PATCH /api/users/me
   * Update user profile
   */
  async updateProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const { display_name, avatar_url, bio } = req.body;

      const updatedProfile = await userService.updateUserProfile(req.user.id, {
        display_name,
        avatar_url,
        bio
      });

      logger.info('Profile updated', { userId: req.user.id });

      res.json({
        success: true,
        data: updatedProfile,
        message: 'Profile updated successfully'
      });
    } catch (error: any) {
      logger.error('Error updating profile', {
        error: error.message,
        userId: req.user?.id
      });
      
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  /**
   * GET /api/users/me/stats
   * Get user's lifetime stats, tier, rank
   */
  async getStats(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const stats = await userService.getUserStats(req.user.id);

      res.json({
        success: true,
        data: stats
      });
    } catch (error: any) {
      logger.error('Error fetching user stats', {
        error: error.message,
        userId: req.user?.id
      });
      
      res.status(500).json({
        success: false,
        message: 'Failed to fetch stats'
      });
    }
  },

  /**
   * GET /api/users/me/wallet
   * Get user's wallet balance and recent transactions
   */
  async getWallet(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const wallet = await walletService.getUserWallet(req.user.id);
      const transactions = await walletService.getRecentTransactions(req.user.id, 20);

      res.json({
        success: true,
        data: {
          balance: wallet?.balance || 0,
          transactions
        }
      });
    } catch (error: any) {
      logger.error('Error fetching wallet', {
        error: error.message,
        userId: req.user?.id
      });
      
      res.status(500).json({
        success: false,
        message: 'Failed to fetch wallet'
      });
    }
  },

  /**
   * POST /api/users/me/withdraw
   * Request withdrawal from wallet
   */
  async requestWithdrawal(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const { amount, method } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid withdrawal amount'
        });
      }

      const withdrawal = await walletService.requestWithdrawal(
        req.user.id,
        amount,
        method
      );

      logger.info('Withdrawal requested', {
        userId: req.user.id,
        amount,
        method
      });

      res.json({
        success: true,
        data: withdrawal,
        message: 'Withdrawal request submitted'
      });
    } catch (error: any) {
      logger.error('Error requesting withdrawal', {
        error: error.message,
        userId: req.user?.id
      });
      
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  /**
   * GET /api/users/:id/public
   * Get public user profile (for viewing other users)
   */
  async getPublicProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const profile = await userService.getPublicProfile(id);

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: profile
      });
    } catch (error: any) {
      logger.error('Error fetching public profile', {
        error: error.message,
        userId: req.params.id
      });
      
      res.status(500).json({
        success: false,
        message: 'Failed to fetch profile'
      });
    }
  }
};