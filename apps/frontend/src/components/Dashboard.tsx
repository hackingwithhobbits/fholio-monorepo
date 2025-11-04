import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Trophy,
  Wallet,
  Clock,
  Star,
  ArrowRight,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import {
  artists,
  userPortfolio,
  fanPoolData,
  payoutHistory,
} from "../data/mockData";
import { ArtistCard } from "./ArtistCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DashboardProps {
  onNavigate: (page: string, artistId?: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [selectedArtists, setSelectedArtists] = useState(userPortfolio.artists);
  const [showDraftModal, setShowDraftModal] = useState(false);

  const pieData = [
    { name: "Artist Pool", value: 60, color: "#8b1fff" },
    { name: "Fan Share", value: 15, color: "#00ffd5" },
    { name: "Platform", value: 20, color: "#ff1f70" },
    { name: "Bonus", value: 5, color: "#9d4edd" },
  ];

  const performanceData = [
    { week: "Week 1", score: 380 },
    { week: "Week 2", score: 395 },
    { week: "Week 3", score: 410 },
    { week: "Week 4", score: 425 },
    { week: "Week 5", score: 435 },
    { week: "Week 6", score: 442 },
    { week: "Week 7", score: 447.5 },
  ];

  const tierBadgeColor = {
    Bronze: "from-orange-600 to-orange-400",
    Silver: "from-gray-400 to-gray-200",
    Gold: "from-yellow-500 to-yellow-300",
    Platinum: "from-purple-500 to-pink-400",
  };

  const handleAddArtist = (artistId: string) => {
    const artist = artists.find((a) => a.id === artistId);
    if (
      artist &&
      selectedArtists.length < 5 &&
      !selectedArtists.find((a) => a.id === artistId)
    ) {
      setSelectedArtists([...selectedArtists, artist]);
    }
  };

  const handleRemoveArtist = (artistId: string) => {
    setSelectedArtists(selectedArtists.filter((a) => a.id !== artistId));
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
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
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-4xl md:text-5xl gradient-text tracking-tighter">
                My Fholio
              </h1>
              <div
                className={`px-4 py-2 rounded-xl bg-gradient-to-r ${
                  tierBadgeColor[userPortfolio.tier]
                } flex items-center gap-2 neon-glow`}
              >
                <Star className="w-5 h-5 text-white" />
                <span className="text-white tracking-tight">
                  {userPortfolio.tier}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground/70 tracking-tight">
              Rank #{userPortfolio.rank.toLocaleString()} globally
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="glass-card px-8 py-5 rounded-2xl neon-glow card-reflection">
              <div className="text-sm text-muted-foreground/70 mb-1 tracking-tight">
                Total Score
              </div>
              <div className="text-3xl gradient-text tracking-tight">
                {userPortfolio.totalScore.toFixed(1)}
              </div>
            </div>
            <div className="glass-card px-8 py-5 rounded-2xl neon-glow card-reflection">
              <div className="text-sm text-muted-foreground/70 mb-1 tracking-tight">
                This Week
              </div>
              <div className="text-3xl text-accent tracking-tight">
                ${userPortfolio.weeklyEarnings.toFixed(2)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Portfolio */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Portfolio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h2 className="text-xl text-white">
                    My Artists ({selectedArtists.length}/5)
                  </h2>
                </div>
                <Button
                  onClick={() => setShowDraftModal(true)}
                  className="gradient-bg hover:opacity-90 neon-glow holo-button rounded-xl"
                  disabled={selectedArtists.length >= 5}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Artist
                </Button>
              </div>

              <div className="space-y-4">
                {selectedArtists.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 rounded-xl hover:bg-white/5 transition-all group relative"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <ImageWithFallback
                          src={artist.imageUrl}
                          alt={artist.name}
                          className="w-20 h-20 rounded-lg object-cover cursor-pointer"
                          onClick={() => onNavigate("artist", artist.id)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                        <div className="absolute bottom-1 right-1 px-2 py-0.5 rounded bg-primary/80 text-xs text-white">
                          {artist.score.toFixed(1)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-white group-hover:text-primary transition-colors cursor-pointer"
                          onClick={() => onNavigate("artist", artist.id)}
                        >
                          {artist.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {artist.genre}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div
                            className={`flex items-center gap-1 ${
                              artist.change >= 0
                                ? "text-accent"
                                : "text-secondary"
                            }`}
                          >
                            <TrendingUp
                              className={`w-3 h-3 ${
                                artist.change < 0 ? "rotate-180" : ""
                              }`}
                            />
                            <span>
                              {artist.change >= 0 ? "+" : ""}
                              {artist.change.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>
                              {(artist.fanBackers / 1000).toFixed(1)}K
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white mb-1">
                          {(
                            (userPortfolio.totalScore /
                              selectedArtists.length /
                              userPortfolio.totalScore) *
                            100
                          ).toFixed(0)}
                          %
                        </div>
                        <p className="text-xs text-muted-foreground">
                          of portfolio
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveArtist(artist.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-lg"
                      >
                        <X className="w-4 h-4 text-muted-foreground hover:text-white" />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {selectedArtists.length < 5 && (
                  <button
                    onClick={() => setShowDraftModal(true)}
                    className="w-full glass-card p-8 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all text-muted-foreground hover:text-white"
                  >
                    <Plus className="w-8 h-8 mx-auto mb-2" />
                    <p>Add Artist to Your Fholio</p>
                  </button>
                )}
              </div>

              {/* Countdown Timer */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">
                    Next Lock-In Period
                  </span>
                </div>
                <div className="text-2xl gradient-text">
                  2 days 14 hours 23 minutes
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Make changes before Sunday 11:59 PM EST
                </p>
              </div>
            </motion.div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-2xl"
            >
              <h2 className="text-xl text-white mb-6">Performance History</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
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
                    dot={{ fill: "#8b1fff", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Rewards Wallet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <Wallet className="w-5 h-5 text-accent" />
                <h2 className="text-xl text-white">Rewards Wallet</h2>
              </div>

              <div className="space-y-4">
                <div className="glass-card p-4 rounded-xl bg-gradient-to-br from-accent/10 to-transparent">
                  <div className="text-sm text-muted-foreground mb-1">
                    Lifetime Earnings
                  </div>
                  <div className="text-3xl text-accent mb-2">
                    ${userPortfolio.lifetimeEarnings.toLocaleString()}
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-2">
                    75% to Platinum tier
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-muted-foreground mb-3">
                    Recent Payouts
                  </h3>
                  <div className="space-y-2">
                    {payoutHistory.slice(0, 3).map((payout, index) => (
                      <div key={index} className="glass-card p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-white">
                            ${payout.amount.toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {payout.week}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {payout.artists.map((artist, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary"
                            >
                              {artist}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gradient-bg hover:opacity-90">
                    Withdraw
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-primary/40 text-white hover:bg-primary/20 hover:border-primary/60 hover:text-white transition-all"
                  >
                    Reinvest
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Fan Pool Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 rounded-2xl"
            >
              <h2 className="text-xl text-white mb-6">Fan Pool This Week</h2>

              <div className="text-center mb-6">
                <div className="text-4xl gradient-text mb-2">
                  ${(fanPoolData.totalPool / 1000).toFixed(0)}K
                </div>
                <p className="text-sm text-muted-foreground">Total Pool</p>
              </div>

              <div className="mb-6">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                {pieData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Leaderboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 rounded-2xl"
        >
          <Tabs defaultValue="artists" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="artists">Top Artists</TabsTrigger>
              <TabsTrigger value="fans">Top Fans</TabsTrigger>
            </TabsList>
            <TabsContent value="artists" className="space-y-3">
              {artists.slice(0, 5).map((artist, index) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  onClick={() => onNavigate("artist", artist.id)}
                  compact
                />
              ))}
              <Button
                variant="outline"
                className="w-full border-primary/40 text-white hover:bg-primary/20"
                onClick={() => onNavigate("dashboard")}
              >
                View Full Leaderboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </TabsContent>
            <TabsContent value="fans" className="space-y-3">
              {[
                {
                  rank: 1,
                  name: "MusicMaven_23",
                  score: 892.5,
                  tier: "Platinum",
                },
                { rank: 2, name: "BeatSeeker", score: 876.3, tier: "Platinum" },
                { rank: 3, name: "SoundWave99", score: 854.1, tier: "Gold" },
                { rank: 4, name: "VibeCollector", score: 821.7, tier: "Gold" },
                { rank: 5, name: "ChartChaser", score: 798.4, tier: "Gold" },
              ].map((fan) => (
                <div
                  key={fan.rank}
                  className="glass-card p-4 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                        tierBadgeColor[fan.tier as keyof typeof tierBadgeColor]
                      } flex items-center justify-center`}
                    >
                      <span className="text-white">#{fan.rank}</span>
                    </div>
                    <div>
                      <div className="text-white">{fan.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {fan.tier} Tier
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white">{fan.score.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground">pts</div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Draft Modal */}
      {showDraftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl gradient-text">
                Add Artist to Your Fholio
              </h2>
              <button
                onClick={() => setShowDraftModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {artists
                .filter((a) => !selectedArtists.find((sa) => sa.id === a.id))
                .map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    onClick={() => onNavigate("artist", artist.id)}
                    showAddButton
                    onAdd={() => {
                      handleAddArtist(artist.id);
                      if (selectedArtists.length >= 4) {
                        setShowDraftModal(false);
                      }
                    }}
                  />
                ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
