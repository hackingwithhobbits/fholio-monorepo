// apps/backend/src/controllers/powerup.controller.ts

import { Request, Response } from 'express';
import { PowerupService } from '../services/powerup.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const powerupService = new PowerupService();

export const powerupController = {
  /**
   * GET /api/powerups
   * Get all available powerups
   */
  async getAvailable(req: Request, res: Response) {
    try {
      const powerups = await powerupService.getAvailablePowerups();

      res.json({
        success: true,
        data: powerups,
      });
    } catch (error: any) {
      logger.error('Error fetching powerups', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch powerups',
      });
    }
  },

  /**
   * GET /api/powerups/my-powerups
   * Get user's purchased powerups
   */
  async getMyPowerups(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const weekId = req.query.week_id as string;
      const powerups = await powerupService.getUserPowerups(req.user.id, weekId);

      res.json({
        success: true,
        data: powerups,
      });
    } catch (error: any) {
      logger.error('Error fetching user powerups', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch powerups',
      });
    }
  },

  /**
   * POST /api/powerups/:id/purchase
   * Purchase a powerup
   */
  async purchase(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      const powerup = await powerupService.purchasePowerup(req.user.id, id);

      logger.info('Powerup purchased', {
        userId: req.user.id,
        powerupId: id,
      });

      res.json({
        success: true,
        data: powerup,
        message: 'Powerup purchased successfully',
      });
    } catch (error: any) {
      logger.error('Error purchasing powerup', {
        error: error.message,
        userId: req.user?.id,
        powerupId: req.params.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  /**
   * POST /api/powerups/apply
   * Apply powerup to lineup
   */
  async apply(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { user_powerup_id, lineup_id } = req.body;

      if (!user_powerup_id || !lineup_id) {
        return res.status(400).json({
          success: false,
          message: 'user_powerup_id and lineup_id are required',
        });
      }

      await powerupService.applyPowerup(req.user.id, user_powerup_id, lineup_id);

      logger.info('Powerup applied', {
        userId: req.user.id,
        userPowerupId: user_powerup_id,
        lineupId: lineup_id,
      });

      res.json({
        success: true,
        message: 'Powerup applied successfully',
      });
    } catch (error: any) {
      logger.error('Error applying powerup', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
