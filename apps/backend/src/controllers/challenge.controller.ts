// apps/backend/src/controllers/challenge.controller.ts

import { Request, Response } from 'express';
import { ChallengeService } from '../services/challenge.service';
import { WeekService } from '../services/week.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const challengeService = new ChallengeService();
const weekService = new WeekService();

export const challengeController = {
  /**
   * GET /api/challenges/active
   * Get active challenges for current week
   */
  async getActive(req: AuthRequest, res: Response) {
    try {
      const currentWeek = await weekService.getCurrentWeek();
      if (!currentWeek) {
        return res.status(404).json({
          success: false,
          message: 'No active week found',
        });
      }

      const challenges = await challengeService.getActiveChallenges(currentWeek.id);

      // If user is authenticated, include their entry status
      let challengesWithStatus = challenges;
      if (req.user) {
        challengesWithStatus = await challengeService.getChallengesWithUserStatus(
          currentWeek.id,
          req.user.id
        );
      }

      res.json({
        success: true,
        data: challengesWithStatus,
        meta: {
          count: challenges.length,
          weekId: currentWeek.id,
        },
      });
    } catch (error: any) {
      logger.error('Error fetching active challenges', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch challenges',
      });
    }
  },

  /**
   * GET /api/challenges/:id
   * Get challenge details and leaderboard
   */
  async getChallengeDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const challenge = await challengeService.getChallengeById(id);

      if (!challenge) {
        return res.status(404).json({
          success: false,
          message: 'Challenge not found',
        });
      }

      const leaderboard = await challengeService.getChallengeLeaderboard(id, 100);

      res.json({
        success: true,
        data: {
          challenge,
          leaderboard,
        },
      });
    } catch (error: any) {
      logger.error('Error fetching challenge details', {
        error: error.message,
        challengeId: req.params.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch challenge details',
      });
    }
  },

  /**
   * POST /api/challenges/:id/enter
   * Enter a challenge
   */
  async enter(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;

      const entry = await challengeService.enterChallenge(req.user.id, id);

      logger.info('Challenge entry created', {
        userId: req.user.id,
        challengeId: id,
      });

      res.json({
        success: true,
        data: entry,
        message: 'Successfully entered challenge',
      });
    } catch (error: any) {
      logger.error('Error entering challenge', {
        error: error.message,
        userId: req.user?.id,
        challengeId: req.params.id,
      });

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  /**
   * GET /api/challenges/:id/my-entry
   * Get user's entry for a challenge
   */
  async getMyEntry(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { id } = req.params;

      const entry = await challengeService.getUserChallengeEntry(req.user.id, id);

      res.json({
        success: true,
        data: entry,
      });
    } catch (error: any) {
      logger.error('Error fetching challenge entry', {
        error: error.message,
        userId: req.user?.id,
        challengeId: req.params.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch entry',
      });
    }
  },
};
