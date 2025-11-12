// apps/backend/src/controllers/lineup.controller.ts

import { Request, Response } from 'express';
import { LineupService } from '../services/lineup.service';
import { WeekService } from '../services/week.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const lineupService = new LineupService();
const weekService = new WeekService();

export const lineupController = {
  /**
   * GET /api/lineups/my-lineup
   * Get user's lineup for current or specified week
   */
  async getMyLineup(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

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

      const lineup = await lineupService.getUserLineup(req.user.id, targetWeekId);

      if (!lineup) {
        return res.json({
          success: true,
          data: null,
          message: 'No lineup found for this week',
        });
      }

      res.json({
        success: true,
        data: lineup,
      });
    } catch (error: any) {
      logger.error('Error fetching user lineup', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch lineup',
      });
    }
  },

  /**
   * POST /api/lineups
   * Create or update lineup for current week
   */
  async saveLineup(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { artist_ids, captain_id } = req.body;

      if (!artist_ids || !Array.isArray(artist_ids) || artist_ids.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'artist_ids array is required and must not be empty',
        });
      }

      const currentWeek = await weekService.getCurrentWeek();
      if (!currentWeek) {
        return res.status(404).json({
          success: false,
          message: 'No active week found',
        });
      }

      const lineup = await lineupService.saveLineup(
        req.user.id,
        currentWeek.id,
        artist_ids,
        captain_id
      );

      logger.info('Lineup saved', {
        userId: req.user.id,
        weekId: currentWeek.id,
        artistCount: artist_ids.length,
      });

      res.json({
        success: true,
        data: lineup,
        message: 'Lineup saved successfully',
      });
    } catch (error: any) {
      logger.error('Error saving lineup', {
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
   * PUT /api/lineups/:id/lock
   * Manually lock lineup before deadline
   */
  async lockLineup(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;

      // Verify lineup belongs to user
      const lineup = await lineupService.getLineupById(id);
      if (!lineup || lineup.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Lineup not found or unauthorized',
        });
      }

      if (lineup.is_locked) {
        return res.status(400).json({
          success: false,
          message: 'Lineup is already locked',
        });
      }

      await lineupService.lockLineup(id);

      logger.info('Lineup locked', { userId: req.user.id, lineupId: id });

      res.json({
        success: true,
        message: 'Lineup locked successfully',
      });
    } catch (error: any) {
      logger.error('Error locking lineup', {
        error: error.message,
        userId: req.user?.id,
        lineupId: req.params.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  /**
   * GET /api/lineups/:id/score
   * Get real-time score for a lineup
   */
  async getLineupScore(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;

      // Verify lineup belongs to user or is public
      const lineup = await lineupService.getLineupById(id);
      if (!lineup) {
        return res.status(404).json({
          success: false,
          message: 'Lineup not found',
        });
      }

      const score = await lineupService.calculateLineupScore(id);

      res.json({
        success: true,
        data: {
          lineup_id: id,
          total_score: score,
          is_locked: lineup.is_locked,
          rank: lineup.rank,
        },
      });
    } catch (error: any) {
      logger.error('Error calculating lineup score', {
        error: error.message,
        lineupId: req.params.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to calculate lineup score',
      });
    }
  },

  /**
   * DELETE /api/lineups/:id
   * Delete lineup (only before lock)
   */
  async deleteLineup(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;

      // Verify lineup belongs to user
      const lineup = await lineupService.getLineupById(id);
      if (!lineup || lineup.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Lineup not found or unauthorized',
        });
      }

      if (lineup.is_locked) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete locked lineup',
        });
      }

      await lineupService.deleteLineup(id);

      logger.info('Lineup deleted', { userId: req.user.id, lineupId: id });

      res.json({
        success: true,
        message: 'Lineup deleted successfully',
      });
    } catch (error: any) {
      logger.error('Error deleting lineup', {
        error: error.message,
        userId: req.user?.id,
        lineupId: req.params.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  /**
   * GET /api/lineups/history
   * Get user's past lineups
   */
  async getLineupHistory(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const limit = parseInt(req.query.limit as string) || 10;

      const history = await lineupService.getUserLineupHistory(req.user.id, limit);

      res.json({
        success: true,
        data: history,
        meta: {
          count: history.length,
        },
      });
    } catch (error: any) {
      logger.error('Error fetching lineup history', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch lineup history',
      });
    }
  },
};
