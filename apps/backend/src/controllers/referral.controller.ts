// apps/backend/src/controllers/referral.controller.ts

import { Request, Response } from 'express';
import { ReferralService } from '../services/referral.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const referralService = new ReferralService();

export const referralController = {
  /**
   * GET /api/referrals/my-code
   * Get user's referral code
   */
  async getMyCode(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const code = await referralService.generateReferralCode(req.user.id);

      res.json({
        success: true,
        data: { referralCode: code },
      });
    } catch (error: any) {
      logger.error('Error generating referral code', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to generate referral code',
      });
    }
  },

  /**
   * GET /api/referrals/stats
   * Get user's referral statistics
   */
  async getStats(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const stats = await referralService.getReferralStats(req.user.id);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      logger.error('Error fetching referral stats', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch referral stats',
      });
    }
  },

  /**
   * POST /api/referrals/apply
   * Apply referral code (during signup)
   */
  async applyCode(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { referral_code } = req.body;

      if (!referral_code) {
        return res.status(400).json({
          success: false,
          message: 'Referral code is required',
        });
      }

      const referral = await referralService.applyReferralCode(req.user.id, referral_code);

      logger.info('Referral code applied', {
        userId: req.user.id,
        referralCode: referral_code,
      });

      res.json({
        success: true,
        data: referral,
        message: 'Referral code applied successfully',
      });
    } catch (error: any) {
      logger.error('Error applying referral code', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  /**
   * GET /api/referrals/leaderboard
   * Get referral leaderboard
   */
  async getLeaderboard(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const leaderboard = await referralService.getReferralLeaderboard(limit);

      res.json({
        success: true,
        data: leaderboard,
      });
    } catch (error: any) {
      logger.error('Error fetching referral leaderboard', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch referral leaderboard',
      });
    }
  },
};
