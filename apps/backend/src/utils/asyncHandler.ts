import type { Request, Response, NextFunction } from 'express';

import type { AsyncRequestHandler } from '@/types';

/**
 * Wrapper for async route handlers to catch errors and pass to error middleware
 */
export const asyncHandler =
  (fn: AsyncRequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };