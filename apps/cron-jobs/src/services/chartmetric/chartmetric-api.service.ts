// src/services/chartmetric/chartmetric-api.service.ts

import axios, { AxiosInstance } from "axios";
import { Logger } from "../../utils/logger";
import { RateLimiter } from "./rate-limiter";

export interface ArtistStats {
  chartmetricId: string;
  spotifyFollowers: number;
  spotifyMonthlyListeners: number;
  spotifyPopularity: number;
  instagramFollowers?: number;
  tiktokFollowers?: number;
  playlistCount?: number;
  playlistReach?: number;
}

export interface TrackStats {
  chartmetricTrackId: string;
  spotifyStreams: number;
  spotifyPopularity: number;
  playlistCount?: number;
}

export class ChartmetricAPIService {
  private client: AxiosInstance;
  private rateLimiter: RateLimiter;
  private logger: Logger;
  private accessToken: string | null = null;
  private tokenExpiresAt: Date | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.chartmetric.com/api",
      timeout: 30000,
    });

    this.rateLimiter = new RateLimiter();
    this.logger = new Logger("ChartmetricAPI");
  }

  /**
   * Authenticate with Chartmetric
   */
  private async authenticate(): Promise<void> {
    // Check if token is still valid
    if (
      this.accessToken &&
      this.tokenExpiresAt &&
      new Date() < this.tokenExpiresAt
    ) {
      return;
    }

    try {
      const response = await this.client.post("/token", {
        refreshtoken: process.env.CHARTMETRIC_REFRESH_TOKEN,
      });

      this.accessToken = response.data.token;
      this.tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      this.logger.info("Authenticated with Chartmetric");
    } catch (error) {
      this.logger.error("Failed to authenticate with Chartmetric", error);
      throw error;
    }
  }

  /**
   * Make authenticated request with rate limiting & retry
   */
  private async makeRequest<T>(
    method: string,
    endpoint: string,
    retryCount = 0
  ): Promise<T> {
    await this.authenticate();

    return this.rateLimiter.execute(async () => {
      try {
        const response = await this.client.request<T>({
          method,
          url: endpoint,
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        return response.data;
      } catch (error: any) {
        // Handle rate limiting (429)
        if (error.response?.status === 429) {
          this.logger.warn("Rate limited by Chartmetric, waiting...");

          const retryAfter = parseInt(
            error.response.headers["retry-after"] || "60",
            10
          );
          await this.sleep(retryAfter * 1000);

          // Retry
          if (retryCount < SyncConfig.rateLimit.retryAttempts) {
            return this.makeRequest<T>(method, endpoint, retryCount + 1);
          }
        }

        // Handle other errors
        if (error.response?.status === 401) {
          // Token expired, re-authenticate
          this.accessToken = null;
          await this.authenticate();

          if (retryCount < SyncConfig.rateLimit.retryAttempts) {
            return this.makeRequest<T>(method, endpoint, retryCount + 1);
          }
        }

        // Retry on network errors
        if (
          !error.response &&
          retryCount < SyncConfig.rateLimit.retryAttempts
        ) {
          await this.sleep(SyncConfig.rateLimit.retryDelay);
          return this.makeRequest<T>(method, endpoint, retryCount + 1);
        }

        throw error;
      }
    });
  }

  /**
   * Get artist statistics
   */
  async getArtistStats(chartmetricId: string): Promise<ArtistStats> {
    try {
      // Fetch multiple stats in parallel (but rate-limited)
      const [spotifyStats, socialStats, playlistStats] = await Promise.all([
        this.makeRequest<any>("GET", `/artist/${chartmetricId}/stat/spotify`),
        this.makeRequest<any>(
          "GET",
          `/artist/${chartmetricId}/social-stats`
        ).catch(() => null),
        this.makeRequest<any>(
          "GET",
          `/artist/${chartmetricId}/playlists/spotify`
        ).catch(() => null),
      ]);

      // Extract latest values
      const latestSpotify = spotifyStats?.data?.[spotifyStats.data.length - 1];

      return {
        chartmetricId,
        spotifyFollowers: latestSpotify?.followers || 0,
        spotifyMonthlyListeners: latestSpotify?.monthly_listeners || 0,
        spotifyPopularity: latestSpotify?.popularity || 0,
        instagramFollowers: socialStats?.instagram?.followers,
        tiktokFollowers: socialStats?.tiktok?.followers,
        playlistCount: playlistStats?.total || 0,
        playlistReach: playlistStats?.reach || 0,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch stats for artist ${chartmetricId}`,
        error
      );
      throw error;
    }
  }

  /**
   * Get track statistics
   */
  async getTrackStats(chartmetricTrackId: string): Promise<TrackStats> {
    try {
      const stats = await this.makeRequest<any>(
        "GET",
        `/track/${chartmetricTrackId}/spotify-streaming-stats`
      );

      const latest = stats?.data?.[stats.data.length - 1];

      return {
        chartmetricTrackId,
        spotifyStreams: latest?.streams || 0,
        spotifyPopularity: latest?.popularity || 0,
        playlistCount: latest?.playlist_count || 0,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch stats for track ${chartmetricTrackId}`,
        error
      );
      throw error;
    }
  }

  /**
   * Get trending artists
   */
  async getTrendingArtists(country = "us"): Promise<any[]> {
    try {
      const response = await this.makeRequest<any>(
        "GET",
        `/charts/spotify/trending/artists?country=${country}`
      );
      return response.data || [];
    } catch (error) {
      this.logger.error("Failed to fetch trending artists", error);
      return [];
    }
  }

  /**
   * Batch get artist stats (more efficient)
   */
  async batchGetArtistStats(
    chartmetricIds: string[]
  ): Promise<Map<string, ArtistStats>> {
    const results = new Map<string, ArtistStats>();

    // Process in smaller batches to respect rate limits
    for (
      let i = 0;
      i < chartmetricIds.length;
      i += SyncConfig.batch.parallelRequests
    ) {
      const batch = chartmetricIds.slice(
        i,
        i + SyncConfig.batch.parallelRequests
      );

      const batchResults = await Promise.allSettled(
        batch.map((id) => this.getArtistStats(id))
      );

      batchResults.forEach((result, index) => {
        if (result.status === "fulfilled") {
          results.set(batch[index], result.value);
        } else {
          this.logger.warn(
            `Failed to fetch stats for ${batch[index]}:`,
            result.reason
          );
        }
      });

      // Log progress
      this.logger.info(
        `Fetched ${i + batch.length}/${chartmetricIds.length} artist stats`
      );
    }

    return results;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get rate limiter status
   */
  getRateLimiterStatus() {
    return this.rateLimiter.getStatus();
  }
}
