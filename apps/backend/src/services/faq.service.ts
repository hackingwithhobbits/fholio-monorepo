import { supabase } from '@/config/supabase';
import { AppError } from '@/types';

export class FaqService {
  /**
   * Get all FAQs
   */
  async getAllFaqs(category?: string) {
    let query = supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      throw new AppError(500, 'Failed to fetch FAQs', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get FAQ categories
   */
  async getCategories() {
    const { data, error } = await supabase.from('faqs').select('category').eq('is_active', true);

    if (error) {
      throw new AppError(500, 'Failed to fetch categories', 'DATABASE_ERROR', error);
    }

    const uniqueCategories = [...new Set(data.map((row) => row.category).filter(Boolean))];
    return uniqueCategories;
  }
}

export const faqService = new FaqService();
