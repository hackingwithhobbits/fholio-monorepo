import { Router } from 'express';

import { artistController } from '@/controllers/artist.controller';

const router = Router();

import { supabase } from '@/config/supabase';

// Add this BEFORE other routes
router.get('/debug/test-connection', async (req, res) => {
  try {
    // Test 1: Count total artists
    const { count, error: countError } = await supabase
      .from('artists')
      .select('*', { count: 'exact', head: true });

    // Test 2: Get all IDs
    const { data: allArtists, error: allError } = await supabase
      .from('artists')
      .select('id, name, league, score')
      .limit(5);

    // Test 3: Try your specific ID
    const testId = '17fa9d7f-04b6-46f7-b877-39606b1d0a0c';
    const { data: specificArtist, error: specificError } = await supabase
      .from('artists')
      .select('*')
      .eq('id', testId)
      .single();

    // Test 4: Raw query
    const { data: rawQuery, error: rawError } = await supabase
      .from('artists')
      .select('*')
      .limit(1)
      .single();

    res.json({
      success: true,
      tests: {
        totalCount: { count, error: countError },
        first5Artists: { data: allArtists, error: allError },
        specificArtist: {
          searchedId: testId,
          data: specificArtist,
          error: specificError,
          errorCode: specificError?.code,
        },
        rawSingle: { data: rawQuery, error: rawError },
      },
      environment: {
        supabaseUrl: process.env.SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        keyPrefix: process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) + '...',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get all artists
router.get('/', artistController.getArtists);

// Get trending artists
router.get('/trending', artistController.getTrending);

// Get all genres
router.get('/genres', artistController.getGenres);

// Get artists by genre
router.get('/genre/:genre', artistController.getByGenre);

// Get single artist
router.get('/:id', artistController.getArtistById);

// Get artist performance
router.get('/:id/performance', artistController.getPerformance);

// Create artist (admin only - add auth middleware in production)
router.post('/', artistController.createArtist);

export default router;
