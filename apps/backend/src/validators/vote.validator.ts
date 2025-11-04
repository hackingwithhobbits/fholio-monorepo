import { z } from 'zod';

export const castVoteSchema = z.object({
  artistId: z.string().uuid(),
  weekStarting: z.string().datetime().optional(),
});

export type CastVoteInput = z.infer<typeof castVoteSchema>;
