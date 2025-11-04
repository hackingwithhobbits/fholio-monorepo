export type LeagueTier = "Major" | "Minor";

export interface Artist {
  id: string;
  name: string;
  genre: string;
  score: number;
  change: number;
  imageUrl: string;
  fanBackers: number;
  streams: number;
  engagement: number;
  votes: number;
  growth: number;
  weeklyHistory: number[];
  bio: string;
  league: LeagueTier;
  monthlyListeners: number;
  instagramFollowers: number;
  location: string;
  status: "Hot Streak" | "Rising" | "New Entrant" | "Trending" | "Stable";
  weeklyTrack?: string;
  socialLinks: {
    spotify?: string;
    apple?: string;
    tiktok?: string;
    instagram?: string;
  };
}

export interface UserPortfolio {
  artists: Artist[];
  totalScore: number;
  weeklyEarnings: number;
  lifetimeEarnings: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  rank: number;
  referralCount: number;
  referralBonus: number;
}
export interface FanPoolData {
  totalPool: number;
  artistPool: number;
  fanShare: number;
  platform: number;
  bonusEvents: number;
}
export interface PayoutHistory {
  week: string;
  amount: number;
  artists: string[];
}
export interface FAQ {
  question: string;
  answer: string;
}
export interface SocialStats {
  artistsJoinedThisWeek: number;
  fanLineupsCreated: number;
  moneyDistributed: number;
  totalMembers: number;
}
export interface TopFan {
  id: string;
  name: string;
  city: string;
  earnings: number;
  rank: number;
  avatar: string;
}
export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  type: "brand" | "festival" | "label";
}
