import { useState } from "react";
import { motion } from "framer-motion";
import {
  Music,
  Trophy,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Share2,
  Edit,
  LogOut,
  Play,
  Heart,
  Eye,
  Calendar,
  Award,
  Settings,
  Upload,
  ChevronRight,
  BarChart,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

interface ArtistProfilePageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function ArtistProfilePage({
  onNavigate,
  onLogout,
}: ArtistProfilePageProps) {
  // Mock artist data - realistic stats
  const artistData = {
    name: "Neon Dreams",
    handle: "@neondreams",
    genre: "Electronic",
    location: "Los Angeles, CA",
    avatar:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=300&fit=crop",
    bio: "Creating euphoric electronic soundscapes that transport you to another dimension. 🎧✨",
    joined: "January 2025",
    weeklyRank: 3,
    totalVotes: 47820,
    totalFollowers: 2845,
    totalEarnings: 3240.5,
    tracksSubmitted: 12,
    top10Finishes: 5,
    verifiedArtist: true,
  };

  const tracks = [
    {
      id: 1,
      title: "Neon Nights",
      week: 44,
      rank: 3,
      votes: 2847,
      earnings: 425.0,
      status: "active",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Midnight Drive",
      week: 43,
      rank: 7,
      votes: 2654,
      earnings: 312.5,
      status: "completed",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Electric Soul",
      week: 42,
      rank: 12,
      votes: 1987,
      earnings: 185.75,
      status: "completed",
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Cyber Love",
      week: 41,
      rank: 28,
      votes: 1421,
      earnings: 0,
      status: "completed",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    },
  ];

  const earningsHistory = [
    { week: 44, amount: 425.0, rank: 3 },
    { week: 43, amount: 312.5, rank: 7 },
    { week: 42, amount: 185.75, rank: 12 },
    { week: 41, amount: 0, rank: 28 },
    { week: 40, amount: 298.25, rank: 9 },
  ];

  const topFans = [
    { name: "@JayVibes", picks: 8, avatar: "🎵" },
    { name: "@MusicLover", picks: 7, avatar: "🎧" },
    { name: "@BeatHunter", picks: 6, avatar: "🎸" },
    { name: "@SoundSeeker", picks: 5, avatar: "🎹" },
    { name: "@VibeCheck", picks: 4, avatar: "🎤" },
  ];

  const handleShare = () => {
    toast.success("Artist profile shared!");
  };

  return (
    <div className="min-h-screen bg-black lg:pt-16">
      {/* Banner */}
      <div className="relative h-40 sm:h-48 lg:h-64 overflow-hidden">
        <ImageWithFallback
          src={artistData.banner}
          alt="Artist banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-20 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8 neon-glow"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-primary/30">
                  <AvatarImage src={artistData.avatar} alt={artistData.name} />
                  <AvatarFallback className="text-3xl">
                    {artistData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {artistData.verifiedArtist && (
                  <div className="absolute -bottom-2 -right-2 bg-accent rounded-full p-1">
                    <Award className="w-5 h-5 text-black" />
                  </div>
                )}
              </div>

              {/* Artist Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <h1 className="text-3xl text-white">{artistData.name}</h1>
                  {artistData.verifiedArtist && (
                    <Badge className="bg-accent text-black">Verified</Badge>
                  )}
                </div>
                <p className="text-lg text-accent mb-1">{artistData.handle}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                  <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white">
                    {artistData.genre}
                  </Badge>
                  <Badge className="bg-white/10 text-white">
                    {artistData.location}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                  {artistData.bio}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                  <div className="flex items-center gap-2 glass-card px-3 py-1 rounded-lg">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-white">
                      Rank #{artistData.weeklyRank}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 glass-card px-3 py-1 rounded-lg">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-white">
                      {artistData.totalVotes.toLocaleString()} votes
                    </span>
                  </div>
                  <div className="flex items-center gap-2 glass-card px-3 py-1 rounded-lg">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-sm text-white">
                      {artistData.totalFollowers.toLocaleString()} fans
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button
                    size="sm"
                    onClick={() => onNavigate("artist-dashboard")}
                    className="gradient-bg"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Submit New Track
                  </Button>
                  <Button size="sm" className="bg-white/10 hover:bg-white/20">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleShare}
                    className="border-primary/40 text-white hover:bg-primary/20"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Page
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-xl text-center">
                  <div className="text-2xl text-green-500 mb-1">
                    ${artistData.totalEarnings.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Earned
                  </div>
                </div>
                <div className="glass-card p-4 rounded-xl text-center">
                  <div className="text-2xl gradient-text mb-1">
                    {artistData.top10Finishes}
                  </div>
                  <div className="text-xs text-muted-foreground">Top 10s</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tracks" className="space-y-6 pb-12">
          <TabsList className="glass-card grid w-full grid-cols-4 p-1">
            <TabsTrigger value="tracks">Tracks</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="fans">Fans</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Tracks Tab */}
          <TabsContent value="tracks" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-white flex items-center gap-2">
                  <Music className="w-5 h-5 text-accent" />
                  Your Tracks ({tracks.length})
                </h3>
                <Button
                  size="sm"
                  onClick={() => onNavigate("artist-dashboard")}
                  className="gradient-bg"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Submit New
                </Button>
              </div>

              <div className="space-y-4">
                {tracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Track Image */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={track.image}
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Track Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white truncate">{track.title}</h4>
                          <Badge
                            className={`text-xs ${
                              track.status === "active"
                                ? "bg-accent text-black"
                                : "bg-white/10 text-white"
                            }`}
                          >
                            {track.status === "active" ? "Live" : "Completed"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Week {track.week}</span>
                          <span>•</span>
                          <span
                            className={track.rank <= 10 ? "text-accent" : ""}
                          >
                            Rank #{track.rank}
                          </span>
                          <span>•</span>
                          <span>{track.votes.toLocaleString()} votes</span>
                        </div>
                      </div>

                      {/* Earnings */}
                      <div className="text-right">
                        <div
                          className={`text-lg ${track.earnings > 0 ? "text-green-500" : "text-white/50"}`}
                        >
                          ${track.earnings.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Earned
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-6 mb-6"
            >
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    Total Earnings
                  </span>
                </div>
                <div className="text-3xl text-green-500">
                  ${artistData.totalEarnings.toLocaleString()}
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">
                    Avg Per Week
                  </span>
                </div>
                <div className="text-3xl text-white">$270</div>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">
                    Best Week
                  </span>
                </div>
                <div className="text-3xl gradient-text">$425</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                <BarChart className="w-5 h-5 text-accent" />
                Weekly Earnings History
              </h3>
              <div className="space-y-4">
                {earningsHistory.map((week, index) => (
                  <div key={index} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">
                            Week
                          </div>
                          <div className="text-lg text-white">{week.week}</div>
                        </div>
                        <Separator orientation="vertical" className="h-12" />
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">
                            Rank
                          </div>
                          <div
                            className={`text-lg ${week.rank <= 10 ? "text-accent" : "text-white"}`}
                          >
                            #{week.rank}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">
                          Payout
                        </div>
                        <div
                          className={`text-xl ${week.amount > 0 ? "text-green-500" : "text-white/50"}`}
                        >
                          ${week.amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={
                        week.rank <= 10 ? ((11 - week.rank) / 10) * 100 : 0
                      }
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Fans Tab */}
          <TabsContent value="fans" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Top Fans ({topFans.length})
              </h3>
              <div className="space-y-3">
                {topFans.map((fan, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl">
                        {fan.avatar}
                      </div>
                      <div>
                        <p className="text-white">{fan.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Picked you {fan.picks} times
                        </p>
                      </div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-xl text-white mb-4">Fan Growth</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-card p-4 rounded-xl text-center">
                  <div className="text-2xl gradient-text mb-1">+184</div>
                  <div className="text-xs text-muted-foreground">This Week</div>
                </div>
                <div className="glass-card p-4 rounded-xl text-center">
                  <div className="text-2xl text-accent mb-1">+612</div>
                  <div className="text-xs text-muted-foreground">
                    This Month
                  </div>
                </div>
                <div className="glass-card p-4 rounded-xl text-center">
                  <div className="text-2xl text-white mb-1">
                    {artistData.totalFollowers.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Fans
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-accent" />
                Artist Settings
              </h3>

              <div className="space-y-6">
                {/* Payment Method */}
                <div>
                  <h4 className="text-white mb-3">Payout Method</h4>
                  <div className="glass-card p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm">Bank Transfer</p>
                        <p className="text-xs text-muted-foreground">
                          ••••1234
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/40 text-white hover:bg-primary/20"
                    >
                      Change
                    </Button>
                  </div>
                </div>

                {/* Artist Verification */}
                <div>
                  <h4 className="text-white mb-3">Verification Status</h4>
                  <div className="glass-card p-4 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-accent" />
                      <div className="flex-1">
                        <p className="text-white text-sm">Verified Artist</p>
                        <p className="text-xs text-muted-foreground">
                          Your account is verified
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div>
                  <h4 className="text-red-500 mb-3">Account Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-red-500/40 text-red-500 hover:bg-red-500/20"
                    >
                      Deactivate Artist Profile
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onLogout}
                      className="w-full border-white/40 text-white hover:bg-white/10"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
