import { createClient } from '@supabase/supabase-js';

import { env } from './env';

import type { Database } from '@/types/database.types';

/**
 * Supabase client for backend operations
 * Uses service role key to bypass RLS and have full database access
 */
export const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  db: {
    schema: 'public',
  },
});

/**
 * Test database connection
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('artists').select('id').limit(1);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}