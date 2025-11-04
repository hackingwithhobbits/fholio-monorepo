import { motion } from "framer-motion";
import {
  MessageCircle,
  Users,
  Heart,
  Share2,
  TrendingUp,
  Sparkles,
  MessageSquare,
  Hash,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import { ShareButtons } from "./ShareButtons";
import {
  useTrendingArtists,
  useSocialStats,
  useGlobalLeaderboard,
} from "../lib/hooks";

interface CommunityPageProps {
  onNavigate: (page: string, artistId?: string) => void;
}

export function CommunityPage({ onNavigate }: CommunityPageProps) {
  const { artists, isLoading: artistsLoading } = useTrendingArtists(5);
  const { stats, isLoading: statsLoading } = useSocialStats();
  const { topFans, isLoading: fansLoading } = useGlobalLeaderboard(5);

  // Mock community posts
  const posts = [
    {
      id: "1",
      user: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      tier: "Platinum",
      content:
        "Just locked in my lineup for this week! All in on @Aiko Blaze and @Nova Red. Who else is riding with them? 🔥",
      timestamp: "2h ago",
      likes: 127,
      comments: 23,
      hashtags: ["MyFholio", "FholioFriday"],
    },
    {
      id: "2",
      user: "Jordan Taylor",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      tier: "Gold",
      content:
        "Violet Storm is on a hot streak! +6.7% this week. If you're not backing her in Minor League you're missing out 💜⚡",
      timestamp: "4h ago",
      likes: 89,
      comments: 15,
      hashtags: ["FansFuelMusic", "MinorLeague"],
    },
    {
      id: "3",
      user: "Sam Rivera",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      tier: "Silver",
      content:
        "Shoutout to @The Radiants for an amazing live show last night! Score might be down this week but the energy was unreal. Long-term hold for sure 🎸",
      timestamp: "6h ago",
      likes: 156,
      comments: 31,
      hashtags: ["LiveMusic", "FholioFam"],
    },
  ];
  if (!stats) return null;
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
            FANS FUEL MUSIC
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 gradient-text tracking-tighter">
            Fholio Connect
          </h1>
          <p className="text-xl text-muted-foreground/80 tracking-tight max-w-2xl mx-auto">
            Join the conversation. Share your lineups. Connect with superfans.
          </p>
        </motion.div>

        {/* Social Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="glass-card rounded-2xl p-6 text-center neon-glow">
            <div className="text-3xl gradient-text tracking-tight mb-1">
              {stats.total_members.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground/70 tracking-tight">
              Total Members
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center neon-glow">
            <div className="text-3xl text-accent tracking-tight mb-1">
              {stats.artists_joined_this_week}
            </div>
            <div className="text-sm text-muted-foreground/70 tracking-tight">
              Artists This Week
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center neon-glow">
            <div className="text-3xl text-primary tracking-tight mb-1">
              {stats.fan_lineups_created.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground/70 tracking-tight">
              Lineups Created
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center neon-glow">
            <div className="text-3xl text-secondary tracking-tight mb-1">
              ${(stats.money_distributed / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground/70 tracking-tight">
              Distributed
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 neon-glow"
            >
              <div className="flex gap-4">
                <Avatar className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary" />
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your lineup, predictions, or shoutouts..."
                    className="bg-input-background border-primary/20 text-white mb-3 min-h-[100px]"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-xs cursor-pointer hover:bg-primary/10"
                      >
                        #MyFholio
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-xs cursor-pointer hover:bg-primary/10"
                      >
                        #FholioFriday
                      </Badge>
                    </div>
                    <Button className="gradient-bg neon-glow holo-button rounded-xl">
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Posts Feed */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="glass-card mb-6">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="glass-card rounded-2xl p-6 neon-glow hover:scale-[1.01] transition-all"
                  >
                    <div className="flex gap-4">
                      <img
                        src={post.avatar}
                        alt={post.user}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white tracking-tight">
                            {post.user}
                          </span>
                          <Badge
                            className={`${
                              post.tier === "Platinum"
                                ? "bg-accent/20 text-accent border-accent/30"
                                : post.tier === "Gold"
                                  ? "bg-primary/20 text-primary border-primary/30"
                                  : "bg-white/10 text-white/70 border-white/20"
                            } text-xs`}
                          >
                            {post.tier}
                          </Badge>
                          <span className="text-xs text-muted-foreground/70">
                            {post.timestamp}
                          </span>
                        </div>
                        <p className="text-white/90 mb-3 leading-relaxed">
                          {post.content}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.hashtags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-primary hover:text-primary/80 cursor-pointer"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground/70">
                          <button className="flex items-center gap-2 hover:text-accent transition-colors group">
                            <Heart className="w-4 h-4 group-hover:fill-accent" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-2 hover:text-primary transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            {post.comments}
                          </button>
                          <button className="flex items-center gap-2 hover:text-secondary transition-colors">
                            <Share2 className="w-4 h-4" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>

            {/* Fholio Squads Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-2xl p-8 text-center neon-glow bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20"
            >
              <div className="w-16 h-16 rounded-2xl gradient-bg mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-white mb-2 tracking-tight">
                Fholio Squads
              </h3>
              <p className="text-muted-foreground/80 mb-4 max-w-md mx-auto">
                Form mini-leagues with friends. Compete for exclusive rewards.
                Coming soon.
              </p>
              <Badge className="bg-accent/20 text-accent border-accent/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Coming Soon
              </Badge>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6 neon-glow"
            >
              <div className="flex items-center gap-2 mb-4">
                <Hash className="w-5 h-5 text-accent" />
                <h3 className="text-lg text-white tracking-tight">
                  Trending Topics
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  "#MyFholio",
                  "#FholioFriday",
                  "#FansFuelMusic",
                  "#MajorLeague",
                  "#MinorLeague",
                ].map((tag, i) => (
                  <div
                    key={tag}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-primary hover:text-primary/80 transition-colors">
                      {tag}
                    </span>
                    <span className="text-xs text-muted-foreground/70">
                      {(523 - i * 50).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Artists This Week */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-2xl p-6 neon-glow"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="text-lg text-white tracking-tight">
                  Top Artists
                </h3>
              </div>
              <div className="space-y-3">
                {artists.slice(0, 5).map((artist, i) => (
                  <div
                    key={artist.id}
                    onClick={() => onNavigate("artist", artist.id)}
                    className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all group"
                  >
                    <ImageWithFallback
                      src={artist.image_url}
                      alt={artist.name}
                      className="w-10 h-10 rounded-lg object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">
                        {artist.name}
                      </div>
                      <div className="text-xs text-muted-foreground/70">
                        {artist.genre}
                      </div>
                    </div>
                    <div className="text-xs gradient-text">
                      {artist.score.toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Share Your Fholio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-2xl p-6 neon-glow bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <Share2 className="w-5 h-5 text-accent" />
                <h3 className="text-lg text-white tracking-tight">
                  Share Your Fholio
                </h3>
              </div>
              <p className="text-sm text-muted-foreground/80 mb-4">
                Auto-generate lineup graphics for social media
              </p>
              <ShareButtons
                title="Check out my Fholio lineup this week!"
                description="Join me in the Fantasy League for Music"
              />
            </motion.div>

            {/* Top Fans */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-2xl p-6 neon-glow"
            >
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg text-white tracking-tight">Top Fans</h3>
              </div>
              <div className="space-y-3">
                {topFans.slice(0, 5).map((fan) => (
                  <div key={fan.id} className="flex items-center gap-3">
                    <img
                      src={fan.avatar}
                      alt={fan.name}
                      className="w-10 h-10 rounded-full object-cover border border-primary/30"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">
                        {fan.name}
                      </div>
                      <div className="text-xs text-muted-foreground/70">
                        {fan.city}
                      </div>
                    </div>
                    <div className="text-xs gradient-text">#{fan.rank}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
