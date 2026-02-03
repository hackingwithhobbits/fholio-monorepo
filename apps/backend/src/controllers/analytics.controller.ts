// apps/backend/src/controllers/analytics.controller.ts

import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const analyticsService = new AnalyticsService();

export const analyticsController = {
  /**
   * GET /api/analytics/platform
   * Get platform-wide statistics (Admin)
   */
  async getPlatformStats(req: Request, res: Response) {
    try {
      const stats = await analyticsService.getPlatformStats();

      res.json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      logger.error('Error fetching platform stats', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch platform stats',
      });
    }
  },

  /**
   * GET /api/analytics/weekly/:weekId
   * Get weekly analytics
   */
  async getWeeklyAnalytics(req: Request, res: Response) {
    try {
      const { weekId } = req.params;
      const analytics = await analyticsService.getWeeklyAnalytics(weekId);

      res.json({
        success: true,
        data: analytics,
      });
    } catch (error: any) {
      logger.error('Error fetching weekly analytics', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch weekly analytics',
      });
    }
  },

  /**
   * GET /api/analytics/user/:userId
   * Get user analytics
   */
  async getUserAnalytics(req: AuthRequest, res: Response) {
    try {
      const { userId } = req.params;

      // Allow users to see their own analytics, admins can see anyone's
      if (req.user?.id !== userId) {
        // Check if admin
        const { AdminService } = await import('../services/admin.service');
        const adminService = new AdminService();
        const isAdmin = await adminService.isAdmin(req.user?.id || '');

        if (!isAdmin) {
          return res.status(403).json({
            success: false,
            message: 'Forbidden',
          });
        }
      }

      const analytics = await analyticsService.getUserAnalytics(userId);

      res.json({
        success: true,
        data: analytics,
      });
    } catch (error: any) {
      logger.error('Error fetching user analytics', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user analytics',
      });
    }
  },
};
