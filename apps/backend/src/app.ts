import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { env } from '@/config/env';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';
import { httpLogger } from '@/middleware/logger';
import { rateLimiter } from '@/middleware/rateLimiter';
import routes from '@/routes';

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
app.use(httpLogger);

// Rate limiting
app.use(rateLimiter);

// Routes
app.use(env.API_PREFIX, routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;