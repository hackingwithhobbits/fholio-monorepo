import { motion } from "framer-motion";
import { useState } from "react";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Music,
  Search,
  Calendar,
  BarChart3,
  Play,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { artists } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import { ShareButtons } from "./ShareButtons";

interface ChartsPageProps {
  onNavigate: (page: string, artistId?: string) => void;
}

export function ChartsPage({ onNavigate }: ChartsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  // Sort artists by score for current week
  const currentWeekCharts = [...artists].sort((a, b) => b.score - a.score);

  // Mock: previous week data (slightly different scores)
  const lastWeekCharts = [...artists]
    .map((a) => ({ ...a, score: a.score - (Math.random() * 5 - 2) }))
    .sort((a, b) => b.score - a.score);

  // Mock: all-time highs
  const allTimeHighs = [...artists]
    .map((a) => ({
      ...a,
      peakScore: a.score + Math.random() * 20,
      peakWeek: "Week of Oct 14",
    }))
    .sort((a, b) => b.peakScore - a.peakScore);

  const getRankChange = (artistId: string) => {
    const currentRank =
      currentWeekCharts.findIndex((a) => a.id === artistId) + 1;
    const lastRank = lastWeekCharts.findIndex((a) => a.id === artistId) + 1;
    return lastRank - currentRank;
  };

  const getWeeksOnChart = (artistId: string) => {
    // Mock data
    return Math.floor(Math.random() * 20) + 1;
  };

  const filteredCharts = currentWeekCharts.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (artist.weeklyTrack &&
        artist.weeklyTrack.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            HISTORICAL ARCHIVE
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 gradient-text tracking-tighter">
            Fholio Top 100
          </h1>
          <p className="text-xl text-muted-foreground/80 tracking-tight">
            The official charts for music's fantasy league
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
            <Input
              type="text"
              placeholder="Search by artist, track, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 glass-card border-primary/20 text-white text-lg"
            />
          </div>
        </motion.div>

        {/* Charts Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="glass-card mb-8 grid w-full max-w-2xl mx-auto grid-cols-3">
              <TabsTrigger value="current">
                <Trophy className="w-4 h-4 mr-2" />
                This Week
              </TabsTrigger>
              <TabsTrigger value="last">
                <Calendar className="w-4 h-4 mr-2" />
                Last Week
              </TabsTrigger>
              <TabsTrigger value="alltime">
                <BarChart3 className="w-4 h-4 mr-2" />
                All-Time Highs
              </TabsTrigger>
            </TabsList>

            {/* Current Week */}
            <TabsContent value="current">
              <div className="glass-card rounded-2xl overflow-hidden neon-glow">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/10 text-sm text-muted-foreground/70">
                  <div className="col-span-1 text-center">Rank</div>
                  <div className="col-span-1"></div>
                  <div className="col-span-4">Artist / Track</div>
                  <div className="col-span-2 text-center hidden md:block">
                    League
                  </div>
                  <div className="col-span-2 text-center">Points</div>
                  <div className="col-span-1 text-center hidden md:block">
                    Weeks
                  </div>
                  <div className="col-span-1 text-center">Trend</div>
                </div>

                {/* Chart Rows */}
                <div className="divide-y divide-white/5">
                  {filteredCharts.slice(0, 100).map((artist, index) => {
                    const rankChange = getRankChange(artist.id);
                    const weeksOnChart = getWeeksOnChart(artist.id);

                    return (
                      <motion.div
                        key={artist.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="grid grid-cols-12 gap-4 p-6 hover:bg-white/5 transition-all cursor-pointer group"
                        onClick={() =>
                          setSelectedArtist(
                            selectedArtist === artist.id ? null : artist.id
                          )
                        }
                      >
                        {/* Rank */}
                        <div className="col-span-1 flex items-center justify-center">
                          <div
                            className={`text-2xl tracking-tight ${
                              index < 3 ? "gradient-text" : "text-white"
                            }`}
                          >
                            {index + 1}
                          </div>
                        </div>

                        {/* Rank Change Indicator */}
                        <div className="col-span-1 flex items-center justify-center">
                          {rankChange > 0 && (
                            <div className="flex items-center gap-1 text-accent">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-xs">+{rankChange}</span>
                            </div>
                          )}
                          {rankChange < 0 && (
                            <div className="flex items-center gap-1 text-secondary">
                              <TrendingDown className="w-4 h-4" />
                              <span className="text-xs">{rankChange}</span>
                            </div>
                          )}
                          {rankChange === 0 && (
                            <span className="text-xs text-muted-foreground/50">
                              –
                            </span>
                          )}
                        </div>

                        {/* Artist Info */}
                        <div className="col-span-4 flex items-center gap-4">
                          <ImageWithFallback
                            src={artist.imageUrl}
                            alt={artist.name}
                            className="w-12 h-12 rounded-lg object-cover group-hover:scale-110 transition-transform"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-white tracking-tight truncate">
                              {artist.name}
                            </div>
                            <div className="text-sm text-muted-foreground/70 truncate flex items-center gap-2">
                              <Music className="w-3 h-3" />
                              {artist.weeklyTrack || artist.genre}
                            </div>
                          </div>
                        </div>

                        {/* League */}
                        <div className="col-span-2 hidden md:flex items-center justify-center">
                          <Badge
                            className={`${
                              artist.league === "Major"
                                ? "bg-accent/20 text-accent border-accent/30"
                                : "bg-primary/20 text-primary border-primary/30"
                            }`}
                          >
                            {artist.league}
                          </Badge>
                        </div>

                        {/* Points */}
                        <div className="col-span-2 flex items-center justify-center">
                          <div className="text-xl gradient-text tracking-tight">
                            {artist.score.toFixed(1)}
                          </div>
                        </div>

                        {/* Weeks on Chart */}
                        <div className="col-span-1 hidden md:flex items-center justify-center">
                          <div className="text-white">{weeksOnChart}</div>
                        </div>

                        {/* Sparkline */}
                        <div className="col-span-1 flex items-center justify-center">
                          <div className="w-16 h-8">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={artist.weeklyHistory.map((val, i) => ({
                                  val,
                                }))}
                              >
                                <Line
                                  type="monotone"
                                  dataKey="val"
                                  stroke={
                                    artist.change >= 0 ? "#00ffd5" : "#ff1f70"
                                  }
                                  strokeWidth={2}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {selectedArtist === artist.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="col-span-12 mt-4 pt-4 border-t border-white/10"
                          >
                            <div className="grid md:grid-cols-3 gap-6">
                              <div className="glass-card p-4 rounded-xl">
                                <div className="text-sm text-muted-foreground/70 mb-1">
                                  Genre
                                </div>
                                <div className="text-white">{artist.genre}</div>
                              </div>
                              <div className="glass-card p-4 rounded-xl">
                                <div className="text-sm text-muted-foreground/70 mb-1">
                                  Location
                                </div>
                                <div className="text-white">
                                  {artist.location}
                                </div>
                              </div>
                              <div className="glass-card p-4 rounded-xl">
                                <div className="text-sm text-muted-foreground/70 mb-1">
                                  Fan Backers
                                </div>
                                <div className="text-white">
                                  {artist.fanBackers.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex gap-3">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigate("artist", artist.id);
                                }}
                                className="gradient-bg neon-glow holo-button rounded-xl"
                              >
                                View Profile
                              </Button>
                              <div onClick={(e) => e.stopPropagation()}>
                                <ShareButtons
                                  title={`${artist.name} is #${
                                    index + 1
                                  } on Fholio Charts!`}
                                  description={`Score: ${artist.score.toFixed(
                                    1
                                  )} | ${artist.genre}`}
                                  compact
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Last Week - Similar structure */}
            <TabsContent value="last">
              <div className="glass-card rounded-2xl p-8 text-center neon-glow">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl text-white mb-2 tracking-tight">
                  Last Week's Charts
                </h3>
                <p className="text-muted-foreground/80 mb-4">
                  View historical rankings from the previous week
                </p>
                <p className="text-sm text-muted-foreground/60">
                  Week of October 21-27, 2025
                </p>
              </div>
            </TabsContent>

            {/* All-Time Highs */}
            <TabsContent value="alltime">
              <div className="glass-card rounded-2xl p-8 text-center neon-glow">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl text-white mb-2 tracking-tight">
                  All-Time Peak Performances
                </h3>
                <p className="text-muted-foreground/80">
                  The highest scores ever achieved on Fholio
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Chart Archive Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-8 neon-glow text-center"
        >
          <h3 className="text-xl text-white mb-4 tracking-tight">
            Search Chart History
          </h3>
          <p className="text-muted-foreground/80 mb-6">
            Find past charts by week, artist, or song
          </p>
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="e.g., 'October 2025' or 'Aiko Blaze'"
              className="h-12 glass-card border-primary/20 text-white"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
