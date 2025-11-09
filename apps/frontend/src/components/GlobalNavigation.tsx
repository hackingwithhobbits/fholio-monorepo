import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

interface GlobalNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  userType?: "guest" | "fan" | "artist" | null;
}

export function GlobalNavigation({
  currentPage,
  onNavigate,
  isLoggedIn = false,
  userType,
}: GlobalNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
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
        : "home",
    },
    { label: "About", page: "about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card border-b border-primary/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <Logo size="md" glow />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onNavigate(item.page)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  currentPage === item.page
                    ? "text-white bg-gradient-to-r from-primary/30 to-secondary/30"
                    : "text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Join Now Button (for non-logged-in users) */}
          {!isLoggedIn && (
            <div className="hidden lg:block">
              <Button
                onClick={() => onNavigate("fan-signin")}
                className="gradient-bg hover:opacity-90 neon-glow"
              >
                Join Now
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-accent transition-colors"
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-card border-t border-primary/20 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.page
                      ? "text-white bg-gradient-to-r from-primary/30 to-secondary/30"
                      : "text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {!isLoggedIn && (
                <Button
                  onClick={() => {
                    onNavigate("fan-signin");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full gradient-bg hover:opacity-90 neon-glow mt-4"
                >
                  Join Now
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
