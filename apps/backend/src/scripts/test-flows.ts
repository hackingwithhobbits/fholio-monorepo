// apps/backend/src/scripts/test-flows.ts

import { WeekService } from '../services/week.service';
import { VotingService } from '../services/voting.service';
import { LineupService } from '../services/lineup.service';

async function testCompleteFlow() {
  console.log('🧪 Testing complete weekly flow...\n');

  const weekService = new WeekService();
  const votingService = new VotingService();
  const lineupService = new LineupService();

  // 1. Get current week
  console.log('1. Getting current week...');
  const week = await weekService.getCurrentWeek();
  console.log('✓ Week:', week?.week_number);

  // 2. Test voting
  console.log('\n2. Testing vote submission...');
  try {
    await votingService.submitVote('test-user-id', 'test-artist-id', week!.id);
    console.log('✓ Vote submitted');
  } catch (error: any) {
    console.log('✗ Vote error:', error.message);
  }

  // 3. Test lineup creation
  console.log('\n3. Testing lineup creation...');
  try {
    await lineupService.saveLineup('test-user-id', week!.id, ['artist-1', 'artist-2', 'artist-3']);
    console.log('✓ Lineup created');
  } catch (error: any) {
    console.log('✗ Lineup error:', error.message);
  }

  console.log('\n✅ Flow test complete');
}

testCompleteFlow();
