# Non-Technical Explanation: What's Changing and Why

## 📅 THE WEEKLY GAME CYCLE

Imagine every week is like a mini-season. Here's what happens:

### **FRIDAY (8am)** - The Pool Opens

```
┌─────────────────────────────────────┐
│  🎵 100 SONGS AVAILABLE             │
│  Mix of:                            │
│  • New artist submissions           │
│  • Past performers who did well     │
│  • Algorithm picks                  │
└─────────────────────────────────────┘
```

**What this means for us:** We need a system that manages "weeks" as distinct time periods, not just dates.

---

### **FRIDAY-SUNDAY** - Voting Window

```
Users can VOTE for their favorite songs
┌──────────────────────────────┐
│  Standard users: 10 votes    │
│  Premium users: More votes   │
└──────────────────────────────┘
```

**What this means:** Votes are limited by subscription type. We need to track and enforce these limits.

---

### **MONDAY (6am)** - Top 50 Revealed

```
The 100 songs get scored based on:
• Fan votes
• Streaming numbers
• Engagement metrics

Top 50 → These become PICKABLE for lineups
```

**What this means:** Artists have different scores each week. We can't just have one global score - I need **weekly scores per artist**.

---

### **MONDAY-THURSDAY (10am)** - Build My Lineup

```
This is like drafting my own fantasy team:

Standard users pick:  5 artists
Premium users pick:  10 artists

I can change my picks until Thursday 10am
```

**What this means:** Different users have different pick limits based on their subscription. I need to enforce these rules.

---

### **THURSDAY (10am)** - Lineups LOCK

```
🔒 NO MORE CHANGES ALLOWED

My lineup is locked in.
Now we wait to see how my artists perform.
```

---

### **THURSDAY (7pm)** - LIVE SHOW + RESULTS

```
📺 Live announcement:
  • Top 10 songs
  • Top 10 fans (highest scoring lineups)
  • Winners get paid

💰 Money gets distributed
```

**What this means:** I need automated systems that calculate scores, rank players, and distribute money at specific times.

---

## 💰 HOW MONEY WORKS

Think of it like a prize pool system:

### **Core Prize Pool**

```
Every week, there's a BASE prize pool
Example: $10,000

This gets split among winners:
  Rank 1: Gets $X
  Rank 2: Gets $Y
  ...
  Rank 100: Gets $Z
```

### **Bonus Pools**

```
Sometimes there's EXTRA money:
  • Sponsor challenges (Red Bull adds $25K)
  • Streak bonuses
  • Referral bonuses
```

### **Multiple Pools at Once**

```
Week 5 might have:
  ┌─────────────────────────────┐
  │ Core pool:    $10,000       │
  │ Red Bull:     $25,000       │
  │ Referral:     $5,000        │
  │ ─────────────────────────── │
  │ TOTAL:        $40,000       │
  └─────────────────────────────┘
```

**What this means for me:** I need separate tracking for different money sources and different ways to distribute them (some to fans, some to artists, some split).

---

## 🎮 SUBSCRIPTION TIERS (Freemium Model)

Think of it like a video game with different memberships:

```
FREE TIER
├─ Can vote (10 votes/week)
├─ Can't make lineups
└─ Just spectator mode

STANDARD ($X/month)
├─ 10 votes/week
├─ Pick 5 artists
└─ Compete for prizes

PREMIUM ($Y/month)
├─ More votes (maybe 20/week)
├─ Pick 10 artists
├─ Access to exclusive challenges
└─ Bigger prize opportunities
```

**What this means:** Every user has a subscription tier that controls what they can do. I need to check this before allowing actions.

---

## 🏆 CHALLENGES (Side Quests)

Think of these like mini-games within the main game:

### **Main Game**

```
Pick my lineup, compete for the main prize
```

### **Side Challenges** (Same week, extra prizes)

```
"Most Accurate Picker"
  → Whoever picks the #1 song wins $1K

"Rookie Challenge"
  → Only new artists, separate $5K prize

"Genre Master"
  → All hip-hop lineup, $2K prize

"Vote Streak"
  → Vote 5 weeks in a row, get bonus
```

**What this means:** I need to track multiple competitions happening simultaneously in the same week.

---

## ⚡ POWERUPS (Game Boosters)

Like power-ups in Mario Kart:

```
CAPTAIN MULTIPLIER
My #1 pick scores 2x points
(Instead of 95 points, I get 190)

DOUBLE VOTE
One of my votes counts as 2

BONUS POINTS
Add +10 to my final score
```

Users can:

- Buy these with real money
- Earn them through achievements
- Use them strategically each week

**What this means:** I need an inventory system that tracks what powerups each user has and when they use them.

---

## 🔥 STREAKS (Loyalty Rewards)

Like Snapchat streaks or Duolingo:

```
Week 1: Created lineup ✓
Week 2: Created lineup ✓
Week 3: Created lineup ✓
─────────────────────────
3-week streak! → Earn bonus powerup

Keep going...
Week 5: 5-week streak! → $50 bonus
Week 10: 10-week streak! → $200 bonus
```

**What this means:** I need to track consecutive participation and reward it automatically.

---

## 📊 SCORING SYSTEM EXPLAINED

This is the most important part:

### **Artist Weekly Score**

```
Each artist gets a score (0-100) based on:

Streams:     40% weight
Votes:       25% weight
Engagement:  20% weight
Growth:      15% weight
─────────────────────────
Total: Artist score for the week
```

### **My Lineup Score**

```
I picked 5 artists with these scores:

Artist A: 98 points
Artist B: 87 points (CAPTAIN: 87 × 2 = 174)
Artist C: 92 points
Artist D: 85 points
Artist E: 90 points
──────────────────
Total: 627 points

If Premium (10 picks), I'd have even more points
```

### **Ranking**

```
All fans' scores get sorted:

1. Sarah:  650 points → Wins $1,000
2. Mike:   627 points → Wins $500
3. Me:    625 points → Wins $300
...
```

**What this means:**

- Artists don't have ONE score forever
- Each week they get a NEW score
- My lineup score = sum of my artists' weekly scores
- My rank determines my prize money

---

## 🗓️ WHY "WEEKS" ARE SO IMPORTANT

In my old system, I just had dates. Now I need **Weeks as objects**:

### Old Way (What I Had)

```
Portfolio for "2025-11-03" (just a date)
```

### New Way (What I Need)

```
Week #45
├─ Starts: Friday Nov 1, 8am ET
├─ Voting closes: Sunday Nov 3, 11:59pm ET
├─ Picks open: Monday Nov 4, 6am ET
├─ Lock: Thursday Nov 7, 10am ET
├─ Show: Thursday Nov 7, 7pm ET
├─ Status: "picks_open"
├─ Prize pools attached
├─ Challenges attached
└─ All lineups reference this week
```

**Why:** Because everything revolves around weeks - scores, payouts, challenges, phases. I need a central "Week" that everything else connects to.

---

## 🎯 WHAT THIS MEANS FOR DATA

### Before (What I Had)

```
users → create portfolio → pick artists
```

### After (What I Need)

```
weeks (created by system)
  ↓
users (with subscription tier)
  ↓
check: Do they have picks left?
  ↓
fan_lineups (pick artists from Top 50)
  ↓
lineup_artists (5 or 10 artists)
  ↓
powerups applied?
  ↓
calculate score (from artist_week scores)
  ↓
rank all fans
  ↓
determine prizes (from prize_pools)
  ↓
distribute money (to wallets)
  ↓
create transactions
```

## 💡 KEY INSIGHTS

### 1. **Two Types of Competitions**

```
MAIN GAME (everyone competes)
  Pick my lineup, win main prize

CHALLENGES (opt-in side games)
  Rookie challenge, genre challenge, etc.
  Extra prizes, separate leaderboards
```

### 2. **Two Types of Users**

```
FANS (most users)
  Vote, create lineups, win money

ARTISTS (musicians)
  Submit songs, get scored, receive exposure
```

### 3. **Two Types of Money**

```
INCOMING (where money comes from)
  • Platform pool
  • Sponsor contributions
  • User subscriptions

OUTGOING (where money goes)
  • Winner payouts
  • Artist rewards
  • Referral bonuses
```

## 🚦 THE PRACTICAL IMPACT

### For Users (What They See)

```
NOTHING CHANGES in how it looks
The design stays the same
The experience is smoother
```

### For You (What Changes Behind the Scenes)

```
EVERYTHING changes in how it works
50+ new database tables
100+ new API endpoints
Complex time-based automation
Multi-tier permission system
```

---

## 🎬 EXAMPLE: A User's Journey

Let me walk through a complete user experience:

### **Monday Morning**

```
Sarah logs in (Premium subscriber)

System checks:
  ✅ Has active subscription
  ✅ Week #45 is in "picks_open" phase
  ✅ She has 10 picks available
  ✅ Top 50 artists are visible

She picks 10 artists, makes Artist #3 her Captain
Clicks save
  ✅ Stored in fan_lineups table
  ✅ 10 entries in lineup_artists table
  ✅ Captain flag set on Artist #3
```

### **Tuesday**

```
Sarah changes her mind, swaps 2 artists

System checks:
  ✅ Still before Thursday 10am lock
  ✅ Allows changes

Updates her lineup
```

### **Thursday 10am**

```
SYSTEM AUTO-LOCKS ALL LINEUPS

Sarah's lineup:
  ✅ Marked as locked
  ✅ Timestamp recorded
  ✅ No more changes possible
```

### **Thursday 7pm**

```
SYSTEM RUNS CALCULATIONS:

1. Get all artist_week scores
   Artist #3 (her captain): 95 → 95 × 2 = 190 points
   Artist #7: 88 points
   ... (all 10 artists)

2. Sum Sarah's total: 847 points

3. Rank all fans:
   Position 5 out of 1,247 fans

4. Look up prize for rank 5: $150

5. Create transaction:
   - user_id: Sarah
   - type: payout
   - amount: $150
   - week_id: Week #45

6. Update Sarah's wallet: +$150
```

### **Sarah Checks Results**

```
She sees:
  • Her rank: #5
  • Her winnings: $150
  • Her artists' performance
  • Leaderboard with top 10

Her wallet balance is updated
She can withdraw or use for next week
```

---

## 🔧 WHY SO MANY NEW TABLES?

Each table serves a specific purpose:

```
weeks
  → Because everything happens in weekly cycles

subscriptions
  → Because users have different access levels

artist_week
  → Because artist scores change weekly

prize_pools
  → Because money comes from multiple sources

challenges
  → Because there are side competitions

powerups
  → Because users need inventory items

wallets
  → Because users need balances

transactions
  → Because every money movement needs tracking

streaks
  → Because we reward loyalty

referrals
  → Because users refer friends

live_shows
  → Because each week has a broadcast

week_artists
  → Because we need to know which 100 songs are in the pool
```

**Each table = A piece of the machine**

---

## 📊 VISUAL ANALOGY

### Old System

```
    📱
    │
   Database
    │
  Users ─── Artists
```

### New System

```
                    WEEK
                      │
        ┌─────────────┼─────────────┐
        │             │             │
    PHASE         POOL          CHALLENGES
        │             │             │
    ┌───┴───┐     ┌───┴───┐     ┌───┴───┐
    │       │     │       │     │       │
  USERS  TIERS  TOP50  VOTING  PRIZES ENTRIES
    │       │     │       │     │       │
LINEUPS LIMITS PICKS  ARTIST  POOLS   SCORES
    │           │      WEEK      │       │
  SCORE      CAPTAIN  WEEKLY  PAYOUTS RANKS
    │                  │         │
  RANK              WALLET    MONEY
```
