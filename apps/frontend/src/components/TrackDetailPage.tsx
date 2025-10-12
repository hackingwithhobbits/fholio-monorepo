import { useState } from "react";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Clock,
  Share,
  Heart,
  Info,
  Instagram,
  Twitter,
  PlayCircle,
  Award,
  Calendar,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { MusicPlayer } from "./MusicPlayer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

interface TrackDetailPageProps {
  onPageChange: (page: string) => void;
}

export function TrackDetailPage({ onPageChange }: TrackDetailPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(10);
  const [isLiked, setIsLiked] = useState(false);

  const trackData = {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Valley",
    genre: "Indie Pop",
    duration: 243, // seconds
    sharePrice: 12.5,
    totalShares: 4000,
    availableShares: 1500,
    currentRaise: 31250,
    targetRaise: 50000,
    backers: 130,
    daysLeft: 45,
    releaseDate: "March 2024",
    cover:
      "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "A nostalgic journey through neon-lit cities and digital landscapes. Drawing inspiration from dreamy indie pop and modern electronic production, Midnight Dreams captures the essence of late-night contemplation with lush soundscapes and ethereal vocals.",
    highlights: [
      "Featured on Spotify's Indie Radar playlist",
      "100K+ streams in first month",
      "Produced by Grammy-nominated engineer",
      "Part of upcoming debut album 'Electric Nights'",
    ],
    artistStats: {
      monthlyListeners: {
        spotify: { count: "2.1M", trend: 15.2, streams: "12.3M" },
        appleMusic: { count: "850K", trend: 8.7, streams: "4.2M" },
        tidal: { count: "120K", trend: 22.1, streams: "680K" },
        deezer: { count: "340K", trend: -2.3, streams: "1.8M" },
        amazon: { count: "780K", trend: 11.4, streams: "3.9M" },
      },
      socialFollowers: {
        instagram: {
          count: "485K",
          trend: 18.5,
          posts: "127",
          engagement: "4.2%",
        },
        tiktok: { count: "1.2M", trend: 45.8, videos: "23", views: "8.3M" },
        youtube: { count: "340K", trend: 12.3, videos: "45", views: "2.1M" },
        twitter: {
          count: "125K",
          trend: 6.7,
          tweets: "89",
          interactions: "15.2K",
        },
      },
      location: "Los Angeles, CA",
      careerHighlights: [
        "Spotify Editorial Playlist: Indie Radar (2.1M followers)",
        "Featured on Apple Music's New Artist Spotlight",
        "TikTok viral hit with 5.2M views",
        "Opening for major artists on 15-city tour",
      ],
      growthPotential: [
        "Album release scheduled for Q2 2024",
        "Major label interest from 3 top-tier labels",
        "Sync licensing deals in progress for TV/film",
        "European tour dates being finalized",
      ],
    },
  };

  const priceHistory = [
    { date: "Jan", price: 10.0 },
    { date: "Feb", price: 11.25 },
    { date: "Mar", price: 12.5 },
    { date: "Apr", price: 12.5 },
  ];

  const fundingProgress = [
    { week: "Week 1", amount: 5000, backers: 25 },
    { week: "Week 2", amount: 12500, backers: 58 },
    { week: "Week 3", amount: 22000, backers: 89 },
    { week: "Week 4", amount: 31250, backers: 130 },
  ];

  const similarTracks = [
    {
      title: "Electric Pulse",
      artist: "Neon Riders",
      price: 25.0,
      change: 8.5,
      cover:
        "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Ocean Waves",
      artist: "Coastal Sound",
      price: 8.75,
      change: 15.2,
      cover:
        "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const totalInvestment = investmentAmount * trackData.sharePrice;
  const fundingPercentage =
    (trackData.currentRaise / trackData.targetRaise) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/30 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange("browse")}
            className="mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{trackData.genre}</Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
              <Card className="glass-card relative overflow-hidden border-0">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={trackData.cover}
                    alt={trackData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-3 py-1 font-semibold">
                        {trackData.genre}
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-semibold">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    </div>
                    <h1 className="text-5xl font-black text-white mb-3 neon-text">
                      {trackData.title}
                    </h1>
                    <div className="flex items-center space-x-4">
                      <p
                        className="text-2xl text-purple-300 font-semibold cursor-pointer hover:text-purple-200 transition-colors"
                        onClick={() => onPageChange("artist-page")}
                      >
                        {trackData.artist}
                      </p>
                      <div className="flex items-center text-white/60">
                        <MapPin className="w-4 h-4 mr-1" />
                        {trackData.artistStats.location}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Music Player */}
            <MusicPlayer
              track={trackData}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              size="full"
            />

            {/* Track Information */}
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="similar">Similar Tracks</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Track Info */}
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle className="text-white">
                        About This Track
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80 mb-6 leading-relaxed">
                        {trackData.description}
                      </p>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-white">
                          Track Highlights
                        </h4>
                        <ul className="space-y-3">
                          {trackData.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="flex items-center text-white/80"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-3 flex-shrink-0"></div>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Artist Stats Module */}
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Artist Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Streaming Stats */}
                      <div>
                        <h5 className="font-semibold text-white mb-3">
                          Monthly Listeners
                        </h5>
                        <div className="space-y-3">
                          {[
                            {
                              platform: "Spotify",
                              data: trackData.artistStats.monthlyListeners
                                .spotify,
                              color: "text-green-400",
                            },
                            {
                              platform: "Apple Music",
                              data: trackData.artistStats.monthlyListeners
                                .appleMusic,
                              color: "text-gray-400",
                            },
                            {
                              platform: "Amazon Music",
                              data: trackData.artistStats.monthlyListeners
                                .amazon,
                              color: "text-blue-400",
                            },
                            {
                              platform: "Tidal",
                              data: trackData.artistStats.monthlyListeners
                                .tidal,
                              color: "text-cyan-400",
                            },
                            {
                              platform: "Deezer",
                              data: trackData.artistStats.monthlyListeners
                                .deezer,
                              color: "text-purple-400",
                            },
                          ].map((stat, index) => (
                            <div
                              key={index}
                              className="p-3 bg-white/5 rounded-lg"
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-white/80 text-sm font-medium">
                                  {stat.platform}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className={`font-bold ${stat.color}`}>
                                    {stat.data.count}
                                  </span>
                                  <div
                                    className={`flex items-center text-xs ${
                                      stat.data.trend >= 0
                                        ? "text-green-400"
                                        : "text-red-400"
                                    }`}
                                  >
                                    {stat.data.trend >= 0 ? (
                                      <TrendingUp className="w-3 h-3" />
                                    ) : (
                                      <TrendingDown className="w-3 h-3" />
                                    )}
                                    {Math.abs(stat.data.trend)}%
                                  </div>
                                </div>
                              </div>
                              <div className="text-xs text-white/60">
                                {stat.data.streams} total streams
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Social Stats */}
                      <div>
                        <h5 className="font-semibold text-white mb-3">
                          Social Following
                        </h5>
                        <div className="space-y-3">
                          {[
                            {
                              platform: "Instagram",
                              data: trackData.artistStats.socialFollowers
                                .instagram,
                              icon: Instagram,
                              color: "text-pink-400",
                            },
                            {
                              platform: "TikTok",
                              data: trackData.artistStats.socialFollowers
                                .tiktok,
                              icon: PlayCircle,
                              color: "text-white",
                            },
                            {
                              platform: "YouTube",
                              data: trackData.artistStats.socialFollowers
                                .youtube,
                              icon: PlayCircle,
                              color: "text-red-400",
                            },
                            {
                              platform: "Twitter/X",
                              data: trackData.artistStats.socialFollowers
                                .twitter,
                              icon: Twitter,
                              color: "text-blue-400",
                            },
                          ].map((stat, index) => (
                            <div
                              key={index}
                              className="p-3 bg-white/5 rounded-lg"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center">
                                  <stat.icon
                                    className={`w-4 h-4 mr-2 ${stat.color}`}
                                  />
                                  <span className="text-white/80 text-sm font-medium">
                                    {stat.platform}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-white">
                                    {stat.data.count}
                                  </span>
                                  <div
                                    className={`flex items-center text-xs ${
                                      stat.data.trend >= 0
                                        ? "text-green-400"
                                        : "text-red-400"
                                    }`}
                                  >
                                    {stat.data.trend >= 0 ? (
                                      <TrendingUp className="w-3 h-3" />
                                    ) : (
                                      <TrendingDown className="w-3 h-3" />
                                    )}
                                    {Math.abs(stat.data.trend)}%
                                  </div>
                                </div>
                              </div>
                              <div className="text-xs text-white/60 flex justify-between">
                                <span>
                                  {stat.platform === "Instagram"
                                    ? `${stat.data.posts} posts`
                                    : stat.platform === "TikTok"
                                    ? `${stat.data.videos} videos`
                                    : stat.platform === "YouTube"
                                    ? `${stat.data.videos} videos`
                                    : `${stat.data.tweets} tweets`}
                                </span>
                                <span>
                                  {stat.platform === "Instagram"
                                    ? `${stat.data.engagement} avg engagement`
                                    : stat.platform === "TikTok"
                                    ? `${stat.data.views} total views`
                                    : stat.platform === "YouTube"
                                    ? `${stat.data.views} total views`
                                    : `${stat.data.interactions} interactions`}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full glass border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                        onClick={() => onPageChange("artist-page")}
                      >
                        View Artist Profile
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Why Invest Panel */}
                <Card className="glass-card border-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-2xl">
                      <Award className="w-6 h-6 mr-3 text-yellow-400" />
                      Why Invest in This Track?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-semibold text-white mb-4 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                          Career Momentum
                        </h5>
                        <ul className="space-y-3">
                          {trackData.artistStats.careerHighlights.map(
                            (highlight, index) => (
                              <li
                                key={index}
                                className="flex items-start text-white/80"
                              >
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                <span className="text-sm">{highlight}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-white mb-4 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-purple-400" />
                          Growth Potential
                        </h5>
                        <ul className="space-y-3">
                          {trackData.artistStats.growthPotential.map(
                            (potential, index) => (
                              <li
                                key={index}
                                className="flex items-start text-white/80"
                              >
                                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                <span className="text-sm">{potential}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Investment Details */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Investment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                        <span className="text-white/60 text-sm">
                          Release Date
                        </span>
                        <div className="font-bold text-white">
                          {trackData.releaseDate}
                        </div>
                      </div>
                      <div className="text-center">
                        <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                        <span className="text-white/60 text-sm">
                          Total Shares
                        </span>
                        <div className="font-bold text-white">
                          {trackData.totalShares.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <Target className="w-8 h-8 mx-auto mb-2 text-green-400" />
                        <span className="text-white/60 text-sm">Available</span>
                        <div className="font-bold text-white">
                          {trackData.availableShares.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                        <span className="text-white/60 text-sm">Campaign</span>
                        <div className="font-bold text-white">60 days</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Share Price History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={priceHistory}>
                            <defs>
                              <linearGradient
                                id="priceGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#8B5CF6"
                                  stopOpacity={0.3}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#EC4899"
                                  stopOpacity={0.1}
                                />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                              formatter={(value) => [`$${value}`, "Price"]}
                            />
                            <Area
                              type="monotone"
                              dataKey="price"
                              stroke="#8B5CF6"
                              strokeWidth={3}
                              fill="url(#priceGradient)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Funding Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={fundingProgress}>
                            <XAxis dataKey="week" />
                            <YAxis />
                            <Tooltip
                              formatter={(value, name) => [
                                name === "amount"
                                  ? `$${value.toLocaleString()}`
                                  : value,
                                name === "amount" ? "Funding" : "Backers",
                              ]}
                            />
                            <Bar dataKey="amount" fill="#8B5CF6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="similar" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {similarTracks.map((track, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <ImageWithFallback
                            src={track.cover}
                            alt={track.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{track.title}</h3>
                            <p className="text-muted-foreground text-sm">
                              {track.artist}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold">${track.price}</span>
                              <div className="flex items-center text-green-500 text-sm">
                                <TrendingUp className="w-3 h-3 mr-1" />+
                                {track.change}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Investment Sidebar */}
          <div className="space-y-6">
            {/* Investment Panel */}
            <Card className="glass-card sticky top-24 border-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-white">
                  Invest in Track
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price & Stats */}
                <div className="text-center space-y-6">
                  <div>
                    <div className="text-4xl font-black text-white neon-text">
                      ${trackData.sharePrice}
                    </div>
                    <div className="text-white/60">per share</div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-purple-400">
                        {trackData.backers}
                      </div>
                      <div className="text-xs text-white/60">Backers</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-orange-400">
                        {trackData.daysLeft}
                      </div>
                      <div className="text-xs text-white/60">Days Left</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-green-400">
                        {Math.round(fundingPercentage)}%
                      </div>
                      <div className="text-xs text-white/60">Funded</div>
                    </div>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="space-y-3">
                  <Progress value={fundingPercentage} className="h-3" />
                  <div className="flex justify-between text-sm text-white/60">
                    <span>${trackData.currentRaise.toLocaleString()}</span>
                    <span>${trackData.targetRaise.toLocaleString()}</span>
                  </div>
                </div>

                {/* Investment Input */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shares">Number of Shares</Label>
                    <Input
                      id="shares"
                      type="number"
                      value={investmentAmount}
                      onChange={(e) =>
                        setInvestmentAmount(parseInt(e.target.value) || 0)
                      }
                      min={1}
                      max={trackData.availableShares}
                    />
                  </div>

                  <div className="bg-black/20 rounded-xl p-4 space-y-3 border border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Shares</span>
                      <span className="text-white font-semibold">
                        {investmentAmount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Price per share</span>
                      <span className="text-white font-semibold">
                        ${trackData.sharePrice}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Platform fee (3%)</span>
                      <span className="text-white font-semibold">
                        ${(totalInvestment * 0.03).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-white">Total</span>
                        <span className="text-white">
                          ${(totalInvestment * 1.03).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full text-lg py-6 fintech-gradient text-white border-0 hover:opacity-90 rounded-xl font-bold neon-glow transform hover:scale-105 transition-all duration-300"
                    onClick={() => onPageChange("payment")}
                  >
                    Invest in Track
                  </Button>
                </div>

                {/* Investment Info */}
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    You'll own {investmentAmount} shares (
                    {((investmentAmount / trackData.totalShares) * 100).toFixed(
                      2
                    )}
                    %) of this track's future revenue.
                  </AlertDescription>
                </Alert>

                {/* Key Metrics */}
                <div className="pt-4 border-t space-y-3">
                  <h4 className="font-medium">What you get:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Revenue sharing from streams & sales
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Voting rights on remixes & features
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Exclusive behind-the-scenes content
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Early access to future releases
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
