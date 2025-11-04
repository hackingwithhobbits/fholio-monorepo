import type { Request, Response } from 'express';

import { faqService } from '@/services/faq.service';
import type { ApiResponse } from '@/types';
import { asyncHandler } from '@/utils/asyncHandler';

export class FaqController {
  /**
   * GET /api/v1/faqs
   * Get all FAQs
   */
  getAllFaqs = asyncHandler(async (req: Request, res: Response) => {
    const category = req.query.category as string | undefined;

    const faqs = await faqService.getAllFaqs(category);

    const response: ApiResponse = {
      success: true,
      data: faqs,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });

  /**
   * GET /api/v1/faqs/categories
   * Get FAQ categories
   */
  getCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await faqService.getCategories();

    const response: ApiResponse = {
      success: true,
      data: categories,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    res.json(response);
  });
}

export const faqController = new FaqController();
