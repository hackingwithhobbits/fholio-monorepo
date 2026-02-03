// apps/frontend/src/lib/api/services/track.service.ts

import { apiClient } from "../client";

export interface SubmitTrackData {
  title: string;
  genre: string;
  description?: string;
  cover_image_url?: string;
  spotify_url?: string;
  apple_music_url?: string;
  youtube_url?: string;
  audio?: File;
}

class TrackService {
  /**
   * Submit a new track with file upload
   */
  async submitTrack(data: SubmitTrackData) {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("genre", data.genre);

    if (data.description) formData.append("description", data.description);
    if (data.cover_image_url)
      formData.append("cover_image_url", data.cover_image_url);
    if (data.spotify_url) formData.append("spotify_url", data.spotify_url);
    if (data.apple_music_url)
      formData.append("apple_music_url", data.apple_music_url);
    if (data.youtube_url) formData.append("youtube_url", data.youtube_url);
    if (data.audio) formData.append("audio", data.audio);

    // Use fetch directly for FormData (axios has issues with FormData)
    const token = localStorage.getItem("auth_token");

    const response = await fetch("http://localhost:3001/api/tracks/submit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit track");
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Get my track submissions
   */
  async getMySubmissions() {
    return apiClient.get("/tracks/my-submissions");
  }

  /**
   * Get my artist stats
   */
  async getMyStats() {
    return apiClient.get("/tracks/my-stats");
  }

  /**
   * Get my tracks
   */
  async getMyTracks() {
    return apiClient.get("/tracks/my-tracks");
  }
}

export const trackService = new TrackService();
