// apps/frontend/src/lib/auth.ts (or wherever it is)

export interface UserSession {
  id: string;
  email: string;
  username: string;
  userType: "fan" | "artist";
  createdAt: string;
}

const SESSION_KEY = "fholio_beta_session"; // Match what's actually being used
const TOKEN_KEY = "auth_token"; // Match what API client expects

export const authUtils = {
  setSession: (user: UserSession, token?: string) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  getSession: (): UserSession | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!authUtils.getToken();
  },
  // Get user type
  getUserType(): "fan" | "artist" | null {
    const session = this.getSession();
    return session?.userType || null;
  },
};
