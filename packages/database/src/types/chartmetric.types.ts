// Chartmetric API Response Types

export interface ChartmetricAuthResponse {
  token: string;
  expires_in: number;
  scope: string;
}

export interface ChartmetricArtistSearchResult {
  id: number;
  name: string;
  image_url: string;
  spotify_id?: string;
  apple_id?: string;
  genres?: string[];
  code2?: string; // Country code
  cm_artist_tier?: number;
}

export interface ChartmetricArtistDetails {
  id: number;
  name: string;
  image_url: string;
  spotify_id?: string;
  apple_music_id?: string;
  genres?: string[];
  code2?: string;
  city?: string;
  cm_artist_rank?: number;
  cm_artist_tier?: number;
}

export interface ChartmetricStatDataPoint {
  timestp: string; // Date string
  value: number;
  field?: string;
}

export interface ChartmetricSpotifyStatsResponse {
  obj: {
    data: ChartmetricStatDataPoint[];
  };
}

export interface ChartmetricPlaylistStats {
  total_playlists: number;
  total_reach: number;
  total_followers: number;
}

export interface ChartmetricPlaylistPlacement {
  playlist_id: string;
  playlist_name: string;
  followers: number;
  track_name: string;
  position: number;
  added_at: string;
}

export interface ChartmetricEmergingArtist {
  id: number;
  name: string;
  image_url: string;
  genres: string[];
  country?: string;
  momentum_score?: number;
  spotify_followers?: number;
  spotify_monthly_listeners?: number;
  spotify_followers_growth?: number;
  cm_artist_tier?: number;
  breakthrough_date?: string;
}

export interface ChartmetricTrack {
  id: number;
  name: string;
  artists: Array<{
    id: number;
    name: string;
  }>;
  album?: {
    id: number;
    name: string;
    image_url: string;
  };
  release_date?: string;
  duration_ms?: number;
  isrc?: string;
  spotify_id?: string;
}

// Sync Job Types

export interface SyncJobResult {
  artistsSynced: number;
  tracksDiscovered: number;
  snapshotsCreated: number;
  errors: number;
  duration: number;
  apiCallsUsed: number;
  startTime: string;
  endTime: string;
}

export interface SyncError {
  artistId?: string;
  chartmetricId?: number;
  error: string;
  timestamp: string;
}
