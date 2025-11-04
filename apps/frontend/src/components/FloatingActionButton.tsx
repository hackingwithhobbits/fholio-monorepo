import { Plus, Heart, UserPlus, Edit, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FloatingActionButtonProps {
  currentPage: string;
  onAction: () => void;
}

export function FloatingActionButton({
  currentPage,
  onAction,
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Define context-aware actions
  const getActionConfig = () => {
    switch (currentPage) {
      case "vote":
        return {
          icon: Heart,
          label: "Upvote",
          color: "from-secondary to-primary",
        };
      case "draft":
        return {
          icon: UserPlus,
          label: "Add Artist",
          color: "from-primary to-accent",
        };
      case "dashboard":
        return {
          icon: Edit,
          label: "Edit Lineup",
          color: "from-accent to-primary",
        };
      case "discover":
        return {
          icon: Sparkles,
          label: "Add to Fholio",
          color: "from-primary to-secondary",
        };
      default:
        return {
          icon: Plus,
          label: "Quick Action",
          color: "from-primary to-secondary",
        };
    }
  };

  const config = getActionConfig();
  const Icon = config.icon;

  // Don't show on home or certain pages
  if (
    [
      "home",
      "rules",
      "leagues",
      "sponsors",
      "education",
      "charts",
      "artist-signup",
    ].includes(currentPage)
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-4 z-40 lg:hidden">
      <AnimatePresence>
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            onAction();
            // Haptic feedback simulation with animation
            setIsExpanded(true);
            setTimeout(() => setIsExpanded(false), 300);
          }}
          className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${config.color} shadow-2xl flex items-center justify-center group active:scale-90 transition-transform`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {/* Pulsing glow animation */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.color} blur-xl`}
          />

          {/* Icon */}
          <motion.div
            animate={
              isExpanded
                ? {
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.2, 1],
                  }
                : {}
            }
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-6 h-6 text-white relative z-10" />
          </motion.div>

          {/* Ripple effect on tap */}
          {isExpanded && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              className="absolute inset-0 rounded-full border-2 border-white"
            />
          )}
        </motion.button>
      </AnimatePresence>

      {/* Tooltip on long press or hover */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-black/90 rounded-lg text-white text-sm whitespace-nowrap pointer-events-none"
      >
        {config.label}
      </motion.div>
    </div>
  );
}
