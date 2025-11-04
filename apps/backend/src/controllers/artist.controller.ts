import type { Request, Response } from 'express';

import { artistService } from '@/services/artist.service';
import type { ApiResponse } from '@/types';
import { asyncHandler } from '@/utils/asyncHandler';
import {
  getArtistsQuerySchema,
  createArtistSchema,
  type GetArtistsQuery,
} from '@/validators/artist.validator';
import { idParamSchema } from '@/validators/common.validator';

export class ArtistController {
  /**
   * GET /api/v1/artists
   * Get all artists with filters
   */
  getArtists = asyncHandler(async (req: Request, res: Response) => {
    const query = getArtistsQuerySchema.parse(req.query) as GetArtistsQuery;
    const result = await artistService.getArtists(query);

    const response: ApiResponse = {
      success: true,
      data: result.artists,
      meta: {
        timestamp: new Date().toISOString(),
        ...result.pagination,
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/artists/trending
   * Get trending artists
   */
  getTrending = asyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const artists = await artistService.getTrendingArtists(limit);

    const response: ApiResponse = {
      success: true,
      data: artists,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/artists/genres
   * Get all genres
   */
  getGenres = asyncHandler(async (req: Request, res: Response) => {
    const genres = await artistService.getGenres();

    const response: ApiResponse = {
      success: true,
      data: genres,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/artists/genre/:genre
   * Get artists by genre
   */
  getByGenre = asyncHandler(async (req: Request, res: Response) => {
    const { genre } = req.params;
    const artists = await artistService.getArtistsByGenre(genre);

    const response: ApiResponse = {
      success: true,
      data: artists,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/artists/:id
   * Get single artist
   */
  getArtistById = asyncHandler(async (req: Request, res: Response) => {
    console.log('=== DEBUG getArtistById ===');
    console.log('Raw params:', req.params);
    console.log('Raw id:', req.params.id);
    console.log('ID type:', typeof req.params.id);
    console.log('ID length:', req.params.id?.length);
    const { id } = idParamSchema.parse(req.params);
    const artist = await artistService.getArtistById(id);

    const response: ApiResponse = {
      success: true,
      data: artist,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/artists/:id/performance
   * Get artist performance history
   */
  getPerformance = asyncHandler(async (req: Request, res: Response) => {
    const { id } = idParamSchema.parse(req.params);
    const performance = await artistService.getArtistPerformance(id);

    const response: ApiResponse = {
      success: true,
      data: performance,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * POST /api/v1/artists
   * Create new artist (admin only)
   */
  createArtist = asyncHandler(async (req: Request, res: Response) => {
    const artistData = createArtistSchema.parse(req.body);
    const artist = await artistService.createArtist(artistData);

    const response: ApiResponse = {
      success: true,
      data: artist,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.status(201).json(response);
  });
}

export const artistController = new ArtistController();
