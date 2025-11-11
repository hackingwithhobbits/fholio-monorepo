"use client";
import { motion } from "framer-motion";
import { Music, Users, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { useRouter } from "next/navigation";

export function AuthPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Logo and Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Logo size="lg" glow />
          </div>
          <h1 className="text-5xl md:text-6xl mb-4 gradient-text tracking-tighter">
            Welcome to Fholio
          </h1>
          <p className="text-xl text-muted-foreground/80 tracking-tight">
            The Fantasy League of Music
          </p>
        </motion.div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Fan Sign In */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <div
              className="glass-card rounded-3xl p-8 h-full hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
              onClick={() => router.push("/fan-signin")}
            >
              {/* Purple Gradient Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center neon-glow">
                  <Users className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-3xl text-white tracking-tight mb-4 text-center">
                  Sign in as Fan
                </h2>

                <p className="text-muted-foreground/80 text-center mb-8">
                  Build your music portfolio, draft artists, and earn rewards
                  when they win.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground/70">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Draft 5 artists every week</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground/70">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Compete in weekly leagues</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground/70">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Earn up to 30% of artist rewards</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white neon-glow py-6 rounded-xl transition-all duration-300"
                  size="lg"
                >
                  Continue as Fan
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Artist Sign In */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <div
              className="glass-card rounded-3xl p-8 h-full hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
              onClick={() => router.push("/artist-signin")}
            >
              {/* Pink Gradient Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent to-pink-600 flex items-center justify-center neon-glow">
                  <Music className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-3xl text-white tracking-tight mb-4 text-center">
                  Sign in as Artist
                </h2>

                <p className="text-muted-foreground/80 text-center mb-8">
                  Submit your music, gain fans, and earn from performance-based
                  rewards.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground/70">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>Submit tracks every week</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground/70">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>Build your fan base</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground/70">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>Earn from top 10 finishes</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-accent to-pink-600 hover:opacity-90 text-white neon-glow py-6 rounded-xl transition-all duration-300"
                  size="lg"
                >
                  Continue as Artist
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-sm text-muted-foreground/60"
        >
          <p>
            By continuing, you agree to Fholio's Terms of Service and Privacy
            Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}
