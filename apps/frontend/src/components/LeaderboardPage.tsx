// apps/frontend/src/components/LeaderboardPage.tsx

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Trophy,
  TrendingUp,
  Users,
  Award,
  Clock,
  Zap,
  Crown,
  Medal,
  ChevronUp,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar } from "./ui/avatar";
import { Logo } from "./Logo";
import { ShareButtons } from "./ShareButtons";
import {
  useGlobalLeaderboard,
  useWeeklyLeaderboard,
  useMyRank,
  useMyStats,
} from "@/hooks/useLeaderboard";
import { useCurrentWeek } from "@/hooks/useWeek";
import { authUtils } from "@/lib/auth";

interface LeaderboardPageProps {
  onNavigate: (page: string) => void;
}

export function LeaderboardPage({ onNavigate }: LeaderboardPageProps) {
  const [selectedTab, setSelectedTab] = useState<"weekly" | "global">("weekly");
  const userSession = authUtils.getSession();

  // Fetch data
  const { week } = useCurrentWeek();
  const { leaderboard: globalLeaderboard, isLoading: globalLoading } =
    useGlobalLeaderboard(50);
  const { leaderboard: weeklyLeaderboard, isLoading: weeklyLoading } =
    useWeeklyLeaderboard(week?.id, 50);
  const { rank: myRank, isLoading: rankLoading } = useMyRank(week?.id);
  const { stats: myStats, isLoading: statsLoading } = useMyStats();

  const isLoading = selectedTab === "weekly" ? weeklyLoading : globalLoading;
  const currentLeaderboard =
    selectedTab === "weekly" ? weeklyLeaderboard : globalLeaderboard;

  // Prize pool (mock for now - can be made dynamic)
  const prizePool = {
    total: 1000,
    first: 500,
    second: 300,
    third: 200,
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-600";
    if (rank <= 10) return "text-primary";
    return "text-white";
  };

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
          <div className="text-xs text-accent mb-2 tracking-widest uppercase">
            COMPETE. WIN. DOMINATE.
          </div>
          <h1 className="text-5xl md:text-6xl gradient-text tracking-tighter mb-2">
            Leaderboard
          </h1>
          <p className="text-muted-foreground/80 tracking-tight">
            Top fans competing for prizes
          </p>
        </motion.div>

        {/* User Stats Card */}
        {userSession && myRank && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 neon-glow border-2 border-primary/30"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-white text-xl tracking-tight mb-1">
                    Your Rank: #{myRank.rank || "N/A"}
                  </div>
                  <div className="text-sm text-muted-foreground/70">
                    {myRank.total_participants || 0} competitors • Score:{" "}
                    {myRank.total_score?.toFixed(1) || 0}
                  </div>
                </div>
              </div>

              {/* User Global Stats */}
              {myStats && (
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl gradient-text tracking-tight">
                      {myStats.weeks_played}
                    </div>
                    <div className="text-xs text-muted-foreground/70">
                      Weeks Played
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl gradient-text tracking-tight">
                      {myStats.avg_score?.toFixed(1) || 0}
                    </div>
                    <div className="text-xs text-muted-foreground/70">
                      Avg Score
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-accent tracking-tight">
                      {myStats.total_wins}
                    </div>
                    <div className="text-xs text-muted-foreground/70">Wins</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Prize Pool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-4"
        >
          <div className="glass-card rounded-2xl p-6 neon-glow bg-gradient-to-br from-accent/10 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-sm tracking-tight text-muted-foreground">
                Total Prize Pool
              </span>
            </div>
            <div className="text-3xl gradient-text tracking-tight">
              ${prizePool.total}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 neon-glow border-2 border-yellow-400/30">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-sm tracking-tight text-muted-foreground">
                1st Place
              </span>
            </div>
            <div className="text-3xl text-yellow-400 tracking-tight">
              ${prizePool.first}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 neon-glow border-2 border-gray-400/30">
            <div className="flex items-center gap-2 mb-2">
              <Medal className="w-5 h-5 text-gray-400" />
              <span className="text-sm tracking-tight text-muted-foreground">
                2nd Place
              </span>
            </div>
            <div className="text-3xl text-gray-400 tracking-tight">
              ${prizePool.second}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 neon-glow border-2 border-amber-600/30">
            <div className="flex items-center gap-2 mb-2">
              <Medal className="w-5 h-5 text-amber-600" />
              <span className="text-sm tracking-tight text-muted-foreground">
                3rd Place
              </span>
            </div>
            <div className="text-3xl text-amber-600 tracking-tight">
              ${prizePool.third}
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs
            value={selectedTab}
            onValueChange={(value) =>
              setSelectedTab(value as "weekly" | "global")
            }
            className="w-full"
          >
            <TabsList className="glass-card mb-6">
              <TabsTrigger value="weekly">
                <Clock className="w-4 h-4 mr-2" />
                This Week
              </TabsTrigger>
              <TabsTrigger value="global">
                <Trophy className="w-4 h-4 mr-2" />
                All-Time
              </TabsTrigger>
            </TabsList>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Loading leaderboard...
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && currentLeaderboard.length === 0 && (
              <div className="glass-card rounded-2xl p-12 text-center neon-glow">
                <Users className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-white text-xl mb-2">No rankings yet</p>
                <p className="text-muted-foreground mb-6">
                  Be the first to compete this week!
                </p>
                <Button
                  onClick={() => onNavigate("discover")}
                  className="gradient-bg neon-glow holo-button rounded-xl"
                >
                  Create Your Lineup
                </Button>
              </div>
            )}

            {/* Leaderboard Table */}
            {!isLoading && currentLeaderboard.length > 0 && (
              <TabsContent value={selectedTab} className="space-y-3">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs text-muted-foreground/70 uppercase tracking-wider">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5">Fan</div>
                  <div className="col-span-2 text-center">Score</div>
                  <div className="col-span-2 text-center hidden md:block">
                    {selectedTab === "weekly" ? "Picks" : "Weeks"}
                  </div>
                  <div className="col-span-2 text-center hidden md:block">
                    Change
                  </div>
                </div>

                {/* Leaderboard Rows */}
                {currentLeaderboard.map((entry: any, index: number) => {
                  const isCurrentUser = entry.user_id === userSession?.id;
                  const rank = entry.rank || index + 1;

                  return (
                    <motion.div
                      key={entry.user_id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`glass-card rounded-2xl p-6 neon-glow hover:scale-[1.01] transition-all ${
                        isCurrentUser ? "border-2 border-primary" : ""
                      } ${rank <= 3 ? "bg-gradient-to-r from-primary/5 to-transparent" : ""}`}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Rank */}
                        <div className="col-span-1">
                          <div className="flex items-center gap-2">
                            {getRankBadge(rank)}
                            <span
                              className={`text-2xl ${getRankColor(rank)} tracking-tight`}
                            >
                              {rank}
                            </span>
                          </div>
                        </div>

                        {/* User Info */}
                        <div className="col-span-5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                              {entry.username?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                            <div>
                              <div className="text-white tracking-tight flex items-center gap-2">
                                {entry.username || "Anonymous"}
                                {isCurrentUser && (
                                  <Badge className="bg-primary/20 text-primary text-xs">
                                    You
                                  </Badge>
                                )}
                              </div>
                              {rank <= 3 && (
                                <div className="text-xs text-accent">
                                  {rank === 1 && "🏆 Champion"}
                                  {rank === 2 && "🥈 Runner-up"}
                                  {rank === 3 && "🥉 Third Place"}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Score */}
                        <div className="col-span-2 text-center">
                          <div className="text-2xl gradient-text tracking-tight">
                            {entry.total_score?.toFixed(1) || 0}
                          </div>
                          <div className="text-xs text-muted-foreground/70">
                            points
                          </div>
                        </div>

                        {/* Picks/Weeks */}
                        <div className="col-span-2 text-center hidden md:block">
                          <div className="text-xl text-white tracking-tight">
                            {entry.picks_count || entry.weeks_played || 0}
                          </div>
                          <div className="text-xs text-muted-foreground/70">
                            {selectedTab === "weekly" ? "picks" : "weeks"}
                          </div>
                        </div>

                        {/* Change/Trend */}
                        <div className="col-span-2 text-center hidden md:block">
                          {entry.rank_change !== undefined &&
                          entry.rank_change !== 0 ? (
                            <div className="flex items-center justify-center gap-1">
                              {entry.rank_change > 0 ? (
                                <>
                                  <ChevronUp className="w-4 h-4 text-accent" />
                                  <span className="text-accent">
                                    +{entry.rank_change}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4 text-secondary" />
                                  <span className="text-secondary">
                                    {entry.rank_change}
                                  </span>
                                </>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground/50">-</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </TabsContent>
            )}
          </Tabs>
        </motion.div>

        {/* CTA Section */}
        {!userSession && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-2xl p-8 text-center neon-glow bg-gradient-to-br from-primary/10 to-secondary/10"
          >
            <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl text-white mb-2 tracking-tight">
              Start Competing Today
            </h3>
            <p className="text-muted-foreground/80 mb-6">
              Join thousands of fans backing rising artists and winning prizes
            </p>
            <Button
              onClick={() => onNavigate("signin-fan")}
              size="lg"
              className="gradient-bg neon-glow holo-button rounded-xl"
            >
              Sign Up & Compete
            </Button>
          </motion.div>
        )}

        {/* Share Section */}
        {userSession && myRank && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card rounded-2xl p-8 text-center neon-glow bg-gradient-to-br from-primary/10 to-secondary/10"
          >
            <h3 className="text-2xl text-white mb-2 tracking-tight">
              Share Your Rank
            </h3>
            <p className="text-muted-foreground/80 mb-6">
              Show off your position on the leaderboard
            </p>
            <ShareButtons
              title={`I'm ranked #${myRank.rank} on Fholio!`}
              description={`Competing with ${myRank.total_participants} fans • Score: ${myRank.total_score?.toFixed(1)}`}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
