-- ============================================
-- INSERT ARTISTS (Auto-generated UUIDs)
-- ============================================

WITH inserted_artists AS (
  INSERT INTO artists (name, genre, score, change, image_url, fan_backers, streams, engagement, votes, growth, weekly_history, bio, league, monthly_listeners, instagram_followers, location, status, weekly_track, social_links) 
  VALUES
  ('Aiko Blaze', 'Pop', 98.7, 5.2, 'https://images.unsplash.com/photo-1596391124253-68a9733e4932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzaW5nZXIlMjBuZW9ufGVufDF8fHx8MTc2MTcxMTcyMHww&ixlib=rb-4.1.0&q=80&w=1080', 12847, 8500000, 95, 98, 12, ARRAY[78, 82, 85, 89, 92, 95, 98.7], 'Rising pop sensation known for electrifying performances and chart-topping hits.', 'Major', 425000, 87000, 'Los Angeles, CA', 'Hot Streak', 'Neon Dreams', '{"spotify": "https://spotify.com", "apple": "https://music.apple.com", "tiktok": "https://tiktok.com", "instagram": "https://instagram.com"}'),
  
  ('Nova Red', 'Hip-Hop', 94.3, 3.8, 'https://images.unsplash.com/photo-1645305783467-1f78f9b984ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcmFwcGVyJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzYxNzExNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080', 10523, 7200000, 92, 94, 8, ARRAY[75, 79, 84, 87, 90, 92, 94.3], 'Groundbreaking hip-hop artist with a unique sound and powerful lyrics.', 'Major', 312000, 52000, 'Atlanta, GA', 'Rising', 'City Lights', '{"spotify": "https://spotify.com", "apple": "https://music.apple.com", "instagram": "https://instagram.com"}'),
  
  ('The Radiants', 'Alt Rock', 89.2, -1.5, 'https://images.unsplash.com/photo-1616688920494-6758cf681803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwYmFuZCUyMGNvbmNlcnR8ZW58MXx8fHwxNzYxNjc2NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080', 9876, 6800000, 88, 89, -2, ARRAY[82, 85, 88, 90, 92, 90.7, 89.2], 'Indie rock band bringing raw energy and unforgettable riffs to the stage.', 'Major', 185000, 34000, 'Brooklyn, NY', 'Stable', 'Electric Soul', '{"spotify": "https://spotify.com", "apple": "https://music.apple.com", "instagram": "https://instagram.com"}'),
  
  ('Stellar Waves', 'Electronic', 87.5, 4.2, 'https://images.unsplash.com/photo-1692176548571-86138128e36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBkanxlbnwxfHx8fDE3NjE2NTIxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080', 8234, 5900000, 86, 88, 6, ARRAY[72, 76, 79, 82, 84, 85, 87.5], 'Electronic music producer creating immersive soundscapes and festival anthems.', 'Major', 267000, 28000, 'London, UK', 'Rising', 'Pulse', '{"spotify": "https://spotify.com", "tiktok": "https://tiktok.com"}'),
  
  ('Luna Echo', 'Indie', 85.1, 2.3, 'https://images.unsplash.com/photo-1512153129600-528cae82b06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMGFydGlzdCUyMGd1aXRhcnxlbnwxfHx8fDE3NjE2Mzk0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080', 7652, 4800000, 84, 86, 4, ARRAY[70, 73, 77, 80, 82, 83, 85.1], 'Indie singer-songwriter with haunting melodies and poetic storytelling.', 'Major', 142000, 19500, 'Portland, OR', 'Trending', 'Moonlight', '{"spotify": "https://spotify.com", "apple": "https://music.apple.com", "instagram": "https://instagram.com"}'),
  
  ('Phoenix Rise', 'R&B', 82.9, 1.8, 'https://images.unsplash.com/photo-1566477712363-3c75dd39b416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3AlMjBzdGFyJTIwc3RhZ2V8ZW58MXx8fHwxNzYxNjA3MjMyfDA&ixlib=rb-4.1.0&q=80&w=1080', 6843, 4200000, 81, 83, 3, ARRAY[68, 72, 75, 78, 80, 81, 82.9], 'Soulful R&B artist with smooth vocals and infectious rhythms.', 'Minor', 98000, 15000, 'Chicago, IL', 'Stable', 'Velvet Nights', '{"spotify": "https://spotify.com", "apple": "https://music.apple.com"}'),
  
  ('Violet Storm', 'EDM', 79.4, 6.7, 'https://images.unsplash.com/photo-1598387846279-b8b5e470b7d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkaiUyMG5lb258ZW58MXx8fHwxNzMwMzI2NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080', 5234, 3200000, 78, 80, 9, ARRAY[58, 62, 67, 71, 74, 76, 79.4], 'Festival-ready EDM producer with explosive drops and mesmerizing visuals.', 'Minor', 87000, 12000, 'Miami, FL', 'Hot Streak', 'Thunder', '{"spotify": "https://spotify.com", "tiktok": "https://tiktok.com", "instagram": "https://instagram.com"}'),
  
  ('Midnight Poets', 'Alternative', 76.2, 8.9, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMGJhbmQlMjBsaXZlfGVufDF8fHx8MTczMDMyNjQwMHww&ixlib=rb-4.1.0&q=80&w=1080', 4521, 2100000, 75, 77, 11, ARRAY[52, 57, 62, 66, 70, 73, 76.2], 'Alternative band crafting atmospheric soundscapes and introspective lyrics.', 'Minor', 65000, 8500, 'Seattle, WA', 'Rising', 'Stargazer', '{"spotify": "https://spotify.com", "instagram": "https://instagram.com"}'),
  
  ('Jade Rivers', 'Pop', 73.8, 4.3, 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzaW5nZXIlMjBwZXJmb3JtaW5nfGVufDF8fHx8MTczMDMyNjQwMHww&ixlib=rb-4.1.0&q=80&w=1080', 3892, 1800000, 72, 74, 5, ARRAY[56, 60, 64, 67, 70, 72, 73.8], 'Emerging pop artist with catchy hooks and relatable storytelling.', 'Minor', 54000, 11000, 'Nashville, TN', 'New Entrant', 'Better Days', '{"spotify": "https://spotify.com", "tiktok": "https://tiktok.com"}'),
  
  ('Cipher', 'Hip-Hop', 71.5, 12.1, 'https://images.unsplash.com/photo-1571609191277-4e2d9e4b5e78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXBwZXIlMjBzdHVkaW98ZW58MXx8fHwxNzMwMzI2NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080', 3124, 1200000, 70, 72, 15, ARRAY[42, 48, 54, 59, 64, 68, 71.5], 'Underground hip-hop talent with sharp wordplay and authentic flow.', 'Minor', 38000, 6800, 'Detroit, MI', 'Hot Streak', 'Street Code', '{"spotify": "https://spotify.com", "instagram": "https://instagram.com"}'),
  
  ('Scarlett Haze', 'Pop', 68.9, 3.2, 'https://images.unsplash.com/photo-1563681543778-002ee8f3cd8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzaW5nZXIlMjBjb25jZXJ0fGVufDF8fHx8MTc2MTg1NzQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080', 2876, 980000, 68, 69, 4, ARRAY[51, 55, 59, 62, 65, 67, 68.9], 'Dynamic pop artist with powerful vocals and stadium-worthy anthems.', 'Minor', 42000, 9200, 'Toronto, ON', 'Rising', 'Gravity', '{"spotify": "https://spotify.com", "tiktok": "https://tiktok.com", "instagram": "https://instagram.com"}'),
  
  ('The Solstice', 'Alternative', 65.4, -0.8, 'https://images.unsplash.com/photo-1693835777292-cf103dcd2324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZ3VpdGFyaXN0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NjE4NTc0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080', 2543, 850000, 65, 66, -1, ARRAY[60, 63, 65, 67, 66, 66.2, 65.4], 'Atmospheric alternative rock with haunting guitar work and ethereal soundscapes.', 'Minor', 35000, 7100, 'Austin, TX', 'Stable', 'Eclipse', '{"spotify": "https://spotify.com", "apple": "https://music.apple.com"}'),
  
  ('Rhythm Nation', 'R&B', 62.7, 5.8, 'https://images.unsplash.com/photo-1687585612299-1f0e727b6f44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVtbWVyJTIwbGl2ZSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc2MTg1NzQ1OHww&ixlib=rb-4.1.0&q=80&w=1080', 2198, 720000, 62, 63, 7, ARRAY[45, 49, 53, 56, 59, 61, 62.7], 'Groove-heavy R&B collective blending classic soul with modern production.', 'Minor', 29000, 5900, 'Oakland, CA', 'Trending', 'Smooth Operator', '{"spotify": "https://spotify.com", "instagram": "https://instagram.com"}'),
  
  ('Sax & the City', 'Jazz', 59.3, 2.1, 'https://images.unsplash.com/photo-1687589891886-a8578a54ef76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWNpYW4lMjBzYXhvcGhvbmV8ZW58MXx8fHwxNzYxODE5OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080', 1987, 610000, 59, 60, 3, ARRAY[48, 51, 54, 56, 57, 58, 59.3], 'Modern jazz quartet bringing bebop energy to the contemporary scene.', 'Minor', 24000, 4200, 'New Orleans, LA', 'New Entrant', 'Blue Monday', '{"spotify": "https://spotify.com", "apple": "https://music.apple.com"}'),
  
  ('Dusty Trails', 'Country', 56.8, 7.4, 'https://images.unsplash.com/photo-1740689050594-3df494210843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5JTIwc2luZ2VyJTIwc3RhZ2V8ZW58MXx8fHwxNzYxODU3NDU4fDA&ixlib=rb-4.1.0&q=80&w=1080', 1765, 520000, 56, 57, 9, ARRAY[38, 42, 46, 49, 52, 54, 56.8], 'Heartland country with honest storytelling and authentic twang.', 'Minor', 21000, 3800, 'Nashville, TN', 'Hot Streak', 'Back Roads', '{"spotify": "https://spotify.com", "tiktok": "https://tiktok.com"}')
  
  RETURNING id, name
)
SELECT * FROM inserted_artists;

-- ============================================
-- INSERT USERS
-- ============================================

WITH inserted_users AS (
  INSERT INTO users (email, username, avatar_url, tier, rank, total_score, weekly_earnings, lifetime_earnings, referral_count, referral_bonus) 
  VALUES
  ('alex.chen@example.com', 'alexchen', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', 'Platinum', 1, 447.5, 127.50, 1834.25, 7, 35.00),
  ('jordan.taylor@example.com', 'jordantaylor', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', 'Gold', 2, 387.25, 95.00, 1567.80, 4, 20.00),
  ('sam.rivera@example.com', 'samrivera', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100', 'Gold', 3, 352.80, 88.50, 1432.90, 5, 25.00),
  ('casey.morgan@example.com', 'caseymorgan', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', 'Silver', 4, 318.40, 76.20, 1289.50, 2, 10.00),
  ('riley.brooks@example.com', 'rileybrooks', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', 'Silver', 5, 295.75, 68.90, 1156.70, 3, 15.00)
  
  RETURNING id, username
)
SELECT * FROM inserted_users;

-- ============================================
-- INSERT USER PORTFOLIOS WITH ARTISTS
-- ============================================

WITH first_user AS (
  SELECT id FROM users WHERE username = 'alexchen'
),
portfolio AS (
  INSERT INTO user_portfolios (user_id, week_starting, is_locked, locked_at, total_score, weekly_earnings, rank)
  SELECT 
    id,
    '2025-10-27'::date,
    TRUE,
    '2025-10-31 23:59:00+00'::timestamp with time zone,
    447.5,
    127.50,
    342
  FROM first_user
  RETURNING id, user_id
),
artists_to_add AS (
  SELECT id, name, score FROM artists 
  WHERE name IN ('Aiko Blaze', 'Nova Red', 'Stellar Waves', 'Luna Echo', 'Phoenix Rise')
)
INSERT INTO portfolio_artists (portfolio_id, artist_id, position, score_contribution)
SELECT 
  p.id,
  a.id,
  ROW_NUMBER() OVER (ORDER BY a.score DESC),
  a.score
FROM portfolio p
CROSS JOIN artists_to_add a;

-- ============================================
-- INSERT FAN POOL DATA
-- ============================================

INSERT INTO fan_pool (week_starting, total_pool, artist_pool, fan_share, platform, bonus_events) VALUES
('2025-10-27', 850000, 510000, 127500, 170000, 42500),
('2025-10-20', 820000, 492000, 123000, 164000, 41000),
('2025-10-13', 795000, 477000, 119250, 159000, 39750),
('2025-10-06', 780000, 468000, 117000, 156000, 39000);

-- ============================================
-- INSERT PAYOUT HISTORY
-- ============================================

INSERT INTO payout_history (user_id, week_starting, week_ending, amount, artists, status)
SELECT 
  u.id,
  '2025-10-21'::date,
  '2025-10-27'::date,
  127.50,
  ARRAY['Aiko Blaze', 'Nova Red', 'Stellar Waves'],
  'completed'
FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT 
  u.id,
  '2025-10-14'::date,
  '2025-10-20'::date,
  95.75,
  ARRAY['Aiko Blaze', 'Luna Echo'],
  'completed'
FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT 
  u.id,
  '2025-10-07'::date,
  '2025-10-13'::date,
  143.20,
  ARRAY['Nova Red', 'Stellar Waves', 'Phoenix Rise'],
  'completed'
FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT 
  u.id,
  '2025-09-30'::date,
  '2025-10-06'::date,
  88.40,
  ARRAY['Aiko Blaze', 'Phoenix Rise'],
  'completed'
FROM users u WHERE u.username = 'alexchen';

-- ============================================
-- INSERT FAQs
-- ============================================

INSERT INTO faqs (question, answer, category, display_order) VALUES
('What''s the difference between Major and Minor League?', 'Major League artists have 100K+ monthly Spotify listeners OR 20K+ Instagram followers. Minor League artists are below these thresholds. Both leagues compete separately with their own rewards pools and leaderboards.', 'General', 1),
('How are artists selected?', 'Artists are eligible based on streaming platform presence and verified engagement metrics. We track performance across Spotify, Apple Music, TikTok, and Instagram to calculate weekly scores.', 'General', 2),
('Can I change my Fholio?', 'Yes! You can adjust your portfolio weekly before Friday lock-in (11:59 PM EST). Once locked, your selections are final for that week''s competition.', 'Gameplay', 3),
('When do payouts happen?', 'Payouts are processed every Monday for the previous week''s performance. Funds are credited to your Rewards Wallet and can be withdrawn or reinvested.', 'Payouts', 4),
('What are the artist rules?', 'Artists must submit one active track per week. Tracks can be repeated but score decays 10-15% per week to encourage fresh content. No fake streams, botting, or manipulation allowed—violations result in immediate removal.', 'Rules', 5),
('How does the referral system work?', 'Invite friends to join Fholio and earn a 5% bonus on their weekly activity. Your referrals also get a sign-up bonus. More referrals = higher tier multipliers.', 'Referrals', 6),
('Is this available globally?', 'Fholio is currently available in the United States, Canada, and the United Kingdom. We''re expanding to additional markets throughout 2025.', 'General', 7),
('How is this different from gambling?', 'Fholio is a skill-based fantasy league, not gambling. Your success depends on music knowledge, artist research, and strategic portfolio building—similar to fantasy sports. There are no odds, no house edge, and no chance-based outcomes.', 'Legal', 8);

-- ============================================
-- INSERT SOCIAL STATS
-- ============================================

INSERT INTO social_stats (date, artists_joined_this_week, fan_lineups_created, money_distributed, total_members) VALUES
('2025-11-02', 127, 3842, 284500, 18234),
('2025-10-26', 115, 3567, 267800, 17890),
('2025-10-19', 102, 3234, 251200, 17456),
('2025-10-12', 98, 3098, 238900, 17123);

-- ============================================
-- INSERT TOP FANS
-- ============================================

INSERT INTO top_fans (user_id, week_starting, earnings, rank)
SELECT u.id, '2025-10-27'::date, 423.50, 1 FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT u.id, '2025-10-27'::date, 387.25, 2 FROM users u WHERE u.username = 'jordantaylor'
UNION ALL
SELECT u.id, '2025-10-27'::date, 352.80, 3 FROM users u WHERE u.username = 'samrivera'
UNION ALL
SELECT u.id, '2025-10-27'::date, 318.40, 4 FROM users u WHERE u.username = 'caseymorgan'
UNION ALL
SELECT u.id, '2025-10-27'::date, 295.75, 5 FROM users u WHERE u.username = 'rileybrooks';

-- ============================================
-- INSERT SPONSORS
-- ============================================

INSERT INTO sponsors (name, logo, type, website_url, is_active, display_order) VALUES
('Spotify', '🎵', 'brand', 'https://spotify.com', TRUE, 1),
('Red Bull', '🔴', 'brand', 'https://redbull.com', TRUE, 2),
('Coachella', '🎪', 'festival', 'https://coachella.com', TRUE, 3),
('Atlantic Records', '💿', 'label', 'https://atlanticrecords.com', TRUE, 4);

-- ============================================
-- INSERT ARTIST SUBMISSIONS
-- ============================================

INSERT INTO artist_submissions (artist_id, week_starting, track_name, submission_status, estimated_earnings_min, estimated_earnings_max)
SELECT a.id, '2025-10-27'::date, 'Neon Dreams', 'approved', 400, 700 FROM artists a WHERE a.name = 'Aiko Blaze'
UNION ALL
SELECT a.id, '2025-10-27'::date, 'City Lights', 'approved', 400, 700 FROM artists a WHERE a.name = 'Nova Red'
UNION ALL
SELECT a.id, '2025-10-27'::date, 'Electric Soul', 'approved', 400, 700 FROM artists a WHERE a.name = 'The Radiants'
UNION ALL
SELECT a.id, '2025-10-27'::date, 'Pulse', 'approved', 400, 700 FROM artists a WHERE a.name = 'Stellar Waves'
UNION ALL
SELECT a.id, '2025-10-27'::date, 'Moonlight', 'approved', 400, 700 FROM artists a WHERE a.name = 'Luna Echo'
UNION ALL
SELECT a.id, '2025-10-27'::date, 'Velvet Nights', 'approved', 1740, 2400 FROM artists a WHERE a.name = 'Phoenix Rise'
UNION ALL
SELECT a.id, '2025-10-27'::date, 'Thunder', 'approved', 1740, 2400 FROM artists a WHERE a.name = 'Violet Storm'
UNION ALL
SELECT a.id, '2025-10-27'::date, 'Stargazer', 'approved', 1740, 2400 FROM artists a WHERE a.name = 'Midnight Poets'
UNION ALL
SELECT a.id, '2025-10-27'::date, 'Better Days', 'approved', 1740, 3500 FROM artists a WHERE a.name = 'Jade Rivers'
UNION ALL
SELECT a.id, '2025-10-27'::date, 'Street Code', 'approved', 1740, 3500 FROM artists a WHERE a.name = 'Cipher';

-- ============================================
-- INSERT VOTES
-- ============================================

INSERT INTO votes (user_id, artist_id, week_starting)
SELECT u.id, a.id, '2025-10-27'::date 
FROM users u 
CROSS JOIN artists a
WHERE u.username = 'alexchen' 
  AND a.name IN ('Aiko Blaze', 'Nova Red', 'Stellar Waves', 'Violet Storm', 'Midnight Poets');

-- ============================================
-- INSERT TRANSACTIONS
-- ============================================

INSERT INTO transactions (user_id, type, amount, status, payment_method)
SELECT u.id, 'winnings', 127.50, 'completed', 'wallet_credit' FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT u.id, 'winnings', 95.75, 'completed', 'wallet_credit' FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT u.id, 'winnings', 143.20, 'completed', 'wallet_credit' FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT u.id, 'winnings', 88.40, 'completed', 'wallet_credit' FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT u.id, 'referral_bonus', 35.00, 'completed', 'wallet_credit' FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT u.id, 'deposit', 100.00, 'completed', 'credit_card' FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT u.id, 'entry_fee', 25.00, 'completed', 'wallet_debit' FROM users u WHERE u.username = 'alexchen';

-- ============================================
-- INSERT NOTIFICATIONS
-- ============================================

INSERT INTO notifications (user_id, title, message, type, is_read, action_url)
SELECT u.id, 'Lineup Lock Reminder', 'Your lineup locks in 2 hours! Make any final changes now.', 'lineup_reminder', FALSE, '/draft' FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT u.id, 'You Won This Week!', 'Congratulations! You earned $127.50 this week. Check your results.', 'results', TRUE, '/my-fholio' FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT u.id, 'Artist Trending', 'Aiko Blaze is on fire! Up 5.2% this week.', 'artist_update', TRUE, '/charts' FROM users u WHERE u.username = 'alexchen'
UNION ALL
SELECT u.id, 'Referral Bonus', 'You earned $5 for referring a friend!', 'referral', TRUE, '/wallet' FROM users u WHERE u.username = 'alexchen';