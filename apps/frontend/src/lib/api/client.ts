// apps/frontend/src/lib/api/client.ts
import axios, { AxiosInstance } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Request interceptor for auth
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor - extract data
    this.client.interceptors.response.use(
      (response) => {
        // Backend returns { success: true, data: {...} }
        // Return the data directly
        return response.data?.data || response.data;
      },
      (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error.response?.data || error);
      },
    );
  }

  async get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    return this.client.get(url, { params });
  }

  async post<T = any>(url: string, data?: any): Promise<T> {
    return this.client.post(url, data);
  }

  async put<T = any>(url: string, data?: any): Promise<T> {
    return this.client.put(url, data);
  }

  async delete<T = any>(url: string): Promise<T> {
    return this.client.delete(url);
  }
}

export const apiClient = new ApiClient();
