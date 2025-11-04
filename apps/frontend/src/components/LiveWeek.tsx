import { motion } from "framer-motion";
import { useState } from "react";
import {
  Flame,
  TrendingUp,
  Minus,
  Snowflake,
  Clock,
  Users,
  DollarSign,
  Trophy,
  Share2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LiveWeekProps {
  onNavigate: (page: string) => void;
}

export function LiveWeek({ onNavigate }: LiveWeekProps) {
  // Mock lineup data with momentum
  const myLineup = [
    {
      id: "1",
      artistName: "Luna Echo",
      trackName: "Midnight Drive",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      momentum: "fire",
      projectedEarnings: "$3,200 - $7,500",
      influenceCount: 1247,
    },
    {
      id: "3",
      artistName: "Solaris",
      trackName: "Golden Hour",
      imageUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400",
      momentum: "fire",
      projectedEarnings: "$4,100 - $9,200",
      influenceCount: 2104,
    },
    {
      id: "2",
      artistName: "The Neon Wolves",
      trackName: "Electric Dreams",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
      momentum: "rising",
      projectedEarnings: "$2,800 - $6,100",
      influenceCount: 892,
    },
    {
      id: "5",
      artistName: "Crimson Sky",
      trackName: "Horizon",
      imageUrl:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400",
      momentum: "steady",
      projectedEarnings: "$1,500 - $3,200",
      influenceCount: 634,
    },
    {
      id: "6",
      artistName: "Velvet Storm",
      trackName: "Thunder",
      imageUrl:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400",
      momentum: "cooling",
      projectedEarnings: "$800 - $2,100",
      influenceCount: 421,
    },
  ];

  const getMomentumConfig = (momentum: string) => {
    switch (momentum) {
      case "fire":
        return {
          icon: Flame,
          label: "On Fire 🔥",
          color: "text-secondary",
          bgColor: "bg-secondary/10",
          borderColor: "border-secondary/30",
        };
      case "rising":
        return {
          icon: TrendingUp,
          label: "Rising Fast ⬆️",
          color: "text-accent",
          bgColor: "bg-accent/10",
          borderColor: "border-accent/30",
        };
      case "steady":
        return {
          icon: Minus,
          label: "Steady ⚖️",
          color: "text-primary",
          bgColor: "bg-primary/10",
          borderColor: "border-primary/30",
        };
      case "cooling":
        return {
          icon: Snowflake,
          label: "Cooling Off ❄️",
          color: "text-blue-400",
          bgColor: "bg-blue-400/10",
          borderColor: "border-blue-400/30",
        };
      default:
        return {
          icon: Minus,
          label: "Steady",
          color: "text-muted-foreground",
          bgColor: "bg-muted/10",
          borderColor: "border-muted/30",
        };
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-black to-black" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-accent animate-pulse" />
              <span className="text-xs text-accent tracking-widest uppercase">
                Live Week • Competition Active
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 gradient-text tracking-tighter">
              Track. Watch. Earn.
            </h1>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto tracking-tight">
              Follow your lineup's momentum in real-time. No spoilers — just
              trend signals.
            </p>
          </motion.div>

          {/* Results Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 neon-glow max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-accent animate-pulse" />
                <div>
                  <div className="text-white text-lg">Results Reveal In</div>
                  <div className="text-sm text-muted-foreground/70">
                    Sunday 8:00 PM ET
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl text-white">3d 18h</div>
                <div className="text-xs text-muted-foreground/70">
                  Until winners announced
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main: My Lineup Momentum */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="text-3xl text-white mb-6 tracking-tight">
                  Your Lineup This Week
                </h2>

                <div className="space-y-4">
                  {myLineup.map((track, index) => {
                    const config = getMomentumConfig(track.momentum);
                    const Icon = config.icon;

                    return (
                      <motion.div
                        key={track.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`glass-card rounded-2xl p-6 neon-glow border ${config.borderColor}`}
                      >
                        <div className="flex gap-4">
                          <ImageWithFallback
                            src={track.imageUrl}
                            alt={track.trackName}
                            className="w-24 h-24 object-cover rounded-xl"
                          />

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl text-white tracking-tight mb-1">
                                  {track.trackName}
                                </h3>
                                <p className="text-muted-foreground/70">
                                  {track.artistName}
                                </p>
                              </div>
                              <Badge
                                className={`${config.bgColor} ${config.color} border-0`}
                              >
                                <Icon className="w-3 h-3 mr-1" />
                                {config.label}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="glass-card rounded-lg p-3">
                                <div className="text-xs text-muted-foreground/70 mb-1">
                                  Projected Earnings
                                </div>
                                <div className="text-white">
                                  {track.projectedEarnings}
                                </div>
                              </div>
                              <div className="glass-card rounded-lg p-3">
                                <div className="text-xs text-muted-foreground/70 mb-1">
                                  Fan Influence
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-primary" />
                                  <span className="text-white">
                                    {track.influenceCount.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="text-xs text-muted-foreground/70">
                              {track.influenceCount} fans added this track after
                              you — your influence is growing!
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Sidebar: Stats & Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Week Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card rounded-2xl p-6 neon-glow"
                >
                  <h3 className="text-xl text-white mb-6 tracking-tight">
                    This Week's Pool
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <DollarSign className="w-6 h-6 text-accent" />
                        <span className="text-3xl text-white">100K</span>
                      </div>
                      <div className="text-sm text-muted-foreground/70">
                        Total Prize Pool
                      </div>
                    </div>

                    <div className="metallic-divider my-4" />

                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <Trophy className="w-5 h-5 text-primary" />
                        <span className="text-2xl text-white">100</span>
                      </div>
                      <div className="text-sm text-muted-foreground/70">
                        Competing Tracks
                      </div>
                    </div>

                    <div className="metallic-divider my-4" />

                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <Users className="w-5 h-5 text-secondary" />
                        <span className="text-2xl text-white">12,847</span>
                      </div>
                      <div className="text-sm text-muted-foreground/70">
                        Active Fans This Week
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Momentum Legend */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card rounded-2xl p-6 neon-glow"
                >
                  <h3 className="text-lg text-white mb-4 tracking-tight">
                    Momentum Signals
                  </h3>

                  <div className="space-y-3">
                    {[
                      {
                        momentum: "fire",
                        desc: "Strong performance, high engagement",
                      },
                      { momentum: "rising", desc: "Gaining traction rapidly" },
                      {
                        momentum: "steady",
                        desc: "Consistent, stable metrics",
                      },
                      {
                        momentum: "cooling",
                        desc: "Slowing down, needs boost",
                      },
                    ].map(({ momentum, desc }) => {
                      const config = getMomentumConfig(momentum);
                      const Icon = config.icon;

                      return (
                        <div key={momentum} className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center shrink-0`}
                          >
                            <Icon className={`w-4 h-4 ${config.color}`} />
                          </div>
                          <div>
                            <div className={`text-sm ${config.color} mb-1`}>
                              {config.label}
                            </div>
                            <div className="text-xs text-muted-foreground/70">
                              {desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 glass-card rounded-lg border border-accent/20">
                    <div className="text-xs text-muted-foreground/70 mb-2">
                      Note:
                    </div>
                    <p className="text-xs text-muted-foreground/80">
                      Exact rankings are hidden during Live Week. Focus on
                      momentum signals to gauge performance.
                    </p>
                  </div>
                </motion.div>

                {/* Share */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card rounded-2xl p-6 neon-glow text-center"
                >
                  <Share2 className="w-8 h-8 mx-auto mb-3 text-accent" />
                  <h3 className="text-white mb-2">Share Your Lineup</h3>
                  <p className="text-sm text-muted-foreground/70 mb-4">
                    Show your picks and track momentum together
                  </p>
                  <Button className="w-full gradient-bg neon-glow holo-button">
                    Generate Share Card
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
