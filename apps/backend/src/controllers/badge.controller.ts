// apps/backend/src/controllers/badge.controller.ts

import { Request, Response } from 'express';
import { BadgeService } from '../services/badge.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const badgeService = new BadgeService();

export const badgeController = {
  /**
   * GET /api/badges
   * Get all available badges
   */
  async getAll(req: Request, res: Response) {
    try {
      const badges = await badgeService.getAllBadges();

      res.json({
        success: true,
        data: badges,
      });
    } catch (error: any) {
      logger.error('Error fetching badges', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch badges',
      });
    }
  },

  /**
   * GET /api/badges/my-badges
   * Get user's earned badges
   */
  async getMyBadges(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const badges = await badgeService.getUserBadges(req.user.id);

      res.json({
        success: true,
        data: badges,
      });
    } catch (error: any) {
      logger.error('Error fetching user badges', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch badges',
      });
    }
  },

  /**
   * POST /api/badges/check
   * Check and award eligible badges
   */
  async checkBadges(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      await badgeService.checkAndAwardBadges(req.user.id);

      res.json({
        success: true,
        message: 'Badges checked successfully',
      });
    } catch (error: any) {
      logger.error('Error checking badges', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to check badges',
      });
    }
  },
};
