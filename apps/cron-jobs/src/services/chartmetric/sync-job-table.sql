CREATE TABLE sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sync_type TEXT NOT NULL,
  status TEXT CHECK (status IN ('success', 'failed', 'partial')) NOT NULL,
  artists_synced INTEGER DEFAULT 0,
  tracks_synced INTEGER DEFAULT 0,
  errors INTEGER DEFAULT 0,
  duration_seconds DECIMAL(10,2),
  api_calls_used INTEGER,
  error_message TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sync_logs_type_date ON sync_logs(sync_type, completed_at DESC);