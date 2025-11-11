import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Music, Trophy, Tv, User, Menu, X, LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

interface MobileNavigationBarProps {
  currentPage: string;

  onLogout?: () => void;
  isLoggedIn?: boolean;
  userType?: "guest" | "fan" | "artist" | null;
}

export function MobileNavigationBar({
  currentPage,

  onLogout,
  isLoggedIn = false,
  userType = null,
}: MobileNavigationBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const bottomNavItems = [
    { label: "Home", page: "home", icon: Home },
    { label: "Games", page: "weekly-games", icon: Music },
    { label: "Leaderboard", page: "leaderboard", icon: Trophy },
    { label: "Live", page: "live-show", icon: Tv },
    {
      label: "Profile",
      page: isLoggedIn
        ? userType === "artist"
          ? "artist-profile"
          : "fan-profile"
        : "fan-signin",
      icon: User,
    },
  ];

  const menuItems = [
    { label: "Home", page: "home" },
    { label: "Weekly Games", page: "weekly-games" },
    { label: "Leaderboard", page: "leaderboard" },
    { label: "Live Show", page: "live-show" },
    { label: "Wallet", page: "wallet" },
    {
      label: "Profile",
      page: isLoggedIn
        ? userType === "artist"
          ? "artist-profile"
          : "fan-profile"
        : "fan-signin",
    },
    { label: "About", page: "about" },
  ];

  const handleNavigate = (page: string) => {
    router.push(page);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 lg:hidden">
        <div className="flex items-center justify-between px-4 h-16">
          <Logo size="sm" onClick={() => handleNavigate("home")} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center text-white"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Hamburger Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden"
            style={{ top: "64px" }}
          >
            <div className="px-6 py-8 space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.page}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavigate(item.page)}
                  className={`w-full text-left px-4 py-4 rounded-xl transition-all ${
                    currentPage === item.page
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-lg">{item.label}</span>
                </motion.button>
              ))}

              {/* Auth Buttons */}
              <div className="pt-6 space-y-2">
                {isLoggedIn ? (
                  // Logout Button for logged-in users
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-red-500/50 text-red-500 hover:bg-red-500/20 h-12 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </Button>
                ) : (
                  // Join Buttons for guests
                  <>
                    <Button
                      onClick={() => handleNavigate("fan-signin")}
                      className="w-full gradient-bg h-12"
                    >
                      Join as Fan
                    </Button>
                    <Button
                      onClick={() => handleNavigate("artist-signin")}
                      variant="outline"
                      className="w-full border-accent/50 text-accent hover:bg-accent/20 h-12"
                    >
                      Join as Artist
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 lg:hidden">
        <div className="grid grid-cols-5 h-20">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;

            return (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className="flex flex-col items-center justify-center gap-1 relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <Icon
                  className={`w-6 h-6 relative ${
                    isActive ? "text-accent" : "text-white/50"
                  }`}
                />
                <span
                  className={`text-xs relative ${
                    isActive ? "text-accent" : "text-white/50"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
