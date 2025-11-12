## **ARCHITECTURE OVERVIEW**

### The Big Picture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                    (Next.js / React)                         │
└──────────────────────┬──────────────────────────────────────┘
                       │ API Calls (HTTP/REST)
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    EXPRESS BACKEND                           │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              API Routes (Router)                    │    │
│  │  - Week routes                                      │    │
│  │  - Artist routes                                    │    │
│  │  - Voting routes                                    │    │
│  │  - Lineup routes                                    │    │
│  │  - User routes                                      │    │
│  └────────────┬───────────────────────────────────────┘    │
│               │                                              │
│  ┌────────────▼───────────────────────────────────────┐    │
│  │           Middleware Layer                          │    │
│  │  - Authentication (verify JWT)                      │    │
│  │  - Authorization (check permissions)                │    │
│  │  - Validation (validate request data)               │    │
│  │  - Rate Limiting                                    │    │
│  │  - Error Handling                                   │    │
│  └────────────┬───────────────────────────────────────┘    │
│               │                                              │
│  ┌────────────▼───────────────────────────────────────┐    │
│  │              Controllers                            │    │
│  │  - Parse requests                                   │    │
│  │  - Call services                                    │    │
│  │  - Format responses                                 │    │
│  └────────────┬───────────────────────────────────────┘    │
│               │                                              │
│  ┌────────────▼───────────────────────────────────────┐    │
│  │              Services (Business Logic)              │    │
│  │  - Week Service                                     │    │
│  │  - Artist Service                                   │    │
│  │  - Voting Service                                   │    │
│  │  - Lineup Service                                   │    │
│  │  - Pool Service                                     │    │
│  │  - Subscription Service                             │    │
│  │  - Challenge Service                                │    │
│  │  - User Service                                     │    │
│  │  - Wallet Service                                   │    │
│  │  - Leaderboard Service                              │    │
│  └────────────┬───────────────────────────────────────┘    │
│               │                                              │
└───────────────┼──────────────────────────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────────────────────────┐
│                      SUPABASE DATABASE                       │
│  - PostgreSQL with Row Level Security                       │
│  - 51 tables organized by domain                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      CRON JOBS (Separate Service)           │
│  - Friday 8am: Create new week                              │
│  - Monday 6am: Calculate Top 50                             │
│  - Thursday 10am: Lock lineups                              │
│  - Thursday 7pm: Distribute payouts                         │
└─────────────────────────────────────────────────────────────┘
```

---

## **LAYER-BY-LAYER BREAKDOWN**

### **1. Routes Layer (Traffic Cop)**

**Purpose:** Receive incoming HTTP requests and direct them to the right controller

**Example:**

```typescript
// User makes request: POST /api/votes
// Route receives it:
router.post("/votes", authMiddleware, voteController.submitVote);

// What happens:
// 1. Request comes in
// 2. authMiddleware runs first (checks JWT token)
// 3. If auth passes, call voteController.submitVote
// 4. Controller handles the rest
```

**Key Routes File Structure:**

```
/api
  /week
    /current          → Get current week info
  /artists
    /leaderboard      → Get artist rankings
    /:id              → Get specific artist
  /votes              → Submit vote
    /my-votes         → Get user's votes
  /lineups
    /my-lineup        → Get user's lineup
                      → POST: Save lineup
  /users/me           → Get/update profile
    /wallet           → Get wallet info
```

---

### **2. Middleware Layer (Security Guards)**

**Purpose:** Intercept requests before they reach controllers to validate, authenticate, and authorize

**Auth Middleware:**

```typescript
// apps/backend/src/middleware/auth.middleware.ts

Request comes in with header:
Authorization: Bearer eyJhbGc...  (JWT token)

Auth Middleware:
1. Extract token from header
2. Verify with Supabase: supabase.auth.getUser(token)
3. If valid:
   - Attach user info to request: req.user = { id, email }
   - Call next() → continue to controller
4. If invalid:
   - Return 401 Unauthorized
   - Stop request
```

**Validation Middleware:**

```typescript
// Checks if request body has required fields
Request: POST /api/lineups
Body: { artist_ids: ["id1", "id2", "id3"] }

Validation:
1. Check artist_ids exists
2. Check it's an array
3. Check array length (1-10)
4. Check each ID is valid UUID
5. If all pass → next()
6. If fail → return 400 Bad Request
```

---

### **3. Controllers Layer (Request Handlers)**

**Purpose:** Handle HTTP requests/responses, call services, format data

**Example Controller Flow:**

```typescript
// voteController.submitVote

1. RECEIVE request
   - req.user = { id: "user-123", email: "fan@example.com" }
   - req.body = { artist_id: "artist-456" }

2. EXTRACT data
   - const userId = req.user.id
   - const artistId = req.body.artist_id

3. CALL service (business logic)
   - const vote = await votingService.submitVote(userId, artistId, weekId)

4. FORMAT response
   - res.json({ success: true, data: vote })

5. HANDLE errors
   - If service throws error, catch it and return appropriate status code
```

**Controllers DON'T contain business logic** - they just:

- Parse requests
- Call services
- Format responses
- Handle errors

---

### **4. Services Layer (Business Logic Brain)**

This is where the **real magic happens**. Services contain all business logic and interact with the database.

**Service Relationships:**

```
┌──────────────────────────────────────────────────────────────┐
│                      WEEK SERVICE                             │
│                    (Central Coordinator)                      │
│                                                               │
│  - getCurrentWeek()                                           │
│  - getCurrentPhase()                                          │
│  - isVotingOpen()                                             │
│  - isPicksOpen()                                              │
│  - areLineupsLocked()                                         │
└───────┬──────────────────┬──────────────────┬────────────────┘
        │                  │                  │
        ↓                  ↓                  ↓
┌───────────────┐  ┌───────────────┐  ┌──────────────┐
│ ARTIST SERVICE│  │ VOTING SERVICE│  │LINEUP SERVICE│
└───────┬───────┘  └───────┬───────┘  └──────┬───────┘
        │                  │                  │
        │      ┌───────────┼──────────────────┘
        │      │           │
        ↓      ↓           ↓
┌────────────────────────────────────────┐
│       LEADERBOARD SERVICE               │
│  (Aggregates data from above)          │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│         POOL SERVICE                    │
│  (Calculates payouts)                  │
│      ↓                                 │
│  WALLET SERVICE                        │
│  (Updates balances)                    │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│        USER SERVICE                     │
│  (Manages profiles & stats)            │
│      ↓                                 │
│  SUBSCRIPTION SERVICE                  │
│  (Controls tier limits)                │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│      CHALLENGE SERVICE                  │
│  (Separate competitions)               │
└────────────────────────────────────────┘
```

---

## **HOW SERVICES TALK TO EACH OTHER**

### Example 1: Voting Process

```typescript
USER SUBMITS VOTE:
Frontend → POST /api/votes { artist_id: "artist-456" }

↓

1. AUTH MIDDLEWARE
   - Verifies JWT token
   - Attaches req.user = { id: "user-123" }

↓

2. VOTE CONTROLLER receives request
   - Extracts: userId, artistId

↓

3. VOTE CONTROLLER calls VOTING SERVICE
   votingService.submitVote(userId, artistId, weekId)

↓

4. VOTING SERVICE logic:

   A. Call WEEK SERVICE to validate
      weekService.getCurrentWeek() → Get week
      weekService.isVotingOpen(week) → Check if voting window is open

   B. Call SUBSCRIPTION SERVICE
      subscriptionService.getUserSubscription(userId)
      → Check vote limits (Free: 10, Standard: 20, Premium: 50)

   C. Query database
      → Count existing votes for this week
      → If < limit, continue
      → If >= limit, throw error

   D. Check rate limiting
      → Query votes in last minute
      → If > 10 votes/minute, throw error

   E. Insert vote into database
      supabase.from('votes').insert(...)

   F. Update artist_week table
      → Increment vote count for this artist

   G. Return vote object

↓

5. VOTE CONTROLLER receives result
   - Formats response
   - Returns to frontend

↓

FRONTEND receives response and updates UI
```

---

### Example 2: Creating a Lineup (Complex Service Interaction)

```typescript
USER SAVES LINEUP:
Frontend → POST /api/lineups { artist_ids: ["a1", "a2", "a3", "a4", "a5"] }

↓

LINEUP CONTROLLER calls LINEUP SERVICE

↓

LINEUP SERVICE.saveLineup():

1. Validate Week
   weekService.getCurrentWeek()
   weekService.isPicksOpen(week)
   → If not open, throw error

2. Check Subscription Limits
   subscriptionService.getUserSubscription(userId)
   → Free/Standard: 5 picks
   → Premium: 10 picks
   → If artist_ids.length > limit, throw error

3. Validate Artists
   artistService.getTop50(weekId)
   → Ensure all selected artists are in Top 50
   → Ensure no duplicates

4. Check Existing Lineup
   Query fan_lineups table
   → If exists and is_locked = true, throw error
   → If exists and is_locked = false, update it
   → If doesn't exist, create new

5. Save Lineup
   A. Insert/Update fan_lineups record
   B. Delete old lineup_artists (if updating)
   C. Insert new lineup_artists records

6. Calculate Initial Score
   lineupService.calculateLineupScore(lineupId)
   → This calls ARTIST SERVICE to get current scores
   → Sums up scores with captain multiplier

7. Return Complete Lineup Object
   → Include artist details
   → Include current scores
   → Include rank (if available)
```

---

## **THE WEEKLY CYCLE - HOW EVERYTHING CONNECTS**

This is the **heartbeat** of your application. Let me trace through one complete week:

### **Phase 1: Friday 8:00 AM ET - Week Creation**

```
CRON JOB triggers:

1. WEEK SERVICE.createNewWeek()
   - Creates new record in weeks table
   - Sets all timestamps (voting_open_at, picks_open_at, etc.)
   - Status = 'active'

↓

2. ARTIST SERVICE.publishWeeklyPool(weekId, 100)

   A. Get new submissions:
      → Query artist_submissions where status='pending'
      → Get ~50 new tracks

   B. Get past performers:
      → Query artist_week from last 4 weeks
      → Order by score
      → Get top 50

   C. Mix and select 100:
      → Combine both lists
      → Deduplicate
      → Select top 100

   D. Insert into week_artists table:
      → Links week → artists
      → Set source_flag: 'new' or 'past_performer'
      → Set is_top_50 = false (not yet calculated)
      → Set eligible_for_picks = false

   E. Create artist_week records:
      → One record per artist per week
      → Initialize: score=0, votes=0, streams=0
      → This is where weekly stats are tracked

↓

3. RESULT:
   - Week is live
   - 100 artists are in the pool
   - Users can now start voting
```

---

### **Phase 2: Friday 8:00 AM - Sunday 11:59 PM - Voting Window**

```
USERS VOTE:

Frontend → POST /api/votes { artist_id: "xyz" }

↓

VOTING SERVICE.submitVote():

1. Validate voting window
   weekService.isVotingOpen() → TRUE

2. Check vote limits
   subscriptionService.getUserSubscription()
   → Count existing votes
   → If under limit, proceed

3. Insert vote
   supabase.from('votes').insert({
     user_id: userId,
     artist_id: artistId,
     week_id: weekId,
     vote_count: 1
   })

4. Update artist_week
   → Increment votes for this artist
   → artist_week.votes += 1

↓

RESULT:
- Vote is recorded
- Artist's vote count increases
- This happens thousands of times over the weekend
```

---

### **Phase 3: Monday 6:00 AM - Calculate Top 50**

```
CRON JOB triggers:

ARTIST SERVICE.calculateTop50(weekId):

1. Aggregate all votes
   → Get all votes for this week
   → Group by artist_id
   → Sum vote_count

2. Fetch latest metrics
   → Call Chartmetric API for each artist
   → Get: streams, engagement, growth

3. Update artist_week records
   → artist_week.streams = latestData.streams
   → artist_week.engagement = latestData.engagement
   → artist_week.votes = aggregatedVotes

4. Calculate composite scores
   For each artist:
   score = (votes × 0.4) + (streams/1000 × 0.3) +
           (engagement × 0.2) + (growth × 0.1)

5. Sort and select Top 50
   → Order by score DESC
   → Take top 50

6. Update database
   For each top 50 artist:
   → artist_week.score = calculated_score
   → artist_week.rank = position (1-50)
   → artist_week.is_top_50 = true
   → artist_week.status = 'Hot Streak'|'Rising'|etc

   → week_artists.is_top_50 = true
   → week_artists.eligible_for_picks = true

↓

RESULT:
- Top 50 artists are identified
- They're marked as pickable
- Fans can now create lineups
```

---

### **Phase 4: Monday 6:00 AM - Thursday 10:00 AM - Lineup Creation**

```
USERS CREATE LINEUPS:

Frontend → POST /api/lineups { artist_ids: [...] }

↓

LINEUP SERVICE.saveLineup():

1. Validate picks window
   weekService.isPicksOpen() → TRUE

2. Get eligible artists
   artistService.getTop50(weekId)
   → Returns 50 artists where eligible_for_picks=true

3. Validate selection
   → All artist_ids must be in Top 50
   → No duplicates
   → Respect pick limit (5 or 10)

4. Save lineup
   → Insert into fan_lineups
   → Insert into lineup_artists (positions 1-10)

5. Calculate real-time score
   For each artist in lineup:
   → Get current artist_week.score
   → Apply captain multiplier if is_captain
   → Sum total
   → Update fan_lineups.total_score

↓

RESULT:
- Lineup is saved
- User can edit until Thursday 10am
- Scores update in real-time as artist metrics change
```

---

### **Phase 5: Thursday 10:00 AM - Lock Lineups & Finalize Scores**

```
CRON JOB triggers:

1. LINEUP SERVICE.lockAllLineups(weekId)
   → Update fan_lineups SET is_locked=true, locked_at=NOW()
   → WHERE week_id=weekId AND is_locked=false

↓

2. ARTIST SERVICE.finalizeScores(weekId)

   A. Fetch latest metrics from APIs
      → Final streams count
      → Final engagement metrics

   B. Recalculate composite scores
      → Use latest data
      → Calculate final score

   C. Update artist_week records
      → artist_week.score = final_score
      → artist_week.streams = final_streams
      → artist_week.engagement = final_engagement

↓

3. LINEUP SERVICE.calculateAllScores(weekId)
   For each lineup:
   → Sum up artist scores
   → Apply captain bonus
   → Update fan_lineups.total_score

↓

4. LINEUP SERVICE.calculateRankings(weekId)
   → Order all lineups by total_score DESC
   → Assign ranks: fan_lineups.rank = 1, 2, 3...

↓

RESULT:
- All lineups are locked
- Final scores are calculated
- Rankings are determined
- Ready for live show
```

---

### **Phase 6: Thursday 7:00 PM - Live Show & Payouts**

```
CRON JOB triggers:

1. WEEK SERVICE.updatePhase('live_show')
   → weeks.phase = 'live_show'

↓

2. POOL SERVICE.distributePayouts(weekId):

   A. Calculate prize pool
      poolService.calculateWeeklyPool(weekId)

      Sources:
      → Entry fees (from transactions)
      → Sponsor contributions (from prize_pools)

      Total = $20,000 (example)
      Distribution:
      → 60% to fans ($12,000)
      → 30% to artists ($6,000)
      → 5% platform ($1,000)
      → 5% bonus ($1,000)

   ↓

   B. Distribute to fans (Top 100)
      poolService.distributeFanPayouts(weekId, lineups, $12,000)

      Payout curve:
      → Rank 1: 20% = $2,400
      → Rank 2: 12% = $1,440
      → Rank 3: 8% = $960
      → Rank 4-10: 5% each
      → Rank 11-50: 1% each
      → Rank 51-100: 0.3% each

      For each payout:
      1. Create transaction record
         transactions.insert({
           user_id: user.id,
           type: 'payout',
           amount: calculated_amount,
           week_id: weekId
         })

      2. Update wallet
         walletService.addFunds(user.id, amount)
         → wallets.balance += amount

   ↓

   C. Distribute to artists (Top 10)
      poolService.distributeArtistPayouts(weekId, artists, $6,000)

      Similar process:
      → Rank 1: 30% = $1,800
      → Rank 2: 20% = $1,200
      → Rank 3: 15% = $900
      → etc.

   ↓

   D. Mark pool as distributed
      → prize_pools.distributed = true

↓

3. WEEK SERVICE.completeWeek(weekId)
   → weeks.status = 'completed'

↓

RESULT:
- Prize money is distributed
- Wallets are updated
- Week is complete
- Ready for next week on Friday
```

---

## **DATA FLOW DIAGRAMS**

### How Data Moves Through Tables

```
USER JOURNEY: Fan Creates Lineup

1. User signs up
   ↓
   users table
   ├─ id: user-123
   ├─ email: fan@example.com
   ├─ display_name: "Cool Fan"
   └─ tier: Bronze

2. System creates subscription
   ↓
   subscriptions table
   ├─ user_id: user-123  ←──────┐
   ├─ tier: Free                │ REFERENCES
   ├─ picks_limit: 5            │
   └─ votes_limit: 10           │
                                │
3. System creates wallet        │
   ↓                            │
   wallets table                │
   ├─ user_id: user-123  ←──────┤
   └─ balance: 0                │
                                │
4. User votes for artists       │
   ↓                            │
   votes table                  │
   ├─ user_id: user-123  ←──────┤
   ├─ artist_id: artist-456  ←──┼─────┐
   ├─ week_id: week-789  ←──────┼───┐ │
   └─ vote_count: 1             │   │ │
                                │   │ │
5. Top 50 calculated            │   │ │
   ↓                            │   │ │
   artist_week table            │   │ │
   ├─ artist_id: artist-456  ←──┘   │ │
   ├─ week_id: week-789  ←──────────┘ │
   ├─ votes: 1500                     │
   ├─ score: 94.3                     │
   ├─ rank: 2                         │
   └─ is_top_50: true                 │
                                      │
6. User creates lineup                │
   ↓                                  │
   fan_lineups table                  │
   ├─ id: lineup-111                  │
   ├─ user_id: user-123  ←────────────┤
   ├─ week_id: week-789  ←────────────┤
   ├─ total_score: 448.5              │
   ├─ rank: 15                        │
   └─ is_locked: true                 │
                                      │
7. Lineup details                     │
   ↓                                  │
   lineup_artists table               │
   ├─ lineup_id: lineup-111  ←────┐   │
   ├─ artist_id: artist-456  ←────┼───┘
   ├─ position: 1                 │
   ├─ score_contribution: 94.3    │
   └─ is_captain: true            │
                                  │
8. Payout calculated               │
   ↓                               │
   transactions table              │
   ├─ user_id: user-123  ←─────────┘
   ├─ type: 'payout'
   ├─ amount: 127.50
   ├─ week_id: week-789
   └─ ref_id: lineup-111

9. Wallet updated
   ↓
   wallets table
   ├─ user_id: user-123
   └─ balance: 127.50  ← Updated!
```

---

## **KEY RELATIONSHIPS SUMMARY**

### 1. **Week is the Anchor**

Everything revolves around the current week:

- Artists are in a pool FOR a week (week_artists)
- Votes are cast IN a week (votes.week_id)
- Lineups are created FOR a week (fan_lineups.week_id)
- Scores are calculated PER week (artist_week)
- Payouts are distributed PER week (prize_pools.week_id)

### 2. **Services Call Each Other**

```
Week Service
  ↓ Used by →
VotingService, LineupService, ArtistService, PoolService

Subscription Service
  ↓ Used by →
VotingService (check vote limits)
LineupService (check pick limits)
ChallengeService (check premium access)

Artist Service
  ↓ Used by →
LineupService (validate pickable artists)
LeaderboardService (get artist rankings)
PoolService (get artists for payouts)

Wallet Service
  ↓ Used by →
PoolService (distribute payouts)
UserService (show balance in profile)
```

### 3. **Database Referential Integrity**

```
weeks (id)
  ↓ Referenced by
  ├─ week_artists (week_id)
  ├─ artist_week (week_id)
  ├─ votes (week_id)
  ├─ fan_lineups (week_id)
  ├─ prize_pools (week_id)
  └─ challenges (week_id)

users (id)
  ↓ Referenced by
  ├─ subscriptions (user_id)
  ├─ votes (user_id)
  ├─ fan_lineups (user_id)
  ├─ wallets (user_id)
  ├─ transactions (user_id)
  └─ challenge_entries (user_id)

artists (id)
  ↓ Referenced by
  ├─ week_artists (artist_id)
  ├─ artist_week (artist_id)
  ├─ votes (artist_id)
  └─ lineup_artists (artist_id)
```

---

## **EXAMPLE: COMPLETE USER FLOW**

Let me trace one user from signup to earning money:

```
DAY 1 - FRIDAY (Registration)
==========================

1. User signs up via Supabase Auth
   → Supabase creates auth.users record
   → Frontend receives JWT token

2. Frontend calls POST /api/users/setup
   → UserService.createUserProfile()
     - Creates users record
     - Creates subscriptions record (Free tier)
     - Creates wallets record (balance: 0)

3. User browses artist pool
   → GET /api/artists/pool/current
   → ArtistService.getWeeklyPool()
     - Queries week_artists for current week
     - Returns 100 artists


DAY 1-3 - WEEKEND (Voting)
==========================

4. User votes for favorite artists
   → POST /api/votes { artist_id: "xyz" }
   → VotingService.submitVote()
     - Checks: WeekService.isVotingOpen() ✓
     - Checks: SubscriptionService limits (10 votes) ✓
     - Inserts vote into votes table
     - Updates artist_week.votes += 1

5. User votes 10 times (reaches limit)
   → 11th vote fails with "Vote limit exceeded"


DAY 4 - MONDAY (Lineup Creation)
================================

6. User sees Top 50 announced
   → GET /api/artists/top50
   → ArtistService.getTop50()
     - Queries artist_week WHERE is_top_50=true

7. User creates lineup
   → POST /api/lineups { artist_ids: [a1,a2,a3,a4,a5] }
   → LineupService.saveLineup()
     - Checks: WeekService.isPicksOpen() ✓
     - Checks: SubscriptionService limits (5 picks) ✓
     - Checks: All artists in Top 50 ✓
     - Creates fan_lineups record
     - Creates 5 lineup_artists records
     - Calculates initial score: 425.7


DAY 4-7 - WAITING
=================

8. User checks lineup score daily
   → GET /api/lineups/my-lineup
   → LineupService.getUserLineup()
     - Returns lineup with current scores
     - Scores update as artist metrics change
     - Score goes: 425.7 → 431.2 → 429.8


DAY 7 - THURSDAY 10AM (Lock)
=============================

9. System locks lineups
   → CRON: LineupService.lockAllLineups()
     - fan_lineups.is_locked = true
     - User can no longer edit

10. System finalizes scores
    → CRON: ArtistService.finalizeScores()
      - Fetches latest API data
      - Recalculates all scores
      - User's final score: 448.5

11. System calculates rankings
    → CRON: LineupService.calculateRankings()
      - Sorts all lineups by score
      - User's rank: 15 out of 523


DAY 7 - THURSDAY 7PM (Payout)
==============================

12. Live show announces winners
    → CRON: PoolService.distributePayouts()

      Prize pool: $20,000
      Fan share (60%): $12,000

      Rank 15 payout: $120 (1% of fan share)

      A. Create transaction:
         transactions.insert({
           user_id: user-123,
           type: 'payout',
           amount: 120,
           week_id: week-789
         })

      B. Update wallet:
         wallets.balance = 0 + 120 = $120

13. User sees earnings
    → GET /api/users/me/wallet
    → WalletService.getUserWallet()
      - balance: $120
      - transactions: [{ amount: 120, date: ... }]


NEXT WEEK
=========

14. User upgrades to Premium
    → POST /api/subscription/upgrade { tier: "Premium" }
    → SubscriptionService.upgradeTier()
      - subscriptions.tier = 'Premium'
      - subscriptions.picks_limit = 10
      - subscriptions.votes_limit = 50

15. Next week, user can pick 10 artists instead of 5
    → Repeat cycle...
```

---

## **WHY THIS ARCHITECTURE?**

### **Separation of Concerns**

1. **Routes** only route → don't contain logic
2. **Controllers** only coordinate → don't contain business rules
3. **Services** contain all logic → reusable across controllers
4. **Database** only stores data → enforces relationships

### **Benefits:**

✅ **Testable:** Each service can be tested independently
✅ **Maintainable:** Change one service without affecting others
✅ **Scalable:** Add new features without rewriting existing code
✅ **Clear:** Easy to understand data flow
✅ **Debuggable:** Can trace issues through layers

### **Example of Good Separation:**

```typescript
// BAD - Everything in controller
async submitVote(req, res) {
  const userId = req.user.id;
  const artistId = req.body.artist_id;

  // Get week (controller shouldn't do this)
  const week = await supabase.from('weeks').select()...

  // Check voting window (controller shouldn't do this)
  if (new Date() > new Date(week.voting_close_at)) {
    return res.status(400).json({ error: 'Voting closed' });
  }

  // Check subscription (controller shouldn't do this)
  const sub = await supabase.from('subscriptions').select()...

  // Count votes (controller shouldn't do this)
  const count = await supabase.from('votes').count()...

  // ... etc
}

// GOOD - Separated
async submitVote(req, res) {
  const userId = req.user.id;
  const artistId = req.body.artist_id;

  // Controller just coordinates
  const vote = await votingService.submitVote(userId, artistId);
  res.json({ success: true, data: vote });
}
```

---
