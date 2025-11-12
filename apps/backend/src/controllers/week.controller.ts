// apps/backend/src/controllers/week.controller.ts

import { Request, Response } from 'express';
import { WeekService } from '../services/week.service';
import { logger } from '../utils/logger';

const weekService = new WeekService();

export const weekController = {
  /**
   * GET /api/week/current
   * Get current active week with phase information
   */
  async getCurrentWeek(req: Request, res: Response) {
    try {
      const week = await weekService.getCurrentWeek();

      if (!week) {
        return res.status(404).json({
          success: false,
          message: 'No active week found',
        });
      }

      const phase = weekService.getCurrentPhase(week);
      const isVotingOpen = weekService.isVotingOpen(week);
      const isPicksOpen = weekService.isPicksOpen(week);
      const areLineupsLocked = weekService.areLineupsLocked(week);

      res.json({
        success: true,
        data: {
          ...week,
          phase,
          isVotingOpen,
          isPicksOpen,
          areLineupsLocked,
          timeRemaining: weekService.getTimeRemaining(week),
        },
      });
    } catch (error: any) {
      logger.error('Error fetching current week', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch current week',
      });
    }
  },

  /**
   * GET /api/week/:id
   * Get specific week by ID
   */
  async getWeekById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const week = await weekService.getWeekById(id);

      if (!week) {
        return res.status(404).json({
          success: false,
          message: 'Week not found',
        });
      }

      res.json({
        success: true,
        data: week,
      });
    } catch (error: any) {
      logger.error('Error fetching week', { error: error.message, weekId: req.params.id });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch week',
      });
    }
  },

  /**
   * GET /api/week/history
   * Get past weeks
   */
  async getWeekHistory(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const weeks = await weekService.getWeekHistory(limit);

      res.json({
        success: true,
        data: weeks,
      });
    } catch (error: any) {
      logger.error('Error fetching week history', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch week history',
      });
    }
  },

  /**
   * POST /api/week/create (Admin only)
   * Manually create a new week
   */
  async createWeek(req: Request, res: Response) {
    try {
      const week = await weekService.createNewWeek();

      logger.info('Week created', { weekId: week.id, weekNumber: week.week_number });

      res.json({
        success: true,
        data: week,
        message: 'Week created successfully',
      });
    } catch (error: any) {
      logger.error('Error creating week', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to create week',
      });
    }
  },
};
