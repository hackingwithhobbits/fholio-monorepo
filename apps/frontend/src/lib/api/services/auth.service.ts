// apps/frontend/src/lib/api/services/auth.service.ts
import { apiClient } from "../client";

export interface SignUpFanData {
  email: string;
  username: string;
  displayName: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    display_name: string;
    user_type: "fan" | "artist";
    created_at: string;
  };
  session: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
}

class AuthService {
  async signUpFan(data: SignUpFanData): Promise<AuthResponse> {
    return apiClient.post("/auth/signup/fan", data);
  }

  async signInFan(email: string): Promise<AuthResponse> {
    return apiClient.post("/auth/signin/fan", { email });
  }

  async signUpArtist(data: {
    email: string;
    artistName: string;
  }): Promise<AuthResponse> {
    return apiClient.post("/auth/signup/artist", data);
  }

  async signInArtist(email: string): Promise<AuthResponse> {
    return apiClient.post("/auth/signin/artist", { email });
  }
}

export const authService = new AuthService();
