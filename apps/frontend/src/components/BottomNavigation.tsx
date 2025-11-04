import { Home, Vote, Layers, User, Wallet } from "lucide-react";
import { motion } from "framer-motion";

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNavigation({
  currentPage,
  onNavigate,
}: BottomNavigationProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "vote", label: "Vote", icon: Vote },
    { id: "draft", label: "Draft", icon: Layers },
    { id: "dashboard", label: "My Fholio", icon: User },
    { id: "wallet", label: "Wallet", icon: Wallet },
  ];

  const isActive = (pageId: string) => {
    if (pageId === "home") return currentPage === "home";
    if (pageId === "dashboard") return currentPage === "dashboard";
    return currentPage === pageId;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Glass background with blur */}
      <div className="glass-card border-t border-primary/20 rounded-t-3xl">
        {/* Safe area padding for iOS */}
        <div className="px-2 pt-2 pb-safe">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="relative flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[64px] min-h-[56px] rounded-2xl transition-all duration-300 active:scale-95"
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {/* Active indicator */}
                  {active && (
                    <motion.div
                      layoutId="bottomNav"
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  {/* Icon with glow effect when active */}
                  <div className="relative z-10">
                    <Icon
                      className={`w-6 h-6 transition-all duration-300 ${
                        active
                          ? "text-white drop-shadow-[0_0_8px_rgba(126,31,255,0.8)]"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`relative z-10 text-xs transition-all duration-300 ${
                      active ? "text-white" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active glow dot */}
                  {active && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                      style={{
                        boxShadow: "0 0 8px rgba(0, 255, 213, 0.8)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
