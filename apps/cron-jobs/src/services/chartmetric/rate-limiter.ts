import Bottleneck from "bottleneck";
import { SyncConfig } from "../../config/sync.config";
import { Logger } from "../../utils/logger";

export class RateLimiter {
  private bottleneck: Bottleneck;
  private logger: Logger;
  private requestCount: number = 0;
  private startTime: number = Date.now();

  constructor() {
    this.logger = new Logger("RateLimiter");

    // Configure Bottleneck for 1 request every 2 seconds
    this.bottleneck = new Bottleneck({
      minTime: SyncConfig.rateLimit.minTimeBetweenRequests, // 2000ms between requests
      maxConcurrent: 1, // Only 1 request at a time

      // Reservoir settings (for additional safety)
      reservoir: 30, // 30 requests per minute
      reservoirRefreshAmount: 30,
      reservoirRefreshInterval: 60 * 1000, // Refresh every minute
    });

    // Event listeners for monitoring
    this.bottleneck.on("executing", (info) => {
      this.requestCount++;
      this.logger.debug(`Executing request #${this.requestCount}`, {
        queued: this.bottleneck.counts().QUEUED,
        running: this.bottleneck.counts().RUNNING,
      });
    });

    this.bottleneck.on("failed", async (error, jobInfo) => {
      this.logger.warn(`Request failed, will retry`, {
        error: error.message,
        retries: jobInfo.retryCount,
      });

      // Retry with exponential backoff
      if (jobInfo.retryCount < SyncConfig.rateLimit.retryAttempts) {
        const delay =
          SyncConfig.rateLimit.retryDelay * Math.pow(2, jobInfo.retryCount);
        this.logger.info(`Retrying in ${delay}ms...`);
        return delay;
      }
    });
  }

  /**
   * Execute a function with rate limiting
   */
  async execute<T>(fn: () => Promise<T>, description?: string): Promise<T> {
    return this.bottleneck.schedule(() => {
      if (description) {
        this.logger.debug(`Rate-limited request: ${description}`);
      }
      return fn();
    });
  }

  /**
   * Get current rate limiter status
   */
  getStatus() {
    const counts = this.bottleneck.counts();
    const elapsed = Date.now() - this.startTime;
    const requestsPerSecond = this.requestCount / (elapsed / 1000);

    return {
      totalRequests: this.requestCount,
      queued: counts.QUEUED,
      running: counts.RUNNING,
      done: counts.DONE,
      elapsed: elapsed,
      requestsPerSecond: requestsPerSecond.toFixed(2),
    };
  }

  /**
   * Wait for all queued requests to complete
   */
  async drain(): Promise<void> {
    this.logger.info("Waiting for all requests to complete...");
    await this.bottleneck.stop({ dropWaitingJobs: false });
    this.logger.success("All requests completed");
  }

  /**
   * Reset the rate limiter
   */
  reset(): void {
    this.bottleneck.stop({ dropWaitingJobs: true });
    this.requestCount = 0;
    this.startTime = Date.now();
    this.logger.info("Rate limiter reset");
  }

  /**
   * Get estimated time remaining for queued requests
   */
  getEstimatedTimeRemaining(): number {
    const queued = this.bottleneck.counts().QUEUED;
    return queued * SyncConfig.rateLimit.minTimeBetweenRequests;
  }

  /**
   * Log current statistics
   */
  logStats(): void {
    const status = this.getStatus();
    const estimatedRemaining = this.getEstimatedTimeRemaining();

    this.logger.info("Rate Limiter Statistics", {
      ...status,
      estimatedRemainingMs: estimatedRemaining,
      estimatedRemainingMin: (estimatedRemaining / 60000).toFixed(1),
    });
  }
}
