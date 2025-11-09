import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { UserCircle, Music as MusicIcon, Eye } from "lucide-react";

interface LandingPageV2Props {
  onNavigate: (
    page: string,
    artistId?: string,
    userType?: "guest" | "fan" | "artist"
  ) => void;
}

export function LandingPageV2({ onNavigate }: LandingPageV2Props) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7e1fff] via-black to-[#ff1f70]">
        {/* Animated glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Particles Background */}
      <div className="particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Logo - Never scales or distorts */}
          <div className="flex justify-center mb-8">
            <Logo size="xl" glow />
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl tracking-tighter leading-tight"
          >
            <span className="gradient-text">The Fantasy League</span>
            <br />
            <span className="gradient-text">for Music.</span>
          </motion.h1>

          {/* Three CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col gap-4 max-w-md mx-auto"
          >
            {/* I'm a Fan - Sign In */}
            <Button
              size="lg"
              onClick={() => onNavigate("fan-signin", undefined, undefined)}
              className="gradient-bg hover:opacity-90 neon-glow holo-button text-lg px-10 py-7 rounded-xl group transition-all duration-200"
            >
              <UserCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              I'm a Fan – Sign In
            </Button>

            {/* I'm an Artist - Submit My Music */}
            <Button
              size="lg"
              onClick={() => onNavigate("artist-signin", undefined, undefined)}
              className="bg-gradient-to-r from-accent to-pink-600 hover:opacity-90 neon-glow text-lg px-10 py-7 rounded-xl group transition-all duration-200"
            >
              <MusicIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              I'm an Artist – Submit My Music
            </Button>

            {/* Continue as Guest */}
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("leaderboard", undefined, "guest")}
              className="border-primary/30 text-white hover:bg-primary/20 hover:border-primary/50 hover:text-white neon-glow text-lg px-10 py-7 rounded-xl group transition-all duration-200"
            >
              <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Continue as Guest
            </Button>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground/60 text-sm tracking-wider"
          >
            Your Fandom. Your Fortune.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
