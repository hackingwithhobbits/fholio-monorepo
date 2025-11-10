import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Users,
  Gift,
  Download,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { userPortfolio, payoutHistory, topFans } from "../data/mockData";
import { Logo } from "./Logo";
import { ShareButtons } from "./ShareButtons";

interface WalletPageProps {
  onNavigate: (page: string) => void;
}

export function WalletPage({ onNavigate }: WalletPageProps) {
  const weekProgress = 67; // Mock: 67% through the week

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8 relative">
      {/* Background Logo Watermark */}
      <div className="logo-watermark">
        <Logo size="xl" className="opacity-100" style={{ height: "400px" }} />
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-xs text-accent mb-4 tracking-widest uppercase">
            PICK. PLAY. PROFIT.
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 gradient-text tracking-tighter">
            Rewards Wallet
          </h1>
          <p className="text-xl text-muted-foreground/80 tracking-tight">
            Track your earnings and withdraw anytime
          </p>
        </motion.div>

        {/* Main Wallet Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-8 md:p-12 neon-glow card-reflection relative overflow-hidden"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center neon-glow">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground/70 tracking-tight">
                    Total Balance
                  </div>
                  <div className="text-5xl md:text-6xl gradient-text tracking-tight">
                    ${userPortfolio.lifetimeEarnings.toFixed(2)}
                  </div>
                </div>
              </div>
              <Button className="gradient-bg neon-glow holo-button rounded-xl px-6">
                <Download className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-accent">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm tracking-tight">This Week</span>
                </div>
                <div className="text-3xl text-white tracking-tight">
                  ${userPortfolio.weeklyEarnings.toFixed(2)}
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Users className="w-5 h-5" />
                  <span className="text-sm tracking-tight">Referral Bonus</span>
                </div>
                <div className="text-3xl text-white tracking-tight">
                  ${userPortfolio.referralBonus.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground/70 mt-1">
                  {userPortfolio.referralCount} friends invited
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-secondary">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm tracking-tight">Avg/Week</span>
                </div>
                <div className="text-3xl text-white tracking-tight">
                  ${(userPortfolio.lifetimeEarnings / 14).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Week Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 neon-glow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-white tracking-tight">Week Progress</span>
            </div>
            <span className="text-sm text-muted-foreground/70">
              {weekProgress}% Complete
            </span>
          </div>
          <Progress value={weekProgress} className="h-2 mb-2" />
          <div className="text-xs text-muted-foreground/70 tracking-tight">
            Lock-in closes Friday at 11:59 PM EST • Payouts process Monday
          </div>
        </motion.div>

        {/* Payout History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-white tracking-tight">
              Payout History
            </h2>
            <Button
              variant="ghost"
              className="text-accent hover:text-accent/80"
            >
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {payoutHistory.map((payout, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all neon-glow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-white tracking-tight mb-1">
                      {payout.week}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {payout.artists.map((artist, i) => (
                        <span
                          key={i}
                          className="text-xs glass-card px-2 py-1 rounded-lg text-muted-foreground/80"
                        >
                          {artist}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-2xl gradient-text tracking-tight ml-4">
                    +${payout.amount.toFixed(2)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Referral System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-2xl p-8 neon-glow relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-secondary/5" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Gift className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl text-white tracking-tight">
                  Invite Friends, Earn More
                </h3>
                <p className="text-sm text-muted-foreground/70">
                  Get 5% bonus on friend activity + sign-up rewards
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                readOnly
                value="fholio.com/invite/YOUR-CODE"
                className="flex-1 px-4 py-3 rounded-xl glass-card border border-primary/20 text-white text-sm tracking-tight"
              />
              <Button className="gradient-bg neon-glow holo-button rounded-xl px-8">
                Copy Link
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl gradient-text tracking-tight">
                  {userPortfolio.referralCount}
                </div>
                <div className="text-xs text-muted-foreground/70">Friends</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-accent tracking-tight">
                  ${userPortfolio.referralBonus.toFixed(0)}
                </div>
                <div className="text-xs text-muted-foreground/70">Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-white tracking-tight">2.5x</div>
                <div className="text-xs text-muted-foreground/70">
                  Multiplier
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Earners This Week */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl text-white tracking-tight mb-6">
            Top Fan Earnings This Week
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {topFans.map((fan, index) => (
              <motion.div
                key={fan.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className="glass-card rounded-2xl p-4 text-center neon-glow hover:scale-105 transition-all"
              >
                <div className="relative inline-block mb-3">
                  <img
                    src={fan.avatar}
                    alt={fan.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-xs">
                    {fan.rank}
                  </div>
                </div>
                <div className="text-white text-sm tracking-tight mb-1">
                  {fan.name}
                </div>
                <div className="text-xs text-muted-foreground/70 mb-2">
                  {fan.city}
                </div>
                <div className="text-lg gradient-text tracking-tight">
                  ${fan.earnings}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Share Your Success */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="glass-card rounded-2xl p-8 text-center neon-glow"
        >
          <h3 className="text-xl text-white mb-2 tracking-tight">
            Share Your Success
          </h3>
          <p className="text-muted-foreground/70 mb-6 tracking-tight">
            Show off your earnings and lineup
          </p>
          <ShareButtons
            title={`Just earned $${userPortfolio.weeklyEarnings.toFixed(2)} this week on Fholio!`}
            description="Building the future of music through fan power"
          />
        </motion.div>
      </div>
    </div>
  );
}
