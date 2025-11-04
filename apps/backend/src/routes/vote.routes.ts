import { Router } from 'express';

import { voteController } from '@/controllers/vote.controller';

const router = Router();

// Cast a vote
router.post('/', voteController.castVote);

// Get my votes
router.get('/my-votes', voteController.getMyVotes);

// Get remaining votes
router.get('/remaining', voteController.getRemainingVotes);

// Remove a vote
router.delete('/:id', voteController.removeVote);

export default router;
