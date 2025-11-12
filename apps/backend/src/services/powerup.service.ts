// apps/backend/src/services/powerup.service.ts

import { supabase } from '../config/database';

export class PowerupService {
  /**
   * Get all available powerups
   */
  async getAvailablePowerups() {
    const { data, error } = await supabase
      .from('powerups')
      .select('*')
      .eq('is_active', true)
      .order('cost', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get user's powerups
   */
  async getUserPowerups(userId: string, weekId?: string) {
    let query = supabase
      .from('user_powerups')
      .select(
        `
        *,
        powerup:powerups(*)
      `
      )
      .eq('user_id', userId)
      .eq('is_used', false);

    if (weekId) {
      query = query.eq('week_id', weekId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  /**
   * Purchase a powerup
   */
  async purchasePowerup(userId: string, powerupId: string) {
    // Get powerup details
    const { data: powerup } = await supabase
      .from('powerups')
      .select('*')
      .eq('id', powerupId)
      .single();

    if (!powerup) throw new Error('Powerup not found');
    if (!powerup.is_active) throw new Error('Powerup not available');

    // Check wallet balance
    const { WalletService } = await import('./wallet.service');
    const walletService = new WalletService();
    const wallet = await walletService.getUserWallet(userId);

    if (wallet.balance < powerup.cost) {
      throw new Error('Insufficient funds');
    }

    // Deduct cost
    await walletService.deductFunds(userId, powerup.cost, 'purchase', powerupId);

    // Add powerup to user
    const { data, error } = await supabase
      .from('user_powerups')
      .insert({
        user_id: userId,
        powerup_id: powerupId,
        purchased_at: new Date().toISOString(),
        is_used: false,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Apply powerup to lineup
   */
  async applyPowerup(userId: string, userPowerupId: string, lineupId: string) {
    // Get user powerup
    const { data: userPowerup } = await supabase
      .from('user_powerups')
      .select('*, powerup:powerups(*)')
      .eq('id', userPowerupId)
      .eq('user_id', userId)
      .single();

    if (!userPowerup) throw new Error('Powerup not found');
    if (userPowerup.is_used) throw new Error('Powerup already used');

    // Verify lineup belongs to user
    const { data: lineup } = await supabase
      .from('fan_lineups')
      .select('*')
      .eq('id', lineupId)
      .eq('user_id', userId)
      .single();

    if (!lineup) throw new Error('Lineup not found');
    if (lineup.is_locked) throw new Error('Cannot apply powerup to locked lineup');

    // Mark powerup as used
    await supabase
      .from('user_powerups')
      .update({
        is_used: true,
        used_at: new Date().toISOString(),
        week_id: lineup.week_id,
        lineup_id: lineupId,
      })
      .eq('id', userPowerupId);

    // Apply powerup effect based on type
    await this.applyPowerupEffect(userPowerup.powerup, lineupId);

    return userPowerup;
  }

  /**
   * Apply powerup effect to lineup
   */
  private async applyPowerupEffect(powerup: any, lineupId: string) {
    const effect = powerup.effect_json;

    switch (powerup.type) {
      case 'score_multiplier':
        // This will be applied during score calculation
        // Store metadata on lineup
        await supabase
          .from('fan_lineups')
          .update({
            metadata: { powerup_multiplier: effect.multiplier },
          })
          .eq('id', lineupId);
        break;

      case 'extra_pick':
        // Allow one extra artist in lineup
        // This is checked in lineup validation
        break;

      case 'score_boost':
        // Add flat points to total score
        const { data: lineup } = await supabase
          .from('fan_lineups')
          .select('total_score')
          .eq('id', lineupId)
          .single();

        await supabase
          .from('fan_lineups')
          .update({
            total_score: (lineup?.total_score || 0) + effect.boost_amount,
          })
          .eq('id', lineupId);
        break;
    }
  }

  /**
   * Create new powerup (Admin)
   */
  async createPowerup(data: {
    name: string;
    description: string;
    type: string;
    effect_json: any;
    cost: number;
    icon_url?: string;
  }) {
    const { data: powerup, error } = await supabase
      .from('powerups')
      .insert({
        ...data,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;
    return powerup;
  }

  /**
   * Get powerup types/templates
   */
  getPowerupTypes() {
    return [
      {
        type: 'captain_boost',
        name: 'Captain Boost',
        description: 'Increase captain multiplier to 2x instead of 1.5x',
        effect: { multiplier: 2.0 },
        cost: 50,
      },
      {
        type: 'double_points',
        name: 'Double Points',
        description: 'Double all points for one artist',
        effect: { target: 'single_artist', multiplier: 2.0 },
        cost: 75,
      },
      {
        type: 'safety_net',
        name: 'Safety Net',
        description: 'If artist scores 0, get minimum 10 points',
        effect: { minimum_score: 10 },
        cost: 30,
      },
      {
        type: 'extra_pick',
        name: 'Extra Pick',
        description: 'Add one additional artist to your lineup',
        effect: { extra_picks: 1 },
        cost: 100,
      },
      {
        type: 'score_insurance',
        name: 'Score Insurance',
        description: 'Guarantee minimum 80% of top score',
        effect: { guarantee_percentage: 0.8 },
        cost: 150,
      },
    ];
  }
}
