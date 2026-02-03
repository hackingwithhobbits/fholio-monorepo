// apps/backend/src/services/auth.service.ts

import { supabase } from '../config/database'; // ADD THIS LINE AT TOP
import jwt from 'jsonwebtoken'; // ADD THIS TOO

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export class AuthService {
  /**
   * Sign in fan - returns user + JWT token
   */
  async signInFan(email: string) {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .eq('user_type', 'fan')
      .single();

    if (error || !user) {
      throw new Error('No account found with this email');
    }

    if (user.status === 'suspended' || user.status === 'banned') {
      throw new Error('Account suspended. Contact support.');
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', user.id);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userType: user.user_type,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user,
      session: {
        access_token: token,
        token_type: 'bearer',
        expires_in: 604800, // 7 days in seconds
      },
    };
  }

  /**
   * Sign up new fan - returns user + JWT token
   */
  async signUpFan(email: string, username: string, displayName: string) {
    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Check if username is taken
    const { data: existingUsername } = await supabase
      .from('users')
      .select('id')
      .eq('username', username.toLowerCase().trim())
      .single();

    if (existingUsername) {
      throw new Error('Username already taken');
    }

    // Create user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email: email.toLowerCase().trim(),
        username: username.toLowerCase().trim(),
        display_name: displayName,
        user_type: 'fan',
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Sign up error:', error);
      throw new Error('Failed to create account');
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        userType: newUser.user_type,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user: newUser,
      session: {
        access_token: token,
        token_type: 'bearer',
        expires_in: 604800,
      },
    };
  }

  /**
   * Sign in artist - returns user + JWT token
   */
  async signInArtist(email: string) {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .eq('user_type', 'artist')
      .single();

    if (error || !user) {
      throw new Error('No artist account found with this email');
    }

    if (user.status === 'suspended' || user.status === 'banned') {
      throw new Error('Account suspended. Contact support.');
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', user.id);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userType: user.user_type,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user,
      session: {
        access_token: token,
        token_type: 'bearer',
        expires_in: 604800,
      },
    };
  }

  /**
   * Sign up new artist - returns user + JWT token
   */
  async signUpArtist(email: string, artistName: string) {
    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email: email.toLowerCase().trim(),
        username: artistName.toLowerCase().trim().replace(/\s+/g, '_'),
        display_name: artistName,
        user_type: 'artist',
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Sign up error:', error);
      throw new Error('Failed to create account');
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        userType: newUser.user_type,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user: newUser,
      session: {
        access_token: token,
        token_type: 'bearer',
        expires_in: 604800,
      },
    };
  }
}

export const authService = new AuthService();
