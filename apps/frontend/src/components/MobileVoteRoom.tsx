"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Heart, X, Play, Pause, Info, Sparkles, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import { artists } from "../data/mockData";

interface MobileVoteRoomProps {}

interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
  genre: string;
  duration: string;
  newEntry?: boolean;
  momentum?: string;
  votes?: number;
}

export function MobileVoteRoom({}: MobileVoteRoomProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votesRemaining, setVotesRemaining] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const router = useRouter();
  // Convert artists to tracks for voting
  const tracks: Track[] = artists.map((artist) => {
    // Generate random duration between 2:30 and 4:30
    const minutes = Math.floor(Math.random() * 2) + 2;
    const seconds = Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0");

    // Determine momentum based on status
    let momentum: string | undefined;
    if (artist.status === "Hot Streak") momentum = "hot";
    else if (artist.status === "Rising" || artist.status === "Trending")
      momentum = "rising";

    return {
      id: artist.id,
      title: artist.weeklyTrack || `${artist.name} - Latest Track`,
      artist: artist.name,
      image: artist.imageUrl,
      genre: artist.genre,
      duration: `${minutes}:${seconds}`,
      newEntry: artist.status === "New Entrant",
      momentum,
      votes: artist.votes,
    };
  });

  // Extract unique genres from artists
  const genres = ["all", ...Array.from(new Set(artists.map((a) => a.genre)))];

  const currentTrack = tracks[currentIndex];
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 100;

    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        // Swiped right - Vote
        handleVote();
      } else {
        // Swiped left - Pass
        handlePass();
      }
    }
  };

  const handleVote = () => {
    if (votesRemaining > 0) {
      setVotesRemaining((prev) => prev - 1);
      // Add confetti or celebration animation
      nextTrack();
    }
  };

  const handlePass = () => {
    nextTrack();
  };

  const nextTrack = () => {
    if (currentIndex < tracks.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsPlaying(false);
      x.set(0);
    }
  };

  const progressPercentage = ((10 - votesRemaining) / 10) * 100;

  if (currentIndex >= tracks.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 pb-20">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-white text-2xl">All Done!</h2>
          <p className="text-muted-foreground">
            You've reviewed all {tracks.length} available tracks. Check back
            later for more!
          </p>
          <Button
            onClick={() => router.push("/draft")}
            className="w-full gradient-bg py-6 rounded-2xl"
          >
            Continue to Draft
          </Button>
        </div>
      </div>
    );
  }

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
      <div className="sticky top-[52px] z-30 bg-black/80 backdrop-blur-xl border-b border-primary/10 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-white text-xl">Vote Room</h1>
            <p className="text-sm text-muted-foreground">
              {votesRemaining} votes left • {currentIndex + 1}/{tracks.length}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInfo(!showInfo)}
            className="text-muted-foreground"
          >
            <Info className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <Progress value={progressPercentage} className="h-1" />

        {/* Countdown Timer */}
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-xs text-white">
              Voting ends in 2d 14h 23m
            </span>
          </div>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="px-6 py-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGenre(genre)}
              className={`rounded-full text-xs whitespace-nowrap ${
                selectedGenre === genre
                  ? "gradient-bg text-white"
                  : "border-white/20 text-white hover:border-white/40 hover:bg-white/10 hover:text-white transition-all duration-300"
              }`}
            >
              {genre === "all" ? "All Genres" : genre}
            </Button>
          ))}
        </div>
      </div>

      {/* Card Stack */}
      <div className="px-6 py-8">
        <div className="relative h-[520px] max-w-md mx-auto">
          {/* Next card preview (static) */}
          {currentIndex < tracks.length - 1 && (
            <div className="absolute inset-0 glass-card rounded-3xl scale-95 opacity-50" />
          )}

          {/* Current card (draggable) */}
          <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
          >
            <div className="h-full glass-card rounded-3xl overflow-hidden border-2 border-primary/20">
              {/* Track Image */}
              <div className="relative h-[55%]">
                <ImageWithFallback
                  src={currentTrack.image}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="flex gap-2">
                    {currentTrack.newEntry && (
                      <Badge className="bg-accent text-black">New Entry</Badge>
                    )}
                    {currentTrack.momentum === "hot" && (
                      <Badge className="bg-secondary">🔥 Hot</Badge>
                    )}
                    {currentTrack.momentum === "rising" && (
                      <Badge className="bg-primary">↗️ Rising</Badge>
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-black/60 backdrop-blur-sm border-white/20"
                  >
                    {currentTrack.genre}
                  </Badge>
                </div>

                {/* Play Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 active:scale-95 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>
              </div>

              {/* Track Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-white text-2xl mb-1">
                    {currentTrack.title}
                  </h2>
                  <p className="text-muted-foreground">{currentTrack.artist}</p>
                </div>

                {/* Stats */}
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>{currentTrack.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span>
                      {currentTrack.votes
                        ? `${(currentTrack.votes * 12).toFixed(0)} votes`
                        : "1.2K votes"}
                    </span>
                  </div>
                </div>

                {/* Swipe Instructions */}
                <div className="pt-4 flex items-center justify-center gap-8 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <span>Swipe left to pass</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-accent" />
                    </div>
                    <span>Swipe right to vote</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Swipe indicators */}
          <motion.div
            style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
            className="absolute top-1/2 left-8 -translate-y-1/2 w-20 h-20 rounded-full bg-red-500/20 border-4 border-red-500 flex items-center justify-center pointer-events-none"
          >
            <X className="w-10 h-10 text-red-500" />
          </motion.div>
          <motion.div
            style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
            className="absolute top-1/2 right-8 -translate-y-1/2 w-20 h-20 rounded-full bg-accent/20 border-4 border-accent flex items-center justify-center pointer-events-none"
          >
            <Heart className="w-10 h-10 text-accent" />
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-20 left-0 right-0 px-6 pb-4 bg-gradient-to-t from-black via-black/95 to-transparent pt-8">
        <div className="flex items-center justify-center gap-6 max-w-md mx-auto">
          <button
            onClick={handlePass}
            className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center active:scale-90 transition-transform touch-target"
          >
            <X className="w-8 h-8 text-red-500" />
          </button>
          <button
            onClick={handleVote}
            disabled={votesRemaining === 0}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center active:scale-90 transition-transform touch-target disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
          >
            <Heart className="w-10 h-10 text-white" />
          </button>
          <button
            onClick={() => router.push("/discover")}
            className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center active:scale-90 transition-transform touch-target"
          >
            <Info className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
