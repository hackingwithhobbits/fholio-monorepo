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

// Helper to set cookie
function setCookie(name: string, value: string, days: number = 7) {
  if (!isClient) return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

// Helper to delete cookie
function deleteCookie(name: string) {
  if (!isClient) return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export const authUtils = {
  // Save session to localStorage AND cookie
  setSession(session: UserSession) {
    if (!isClient) return;
    try {
      const sessionStr = JSON.stringify(session);
      localStorage.setItem(SESSION_KEY, sessionStr);
      setCookie("fholio_session", "true", 7); // Cookie for middleware
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
      deleteCookie("fholio_session");
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
