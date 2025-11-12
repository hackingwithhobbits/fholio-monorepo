// apps/backend/src/controllers/vote.controller.ts

import { Request, Response } from 'express';
import { VotingService } from '../services/voting.service';
import { WeekService } from '../services/week.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const votingService = new VotingService();
const weekService = new WeekService();

export const voteController = {
  /**
   * POST /api/votes
   * Submit a vote for an artist
   */
  async submitVote(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const { artist_id, week_id } = req.body;

      if (!artist_id) {
        return res.status(400).json({
          success: false,
          message: 'artist_id is required'
        });
      }

      // Use current week if not specified
      let targetWeekId = week_id;
      if (!week_id) {
        const currentWeek = await weekService.getCurrentWeek();
        if (!currentWeek) {
          return res.status(404).json({
            success: false,
            message: 'No active week found'
          });
        }
        targetWeekId = currentWeek.id;
      }

      const vote = await votingService.submitVote(req.user.id, artist_id, targetWeekId);

      logger.info('Vote submitted', {
        userId: req.user.id,
        artistId: artist_id,
        weekId: targetWeekId
      });

      res.json({
        success: true,
        data: vote,
        message: 'Vote submitted successfully'
      });
    } catch (error: any) {
      logger.error('Error submitting vote', {
        error: error.message,
        userId: req.user?.id,
        artistId: req.body.artist_id
      });
      
      res.status(400).json({
        success: false,
        message: error.message
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
          message: 'Unauthorized'
        });
      }

      const weekId = req.query.week_id as string;

      let targetWeekId = weekId;
      if (!weekId) {
        const currentWeek = await weekService.getCurrentWeek();
        if (!currentWeek) {
          return res.status(404).json({
            success: false,
            message: 'No active week found'
          });
        }
        targetWeekId = currentWeek.id;
      }

      const votes = await votingService.getUserVotes(req.user.id, targetWeekId);

      res.json({
        success: true,
        data: votes,
        meta: {
          count: votes.length,
          weekId: targetWeekId
        }
      });
    } catch (error: any) {
      logger.error('Error fetching user votes', {
        error: error.message,
        userId: req.user?.id
      });
      
      res.status(500).json({
        success: false,
        message: 'Failed to fetch votes'
      });
    }
  },

  /**
   * GET /api/votes/remaining
   * Get remaining votes for user in current week
   */
  async getRemainingVotes(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const currentWeek = await weekService.getCurrentWeek();
      if (!currentWeek) {
        return res.status(404).json({
          success: false,
          message: 'No active week found'
        });
      }

      const remaining = await votingService.getRemainingVotes(req.user.id, currentWeek.id);
      const used = await votingService.getUserVoteCount(req.user.id, currentWeek.id);

      res.json({
        success: true,
        data: {
          remaining,
          used,
          total: remaining + used
        }
      });
    } catch (error: any) {
      logger.error('Error fetching remaining votes', {
        error: error.message,
        userId: req.user?.id
      });
      
      res.status(500).json({
        success: false,
        message: 'Failed to fetch remaining votes'
      });
    }
  },

  /**
   * GET /api/votes/top-voted
   * Get top voted artists (during voting phase)
   */
  async getTopVoted(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const weekId = req.query.week_id as string;

      let targetWeekId = weekId;
      if (!weekId) {
        const currentWeek = await weekService.getCurrentWeek();
        if (!currentWeek) {
          return res.status(404).json({
            success: false,
            message: 'No active week found'
          });
        }
        targetWeekId = currentWeek.id;
      }

      const topVoted = await votingService.getTopVotedArtists(targetWeekId, limit);

      res.json({
        success: true,
        data: topVoted,
        meta: {
          count: topVoted.length,
          weekId: targetWeekId
        }
      });
    } catch (error: any) {
      logger.error('Error fetching top voted artists', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch top voted artists'
      });
    }
  },

  /**
   * DELETE /api/votes/:id
   * Remove a vote (only during voting window)
   */
  async removeVote(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const { id } = req.params;

      await votingService.removeVote(req.user.id, id);

      logger.info('Vote removed', { userId: req.user.id, voteId: id });

      res.json({
        success: true,
        message: 'Vote removed successfully'
      });
    } catch (error: any) {
      logger.error('Error removing vote', {
        error: error.message,
        userId: req.user?.id,
        voteId: req.params.id
      });
      
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
};