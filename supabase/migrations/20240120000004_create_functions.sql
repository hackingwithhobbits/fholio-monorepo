-- Function to get artists that need syncing
CREATE OR REPLACE FUNCTION get_artists_needing_sync(
  max_age_hours INTEGER DEFAULT 24
)
RETURNS TABLE (
  id UUID,
  chartmetric_id INTEGER,
  stage_name TEXT,
  momentum_score DECIMAL,
  hours_since_sync DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.chartmetric_id,
    a.stage_name,
    a.momentum_score,
    EXTRACT(EPOCH FROM (NOW() - a.chartmetric_last_synced)) / 3600 AS hours_since_sync
  FROM artists a
  WHERE 
    a.is_emerging = true
    AND a.chartmetric_id IS NOT NULL
    AND (
      a.chartmetric_last_synced IS NULL
      OR a.chartmetric_last_synced < NOW() - (max_age_hours || ' hours')::INTERVAL
    )
  ORDER BY 
    a.chartmetric_last_synced ASC NULLS FIRST,
    a.momentum_score DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql;

-- Function to check if artist meets emerging criteria
CREATE OR REPLACE FUNCTION check_emerging_criteria(
  p_followers INTEGER,
  p_listeners INTEGER,
  p_momentum_score DECIMAL DEFAULT NULL,
  p_tier INTEGER DEFAULT NULL
) RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    p_followers >= 10000 AND 
    p_followers <= 500000 AND
    p_listeners >= 25000 AND
    p_listeners <= 2000000 AND
    (p_momentum_score IS NULL OR p_momentum_score >= 60) AND
    (p_tier IS NULL OR p_tier IN (3, 4, 5))
  );
END;
$$ LANGUAGE plpgsql;

-- Function to get latest snapshot for artist
CREATE OR REPLACE FUNCTION get_latest_artist_snapshot(p_artist_id UUID)
RETURNS TABLE (
  snapshot_date DATE,
  spotify_followers INTEGER,
  spotify_monthly_listeners INTEGER,
  spotify_popularity INTEGER,
  playlist_count INTEGER,
  playlist_reach BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cs.snapshot_date,
    cs.spotify_followers,
    cs.spotify_monthly_listeners,
    cs.spotify_popularity,
    cs.playlist_count,
    cs.playlist_reach
  FROM chartmetric_snapshots cs
  WHERE cs.artist_id = p_artist_id
  ORDER BY cs.snapshot_date DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate follower growth
CREATE OR REPLACE FUNCTION calculate_follower_growth(
  p_artist_id UUID,
  p_days INTEGER DEFAULT 30
) RETURNS INTEGER AS $$
DECLARE
  current_followers INTEGER;
  past_followers INTEGER;
BEGIN
  -- Get current followers
  SELECT spotify_followers INTO current_followers
  FROM chartmetric_snapshots
  WHERE artist_id = p_artist_id
  ORDER BY snapshot_date DESC
  LIMIT 1;
  
  -- Get followers from N days ago
  SELECT spotify_followers INTO past_followers
  FROM chartmetric_snapshots
  WHERE artist_id = p_artist_id
    AND snapshot_date <= CURRENT_DATE - p_days
  ORDER BY snapshot_date DESC
  LIMIT 1;
  
  -- Return growth (or 0 if not enough data)
  RETURN COALESCE(current_followers - past_followers, 0);
END;
$$ LANGUAGE plpgsql;