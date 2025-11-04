-- Create sync_logs table
CREATE TABLE sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sync_type TEXT CHECK (sync_type IN ('daily_sync', 'weekly_discovery', 'manual')) NOT NULL,
  status TEXT CHECK (status IN ('success', 'failed', 'partial')) NOT NULL,
  
  -- Metrics
  artists_synced INTEGER DEFAULT 0,
  tracks_discovered INTEGER DEFAULT 0,
  snapshots_created INTEGER DEFAULT 0,
  errors INTEGER DEFAULT 0,
  api_calls_used INTEGER DEFAULT 0,
  
  -- Timing
  duration_seconds DECIMAL(10,2),
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  
  -- Error info
  error_message TEXT,
  error_details JSONB,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_sync_logs_type ON sync_logs(sync_type);
CREATE INDEX idx_sync_logs_status ON sync_logs(status);
CREATE INDEX idx_sync_logs_started_at ON sync_logs(started_at DESC);
CREATE INDEX idx_sync_logs_completed_at ON sync_logs(completed_at DESC);

-- Enable RLS
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Sync logs are viewable by authenticated users" 
  ON sync_logs FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Service role has full access" 
  ON sync_logs FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');