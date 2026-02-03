// apps/backend/src/config/env.ts
import dotenv from 'dotenv';
import { z } from 'zod';

// Load .env from the backend directory
dotenv.config({ path: __dirname + '/../../.env' });

// apps/backend/src/config/env.ts
// Add this to your envSchema:

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  API_PREFIX: z.string().default('/api'), // ← ADD THIS
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
});

function validateEnv() {
  try {
    const parsed = envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      CORS_ORIGIN: process.env.CORS_ORIGIN,
    });

    return {
      ...parsed,
      PORT: parseInt(parsed.PORT, 10),
    };
  } catch (error) {
    console.error('❌ Environment validation failed:');
    console.error('Current env values:');
    console.error('  SUPABASE_URL:', process.env.SUPABASE_URL);
    console.error(
      '  SUPABASE_SERVICE_ROLE_KEY:',
      process.env.SUPABASE_SERVICE_ROLE_KEY
        ? 'SET (length: ' + process.env.SUPABASE_SERVICE_ROLE_KEY.length + ')'
        : 'NOT SET'
    );
    console.error('  NODE_ENV:', process.env.NODE_ENV);
    console.error('  PORT:', process.env.PORT);

    if (error instanceof z.ZodError) {
      console.error('\nValidation errors:');
      error.errors.forEach((err) => {
        console.error(`  ${err.path.join('.')}: ${err.message}`);
      });
    }

    throw new Error('Environment validation failed');
  }
}

export const env = validateEnv();
