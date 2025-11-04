import type { Request, Response } from 'express';
import { z } from 'zod';

import { userService } from '@/services/user.service';
import type { ApiResponse } from '@/types';
import { asyncHandler } from '@/utils/asyncHandler';

const updateProfileSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  avatar_url: z.string().url().optional(),
});

export class UserController {
  /**
   * GET /api/v1/users/me
   * Get current user profile
   */
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;

    const profile = await userService.getUserProfile(userId);

    const response: ApiResponse = {
      success: true,
      data: profile,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * PATCH /api/v1/users/me
   * Update user profile
   */
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;
    const updates = updateProfileSchema.parse(req.body);

    const profile = await userService.updateUserProfile(userId, updates);

    const response: ApiResponse = {
      success: true,
      data: profile,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/users/me/stats
   * Get user statistics
   */
  getStats = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;

    const stats = await userService.getUserStats(userId);

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

export const userController = new UserController();
