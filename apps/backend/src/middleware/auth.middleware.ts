// apps/backend/src/middleware/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/database';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Attach user to request
    req.user = {
      id: data.user.id,
      email: data.user.email!,
    };

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Auth error' });
  }
}
