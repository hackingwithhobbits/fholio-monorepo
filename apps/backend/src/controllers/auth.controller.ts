// apps/backend/src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export class AuthController {
  /**
   * POST /api/auth/signup/fan
   */
  async signUpFan(req: Request, res: Response) {
    try {
      const { email, username, displayName } = req.body;

      if (!email || !username) {
        return res.status(400).json({
          success: false,
          message: 'Email and username are required',
        });
      }

      const user = await authService.signUpFan(email, username, displayName);

      res.json({
        success: true,
        data: user,
        message: 'Account created successfully',
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to create account',
      });
    }
  }

  /**
   * POST /api/auth/onboarding/complete
   */
  async completeOnboarding(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required',
        });
      }

      const user = await authService.completeOnboarding(userId);

      res.json({
        success: true,
        data: user,
        message: 'Onboarding completed',
      });
    } catch (error: any) {
      console.error('Complete onboarding error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to complete onboarding',
      });
    }
  }
  /**
   * POST /api/auth/signin/fan
   */
  async signInFan(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: 'some-password', // or however you handle it
      });

      if (error) throw error;

      // IMPORTANT: Return the session token
      res.json({
        success: true,
        data: {
          user: data.user,
          session: data.session, // This contains access_token
        },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/auth/signup/artist
   */
  async signUpArtist(req: Request, res: Response) {
    try {
      const { email, artistName } = req.body;

      if (!email || !artistName) {
        return res.status(400).json({
          success: false,
          message: 'Email and artist name are required',
        });
      }

      const user = await authService.signUpArtist(email, artistName);

      res.json({
        success: true,
        data: user,
        message: 'Artist account created successfully',
      });
    } catch (error: any) {
      console.error('Artist sign up error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to create artist account',
      });
    }
  }

  /**
   * POST /api/auth/signin/artist
   */
  async signInArtist(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });
      }

      const user = await authService.signInArtist(email);

      res.json({
        success: true,
        data: user,
        message: 'Signed in successfully',
      });
    } catch (error: any) {
      console.error('Artist sign in error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to sign in',
      });
    }
  }

  /**
   * GET /api/auth/me
   */
  async getCurrentUser(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required',
        });
      }

      const user = await authService.getUserById(userId);

      res.json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      console.error('Get user error:', error);
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  }
}

export const authController = new AuthController();
