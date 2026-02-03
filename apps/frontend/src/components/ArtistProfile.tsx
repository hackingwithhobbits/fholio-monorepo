// apps/frontend/src/components/ArtistProfile.tsx

import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Music2,
  Heart,
  ExternalLink,
  Vote,
  Loader2,
  AlertCircle,
  Play,
  TrendingDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  useVotingActions,
  useMyVotes,
  useRemainingVotes,
} from "@/hooks/useVoting";
import { useCurrentWeek } from "@/hooks/useWeek";
import { authUtils } from "@/lib/auth";
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
import { useArtistProfile } from "@/hooks/useArtist";

interface ArtistProfileProps {
  artistId?: string;
  onNavigate: (page: string) => void;
}

export function ArtistProfile({ artistId, onNavigate }: ArtistProfileProps) {
  const userSession = authUtils.getSession();
  const { profile, isLoading, error } = useArtistProfile(artistId);
  const { week } = useCurrentWeek();
  const { votes: myVotes } = useMyVotes(week?.id);
  const { remaining } = useRemainingVotes(week?.id);
  const { submitVote, isVoting } = useVotingActions();

  // Check if user has voted for this artist
  const hasVoted = myVotes.some((v: any) => v.artist_id === artistId);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl text-white mb-2">Artist Not Found</h2>
          <p className="text-muted-foreground mb-6">
            This artist doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => onNavigate("dashboard")}
            className="gradient-bg"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const { artist, tracks, stats, history, backers } = profile;

  // Prepare performance breakdown data for radar chart
  const performanceBreakdown = [
    { category: "Streams", value: Math.min(100, stats.streams / 1000) },
    { category: "Engagement", value: Math.min(100, stats.engagement) },
    { category: "Votes", value: Math.min(100, stats.totalVotes / 10) },
    { category: "Growth", value: Math.min(100, Math.abs(stats.socialGrowth)) },
    { category: "Score", value: Math.min(100, stats.currentScore) },
  ];

  // Prepare weekly data for line chart
  const weeklyData = history.map((item: any) => ({
    week: `W${item.week?.week_number || "?"}`,
    score: item.final_score || 0,
  }));

  // Calculate change percentage from history
  const calculateChange = () => {
    if (history.length < 2) return 0;
    const current = history[history.length - 1]?.final_score || 0;
    const previous = history[history.length - 2]?.final_score || 0;
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const change = calculateChange();

  // Handle vote
  const handleVote = async () => {
    if (!userSession) {
      onNavigate("signin-fan");
      return;
    }

    if (!artistId) return;

    const success = await submitVote(artistId, week?.id);
    if (success) {
      // Votes will refresh automatically via SWR
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src={artist.image_url}
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
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-4xl md:text-5xl gradient-text">
                      {artist.name}
                    </h1>
                    {change !== 0 && (
                      <div
                        className={`px-4 py-1.5 rounded-full ${change >= 0 ? "bg-accent/20" : "bg-secondary/20"}`}
                      >
                        <span
                          className={
                            change >= 0 ? "text-accent" : "text-secondary"
                          }
                        >
                          {change >= 0 ? "+" : ""}
                          {change.toFixed(1)}%
                        </span>
                      </div>
                    )}
                    {stats.currentRank && (
                      <div className="px-4 py-1.5 rounded-full bg-primary/20">
                        <span className="text-primary">
                          #{stats.currentRank}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-2">
                      <Music2 className="w-4 h-4" />
                      <span>{artist.genre || "Unknown"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {backers.totalBackers.toLocaleString()} backers
                      </span>
                    </div>
                    {artist.league && (
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 rounded bg-white/10 text-xs">
                          {artist.league}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleVote}
                    disabled={
                      hasVoted || isVoting || remaining <= 0 || !userSession
                    }
                    className={
                      hasVoted
                        ? "bg-accent/20 text-accent"
                        : "gradient-bg hover:opacity-90 glow-pulse"
                    }
                  >
                    {hasVoted ? (
                      <>
                        <Heart className="w-4 h-4 mr-2 fill-current" />
                        Voted
                      </>
                    ) : isVoting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Voting...
                      </>
                    ) : (
                      <>
                        <Vote className="w-4 h-4 mr-2" />
                        Vote for Artist
                      </>
                    )}
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
                    {stats.currentScore.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">/ 100</span>
                </div>
                <p className="text-muted-foreground">Overall Score</p>
                {stats.status && stats.status !== "N/A" && (
                  <div className="mt-3">
                    <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm">
                      {stats.status}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Streams
                    </span>
                    <span className="text-white">
                      {stats.streams.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(100, stats.streams / 1000)}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Engagement
                    </span>
                    <span className="text-white">{stats.engagement}%</span>
                  </div>
                  <Progress value={stats.engagement} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Fan Votes
                    </span>
                    <span className="text-white">{stats.totalVotes}</span>
                  </div>
                  <Progress
                    value={Math.min(100, stats.totalVotes / 10)}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Social Growth
                    </span>
                    <span
                      className={
                        stats.socialGrowth >= 0
                          ? "text-accent"
                          : "text-secondary"
                      }
                    >
                      {stats.socialGrowth >= 0 ? "+" : ""}
                      {stats.socialGrowth.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={Math.min(100, Math.abs(stats.socialGrowth))}
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
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white">Performance History</h2>
              <div className="flex items-center gap-2">
                {change >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-accent" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-secondary" />
                )}
                <span
                  className={change >= 0 ? "text-accent" : "text-secondary"}
                >
                  {change >= 0 ? "+" : ""}
                  {change.toFixed(1)}% this week
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
        )}

        {/* About & Tracks */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 glass-card p-8 rounded-2xl"
          >
            <h2 className="text-2xl text-white mb-4">About {artist.name}</h2>
            <p className="text-muted-foreground mb-6">
              {artist.bio ||
                `${artist.name} is a ${artist.genre} artist competing in the ${artist.league} league. Follow their journey on Fholio!`}
            </p>

            {/* Tracks */}
            {tracks.length > 0 && (
              <>
                <h3 className="text-lg text-white mb-4">Tracks</h3>
                <div className="space-y-3">
                  {tracks.slice(0, 5).map((track: any) => (
                    <div
                      key={track.id}
                      className="glass-card p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-all"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">
                          {track.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {track.genre}
                        </div>
                      </div>
                      {track.spotify_url && (
                        <a
                          href={track.spotify_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent/80"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            <h3 className="text-lg text-white mb-4 mt-6">Fan Insights</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl gradient-text mb-1">
                  {backers.totalBackers.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Backers
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl text-accent mb-1">
                  {backers.voters}
                </div>
                <div className="text-sm text-muted-foreground">Voters</div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-3xl text-primary mb-1">
                  {stats.currentRank ? `#${stats.currentRank}` : "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Current Rank
                </div>
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
              {artist.spotify_url && (
                <a
                  href={artist.spotify_url}
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
              {artist.apple_music_url && (
                <a
                  href={artist.apple_music_url}
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
              {artist.instagram_url && (
                <a
                  href={artist.instagram_url}
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
              {artist.tiktok_url && (
                <a
                  href={artist.tiktok_url}
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
              {artist.youtube_url && (
                <a
                  href={artist.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between glass-card p-4 rounded-lg hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
                      <Music2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white">YouTube</span>
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
