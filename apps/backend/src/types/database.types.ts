export interface Week {
  id: string;
  week_number: number;
  week_starting: string; // ISO date
  week_ending: string;
  phase: 'voting' | 'picks_open' | 'live' | 'completed';
  pool_published_at?: string;
  voting_open_at: string;
  voting_close_at: string;
  picks_open_at: string;
  picks_lock_at: string;
  show_at: string;
  status: 'active' | 'locked' | 'completed';
  created_at: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  image_url?: string;
  bio?: string;
  league: 'Major' | 'Minor';
  monthly_listeners?: number;
  instagram_followers?: number;
  location?: string;
  social_links?: {
    spotify?: string;
    apple?: string;
    tiktok?: string;
    instagram?: string;
  };
  created_at: string;
}

export interface ArtistWeek {
  id: string;
  artist_id: string;
  week_id: string;
  score: number;
  streams: number;
  votes: number;
  engagement: number;
  growth_percentage: number;
  rank: number;
  status: 'Hot Streak' | 'Rising' | 'New Entrant' | 'Trending' | 'Stable';
  is_top_50: boolean;
  weights_json?: any;
}

export interface WeekArtist {
  id: string;
  week_id: string;
  artist_id: string;
  track_id?: string;
  source_flag: 'new' | 'past_performer' | 'submission';
  is_top_50: boolean;
  eligible_for_picks: boolean;
}

export interface User {
  id: string; // From Supabase Auth
  email: string;
  display_name?: string;
  avatar_url?: string;
  user_type: 'fan' | 'artist' | 'admin';
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: 'Free' | 'Standard' | 'Premium';
  picks_limit: number;
  votes_limit: number;
  started_at: string;
  renews_at: string;
  is_active: boolean;
}

export interface FanLineup {
  id: string;
  user_id: string;
  week_id: string;
  total_score: number;
  rank?: number;
  is_locked: boolean;
  locked_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LineupArtist {
  id: string;
  lineup_id: string;
  artist_id: string;
  position: number; // 1-10
  score_contribution: number;
  is_captain: boolean; // For multiplier
}

export interface Vote {
  id: string;
  user_id: string;
  artist_id: string;
  week_id: string;
  vote_count: number;
  voted_at: string;
}

export interface PrizePool {
  id: string;
  week_id: string;
  pool_type: 'core' | 'bonus' | 'sponsor' | 'challenge';
  source: string;
  amount: number;
  allocation_rule_id?: string;
  distributed: boolean;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'entry_fee' | 'payout' | 'bonus' | 'refund' | 'purchase';
  amount: number;
  week_id?: string;
  ref_id?: string; // Reference to lineup, challenge, etc.
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}
