import { motion, Reorder } from "framer-motion";
import { useState } from "react";
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
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar } from "./ui/avatar";
import { artists, userPortfolio, topFans } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import { ShareButtons } from "./ShareButtons";
import { toast } from "sonner";

interface DashboardV2Props {
  onNavigate: (page: string, artistId?: string) => void;
}

export function DashboardV2({ onNavigate }: DashboardV2Props) {
  const [lineup, setLineup] = useState(userPortfolio.artists);
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const maxArtists = 5;
  const lockInDeadline = "Friday 6:00 PM ET";
  const timeUntilLock = "2d 14h";

  // Mock community comments
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
    {
      id: "2",
      user: "Jordan Taylor",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      artist: "Nova Red",
      comment: "Been following since the beginning. So proud of this growth!",
      likes: 18,
      time: "4h ago",
    },
    {
      id: "3",
      user: "Sam Rivera",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      artist: "Stellar Waves",
      comment: "Festival set last week was incredible. Momentum building! 💜",
      likes: 31,
      time: "6h ago",
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
    {
      name: "Riley Brooks",
      commonArtists: 2,
      totalScore: 389.7,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
  ];

  const handleRemoveArtist = (artistId: string) => {
    if (isLocked) {
      toast.error("Lineup is locked for this week");
      return;
    }
    setLineup(lineup.filter((a) => a.id !== artistId));
    toast.success("Artist removed from lineup");
  };

  const handleSaveLineup = () => {
    toast.success("Lineup saved!", {
      description: "Your changes have been saved.",
    });
    setIsEditing(false);
  };

  const handleLockLineup = () => {
    setIsLocked(true);
    toast.success("Lineup locked for this week!", {
      description: `Your lineup is now locked until Monday. Good luck!`,
    });
  };

  const totalScore = lineup.reduce((sum, artist) => sum + artist.score, 0);
  const avgGrowth =
    lineup.reduce((sum, artist) => sum + artist.change, 0) / lineup.length;

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
              Your Artists This Week
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {!isLocked && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-primary/30 hover:bg-primary/10"
                >
                  {isEditing ? "Cancel" : "Edit Lineup"}
                </Button>
                {isEditing && (
                  <Button
                    onClick={handleSaveLineup}
                    className="gradient-bg neon-glow holo-button rounded-xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                )}
                <Button
                  onClick={handleLockLineup}
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
        {!isLocked && (
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
                    Lineups lock {lockInDeadline}
                  </div>
                  <div className="text-sm text-muted-foreground/70">
                    Time remaining: {timeUntilLock}
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
              <span className="text-sm tracking-tight">Total Backers</span>
            </div>
            <div className="text-3xl text-white tracking-tight">
              {(
                lineup.reduce((sum, a) => sum + a.fanBackers, 0) / 1000
              ).toFixed(1)}
              K
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 neon-glow">
            <div className="flex items-center gap-2 mb-2 text-accent">
              <Clock className="w-5 h-5" />
              <span className="text-sm tracking-tight">Time to Lock</span>
            </div>
            <div className="text-3xl text-white tracking-tight">
              {timeUntilLock}
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

          <Reorder.Group
            values={lineup}
            onReorder={setLineup}
            className="space-y-4"
          >
            {lineup.map((artist, index) => (
              <Reorder.Item
                key={artist.id}
                value={artist}
                className={`glass-card rounded-2xl p-6 neon-glow ${
                  isEditing ? "cursor-grab active:cursor-grabbing" : ""
                }`}
              >
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="text-center">
                    <div className="text-4xl gradient-text tracking-tight">
                      #{index + 1}
                    </div>
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
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {artist.fanBackers.toLocaleString()} backers
                      </span>
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
                        className={`text-2xl tracking-tight ${
                          artist.change >= 0 ? "text-accent" : "text-secondary"
                        }`}
                      >
                        {artist.change >= 0 ? "+" : ""}
                        {artist.change.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground/70">
                        Change
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
        </motion.div>

        {/* Tabbed Content: Community Feed & Friends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="metallic-divider my-8" />

          <Tabs defaultValue="community" className="w-full">
            <TabsList className="glass-card mb-6">
              <TabsTrigger value="community">
                <MessageCircle className="w-4 h-4 mr-2" />
                Community Feed
              </TabsTrigger>
              <TabsTrigger value="friends">
                <Users className="w-4 h-4 mr-2" />
                Friends' Lineups
              </TabsTrigger>
            </TabsList>

            <TabsContent value="community" className="space-y-4">
              <h3 className="text-xl text-white mb-4 tracking-tight">
                What Fans Are Saying
              </h3>
              {communityPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card rounded-2xl p-6 neon-glow hover:scale-[1.01] transition-all"
                >
                  <div className="flex gap-4">
                    <img
                      src={post.avatar}
                      alt={post.user}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white tracking-tight">
                          {post.user}
                        </span>
                        <span className="text-xs text-muted-foreground/70">
                          on
                        </span>
                        <span className="text-primary text-sm">
                          @{post.artist}
                        </span>
                        <span className="text-xs text-muted-foreground/70 ml-auto">
                          {post.time}
                        </span>
                      </div>
                      <p className="text-white/90 mb-3">{post.comment}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground/70">
                        <button className="flex items-center gap-1 hover:text-accent transition-colors group">
                          <Heart className="w-4 h-4 group-hover:fill-accent" />
                          {post.likes}
                        </button>
                        <button className="hover:text-primary transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="friends" className="space-y-4">
              <h3 className="text-xl text-white mb-4 tracking-tight">
                Friends' Lineups
              </h3>
              {friendsLineups.map((friend, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card rounded-2xl p-6 neon-glow hover:scale-[1.01] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div className="flex-1">
                      <div className="text-white text-lg tracking-tight mb-1">
                        {friend.name}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground/70">
                        <span>{friend.commonArtists} artists in common</span>
                        <span>•</span>
                        <span className="gradient-text">
                          Score: {friend.totalScore}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/30 text-white hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all"
                    >
                      View Lineup
                    </Button>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
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
            description={`Backing ${lineup
              .map((a) => a.name)
              .join(", ")} | Total Score: ${totalScore.toFixed(1)}`}
          />
        </motion.div>
      </div>
    </div>
  );
}
