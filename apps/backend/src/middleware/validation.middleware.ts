// apps/backend/src/middleware/validation.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export function validate(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors,
        });
      } else {
        next(error);
      }
    }
  };
}

// Example schemas
export const voteSchema = z.object({
  artist_id: z.string().uuid(),
  week_id: z.string().uuid(),
});

export const lineupSchema = z.object({
  artist_ids: z.array(z.string().uuid()).min(1).max(10),
  captain_id: z.string().uuid().optional(),
});
