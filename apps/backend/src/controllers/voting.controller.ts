// apps/backend/src/controllers/voting.controller.ts

import { Request, Response } from 'express';
import { VotingService } from '../services/voting.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { logger } from '../utils/logger';

const votingService = new VotingService();

export const votingController = {
  /**
   * POST /api/votes
   * Submit a vote
   */
  async submitVote(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { artist_id, week_id } = req.body;

      if (!artist_id) {
        return res.status(400).json({
          success: false,
          message: 'artist_id is required',
        });
      }

      const vote = await votingService.submitVote(req.user.id, artist_id, week_id);

      logger.info('Vote submitted', {
        userId: req.user.id,
        artistId: artist_id,
        weekId: week_id,
      });

      res.json({
        success: true,
        data: vote,
        message: 'Vote submitted successfully',
      });
    } catch (error: any) {
      logger.error('Submit vote error', {
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
   * GET /api/votes/my-votes
   * Get user's votes for current or specified week
   */
  async getMyVotes(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const weekId = req.query.week_id as string;

      const votes = await votingService.getUserVotes(req.user.id, weekId);

      res.json({
        success: true,
        data: votes,
        meta: {
          count: votes.length,
        },
      });
    } catch (error: any) {
      logger.error('Get my votes error', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch votes',
      });
    }
  },

  /**
   * GET /api/votes/remaining
   * Get remaining votes for user
   */
  async getRemainingVotes(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const weekId = req.query.week_id as string;

      const remaining = await votingService.getRemainingVotes(req.user.id, weekId);

      res.json({
        success: true,
        data: remaining,
      });
    } catch (error: any) {
      logger.error('Get remaining votes error', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch remaining votes',
      });
    }
  },

  /**
   * DELETE /api/votes/:id
   * Remove a vote
   */
  async removeVote(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;

      await votingService.removeVote(id, req.user.id);

      logger.info('Vote removed', {
        userId: req.user.id,
        voteId: id,
      });

      res.json({
        success: true,
        message: 'Vote removed successfully',
      });
    } catch (error: any) {
      logger.error('Remove vote error', {
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
   * GET /api/votes/top-voted
   * Get top voted artists
   */
  async getTopVoted(req: Request, res: Response) {
    try {
      const weekId = req.query.week_id as string;
      const limit = parseInt(req.query.limit as string) || 10;

      const topArtists = await votingService.getTopVotedArtists(weekId, limit);

      res.json({
        success: true,
        data: topArtists,
        meta: {
          count: topArtists.length,
        },
      });
    } catch (error: any) {
      logger.error('Get top voted error', { error: error.message });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch top voted artists',
      });
    }
  },
};
