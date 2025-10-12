import { useState } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  Instagram,
  Twitter,
  Music,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Heart,
  Share,
  ExternalLink,
  PlayCircle,
  BarChart3,
  Globe,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

interface ArtistPageProps {
  onPageChange: (page: string) => void;
}

export function ArtistPage({ onPageChange }: ArtistPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const artistData = {
    name: "Luna Valley",
    genre: "Indie Pop",
    location: "Los Angeles, CA",
    joinedDate: "March 2023",
    bio: "Luna Valley is an indie pop sensation blending dreamy synths with heartfelt lyrics. Starting from bedroom recordings in 2020, she's now garnering millions of streams worldwide and building a passionate fanbase through authentic storytelling and innovative soundscapes.",
    coverImage:
      "https://images.unsplash.com/photo-1683612727901-47fedad8593b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1NjkyODg5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    profileImage:
      "https://images.unsplash.com/photo-1581841064838-a470c740e8ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzaW5nZXIlMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY4NTQzNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    stats: {
      totalStreams: "12.4M",
      monthlyListeners: "2.1M",
      followers: "485K",
      totalRaised: "$350K",
      avgROI: "34.5%",
      successRate: "89%",
    },
    socialStats: {
      spotify: "2.1M",
      appleMusic: "850K",
      instagram: "485K",
      tiktok: "1.2M",
      youtube: "340K",
      twitter: "125K",
    },
  };

  const tracks = [
    {
      id: 1,
      title: "Midnight Dreams",
      releaseDate: "2024-01-15",
      shares: 2500,
      price: 12.5,
      raised: 31250,
      target: 50000,
      backers: 130,
      roi: 28.5,
      streams: "3.2M",
      status: "funding",
      cover:
        "https://images.unsplash.com/photo-1617431014998-f4f219965a1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHBvcCUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2OTI1MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      title: "Electric Pulse",
      releaseDate: "2023-11-20",
      shares: 1800,
      price: 25.0,
      raised: 75000,
      target: 75000,
      backers: 240,
      roi: 45.2,
      streams: "5.8M",
      status: "completed",
      cover:
        "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyJTIwYXJ0fGVufDF8fHx8MTc1NjkyNTEwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      title: "Ocean Waves",
      releaseDate: "2023-08-10",
      shares: 950,
      price: 8.75,
      raised: 25000,
      target: 25000,
      backers: 156,
      roi: 18.3,
      streams: "2.4M",
      status: "completed",
      cover:
        "https://images.unsplash.com/photo-1749383024184-48883730e828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJpZW50JTIwbXVzaWMlMjBuYXR1cmUlMjBhbGJ1bXxlbnwxfHx8fDE3NTY5MjUxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const streamingData = [
    { month: "Jul", streams: 980000 },
    { month: "Aug", streams: 1200000 },
    { month: "Sep", streams: 1450000 },
    { month: "Oct", streams: 1680000 },
    { month: "Nov", streams: 1920000 },
    { month: "Dec", streams: 2100000 },
  ];

  const fanComments = [
    {
      name: "Sarah M.",
      avatar:
        "https://images.unsplash.com/photo-1718217028088-a23cb3b277c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzU2ODY4Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      comment:
        "Luna's music has been the soundtrack to my year. Investing in her tracks was the best decision I made!",
      investment: "$500",
      roi: "+45%",
    },
    {
      name: "Marcus R.",
      avatar:
        "https://images.unsplash.com/photo-1718217028088-a23cb3b277c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzU2ODY4Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      comment:
        "Discovered her through Fholio and now I'm a huge fan. Can't wait for the next release!",
      investment: "$250",
      roi: "+28%",
    },
    {
      name: "Emma L.",
      avatar:
        "https://images.unsplash.com/photo-1718217028088-a23cb3b277c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODY4Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      comment:
        "Luna Valley is going to be the next big thing. Her sound is absolutely unique and mesmerizing.",
      investment: "$750",
      roi: "+32%",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/30 to-black">
      {/* Header Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback
          src={artistData.coverImage}
          alt={artistData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange("browse")}
          className="absolute top-8 left-8 bg-black/50 hover:bg-black/70 text-white border-0 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Artist Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end space-x-6">
              <Avatar className="w-32 h-32 border-4 border-white/20">
                <AvatarImage src={artistData.profileImage} />
                <AvatarFallback>{artistData.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 font-semibold">
                    {artistData.genre}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-black/40 text-white border-white/20"
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {artistData.location}
                  </Badge>
                </div>

                <h1 className="text-5xl font-black text-white mb-2 neon-text">
                  {artistData.name}
                </h1>

                <div className="flex items-center space-x-6 text-white/80">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {artistData.stats.followers} followers
                  </div>
                  <div className="flex items-center">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {artistData.stats.totalStreams} total streams
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {artistData.joinedDate}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  variant={isFollowing ? "default" : "outline"}
                  className={
                    isFollowing
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 rounded-full px-8 py-3 font-semibold"
                      : "border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-3 font-semibold glass backdrop-blur-sm"
                  }
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${
                      isFollowing ? "fill-current" : ""
                    }`}
                  />
                  {isFollowing ? "Following" : "Follow"}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 text-white border-0 rounded-full"
                >
                  <Share className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-12">
          {[
            {
              label: "Monthly Listeners",
              value: artistData.stats.monthlyListeners,
              icon: Users,
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Total Raised",
              value: artistData.stats.totalRaised,
              icon: TrendingUp,
              color: "from-green-500 to-emerald-500",
            },
            {
              label: "Avg ROI",
              value: artistData.stats.avgROI,
              icon: BarChart3,
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "Success Rate",
              value: artistData.stats.successRate,
              icon: Play,
              color: "from-orange-500 to-red-500",
            },
            {
              label: "Total Streams",
              value: artistData.stats.totalStreams,
              icon: PlayCircle,
              color: "from-indigo-500 to-purple-500",
            },
            {
              label: "Followers",
              value: artistData.stats.followers,
              icon: Heart,
              color: "from-pink-500 to-rose-500",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="glass-card border-0 p-6 text-center group hover:neon-glow transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} mx-auto mb-4 flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 rounded-2xl p-2">
            <TabsTrigger value="overview" className="rounded-xl font-semibold">
              Overview
            </TabsTrigger>
            <TabsTrigger value="tracks" className="rounded-xl font-semibold">
              Tracks
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl font-semibold">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="community" className="rounded-xl font-semibold">
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Bio Section */}
              <div className="lg:col-span-2">
                <Card className="glass-card border-0 p-8">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-bold text-white">
                      About Luna Valley
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <p className="text-white/80 leading-relaxed mb-6">
                      {artistData.bio}
                    </p>

                    {/* Video Introduction */}
                    <div className="relative aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl overflow-hidden mb-6">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="icon"
                          className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-black/60 text-white border-0">
                          Meet the Artist • 2:34
                        </Badge>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-4">
                      {[
                        {
                          platform: "Spotify",
                          followers: artistData.socialStats.spotify,
                          icon: Music,
                          color: "from-green-500 to-green-600",
                        },
                        {
                          platform: "Instagram",
                          followers: artistData.socialStats.instagram,
                          icon: Instagram,
                          color: "from-pink-500 to-purple-600",
                        },
                        {
                          platform: "TikTok",
                          followers: artistData.socialStats.tiktok,
                          icon: PlayCircle,
                          color: "from-black to-gray-800",
                        },
                        {
                          platform: "YouTube",
                          followers: artistData.socialStats.youtube,
                          icon: PlayCircle,
                          color: "from-red-500 to-red-600",
                        },
                      ].map((social, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="glass border-white/20 text-white hover:bg-white/10 rounded-full"
                        >
                          <social.icon className="w-4 h-4 mr-2" />
                          {social.platform} • {social.followers}
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Streaming Stats */}
              <div>
                <Card className="glass-card border-0 p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl font-bold text-white">
                      Monthly Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={streamingData}>
                          <defs>
                            <linearGradient
                              id="streamGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#8B5CF6"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#EC4899"
                                stopOpacity={0.2}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#ffffff80", fontSize: 12 }}
                          />
                          <YAxis hide />
                          <Tooltip
                            formatter={(value) => [
                              `${(value / 1000000).toFixed(1)}M`,
                              "Streams",
                            ]}
                            labelStyle={{ color: "#000" }}
                            contentStyle={{
                              backgroundColor: "rgba(0,0,0,0.8)",
                              border: "none",
                              borderRadius: "12px",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="streams"
                            stroke="#8B5CF6"
                            strokeWidth={3}
                            fill="url(#streamGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracks" className="space-y-6">
            <div className="grid gap-6">
              {tracks.map((track) => (
                <Card
                  key={track.id}
                  className="glass-card border-0 overflow-hidden hover:neon-glow transition-all duration-300"
                >
                  <div className="flex items-center p-6">
                    <div className="relative">
                      <ImageWithFallback
                        src={track.cover}
                        alt={track.title}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <Button
                        size="icon"
                        className="absolute inset-0 bg-black/60 hover:bg-black/80 text-white border-0 rounded-xl"
                      >
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>

                    <div className="flex-1 ml-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {track.title}
                        </h3>
                        <div className="flex items-center space-x-4">
                          <Badge
                            className={`${
                              track.status === "funding"
                                ? "bg-blue-500"
                                : "bg-green-500"
                            } text-white border-0`}
                          >
                            {track.status === "funding"
                              ? "Funding"
                              : "Completed"}
                          </Badge>
                          <span className="text-white/60">
                            {track.streams} streams
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">Share Price</span>
                          <div className="text-white font-bold">
                            ${track.price}
                          </div>
                        </div>
                        <div>
                          <span className="text-white/60">Raised</span>
                          <div className="text-green-400 font-bold">
                            ${track.raised.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-white/60">Backers</span>
                          <div className="text-white font-bold">
                            {track.backers}
                          </div>
                        </div>
                        <div>
                          <span className="text-white/60">ROI</span>
                          <div className="text-purple-400 font-bold">
                            +{track.roi}%
                          </div>
                        </div>
                        <div>
                          <Button
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 rounded-full font-semibold"
                            onClick={() => onPageChange("track-detail")}
                          >
                            {track.status === "funding" ? "Invest" : "View"}
                          </Button>
                        </div>
                      </div>

                      {track.status === "funding" && (
                        <div className="mt-4">
                          <Progress
                            value={(track.raised / track.target) * 100}
                            className="h-2"
                          />
                          <div className="flex justify-between text-xs text-white/60 mt-1">
                            <span>
                              {Math.round((track.raised / track.target) * 100)}%
                              funded
                            </span>
                            <span>Goal: ${track.target.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Platform Performance */}
              <Card className="glass-card border-0 p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl font-bold text-white">
                    Platform Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="space-y-4">
                    {[
                      {
                        platform: "Spotify",
                        streams: "6.2M",
                        percentage: 50,
                        color: "bg-green-500",
                      },
                      {
                        platform: "Apple Music",
                        streams: "2.8M",
                        percentage: 23,
                        color: "bg-gray-500",
                      },
                      {
                        platform: "YouTube Music",
                        streams: "2.1M",
                        percentage: 17,
                        color: "bg-red-500",
                      },
                      {
                        platform: "SoundCloud",
                        streams: "1.3M",
                        percentage: 10,
                        color: "bg-orange-500",
                      },
                    ].map((platform, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white font-medium">
                            {platform.platform}
                          </span>
                          <span className="text-white/60">
                            {platform.streams}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${platform.color}`}
                            style={{ width: `${platform.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Investment Performance */}
              <Card className="glass-card border-0 p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl font-bold text-white">
                    Investment Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-black text-white mb-2">
                        {artistData.stats.avgROI}
                      </div>
                      <div className="text-white/60">Average ROI</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-400">
                          {artistData.stats.successRate}
                        </div>
                        <div className="text-white/60 text-sm">
                          Success Rate
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">
                          {artistData.stats.totalRaised}
                        </div>
                        <div className="text-white/60 text-sm">
                          Total Raised
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid gap-6">
              <Card className="glass-card border-0 p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold text-white">
                    Fan Community
                  </CardTitle>
                  <p className="text-white/60">
                    What Luna Valley's investors are saying
                  </p>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="grid md:grid-cols-3 gap-6">
                    {fanComments.map((comment, index) => (
                      <Card key={index} className="glass-card border-0 p-6">
                        <div className="flex items-center mb-4">
                          <Avatar className="w-12 h-12 border-2 border-purple-500/50">
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback>
                              {comment.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <div className="font-semibold text-white">
                              {comment.name}
                            </div>
                            <div className="text-xs text-purple-300">
                              Investor
                            </div>
                          </div>
                        </div>

                        <p className="text-white/80 text-sm mb-4 italic">
                          "{comment.comment}"
                        </p>

                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                          <div className="text-xs text-white/60">
                            Invested: {comment.investment}
                          </div>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                            {comment.roi} ROI
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
