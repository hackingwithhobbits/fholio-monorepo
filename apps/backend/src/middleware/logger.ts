import morgan from 'morgan';

import { env } from '@/config/env';
import { logger } from '@/utils/logger';

// Custom morgan stream
const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Morgan format
const morganFormat = env.NODE_ENV === 'production' ? 'combined' : 'dev';

export const httpLogger = morgan(morganFormat, { stream });