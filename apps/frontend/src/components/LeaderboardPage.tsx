import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Music,
  Users,
  ArrowRight,
  Sparkles,
  MapPin,
  Crown,
  Award,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { artists, topFans } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import { ShareButtons } from "./ShareButtons";

interface LeaderboardPageProps {
  onNavigate: (page: string, artistId?: string) => void;
}

export function LeaderboardPage({ onNavigate }: LeaderboardPageProps) {
  const [selectedLeague, setSelectedLeague] = useState<"Major" | "Minor">(
    "Major"
  );

  const majorLeagueArtists = artists
    .filter((a) => a.league === "Major")
    .sort((a, b) => b.score - a.score);
  const minorLeagueArtists = artists
    .filter((a) => a.league === "Minor")
    .sort((a, b) => b.score - a.score);

  const currentArtists =
    selectedLeague === "Major" ? majorLeagueArtists : minorLeagueArtists;

  // City leaderboards
  const cities = [
    { name: "Los Angeles", artists: 15, topScore: 98.7, fans: 2847 },
    { name: "New York", artists: 12, topScore: 94.3, fans: 2234 },
    { name: "Atlanta", artists: 10, topScore: 89.2, fans: 1876 },
    { name: "Chicago", artists: 7, topScore: 85.1, fans: 1543 },
    { name: "Miami", artists: 6, topScore: 82.9, fans: 1298 },
    { name: "London", artists: 9, topScore: 87.5, fans: 1987 },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8 relative">
      {/* Background Logo Watermark */}
      <div className="logo-watermark">
        <Logo size="xl" className="opacity-100" style={{ height: "400px" }} />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-xs text-accent mb-4 tracking-widest uppercase">
            YOUR LINEUP. YOUR LEAGUE.
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 gradient-text tracking-tighter">
            Live Leaderboards
          </h1>
          <p className="text-xl text-muted-foreground/80 tracking-tight">
            Real-time rankings across all leagues
          </p>

          {/* Friday Reveal Countdown */}
          <div className="glass-card rounded-xl px-6 py-3 inline-block mt-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-white">Friday Reveal Countdown:</span>
              <span className="text-2xl gradient-text tracking-tight">
                2d 14h 32m
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Tabs: Top Artists, Top Fans, City Leagues */}
        <Tabs defaultValue="artists" className="w-full">
          <TabsList className="glass-card mb-8 grid w-full md:grid-cols-3 gap-2 p-2">
            <TabsTrigger value="artists">
              <Trophy className="w-4 h-4 mr-2" />
              Top Artists
            </TabsTrigger>
            <TabsTrigger value="fans">
              <Users className="w-4 h-4 mr-2" />
              Top Fans
            </TabsTrigger>
            <TabsTrigger value="cities">
              <MapPin className="w-4 h-4 mr-2" />
              City Leagues
            </TabsTrigger>
          </TabsList>

          {/* TOP ARTISTS TAB */}
          <TabsContent value="artists">
            {/* League Selector for Artists */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center mb-8"
            >
              <div className="glass-card rounded-2xl p-2 inline-flex gap-2">
                <button
                  onClick={() => setSelectedLeague("Major")}
                  className={`px-8 py-3 rounded-xl transition-all tracking-tight ${
                    selectedLeague === "Major"
                      ? "gradient-bg neon-glow text-white"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Major League
                  </span>
                </button>
                <button
                  onClick={() => setSelectedLeague("Minor")}
                  className={`px-8 py-3 rounded-xl transition-all tracking-tight ${
                    selectedLeague === "Minor"
                      ? "gradient-bg neon-glow text-white"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Minor League
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Top 3 Podium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-8"
            >
              {currentArtists.slice(0, 3).map((artist, index) => {
                const positions = [1, 0, 2]; // Reorder for podium effect
                const actualPosition = positions.indexOf(index);
                const heights = ["h-72", "h-80", "h-64"];
                const delays = [0.3, 0.25, 0.35];

                return (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delays[index] }}
                    className={`glass-card rounded-2xl overflow-hidden neon-glow cursor-pointer hover:scale-105 transition-all ${heights[actualPosition]}`}
                    onClick={() => onNavigate("artist", artist.id)}
                    style={{ order: positions[index] }}
                  >
                    <div className="relative h-full">
                      <ImageWithFallback
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                      {/* Rank Badge */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            index === 0
                              ? "bg-accent/30 border-2 border-accent backdrop-blur-xl"
                              : index === 1
                                ? "bg-primary/30 border-2 border-primary backdrop-blur-xl"
                                : "bg-secondary/30 border-2 border-secondary backdrop-blur-xl"
                          }`}
                        >
                          <Crown
                            className={`w-8 h-8 ${
                              index === 0
                                ? "text-accent"
                                : index === 1
                                  ? "text-primary"
                                  : "text-secondary"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="text-center mb-4">
                          <div
                            className={`text-5xl mb-2 ${
                              index === 0
                                ? "text-accent"
                                : index === 1
                                  ? "text-primary"
                                  : "text-secondary"
                            }`}
                          >
                            #{index + 1}
                          </div>
                          <h3 className="text-2xl text-white mb-2 tracking-tight">
                            {artist.name}
                          </h3>
                          <div className="text-sm text-muted-foreground/70 mb-3">
                            {artist.genre}
                          </div>
                          <div className="text-3xl gradient-text tracking-tight">
                            {artist.score.toFixed(1)}
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground/70">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {artist.fanBackers.toLocaleString()}
                          </span>
                          <span>•</span>
                          <span
                            className={`flex items-center gap-1 ${
                              artist.change >= 0
                                ? "text-accent"
                                : "text-secondary"
                            }`}
                          >
                            {artist.change >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {artist.change >= 0 ? "+" : ""}
                            {artist.change.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Weekly Champion Quote (First Place) */}
            {currentArtists[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-2xl p-8 mb-8 neon-glow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Award className="w-8 h-8 text-accent" />
                  <h2 className="text-2xl text-white tracking-tight">
                    Weekly Champion
                  </h2>
                </div>
                <div className="flex items-center gap-6">
                  <ImageWithFallback
                    src={currentArtists[0].imageUrl}
                    alt={currentArtists[0].name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl text-white mb-2">
                      {currentArtists[0].name}
                    </h3>
                    <p className="text-muted-foreground italic">
                      "Huge thanks to all my fans on Fholio! Your support means
                      everything. Let's keep the momentum going!"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Full Rankings List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl text-white tracking-tight mb-6">
                Full Rankings
              </h2>
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {currentArtists.map((artist, index) => {
                    const prevRank =
                      index + 1 + Math.floor(Math.random() * 3) - 1;
                    const rankChange = artist.change;
                    const progressToTop10 =
                      index >= 10
                        ? ((currentArtists[9].score - artist.score) /
                            currentArtists[9].score) *
                          100
                        : 100;

                    return (
                      <motion.div
                        key={artist.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: 0.6 + index * 0.02 }}
                        className="glass-card rounded-2xl p-4 neon-glow hover:scale-[1.01] transition-all group cursor-pointer relative overflow-hidden"
                        onClick={() => onNavigate("artist", artist.id)}
                      >
                        {/* Animated glow for climbing/dropping artists */}
                        {Math.abs(rankChange) > 3 && (
                          <motion.div
                            className={`absolute inset-0 ${
                              rankChange > 0 ? "bg-accent/5" : "bg-secondary/5"
                            }`}
                            animate={{ opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}

                        <div className="relative z-10 flex items-center gap-4">
                          {/* Rank */}
                          <div className="w-12 text-center">
                            <div
                              className={`text-2xl tracking-tight ${
                                index < 3 ? "gradient-text" : "text-white"
                              }`}
                            >
                              #{index + 1}
                            </div>
                          </div>

                          {/* Artist Image */}
                          <ImageWithFallback
                            src={artist.imageUrl}
                            alt={artist.name}
                            className="w-16 h-16 rounded-xl object-cover group-hover:scale-110 transition-transform"
                          />

                          {/* Artist Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-lg text-white tracking-tight truncate">
                                {artist.name}
                              </h3>
                              <Badge
                                className={`${
                                  artist.status === "Hot Streak"
                                    ? "bg-accent/20 text-accent border-accent/30"
                                    : artist.status === "Rising"
                                      ? "bg-primary/20 text-primary border-primary/30"
                                      : artist.status === "New Entrant"
                                        ? "bg-secondary/20 text-secondary border-secondary/30"
                                        : "bg-white/10 text-white/70 border-white/20"
                                } text-xs`}
                              >
                                {artist.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground/70">
                              <span>{artist.genre}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {artist.fanBackers.toLocaleString()} fans
                              </span>
                              <span>•</span>
                              <span>{artist.location}</span>
                            </div>

                            {/* Progress to Top 10 */}
                            {index >= 10 && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs text-muted-foreground/70 mb-1">
                                  <span>Progress to Top 10</span>
                                  <span>{progressToTop10.toFixed(0)}%</span>
                                </div>
                                <Progress
                                  value={progressToTop10}
                                  className="h-1"
                                />
                              </div>
                            )}
                          </div>

                          {/* Stats */}
                          <div className="hidden md:flex items-center gap-8 text-center">
                            <div>
                              <div className="text-2xl gradient-text tracking-tight">
                                {artist.score.toFixed(1)}
                              </div>
                              <div className="text-xs text-muted-foreground/70">
                                Score
                              </div>
                            </div>
                            <div>
                              <div
                                className={`text-2xl tracking-tight flex items-center gap-1 ${
                                  rankChange >= 0
                                    ? "text-accent"
                                    : "text-secondary"
                                }`}
                              >
                                {rankChange >= 0 ? (
                                  <TrendingUp className="w-5 h-5" />
                                ) : (
                                  <TrendingDown className="w-5 h-5" />
                                )}
                                {rankChange >= 0 ? "+" : ""}
                                {rankChange.toFixed(1)}%
                              </div>
                              <div className="text-xs text-muted-foreground/70">
                                Change
                              </div>
                            </div>
                          </div>

                          {/* Share Button */}
                          <div onClick={(e) => e.stopPropagation()}>
                            <ShareButtons
                              title={`Check out ${artist.name} on Fholio!`}
                              description={`Rank #${
                                index + 1
                              } | Score: ${artist.score.toFixed(1)}`}
                              compact
                            />
                          </div>

                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          </TabsContent>

          {/* TOP FANS TAB */}
          <TabsContent value="fans">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl text-white tracking-tight mb-2">
                  Top Fans This Week
                </h2>
                <p className="text-muted-foreground">
                  Ranked by total earnings and lineup performance
                </p>
              </div>

              {/* Top 3 Fans Podium */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {topFans.slice(0, 3).map((fan, index) => {
                  const positions = [1, 0, 2];
                  const heights = ["h-64", "h-72", "h-56"];

                  return (
                    <motion.div
                      key={fan.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className={`glass-card rounded-2xl p-8 text-center neon-glow hover:scale-105 transition-all ${
                        heights[positions.indexOf(index)]
                      }`}
                      style={{ order: positions[index] }}
                    >
                      <div className="relative inline-block mb-4">
                        <img
                          src={fan.avatar}
                          alt={fan.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-primary/30"
                        />
                        <div
                          className={`absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-white ${
                            index === 0
                              ? "bg-accent"
                              : index === 1
                                ? "bg-primary"
                                : "bg-secondary"
                          }`}
                        >
                          {index === 0 ? (
                            <Crown className="w-5 h-5" />
                          ) : (
                            fan.rank
                          )}
                        </div>
                      </div>
                      <div className="text-xl text-white tracking-tight mb-1">
                        {fan.name}
                      </div>
                      <div className="text-sm text-muted-foreground/70 mb-4">
                        {fan.city}
                      </div>
                      <div className="text-3xl gradient-text tracking-tight mb-2">
                        ${fan.earnings}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Total Earnings
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Full Fan Rankings */}
              <div className="space-y-3">
                <h3 className="text-xl text-white tracking-tight mb-4">
                  Full Rankings
                </h3>
                {topFans.map((fan, index) => (
                  <motion.div
                    key={fan.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="glass-card rounded-2xl p-4 neon-glow hover:scale-[1.01] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="w-12 text-center">
                        <div
                          className={`text-2xl tracking-tight ${
                            index < 3 ? "gradient-text" : "text-white"
                          }`}
                        >
                          #{fan.rank}
                        </div>
                      </div>

                      {/* Fan Avatar */}
                      <img
                        src={fan.avatar}
                        alt={fan.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      />

                      {/* Fan Info */}
                      <div className="flex-1">
                        <h3 className="text-lg text-white tracking-tight mb-1">
                          {fan.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground/70">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {fan.city}
                          </span>
                        </div>
                      </div>

                      {/* Earnings */}
                      <div className="text-right">
                        <div className="text-2xl gradient-text tracking-tight">
                          ${fan.earnings}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Earnings
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* CITY LEAGUES TAB */}
          <TabsContent value="cities">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl text-white tracking-tight mb-2">
                  City Leagues
                </h2>
                <p className="text-muted-foreground">
                  Competition by location. Represent your city.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {cities.map((city, index) => (
                  <motion.div
                    key={city.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-6 neon-glow hover:scale-105 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5 text-accent" />
                          <h3 className="text-2xl text-white tracking-tight">
                            {city.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground/70">
                          <span className="flex items-center gap-1">
                            <Music className="w-3 h-3" />
                            {city.artists} artists
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {city.fans.toLocaleString()} fans
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        #{index + 1}
                      </Badge>
                    </div>

                    <div className="glass-card rounded-xl p-4 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Top Score
                        </span>
                        <div className="text-2xl gradient-text tracking-tight">
                          {city.topScore}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <button className="text-sm text-accent hover:text-accent/80 flex items-center gap-1 mx-auto">
                        View {city.name} Artists
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
