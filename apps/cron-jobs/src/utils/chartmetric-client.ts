import axios, { AxiosInstance } from "axios";

export class ChartmetricClient {
  private client: AxiosInstance;
  private refreshToken: string;
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
    this.client = axios.create({
      baseURL: "https://api.chartmetric.com/api",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private async refreshAccessToken(): Promise<void> {
    try {
      const response = await axios.post(
        "https://api.chartmetric.com/api/token",
        {
          refreshtoken: this.refreshToken,
        }
      );

      // The response structure is: { token: "...", expires_in: 3600, ... }
      this.accessToken = response.data.token; // ← Changed from response.data.access_token

      // Token expires in 3600 seconds (1 hour), we'll refresh after 55 minutes
      const expiresInMs = (response.data.expires_in || 3600) * 1000;
      this.tokenExpiresAt = Date.now() + (expiresInMs - 5 * 60 * 1000); // Refresh 5 min before expiry

      console.log("✅ Access token refreshed");
    } catch (error: any) {
      console.error(
        "❌ Failed to refresh access token:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  private async ensureValidToken(): Promise<void> {
    if (!this.accessToken || Date.now() >= this.tokenExpiresAt) {
      await this.refreshAccessToken();
    }
  }

  async get<T>(url: string, params?: any): Promise<T> {
    await this.ensureValidToken();

    try {
      const response = await this.client.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Token might have expired, try refreshing once
        console.log("🔄 Token expired, refreshing...");
        await this.refreshAccessToken();

        const response = await this.client.get(url, {
          params,
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        return response.data;
      }

      throw error;
    }
  }
}
