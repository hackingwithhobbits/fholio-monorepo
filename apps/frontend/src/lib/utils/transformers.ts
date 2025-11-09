import type { Artist as BackendArtist } from "../api/types";
import type { Artist as FrontendArtist } from "../../data/data-types"; // Your old type

export function transformArtist(backend: BackendArtist): FrontendArtist {
  return {
    id: backend.id,
    name: backend.name,
    genre: backend.genre,
    score: backend.score,
    change: backend.change,
    imageUrl: backend.image_url || "",
    fanBackers: backend.fan_backers,
    streams: backend.streams,
    engagement: backend.engagement,
    votes: backend.votes,
    growth: backend.growth,
    weeklyHistory: backend.weekly_history,
    bio: backend.bio || "",
    league: backend.league,
    monthlyListeners: backend.monthly_listeners,
    instagramFollowers: backend.instagram_followers,
    location: backend.location || "",
    status: backend.status,
    weeklyTrack: backend.weekly_track || undefined,
    socialLinks: backend.social_links,
  };
}
