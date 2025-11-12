// apps/backend/src/controllers/artist.controller.ts

import { Request, Response } from 'express';
import { ArtistService } from '../services/artist.service';
import { WeekService } from '../services/week.service';
import { logger } from '../utils/logger';
import { AuthRequest } from '../middleware/auth.middleware';

const artistService = new ArtistService();
const weekService = new WeekService();

export const artistController = {
  /**
   * GET /api/artists/leaderboard
   * Get artist leaderboard for current week
   */
  async getLeaderboard(req: Request, res: Response) {
    try {
      const league = req.query.league as 'Major' | 'Minor' | undefined;
      const limit = parseInt(req.query.limit as string) || 50;
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

      const artists = await artistService.getLeaderboard(targetWeekId, league, limit);

      res.json({
        success: true,
        data: artists,
        meta: {
          count: artists.length,
          league: league || 'all',
          weekId: targetWeekId
        }
      });
    } catch (error: any) {
      logger.error('Error fetching artist leaderboard', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch leaderboard'
      });
    }
  },

  /**
   * GET /api/artists/:id
   * Get detailed artist profile
   */
  async getArtistProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const artist = await artistService.getArtistProfile(id);

      if (!artist) {
        return res.status(404).json({
          success: false,
          message: 'Artist not found'
        });
      }

      // Get current week performance
      const currentWeek = await weekService.getCurrentWeek();
      let weekPerformance = null;
      
      if (currentWeek) {
        weekPerformance = await artistService.getArtistWeekPerformance(id, currentWeek.id);
      }

      res.json({
        success: true,
        data: {
          ...artist,
          currentWeekPerformance: weekPerformance
        }
      });
    } catch (error: any) {
      logger.error('Error fetching artist profile', { error: error.message, artistId: req.params.id });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch artist profile'
      });
    }
  },

  /**
   * GET /api/artists/:id/history
   * Get artist's weekly performance history
   */
  async getArtistHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;

      const history = await artistService.getArtistHistory(id, limit);

      res.json({
        success: true,
        data: history
      });
    } catch (error: any) {
      logger.error('Error fetching artist history', { error: error.message, artistId: req.params.id });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch artist history'
      });
    }
  },

  /**
   * GET /api/artists/pool/current
   * Get current week's artist pool (100 songs)
   */
  async getCurrentPool(req: Request, res: Response) {
    try {
      const currentWeek = await weekService.getCurrentWeek();
      if (!currentWeek) {
        return res.status(404).json({
          success: false,
          message: 'No active week found'
        });
      }

      const pool = await artistService.getWeeklyPool(currentWeek.id);

      res.json({
        success: true,
        data: pool,
        meta: {
          count: pool.length,
          weekId: currentWeek.id
        }
      });
    } catch (error: any) {
      logger.error('Error fetching artist pool', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch artist pool'
      });
    }
  },

  /**
   * GET /api/artists/top50
   * Get Top 50 eligible artists for picks
   */
  async getTop50(req: Request, res: Response) {
    try {
      const currentWeek = await weekService.getCurrentWeek();
      if (!currentWeek) {
        return res.status(404).json({
          success: false,
          message: 'No active week found'
        });
      }

      const top50 = await artistService.getTop50(currentWeek.id);

      res.json({
        success: true,
        data: top50,
        meta: {
          count: top50.length,
          weekId: currentWeek.id
        }
      });
    } catch (error: any) {
      logger.error('Error fetching Top 50', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch Top 50'
      });
    }
  },

  /**
   * POST /api/artists/submit-track
   * Submit track for consideration (Artist accounts only)
   */
  async submitTrack(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const { track_url, title, genre } = req.body;

      if (!track_url || !title || !genre) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: track_url, title, genre'
        });
      }

      const submission = await artistService.submitTrack(
        req.user.id,
        track_url,
        title,
        genre
      );

      logger.info('Track submitted', { userId: req.user.id, trackId: submission.id });

      res.json({
        success: true,
        data: submission,
        message: 'Track submitted successfully'
      });
    } catch (error: any) {
      logger.error('Error submitting track', { error: error.message, userId: req.user?.id });
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to submit track'
      });
    }
  },

  /**
   * GET /api/artists/search
   * Search artists by name or genre
   */
  async searchArtists(req: Request, res: Response) {
    try {
      const query = req.query.q as string;
      const genre = req.query.genre as string;
      const limit = parseInt(req.query.limit as string) || 20;

      if (!query && !genre) {
        return res.status(400).json({
          success: false,
          message: 'Search query or genre required'
        });
      }

      const results = await artistService.searchArtists(query, genre, limit);

      res.json({
        success: true,
        data: results,
        meta: {
          count: results.length,
          query,
          genre
        }
      });
    } catch (error: any) {
      logger.error('Error searching artists', { error: error.message });
      res.status(500).json({
        success: false,
        message: 'Failed to search artists'
      });
    }
  }
};