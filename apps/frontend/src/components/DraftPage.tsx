import { motion } from "framer-motion";
import { useState } from "react";
import {
  Trophy,
  Play,
  Plus,
  X,
  Flame,
  TrendingUp,
  Minus,
  Clock,
  Info,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface DraftTrack {
  id: string;
  artistName: string;
  trackName: string;
  imageUrl: string;
  genre: string;
  league: "Major" | "Minor";
  momentum: "fire" | "rising" | "steady" | "cooling";
  estPrizeRange: string;
}

interface DraftPageProps {
  onNavigate: (page: string) => void;
}

export function DraftPage({ onNavigate }: DraftPageProps) {
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [lineup, setLineup] = useState<DraftTrack[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const maxPicks = 5;

  // Mock Top 100 data
  const draftPool: DraftTrack[] = [
    {
      id: "1",
      artistName: "Luna Echo",
      trackName: "Midnight Drive",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      genre: "Electronic",
      league: "Major",
      momentum: "fire",
      estPrizeRange: "$3,000 - $8,000",
    },
    {
      id: "2",
      artistName: "The Neon Wolves",
      trackName: "Electric Dreams",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
      genre: "Rock",
      league: "Major",
      momentum: "rising",
      estPrizeRange: "$2,500 - $7,000",
    },
    {
      id: "3",
      artistName: "Solaris",
      trackName: "Golden Hour",
      imageUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400",
      genre: "Pop",
      league: "Major",
      momentum: "fire",
      estPrizeRange: "$4,000 - $10,000",
    },
    {
      id: "4",
      artistName: "Bass Therapy",
      trackName: "Frequency",
      imageUrl:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
      genre: "Hip-Hop",
      league: "Minor",
      momentum: "steady",
      estPrizeRange: "$800 - $2,500",
    },
    {
      id: "5",
      artistName: "Crimson Sky",
      trackName: "Horizon",
      imageUrl:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400",
      genre: "Indie",
      league: "Minor",
      momentum: "rising",
      estPrizeRange: "$1,200 - $3,500",
    },
    {
      id: "6",
      artistName: "Velvet Storm",
      trackName: "Thunder",
      imageUrl:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400",
      genre: "R&B",
      league: "Major",
      momentum: "cooling",
      estPrizeRange: "$1,500 - $4,000",
    },
  ];

  const getMomentumIcon = (momentum: string) => {
    switch (momentum) {
      case "fire":
        return <Flame className="w-4 h-4 text-secondary" />;
      case "rising":
        return <TrendingUp className="w-4 h-4 text-accent" />;
      case "steady":
        return <Minus className="w-4 h-4 text-primary" />;
      default:
        return null;
    }
  };

  const getMomentumLabel = (momentum: string) => {
    switch (momentum) {
      case "fire":
        return "On Fire";
      case "rising":
        return "Rising Fast";
      case "steady":
        return "Steady";
      case "cooling":
        return "Cooling Off";
      default:
        return "";
    }
  };

  const handleAddToLineup = (track: DraftTrack) => {
    if (lineup.length >= maxPicks) {
      toast.error("Lineup Full", {
        description: `Maximum ${maxPicks} picks allowed`,
      });
      return;
    }

    if (lineup.find((t) => t.id === track.id)) {
      toast.error("Already in Lineup", {
        description: "This track is already in your lineup",
      });
      return;
    }

    setLineup((prev) => [...prev, track]);
    toast.success(`${track.artistName} added!`, {
      description: "Edit your lineup anytime before lock",
    });
  };

  const handleRemoveFromLineup = (trackId: string) => {
    setLineup((prev) => prev.filter((t) => t.id !== trackId));
    toast.success("Track removed from lineup");
  };

  const handleLockLineup = () => {
    if (lineup.length === 0) {
      toast.error("Lineup Empty", {
        description: "Add at least one track to your lineup",
      });
      return;
    }

    setIsLocked(true);
    toast.success("Lineup Locked! 🔒", {
      description: "Good luck this week! Track your artists in Live Week.",
    });
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
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-xs text-accent tracking-widest uppercase">
                Draft • Top 100 Pool
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 gradient-text tracking-tighter">
              Build Your Lineup
            </h1>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto tracking-tight">
              Select up to {maxPicks} tracks from the Top 100. Choose wisely —
              only the best will win.
            </p>
          </motion.div>

          {/* Lock Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 neon-glow max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-accent" />
                <div>
                  <div className="text-white text-lg">Lineups Lock In</div>
                  <div className="text-sm text-muted-foreground/70">
                    Friday 6:00 PM ET
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl text-white">2d 14h</div>
                <div className="text-xs text-muted-foreground/70">
                  Time remaining
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Draft Pool */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center mb-6">
                <Select
                  value={selectedLeague}
                  onValueChange={setSelectedLeague}
                >
                  <SelectTrigger className="w-48 glass-card border-primary/20">
                    <SelectValue placeholder="All Leagues" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leagues</SelectItem>
                    <SelectItem value="major">Major League</SelectItem>
                    <SelectItem value="minor">Minor League</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-48 glass-card border-primary/20">
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="hiphop">Hip-Hop</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="indie">Indie</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex-1" />
                <div className="text-sm text-muted-foreground/70">
                  100 tracks available
                </div>
              </div>

              {/* Draft Pool Grid */}
              <div className="space-y-4">
                {draftPool.map((track, index) => {
                  const inLineup = lineup.find((t) => t.id === track.id);

                  return (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`glass-card rounded-xl p-4 neon-glow hover:scale-[1.02] transition-all ${
                        inLineup ? "border-accent/50 bg-accent/5" : ""
                      }`}
                    >
                      <div className="flex gap-4">
                        <ImageWithFallback
                          src={track.imageUrl}
                          alt={track.trackName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white truncate tracking-tight">
                                {track.trackName}
                              </h3>
                              <p className="text-sm text-muted-foreground/70 truncate">
                                {track.artistName}
                              </p>
                            </div>
                            <Badge
                              variant={
                                track.league === "Major"
                                  ? "default"
                                  : "secondary"
                              }
                              className="ml-2 shrink-0"
                            >
                              {track.league}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1 text-sm">
                              {getMomentumIcon(track.momentum)}
                              <span className="text-muted-foreground/70">
                                {getMomentumLabel(track.momentum)}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground/70">
                              <Info className="w-3 h-3 inline mr-1" />
                              Est. {track.estPrizeRange}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="glass-card border-primary/30 text-white hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                            {inLineup ? (
                              <Button
                                size="sm"
                                onClick={() => handleRemoveFromLineup(track.id)}
                                disabled={isLocked}
                                className="bg-accent/20 text-accent hover:bg-accent/30"
                              >
                                <X className="w-3 h-3 mr-1" />
                                Remove
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleAddToLineup(track)}
                                disabled={lineup.length >= maxPicks || isLocked}
                                className="gradient-bg neon-glow holo-button"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right: My Picks */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card rounded-2xl p-6 neon-glow"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-white tracking-tight">
                      My Picks
                    </h2>
                    <Badge variant="outline" className="text-lg">
                      {lineup.length}/{maxPicks}
                    </Badge>
                  </div>

                  {lineup.length === 0 ? (
                    <div className="text-center py-12">
                      <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                      <p className="text-muted-foreground/70 mb-2">
                        No picks yet
                      </p>
                      <p className="text-sm text-muted-foreground/50">
                        Add tracks from the Draft Pool
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {lineup.map((track, index) => (
                        <div
                          key={track.id}
                          className="glass-card rounded-lg p-3 border border-primary/20"
                        >
                          <div className="flex gap-3 items-center">
                            <div className="text-muted-foreground/50 text-sm w-6">
                              #{index + 1}
                            </div>
                            <ImageWithFallback
                              src={track.imageUrl}
                              alt={track.trackName}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-sm truncate">
                                {track.trackName}
                              </div>
                              <div className="text-xs text-muted-foreground/70 truncate">
                                {track.artistName}
                              </div>
                            </div>
                            {!isLocked && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveFromLineup(track.id)}
                                className="shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!isLocked ? (
                    <Button
                      onClick={handleLockLineup}
                      disabled={lineup.length === 0}
                      className="w-full gradient-bg neon-glow holo-button text-lg py-6"
                    >
                      Lock Lineup
                    </Button>
                  ) : (
                    <div className="text-center p-4 glass-card rounded-lg border border-accent/50">
                      <div className="text-accent mb-2">🔒 Lineup Locked</div>
                      <p className="text-sm text-muted-foreground/70">
                        Track your picks in Live Week
                      </p>
                      <Button
                        onClick={() => onNavigate("liveweek")}
                        className="mt-4 w-full gradient-bg"
                      >
                        Go to Live Week
                      </Button>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground/50 text-center mt-4">
                    You can edit your lineup until the lock deadline
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
