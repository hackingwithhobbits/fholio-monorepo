import dotenv from "dotenv";

dotenv.config();

export const SyncConfig = {
  // Chartmetric API rate limiting
  rateLimit: {
    requestsPerSecond: parseFloat(process.env.CHARTMETRIC_RATE_LIMIT || "0.5"),
    minTimeBetweenRequests: 2000, // 2 seconds = 0.5 req/sec
    retryAttempts: 3,
    retryDelay: 5000, // 5 seconds
  },

  // Batch processing
  batch: {
    artistBatchSize: parseInt(process.env.SYNC_BATCH_SIZE || "100"),
    dbBatchSize: 500, // Insert 500 records at once
    maxConcurrentRequests: 1, // Only 1 concurrent request due to rate limit
  },

  // Emerging artist criteria
  emerging: {
    minFollowers: 10_000,
    maxFollowers: 500_000,
    minListeners: 25_000,
    maxListeners: 2_000_000,
    minMomentumScore: 60,
    allowedTiers: [3, 4, 5],
  },

  // Sync schedule
  schedule: {
    dailySync: "0 14 * * *", // 2:00 PM daily
    weeklyDiscovery: "0 2 * * 0", // 2:00 AM Sunday
    timeout: 7200000, // 2 hours max
  },

  // Feature flags
  features: {
    syncEnabled: process.env.SYNC_ENABLED === "true",
    discoverNewArtists: true,
    syncSocialStats: false, // Enable later to save API calls
    syncPlaylistData: true,
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
    enableConsole: true,
    enableDatabase: true,
  },
};

// Validation
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  throw new Error("Missing Supabase credentials in environment variables");
}

if (!process.env.CHARTMETRIC_REFRESH_TOKEN) {
  throw new Error("Missing Chartmetric refresh token in environment variables");
}

export const SupabaseConfig = {
  url: process.env.SUPABASE_URL,
  serviceKey: process.env.SUPABASE_SERVICE_KEY,
};

export const ChartmetricConfig = {
  baseUrl: "https://api.chartmetric.com/api",
  refreshToken: process.env.CHARTMETRIC_REFRESH_TOKEN,
  tokenExpiryBuffer: 3600000, // Refresh 1 hour before expiry
};
