import { useState } from "react";
import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Play, Info, Zap, Trophy, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import { toast } from "sonner";

interface MobileDraftPageProps {}

interface Artist {
  id: string;
  name: string;
  track: string;
  image: string;
  genre: string;
  momentum: string;
  estimatedPayout: string;
  rank: number;
  selected?: boolean;
}

export function MobileDraftPage({}: MobileDraftPageProps) {
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const router = useRouter();
  const maxSelections = 5;
  const isLineupComplete = selectedArtists.length === maxSelections;

  const artists: Artist[] = [
    {
      id: "1",
      name: "Luna Eclipse",
      track: "Midnight Dreams",
      image:
        "https://images.unsplash.com/photo-1619983081563-430f63602796?w=400",
      genre: "Electronic",
      momentum: "hot",
      estimatedPayout: "$800-1.2K",
      rank: 7,
    },
    {
      id: "2",
      name: "Metro Collective",
      track: "Urban Symphony",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      genre: "Hip-Hop",
      momentum: "rising",
      estimatedPayout: "$600-900",
      rank: 12,
    },
    {
      id: "3",
      name: "The Wanderers",
      track: "Desert Bloom",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
      genre: "Indie",
      momentum: "steady",
      estimatedPayout: "$400-700",
      rank: 18,
    },
    {
      id: "4",
      name: "Neon Syntax",
      track: "Electric Pulse",
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400",
      genre: "Electronic",
      momentum: "rising",
      estimatedPayout: "$500-800",
      rank: 15,
    },
    {
      id: "5",
      name: "Jasmine Cole",
      track: "Velvet Nights",
      image:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
      genre: "R&B",
      momentum: "hot",
      estimatedPayout: "$900-1.5K",
      rank: 5,
    },
    {
      id: "6",
      name: "The Architects",
      track: "Blueprint",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
      genre: "Alternative",
      momentum: "steady",
      estimatedPayout: "$300-600",
      rank: 24,
    },
  ];

  const toggleArtist = (artistId: string) => {
    if (selectedArtists.includes(artistId)) {
      setSelectedArtists(selectedArtists.filter((id) => id !== artistId));
    } else {
      if (selectedArtists.length < maxSelections) {
        setSelectedArtists([...selectedArtists, artistId]);

        if (selectedArtists.length + 1 === maxSelections) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          toast.success("Lineup Complete!", {
            description: "Your roster is ready for this week.",
          });
        }
      } else {
        toast.error("Lineup Full", {
          description: "Remove an artist to add a new one.",
        });
      }
    }
  };

  const handleSaveLineup = () => {
    if (isLineupComplete) {
      toast.success("Lineup Saved!", {
        description: "Good luck this week!",
      });
      setTimeout(() => router.push("liveweek"), 1500);
    }
  };

  const filters = ["all", "hot", "rising", "steady"];

  const filteredArtists =
    filter === "all" ? artists : artists.filter((a) => a.momentum === filter);

  return (
    <div className="min-h-screen bg-black pb-32 pt-safe">
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

      {/* Confetti animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: -20,
                  x: Math.random() * window.innerWidth,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 100,
                  rotate: 360,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: "linear",
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ["#7e1fff", "#ff1f70", "#00ffd5"][
                    Math.floor(Math.random() * 3)
                  ],
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-[52px] z-30 bg-black/90 backdrop-blur-xl border-b border-primary/10 px-6 py-4">
        <div className="mb-4">
          <h1 className="text-white text-xl mb-1">Draft Your Lineup</h1>
          <p className="text-sm text-muted-foreground">
            Select up to {maxSelections} artists from the Top 100
          </p>
        </div>

        {/* Selection Counter */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{
                width: `${(selectedArtists.length / maxSelections) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-sm text-white min-w-[4ch] text-right">
            {selectedArtists.length}/{maxSelections}
          </span>
        </div>

        {/* Countdown */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-xs text-white">Lock lineup in 1d 8h 42m</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-6 py-4 overflow-x-auto scrollbar-hide sticky top-[192px] z-20 bg-gradient-to-b from-black via-black to-transparent">
        <div className="flex gap-2">
          {filters.map((filterOption) => (
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
              {filterOption === "hot" && "🔥 "}
              {filterOption === "rising" && "↗️ "}
              {filterOption === "steady" && "⚖️ "}
              {filterOption}
            </Button>
          ))}
        </div>
      </div>

      {/* My Selections Preview (if any selected) */}
      {selectedArtists.length > 0 && (
        <div className="px-6 py-4">
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-sm">My Lineup</h3>
              <Badge className="bg-accent/20 text-accent border-accent/30">
                {selectedArtists.length} selected
              </Badge>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-2 px-2">
              {selectedArtists.map((artistId) => {
                const artist = artists.find((a) => a.id === artistId);
                if (!artist) return null;

                return (
                  <div key={artist.id} className="flex-shrink-0 w-16 relative">
                    <ImageWithFallback
                      src={artist.image}
                      alt={artist.name}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-accent"
                    />
                    <button
                      onClick={() => toggleArtist(artist.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Artist Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {filteredArtists.map((artist) => {
            const isSelected = selectedArtists.includes(artist.id);

            return (
              <motion.div
                key={artist.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <button
                  onClick={() => toggleArtist(artist.id)}
                  className={`w-full glass-card rounded-2xl overflow-hidden transition-all active:scale-95 touch-target ${
                    isSelected
                      ? "ring-2 ring-accent shadow-lg shadow-accent/20"
                      : "hover:border-primary/40"
                  }`}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {/* Image */}
                  <div className="relative aspect-square">
                    <ImageWithFallback
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Rank Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/80 backdrop-blur-sm text-xs">
                        #{artist.rank}
                      </Badge>
                    </div>

                    {/* Momentum Badge */}
                    <div className="absolute top-2 right-2">
                      {artist.momentum === "hot" && (
                        <Badge className="bg-secondary/90 text-xs">🔥</Badge>
                      )}
                      {artist.momentum === "rising" && (
                        <Badge className="bg-primary/90 text-xs">↗️</Badge>
                      )}
                    </div>

                    {/* Play Button */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle play preview
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.stopPropagation();
                          e.preventDefault();
                        }
                      }}
                      className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 cursor-pointer active:scale-90 transition-transform"
                    >
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>

                    {/* Selection Check */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-accent/20 backdrop-blur-[2px] flex items-center justify-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                          <Check className="w-7 h-7 text-black" />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3 space-y-1">
                    <h3 className="text-white text-sm line-clamp-1">
                      {artist.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {artist.track}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-muted-foreground">
                        {artist.genre}
                      </span>
                      <span className="text-xs text-accent">
                        {artist.estimatedPayout}
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-6 pb-6">
        <div className="glass-card p-4 rounded-2xl bg-primary/5 border-primary/20">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm text-white">Prize Pool Estimates</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Payouts shown are estimates if the artist finishes in the Top
                20. Actual rewards depend on final rank and total prize pool.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer with Save Button */}
      <div className="fixed bottom-0 left-0 right-0 z-30 px-6 pb-safe pt-4 bg-gradient-to-t from-black via-black to-transparent">
        <div className="mb-20">
          <Button
            onClick={handleSaveLineup}
            disabled={!isLineupComplete}
            className={`w-full py-6 rounded-2xl text-base transition-all ${
              isLineupComplete
                ? "gradient-bg shadow-2xl shadow-primary/30 animate-pulse"
                : "bg-white/5 text-white/40 cursor-not-allowed"
            }`}
          >
            {isLineupComplete ? (
              <>
                <Trophy className="w-5 h-5 mr-2" />
                Save Lineup & Continue
              </>
            ) : (
              <>
                Select {maxSelections - selectedArtists.length} More Artist
                {maxSelections - selectedArtists.length !== 1 ? "s" : ""}
              </>
            )}
          </Button>

          {isLineupComplete && (
            <p className="text-center text-xs text-accent mt-3">
              ✨ Your lineup is locked! Ready to compete this week.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
