-- View sync performance over time
SELECT 
  sync_type,
  DATE(completed_at) as date,
  COUNT(*) as runs,
  AVG(duration_seconds) as avg_duration,
  SUM(artists_synced) as total_artists,
  SUM(tracks_synced) as total_tracks,
  SUM(api_calls_used) as total_api_calls,
  SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failures
FROM sync_logs
WHERE completed_at > NOW() - INTERVAL '30 days'
GROUP BY sync_type, DATE(completed_at)
ORDER BY date DESC;