import { ChartmetricClient } from "./chartmetric-client";
import { RateLimiter } from "./rate-limiter";
import { Logger } from "../../utils/logger";
import {
  ChartmetricArtistSearchResult,
  ChartmetricArtistDetails,
  ChartmetricSpotifyStatsResponse,
  ChartmetricStatDataPoint,
  ChartmetricPlaylistStats,
  ChartmetricEmergingArtist,
  ChartmetricTrack,
} from "@fholio/database";

export interface ArtistSpotifyStats {
  chartmetricId: number;
  followers: number;
  monthlyListeners: number;
  popularity: number;
  timestamp: string;
}

export interface ArtistPlaylistData {
  totalPlaylists: number;
  totalReach: number;
  totalFollowers: number;
}

export class ChartmetricAPIService {
  private client: ChartmetricClient;
  private rateLimiter: RateLimiter;
  private logger: Logger;

  constructor() {
    this.client = new ChartmetricClient();
    this.rateLimiter = new RateLimiter();
    this.logger = new Logger("ChartmetricAPI");
  }

  /**
   * Search for artists by name
   */
  async searchArtists(
    query: string,
    limit: number = 10
  ): Promise<ChartmetricArtistSearchResult[]> {
    this.logger.debug(`Searching for artists: "${query}"`);

    return this.rateLimiter.execute(async () => {
      const response = await this.client.request<any>("GET", "/search", {
        q: query,
        type: "artists",
        limit,
      });

      return response.obj?.artists || [];
    }, `Search artists: ${query}`);
  }

  /**
   * Get artist details by Chartmetric ID
   */
  async getArtistDetails(
    chartmetricId: number
  ): Promise<ChartmetricArtistDetails> {
    this.logger.debug(`Fetching artist details for CM ID: ${chartmetricId}`);

    return this.rateLimiter.execute(async () => {
      const response = await this.client.request<any>(
        "GET",
        `/artist/${chartmetricId}`
      );
      return response.obj;
    }, `Get artist ${chartmetricId}`);
  }

  /**
   * Get artist Spotify stats (followers, listeners, popularity)
   */
  async getArtistSpotifyStats(
    chartmetricId: number,
    since?: string
  ): Promise<ArtistSpotifyStats> {
    this.logger.debug(`Fetching Spotify stats for CM ID: ${chartmetricId}`);

    return this.rateLimiter.execute(async () => {
      const params: any = {};
      if (since) {
        params.since = since;
      }

      const response =
        await this.client.request<ChartmetricSpotifyStatsResponse>(
          "GET",
          `/artist/${chartmetricId}/stat/spotify`,
          params
        );

      const data = response.obj.data;

      if (!data || data.length === 0) {
        throw new Error(`No Spotify stats found for artist ${chartmetricId}`);
      }

      // Get the latest data point for each field
      const latestFollowers = this.getLatestValue(data, "followers");
      const latestListeners = this.getLatestValue(data, "listeners");
      const latestPopularity = this.getLatestValue(data, "popularity");

      return {
        chartmetricId,
        followers: latestFollowers?.value || 0,
        monthlyListeners: latestListeners?.value || 0,
        popularity: latestPopularity?.value || 0,
        timestamp: latestFollowers?.timestp || new Date().toISOString(),
      };
    }, `Get Spotify stats ${chartmetricId}`);
  }

  /**
   * Get artist's tracks
   */
  async getArtistTracks(
    chartmetricId: number,
    limit: number = 50
  ): Promise<ChartmetricTrack[]> {
    this.logger.debug(`Fetching tracks for CM ID: ${chartmetricId}`);

    return this.rateLimiter.execute(async () => {
      const response = await this.client.request<any>(
        "GET",
        `/artist/${chartmetricId}/tracks/spotify`,
        { limit }
      );

      return response.obj?.data || [];
    }, `Get tracks ${chartmetricId}`);
  }

  /**
   * Get artist playlist placements (count and reach)
   */
  async getArtistPlaylistData(
    chartmetricId: number
  ): Promise<ArtistPlaylistData> {
    this.logger.debug(`Fetching playlist data for CM ID: ${chartmetricId}`);

    return this.rateLimiter.execute(async () => {
      const response = await this.client.request<any>(
        "GET",
        `/artist/${chartmetricId}/playlists/spotify`
      );

      const playlists = response.obj?.data || [];

      // Calculate totals
      const uniquePlaylists = new Set(playlists.map((p: any) => p.playlist_id));
      const totalReach = playlists.reduce(
        (sum: number, p: any) => sum + (p.followers || 0),
        0
      );

      return {
        totalPlaylists: uniquePlaylists.size,
        totalReach: totalReach,
        totalFollowers: totalReach, // Same as reach in this case
      };
    }, `Get playlists ${chartmetricId}`);
  }

  /**
   * Get emerging artists
   */
  async getEmergingArtists(
    options: {
      limit?: number;
      genre?: string;
      countryCode?: string;
    } = {}
  ): Promise<ChartmetricEmergingArtist[]> {
    const { limit = 100, genre, countryCode } = options;

    this.logger.debug("Fetching emerging artists", {
      limit,
      genre,
      countryCode,
    });

    return this.rateLimiter.execute(async () => {
      const params: any = { limit };
      if (genre) params.genre = genre;
      if (countryCode) params.country_code = countryCode;

      const response = await this.client.request<any>(
        "GET",
        "/artist/list/emerging",
        params
      );

      return response.obj?.data || [];
    }, "Get emerging artists");
  }

  /**
   * Get momentum artists (fast-growing)
   */
  async getMomentumArtists(
    options: {
      limit?: number;
      countryCode?: string;
    } = {}
  ): Promise<any[]> {
    const { limit = 50, countryCode } = options;

    this.logger.debug("Fetching momentum artists", { limit, countryCode });

    return this.rateLimiter.execute(async () => {
      const params: any = {
        type: "spotify",
        limit,
      };
      if (countryCode) params.country_code = countryCode;

      const response = await this.client.request<any>(
        "GET",
        "/charts/momentum/artists",
        params
      );

      return response.obj?.data || [];
    }, "Get momentum artists");
  }

  /**
   * Get artist Instagram followers
   */
  async getArtistInstagramStats(chartmetricId: number): Promise<number> {
    this.logger.debug(`Fetching Instagram stats for CM ID: ${chartmetricId}`);

    return this.rateLimiter.execute(async () => {
      const response = await this.client.request<any>(
        "GET",
        `/artist/${chartmetricId}/stat/instagram`
      );

      const data = response.obj?.data || [];
      const latestFollowers = this.getLatestValue(data, "followers");

      return latestFollowers?.value || 0;
    }, `Get Instagram ${chartmetricId}`);
  }

  /**
   * Get artist TikTok followers
   */
  async getArtistTikTokStats(chartmetricId: number): Promise<number> {
    this.logger.debug(`Fetching TikTok stats for CM ID: ${chartmetricId}`);

    return this.rateLimiter.execute(async () => {
      const response = await this.client.request<any>(
        "GET",
        `/artist/${chartmetricId}/stat/tiktok`
      );

      const data = response.obj?.data || [];
      const latestFollowers = this.getLatestValue(data, "followers");

      return latestFollowers?.value || 0;
    }, `Get TikTok ${chartmetricId}`);
  }

  /**
   * Batch get artist stats (with rate limiting)
   */
  async batchGetArtistStats(
    chartmetricIds: number[]
  ): Promise<Map<number, ArtistSpotifyStats>> {
    this.logger.info(
      `Batch fetching stats for ${chartmetricIds.length} artists`
    );

    const results = new Map<number, ArtistSpotifyStats>();

    for (let i = 0; i < chartmetricIds.length; i++) {
      const id = chartmetricIds[i];

      try {
        const stats = await this.getArtistSpotifyStats(id);
        results.set(id, stats);

        // Log progress every 10 artists
        if ((i + 1) % 10 === 0) {
          this.logger.progress(i + 1, chartmetricIds.length);
        }
      } catch (error) {
        this.logger.error(`Failed to fetch stats for artist ${id}`, error);
      }
    }

    this.logger.success(
      `Fetched stats for ${results.size}/${chartmetricIds.length} artists`
    );

    return results;
  }

  /**
   * Helper: Get latest value from time series data
   */
  private getLatestValue(
    data: ChartmetricStatDataPoint[],
    field: string
  ): ChartmetricStatDataPoint | undefined {
    return data
      .filter((d) => d.field === field)
      .sort(
        (a, b) => new Date(b.timestp).getTime() - new Date(a.timestp).getTime()
      )[0];
  }

  /**
   * Get rate limiter status
   */
  getRateLimiterStatus() {
    return this.rateLimiter.getStatus();
  }

  /**
   * Log rate limiter stats
   */
  logRateLimiterStats() {
    this.rateLimiter.logStats();
  }

  /**
   * Wait for all pending requests
   */
  async drain() {
    await this.rateLimiter.drain();
  }
}
