import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Music2,
  Heart,
  ExternalLink,
  Plus,
} from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { artists } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

interface ArtistProfileProps {
  artistId?: string;
  onNavigate: (page: string) => void;
}

export function ArtistProfile({
  artistId = "1",
  onNavigate,
}: ArtistProfileProps) {
  const artist = artists.find((a) => a.id === artistId) || artists[0];

  const performanceBreakdown = [
    { category: "Streams", value: 92 },
    { category: "Engagement", value: artist.engagement },
    { category: "Votes", value: artist.votes },
    { category: "Growth", value: 85 },
    { category: "Social", value: 88 },
  ];

  const weeklyData = artist.weeklyHistory.map((score, index) => ({
    week: `W${index + 1}`,
    score,
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src={artist.imageUrl}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

        {/* Back Button */}
        <button
          onClick={() => onNavigate("dashboard")}
          className="absolute top-20 left-4 sm:left-8 glass-card p-3 rounded-lg hover:bg-white/10 transition-all z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Artist Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl md:text-5xl gradient-text">
                      {artist.name}
                    </h1>
                    <div
                      className={`px-4 py-1.5 rounded-full ${artist.change >= 0 ? "bg-accent/20" : "bg-secondary/20"}`}
                    >
                      <span
                        className={
                          artist.change >= 0 ? "text-accent" : "text-secondary"
                        }
                      >
                        {artist.change >= 0 ? "+" : ""}
                        {artist.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Music2 className="w-4 h-4" />
                      <span>{artist.genre}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{artist.fanBackers.toLocaleString()} backers</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="gradient-bg hover:opacity-90 glow-pulse">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to My Fholio
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary/40 text-white hover:bg-primary/20 hover:border-primary/60 hover:text-white transition-all"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        {/* Performance Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl text-white mb-6">Current Performance</h2>
              <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl gradient-text">
                    {artist.score.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">/ 100</span>
                </div>
                <p className="text-muted-foreground">Overall Score</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Streams
                    </span>
                    <span className="text-white">
                      {artist.streams.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Engagement
                    </span>
                    <span className="text-white">{artist.engagement}%</span>
                  </div>
                  <Progress value={artist.engagement} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Fan Votes
                    </span>
                    <span className="text-white">{artist.votes}%</span>
                  </div>
                  <Progress value={artist.votes} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Growth Rate
                    </span>
                    <span
                      className={
                        artist.growth >= 0 ? "text-accent" : "text-secondary"
                      }
                    >
                      {artist.growth >= 0 ? "+" : ""}
                      {artist.growth}%
                    </span>
                  </div>
                  <Progress
                    value={Math.abs(artist.growth) * 10}
                    className="h-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl text-white mb-6">
                Performance Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={performanceBreakdown}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="category" stroke="#a0a0a0" />
                  <Radar
                    dataKey="value"
                    stroke="#8b1fff"
                    fill="#8b1fff"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Performance History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-white">Performance History</h2>
            <div className="flex items-center gap-2">
              <TrendingUp
                className={`w-5 h-5 ${artist.change >= 0 ? "text-accent" : "text-secondary rotate-180"}`}
              />
              <span
                className={
                  artist.change >= 0 ? "text-accent" : "text-secondary"
                }
              >
                {artist.change >= 0 ? "+" : ""}
                {artist.change.toFixed(1)}% this week
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={weeklyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="week" stroke="#a0a0a0" />
              <YAxis stroke="#a0a0a0" />
              <Tooltip
                contentStyle={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(139, 31, 255, 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#8b1fff"
                strokeWidth={3}
                dot={{ fill: "#8b1fff", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* About & Social */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 glass-card p-8 rounded-2xl"
          >
            <h2 className="text-2xl text-white mb-4">About {artist.name}</h2>
            <p className="text-muted-foreground mb-6">{artist.bio}</p>

            <h3 className="text-lg text-white mb-4">Fan Insights</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl gradient-text mb-1">
                  {artist.fanBackers.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Backers
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl text-accent mb-1">
                  +{(artist.fanBackers * 0.12).toFixed(0)}
                </div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl text-primary mb-1">
                  #{artists.findIndex((a) => a.id === artist.id) + 1}
                </div>
                <div className="text-sm text-muted-foreground">Global Rank</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h2 className="text-2xl text-white mb-6">Listen Now</h2>
            <div className="space-y-3">
              {artist.socialLinks.spotify && (
                <a
                  href={artist.socialLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between glass-card p-4 rounded-lg hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1DB954] flex items-center justify-center">
                      <Music2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white">Spotify</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-white" />
                </a>
              )}
              {artist.socialLinks.apple && (
                <a
                  href={artist.socialLinks.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between glass-card p-4 rounded-lg hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <Music2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white">Apple Music</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-white" />
                </a>
              )}
              {artist.socialLinks.tiktok && (
                <a
                  href={artist.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between glass-card p-4 rounded-lg hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
                      <Music2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white">TikTok</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-white" />
                </a>
              )}
              {artist.socialLinks.instagram && (
                <a
                  href={artist.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between glass-card p-4 rounded-lg hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center">
                      <Music2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white">Instagram</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-white" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
