import { Router } from 'express';

import { walletController } from '@/controllers/wallet.controller';

const router = Router();

// Get wallet
router.get('/', walletController.getWallet);

// Get payout history
router.get('/payouts', walletController.getPayoutHistory);

// Get transactions
router.get('/transactions', walletController.getTransactions);

// Get referrals
router.get('/referrals', walletController.getReferrals);

export default router;
