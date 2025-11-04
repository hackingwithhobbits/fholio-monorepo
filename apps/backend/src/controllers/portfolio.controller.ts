import type { Request, Response } from 'express';

import { portfolioService } from '@/services/portfolio.service';
import type { ApiResponse } from '@/types';
import { asyncHandler } from '@/utils/asyncHandler';
import { createPortfolioSchema, updatePortfolioSchema } from '@/validators/portfolio.validator';
import { idParamSchema } from '@/validators/common.validator';

export class PortfolioController {
  /**
   * GET /api/v1/portfolio/current
   * Get user's current portfolio
   */
  getCurrentPortfolio = asyncHandler(async (req: Request, res: Response) => {
    // In production, get userId from authenticated session
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      const response: ApiResponse = {
        success: false,
        error: {
          message: 'User ID required',
          code: 'UNAUTHORIZED',
        },
      };
      return res.status(401).json(response);
    }

    const portfolio = await portfolioService.getUserPortfolio(userId);

    const response: ApiResponse = {
      success: true,
      data: portfolio,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/portfolio/history
   * Get portfolio history
   */
  getHistory = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const history = await portfolioService.getPortfolioHistory(userId, limit);

    const response: ApiResponse = {
      success: true,
      data: history,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * POST /api/v1/portfolio
   * Create new portfolio
   */
  createPortfolio = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;
    const portfolioData = createPortfolioSchema.parse(req.body);

    const portfolio = await portfolioService.createPortfolio(userId, portfolioData);

    const response: ApiResponse = {
      success: true,
      data: portfolio,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.status(201).json(response);
  });

  /**
   * PUT /api/v1/portfolio/:id
   * Update portfolio
   */
  updatePortfolio = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;
    const { id } = idParamSchema.parse(req.params);
    const updateData = updatePortfolioSchema.parse(req.body);

    const portfolio = await portfolioService.updatePortfolio(userId, id, updateData);

    const response: ApiResponse = {
      success: true,
      data: portfolio,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });
}

export const portfolioController = new PortfolioController();
