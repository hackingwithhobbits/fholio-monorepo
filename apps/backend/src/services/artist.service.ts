import { supabase } from '@/config/supabase';
import { AppError } from '@/types';
import type { GetArtistsQuery, CreateArtistInput } from '@/validators/artist.validator';

export class ArtistService {
  /**
   * Get all artists with filtering, sorting, and pagination
   */
  async getArtists(query: GetArtistsQuery) {
    const { page, limit, league, status, genre, sortBy, sortOrder, search } = query;
    const offset = (page - 1) * limit;

    let queryBuilder = supabase
      .from('artists')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (league) {
      queryBuilder = queryBuilder.eq('league', league);
    }

    if (status) {
      queryBuilder = queryBuilder.eq('status', status);
    }

    if (genre) {
      queryBuilder = queryBuilder.eq('genre', genre);
    }

    if (search) {
      queryBuilder = queryBuilder.ilike('name', `%${search}%`);
    }

    // Apply sorting
    queryBuilder = queryBuilder.order(sortBy, { ascending: sortOrder === 'asc' });

    const { data, error, count } = await queryBuilder;

    if (error) {
      throw new AppError(500, 'Failed to fetch artists', 'DATABASE_ERROR', error);
    }

    return {
      artists: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    };
  }

  /**
   * Get single artist by ID
   */
  // apps/backend/src/services/artist.service.ts

  async getArtistById(id: string) {
    console.log('=== Service getArtistById ===');
    console.log('Searching for ID:', id);
    console.log('ID type:', typeof id);

    // Try a direct query first to debug
    const { data: allIds, error: allError } = await supabase.from('artists').select('id');

    console.log('All IDs in database:', allIds?.slice(0, 3));
    console.log(
      'Does our ID exist?',
      allIds?.some((a) => a.id === id)
    );

    const { data, error } = await supabase.from('artists').select('*').eq('id', id).single();

    console.log('Query error:', error);
    console.log('Query data:', data);

    if (error) {
      console.log('Error code:', error.code);
      console.log('Error message:', error.message);
      console.log('Error details:', error.details);

      if (error.code === 'PGRST116') {
        throw new AppError(404, 'Artist not found', 'ARTIST_NOT_FOUND');
      }
      throw new AppError(500, 'Failed to fetch artist', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get artist performance history
   */
  async getArtistPerformance(id: string) {
    // First verify artist exists
    await this.getArtistById(id);

    const { data, error } = await supabase
      .from('artists')
      .select('weekly_history, score, change, engagement, votes, growth')
      .eq('id', id)
      .single();

    if (error) {
      throw new AppError(500, 'Failed to fetch artist performance', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get trending artists
   */
  async getTrendingArtists(limit = 10) {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .in('status', ['Hot Streak', 'Trending', 'Rising'])
      .order('score', { ascending: false })
      .limit(limit);

    if (error) {
      throw new AppError(500, 'Failed to fetch trending artists', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Create new artist (admin only)
   */
  async createArtist(artistData: CreateArtistInput) {
    // Determine league based on listeners/followers
    const league =
      (artistData.monthlyListeners ?? 0) > 100000 || (artistData.instagramFollowers ?? 0) > 20000
        ? 'Major'
        : 'Minor';

    const { data, error } = await supabase
      .from('artists')
      .insert({
        ...artistData,
        league,
        score: 0,
        change: 0,
        fan_backers: 0,
        streams: 0,
        engagement: 0,
        votes: 0,
        growth: 0,
        weekly_history: [],
        status: 'New Entrant',
      })
      .select()
      .single();

    if (error) {
      throw new AppError(500, 'Failed to create artist', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get artists by genre
   */
  async getArtistsByGenre(genre: string) {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('genre', genre)
      .order('score', { ascending: false });

    if (error) {
      throw new AppError(500, 'Failed to fetch artists by genre', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Get all unique genres
   */
  async getGenres() {
    const { data, error } = await supabase.from('artists').select('genre').order('genre');

    if (error) {
      throw new AppError(500, 'Failed to fetch genres', 'DATABASE_ERROR', error);
    }

    const uniqueGenres = [...new Set(data.map((row) => row.genre))];
    return uniqueGenres;
  }
}

export const artistService = new ArtistService();
