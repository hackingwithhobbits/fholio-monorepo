// apps/backend/src/controllers/subscription.controller.ts

import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscription.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const subscriptionService = new SubscriptionService();

export const subscriptionController = {
  /**
   * GET /api/subscription
   * Get current user's subscription details
   */
  async getCurrent(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const subscription = await subscriptionService.getUserSubscription(req.user.id);

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: 'No subscription found',
        });
      }

      res.json({
        success: true,
        data: subscription,
      });
    } catch (error: any) {
      logger.error('Error fetching subscription', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch subscription',
      });
    }
  },

  /**
   * POST /api/subscription/upgrade
   * Upgrade subscription tier
   */
  async upgrade(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { tier } = req.body;

      if (!tier || !['Standard', 'Premium'].includes(tier)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid tier. Must be Standard or Premium',
        });
      }

      const updatedSubscription = await subscriptionService.upgradeTier(
        req.user.id,
        tier as 'Standard' | 'Premium'
      );

      logger.info('Subscription upgraded', {
        userId: req.user.id,
        newTier: tier,
      });

      res.json({
        success: true,
        data: updatedSubscription,
        message: `Successfully upgraded to ${tier}`,
      });
    } catch (error: any) {
      logger.error('Error upgrading subscription', {
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
   * POST /api/subscription/cancel
   * Cancel subscription
   */
  async cancel(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      await subscriptionService.cancelSubscription(req.user.id);

      logger.info('Subscription cancelled', { userId: req.user.id });

      res.json({
        success: true,
        message: 'Subscription cancelled successfully',
      });
    } catch (error: any) {
      logger.error('Error cancelling subscription', {
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
   * GET /api/subscription/tiers
   * Get available subscription tiers and pricing
   */
  async getTiers(req: Request, res: Response) {
    try {
      const tiers = await subscriptionService.getAvailableTiers();

      res.json({
        success: true,
        data: tiers,
      });
    } catch (error: any) {
      logger.error('Error fetching subscription tiers', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch tiers',
      });
    }
  },
};
