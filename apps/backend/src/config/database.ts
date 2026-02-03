// apps/backend/src/config/database.ts
import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Debug logging
console.log('🔍 Database config debug:');
console.log('  URL:', env.SUPABASE_URL);
console.log('  Key length:', env.SUPABASE_SERVICE_ROLE_KEY?.length || 0);
console.log('  Key prefix:', env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) || 'MISSING');

if (!env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL is missing');
}

if (!env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing');
}

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  db: {
    schema: 'public',
  },
});

export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('artists').select('id').limit(1);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
