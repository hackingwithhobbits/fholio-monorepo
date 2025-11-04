import { Router } from 'express';

import { userController } from '@/controllers/user.controller';

const router = Router();

// Get profile
router.get('/me', userController.getProfile);

// Update profile
router.patch('/me', userController.updateProfile);

// Get stats
router.get('/me/stats', userController.getStats);

export default router;
