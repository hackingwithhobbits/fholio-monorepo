import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiErrorResponse, ApiResponse } from "./types";

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add user ID for development (replace with proper auth later)
    const userId = localStorage.getItem("user_id");
    if (userId) {
      config.headers["x-user-id"] = userId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data, // Return just the data
  (error: AxiosError<ApiErrorResponse>) => {
    // Handle errors consistently
    const errorMessage =
      error.response?.data?.error?.message ||
      error.message ||
      "An error occurred";

    console.error("API Error:", {
      status: error.response?.status,
      message: errorMessage,
      url: error.config?.url,
    });

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      code: error.response?.data?.error?.code,
    });
  }
);

// Generic fetch function
export async function apiFetch<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return apiClient.request<any, ApiResponse<T>>({
    url: endpoint,
    ...config,
  });
}
