import { z } from 'zod';

export const getArtistsQuerySchema = z.object({
  page: z.string().transform(Number).pipe(z.number().positive()).default('1'),
  limit: z.string().transform(Number).pipe(z.number().positive().max(100)).default('20'),
  league: z.enum(['Major', 'Minor']).optional(),
  status: z.enum(['Hot Streak', 'Rising', 'New Entrant', 'Trending', 'Stable']).optional(),
  genre: z.string().optional(),
  sortBy: z.enum(['score', 'name', 'streams', 'engagement']).default('score'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
});

export const createArtistSchema = z.object({
  name: z.string().min(1).max(255),
  genre: z.string().min(1).max(100),
  bio: z.string().optional(),
  location: z.string().optional(),
  imageUrl: z.string().url().optional(),
  monthlyListeners: z.number().int().nonnegative().optional(),
  instagramFollowers: z.number().int().nonnegative().optional(),
  socialLinks: z
    .object({
      spotify: z.string().url().optional(),
      apple: z.string().url().optional(),
      tiktok: z.string().url().optional(),
      instagram: z.string().url().optional(),
    })
    .optional(),
});

export type GetArtistsQuery = z.infer<typeof getArtistsQuerySchema>;
export type CreateArtistInput = z.infer<typeof createArtistSchema>;
