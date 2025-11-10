// Session management for beta authentication
export interface UserSession {
  id: string;
  email: string;
  username?: string;
  artistName?: string;
  userType: "fan" | "artist";
  createdAt: string;
}

const SESSION_KEY = "fholio_beta_session";

// Helper to check if we're on client side
const isClient = typeof window !== "undefined";

export const authUtils = {
  // Save session to localStorage
  setSession(session: UserSession) {
    if (!isClient) return;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  },

  // Get current session
  getSession(): UserSession | null {
    if (!isClient) return null;

    try {
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (!sessionData) return null;
      return JSON.parse(sessionData);
    } catch (error) {
      console.error("Failed to get session:", error);
      return null;
    }
  },

  // Clear session (logout)
  clearSession() {
    if (!isClient) return;
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error("Failed to clear session:", error);
    }
  },

  // Check if user is logged in
  isAuthenticated(): boolean {
    return this.getSession() !== null;
  },

  // Get user type
  getUserType(): "fan" | "artist" | null {
    const session = this.getSession();
    return session?.userType || null;
  },
};
