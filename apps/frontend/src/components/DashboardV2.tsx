// apps/frontend/src/components/DashboardV2.tsx

import { motion, Reorder } from "framer-motion";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Clock,
  Lock,
  Save,
  X,
  Plus,
  MessageCircle,
  Heart,
  Trophy,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import { ShareButtons } from "./ShareButtons";
import { toast } from "sonner";
import { useMyCurrentLineup, useLineupActions } from "@/hooks/useLineup";
import { useCurrentWeek } from "@/hooks/useWeek";
import { authUtils } from "@/lib/auth";

interface DashboardV2Props {
  onNavigate: (page: string, artistId?: string) => void;
}

interface LineupArtist {
  id: string;
  name: string;
  genre: string;
  imageUrl: string;
  league: string;
  status: string;
  location: string;
  score: number;
  change: number;
  fanBackers: number;
  position: number;
  isCaptain: boolean;
}

export function DashboardV2({ onNavigate }: DashboardV2Props) {
  const userSession = authUtils.getSession();
  const { week, isLoading: weekLoading } = useCurrentWeek();
  const {
    lineup: backendLineup,
    isLoading,
    error,
    refresh,
  } = useMyCurrentLineup();
  const { saveLineup, lockLineup } = useLineupActions();

  const [lineup, setLineup] = useState<LineupArtist[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const maxArtists = 5;
  const isLocked = backendLineup?.is_locked || false;

  // Transform backend lineup to component format
  useEffect(() => {
    if (backendLineup && backendLineup.lineup_artists) {
      const transformedLineup = backendLineup.lineup_artists
        .sort((a: any, b: any) => a.position - b.position)
        .map((la: any) => ({
          id: la.artist_id,
          name: la.artist?.name || "Unknown Artist",
          genre: la.artist?.genre || "Unknown",
          imageUrl: la.artist?.image_url || "",
          league: la.artist?.league || "Minor",
          status: la.artist_week?.status || "Stable",
          location: la.artist?.location || "Unknown",
          score: la.artist_week?.final_score || 0,
          change: la.artist_week?.social_growth || 0,
          fanBackers: 0, // TODO: Get from backend if available
          position: la.position,
          isCaptain: la.is_captain || false,
        }));
      setLineup(transformedLineup);
    }
  }, [backendLineup]);

  // Calculate time until lock
  const getTimeUntilLock = () => {
    if (!week?.lineup_lock_at) return "N/A";

    const now = new Date();
    const lockTime = new Date(week.lineup_lock_at);
    const diff = lockTime.getTime() - now.getTime();

    if (diff <= 0) return "Locked";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d ${hours}h`;
  };

  const handleRemoveArtist = (artistId: string) => {
    if (isLocked) {
      toast.error("Lineup is locked for this week");
      return;
    }
    setLineup(lineup.filter((a) => a.id !== artistId));
    toast.success("Artist removed from lineup");
  };

  const handleSaveLineup = async () => {
    if (!backendLineup) return;

    setIsSaving(true);
    try {
      const artistIds = lineup.map((a) => a.id);
      const captainId = lineup.find((a) => a.isCaptain)?.id;

      await saveLineup(artistIds, captainId);
      await refresh();
      setIsEditing(false);
    } catch (error: any) {
      // Error already toasted by useLineupActions
      console.error("Save lineup error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLockLineup = async () => {
    if (!backendLineup?.id) return;

    try {
      await lockLineup(backendLineup.id);
      await refresh();
    } catch (error: any) {
      // Error already toasted by useLineupActions
      console.error("Lock lineup error:", error);
    }
  };

  const totalScore = lineup.reduce((sum, artist) => sum + artist.score, 0);
  const avgGrowth =
    lineup.length > 0
      ? lineup.reduce((sum, artist) => sum + artist.change, 0) / lineup.length
      : 0;

  // Mock data for community features (keep these for now)
  const communityPosts = [
    {
      id: "1",
      user: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      artist: "Aiko Blaze",
      comment: "This artist is about to blow up! New track is 🔥",
      likes: 24,
      time: "2h ago",
    },
  ];

  const friendsLineups = [
    {
      name: "Casey Morgan",
      commonArtists: 3,
      totalScore: 412.3,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
  ];

  // Loading state
  if (isLoading || weekLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your lineup...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
          <p className="text-white mb-4">Failed to load lineup</p>
          <Button onClick={() => refresh()}>Retry</Button>
        </div>
      </div>
    );
  }

  // No lineup yet
  if (!backendLineup && lineup.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-12 neon-glow"
          >
            <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl gradient-text mb-4">
              Create Your First Lineup
            </h2>
            <p className="text-muted-foreground mb-8">
              Pick up to {maxArtists} artists to back this week. Choose wisely!
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate("discover")}
              className="gradient-bg neon-glow holo-button rounded-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Browse Artists
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

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
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <div className="text-xs text-accent mb-2 tracking-widest uppercase">
              YOUR LINEUP. YOUR LEAGUE.
            </div>
            <h1 className="text-5xl md:text-6xl gradient-text tracking-tighter mb-2">
              My Fholio Lineup
            </h1>
            <p className="text-muted-foreground/80 tracking-tight">
              Week {week?.week_number || "N/A"} • {userSession?.username}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {!isLocked && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-primary/30 hover:bg-primary/10"
                  disabled={lineup.length === 0}
                >
                  {isEditing ? "Cancel" : "Edit Lineup"}
                </Button>
                {isEditing && (
                  <Button
                    onClick={handleSaveLineup}
                    disabled={isSaving}
                    className="gradient-bg neon-glow holo-button rounded-xl"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                )}
                <Button
                  onClick={handleLockLineup}
                  disabled={lineup.length === 0}
                  className="bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Lock in for Week
                </Button>
              </>
            )}
            {isLocked && (
              <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2 text-sm">
                <Lock className="w-4 h-4 mr-2" />
                Lineup Locked
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Lock-in Warning */}
        {!isLocked && week && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 border-2 border-accent/30 neon-glow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-white tracking-tight mb-1">
                    Lineups lock{" "}
                    {new Date(week.lineup_lock_at).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground/70">
                    Time remaining: {getTimeUntilLock()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl gradient-text tracking-tight">
                  {lineup.length}/{maxArtists}
                </div>
                <div className="text-xs text-muted-foreground/70">
                  Artists Selected
                </div>
              </div>
            </div>
            <Progress
              value={(lineup.length / maxArtists) * 100}
              className="h-2 mt-4"
            />
          </motion.div>
        )}

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-4"
        >
          <div className="glass-card rounded-2xl p-6 neon-glow">
            <div className="flex items-center gap-2 mb-2 text-accent">
              <Trophy className="w-5 h-5" />
              <span className="text-sm tracking-tight">Total Score</span>
            </div>
            <div className="text-3xl gradient-text tracking-tight">
              {totalScore.toFixed(1)}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 neon-glow">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm tracking-tight">Avg Growth</span>
            </div>
            <div className="text-3xl text-white tracking-tight">
              +{avgGrowth.toFixed(1)}%
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 neon-glow">
            <div className="flex items-center gap-2 mb-2 text-secondary">
              <Users className="w-5 h-5" />
              <span className="text-sm tracking-tight">Your Rank</span>
            </div>
            <div className="text-3xl text-white tracking-tight">
              {backendLineup?.rank ? `#${backendLineup.rank}` : "N/A"}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 neon-glow">
            <div className="flex items-center gap-2 mb-2 text-accent">
              <Clock className="w-5 h-5" />
              <span className="text-sm tracking-tight">Time to Lock</span>
            </div>
            <div className="text-3xl text-white tracking-tight">
              {getTimeUntilLock()}
            </div>
          </div>
        </motion.div>

        {/* Lineup Cards - Reorderable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-white tracking-tight">Your Lineup</h2>
            {lineup.length < maxArtists && !isLocked && (
              <Button
                variant="outline"
                onClick={() => onNavigate("discover")}
                className="border-primary/30 hover:bg-primary/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Artist ({lineup.length}/{maxArtists})
              </Button>
            )}
          </div>

          {lineup.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center neon-glow">
              <Users className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                No artists in your lineup yet
              </p>
              <Button
                onClick={() => onNavigate("discover")}
                className="mt-4"
                variant="outline"
              >
                Browse Artists
              </Button>
            </div>
          ) : (
            <Reorder.Group
              values={lineup}
              onReorder={setLineup}
              className="space-y-4"
            >
              {lineup.map((artist, index) => (
                <Reorder.Item
                  key={artist.id}
                  value={artist}
                  className={`glass-card rounded-2xl p-6 neon-glow ${isEditing ? "cursor-grab active:cursor-grabbing" : ""}`}
                >
                  <div className="flex items-center gap-6">
                    {/* Rank */}
                    <div className="text-center">
                      <div className="text-4xl gradient-text tracking-tight">
                        #{index + 1}
                      </div>
                      {artist.isCaptain && (
                        <Badge className="mt-2 bg-accent/20 text-accent text-xs">
                          Captain
                        </Badge>
                      )}
                    </div>

                    {/* Artist Image */}
                    <ImageWithFallback
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />

                    {/* Artist Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className="text-2xl text-white tracking-tight cursor-pointer hover:text-primary transition-colors"
                          onClick={() => onNavigate("artist", artist.id)}
                        >
                          {artist.name}
                        </h3>
                        <Badge
                          className={`${
                            artist.league === "Major"
                              ? "bg-accent/20 text-accent border-accent/30"
                              : "bg-primary/20 text-primary border-primary/30"
                          }`}
                        >
                          {artist.league}
                        </Badge>
                        <Badge
                          className={`${
                            artist.status === "Hot Streak"
                              ? "bg-accent/20 text-accent border-accent/30"
                              : artist.status === "Rising"
                                ? "bg-primary/20 text-primary border-primary/30"
                                : "bg-white/10 text-white/70 border-white/20"
                          }`}
                        >
                          {artist.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/70">
                        <span>{artist.genre}</span>
                        <span>•</span>
                        <span>{artist.location}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-3xl gradient-text tracking-tight">
                          {artist.score.toFixed(1)}
                        </div>
                        <div className="text-xs text-muted-foreground/70">
                          Score
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-2xl tracking-tight ${artist.change >= 0 ? "text-accent" : "text-secondary"}`}
                        >
                          {artist.change >= 0 ? "+" : ""}
                          {artist.change.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground/70">
                          Growth
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {isEditing && !isLocked && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArtist(artist.id)}
                        className="text-secondary hover:text-secondary/80 hover:bg-secondary/10"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-8 text-center neon-glow bg-gradient-to-br from-primary/10 to-secondary/10"
        >
          <h3 className="text-2xl text-white mb-2 tracking-tight">
            Share Your Lineup
          </h3>
          <p className="text-muted-foreground/80 mb-6">
            Show the world who you're backing this week
          </p>
          <ShareButtons
            title="Check out my Fholio lineup this week!"
            description={`Backing ${lineup.map((a) => a.name).join(", ")} | Total Score: ${totalScore.toFixed(1)}`}
          />
        </motion.div>
      </div>
    </div>
  );
}
