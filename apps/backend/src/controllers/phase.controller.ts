// apps/backend/src/controllers/phase.controller.ts

import { Request, Response } from 'express';
import { PhaseService } from '../services/phase.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { logger } from '../utils/logger';

const phaseService = new PhaseService();

export const phaseController = {
  /**
   * GET /api/phase/current
   * Get current phase for active week
   */
  async getCurrentPhase(req: Request, res: Response) {
    try {
      const phase = await phaseService.getCurrentPhase();

      res.json({
        success: true,
        data: phase,
      });
    } catch (error: any) {
      logger.error('Get current phase error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to get current phase',
      });
    }
  },

  /**
   * POST /api/phase/lock-lineups
   * Manually lock lineups (Admin only)
   */
  async lockLineups(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { week_id } = req.body;

      if (!week_id) {
        return res.status(400).json({
          success: false,
          message: 'week_id is required',
        });
      }

      const result = await phaseService.lockLineups(week_id);

      logger.info('Lineups locked manually', { weekId: week_id, adminId: req.user.id });

      res.json({
        success: true,
        data: result,
        message: 'Lineups locked successfully',
      });
    } catch (error: any) {
      logger.error('Lock lineups error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to lock lineups',
      });
    }
  },

  /**
   * POST /api/phase/calculate-top50
   * Manually calculate Top 50 (Admin only)
   */
  async calculateTop50(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { week_id } = req.body;

      if (!week_id) {
        return res.status(400).json({
          success: false,
          message: 'week_id is required',
        });
      }

      const result = await phaseService.calculateTop50(week_id);

      logger.info('Top 50 calculated manually', { weekId: week_id, adminId: req.user.id });

      res.json({
        success: true,
        data: result,
        message: 'Top 50 calculated successfully',
      });
    } catch (error: any) {
      logger.error('Calculate Top 50 error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to calculate Top 50',
      });
    }
  },

  /**
   * POST /api/phase/finalize-scores
   * Manually finalize scores (Admin only)
   */
  async finalizeScores(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { week_id } = req.body;

      if (!week_id) {
        return res.status(400).json({
          success: false,
          message: 'week_id is required',
        });
      }

      const result = await phaseService.finalizeScores(week_id);

      logger.info('Scores finalized manually', { weekId: week_id, adminId: req.user.id });

      res.json({
        success: true,
        data: result,
        message: 'Scores finalized successfully',
      });
    } catch (error: any) {
      logger.error('Finalize scores error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to finalize scores',
      });
    }
  },

  /**
   * POST /api/phase/distribute-prizes
   * Manually distribute prizes (Admin only)
   */
  async distributePrizes(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { week_id } = req.body;

      if (!week_id) {
        return res.status(400).json({
          success: false,
          message: 'week_id is required',
        });
      }

      const result = await phaseService.distributePrizes(week_id);

      logger.info('Prizes distributed manually', { weekId: week_id, adminId: req.user.id });

      res.json({
        success: true,
        data: result,
        message: 'Prizes distributed successfully',
      });
    } catch (error: any) {
      logger.error('Distribute prizes error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to distribute prizes',
      });
    }
  },

  /**
   * POST /api/phase/run-transitions
   * Manually run phase transitions (Admin only)
   */
  async runPhaseTransitions(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const result = await phaseService.runPhaseTransitions();

      logger.info('Phase transitions run manually', { adminId: req.user.id });

      res.json({
        success: true,
        data: result,
        message: 'Phase transitions completed',
      });
    } catch (error: any) {
      logger.error('Run phase transitions error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to run phase transitions',
      });
    }
  },

  /**
   * POST /api/phase/publish-pool
   * Manually publish weekly pool (Admin only)
   */
  async publishWeeklyPool(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { week_id } = req.body;

      if (!week_id) {
        return res.status(400).json({
          success: false,
          message: 'week_id is required',
        });
      }

      const result = await phaseService.publishWeeklyPool(week_id);

      logger.info('Weekly pool published manually', { weekId: week_id, adminId: req.user.id });

      res.json({
        success: true,
        data: result,
        message: 'Weekly pool published successfully',
      });
    } catch (error: any) {
      logger.error('Publish pool error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to publish weekly pool',
      });
    }
  },
};
