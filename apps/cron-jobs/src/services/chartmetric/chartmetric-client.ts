import axios, { AxiosInstance, AxiosError } from "axios";
import { ChartmetricConfig, SyncConfig } from "../../config/sync.config";
import { Logger } from "../../utils/logger";
import { ChartmetricAuthResponse } from "@fholio/database";

interface TokenCache {
  token: string;
  expiresAt: Date;
}

export class ChartmetricClient {
  private axiosInstance: AxiosInstance;
  private logger: Logger;
  private tokenCache: TokenCache | null = null;

  constructor() {
    this.logger = new Logger("ChartmetricClient");

    this.axiosInstance = axios.create({
      baseURL: ChartmetricConfig.baseUrl,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => this.handleError(error)
    );
  }

  /**
   * Authenticate with Chartmetric and get access token
   */
  async authenticate(): Promise<string> {
    // Check if we have a valid cached token
    if (this.tokenCache && new Date() < this.tokenCache.expiresAt) {
      this.logger.debug("Using cached Chartmetric token");
      return this.tokenCache.token;
    }

    this.logger.info("Authenticating with Chartmetric...");

    try {
      const response = await axios.post<ChartmetricAuthResponse>(
        `${ChartmetricConfig.baseUrl}/token`,
        {
          refreshtoken: ChartmetricConfig.refreshToken,
        }
      );

      const { token, expires_in } = response.data;

      // Cache token with buffer time (1 hour before actual expiry)
      const expiresAt = new Date(
        Date.now() + expires_in * 1000 - ChartmetricConfig.tokenExpiryBuffer
      );

      this.tokenCache = { token, expiresAt };

      this.logger.success("Authenticated with Chartmetric", {
        expiresAt: expiresAt.toISOString(),
      });

      return token;
    } catch (error) {
      this.logger.error("Failed to authenticate with Chartmetric", error);
      throw new Error("Chartmetric authentication failed");
    }
  }

  /**
   * Make authenticated request
   */
  async request<T>(
    method: "GET" | "POST",
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    const token = await this.authenticate();

    try {
      const response = await this.axiosInstance.request<T>({
        method,
        url: endpoint,
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      // If 401, token might be expired - clear cache and retry once
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        this.logger.warn("Token expired, re-authenticating...");
        this.tokenCache = null;
        const newToken = await this.authenticate();

        const retryResponse = await this.axiosInstance.request<T>({
          method,
          url: endpoint,
          params,
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });

        return retryResponse.data;
      }

      throw error;
    }
  }

  /**
   * Handle API errors
   */
  private async handleError(error: AxiosError): Promise<never> {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 401:
          this.logger.error("Unauthorized - Invalid token", { data });
          throw new Error("Chartmetric authentication failed");

        case 403:
          this.logger.error("Forbidden - Access denied", { data });
          throw new Error("Access denied to Chartmetric resource");

        case 404:
          this.logger.warn("Resource not found", {
            url: error.config?.url,
            data,
          });
          throw new Error("Chartmetric resource not found");

        case 429:
          const retryAfter = error.response.headers["retry-after"] || "60";
          this.logger.error("Rate limit exceeded", {
            retryAfter,
            url: error.config?.url,
          });
          throw new Error(`Rate limited - retry after ${retryAfter} seconds`);

        case 500:
        case 502:
        case 503:
          this.logger.error("Chartmetric server error", { status, data });
          throw new Error("Chartmetric API server error");

        default:
          this.logger.error("Chartmetric API error", { status, data });
          throw new Error(`Chartmetric API error: ${status}`);
      }
    } else if (error.request) {
      this.logger.error("No response from Chartmetric", {
        message: error.message,
      });
      throw new Error("No response from Chartmetric API");
    } else {
      this.logger.error("Request setup error", { message: error.message });
      throw error;
    }
  }

  /**
   * Check if client is authenticated
   */
  isAuthenticated(): boolean {
    return this.tokenCache !== null && new Date() < this.tokenCache.expiresAt;
  }

  /**
   * Clear token cache (force re-authentication)
   */
  clearTokenCache(): void {
    this.tokenCache = null;
    this.logger.info("Token cache cleared");
  }
}
