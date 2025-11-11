import { useState } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Flame,
  Zap,
  Settings,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface MobileLiveWeekProps {}

interface Artist {
  id: string;
  name: string;
  track: string;
  image: string;
  momentum: "hot" | "rising" | "steady" | "cooling";
  momentumScore: number;
  trend: "up" | "down" | "stable";
  streams: string;
  inMyLineup?: boolean;
}

export function MobileLiveWeek({}: MobileLiveWeekProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [showMyLineup, setShowMyLineup] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const router = useRouter();
  const artists: Artist[] = [
    {
      id: "5",
      name: "Jasmine Cole",
      track: "Velvet Nights",
      image:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
      momentum: "hot",
      momentumScore: 98,
      trend: "up",
      streams: "2.4M",
      inMyLineup: true,
    },
    {
      id: "1",
      name: "Luna Eclipse",
      track: "Midnight Dreams",
      image:
        "https://images.unsplash.com/photo-1619983081563-430f63602796?w=400",
      momentum: "hot",
      momentumScore: 95,
      trend: "up",
      streams: "2.1M",
      inMyLineup: true,
    },
    {
      id: "2",
      name: "Metro Collective",
      track: "Urban Symphony",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      momentum: "rising",
      momentumScore: 87,
      trend: "up",
      streams: "1.8M",
      inMyLineup: true,
    },
    {
      id: "4",
      name: "Neon Syntax",
      track: "Electric Pulse",
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400",
      momentum: "steady",
      momentumScore: 72,
      trend: "stable",
      streams: "1.5M",
      inMyLineup: true,
    },
    {
      id: "3",
      name: "The Wanderers",
      track: "Desert Bloom",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
      momentum: "cooling",
      momentumScore: 58,
      trend: "down",
      streams: "1.2M",
      inMyLineup: true,
    },
    {
      id: "6",
      name: "The Architects",
      track: "Blueprint",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
      momentum: "rising",
      momentumScore: 82,
      trend: "up",
      streams: "1.6M",
    },
  ];

  const myLineup = artists.filter((a) => a.inMyLineup);
  const filteredArtists =
    filter === "all"
      ? artists
      : filter === "mine"
        ? myLineup
        : artists.filter((a) => a.momentum === filter);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getMomentumConfig = (momentum: string) => {
    switch (momentum) {
      case "hot":
        return {
          icon: Flame,
          label: "On Fire",
          color: "text-orange-500",
          bg: "bg-orange-500/20",
          border: "border-orange-500/30",
          glow: "shadow-orange-500/20",
        };
      case "rising":
        return {
          icon: TrendingUp,
          label: "Rising Fast",
          color: "text-primary",
          bg: "bg-primary/20",
          border: "border-primary/30",
          glow: "shadow-primary/20",
        };
      case "steady":
        return {
          icon: Minus,
          label: "Steady",
          color: "text-yellow-500",
          bg: "bg-yellow-500/20",
          border: "border-yellow-500/30",
          glow: "shadow-yellow-500/20",
        };
      case "cooling":
        return {
          icon: TrendingDown,
          label: "Cooling Off",
          color: "text-blue-400",
          bg: "bg-blue-400/20",
          border: "border-blue-400/30",
          glow: "shadow-blue-400/20",
        };
      default:
        return {
          icon: Minus,
          label: "Steady",
          color: "text-muted-foreground",
          bg: "bg-muted/20",
          border: "border-muted/30",
          glow: "shadow-muted/20",
        };
    }
  };

  const calculateProjectedRange = () => {
    const lineupScores = myLineup.map((a) => a.momentumScore);
    const avgScore =
      lineupScores.reduce((a, b) => a + b, 0) / lineupScores.length;

    if (avgScore >= 90) return { min: 5, max: 12, label: "Top 5-12" };
    if (avgScore >= 80) return { min: 10, max: 20, label: "Top 10-20" };
    if (avgScore >= 70) return { min: 15, max: 30, label: "Top 15-30" };
    return { min: 20, max: 40, label: "Top 20-40" };
  };

  const projectedRange = calculateProjectedRange();

  return (
    <div className="min-h-screen bg-black pb-24 pt-safe">
      {/* Mobile Header with Logo */}
      <div className="sticky top-0 z-40 pt-safe bg-black/90 backdrop-blur-xl border-b border-primary/10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="w-10" /> {/* Spacer for centering */}
          <Logo size="sm" glow />
          <button
            onClick={() => router.push("/settings")}
            className="p-2 text-white hover:text-primary transition-colors duration-300"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="sticky top-[52px] z-30 bg-black/90 backdrop-blur-xl border-b border-primary/10 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-white text-xl">Live Week</h1>
            <p className="text-sm text-muted-foreground">
              Real-time momentum tracking
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-all ${
              refreshing ? "animate-spin" : ""
            }`}
          >
            <RefreshCw className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Time Remaining */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-xs text-white">
              Results reveal in 3d 4h 17m
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-4 overflow-x-auto scrollbar-hide sticky top-[152px] z-20 bg-gradient-to-b from-black via-black to-transparent">
        <div className="flex gap-2">
          {["all", "mine", "hot", "rising", "steady", "cooling"].map(
            (filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption)}
                className={`rounded-full text-xs whitespace-nowrap capitalize ${
                  filter === filterOption
                    ? "gradient-bg text-white"
                    : "border-white/20 text-white hover:border-white/40 hover:bg-white/10 hover:text-white transition-all duration-300"
                }`}
              >
                {filterOption === "mine" && "⭐ "}
                {filterOption === "hot" && "🔥 "}
                {filterOption === "rising" && "↗️ "}
                {filterOption === "steady" && "⚖️ "}
                {filterOption === "cooling" && "❄️ "}
                {filterOption}
              </Button>
            )
          )}
        </div>
      </div>

      {/* My Lineup Performance */}
      <Collapsible open={showMyLineup} onOpenChange={setShowMyLineup}>
        <div className="px-6 py-4">
          <CollapsibleTrigger className="w-full">
            <div className="glass-card p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <h3 className="text-white">My Lineup Performance</h3>
                </div>
                {showMyLineup ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              {/* Projected Range Meter */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Projected Finish
                  </span>
                  <span className="text-white">{projectedRange.label}</span>
                </div>
                <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-1 h-full bg-white/40"
                      style={{ marginLeft: "20%" }}
                    />
                    <div
                      className="w-1 h-full bg-white/40"
                      style={{ marginLeft: "20%" }}
                    />
                    <div
                      className="w-1 h-full bg-white/40"
                      style={{ marginLeft: "20%" }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Rank 1</span>
                  <span>Rank 50</span>
                  <span>Rank 100</span>
                </div>
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="mt-4 space-y-2">
              {myLineup.map((artist, index) => {
                const config = getMomentumConfig(artist.momentum);
                const Icon = config.icon;

                return (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-3 rounded-xl flex items-center gap-3"
                  >
                    <ImageWithFallback
                      src={artist.image}
                      alt={artist.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">
                        {artist.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {artist.track}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 ${config.color}`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">{artist.momentumScore}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Heat Map List */}
      <div className="px-6 pb-6 space-y-3">
        <h3 className="text-white text-sm mb-4">Live Momentum Board</h3>

        {filteredArtists.map((artist, index) => {
          const config = getMomentumConfig(artist.momentum);
          const Icon = config.icon;

          return (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-card rounded-2xl overflow-hidden border ${config.border} ${config.glow} shadow-lg relative`}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 ${config.bg} opacity-30`} />

              <div className="relative p-4">
                <div className="flex items-center gap-4">
                  {/* Artist Image */}
                  <div className="relative flex-shrink-0">
                    <ImageWithFallback
                      src={artist.image}
                      alt={artist.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    {artist.inMyLineup && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-black text-xs">
                        ★
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white truncate mb-0.5">
                          {artist.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {artist.track}
                        </p>
                      </div>
                      <Badge
                        className={`${config.bg} ${config.color} border-0 flex items-center gap-1`}
                      >
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </Badge>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {artist.streams} streams
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${config.color}`}
                      >
                        <Zap className="w-3 h-3" />
                        <span>Score: {artist.momentumScore}</span>
                      </div>
                    </div>

                    {/* Mini Waveform Visualization */}
                    <div className="mt-3 flex gap-0.5 h-6 items-end">
                      {Array.from({ length: 20 }).map((_, i) => {
                        const height =
                          (artist.momentumScore / 100) *
                          (50 + Math.sin(i * 0.5) * 50);
                        return (
                          <motion.div
                            key={i}
                            className={`flex-1 ${config.bg} rounded-t`}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: index * 0.05 + i * 0.02 }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="px-6 pb-6">
        <div className="glass-card p-4 rounded-2xl bg-accent/5 border-accent/20">
          <p className="text-sm text-white mb-1">
            No ranks shown during Live Week
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Follow momentum tags to see how your artists are performing. Final
            rankings and rewards revealed at week's end.
          </p>
        </div>
      </div>
    </div>
  );
}
