// apps/backend/src/controllers/leaderboard.controller.ts

import { Request, Response } from 'express';
import { LeaderboardService } from '../services/leaderboard.service';
import { WeekService } from '../services/week.service';
import { logger } from '../utils/logger';

const leaderboardService = new LeaderboardService();
const weekService = new WeekService();

export const leaderboardController = {
  /**
   * GET /api/fans/leaderboard
   * Get fan leaderboard for current week
   */
  async getTopFans(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const weekId = req.query.week_id as string;

      let targetWeekId = weekId;
      if (!weekId) {
        const currentWeek = await weekService.getCurrentWeek();
        if (!currentWeek) {
          return res.status(404).json({
            success: false,
            message: 'No active week found',
          });
        }
        targetWeekId = currentWeek.id;
      }

      const topFans = await leaderboardService.getTopFans(targetWeekId, limit);

      res.json({
        success: true,
        data: topFans,
        meta: {
          count: topFans.length,
          weekId: targetWeekId,
        },
      });
    } catch (error: any) {
      logger.error('Error fetching top fans', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch top fans',
      });
    }
  },

  /**
   * GET /api/leaderboard/live
   * Get real-time combined leaderboard (artists + fans)
   */
  async getLiveLeaderboard(req: Request, res: Response) {
    try {
      const currentWeek = await weekService.getCurrentWeek();
      if (!currentWeek) {
        return res.status(404).json({
          success: false,
          message: 'No active week found',
        });
      }

      const topArtists = await leaderboardService.getTopArtists(currentWeek.id, 10);
      const topFans = await leaderboardService.getTopFans(currentWeek.id, 10);

      res.json({
        success: true,
        data: {
          artists: topArtists,
          fans: topFans,
          weekId: currentWeek.id,
        },
      });
    } catch (error: any) {
      logger.error('Error fetching live leaderboard', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch leaderboard',
      });
    }
  },

  /**
   * GET /api/leaderboard/global
   * Get all-time global leaderboard
   */
  async getGlobalLeaderboard(req: Request, res: Response) {
    try {
      const type = (req.query.type as 'fans' | 'artists') || 'fans';
      const limit = parseInt(req.query.limit as string) || 100;

      const leaderboard = await leaderboardService.getGlobalLeaderboard(type, limit);

      res.json({
        success: true,
        data: leaderboard,
        meta: {
          type,
          count: leaderboard.length,
        },
      });
    } catch (error: any) {
      logger.error('Error fetching global leaderboard', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch global leaderboard',
      });
    }
  },
};
