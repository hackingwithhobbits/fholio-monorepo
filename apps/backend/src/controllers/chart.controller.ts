import type { Request, Response } from 'express';

import { chartService } from '@/services/chart.service';
import type { ApiResponse } from '@/types';
import { asyncHandler } from '@/utils/asyncHandler';

export class ChartController {
  /**
   * GET /api/v1/charts/top100
   * Get Top 100 artists
   */
  getTop100 = asyncHandler(async (req: Request, res: Response) => {
    const week = req.query.week as string | undefined;
    const artists = await chartService.getTop100(week);

    const response: ApiResponse = {
      success: true,
      data: artists,
      meta: {
        timestamp: new Date().toISOString(),
        total: artists.length,
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/charts/leaderboard
   * Get fan leaderboard
   */
  getLeaderboard = asyncHandler(async (req: Request, res: Response) => {
    const week = req.query.week as string;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    if (!week) {
      const response: ApiResponse = {
        success: false,
        error: {
          message: 'Week parameter is required',
          code: 'MISSING_PARAMETER',
        },
      };
      return res.status(400).json(response);
    }

    const leaderboard = await chartService.getLeaderboard(week, limit);

    const response: ApiResponse = {
      success: true,
      data: leaderboard,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/charts/leaderboard/global
   * Get global leaderboard
   */
  getGlobalLeaderboard = asyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const leaderboard = await chartService.getGlobalLeaderboard(limit);

    const response: ApiResponse = {
      success: true,
      data: leaderboard,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/charts/winners/last-week
   * Get last week's winners
   */
  getLastWeekWinners = asyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const winners = await chartService.getLastWeekWinners(limit);

    const response: ApiResponse = {
      success: true,
      data: winners,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/charts/stats
   * Get social stats
   */
  getSocialStats = asyncHandler(async (req: Request, res: Response) => {
    const stats = await chartService.getSocialStats();

    const response: ApiResponse = {
      success: true,
      data: stats,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });
}

export const chartController = new ChartController();
