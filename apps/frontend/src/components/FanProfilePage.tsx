import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Trophy,
  DollarSign,
  TrendingUp,
  Calendar,
  Award,
  Share2,
  Edit,
  LogOut,
  Users,
  Star,
  Flame,
  Target,
  Copy,
  Check,
  Settings,
  Gift,
  Crown,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { toast } from "sonner";

interface FanProfilePageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function FanProfilePage({ onNavigate, onLogout }: FanProfilePageProps) {
  const [referralCopied, setReferralCopied] = useState(false);

  // Mock user data - realistic stats
  const userData = {
    username: "@JayVibes",
    displayName: "Jay Mitchell",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    tier: "Pro Fan",
    joined: "March 2025",
    leagueRank: 184,
    totalPoints: 96230,
    lifetimeWinnings: 482.0,
    currentStreak: 4,
    bio: "Music lover | Hip-hop & R&B enthusiast | Chasing that Top 10",
    location: "Brooklyn, NY",
    favoriteGenres: ["Hip-Hop", "R&B", "Electronic"],
  };

  const achievements = [
    {
      id: 1,
      name: "First Win",
      description: "Finished in Top 10",
      icon: Trophy,
      earned: true,
      date: "Week 41",
    },
    {
      id: 2,
      name: "Hot Streak",
      description: "5 consecutive weeks active",
      icon: Flame,
      earned: true,
      date: "Week 43",
    },
    {
      id: 3,
      name: "Sharp Eye",
      description: "Picked 3 Top 10 artists in one week",
      icon: Target,
      earned: true,
      date: "Week 42",
    },
    {
      id: 4,
      name: "Big Spender",
      description: "Upgraded to Pro tier",
      icon: Crown,
      earned: true,
      date: "Week 40",
    },
    {
      id: 5,
      name: "Perfect Week",
      description: "All 5 picks in Top 20",
      icon: Star,
      earned: false,
      date: null,
    },
    {
      id: 6,
      name: "Millionaire",
      description: "Earn 1,000,000 points lifetime",
      icon: Zap,
      earned: false,
      date: null,
    },
  ];

  const weeklyHistory = [
    { week: 44, rank: 23, points: 8420, winnings: 0 },
    { week: 43, rank: 12, points: 12340, winnings: 142.5 },
    { week: 42, rank: 8, points: 15890, winnings: 218.75 },
    { week: 41, rank: 45, points: 6200, winnings: 0 },
    { week: 40, rank: 19, points: 9450, winnings: 0 },
  ];

  const referralCode = "JAYVIBES2025";
  const referralLink = `https://fholio.com/join/${referralCode}`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setReferralCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setReferralCopied(false), 2000);
  };

  const handleShare = () => {
    toast.success("Profile shared!");
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 mb-8 neon-glow"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-primary/30">
                <AvatarImage src={userData.avatar} alt={userData.displayName} />
                <AvatarFallback className="text-3xl">
                  {userData.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full">
                <span className="text-xs text-white">{userData.tier}</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl text-white mb-1">
                {userData.displayName}
              </h1>
              <p className="text-lg text-accent mb-3">{userData.username}</p>
              <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                {userData.bio}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                <div className="flex items-center gap-2 glass-card px-3 py-1 rounded-lg">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-sm text-white">
                    Joined {userData.joined}
                  </span>
                </div>
                <div className="flex items-center gap-2 glass-card px-3 py-1 rounded-lg">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-white">
                    Rank #{userData.leagueRank}
                  </span>
                </div>
                <div className="flex items-center gap-2 glass-card px-3 py-1 rounded-lg">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-white">
                    {userData.currentStreak} week streak
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button size="sm" className="gradient-bg">
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
                  Share Profile
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigate("fan-dashboard")}
                  className="border-accent/40 text-accent hover:bg-accent/20"
                >
                  View My Lineups
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-2xl gradient-text mb-1">
                  {userData.totalPoints.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Points
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <div className="text-2xl text-green-500 mb-1">
                  ${userData.lifetimeWinnings.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Lifetime Wins
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass-card grid w-full grid-cols-4 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Weekly Performance History
              </h3>
              <div className="space-y-3">
                {weeklyHistory.map((week, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between">
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
                        <Separator orientation="vertical" className="h-12" />
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">
                            Points
                          </div>
                          <div className="text-lg text-white">
                            {week.points.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">
                          Winnings
                        </div>
                        <div
                          className={`text-lg ${week.winnings > 0 ? "text-green-500" : "text-white/50"}`}
                        >
                          ${week.winnings.toFixed(2)}
                        </div>
                      </div>
                    </div>
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
              <h3 className="text-xl text-white mb-4">Favorite Genres</h3>
              <div className="flex flex-wrap gap-2">
                {userData.favoriteGenres.map((genre, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Your Achievements
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`glass-card p-4 rounded-xl ${
                        achievement.earned
                          ? "border-2 border-accent/30"
                          : "opacity-50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            achievement.earned
                              ? "bg-gradient-to-br from-accent to-primary"
                              : "bg-white/10"
                          }`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white mb-1">
                            {achievement.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.date && (
                            <Badge className="bg-accent/20 text-accent text-xs">
                              Earned {achievement.date}
                            </Badge>
                          )}
                          {!achievement.earned && (
                            <Badge className="bg-white/5 text-white/50 text-xs">
                              Not Yet Earned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-xl text-white mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Invite Friends, Earn Rewards
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Share your referral link and earn bonus points when friends join
                and compete!
              </p>

              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">
                    Your Referral Code
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={referralCode}
                      readOnly
                      className="glass-card border-primary/20 flex-1"
                    />
                    <Button
                      onClick={handleCopyReferral}
                      className="gradient-bg"
                    >
                      {referralCopied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Share Link</Label>
                  <div className="flex gap-2">
                    <Input
                      value={referralLink}
                      readOnly
                      className="glass-card border-primary/20 flex-1 text-sm"
                    />
                    <Button
                      onClick={handleCopyReferral}
                      className="gradient-bg"
                    >
                      {referralCopied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="glass-card p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10">
                  <div className="flex items-start gap-3">
                    <Gift className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <h4 className="text-white mb-1">Referral Rewards</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• You earn 500 bonus points per referral</li>
                        <li>• Your friend gets 250 bonus points on signup</li>
                        <li>
                          • Earn 5% of their points for their first 4 weeks
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="glass-card p-4 rounded-xl text-center">
                    <div className="text-2xl gradient-text mb-1">3</div>
                    <div className="text-xs text-muted-foreground">
                      Friends Joined
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center">
                    <div className="text-2xl text-accent mb-1">1,850</div>
                    <div className="text-xs text-muted-foreground">
                      Bonus Points
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl text-center">
                    <div className="text-2xl text-green-500 mb-1">$12.50</div>
                    <div className="text-xs text-muted-foreground">Earned</div>
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
                Account Settings
              </h3>

              <div className="space-y-6">
                {/* Payment Method */}
                <div>
                  <h4 className="text-white mb-3">Payment Method</h4>
                  <div className="glass-card p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm">PayPal</p>
                        <p className="text-xs text-muted-foreground">
                          j.mitchell@email.com
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

                {/* Notifications */}
                <div>
                  <h4 className="text-white mb-3">Notifications</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Weekly recap emails", enabled: true },
                      { label: "Live show reminders", enabled: true },
                      { label: "Payout notifications", enabled: true },
                      { label: "Marketing emails", enabled: false },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="glass-card p-4 rounded-xl flex items-center justify-between"
                      >
                        <span className="text-sm text-white">{item.label}</span>
                        <div
                          className={`w-12 h-6 rounded-full transition-colors ${
                            item.enabled ? "bg-accent" : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white mt-0.5 transition-transform ${
                              item.enabled ? "ml-6" : "ml-1"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div>
                  <h4 className="text-red-500 mb-3">Danger Zone</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-red-500/40 text-red-500 hover:bg-red-500/20"
                    >
                      Deactivate Account
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
