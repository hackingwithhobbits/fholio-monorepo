import { motion } from "framer-motion";
import { CheckCircle2, Trophy, TrendingUp, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";

interface FanOnboardingProps {
  onNavigate: (page: string) => void;
}

export function FanOnboarding({ onNavigate }: FanOnboardingProps) {
  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      onNavigate("dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated Background - Purple Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.6,
          }}
          className="text-center mb-12"
        >
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse" />
            <CheckCircle2 className="w-32 h-32 text-primary relative z-10" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-center mb-6">
              <Logo size="md" glow />
            </div>
            <h1 className="text-5xl md:text-6xl mb-4 gradient-text tracking-tighter">
              Welcome to Fholio!
            </h1>
            <p className="text-xl text-muted-foreground/80">
              Your fan account is ready
            </p>
          </motion.div>
        </motion.div>

        {/* Quick Start Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-8 mb-8 neon-glow"
        >
          <h2 className="text-2xl text-white tracking-tight mb-6 text-center">
            Get Started in 3 Steps
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1 tracking-tight">
                  Build Your First Fholio
                </h3>
                <p className="text-sm text-muted-foreground/70">
                  Every Monday, draft 5 artists from the Top 50 to create your
                  weekly lineup
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-accent flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1 tracking-tight">
                  Track Performance
                </h3>
                <p className="text-sm text-muted-foreground/70">
                  Watch the leaderboard throughout the week to see how your
                  artists rank
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1 tracking-tight">Earn Rewards</h3>
                <p className="text-sm text-muted-foreground/70">
                  When your artists make the Top 10, you earn 30% of their
                  rewards
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center space-y-4"
        >
          <Button
            onClick={() => onNavigate("dashboard")}
            className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white neon-glow py-6 px-12 rounded-xl transition-all duration-200"
            size="lg"
          >
            Go to My Picks
          </Button>

          <p className="text-sm text-muted-foreground/60">
            Redirecting in 3 seconds...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
