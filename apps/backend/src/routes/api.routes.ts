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

// Import new controllers
import { powerupController } from '../controllers/powerup.controller';
import { streakController } from '../controllers/streak.controller';
import { referralController } from '../controllers/referral.controller';
import { badgeController } from '../controllers/badge.controller';
import { notificationController } from '../controllers/notification.controller';
import { communityController } from '../controllers/community.controller';
import { liveShowController } from '../controllers/liveshow.controller';
import { supportController } from '../controllers/support.controller';
import { analyticsController } from '../controllers/analytics.controller';

const router = express.Router();

// ============================================
// WEEK ROUTES
// ============================================
router.get('/week/current', weekController.getCurrentWeek);
router.get('/week/history', weekController.getWeekHistory);
router.get('/week/:id', weekController.getWeekById);

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

// ============================================
// POWERUPS ROUTES
// ============================================
router.get('/powerups', powerupController.getAvailable);
router.get('/powerups/my-powerups', authMiddleware, powerupController.getMyPowerups);
router.post('/powerups/:id/purchase', authMiddleware, powerupController.purchase);
router.post('/powerups/apply', authMiddleware, powerupController.apply);

// ============================================
// STREAKS ROUTES
// ============================================
router.get('/streaks/my-streak', authMiddleware, streakController.getMyStreak);
router.get('/streaks/stats', authMiddleware, streakController.getStats);
router.get('/streaks/leaderboard', streakController.getLeaderboard);

// ============================================
// REFERRALS ROUTES
// ============================================
router.get('/referrals/my-code', authMiddleware, referralController.getMyCode);
router.get('/referrals/stats', authMiddleware, referralController.getStats);
router.post('/referrals/apply', authMiddleware, referralController.applyCode);
router.get('/referrals/leaderboard', referralController.getLeaderboard);

// ============================================
// BADGES ROUTES
// ============================================
router.get('/badges', badgeController.getAll);
router.get('/badges/my-badges', authMiddleware, badgeController.getMyBadges);
router.post('/badges/check', authMiddleware, badgeController.checkBadges);

// ============================================
// NOTIFICATIONS ROUTES
// ============================================
router.get('/notifications', authMiddleware, notificationController.getNotifications);
router.get('/notifications/unread-count', authMiddleware, notificationController.getUnreadCount);
router.put('/notifications/:id/read', authMiddleware, notificationController.markAsRead);
router.put('/notifications/read-all', authMiddleware, notificationController.markAllAsRead);
router.delete('/notifications/:id', authMiddleware, notificationController.deleteNotification);
router.get('/notifications/preferences', authMiddleware, notificationController.getPreferences);
router.put('/notifications/preferences', authMiddleware, notificationController.updatePreferences);

// ============================================
// COMMUNITY ROUTES
// ============================================
router.get('/community/feed', communityController.getFeed);
router.post('/community/posts', authMiddleware, communityController.createPost);
router.delete('/community/posts/:id', authMiddleware, communityController.deletePost);
router.post('/community/posts/:id/like', authMiddleware, communityController.likePost);
router.delete('/community/posts/:id/like', authMiddleware, communityController.unlikePost);
router.get('/community/posts/:id/comments', communityController.getComments);
router.post('/community/posts/:id/comments', authMiddleware, communityController.addComment);
router.get('/community/trending', communityController.getTrending);
router.post('/community/share-lineup', authMiddleware, communityController.shareLineup);

// ============================================
// LIVE SHOW ROUTES
// ============================================
router.get('/live-show/current', liveShowController.getCurrent);
router.get('/live-show/:id', liveShowController.getById);
router.get('/live-show/past', liveShowController.getPast);

// ============================================
// SUPPORT ROUTES
// ============================================
router.post('/support/tickets', authMiddleware, supportController.createTicket);
router.get('/support/tickets', authMiddleware, supportController.getMyTickets);
router.get('/support/tickets/:id', authMiddleware, supportController.getTicketDetails);
router.post('/support/tickets/:id/messages', authMiddleware, supportController.addMessage);
router.put('/support/tickets/:id/close', authMiddleware, supportController.closeTicket);
router.get('/support/categories', supportController.getCategories);

// ============================================
// ANALYTICS ROUTES (Some admin-only)
// ============================================
router.get('/analytics/platform', analyticsController.getPlatformStats);
router.get('/analytics/weekly/:weekId', analyticsController.getWeeklyAnalytics);
router.get('/analytics/user/:userId', authMiddleware, analyticsController.getUserAnalytics);

export default router;
