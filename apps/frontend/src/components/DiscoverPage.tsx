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
  BarChart3,
  Plus,
  Check,
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
import { artists } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import { ShareButtons } from "./ShareButtons";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface DiscoverPageProps {
  onNavigate: (page: string, artistId?: string) => void;
}

const genres = [
  "All",
  "Pop",
  "Hip-Hop",
  "Alt Rock",
  "Electronic",
  "Indie",
  "R&B",
  "EDM",
  "Alternative",
];
const statuses = [
  "All",
  "Hot Streak",
  "Rising",
  "New Entrant",
  "Trending",
  "Stable",
];
const leagues = ["All", "Major", "Minor"];
const sortOptions = [
  "Trending",
  "Growth %",
  "Total Streams",
  "Most Picked",
  "Score",
];

export function DiscoverPage({ onNavigate }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [sortBy, setSortBy] = useState("Trending");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [myPicks, setMyPicks] = useState<string[]>([]);

  const getArtistStatus = (artist: any) => {
    if (artist.change > 4) return "Hot Streak";
    if (artist.change > 2) return "Rising";
    if (artist.score > 90) return "Top 100";
    return "Fan Favorite";
  };

  const handleAddToPicks = (artistId: string) => {
    if (myPicks.length < 5 && !myPicks.includes(artistId)) {
      setMyPicks([...myPicks, artistId]);
    } else if (myPicks.includes(artistId)) {
      setMyPicks(myPicks.filter((id) => id !== artistId));
    }
  };

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || artist.genre === selectedGenre;
    const matchesStatus =
      selectedStatus === "All" || artist.status === selectedStatus;
    const matchesLeague =
      selectedLeague === "All" || artist.league === selectedLeague;
    return matchesSearch && matchesGenre && matchesStatus && matchesLeague;
  });

  const selectedArtistData = artists.find((a) => a.id === selectedArtist);

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
              Search, explore, and scout your lineup for this week's league.
            </p>
            <div className="text-sm text-accent tracking-wider">
              YOUR LINEUP. YOUR LEAGUE.
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
                  className={`w-4 h-4 ml-2 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
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
              <Button className="gradient-bg neon-glow holo-button">
                Lock In Lineup
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Artist Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist, index) => {
            const isPicked = myPicks.includes(artist.id);
            const status = getArtistStatus(artist);

            return (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flip-card group cursor-pointer"
              >
                <div className="flip-card-inner">
                  {/* Front */}
                  <div
                    className="flip-card-front glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 neon-glow"
                    onClick={() => setSelectedArtist(artist.id)}
                  >
                    <div className="relative h-80">
                      <ImageWithFallback
                        src={artist.imageUrl}
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
                            artist.status === "Hot Streak"
                              ? "border-accent/50 bg-accent/10 text-accent"
                              : artist.status === "Rising"
                                ? "border-primary/50 bg-primary/10 text-primary"
                                : artist.status === "New Entrant"
                                  ? "border-secondary/50 bg-secondary/10 text-secondary"
                                  : "border-white/30 bg-white/10"
                          }`}
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          {artist.status}
                        </Badge>
                      </div>

                      {/* Score */}
                      <div className="absolute top-16 left-4 glass-card px-4 py-2 rounded-full backdrop-blur-xl border-primary/30">
                        <span className="gradient-text text-lg">
                          {artist.score.toFixed(1)}
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
                            {artist.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {(artist.fanBackers / 1000).toFixed(1)}K
                          </div>
                          <div
                            className={`flex items-center gap-1 ${
                              artist.change >= 0
                                ? "text-accent"
                                : "text-secondary"
                            }`}
                          >
                            <TrendingUp
                              className={`w-3 h-3 ${
                                artist.change < 0 ? "rotate-180" : ""
                              }`}
                            />
                            {artist.change >= 0 ? "+" : ""}
                            {artist.change.toFixed(1)}%
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
                  </div>

                  {/* Back - Engagement Data */}
                  <div className="flip-card-back glass-card rounded-2xl p-6 neon-glow">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl text-white mb-6 tracking-tight">
                          {artist.name}
                        </h3>
                        <div className="space-y-4">
                          <div className="glass-card p-4 rounded-xl">
                            <div className="text-sm text-muted-foreground mb-1">
                              Streams
                            </div>
                            <div className="text-2xl gradient-text">
                              {(artist.streams / 1000000).toFixed(1)}M
                            </div>
                          </div>
                          <div className="glass-card p-4 rounded-xl">
                            <div className="text-sm text-muted-foreground mb-1">
                              Engagement
                            </div>
                            <div className="text-2xl text-accent">
                              {artist.engagement}%
                            </div>
                          </div>
                          <div className="glass-card p-4 rounded-xl">
                            <div className="text-sm text-muted-foreground mb-1">
                              Growth
                            </div>
                            <div
                              className={`text-2xl ${
                                artist.growth >= 0
                                  ? "text-accent"
                                  : "text-secondary"
                              }`}
                            >
                              {artist.growth >= 0 ? "+" : ""}
                              {artist.growth}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("artist", artist.id);
                        }}
                        variant="outline"
                        className="w-full border-primary/40 hover:bg-primary/20"
                      >
                        View Full Profile
                      </Button>
                    </div>
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

      {/* Bottom Section - Hot Picks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="glass-card p-8 rounded-2xl card-reflection">
          <h2 className="text-3xl text-white mb-6 tracking-tight">
            This Week's Hot Picks
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {artists.slice(0, 3).map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl hover:scale-105 transition-all cursor-pointer neon-glow"
                onClick={() => onNavigate("artist", artist.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <ImageWithFallback
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-white truncate">{artist.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {artist.genre}
                    </div>
                  </div>
                </div>
                <div className="h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={artist.weeklyHistory.map((score, i) => ({ score }))}
                    >
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#8b1fff"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Performance
                  </span>
                  <span className="gradient-text">
                    {artist.score.toFixed(1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Artist Detail Modal */}
      <Dialog
        open={!!selectedArtist}
        onOpenChange={() => setSelectedArtist(null)}
      >
        <DialogContent className="glass-card max-w-4xl border-primary/20 p-0 overflow-hidden">
          {selectedArtistData && (
            <div>
              <div className="relative h-64">
                <ImageWithFallback
                  src={selectedArtistData.imageUrl}
                  alt={selectedArtistData.name}
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
                    {selectedArtistData.name}
                  </h2>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>{selectedArtistData.genre}</span>
                    <span>•</span>
                    <span>
                      {selectedArtistData.fanBackers.toLocaleString()} backers
                    </span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="overview" className="p-6">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <p className="text-muted-foreground">
                    {selectedArtistData.bio}
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass-card p-4 rounded-xl text-center">
                      <div className="text-3xl gradient-text mb-1">
                        {selectedArtistData.score.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <div className="text-3xl text-accent mb-1">
                        {selectedArtistData.engagement}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Engagement
                      </div>
                    </div>
                    <div className="glass-card p-4 rounded-xl text-center">
                      <div
                        className={`text-3xl mb-1 ${
                          selectedArtistData.growth >= 0
                            ? "text-accent"
                            : "text-secondary"
                        }`}
                      >
                        {selectedArtistData.growth >= 0 ? "+" : ""}
                        {selectedArtistData.growth}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Growth
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      handleAddToPicks(selectedArtistData.id);
                      setSelectedArtist(null);
                    }}
                    disabled={
                      myPicks.length >= 5 &&
                      !myPicks.includes(selectedArtistData.id)
                    }
                    className="w-full gradient-bg neon-glow holo-button"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to My Fholio
                  </Button>
                </TabsContent>

                <TabsContent value="stats" className="space-y-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      data={selectedArtistData.weeklyHistory.map(
                        (score, i) => ({ week: `W${i + 1}`, score })
                      )}
                    >
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#8b1fff"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Total Streams
                      </span>
                      <span className="text-white">
                        {selectedArtistData.streams.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Fan Votes</span>
                      <span className="text-white">
                        {selectedArtistData.votes}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Backers This Week
                      </span>
                      <span className="text-white">
                        {selectedArtistData.fanBackers.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="activity">
                  <div className="text-center py-8 text-muted-foreground">
                    Social activity feed coming soon...
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
