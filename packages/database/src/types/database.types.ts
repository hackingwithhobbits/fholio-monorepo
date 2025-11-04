// Supabase Database Types

export interface Artist {
  id: string;
  user_id?: string;
  chartmetric_id?: number;
  spotify_id?: string;
  stage_name: string;
  bio?: string;
  genre: string;
  image_url?: string;
  country_code?: string;
  city?: string;

  // Emerging artist fields
  is_emerging: boolean;
  momentum_score?: number;
  tier?: number;
  breakthrough_date?: string;

  // Current stats
  spotify_followers?: number;
  spotify_monthly_listeners?: number;
  follower_growth_30d?: number;

  // Sync metadata
  chartmetric_last_synced?: string;
  created_at: string;
  updated_at: string;
}

export interface Track {
  id: string;
  artist_id: string;
  chartmetric_track_id?: number;
  spotify_id?: string;
  title: string;
  isrc?: string;
  duration?: number;
  release_date?: string;
  cover_image_url?: string;
  genre?: string;

  // Status
  status: "draft" | "active" | "archived";

  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface ChartmetricSnapshot {
  id: string;
  artist_id?: string;
  track_id?: string;
  snapshot_date: string;

  // Spotify stats
  spotify_followers?: number;
  spotify_monthly_listeners?: number;
  spotify_popularity?: number;
  spotify_streams?: number;

  // Social stats
  instagram_followers?: number;
  tiktok_followers?: number;
  twitter_followers?: number;
  youtube_subscribers?: number;

  // Playlist stats
  playlist_count?: number;
  playlist_reach?: number;

  // Metadata
  created_at: string;
}

export interface SyncLog {
  id: string;
  sync_type: "daily_sync" | "weekly_discovery" | "manual";
  status: "success" | "failed" | "partial";

  // Metrics
  artists_synced?: number;
  tracks_discovered?: number;
  snapshots_created?: number;
  errors?: number;
  api_calls_used?: number;

  // Timing
  duration_seconds?: number;
  started_at: string;
  completed_at?: string;

  // Error info
  error_message?: string;
  error_details?: any;
}

// Insert types (without auto-generated fields)
export type ArtistInsert = Omit<Artist, "id" | "created_at" | "updated_at">;
export type TrackInsert = Omit<Track, "id" | "created_at" | "updated_at">;
export type SnapshotInsert = Omit<ChartmetricSnapshot, "id" | "created_at">;
export type SyncLogInsert = Omit<SyncLog, "id">;
