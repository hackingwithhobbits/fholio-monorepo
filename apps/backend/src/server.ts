import { testDatabaseConnection } from '@/config/supabase';
import { logger } from '@/utils/logger';

import app from './app';
import { env } from './config/env';

async function startServer() {
  try {
    logger.info('Environment check:', {
      nodeEnv: env.NODE_ENV,
      port: env.PORT,
      supabaseUrl: env.SUPABASE_URL,
      hasServiceKey: !!env.SUPABASE_SERVICE_ROLE_KEY,
      serviceKeyPrefix: env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 20) + '...',
    });
    // Test database connection
    logger.info('Testing database connection...');
    const isConnected = await testDatabaseConnection();

    if (!isConnected) {
      throw new Error('Failed to connect to database');
    }

    logger.info('✅ Database connected successfully');

    // Start server
    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
      logger.info(
        `📝 API documentation available at http://localhost:${env.PORT}${env.API_PREFIX}`
      );
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);
      server.close(() => {
        logger.info('Server closed. Exiting process.');
        process.exit(0);
      });

      // Force shutdown after 10s
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

void startServer();
