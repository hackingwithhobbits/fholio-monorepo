import type { Request, Response, NextFunction } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
    page?: number;
    limit?: number;
    total?: number;
  };
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  type: string;
  tier: 'Platinum' | 'Gold' | 'Silver';
  website_url?: string;
  created_at: string;
}

export interface Challenge {
  id: string;
  name: string;
  sponsor_id: string;
  sponsor_name: string;
  prize_amount: number;
  description: string;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
}
