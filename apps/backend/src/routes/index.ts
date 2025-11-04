import { Router } from 'express';

import artistRoutes from './artist.routes';
import chartRoutes from './chart.routes';
import faqRoutes from './faq.routes';
import portfolioRoutes from './portfolio.routes';
import userRoutes from './user.routes';
import voteRoutes from './vote.routes';
import walletRoutes from './wallet.routes';
import sponsorRoutes from './sponsor.routes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    },
  });
});

// API Routes
router.use('/artists', artistRoutes);
router.use('/charts', chartRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/votes', voteRoutes);
router.use('/wallet', walletRoutes);
router.use('/users', userRoutes);
router.use('/faqs', faqRoutes);
router.use('/sponsors', sponsorRoutes);

export default router;
