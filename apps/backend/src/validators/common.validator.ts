import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().positive()).default('1'),
  limit: z.string().transform(Number).pipe(z.number().positive().max(100)).default('20'),
});

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

export const dateRangeSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
