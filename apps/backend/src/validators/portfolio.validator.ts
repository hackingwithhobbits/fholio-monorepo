import { z } from 'zod';

export const createPortfolioSchema = z.object({
  weekStarting: z.string().datetime(),
  artistIds: z.array(z.string().uuid()).min(1).max(5),
});

export const updatePortfolioSchema = z.object({
  artistIds: z.array(z.string().uuid()).min(1).max(5),
});

export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>;
