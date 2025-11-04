// apps/backend/src/routes/sponsor.routes.ts
import { Router } from 'express';
import { supabase } from '@/config/supabase';

const router = Router();

// Get all sponsors
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('sponsors').select('*');

  res.json({
    success: true,
    data: data || [],
  });
});

// Get active challenges
router.get('/challenges/active', async (req, res) => {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .eq('is_active', true)
    .gte('ends_at', new Date().toISOString());

  res.json({
    success: true,
    data: data || [],
  });
});

export default router;
