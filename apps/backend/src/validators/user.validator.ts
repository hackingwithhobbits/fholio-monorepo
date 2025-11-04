import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/types';

export const validateUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { username, bio } = req.body;

  if (username && typeof username !== 'string') {
    throw new AppError(400, 'Username must be a string');
  }

  if (bio && typeof bio !== 'string') {
    throw new AppError(400, 'Bio must be a string');
  }

  next();
};
