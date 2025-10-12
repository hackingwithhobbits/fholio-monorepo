// src/config/sync.config.ts

export const SyncConfig = {
  // Chartmetric API limits
  rateLimit: {
    requestsPerSecond: 1, // Conservative: 1 req/sec
    requestsPerMinute: 50, // Max: 60/min (leave buffer)
    requestsPerHour: 900, // Max: 1000/hour (leave buffer)
    retryAttempts: 3,
    retryDelay: 5000, // 5 seconds
  },

  // Batch processing
  batch: {
    artistBatchSize: 50, // Process 50 artists at a time
    trackBatchSize: 100, // Process 100 tracks at a time
    dbBatchSize: 500, // Insert 500 records at once
    parallelRequests: 3, // Max 3 concurrent API calls
  },

  // Sync priorities
  priority: {
    highPriority: {
      // Artists with active campaigns
      minBackers: 10,
      maxDaysSinceSync: 1, // Sync daily
    },
    mediumPriority: {
      // Artists with some activity
      minBackers: 1,
      maxDaysSinceSync: 3, // Sync every 3 days
    },
    lowPriority: {
      // Inactive artists
      maxDaysSinceSync: 7, // Sync weekly
    },
  },

  // Job timing
  schedule: {
    cronExpression: "0 3 * * *", // 3 AM daily
    timeout: 7200000, // 2 hours max
  },
};
