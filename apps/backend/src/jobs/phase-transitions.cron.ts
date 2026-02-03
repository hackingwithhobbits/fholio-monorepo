// apps/backend/src/jobs/phase-transitions.cron.ts

import cron from 'node-cron';
import { PhaseService } from '../services/phase.service';
import { logger } from '../utils/logger';

const phaseService = new PhaseService();

export const startPhaseTransitionCron = () => {
  // Run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      logger.info('Running scheduled phase transitions');

      await phaseService.runPhaseTransitions();

      logger.info('Scheduled phase transitions completed');
    } catch (error: any) {
      logger.error('Scheduled phase transitions failed', { error: error.message });
    }
  });

  logger.info('Phase transition cron job started (runs every 5 minutes)');
};

/**
 * Alternative: Run at specific times
 * Useful for precise timing of important events
 */
export const startPreciseSchedules = () => {
  // Lock lineups at 11:59 PM every Wednesday
  cron.schedule('59 23 * * 3', async () => {
    try {
      logger.info('Running scheduled lineup lock');

      const currentPhase = await phaseService.getCurrentPhase();
      if (currentPhase?.week) {
        await phaseService.lockLineups(currentPhase.week.id);
      }

      logger.info('Scheduled lineup lock completed');
    } catch (error: any) {
      logger.error('Scheduled lineup lock failed', { error: error.message });
    }
  });

  // Finalize scores at 7 AM every Thursday
  cron.schedule('0 7 * * 4', async () => {
    try {
      logger.info('Running scheduled score finalization');

      const currentPhase = await phaseService.getCurrentPhase();
      if (currentPhase?.week) {
        await phaseService.finalizeScores(currentPhase.week.id);
      }

      logger.info('Scheduled score finalization completed');
    } catch (error: any) {
      logger.error('Scheduled score finalization failed', { error: error.message });
    }
  });

  // Distribute prizes at 11:59 PM every Thursday
  cron.schedule('59 23 * * 4', async () => {
    try {
      logger.info('Running scheduled prize distribution');

      const currentPhase = await phaseService.getCurrentPhase();
      if (currentPhase?.week) {
        await phaseService.distributePrizes(currentPhase.week.id);
      }

      logger.info('Scheduled prize distribution completed');
    } catch (error: any) {
      logger.error('Scheduled prize distribution failed', { error: error.message });
    }
  });

  logger.info('Precise schedule cron jobs started');
};
