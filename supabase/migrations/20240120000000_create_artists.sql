-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create artists table
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Chartmetric identifiers
  chartmetric_id INTEGER UNIQUE,
  spotify_id TEXT UNIQUE,
  
  -- Basic info
  stage_name TEXT NOT NULL,
  bio TEXT,
  genre TEXT NOT NULL,
  image_url TEXT,
  country_code TEXT,
  city TEXT,
  
  -- Emerging artist metrics
  is_emerging BOOLEAN DEFAULT false,
  momentum_score DECIMAL(5,2),
  tier INTEGER CHECK (tier BETWEEN 1 AND 5),
  breakthrough_date DATE,
  
  -- Current stats (cached for quick access)
  spotify_followers INTEGER DEFAULT 0,
  spotify_monthly_listeners INTEGER DEFAULT 0,
  follower_growth_30d INTEGER,
  
  -- Sync metadata
  chartmetric_last_synced TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_artists_chartmetric_id ON artists(chartmetric_id);
CREATE INDEX idx_artists_spotify_id ON artists(spotify_id);
CREATE INDEX idx_artists_emerging ON artists(is_emerging) WHERE is_emerging = true;
CREATE INDEX idx_artists_momentum ON artists(momentum_score DESC NULLS LAST) WHERE is_emerging = true;
CREATE INDEX idx_artists_last_synced ON artists(chartmetric_last_synced);
CREATE INDEX idx_artists_genre ON artists(genre);

-- Enable RLS
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Artists are viewable by everyone" 
  ON artists FOR SELECT 
  USING (true);

CREATE POLICY "Users can update own artist profile" 
  ON artists FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role has full access" 
  ON artists FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_artists_updated_at 
  BEFORE UPDATE ON artists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();