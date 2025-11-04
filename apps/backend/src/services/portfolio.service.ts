import { supabase } from '@/config/supabase';
import { AppError } from '@/types';
import type { CreatePortfolioInput, UpdatePortfolioInput } from '@/validators/portfolio.validator';

export class PortfolioService {
  /**
   * Get user's current portfolio
   */
  async getUserPortfolio(userId: string, weekStarting?: string) {
    let query = supabase
      .from('user_portfolios')
      .select(
        `
        *,
        portfolio_artists (
          *,
          artist:artists (*)
        )
      `
      )
      .eq('user_id', userId);

    if (weekStarting) {
      query = query.eq('week_starting', weekStarting);
    } else {
      // Get most recent
      query = query.order('week_starting', { ascending: false }).limit(1);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No portfolio found
      }
      throw new AppError(500, 'Failed to fetch portfolio', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Create a new portfolio (lineup)
   */
  async createPortfolio(userId: string, portfolioData: CreatePortfolioInput) {
    const { weekStarting, artistIds } = portfolioData;

    // Check if portfolio already exists for this week
    const existing = await this.getUserPortfolio(userId, weekStarting);
    if (existing) {
      throw new AppError(400, 'Portfolio already exists for this week', 'PORTFOLIO_EXISTS');
    }

    // Check if week is locked
    const lockTime = new Date(weekStarting);
    lockTime.setDate(lockTime.getDate() + 5); // Friday
    lockTime.setHours(23, 59, 59);

    if (new Date() > lockTime) {
      throw new AppError(400, 'This week is already locked', 'WEEK_LOCKED');
    }

    // Verify all artists exist
    const { data: artists, error: artistError } = await supabase
      .from('artists')
      .select('id, score')
      .in('id', artistIds);

    if (artistError || !artists || artists.length !== artistIds.length) {
      throw new AppError(400, 'One or more invalid artist IDs', 'INVALID_ARTISTS');
    }

    // Create portfolio
    const { data: portfolio, error: portfolioError } = await supabase
      .from('user_portfolios')
      .insert({
        user_id: userId,
        week_starting: weekStarting,
        is_locked: false,
        total_score: 0,
      })
      .select()
      .single();

    if (portfolioError) {
      throw new AppError(500, 'Failed to create portfolio', 'DATABASE_ERROR', portfolioError);
    }

    // Add artists to portfolio
    const portfolioArtists = artistIds.map((artistId, index) => ({
      portfolio_id: portfolio.id,
      artist_id: artistId,
      position: index + 1,
      score_contribution: 0,
    }));

    const { error: artistsError } = await supabase
      .from('portfolio_artists')
      .insert(portfolioArtists);

    if (artistsError) {
      // Rollback portfolio creation
      await supabase.from('user_portfolios').delete().eq('id', portfolio.id);
      throw new AppError(500, 'Failed to add artists to portfolio', 'DATABASE_ERROR', artistsError);
    }

    return this.getUserPortfolio(userId, weekStarting);
  }

  /**
   * Update existing portfolio
   */
  async updatePortfolio(userId: string, portfolioId: string, updateData: UpdatePortfolioInput) {
    // Get portfolio
    const { data: portfolio, error: fetchError } = await supabase
      .from('user_portfolios')
      .select('*')
      .eq('id', portfolioId)
      .eq('user_id', userId)
      .single();

    if (fetchError || !portfolio) {
      throw new AppError(404, 'Portfolio not found', 'PORTFOLIO_NOT_FOUND');
    }

    if (portfolio.is_locked) {
      throw new AppError(400, 'Cannot update locked portfolio', 'PORTFOLIO_LOCKED');
    }

    // Delete existing artists
    await supabase.from('portfolio_artists').delete().eq('portfolio_id', portfolioId);

    // Add new artists
    const portfolioArtists = updateData.artistIds.map((artistId, index) => ({
      portfolio_id: portfolioId,
      artist_id: artistId,
      position: index + 1,
      score_contribution: 0,
    }));

    const { error: insertError } = await supabase
      .from('portfolio_artists')
      .insert(portfolioArtists);

    if (insertError) {
      throw new AppError(500, 'Failed to update portfolio', 'DATABASE_ERROR', insertError);
    }

    return this.getUserPortfolio(userId, portfolio.week_starting);
  }

  /**
   * Get portfolio history
   */
  async getPortfolioHistory(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('user_portfolios')
      .select(
        `
        *,
        portfolio_artists (
          *,
          artist:artists (id, name, image_url)
        )
      `
      )
      .eq('user_id', userId)
      .order('week_starting', { ascending: false })
      .limit(limit);

    if (error) {
      throw new AppError(500, 'Failed to fetch portfolio history', 'DATABASE_ERROR', error);
    }

    return data;
  }

  /**
   * Lock portfolio (called automatically on Friday)
   */
  async lockPortfolio(portfolioId: string) {
    const { error } = await supabase
      .from('user_portfolios')
      .update({
        is_locked: true,
        locked_at: new Date().toISOString(),
      })
      .eq('id', portfolioId);

    if (error) {
      throw new AppError(500, 'Failed to lock portfolio', 'DATABASE_ERROR', error);
    }
  }
}

export const portfolioService = new PortfolioService();
