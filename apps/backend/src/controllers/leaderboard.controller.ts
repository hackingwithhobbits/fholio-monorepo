// apps/backend/src/controllers/leaderboard.controller.ts

import { Request, Response } from 'express';
import { LeaderboardService } from '../services/leaderboard.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { logger } from '../utils/logger';

const leaderboardService = new LeaderboardService();

export const leaderboardController = {
  /**
   * GET /api/leaderboard/global
   * Get global leaderboard (all-time)
   */
  async getGlobal(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 50;

      const leaderboard = await leaderboardService.getGlobalLeaderboard(limit);

      res.json({
        success: true,
        data: leaderboard,
        meta: {
          count: leaderboard.length,
        },
      });
    } catch (error: any) {
      logger.error('Get global leaderboard error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch global leaderboard',
      });
    }
  },

  /**
   * GET /api/leaderboard/weekly
   * Get current week leaderboard
   */
  async getWeekly(req: Request, res: Response) {
    try {
      const weekId = req.query.week_id as string;
      const limit = parseInt(req.query.limit as string) || 50;

      let leaderboard;
      if (weekId) {
        leaderboard = await leaderboardService.getWeeklyLeaderboard(weekId, limit);
      } else {
        leaderboard = await leaderboardService.getCurrentWeekLeaderboard(limit);
      }

      res.json({
        success: true,
        data: leaderboard,
        meta: {
          count: leaderboard.length,
        },
      });
    } catch (error: any) {
      logger.error('Get weekly leaderboard error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch weekly leaderboard',
      });
    }
  },

  /**
   * GET /api/leaderboard/my-rank
   * Get current user's rank
   */
  async getMyRank(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const weekId = req.query.week_id as string;
      const rank = await leaderboardService.getUserRank(req.user.id, weekId);

      res.json({
        success: true,
        data: rank,
      });
    } catch (error: any) {
      logger.error('Get user rank error', {
        error: error.message,
        userId: req.user?.id,
      });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch rank',
      });
    }
  },

  /**
   * GET /api/leaderboard/my-stats
   * Get user's global stats
   */
  async getMyStats(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const stats = await leaderboardService.getUserGlobalStats(req.user.id);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      logger.error('Get user stats error', {
        error: error.message,
        userId: req.user?.id,
      });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch stats',
      });
    }
  },

  /**
   * GET /api/leaderboard/prizes
   * Get prize pool info
   */
  async getPrizes(req: Request, res: Response) {
    try {
      const weekId = req.query.week_id as string;

      if (!weekId) {
        return res.status(400).json({
          success: false,
          message: 'week_id is required',
        });
      }

      const prizes = await leaderboardService.getWeekPrizePool(weekId);

      res.json({
        success: true,
        data: prizes,
      });
    } catch (error: any) {
      logger.error('Get prizes error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch prizes',
      });
    }
  },
};
