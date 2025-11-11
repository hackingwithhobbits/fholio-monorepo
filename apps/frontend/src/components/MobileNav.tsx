import {
  Home,
  Compass,
  BarChart3,
  Trophy,
  Wallet,
  ThumbsUp,
} from "lucide-react";

interface MobileNavProps {
  currentPage: string;
}

export function MobileNav({ currentPage, router.push }: MobileNavProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "vote", label: "Vote", icon: ThumbsUp },
    { id: "draft", label: "Draft", icon: Trophy },
    { id: "dashboard", label: "My Fholio", icon: BarChart3 },
    { id: "wallet", label: "Wallet", icon: Wallet },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-primary/10 backdrop-blur-xl">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive ? "text-white" : "text-muted-foreground"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 mx-3 gradient-bg rounded-xl opacity-20 neon-glow" />
              )}
              <Icon
                className={`w-5 h-5 relative z-10 ${isActive ? "text-primary" : ""}`}
              />
              <span className="text-xs relative z-10 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
