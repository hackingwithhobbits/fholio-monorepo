// apps/frontend/src/components/WalletPage.tsx

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Users,
  Gift,
  Download,
  ArrowUpRight,
  Clock,
  Loader2,
  AlertCircle,
  Copy,
  CheckCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Logo } from "./Logo";
import { ShareButtons } from "./ShareButtons";
import { Input } from "./ui/input";
import {
  useWallet,
  useWalletSummary,
  useTransactions,
  useWeeklyEarnings,
  useTopEarners,
  useWalletActions,
} from "@/hooks/useWallet";
import { useCurrentWeek } from "@/hooks/useWeek";
import { authUtils } from "@/lib/auth";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface WalletPageProps {
  onNavigate: (page: string) => void;
}

export function WalletPage({ onNavigate }: WalletPageProps) {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [referralCopied, setReferralCopied] = useState(false);

  const userSession = authUtils.getSession();
  const { wallet, isLoading: walletLoading } = useWallet();
  const { summary, isLoading: summaryLoading } = useWalletSummary();
  const { transactions, isLoading: transactionsLoading } = useTransactions(10);
  const { weeklyEarnings } = useWeeklyEarnings();
  const { topEarners } = useTopEarners(5);
  const { withdraw, isWithdrawing } = useWalletActions();
  const { week } = useCurrentWeek();

  const isLoading = walletLoading || summaryLoading;

  // Calculate week progress
  const getWeekProgress = () => {
    if (!week) return 0;
    const now = new Date();
    const start = new Date(week.start_date);
    const end = new Date(week.end_date);
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const weekProgress = getWeekProgress();

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amount < (wallet?.min_withdrawal || 10)) {
      toast.error(`Minimum withdrawal is $${wallet?.min_withdrawal || 10}`);
      return;
    }

    if (amount > (wallet?.balance || 0)) {
      toast.error("Insufficient balance");
      return;
    }

    const success = await withdraw(amount);
    if (success) {
      setShowWithdrawDialog(false);
      setWithdrawAmount("");
    }
  };

  const copyReferralLink = () => {
    const referralLink = `https://fholio.com/invite/${summary?.referralCode || "YOUR-CODE"}`;
    navigator.clipboard.writeText(referralLink);
    setReferralCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setReferralCopied(false), 2000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading wallet...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!userSession) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl text-white mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">
            Please sign in to view your wallet
          </p>
          <Button
            onClick={() => onNavigate("signin-fan")}
            className="gradient-bg"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center neon-glow">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground/70 tracking-tight">
                    Total Balance
                  </div>
                  <div className="text-5xl md:text-6xl gradient-text tracking-tight">
                    ${(wallet?.balance || 0).toFixed(2)}
                  </div>
                  {wallet && wallet.locked_balance > 0 && (
                    <div className="text-xs text-muted-foreground/70 mt-1">
                      ${wallet.locked_balance.toFixed(2)} locked
                    </div>
                  )}
                </div>
              </div>

              <Dialog
                open={showWithdrawDialog}
                onOpenChange={setShowWithdrawDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    className="gradient-bg neon-glow holo-button rounded-xl px-6"
                    disabled={
                      !wallet?.can_withdraw ||
                      (wallet?.balance || 0) < (wallet?.min_withdrawal || 10)
                    }
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card">
                  <DialogHeader>
                    <DialogTitle className="gradient-text">
                      Withdraw Funds
                    </DialogTitle>
                    <DialogDescription>
                      Available balance: ${(wallet?.balance || 0).toFixed(2)}
                      <br />
                      Minimum withdrawal: $
                      {(wallet?.min_withdrawal || 10).toFixed(2)}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Amount ($)
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        step="0.01"
                        min={wallet?.min_withdrawal || 10}
                        max={wallet?.balance || 0}
                      />
                    </div>
                    <Button
                      onClick={handleWithdraw}
                      disabled={isWithdrawing}
                      className="w-full gradient-bg"
                    >
                      {isWithdrawing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Confirm Withdrawal
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-accent">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm tracking-tight">This Week</span>
                </div>
                <div className="text-3xl text-white tracking-tight">
                  ${(summary?.currentWeekEarnings || 0).toFixed(2)}
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Users className="w-5 h-5" />
                  <span className="text-sm tracking-tight">Referral Bonus</span>
                </div>
                <div className="text-3xl text-white tracking-tight">
                  ${(summary?.referralBonus || 0).toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground/70 mt-1">
                  {summary?.referralCount || 0} friends invited
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-secondary">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm tracking-tight">Avg/Week</span>
                </div>
                <div className="text-3xl text-white tracking-tight">
                  ${(summary?.avgWeeklyEarnings || 0).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Week Progress */}
        {week && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 neon-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-white tracking-tight">
                  Week {week.week_number} Progress
                </span>
              </div>
              <span className="text-sm text-muted-foreground/70">
                {weekProgress.toFixed(0)}% Complete
              </span>
            </div>
            <Progress value={weekProgress} className="h-2 mb-2" />
            <div className="text-xs text-muted-foreground/70 tracking-tight">
              Lock-in closes{" "}
              {new Date(week.lineup_lock_at).toLocaleDateString()} • Payouts
              process Monday
            </div>
          </motion.div>
        )}

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-white tracking-tight">
              Recent Transactions
            </h2>
          </div>

          {transactionsLoading ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <DollarSign className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-white text-xl mb-2">No transactions yet</p>
              <p className="text-muted-foreground">
                Start competing to earn prizes!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction: any, index: number) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all neon-glow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-white tracking-tight mb-1">
                        {transaction.description ||
                          transaction.transaction_type}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {transaction.week && (
                          <span className="glass-card px-2 py-1 rounded-lg text-muted-foreground/80">
                            Week {transaction.week.week_number}
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 rounded-lg ${
                            transaction.status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : transaction.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {transaction.status}
                        </span>
                        <span className="text-muted-foreground/70">
                          {new Date(
                            transaction.created_at,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`text-2xl tracking-tight ml-4 ${
                        parseFloat(transaction.amount) >= 0
                          ? "text-accent"
                          : "text-secondary"
                      }`}
                    >
                      {parseFloat(transaction.amount) >= 0 ? "+" : ""}$
                      {Math.abs(parseFloat(transaction.amount)).toFixed(2)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Referral System */}
        {summary?.referralCode && (
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
                  value={`fholio.com/invite/${summary.referralCode}`}
                  className="flex-1 px-4 py-3 rounded-xl glass-card border border-primary/20 text-white text-sm tracking-tight"
                />
                <Button
                  onClick={copyReferralLink}
                  className="gradient-bg neon-glow holo-button rounded-xl px-8"
                >
                  {referralCopied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl gradient-text tracking-tight">
                    {summary.referralCount}
                  </div>
                  <div className="text-xs text-muted-foreground/70">
                    Friends
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-accent tracking-tight">
                    ${summary.referralBonus.toFixed(0)}
                  </div>
                  <div className="text-xs text-muted-foreground/70">Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-white tracking-tight">5%</div>
                  <div className="text-xs text-muted-foreground/70">
                    Bonus Rate
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Top Earners This Week */}
        {topEarners.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl text-white tracking-tight mb-6">
              Top Fan Earnings This Week
            </h2>
            <div className="grid md:grid-cols-5 gap-4">
              {topEarners.map((fan: any, index: number) => (
                <motion.div
                  key={fan.userId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="glass-card rounded-2xl p-4 text-center neon-glow hover:scale-105 transition-all"
                >
                  <div className="relative inline-block mb-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      {fan.username?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-xs">
                      {fan.rank}
                    </div>
                  </div>
                  <div className="text-white text-sm tracking-tight mb-1">
                    {fan.username}
                  </div>
                  <div className="text-lg gradient-text tracking-tight">
                    ${fan.earnings.toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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
            title={`Just earned $${(summary?.currentWeekEarnings || 0).toFixed(2)} this week on Fholio!`}
            description="Building the future of music through fan power"
          />
        </motion.div>
      </div>
    </div>
  );
}
