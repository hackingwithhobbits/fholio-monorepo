import { Router } from 'express';

import { faqController } from '@/controllers/faq.controller';

const router = Router();

// Get all FAQs
router.get('/', faqController.getAllFaqs);

// Get categories
router.get('/categories', faqController.getCategories);

export default router;
