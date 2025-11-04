import {
  Home,
  BarChart3,
  Wallet,
  BookOpen,
  Menu,
  X,
  Compass,
  Users,
  Trophy,
  ThumbsUp,
  Play,
  TrendingUp,
  Settings,
  Music,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
}

export function Navigation({
  currentPage,
  onNavigate,
  isLoggedIn = false,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = isLoggedIn
    ? [
        { id: "home", label: "Home", icon: Home },
        { id: "discover", label: "Discover", icon: Compass },
        { id: "dashboard", label: "My Fholio", icon: BarChart3 },
        { id: "leaderboard", label: "Leaderboard", icon: Trophy },
        { id: "community", label: "Community", icon: Users },
        { id: "wallet", label: "Wallet", icon: Wallet },
      ]
    : [
        { id: "home", label: "Home", icon: Home },
        { id: "discover", label: "Discover", icon: Compass },
        { id: "leaderboard", label: "Leaderboard", icon: Trophy },
        { id: "artist-signup", label: "For Artists", icon: Music },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate("home")}
          >
            <Logo
              size="md"
              glow
              className="group-hover:scale-110 transition-transform"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all group ${
                    isActive
                      ? "text-white"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 gradient-bg rounded-xl opacity-20 neon-glow" />
                  )}
                  <Icon
                    className={`w-4 h-4 relative z-10 ${
                      isActive ? "text-primary" : ""
                    }`}
                  />
                  <span className="relative z-10 tracking-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate("dashboard")}
                  className="text-white hover:bg-white/5 rounded-xl"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => onNavigate("dashboard")}
                  className="gradient-bg hover:opacity-90 neon-glow holo-button rounded-xl px-6"
                >
                  Join the League
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => onNavigate("dashboard")}
                  className="border-primary/30 text-white hover:bg-primary/20 hover:border-primary/50 hover:text-white neon-glow rounded-xl px-6 transition-all"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  $1,834.25
                </Button>
                <button
                  onClick={() => onNavigate("settings")}
                  className="p-2.5 rounded-xl text-white hover:bg-white/5 hover:text-primary transition-all duration-300"
                  aria-label="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
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
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? "bg-primary/20 text-white"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            {!isLoggedIn && (
              <div className="pt-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-primary/40"
                  onClick={() => {
                    onNavigate("dashboard");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full gradient-bg"
                  onClick={() => {
                    onNavigate("dashboard");
                    setMobileMenuOpen(false);
                  }}
                >
                  Join the League
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
