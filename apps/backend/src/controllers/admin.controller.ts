// apps/backend/src/controllers/admin.controller.ts

import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { logger } from '../utils/logger';

const adminService = new AdminService();

export const adminController = {
  /**
   * GET /api/admin/stats
   * Get platform statistics
   */
  async getPlatformStats(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      // TODO: Add admin role check
      // if (req.user.role !== 'admin') {
      //   return res.status(403).json({ message: 'Forbidden' });
      // }

      const stats = await adminService.getPlatformStats();

      res.json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      logger.error('Get platform stats error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch platform stats',
      });
    }
  },

  /**
   * GET /api/admin/tracks/pending
   * Get pending track submissions
   */
  async getPendingTracks(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const limit = parseInt(req.query.limit as string) || 50;
      const tracks = await adminService.getPendingTracks(limit);

      res.json({
        success: true,
        data: tracks,
      });
    } catch (error: any) {
      logger.error('Get pending tracks error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch pending tracks',
      });
    }
  },

  /**
   * POST /api/admin/tracks/:id/approve
   * Approve a track
   */
  async approveTrack(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      const track = await adminService.approveTrack(id);

      logger.info('Track approved', { trackId: id, adminId: req.user.id });

      res.json({
        success: true,
        data: track,
        message: 'Track approved successfully',
      });
    } catch (error: any) {
      logger.error('Approve track error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to approve track',
      });
    }
  },

  /**
   * POST /api/admin/tracks/:id/reject
   * Reject a track
   */
  async rejectTrack(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      const { reason } = req.body;

      const track = await adminService.rejectTrack(id, reason);

      logger.info('Track rejected', { trackId: id, adminId: req.user.id });

      res.json({
        success: true,
        data: track,
        message: 'Track rejected',
      });
    } catch (error: any) {
      logger.error('Reject track error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to reject track',
      });
    }
  },

  /**
   * GET /api/admin/weeks
   * Get all weeks
   */
  async getAllWeeks(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const weeks = await adminService.getAllWeeks();

      res.json({
        success: true,
        data: weeks,
      });
    } catch (error: any) {
      logger.error('Get weeks error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch weeks',
      });
    }
  },

  /**
   * POST /api/admin/weeks
   * Create a new week
   */
  async createWeek(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const week = await adminService.createWeek(req.body);

      logger.info('Week created', { weekId: week.id, adminId: req.user.id });

      res.json({
        success: true,
        data: week,
        message: 'Week created successfully',
      });
    } catch (error: any) {
      logger.error('Create week error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to create week',
      });
    }
  },

  /**
   * PUT /api/admin/weeks/:id
   * Update a week
   */
  async updateWeek(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      const week = await adminService.updateWeek(id, req.body);

      logger.info('Week updated', { weekId: id, adminId: req.user.id });

      res.json({
        success: true,
        data: week,
        message: 'Week updated successfully',
      });
    } catch (error: any) {
      logger.error('Update week error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to update week',
      });
    }
  },

  /**
   * DELETE /api/admin/weeks/:id
   * Delete a week
   */
  async deleteWeek(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      await adminService.deleteWeek(id);

      logger.info('Week deleted', { weekId: id, adminId: req.user.id });

      res.json({
        success: true,
        message: 'Week deleted successfully',
      });
    } catch (error: any) {
      logger.error('Delete week error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to delete week',
      });
    }
  },

  /**
   * GET /api/admin/users
   * Get all users
   */
  async getAllUsers(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const limit = parseInt(req.query.limit as string) || 100;
      const offset = parseInt(req.query.offset as string) || 0;

      const result = await adminService.getAllUsers(limit, offset);

      res.json({
        success: true,
        data: result.users,
        meta: {
          total: result.total,
          limit,
          offset,
        },
      });
    } catch (error: any) {
      logger.error('Get users error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users',
      });
    }
  },

  /**
   * POST /api/admin/users/:id/suspend
   * Suspend a user
   */
  async suspendUser(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      const { reason } = req.body;

      const user = await adminService.suspendUser(id, reason);

      logger.info('User suspended', { userId: id, adminId: req.user.id });

      res.json({
        success: true,
        data: user,
        message: 'User suspended',
      });
    } catch (error: any) {
      logger.error('Suspend user error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to suspend user',
      });
    }
  },

  /**
   * POST /api/admin/users/:id/unsuspend
   * Unsuspend a user
   */
  async unsuspendUser(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;
      const user = await adminService.unsuspendUser(id);

      logger.info('User unsuspended', { userId: id, adminId: req.user.id });

      res.json({
        success: true,
        data: user,
        message: 'User unsuspended',
      });
    } catch (error: any) {
      logger.error('Unsuspend user error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to unsuspend user',
      });
    }
  },

  /**
   * GET /api/admin/prize-pool
   * Get prize pool configuration
   */
  async getPrizePoolConfig(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const config = await adminService.getPrizePoolConfig();

      res.json({
        success: true,
        data: config,
      });
    } catch (error: any) {
      logger.error('Get prize pool config error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch prize pool config',
      });
    }
  },

  /**
   * PUT /api/admin/prize-pool
   * Update prize pool configuration
   */
  async updatePrizePoolConfig(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const config = await adminService.updatePrizePoolConfig(req.body);

      logger.info('Prize pool config updated', { adminId: req.user.id });

      res.json({
        success: true,
        data: config,
        message: 'Prize pool configuration updated',
      });
    } catch (error: any) {
      logger.error('Update prize pool config error', { error: error.message });
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update prize pool config',
      });
    }
  },

  /**
   * GET /api/admin/activity
   * Get recent activity logs
   */
  async getActivityLogs(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const limit = parseInt(req.query.limit as string) || 50;
      const logs = await adminService.getActivityLogs(limit);

      res.json({
        success: true,
        data: logs,
      });
    } catch (error: any) {
      logger.error('Get activity logs error', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch activity logs',
      });
    }
  },
};
