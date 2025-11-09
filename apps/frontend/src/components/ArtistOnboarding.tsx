import { motion } from "framer-motion";
import { CheckCircle2, Music, Upload, Award, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";

interface ArtistOnboardingProps {
  onNavigate: (page: string) => void;
}

export function ArtistOnboarding({ onNavigate }: ArtistOnboardingProps) {
  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      onNavigate("artist-dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated Background - Pink Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-pink-950/30 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
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
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-pink-600 rounded-full blur-2xl opacity-50 animate-pulse" />
            <CheckCircle2 className="w-32 h-32 text-accent relative z-10" />
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
              Your artist account is ready
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-pink-600 flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1 tracking-tight">
                  Submit Your Music
                </h3>
                <p className="text-sm text-muted-foreground/70">
                  Upload your tracks each week to be considered for the Top 100
                  voting round
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-secondary flex items-center justify-center flex-shrink-0">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1 tracking-tight">
                  Build Your Fan Base
                </h3>
                <p className="text-sm text-muted-foreground/70">
                  Engage with fans who vote for and draft your music in their
                  lineups
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1 tracking-tight">
                  Earn from Performance
                </h3>
                <p className="text-sm text-muted-foreground/70">
                  Make it to the Top 10 and earn 40% of the weekly prize pool,
                  plus build a loyal following
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
            onClick={() => onNavigate("artist-dashboard")}
            className="bg-gradient-to-r from-accent to-pink-600 hover:opacity-90 text-white neon-glow py-6 px-12 rounded-xl transition-all duration-200"
            size="lg"
          >
            Go to My Submissions
          </Button>

          <p className="text-sm text-muted-foreground/60">
            Redirecting in 3 seconds...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
