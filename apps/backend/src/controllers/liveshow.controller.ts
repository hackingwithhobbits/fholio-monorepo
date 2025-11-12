// apps/backend/src/controllers/liveshow.controller.ts

import { Request, Response } from 'express';
import { LiveShowService } from '../services/liveshow.service';
import { logger } from '../utils/logger';

const liveShowService = new LiveShowService();

export const liveShowController = {
  /**
   * GET /api/live-show/current
   * Get current live show
   */
  async getCurrent(req: Request, res: Response) {
    try {
      const liveShow = await liveShowService.getCurrentLiveShow();

      if (!liveShow) {
        return res.status(404).json({
          success: false,
          message: 'No live show currently active',
        });
      }

      const highlights = await liveShowService.getLiveShowHighlights(liveShow.id);
      const stats = await liveShowService.getLiveShowStats(liveShow.id);

      res.json({
        success: true,
        data: {
          ...liveShow,
          highlights,
          stats,
        },
      });
    } catch (error: any) {
      logger.error('Error fetching current live show', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch live show',
      });
    }
  },

  /**
   * GET /api/live-show/:id
   * Get specific live show
   */
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { data: liveShow, error } = await supabase
        .from('live_shows')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !liveShow) {
        return res.status(404).json({
          success: false,
          message: 'Live show not found',
        });
      }

      const highlights = await liveShowService.getLiveShowHighlights(id);
      const stats = await liveShowService.getLiveShowStats(id);

      res.json({
        success: true,
        data: {
          ...liveShow,
          highlights,
          stats,
        },
      });
    } catch (error: any) {
      logger.error('Error fetching live show', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch live show',
      });
    }
  },

  /**
   * GET /api/live-show/past
   * Get past live shows
   */
  async getPast(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const shows = await liveShowService.getPastLiveShows(limit);

      res.json({
        success: true,
        data: shows,
      });
    } catch (error: any) {
      logger.error('Error fetching past live shows', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch past live shows',
      });
    }
  },
};
