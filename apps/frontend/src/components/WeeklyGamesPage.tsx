import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Filter,
  Search,
  TrendingUp,
  Music,
  Star,
  Check,
  X as XIcon,
  Sparkles,
  Play,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { weeklyTracks } from "../data/weeklyTracks";

interface WeeklyGamesPageProps {
  onNavigate: (page: string) => void;
}

export function WeeklyGamesPage({ onNavigate }: WeeklyGamesPageProps) {
  const [selectedTracks, setSelectedTracks] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 46,
    minutes: 12,
    seconds: 34,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 71;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [tracks, setTracks] = useState(weeklyTracks);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("trending");

  const toggleTrackSelection = (trackId: number) => {
    setSelectedTracks((prev) => {
      if (prev.includes(trackId)) {
        return prev.filter((id) => id !== trackId);
      } else if (prev.length < 5) {
        return [...prev, trackId];
      }
      return prev;
    });
  };

  const handleLockPicks = () => {
    if (selectedTracks.length === 5) {
      setShowSuccess(true);
    }
  };

  const filteredTracks = tracks
    .filter((track) => {
      if (searchQuery) {
        return (
          track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (activeFilter === "trending") {
        return b.votes - a.votes;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 lg:mb-4 gradient-text tracking-tighter">
              Weekly Games
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8">
              Pick your top 5 tracks and compete for prizes
            </p>

            {/* Countdown Timer Bar */}
            <div className="glass-card p-4 rounded-2xl neon-glow">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-sm text-white">Voting closes in:</span>
                </div>
                <div className="flex gap-3">
                  <div className="glass-card px-4 py-2 rounded-lg">
                    <span className="text-2xl text-white">
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      h
                    </span>
                  </div>
                  <div className="glass-card px-4 py-2 rounded-lg">
                    <span className="text-2xl text-white">
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      m
                    </span>
                  </div>
                  <div className="glass-card px-4 py-2 rounded-lg">
                    <span className="text-2xl text-white">
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      s
                    </span>
                  </div>
                </div>
              </div>

              {/* Selection Counter */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Selected:
                  </span>
                  <span className="text-sm text-accent">
                    {selectedTracks.length} / 5
                  </span>
                </div>
                <Button
                  onClick={handleLockPicks}
                  disabled={selectedTracks.length !== 5}
                  className="gradient-bg hover:opacity-90 disabled:opacity-50 h-11"
                  size="sm"
                >
                  <span className="hidden sm:inline">Lock My Picks</span>
                  <span className="sm:hidden">Lock Picks</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-primary/10 sticky top-16 z-40 glass-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tracks or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card border-primary/20"
              />
            </div>

            {/* Tabs */}
            <Tabs
              value={activeFilter}
              onValueChange={setActiveFilter}
              className="w-full md:w-auto"
            >
              <TabsList className="glass-card">
                <TabsTrigger value="trending">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="genre">
                  <Music className="w-4 h-4 mr-2" />
                  Genre
                </TabsTrigger>
                <TabsTrigger value="new">
                  <Star className="w-4 h-4 mr-2" />
                  New
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Track Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredTracks.map((track, index) => {
              const isSelected = selectedTracks.includes(track.id);
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.01 }}
                  className={`relative glass-card rounded-xl overflow-hidden hover:scale-105 transition-all cursor-pointer group ${
                    isSelected ? "ring-2 ring-accent" : ""
                  }`}
                  onClick={() => toggleTrackSelection(track.id)}
                >
                  {/* Trending Badge */}
                  {track.trending && (
                    <div className="absolute top-2 left-2 z-10">
                      <div className="glass-card px-2 py-1 rounded-lg flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-accent" />
                        <span className="text-xs text-accent">Hot</span>
                      </div>
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-10">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                        <Check className="w-4 h-4 text-black" />
                      </div>
                    </div>
                  )}

                  {/* Image */}
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      src={track.image}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity ${
                        isSelected
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    {/* Play Button */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                        isSelected
                          ? "opacity-0"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      </div>
                    </div>

                    {/* Vote Count */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="glass-card px-2 py-1 rounded-lg flex items-center justify-between">
                        <span className="text-xs text-white/80">
                          {track.votes} votes
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-sm text-white truncate">{track.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {track.artist}
                    </p>
                    <p className="text-xs text-accent mt-1">{track.genre}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="glass-card border border-primary/20">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="gradient-text text-center text-2xl">
              Picks Locked!
            </DialogTitle>
            <DialogDescription className="text-white/70 text-center pt-4">
              Your 5 tracks have been locked in for this week's competition.
              Good luck!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div className="glass-card p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">Your Picks:</p>
              <div className="space-y-2">
                {selectedTracks.map((id) => {
                  const track = tracks.find((t) => t.id === id);
                  return track ? (
                    <div
                      key={id}
                      className="flex items-center gap-2 text-sm text-white"
                    >
                      <Check className="w-4 h-4 text-accent" />
                      <span>
                        {track.title} - {track.artist}
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            <Button
              onClick={() => {
                setShowSuccess(false);
                onNavigate("fan-dashboard");
              }}
              className="w-full gradient-bg hover:opacity-90"
            >
              View My Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
