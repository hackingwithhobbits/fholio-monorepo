import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Heart,
  Share2,
  TrendingUp,
  Clock,
  Users,
  Trophy,
  Zap,
  Crown,
  Star,
  ChevronRight,
  Lock,
  Flame,
  Radio,
  MessageSquare,
  Award,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Gift,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type PhaseType = "voting" | "reveal" | "selection" | "liveshow" | "daily";

interface Track {
  id: number;
  title: string;
  artist: string;
  image: string;
  votes: number;
  trending: number;
  rank: number;
}

interface Artist {
  id: number;
  name: string;
  image: string;
  streams: string;
  trend: number;
  rank: number;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  xp: number;
  progress: number;
  total: number;
}

const WeeklyPrototype = () => {
  const [currentPhase, setCurrentPhase] = useState<PhaseType>("voting");
  const [selectedTracks, setSelectedTracks] = useState<number[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<number[]>([]);
  const [tier, setTier] = useState<"free" | "pro" | "vip">("free");
  const [showConfetti, setShowConfetti] = useState(false);
  const [countdown, setCountdown] = useState({
    hours: 47,
    minutes: 32,
    seconds: 15,
  });

  // Mock data
  const top100Tracks: Track[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: [
      "Midnight Dreams",
      "Electric Pulse",
      "Neon Nights",
      "Skyline",
      "Echoes",
      "Fading Light",
      "Crystal Heart",
      "Summer Rain",
    ][i % 8],
    artist: [
      "Luna Rose",
      "The Voidz",
      "DJ Apex",
      "Sarah Chen",
      "Dark Matter",
      "NOVA",
      "Starlight",
      "Phoenix",
    ][i % 8],
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2R8ZW58MXx8fHwxNzYyMTI5OTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    votes: Math.floor(Math.random() * 50000),
    trending: Math.floor(Math.random() * 100) - 50,
    rank: i + 1,
  }));

  const top50Artists: Artist[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: [
      "Luna Rose",
      "The Voidz",
      "DJ Apex",
      "Sarah Chen",
      "Dark Matter",
      "NOVA",
      "Starlight",
      "Phoenix",
      "Echo Wave",
      "Midnight",
    ][i % 10],
    image:
      "https://images.unsplash.com/photo-1669459881627-06c2a4948e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1pbmd8ZW58MXx8fHwxNzYyMjExOTg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    streams: `${(Math.random() * 10 + 1).toFixed(1)}M`,
    trend: Math.floor(Math.random() * 20) - 5,
    rank: i + 1,
  }));

  const dailyChallenges: Challenge[] = [
    {
      id: 1,
      title: "Vote on 10 Tracks",
      description: "Help shape this week's Top 50",
      xp: 100,
      progress: 6,
      total: 10,
    },
    {
      id: 2,
      title: "Pick an Underdog",
      description: "Select an artist ranked 40-50",
      xp: 150,
      progress: 0,
      total: 1,
    },
    {
      id: 3,
      title: "Squad Up",
      description: "Join or create a squad",
      xp: 200,
      progress: 1,
      total: 1,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) hours = 0;
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTrackVote = (id: number) => {
    if (selectedTracks.includes(id)) {
      setSelectedTracks(selectedTracks.filter((t) => t !== id));
    } else if (selectedTracks.length < 10) {
      setSelectedTracks([...selectedTracks, id]);
    }
  };

  const toggleArtistSelect = (id: number) => {
    const maxSelections = tier === "free" ? 5 : tier === "pro" ? 10 : 15;
    if (selectedArtists.includes(id)) {
      setSelectedArtists(selectedArtists.filter((a) => a !== id));
    } else if (selectedArtists.length < maxSelections) {
      setSelectedArtists([...selectedArtists, id]);
    }
  };

  const maxArtists = tier === "free" ? 5 : tier === "pro" ? 10 : 15;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Phase Navigation */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-black via-black to-transparent backdrop-blur-xl border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="bg-gradient-to-r from-purple-400 via-pink-500 to-teal-400 bg-clip-text text-transparent">
              Weekly Cycle Prototype
            </h1>
            <div className="flex gap-2">
              {(["free", "pro", "vip"] as const).map((t) => (
                <Button
                  key={t}
                  onClick={() => setTier(t)}
                  variant={tier === t ? "default" : "outline"}
                  size="sm"
                  className={
                    tier === t
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 border-0"
                      : "border-purple-600/50 hover:bg-purple-900/20"
                  }
                >
                  {t === "free" ? "🆓 Free" : t === "pro" ? "⭐ Pro" : "👑 VIP"}
                </Button>
              ))}
            </div>
          </div>

          {/* Phase Timeline */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { phase: "voting", label: "Friday-Sunday: Voting", icon: Heart },
              {
                phase: "reveal",
                label: "Monday: Top 50 Reveal",
                icon: Sparkles,
              },
              {
                phase: "selection",
                label: "Mon-Thu: Pick Artists",
                icon: Target,
              },
              {
                phase: "liveshow",
                label: "Thursday 7PM: Live Show",
                icon: Radio,
              },
              {
                phase: "daily",
                label: "Daily: Challenges & Community",
                icon: Users,
              },
            ].map(({ phase, label, icon: Icon }) => (
              <Button
                key={phase}
                onClick={() => setCurrentPhase(phase as PhaseType)}
                variant="outline"
                className={`flex items-center gap-2 whitespace-nowrap transition-all ${
                  currentPhase === phase
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 border-0 shadow-lg shadow-purple-500/50"
                    : "border-purple-600/30 hover:bg-purple-900/20 hover:border-purple-500/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* VOTING PHASE */}
          {currentPhase === "voting" && (
            <motion.div
              key="voting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Banner */}
              <div className="mb-8 relative overflow-hidden rounded-2xl border border-pink-600/50 bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-8">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h2 className="mb-2 flex items-center gap-3">
                      <Heart className="w-8 h-8 text-pink-500" />
                      Voting Open – Pick Your Favorites Before Sunday Midnight
                    </h2>
                    <p className="text-purple-200">
                      Vote on up to 10 tracks from this week's Top 100 to help
                      determine the Top 50
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-black/50 rounded-xl p-4 border border-teal-500/50">
                    <Clock className="w-6 h-6 text-teal-400 mb-2" />
                    <div className="text-center">
                      <div className="flex gap-1">
                        <span className="bg-gradient-to-b from-teal-400 to-teal-600 px-3 py-1 rounded">
                          {countdown.hours.toString().padStart(2, "0")}
                        </span>
                        <span className="text-teal-400">:</span>
                        <span className="bg-gradient-to-b from-teal-400 to-teal-600 px-3 py-1 rounded">
                          {countdown.minutes.toString().padStart(2, "0")}
                        </span>
                        <span className="text-teal-400">:</span>
                        <span className="bg-gradient-to-b from-teal-400 to-teal-600 px-3 py-1 rounded">
                          {countdown.seconds.toString().padStart(2, "0")}
                        </span>
                      </div>
                      <p className="text-teal-300 text-xs mt-1">
                        until voting closes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Votes Counter */}
              <div className="mb-6 flex items-center justify-between">
                <h3>Top 100 Tracks This Week</h3>
                <div className="flex items-center gap-4">
                  <Badge
                    variant="outline"
                    className="border-teal-500/50 text-teal-400"
                  >
                    {selectedTracks.length}/10 Votes Used
                  </Badge>
                </div>
              </div>

              {/* Track Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {top100Tracks.map((track) => {
                  const isSelected = selectedTracks.includes(track.id);
                  const isTrending = track.trending > 20;

                  return (
                    <motion.div
                      key={track.id}
                      layout
                      whileHover={{ scale: 1.02 }}
                      className={`relative rounded-xl border overflow-hidden transition-all ${
                        isSelected
                          ? "border-pink-500 bg-gradient-to-br from-purple-900/50 to-pink-900/50 shadow-lg shadow-pink-500/30"
                          : "border-purple-600/30 bg-purple-950/20 hover:border-purple-500/50"
                      }`}
                    >
                      {isTrending && (
                        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-orange-500 to-pink-500 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                          <Flame className="w-3 h-3" />
                          Hot
                        </div>
                      )}

                      <div className="relative h-32 bg-gradient-to-b from-purple-900/50 to-black">
                        <ImageWithFallback
                          src={track.image}
                          alt={track.title}
                          className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                          #{track.rank}
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="mb-1">{track.title}</h4>
                        <p className="text-purple-300 text-sm mb-3">
                          {track.artist}
                        </p>

                        <div className="flex items-center justify-between mb-3">
                          <div className="text-xs text-purple-300">
                            {track.votes.toLocaleString()} votes
                          </div>
                          {track.trending !== 0 && (
                            <div
                              className={`flex items-center gap-1 text-xs ${
                                track.trending > 0
                                  ? "text-teal-400"
                                  : "text-red-400"
                              }`}
                            >
                              <TrendingUp
                                className={`w-3 h-3 ${track.trending < 0 ? "rotate-180" : ""}`}
                              />
                              {track.trending > 0 ? "+" : ""}
                              {track.trending} this hour
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-purple-600/50 hover:bg-purple-900/30"
                          >
                            <Play className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => toggleTrackVote(track.id)}
                            className={`flex-1 ${
                              isSelected
                                ? "bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800"
                                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            }`}
                            disabled={
                              !isSelected && selectedTracks.length >= 10
                            }
                          >
                            <Heart
                              className={`w-3 h-3 ${isSelected ? "fill-white" : ""}`}
                            />
                            {isSelected ? "Voted" : "Vote"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-600/50 hover:bg-purple-900/30"
                          >
                            <Share2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* REVEAL PHASE */}
          {currentPhase === "reveal" && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-24 h-24 text-teal-400" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-teal-400 bg-clip-text text-transparent"
              >
                This Week's Top 50 Revealed!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-purple-200 mb-8 max-w-2xl mx-auto"
              >
                Your votes are in! These are the 50 artists who made the cut
                this week. Now it's time to build your lineup.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  size="lg"
                  onClick={() => setCurrentPhase("selection")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Pick Your Artists <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>

              {/* Confetti Effect */}
              {showConfetti && (
                <div className="fixed inset-0 pointer-events-none">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2,
                        opacity: 1,
                      }}
                      animate={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: 0,
                      }}
                      transition={{ duration: 2, delay: i * 0.02 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* SELECTION PHASE */}
          {currentPhase === "selection" && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="mb-8">
                <h2 className="mb-2">Build Your Lineup</h2>
                <p className="text-purple-200">
                  Select {maxArtists} artists from this week's Top 50. Choose
                  wisely – they'll earn you points based on their performance!
                </p>

                {/* Selection Counter */}
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-purple-300">
                        {selectedArtists.length}/{maxArtists} Artists Selected
                      </span>
                      <span className="text-sm text-teal-400">
                        {Math.round(
                          (selectedArtists.length / maxArtists) * 100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(selectedArtists.length / maxArtists) * 100}
                      className="h-2"
                    />
                  </div>
                  {tier === "free" && (
                    <Button
                      variant="outline"
                      className="border-teal-500/50 text-teal-400 hover:bg-teal-900/20"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade for 10 picks
                    </Button>
                  )}
                </div>
              </div>

              {/* Power-Ups */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: "Double Points",
                    icon: Zap,
                    locked: tier === "free",
                    cost: "Pro",
                  },
                  {
                    name: "Swap Artist",
                    icon: Target,
                    locked: tier === "free",
                    cost: "Pro",
                  },
                  {
                    name: "Underdog Boost",
                    icon: TrendingUp,
                    locked: tier !== "vip",
                    cost: "VIP",
                  },
                ].map((powerup) => (
                  <Card
                    key={powerup.name}
                    className={`p-4 border ${
                      powerup.locked
                        ? "border-gray-700 bg-gray-900/30"
                        : "border-teal-500/50 bg-gradient-to-br from-teal-900/20 to-purple-900/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            powerup.locked
                              ? "bg-gray-800"
                              : "bg-gradient-to-br from-teal-600 to-purple-600"
                          }`}
                        >
                          <powerup.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className={powerup.locked ? "text-gray-400" : ""}>
                            {powerup.name}
                          </h4>
                          {powerup.locked && (
                            <p className="text-xs text-gray-500">
                              Requires {powerup.cost}
                            </p>
                          )}
                        </div>
                      </div>
                      {powerup.locked ? (
                        <Lock className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-teal-500/50"
                        >
                          Use
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Artists Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {top50Artists.map((artist, index) => {
                  const isSelected = selectedArtists.includes(artist.id);
                  const canSelect =
                    isSelected || selectedArtists.length < maxArtists;
                  const isLocked = !canSelect;

                  return (
                    <motion.div
                      key={artist.id}
                      layout
                      whileHover={canSelect ? { scale: 1.02 } : {}}
                      className={`relative rounded-xl border overflow-hidden transition-all ${
                        isSelected
                          ? "border-teal-500 bg-gradient-to-br from-teal-900/30 to-purple-900/30 shadow-lg shadow-teal-500/30"
                          : isLocked
                            ? "border-gray-700 bg-gray-900/30 opacity-50"
                            : "border-purple-600/30 bg-purple-950/20 hover:border-purple-500/50"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-10 bg-teal-500 p-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-black" />
                        </div>
                      )}

                      <div className="relative h-40 bg-gradient-to-b from-purple-900/50 to-black">
                        <ImageWithFallback
                          src={artist.image}
                          alt={artist.name}
                          className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                          #{artist.rank} in Top 50
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="mb-1">{artist.name}</h4>
                        <p className="text-purple-300 text-sm mb-3">
                          {artist.streams} streams this week
                        </p>

                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`flex items-center gap-1 text-sm ${
                              artist.trend > 0
                                ? "text-teal-400"
                                : "text-red-400"
                            }`}
                          >
                            <TrendingUp
                              className={`w-4 h-4 ${artist.trend < 0 ? "rotate-180" : ""}`}
                            />
                            {artist.trend > 0 ? "+" : ""}
                            {artist.trend}% trend
                          </div>
                        </div>

                        <Button
                          onClick={() => toggleArtistSelect(artist.id)}
                          disabled={isLocked}
                          className={`w-full ${
                            isSelected
                              ? "bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          }`}
                        >
                          {isSelected
                            ? "Selected ✓"
                            : isLocked
                              ? "Lineup Full"
                              : "Add to Lineup"}
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {selectedArtists.length === maxArtists && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Lock In Lineup
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* LIVE SHOW PHASE */}
          {currentPhase === "liveshow" && (
            <motion.div
              key="liveshow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Live Banner */}
              <div className="mb-8 relative overflow-hidden rounded-2xl border border-red-600/50 bg-gradient-to-r from-red-900/50 to-pink-900/50 p-8">
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-4 h-4 bg-red-500 rounded-full"
                    />
                    <div>
                      <h2 className="mb-1 flex items-center gap-3">
                        <Radio className="w-8 h-8 text-red-500" />
                        LIVE NOW: Weekly Results Show
                      </h2>
                      <p className="text-purple-200">
                        Thursday 7PM EDT – Watch the Top 10 reveal with live
                        commentary
                      </p>
                    </div>
                  </div>
                  <div className="text-red-400 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    47.3K watching
                  </div>
                </div>
              </div>

              {/* Live Show Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Stage */}
                <div className="lg:col-span-2">
                  <Card className="border-purple-600/30 bg-black overflow-hidden">
                    <div className="relative h-96 bg-gradient-to-b from-purple-900 to-black flex items-center justify-center">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1622224408917-9dfb43de2cd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwcGFydHl8ZW58MXx8fHwxNzYyMjI3NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Live stage"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      />
                      <div className="relative z-10 text-center">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", duration: 0.8 }}
                          className="mb-4"
                        >
                          <Trophy className="w-32 h-32 text-yellow-400 mx-auto" />
                        </motion.div>
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2"
                        >
                          #1 This Week
                        </motion.h2>
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          Luna Rose
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                          className="text-purple-300"
                        >
                          "Midnight Dreams" • 12.4M streams
                        </motion.p>
                      </div>
                    </div>

                    {/* Top 10 List */}
                    <div className="p-6 space-y-2">
                      {top50Artists.slice(0, 10).map((artist, index) => (
                        <motion.div
                          key={artist.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center gap-4 p-3 rounded-lg ${
                            index === 0
                              ? "bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-600/30"
                              : index < 3
                                ? "bg-gradient-to-r from-purple-900/30 to-pink-900/30"
                                : "bg-purple-950/20"
                          }`}
                        >
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              index === 0
                                ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                                : index < 3
                                  ? "bg-gradient-to-br from-purple-600 to-pink-600"
                                  : "bg-gray-700"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4>{artist.name}</h4>
                            <p className="text-purple-300 text-sm">
                              {artist.streams} streams
                            </p>
                          </div>
                          <div className="text-teal-400 flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />+{artist.trend}%
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Side Panel */}
                <div className="space-y-6">
                  {/* Fan Winners */}
                  <Card className="border-purple-600/30 bg-purple-950/20 p-6">
                    <h3 className="mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      Top Fan Winners
                    </h3>
                    <div className="space-y-3">
                      {["Sarah M.", "Mike Chen", "Alex K."].map((name, i) => (
                        <div key={name} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600">
                              {name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="text-sm">{name}</h4>
                            <p className="text-xs text-purple-300">
                              Rank #{i + 1}
                            </p>
                          </div>
                          <div className="text-teal-400">
                            +{(1000 - i * 200).toLocaleString()} pts
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Live Chat */}
                  <Card className="border-purple-600/30 bg-purple-950/20 p-6">
                    <h3 className="mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-teal-400" />
                      Live Chat
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {[
                        {
                          user: "MusicFan23",
                          message: "Luna Rose deserves this! 🔥",
                        },
                        { user: "BeatHunter", message: "Called it last week!" },
                        {
                          user: "VibeChecker",
                          message: "My lineup is killing it",
                        },
                        { user: "TrendSpotter", message: "Who else had Luna?" },
                      ].map((chat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="text-sm"
                        >
                          <span className="text-purple-400">{chat.user}:</span>{" "}
                          <span className="text-purple-200">
                            {chat.message}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  {/* Share Results */}
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Your Results
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* DAILY CHALLENGES PHASE */}
          {currentPhase === "daily" && (
            <motion.div
              key="daily"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Tabs defaultValue="challenges" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-purple-950/30">
                  <TabsTrigger value="challenges">Daily Challenges</TabsTrigger>
                  <TabsTrigger value="squads">Squads</TabsTrigger>
                  <TabsTrigger value="polls">Polls</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>

                <TabsContent value="challenges" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {dailyChallenges.map((challenge) => (
                      <Card
                        key={challenge.id}
                        className="border-purple-600/30 bg-purple-950/20 p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="mb-1">{challenge.title}</h4>
                            <p className="text-purple-300 text-sm">
                              {challenge.description}
                            </p>
                          </div>
                          <Badge className="bg-gradient-to-r from-teal-600 to-purple-600">
                            +{challenge.xp} XP
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-purple-300">Progress</span>
                            <span className="text-teal-400">
                              {challenge.progress}/{challenge.total}
                            </span>
                          </div>
                          <Progress
                            value={(challenge.progress / challenge.total) * 100}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Card className="border-purple-600/30 bg-purple-950/20 p-6">
                    <h3 className="mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      Your Achievements
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        {
                          name: "Trend Predictor",
                          icon: TrendingUp,
                          unlocked: true,
                        },
                        { name: "Scout", icon: Target, unlocked: true },
                        { name: "Top Picker", icon: Trophy, unlocked: false },
                        {
                          name: "Community Leader",
                          icon: Users,
                          unlocked: false,
                        },
                      ].map((badge) => (
                        <div
                          key={badge.name}
                          className={`p-4 rounded-lg border text-center ${
                            badge.unlocked
                              ? "border-yellow-600/50 bg-gradient-to-b from-yellow-900/20 to-orange-900/20"
                              : "border-gray-700 bg-gray-900/20"
                          }`}
                        >
                          <badge.icon
                            className={`w-8 h-8 mx-auto mb-2 ${
                              badge.unlocked
                                ? "text-yellow-400"
                                : "text-gray-600"
                            }`}
                          />
                          <p
                            className={`text-sm ${badge.unlocked ? "" : "text-gray-500"}`}
                          >
                            {badge.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="squads" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-purple-600/30 bg-purple-950/20 p-6">
                      <h3 className="mb-4">Your Squad</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4>Night Owls</h4>
                            <p className="text-purple-300 text-sm">
                              12 members • Rank #47
                            </p>
                          </div>
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                            Elite
                          </Badge>
                        </div>
                        <div className="flex -space-x-2">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <Avatar key={i} className="border-2 border-black">
                              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600">
                                {String.fromCharCode(65 + i)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                          View Squad
                        </Button>
                      </div>
                    </Card>

                    <Card className="border-purple-600/30 bg-purple-950/20 p-6">
                      <h3 className="mb-4">Top Squads This Week</h3>
                      <div className="space-y-3">
                        {["Rhythm Riders", "Beat Seekers", "Vibe Tribe"].map(
                          (squad, i) => (
                            <div
                              key={squad}
                              className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600">
                                  {i + 1}
                                </div>
                                <div>
                                  <h4 className="text-sm">{squad}</h4>
                                  <p className="text-xs text-purple-300">
                                    {15 - i} members
                                  </p>
                                </div>
                              </div>
                              <div className="text-teal-400">
                                {(5000 - i * 500).toLocaleString()} pts
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="polls" className="mt-6">
                  <Card className="border-purple-600/30 bg-purple-950/20 p-6">
                    <h3 className="mb-4">Today's Poll</h3>
                    <h4 className="mb-6">
                      Who will break into the Top 10 this week?
                    </h4>
                    <div className="space-y-3">
                      {top50Artists.slice(10, 14).map((artist) => (
                        <Button
                          key={artist.id}
                          variant="outline"
                          className="w-full justify-between border-purple-600/50 hover:bg-purple-900/30 h-auto p-4"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={artist.image} />
                              <AvatarFallback>{artist.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                              <h4 className="text-sm">{artist.name}</h4>
                              <p className="text-xs text-purple-300">
                                Currently #{artist.rank}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="community" className="mt-6">
                  <div className="space-y-4">
                    {[
                      {
                        user: "Sarah M.",
                        content:
                          "Just locked in my lineup! Luna Rose is going to dominate this week 🚀",
                        likes: 24,
                      },
                      {
                        user: "Mike Chen",
                        content:
                          "Underdog pick: Dark Matter. They're about to blow up",
                        likes: 18,
                      },
                      {
                        user: "Alex K.",
                        content:
                          "My squad is on fire! We're climbing the leaderboard fast",
                        likes: 31,
                      },
                    ].map((post, i) => (
                      <Card
                        key={i}
                        className="border-purple-600/30 bg-purple-950/20 p-6"
                      >
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600">
                              {post.user[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="mb-2">{post.user}</h4>
                            <p className="text-purple-200 mb-3">
                              {post.content}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-purple-300">
                              <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                                <Heart className="w-4 h-4" />
                                {post.likes}
                              </button>
                              <button className="flex items-center gap-1 hover:text-teal-400 transition-colors">
                                <MessageSquare className="w-4 h-4" />
                                Reply
                              </button>
                              <button className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                                <Share2 className="w-4 h-4" />
                                Share
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subscription Upsell Footer */}
      {tier === "free" && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 to-pink-900 border-t border-purple-600/50 p-4 backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h4>Unlock More Picks & Power-Ups</h4>
              <p className="text-purple-200 text-sm">
                Upgrade to Pro or VIP for exclusive features
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-white/50 hover:bg-white/10"
              >
                Learn More
              </Button>
              <Button className="bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WeeklyPrototype;
