import type { Request, Response } from 'express';

import { voteService } from '@/services/vote.service';
import type { ApiResponse } from '@/types';
import { asyncHandler } from '@/utils/asyncHandler';
import { castVoteSchema } from '@/validators/vote.validator';
import { idParamSchema } from '@/validators/common.validator';

export class VoteController {
  /**
   * POST /api/v1/votes
   * Cast a vote
   */
  castVote = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;
    const voteData = castVoteSchema.parse(req.body);

    const vote = await voteService.castVote(userId, voteData);

    const response: ApiResponse = {
      success: true,
      data: vote,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.status(201).json(response);
  });

  /**
   * GET /api/v1/votes/my-votes
   * Get user's votes
   */
  getMyVotes = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;
    const weekStarting = req.query.week as string | undefined;

    const votes = await voteService.getUserVotes(userId, weekStarting);

    const response: ApiResponse = {
      success: true,
      data: votes,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/votes/remaining
   * Get remaining votes
   */
  getRemainingVotes = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;

    const remaining = await voteService.getRemainingVotes(userId);

    const response: ApiResponse = {
      success: true,
      data: remaining,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * DELETE /api/v1/votes/:id
   * Remove a vote
   */
  removeVote = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;
    const { id } = idParamSchema.parse(req.params);

    await voteService.removeVote(userId, id);

    const response: ApiResponse = {
      success: true,
      data: { message: 'Vote removed successfully' },
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });
}

export const voteController = new VoteController();
