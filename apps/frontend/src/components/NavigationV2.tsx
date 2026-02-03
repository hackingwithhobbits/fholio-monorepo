// apps/frontend/src/components/NavigationV2.tsx

import { Home, Trophy, Music, Eye, LogIn, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";

interface NavigationV2Props {
  currentPage: string;
  userType: "guest" | "fan" | "artist" | null;
  onNavigate: (
    page: string,
    artistId?: string,
    userType?: "guest" | "fan" | "artist",
  ) => void;
}

export function NavigationV2({
  currentPage,
  userType,
  onNavigate,
}: NavigationV2Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items based on user type
  const getNavItems = () => {
    const baseItems = [];

    if (!userType || userType === "guest") {
      baseItems.push(
        { id: "home", label: "Home", icon: Home },
        { id: "leaderboard", label: "Leaderboard", icon: Trophy },
        { id: "about", label: "About", icon: Eye },
      );
    } else {
      // Both fan and artist can see leaderboard
      baseItems.push(
        { id: "home", label: "Home", icon: Home },
        { id: "leaderboard", label: "Leaderboard", icon: Trophy },
      );
    }

    // TODO: Replace with actual admin role check from user session
    // For now, always show admin link for testing
    // const isAdmin = userSession?.role === 'admin';
    const isAdmin = true; // TEMPORARY - Set to false after testing

    if (isAdmin) {
      baseItems.push({ id: "admin", label: "Admin", icon: Shield });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  // Handle logo click - Shift+Click for admin access
  const handleLogoClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      // Secret admin access via Shift+Click
      onNavigate("admin");
    } else {
      onNavigate("home");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Shift+Click for admin */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleLogoClick}
            title="Shift+Click for admin access"
          >
            <Logo
              size="md"
              glow
              className="group-hover:scale-110 transition-transform"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const isAdmin = item.id === "admin";

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 ease-in-out group ${
                    isActive
                      ? "text-white"
                      : isAdmin
                        ? "text-red-400 hover:text-red-300"
                        : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div
                      className={`absolute inset-0 rounded-xl opacity-20 neon-glow ${
                        isAdmin ? "bg-red-500" : "gradient-bg"
                      }`}
                    />
                  )}
                  {!isActive && (
                    <div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200 ease-in-out ${
                        isAdmin ? "bg-red-500" : "gradient-bg"
                      }`}
                    />
                  )}
                  <Icon
                    className={`w-4 h-4 relative z-10 ${
                      isActive
                        ? isAdmin
                          ? "text-red-400"
                          : "text-primary"
                        : ""
                    }`}
                  />
                  <span className="relative z-10 tracking-tight text-sm whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!userType || userType === "guest" ? (
              <Button
                onClick={() => onNavigate("auth")}
                className="gradient-bg hover:opacity-90 neon-glow holo-button rounded-xl px-6 transition-all duration-200 ease-in-out"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary/20 glass-card">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isAdmin = item.id === "admin";

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? isAdmin
                        ? "bg-red-500/20 text-red-400"
                        : "bg-primary/20 text-white"
                      : isAdmin
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            {!userType || userType === "guest" ? (
              <div className="pt-4 space-y-2">
                <Button
                  className="w-full gradient-bg"
                  onClick={() => {
                    onNavigate("auth");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}
