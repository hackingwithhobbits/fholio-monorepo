// Match your backend types
export type LeagueTier = "Major" | "Minor";
export type ArtistStatus =
  | "Hot Streak"
  | "Rising"
  | "New Entrant"
  | "Trending"
  | "Stable";
export type UserTier = "Bronze" | "Silver" | "Gold" | "Platinum";

export interface Artist {
  id: string;
  name: string;
  genre: string;
  score: number;
  change: number;
  image_url: string | null;
  fan_backers: number;
  streams: number;
  engagement: number;
  votes: number;
  growth: number;
  weekly_history: number[];
  bio: string | null;
  league: LeagueTier;
  monthly_listeners: number;
  instagram_followers: number;
  location: string | null;
  status: ArtistStatus;
  weekly_track: string | null;
  social_links: {
    spotify?: string;
    apple?: string;
    tiktok?: string;
    instagram?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  tier: UserTier;
  rank: number;
  total_score: number;
  weekly_earnings: number;
  lifetime_earnings: number;
  referral_count: number;
  referral_bonus: number;
}

export interface Portfolio {
  id: string;
  user_id: string;
  week_starting: string;
  is_locked: boolean;
  locked_at: string | null;
  total_score: number;
  weekly_earnings: number;
  rank: number | null;
  portfolio_artists: PortfolioArtist[];
}

export interface PortfolioArtist {
  id: string;
  portfolio_id: string;
  artist_id: string;
  position: number;
  score_contribution: number;
  artist: Artist;
}
export interface TopFan {
  id: string;
  user_id: string;
  week_starting: string;
  earnings: number;
  rank: number;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
    tier: UserTier;
    city?: string; // Add to User type if needed
  };
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  type: string;
  tier: "Platinum" | "Gold" | "Silver";
  website_url?: string;
  created_at: string;
}

export interface Challenge {
  id: string;
  name: string;
  sponsor_id: string;
  sponsor_name: string;
  prize_amount: number;
  description: string;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
}

export interface SocialStats {
  date: string;
  artists_joined_this_week: number;
  fan_lineups_created: number;
  money_distributed: number;
  total_members: number;
}

export interface GetArtistsParams {
  page?: number;
  limit?: number;
  league?: LeagueTier;
  status?: ArtistStatus;
  genre?: string;
  sortBy?: "score" | "name" | "streams" | "engagement";
  sortOrder?: "asc" | "desc";
  search?: string;
}

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
