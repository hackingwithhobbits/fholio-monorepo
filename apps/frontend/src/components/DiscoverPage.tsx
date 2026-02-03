// apps/frontend/src/components/DiscoverPage.tsx
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  TrendingUp,
  MapPin,
  Sparkles,
  X,
  ChevronDown,
  Music,
  Users,
  Plus,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useCurrentPool } from "@/hooks/useArtists";
import { useCurrentWeek } from "@/hooks/useWeek";
import { toast } from "sonner";

interface DiscoverPageProps {
  onNavigate: (page: string, artistId?: string) => void;
}

const statuses = [
  "All",
  "Hot Streak",
  "Rising",
  "New Entrant",
  "Trending",
  "Stable",
];
const leagues = ["All", "Major", "Minor"];
const sortOptions = ["Trending", "Score", "Growth", "Most Voted"];

export function DiscoverPage({ onNavigate }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [sortBy, setSortBy] = useState("Trending");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [myPicks, setMyPicks] = useState<string[]>([]);

  // Real backend data
  const { pool, isLoading, error } = useCurrentPool();
  const { week } = useCurrentWeek();

  // Extract unique genres from real data
  const genres = [
    "All",
    ...new Set(pool.map((p) => p.artist?.genre).filter(Boolean)),
  ];

  const getArtistStatus = (artistWeek: any) => {
    if (!artistWeek) return "New Entrant";
    const score = artistWeek.final_score || 0;
    const votes = artistWeek.votes || 0;

    if (votes > 100) return "Hot Streak";
    if (score > 50) return "Rising";
    if (votes > 50) return "Trending";
    return "New Entrant";
  };

  const handleAddToPicks = (artistId: string) => {
    if (myPicks.length < 5 && !myPicks.includes(artistId)) {
      setMyPicks([...myPicks, artistId]);
      toast.success("Added to your Fholio!");
    } else if (myPicks.includes(artistId)) {
      setMyPicks(myPicks.filter((id) => id !== artistId));
      toast.success("Removed from your Fholio");
    } else {
      toast.error("Maximum 5 artists allowed in lineup");
    }
  };

  // Filter and sort artists
  const filteredArtists = pool
    .filter((item) => {
      const artist = item.artist;
      if (!artist) return false;

      const matchesSearch =
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.location?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        selectedGenre === "All" || artist.genre === selectedGenre;

      const artistStatus = getArtistStatus(item);
      const matchesStatus =
        selectedStatus === "All" || artistStatus === selectedStatus;

      const matchesLeague =
        selectedLeague === "All" || artist.league === selectedLeague;

      return matchesSearch && matchesGenre && matchesStatus && matchesLeague;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Score":
          return (b.final_score || 0) - (a.final_score || 0);
        case "Most Voted":
          return (b.votes || 0) - (a.votes || 0);
        case "Growth":
          return (b.social_growth || 0) - (a.social_growth || 0);
        default:
          return (b.final_score || 0) - (a.final_score || 0);
      }
    });

  const selectedArtistData = pool.find((p) => p.artist_id === selectedArtist);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading artists...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 mb-4">Failed to load artists</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
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

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY3Jvd2R8ZW58MXx8fHwxNzYxNjE3MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Concert crowd"
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

          {/* Animated gradient waves */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-0 w-full h-32 bg-gradient-to-r from-primary via-secondary to-primary shimmer" />
            <div
              className="absolute bottom-1/3 left-0 w-full h-32 bg-gradient-to-r from-secondary via-accent to-secondary shimmer"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>

        {/* Logo Watermark */}
        <div className="logo-watermark">
          <Logo size="xl" className="opacity-100" style={{ height: "300px" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
              <span className="gradient-text">Discover Artists.</span>
              <br />
              <span className="text-white">Build Your Fholio.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore {pool.length} artists in this week's pool
            </p>
            <div className="text-sm text-accent tracking-wider">
              WEEK {week?.week_number || 1} • YOUR LINEUP. YOUR LEAGUE.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <div className="sticky top-16 z-40 glass-card border-b border-primary/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search artists, genres, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 bg-input-background border-primary/20 focus:border-primary/50 neon-glow text-white placeholder:text-muted-foreground"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-3 flex-wrap">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-40 h-12 glass-card border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                <SelectTrigger className="w-40 h-12 glass-card border-primary/20">
                  <SelectValue placeholder="League" />
                </SelectTrigger>
                <SelectContent>
                  {leagues.map((league) => (
                    <SelectItem key={league} value={league}>
                      {league} League
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-12 glass-card border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 border-primary/30 hover:bg-primary/10 neon-glow"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          </div>

          {/* Extended Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Badge
                      key={status}
                      variant={
                        selectedStatus === status ? "default" : "outline"
                      }
                      className={`cursor-pointer px-4 py-2 ${
                        selectedStatus === status
                          ? "gradient-bg border-0"
                          : "border-primary/30 hover:border-primary/60"
                      }`}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* My Picks Counter */}
          {myPicks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-between glass-card p-4 rounded-xl border-accent/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center neon-glow">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white">My Picks: {myPicks.length}/5</div>
                  <div className="text-sm text-muted-foreground">
                    {5 - myPicks.length}{" "}
                    {5 - myPicks.length === 1 ? "spot" : "spots"} remaining
                  </div>
                </div>
              </div>
              <Button
                onClick={() => {
                  toast.success("Lineup saved! (Feature coming soon)");
                  onNavigate("fan-dashboard");
                }}
                className="gradient-bg neon-glow holo-button"
              >
                Lock In Lineup
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Artist Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((item, index) => {
            const artist = item.artist;
            if (!artist) return null;

            const isPicked = myPicks.includes(artist.id);
            const status = getArtistStatus(item);

            return (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all neon-glow cursor-pointer"
                onClick={() => setSelectedArtist(artist.id)}
              >
                <div className="relative h-80">
                  <ImageWithFallback
                    src={
                      artist.image_url ||
                      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
                    }
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  {/* League Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`glass-card backdrop-blur-xl ${
                        artist.league === "Major"
                          ? "border-accent/50 bg-accent/10 text-accent"
                          : "border-primary/50 bg-primary/10 text-primary"
                      }`}
                    >
                      {artist.league} League
                    </Badge>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      className={`glass-card backdrop-blur-xl ${
                        status === "Hot Streak"
                          ? "border-accent/50 bg-accent/10 text-accent"
                          : status === "Rising"
                            ? "border-primary/50 bg-primary/10 text-primary"
                            : "border-white/30 bg-white/10"
                      }`}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      {status}
                    </Badge>
                  </div>

                  {/* Score */}
                  <div className="absolute top-16 left-4 glass-card px-4 py-2 rounded-full backdrop-blur-xl border-primary/30">
                    <span className="gradient-text text-lg">
                      {(item.final_score || 0).toFixed(1)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl text-white mb-1 tracking-tight">
                      {artist.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Music className="w-3 h-3" />
                        {artist.genre}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {artist.location || "Unknown"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {item.votes || 0} votes
                      </div>
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToPicks(artist.id);
                      }}
                      disabled={myPicks.length >= 5 && !isPicked}
                      className={`w-full ${
                        isPicked
                          ? "bg-accent/20 border-accent text-accent hover:bg-accent/30"
                          : "gradient-bg"
                      } neon-glow holo-button`}
                    >
                      {isPicked ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          In My Fholio
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Fholio
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-20">
            <Music className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl text-white mb-2">No artists found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>

      {/* Artist Detail Modal */}
      <Dialog
        open={!!selectedArtist}
        onOpenChange={() => setSelectedArtist(null)}
      >
        <DialogContent className="glass-card max-w-4xl border-primary/20 p-0 overflow-hidden">
          {selectedArtistData && selectedArtistData.artist && (
            <div>
              <div className="relative h-64">
                <ImageWithFallback
                  src={
                    selectedArtistData.artist.image_url ||
                    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
                  }
                  alt={selectedArtistData.artist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <button
                  onClick={() => setSelectedArtist(null)}
                  className="absolute top-4 right-4 glass-card p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl text-white mb-2 tracking-tight">
                    {selectedArtistData.artist.name}
                  </h2>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>{selectedArtistData.artist.genre}</span>
                    <span>•</span>
                    <span>{selectedArtistData.votes || 0} votes</span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="overview" className="p-6">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass-card p-4 rounded-xl text-center">
                      <div className="text-3xl gradient-text mb-1">
                        {(selectedArtistData.final_score || 0).toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <div className="text-3xl text-accent mb-1">
                        {selectedArtistData.votes || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Votes</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <div className="text-3xl text-primary mb-1">
                        {selectedArtistData.streams || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Streams
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      handleAddToPicks(selectedArtistData.artist.id);
                      setSelectedArtist(null);
                    }}
                    disabled={
                      myPicks.length >= 5 &&
                      !myPicks.includes(selectedArtistData.artist.id)
                    }
                    className="w-full gradient-bg neon-glow holo-button"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to My Fholio
                  </Button>
                </TabsContent>

                <TabsContent value="stats" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Total Streams
                      </span>
                      <span className="text-white">
                        {(selectedArtistData.streams || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Fan Votes</span>
                      <span className="text-white">
                        {selectedArtistData.votes || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Engagement Score
                      </span>
                      <span className="text-white">
                        {selectedArtistData.engagement_score || 0}
                      </span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
