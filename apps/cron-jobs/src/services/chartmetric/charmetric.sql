-- Create function to get prioritized artists
CREATE OR REPLACE FUNCTION get_prioritized_artists(
  high_priority_days INT,
  medium_priority_days INT,
  low_priority_days INT
)
RETURNS TABLE (
  id UUID,
  chartmetric_id TEXT,
  stage_name TEXT,
  priority TEXT
) AS $$
BEGIN
  RETURN QUERY
  WITH artist_priority AS (
    SELECT 
      a.id,
      a.chartmetric_id,
      a.stage_name,
      a.chartmetric_last_synced,
      COUNT(DISTINCT i.user_id) as backer_count,
      COUNT(DISTINCT CASE WHEN c.status = 'active' THEN c.id END) as active_campaigns,
      CASE
        WHEN COUNT(DISTINCT CASE WHEN c.status = 'active' THEN c.id END) > 0 
          AND (a.chartmetric_last_synced IS NULL 
            OR a.chartmetric_last_synced < NOW() - (high_priority_days || ' days')::INTERVAL)
          THEN 'high'
        WHEN COUNT(DISTINCT i.user_id) > 0
          AND (a.chartmetric_last_synced IS NULL 
            OR a.chartmetric_last_synced < NOW() - (medium_priority_days || ' days')::INTERVAL)
          THEN 'medium'
        WHEN a.chartmetric_last_synced IS NULL 
          OR a.chartmetric_last_synced < NOW() - (low_priority_days || ' days')::INTERVAL
          THEN 'low'
        ELSE NULL
      END as priority_level
    FROM artists a
    LEFT JOIN tracks t ON t.artist_id = a.id
    LEFT JOIN campaigns c ON c.track_id = t.id
    LEFT JOIN investments i ON i.track_id = t.id
    WHERE a.chartmetric_id IS NOT NULL
    GROUP BY a.id, a.chartmetric_id, a.stage_name, a.chartmetric_last_synced
  )
  SELECT 
    ap.id,
    ap.chartmetric_id,
    ap.stage_name,
    ap.priority_level::TEXT as priority
  FROM artist_priority ap
  WHERE ap.priority_level IS NOT NULL
  ORDER BY 
    CASE ap.priority_level
      WHEN 'high' THEN 1
      WHEN 'medium' THEN 2
      WHEN 'low' THEN 3
    END,
    ap.chartmetric_last_synced ASC NULLS FIRST;
END;
$$ LANGUAGE plpgsql;

-- Similar function for tracks
CREATE OR REPLACE FUNCTION get_prioritized_tracks(
  high_priority_days INT,
  medium_priority_days INT,
  low_priority_days INT
)
RETURNS TABLE (
  id UUID,
  chartmetric_track_id TEXT,
  title TEXT,
  priority TEXT
) AS $$
BEGIN
  RETURN QUERY
  WITH track_priority AS (
    SELECT 
      t.id,
      t.chartmetric_track_id,
      t.title,
      t.chartmetric_last_synced,
      c.status as campaign_status,
      COUNT(i.id) as investment_count,
      CASE
        WHEN c.status = 'active'
          AND (t.chartmetric_last_synced IS NULL 
            OR t.chartmetric_last_synced < NOW() - (high_priority_days || ' days')::INTERVAL)
          THEN 'high'
        WHEN COUNT(i.id) > 0
          AND (t.chartmetric_last_synced IS NULL 
            OR t.chartmetric_last_synced < NOW() - (medium_priority_days || ' days')::INTERVAL)
          THEN 'medium'
        WHEN t.chartmetric_last_synced IS NULL 
          OR t.chartmetric_last_synced < NOW() - (low_priority_days || ' days')::INTERVAL
          THEN 'low'
        ELSE NULL
      END as priority_level
    FROM tracks t
    LEFT JOIN campaigns c ON c.track_id = t.id
    LEFT JOIN investments i ON i.track_id = t.id
    WHERE t.chartmetric_track_id IS NOT NULL
    GROUP BY t.id, t.chartmetric_track_id, t.title, t.chartmetric_last_synced, c.status
  )
  SELECT 
    tp.id,
    tp.chartmetric_track_id,
    tp.title,
    tp.priority_level::TEXT as priority
  FROM track_priority tp
  WHERE tp.priority_level IS NOT NULL
  ORDER BY 
    CASE tp.priority_level
      WHEN 'high' THEN 1
      WHEN 'medium' THEN 2
      WHEN 'low' THEN 3
    END,
    tp.chartmetric_last_synced ASC NULLS FIRST;
END;
$$ LANGUAGE plpgsql;