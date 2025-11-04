-- Create tracks table
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  
  -- Chartmetric identifiers
  chartmetric_track_id INTEGER UNIQUE,
  spotify_id TEXT UNIQUE,
  isrc TEXT UNIQUE,
  
  -- Basic info
  title TEXT NOT NULL,
  duration INTEGER, -- in seconds
  release_date DATE,
  cover_image_url TEXT,
  genre TEXT,
  
  -- Status
  status TEXT CHECK (status IN ('draft', 'active', 'archived')) DEFAULT 'draft',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tracks_artist_id ON tracks(artist_id);
CREATE INDEX idx_tracks_chartmetric_id ON tracks(chartmetric_track_id);
CREATE INDEX idx_tracks_spotify_id ON tracks(spotify_id);
CREATE INDEX idx_tracks_isrc ON tracks(isrc);
CREATE INDEX idx_tracks_status ON tracks(status);
CREATE INDEX idx_tracks_release_date ON tracks(release_date DESC);

-- Enable RLS
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Tracks are viewable by everyone" 
  ON tracks FOR SELECT 
  USING (true);

CREATE POLICY "Artists can manage own tracks" 
  ON tracks FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM artists 
      WHERE artists.id = tracks.artist_id 
      AND artists.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role has full access" 
  ON tracks FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Trigger
CREATE TRIGGER update_tracks_updated_at 
  BEFORE UPDATE ON tracks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();