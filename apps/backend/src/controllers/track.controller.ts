// apps/backend/src/controllers/track.controller.ts

import { Request, Response } from 'express';
import { TrackService } from '../services/track.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { logger } from '../utils/logger';
import multer from 'multer';

const trackService = new TrackService();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/mp3'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only MP3, WAV, and FLAC are allowed.'));
    }
  },
});

export const trackController = {
  // Multer middleware for track uploads
  uploadMiddleware: upload.single('audio'),

  /**
   * POST /api/tracks/submit
   * Submit a new track
   */
  async submitTrack(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const {
        title,
        genre,
        description,
        cover_image_url,
        spotify_url,
        apple_music_url,
        youtube_url,
      } = req.body;
      const file = req.file;

      if (!title || !genre) {
        return res.status(400).json({
          success: false,
          message: 'Title and genre are required',
        });
      }

      let audioPreviewUrl: string | undefined;
      let audioFilePath: string | undefined;

      // Upload audio file if provided
      if (file) {
        const uploadResult = await trackService.uploadTrackFile(
          file.buffer,
          file.originalname,
          file.mimetype
        );
        audioPreviewUrl = uploadResult.publicUrl;
        audioFilePath = uploadResult.filePath;
      }

      // Create track
      const track = await trackService.submitTrack({
        artistId: req.user.id,
        title,
        genre,
        description,
        coverImageUrl: cover_image_url,
        audioPreviewUrl,
        audioFilePath,
        spotifyUrl: spotify_url,
        appleMusicUrl: apple_music_url,
        youtubeUrl: youtube_url,
      });

      // Submit to current week
      const weekSubmission = await trackService.submitTrackToWeek(track.id, req.user.id);

      logger.info('Track submitted', {
        userId: req.user.id,
        trackId: track.id,
      });

      res.json({
        success: true,
        data: {
          track,
          weekSubmission,
        },
        message: 'Track submitted successfully',
      });
    } catch (error: any) {
      logger.error('Submit track error', {
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
   * GET /api/tracks/my-submissions
   * Get artist's submissions
   */
  async getMySubmissions(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const submissions = await trackService.getArtistSubmissions(req.user.id);

      res.json({
        success: true,
        data: submissions,
      });
    } catch (error: any) {
      logger.error('Get submissions error', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch submissions',
      });
    }
  },

  /**
   * GET /api/tracks/my-stats
   * Get artist stats
   */
  async getMyStats(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const stats = await trackService.getArtistStats(req.user.id);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      logger.error('Get stats error', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch stats',
      });
    }
  },

  /**
   * GET /api/tracks/my-tracks
   * Get artist's tracks
   */
  async getMyTracks(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const tracks = await trackService.getArtistTracks(req.user.id);

      res.json({
        success: true,
        data: tracks,
      });
    } catch (error: any) {
      logger.error('Get tracks error', {
        error: error.message,
        userId: req.user?.id,
      });

      res.status(500).json({
        success: false,
        message: 'Failed to fetch tracks',
      });
    }
  },
};
