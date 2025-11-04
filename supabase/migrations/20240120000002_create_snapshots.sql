-- Create chartmetric_snapshots table
CREATE TABLE chartmetric_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  
  -- Spotify stats
  spotify_followers INTEGER,
  spotify_monthly_listeners INTEGER,
  spotify_popularity INTEGER CHECK (spotify_popularity BETWEEN 0 AND 100),
  spotify_streams BIGINT,
  
  -- Social media stats
  instagram_followers INTEGER,
  tiktok_followers INTEGER,
  twitter_followers INTEGER,
  youtube_subscribers INTEGER,
  
  -- Playlist stats
  playlist_count INTEGER,
  playlist_reach BIGINT,
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT snapshots_artist_or_track CHECK (
    (artist_id IS NOT NULL AND track_id IS NULL) OR
    (artist_id IS NULL AND track_id IS NOT NULL)
  ),
  
  -- Unique constraint: one snapshot per artist/track per day
  UNIQUE(artist_id, snapshot_date),
  UNIQUE(track_id, snapshot_date)
);

-- Indexes
CREATE INDEX idx_snapshots_artist_date ON chartmetric_snapshots(artist_id, snapshot_date DESC);
CREATE INDEX idx_snapshots_track_date ON chartmetric_snapshots(track_id, snapshot_date DESC);
CREATE INDEX idx_snapshots_date ON chartmetric_snapshots(snapshot_date DESC);

-- Enable RLS
ALTER TABLE chartmetric_snapshots ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Snapshots are viewable by everyone" 
  ON chartmetric_snapshots FOR SELECT 
  USING (true);

CREATE POLICY "Service role has full access" 
  ON chartmetric_snapshots FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');