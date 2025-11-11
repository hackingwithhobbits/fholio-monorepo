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
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";

interface NavigationProps {
  currentPage: string;

  isLoggedIn?: boolean;
}

export function Navigation({
  currentPage,

  isLoggedIn = false,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = isLoggedIn
    ? [
        { id: "home", label: "Home", icon: Home },
        { id: "discover", label: "Discover", icon: Compass },
        { id: "dashboard", label: "My Fholio", icon: BarChart3 },
        { id: "leaderboard", label: "Leaderboard", icon: Trophy },
        { id: "community", label: "Community", icon: Users },
        { id: "wallet", label: "Wallet", icon: Wallet },
        { id: "prototype", label: "Weekly Cycle", icon: Sparkles },
      ]
    : [
        { id: "home", label: "Home", icon: Home },
        { id: "discover", label: "Discover", icon: Compass },
        { id: "leaderboard", label: "Leaderboard", icon: Trophy },
        { id: "artist-signup", label: "For Artists", icon: Music },
        { id: "prototype", label: "Weekly Cycle", icon: Sparkles },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => router.push("home")}
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
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 ease-in-out group ${
                    isActive
                      ? "text-white"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 gradient-bg rounded-xl opacity-20 neon-glow" />
                  )}
                  {!isActive && (
                    <div className="absolute inset-0 gradient-bg rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200 ease-in-out" />
                  )}
                  <Icon
                    className={`w-4 h-4 relative z-10 ${isActive ? "text-primary" : ""}`}
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
            {!isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push("auth")}
                  className="text-white hover:bg-white/5 rounded-xl transition-all duration-200 ease-in-out"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => router.push("auth")}
                  className="gradient-bg hover:opacity-90 neon-glow holo-button rounded-xl px-6 transition-all duration-200 ease-in-out"
                >
                  Join the League
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => router.push("dashboard")}
                  className="border-primary/30 text-white hover:bg-primary/20 hover:border-primary/50 hover:text-white neon-glow rounded-xl px-6 transition-all"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  $1,834.25
                </Button>
                <button
                  onClick={() => router.push("settings")}
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
                    router.push(item.id);
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
                    router.push("/auth");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full gradient-bg"
                  onClick={() => {
                    router.push("/auth");
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
