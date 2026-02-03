// apps/backend/src/controllers/streak.controller.ts

import { Request, Response } from 'express';
import { StreakService } from '../services/streak.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const streakService = new StreakService();

export const streakController = {
  /**
   * GET /api/streaks/my-streak
   * Get user's current streak
   */
  async getMyStreak(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const streak = await streakService.getUserStreak(req.user.id);

      res.json({
        success: true,
        data: streak || { current_count: 0, is_active: false },
      });
    } catch (error: any) {
      logger.error('Error fetching streak', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch streak',
      });
    }
  },

  /**
   * GET /api/streaks/stats
   * Get user's streak statistics
   */
  async getStats(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const stats = await streakService.getStreakStats(req.user.id);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      logger.error('Error fetching streak stats', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch streak stats',
      });
    }
  },

  /**
   * GET /api/streaks/leaderboard
   * Get streak leaderboard
   */
  async getLeaderboard(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const leaderboard = await streakService.getStreakLeaderboard(limit);

      res.json({
        success: true,
        data: leaderboard,
      });
    } catch (error: any) {
      logger.error('Error fetching streak leaderboard', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch streak leaderboard',
      });
    }
  },
};
