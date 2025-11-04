import { Router } from 'express';

import { portfolioController } from '@/controllers/portfolio.controller';

const router = Router();

// Get current portfolio
router.get('/current', portfolioController.getCurrentPortfolio);

// Get portfolio history
router.get('/history', portfolioController.getHistory);

// Create portfolio
router.post('/', portfolioController.createPortfolio);

// Update portfolio
router.put('/:id', portfolioController.updatePortfolio);

export default router;
