// apps/backend/src/routes/api.routes.ts

import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  weekController,
  artistController,
  voteController,
  lineupController,
  userController,
  leaderboardController,
  challengeController,
  subscriptionController,
} from '../controllers';

const router = express.Router();

// ============================================
// WEEK ROUTES
// ============================================
router.get('/week/current', weekController.getCurrentWeek);
router.get('/week/history', weekController.getWeekHistory);
router.get('/week/:id', weekController.getWeekById);
router.post('/week/create', authMiddleware, weekController.createWeek); // Admin only

// ============================================
// ARTIST ROUTES
// ============================================
router.get('/artists/leaderboard', artistController.getLeaderboard);
router.get('/artists/pool/current', artistController.getCurrentPool);
router.get('/artists/top50', artistController.getTop50);
router.get('/artists/search', artistController.searchArtists);
router.get('/artists/:id', artistController.getArtistProfile);
router.get('/artists/:id/history', artistController.getArtistHistory);
router.post('/artists/submit-track', authMiddleware, artistController.submitTrack);

// ============================================
// VOTING ROUTES
// ============================================
router.post('/votes', authMiddleware, voteController.submitVote);
router.get('/votes/my-votes', authMiddleware, voteController.getMyVotes);
router.get('/votes/remaining', authMiddleware, voteController.getRemainingVotes);
router.get('/votes/top-voted', voteController.getTopVoted);
router.delete('/votes/:id', authMiddleware, voteController.removeVote);

// ============================================
// LINEUP ROUTES
// ============================================
router.get('/lineups/my-lineup', authMiddleware, lineupController.getMyLineup);
router.get('/lineups/history', authMiddleware, lineupController.getLineupHistory);
router.post('/lineups', authMiddleware, lineupController.saveLineup);
router.put('/lineups/:id/lock', authMiddleware, lineupController.lockLineup);
router.get('/lineups/:id/score', authMiddleware, lineupController.getLineupScore);
router.delete('/lineups/:id', authMiddleware, lineupController.deleteLineup);

// ============================================
// USER ROUTES
// ============================================
router.get('/users/me', authMiddleware, userController.getProfile);
router.patch('/users/me', authMiddleware, userController.updateProfile);
router.get('/users/me/stats', authMiddleware, userController.getStats);
router.get('/users/me/wallet', authMiddleware, userController.getWallet);
router.post('/users/me/withdraw', authMiddleware, userController.requestWithdrawal);
router.get('/users/:id/public', userController.getPublicProfile);

// ============================================
// LEADERBOARD ROUTES
// ============================================
router.get('/fans/leaderboard', leaderboardController.getTopFans);
router.get('/leaderboard/live', leaderboardController.getLiveLeaderboard);
router.get('/leaderboard/global', leaderboardController.getGlobalLeaderboard);

// ============================================
// CHALLENGE ROUTES
// ============================================
router.get('/challenges/active', authMiddleware, challengeController.getActive);
router.get('/challenges/:id', challengeController.getChallengeDetails);
router.post('/challenges/:id/enter', authMiddleware, challengeController.enter);
router.get('/challenges/:id/my-entry', authMiddleware, challengeController.getMyEntry);

// ============================================
// SUBSCRIPTION ROUTES
// ============================================
router.get('/subscription', authMiddleware, subscriptionController.getCurrent);
router.post('/subscription/upgrade', authMiddleware, subscriptionController.upgrade);
router.post('/subscription/cancel', authMiddleware, subscriptionController.cancel);
router.get('/subscription/tiers', subscriptionController.getTiers);

export default router;
