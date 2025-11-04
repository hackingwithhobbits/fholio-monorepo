import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  Users,
  Gift,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  ExternalLink,
  Settings,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Logo } from "./Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";

interface MobileWalletPageProps {
  onNavigate: (page: string) => void;
}

export function MobileWalletPage({ onNavigate }: MobileWalletPageProps) {
  const balance = 2847.5;
  const xp = 8450;
  const level = 12;
  const referrals = 8;

  const payouts = [
    {
      id: "1",
      week: "Week of Nov 4-10",
      amount: 847.5,
      rank: 7,
      date: "Nov 11, 2024",
      artists: ["Luna Eclipse", "Jasmine Cole"],
    },
    {
      id: "2",
      week: "Week of Oct 28-Nov 3",
      amount: 625.0,
      rank: 12,
      date: "Nov 4, 2024",
      artists: ["Metro Collective", "Neon Syntax"],
    },
    {
      id: "3",
      week: "Week of Oct 21-27",
      amount: 450.0,
      rank: 18,
      date: "Oct 28, 2024",
      artists: ["The Wanderers"],
    },
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x742d...8C9E");
    toast.success("Address copied!");
  };

  const totalEarned = payouts.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-black pb-24 pt-safe">
      {/* Mobile Header with Logo */}
      <div className="sticky top-0 z-40 pt-safe bg-black/90 backdrop-blur-xl border-b border-primary/10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="w-10" /> {/* Spacer for centering */}
          <Logo size="sm" glow />
          <button
            onClick={() => onNavigate("settings")}
            className="p-2 text-white hover:text-primary transition-colors duration-300"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-4 border-b border-primary/10 bg-black/90 backdrop-blur-xl sticky top-[52px] z-30">
        <h1 className="text-white text-xl">Wallet & Rewards</h1>
        <p className="text-sm text-muted-foreground">
          Your earnings and achievements
        </p>
      </div>

      {/* Balance Card */}
      <div className="px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 border-primary/30 relative overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">
                Total Balance
              </span>
            </div>

            <div className="text-5xl text-white mb-6">
              ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => toast.info("Withdraw feature coming soon")}
                className="flex-1 gradient-bg py-6 rounded-2xl"
              >
                Withdraw
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleCopyAddress}
                className="px-6 py-6 rounded-2xl border-white/20"
              >
                <Copy className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="glass-card p-4 rounded-2xl text-center border-primary/10">
            <div className="text-2xl gradient-text mb-1">
              {xp.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">XP Points</div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                Level {level}
              </Badge>
            </div>
          </Card>

          <Card className="glass-card p-4 rounded-2xl text-center border-secondary/10">
            <div className="text-2xl gradient-text mb-1">{referrals}</div>
            <div className="text-xs text-muted-foreground">Referrals</div>
            <div className="mt-2 text-accent text-xs">+{referrals * 50} XP</div>
          </Card>

          <Card className="glass-card p-4 rounded-2xl text-center border-accent/10">
            <div className="text-2xl gradient-text mb-1">
              ${totalEarned.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">All-Time</div>
            <div className="mt-2">
              <TrendingUp className="w-4 h-4 text-accent mx-auto" />
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="history" className="px-6">
        <TabsList className="w-full grid grid-cols-2 mb-6 bg-white/5 p-1 rounded-2xl">
          <TabsTrigger value="history" className="rounded-xl">
            History
          </TabsTrigger>
          <TabsTrigger value="rewards" className="rounded-xl">
            Rewards
          </TabsTrigger>
        </TabsList>

        {/* Payout History */}
        <TabsContent value="history" className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white">Weekly Payouts</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("charts")}
              className="text-accent text-xs"
            >
              View All
              <ExternalLink className="ml-1 w-3 h-3" />
            </Button>
          </div>

          {payouts.map((payout, index) => (
            <motion.div
              key={payout.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 rounded-2xl"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white mb-1">{payout.week}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{payout.date}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">
                      Rank #{payout.rank}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-accent text-lg">
                    +${payout.amount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Artists */}
              <div className="flex items-center gap-2 text-xs pt-3 border-t border-white/5">
                <Users className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {payout.artists.join(", ")}
                </span>
              </div>
            </motion.div>
          ))}
        </TabsContent>

        {/* Rewards & Boosts */}
        <TabsContent value="rewards" className="space-y-4">
          {/* XP Progress */}
          <div className="glass-card p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white mb-1">Level {level}</h3>
                <p className="text-sm text-muted-foreground">
                  {xp.toLocaleString()} /{" "}
                  {((level + 1) * 1000).toLocaleString()} XP
                </p>
              </div>
              <Badge className="gradient-bg">Pro Fan</Badge>
            </div>

            <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(xp % 1000) / 10}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              {(level + 1) * 1000 - xp} XP to Level {level + 1}
            </p>
          </div>

          {/* Referral Rewards */}
          <div className="glass-card p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-accent" />
              <h3 className="text-white">Referral Program</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Invite friends and earn 50 XP + 5% of their first payout
            </p>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-4">
              <code className="flex-1 text-sm text-accent font-mono">
                FHOLIO-{level}
                {referrals}XP
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `FHOLIO-${level}${referrals}XP`
                  );
                  toast.success("Referral code copied!");
                }}
                className="border-accent/30 text-accent"
              >
                Copy
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Referrals: {referrals}
              </span>
              <span className="text-accent">+{referrals * 50} XP earned</span>
            </div>
          </div>

          {/* Boost Options */}
          <div className="glass-card p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-white">Weekly Boosts</h3>
              <Badge className="ml-auto bg-accent/20 text-accent">
                Coming Soon
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Multiply your earnings with premium boosts and power-ups
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-sm text-white">2x Earnings Boost</span>
                <span className="text-xs text-muted-foreground">500 XP</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-sm text-white">Extra Draft Slot</span>
                <span className="text-xs text-muted-foreground">1000 XP</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-sm text-white">Early Access</span>
                <span className="text-xs text-muted-foreground">2000 XP</span>
              </div>
            </div>
          </div>

          {/* Global Stats */}
          <div className="glass-card p-5 rounded-2xl">
            <h3 className="text-white mb-4">Global Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Distributed
                </span>
                <span className="text-white">$2.4M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Active Fans
                </span>
                <span className="text-white">12,542</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Avg Fan Reward
                </span>
                <span className="text-accent">$447</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
