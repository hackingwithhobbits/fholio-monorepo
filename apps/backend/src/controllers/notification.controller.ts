// apps/backend/src/controllers/notification.controller.ts

import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const notificationService = new NotificationService();

export const notificationController = {
  /**
   * GET /api/notifications
   * Get user's notifications
   */
  async getNotifications(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const limit = parseInt(req.query.limit as string) || 50;
      const notifications = await notificationService.getUserNotifications(req.user.id, limit);

      res.json({
        success: true,
        data: notifications,
      });
    } catch (error: any) {
      logger.error('Error fetching notifications', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch notifications',
      });
    }
  },

  /**
   * GET /api/notifications/unread-count
   * Get unread notification count
   */
  async getUnreadCount(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const count = await notificationService.getUnreadCount(req.user.id);

      res.json({
        success: true,
        data: { count },
      });
    } catch (error: any) {
      logger.error('Error fetching unread count', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch unread count',
      });
    }
  },

  /**
   * PUT /api/notifications/:id/read
   * Mark notification as read
   */
  async markAsRead(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      await notificationService.markAsRead(req.user.id, id);

      res.json({
        success: true,
        message: 'Notification marked as read',
      });
    } catch (error: any) {
      logger.error('Error marking notification as read', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to mark notification as read',
      });
    }
  },

  /**
   * PUT /api/notifications/read-all
   * Mark all notifications as read
   */
  async markAllAsRead(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      await notificationService.markAllAsRead(req.user.id);

      res.json({
        success: true,
        message: 'All notifications marked as read',
      });
    } catch (error: any) {
      logger.error('Error marking all as read', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to mark all as read',
      });
    }
  },

  /**
   * DELETE /api/notifications/:id
   * Delete notification
   */
  async deleteNotification(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      await notificationService.deleteNotification(req.user.id, id);

      res.json({
        success: true,
        message: 'Notification deleted',
      });
    } catch (error: any) {
      logger.error('Error deleting notification', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to delete notification',
      });
    }
  },

  /**
   * GET /api/notifications/preferences
   * Get notification preferences
   */
  async getPreferences(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const preferences = await notificationService.getPreferences(req.user.id);

      res.json({
        success: true,
        data: preferences,
      });
    } catch (error: any) {
      logger.error('Error fetching preferences', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch preferences',
      });
    }
  },

  /**
   * PUT /api/notifications/preferences
   * Update notification preferences
   */
  async updatePreferences(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const preferences = await notificationService.updatePreferences(req.user.id, req.body);

      res.json({
        success: true,
        data: preferences,
        message: 'Preferences updated successfully',
      });
    } catch (error: any) {
      logger.error('Error updating preferences', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to update preferences',
      });
    }
  },
};
