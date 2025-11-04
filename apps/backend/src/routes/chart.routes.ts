import { Router } from 'express';

import { chartController } from '@/controllers/chart.controller';

const router = Router();

// Get Top 100
router.get('/top100', chartController.getTop100);

// Get leaderboard for specific week
router.get('/leaderboard', chartController.getLeaderboard);

// Get global leaderboard
router.get('/leaderboard/global', chartController.getGlobalLeaderboard);

// Get last week's winners
router.get('/winners/last-week', chartController.getLastWeekWinners);

// Get social stats
router.get('/stats', chartController.getSocialStats);

export default router;
