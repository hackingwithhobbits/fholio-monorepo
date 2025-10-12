// src/services/chartmetric/rate-limiter.ts

import pLimit from "p-limit";
import Bottleneck from "bottleneck";

export class RateLimiter {
  private bottleneck: Bottleneck;
  private limiter: ReturnType<typeof pLimit>;

  constructor() {
    // Bottleneck for time-based rate limiting
    this.bottleneck = new Bottleneck({
      minTime: 1000, // Minimum 1 second between requests
      maxConcurrent: 1, // Only 1 request at a time initially
      reservoir: 50, // 50 requests per reservoir
      reservoirRefreshAmount: 50, // Refill 50 requests
      reservoirRefreshInterval: 60 * 1000, // Every minute
    });

    // p-limit for concurrent request limiting
    this.limiter = pLimit(SyncConfig.batch.parallelRequests);
  }

  /**
   * Wrap API call with rate limiting
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    return this.bottleneck.schedule(() => this.limiter(fn));
  }

  /**
   * Check if we're being rate limited
   */
  isRateLimited(): boolean {
    return (
      this.bottleneck.counts().EXECUTING >= SyncConfig.batch.parallelRequests
    );
  }

  /**
   * Get current queue status
   */
  getStatus() {
    return {
      queued: this.bottleneck.counts().QUEUED,
      running: this.bottleneck.counts().EXECUTING,
      done: this.bottleneck.counts().DONE,
    };
  }

  /**
   * Reset limiter (use after errors)
   */
  reset() {
    this.bottleneck.stop({ dropWaitingJobs: false });
    this.bottleneck = new Bottleneck({
      minTime: 1000,
      maxConcurrent: 1,
    });
  }
}
