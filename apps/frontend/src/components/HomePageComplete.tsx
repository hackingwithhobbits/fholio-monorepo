"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Trophy,
  DollarSign,
  Music,
  Sparkles,
  Zap,
  Target,
  Star,
  Check,
  Play,
  Award,
  Users,
  Clock,
  Gift,
  Flame,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface HomePageCompleteProps {
  onNavigate: (page: string) => void;
}

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 10}s`,
  animationDuration: `${20 + Math.random() * 10}s`,
}));

export function HomePageComplete({ onNavigate }: HomePageCompleteProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Ticker content
  const tickerItems = [
    "🔥 WEEK 44 LIVE SHOW THURSDAY 7PM",
    "POT $212K",
    "100 TRACKS DROPPED",
    "FAN LEADER @JAYVIBES UP 20K POINTS",
    "BONUS ROUND OPENS TUESDAY",
    "PICK DEADLINE IN 12H",
  ];

  // Weekly timeline data
  const timelineNodes = [
    {
      day: "Friday",
      title: "100 New Tracks Drop",
      description:
        "Every Friday at midnight, 100 brand new tracks go live. Fans start voting immediately.",
      icon: Music,
      status: "complete",
    },
    {
      day: "Sat-Sun",
      title: "Fans Vote & Artists Promote",
      description:
        "Artists push their tracks on social media. Fans vote for their favorites throughout the weekend.",
      icon: TrendingUp,
      status: "active",
    },
    {
      day: "Monday",
      title: "Top 50 Announced",
      description:
        "The top 50 tracks are revealed. Pro and All-Star fans lock in their lineups.",
      icon: Trophy,
      status: "upcoming",
    },
    {
      day: "Tuesday",
      title: "Bonus Rounds Open",
      description:
        "Special mini-games and bonus challenges unlock for extra points and rewards.",
      icon: Gift,
      status: "upcoming",
    },
    {
      day: "Wednesday",
      title: "Leaderboard Shuffle",
      description:
        "Rankings update. Streak bonuses apply. Final push for top 10 positions.",
      icon: Flame,
      status: "upcoming",
    },
    {
      day: "Thursday 7PM",
      title: "Live Showdown",
      description:
        "Watch the live reveal of Top 10 winners. Payouts distributed automatically.",
      icon: Star,
      status: "upcoming",
    },
    {
      day: "Friday",
      title: "New Week Resets",
      description:
        "Cycle begins again. New tracks, new competition, new prizes.",
      icon: Sparkles,
      status: "upcoming",
    },
  ];

  // Subscription tiers
  const subscriptionTiers = [
    {
      name: "Free Fan",
      price: "$0",
      period: "",
      gradient: "from-gray-600 to-gray-700",
      benefits: [
        "Vote weekly",
        "Watch live show",
        "Access leaderboard",
        "Join community chat",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro Fan",
      price: "$10",
      period: "/mo",
      gradient: "from-primary to-purple-600",
      benefits: [
        "Pick 5 artists for lineup",
        "Earn from fan pool",
        "Unlock mini-games",
        "Stat tracking dashboard",
        "Streak rewards",
        "Pro badge",
      ],
      cta: "Go Pro",
      popular: true,
    },
    {
      name: "All-Star Fan",
      price: "$20",
      period: "/mo",
      gradient: "from-secondary to-accent",
      benefits: [
        "Pick 10 artists for lineup",
        "Higher payout share (2x)",
        "Early access to live chat",
        "Exclusive badges & perks",
        "Premium support",
        "VIP leaderboard access",
        "Bonus pool entries",
      ],
      cta: "Go All-Star",
      popular: false,
    },
  ];

  // Bonus rounds
  const bonusRounds = [
    {
      title: "Head-to-Head",
      description: "Choose one song to outperform another in 24 hours",
      icon: Zap,
      timeLeft: "18h",
      color: "from-primary to-purple-600",
    },
    {
      title: "Genre Surge",
      description: "Pick which genre gains the most votes",
      icon: TrendingUp,
      timeLeft: "2d",
      color: "from-purple-600 to-secondary",
    },
    {
      title: "Wildcard Pick",
      description: "Guess one underdog to enter Top 20",
      icon: Star,
      timeLeft: "1d 6h",
      color: "from-secondary to-accent",
    },
    {
      title: "Streak Booster",
      description: "Maintain daily login streak for multipliers",
      icon: Flame,
      timeLeft: "Ongoing",
      color: "from-accent to-primary",
    },
  ];

  // Mini-games
  const miniGames = [
    {
      title: "Guess the Trend",
      description: "Predict biggest gainer today",
      icon: TrendingUp,
      points: "+50 XP",
    },
    {
      title: "Flash Pick",
      description: "10-minute rapid contest",
      icon: Zap,
      points: "+25 XP",
    },
    {
      title: "Trivia Tuesday",
      description: "Quick music trivia",
      icon: Star,
      points: "+100 XP",
    },
    {
      title: "Fan Streaks",
      description: "Consecutive login bonuses",
      icon: Flame,
      points: "Multiplier",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden lg:pt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&h=1080&fit=crop"
            alt="Live concert"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b3d]/90 via-[#7e1fff]/80 to-[#ff1f70]/90" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Particles */}
        <div className="particles">
          {PARTICLES.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Headline - Responsive sizing */}
            <h1 className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-6 tracking-tighter leading-tight lg:leading-[0.9] break-words">
              <span className="gradient-text inline-block">
                Stock Up on Sound.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="w-full text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 max-w-3xl mx-auto tracking-tight px-2">
              The world's first fantasy league for music.
            </p>

            {/* Buttons - 24px gap on mobile */}
            <div className="w-full flex flex-col sm:flex-row gap-6 justify-center mb-6 px-4 sm:px-0">
              <Button
                size="lg"
                onClick={() => onNavigate("fan-signin")}
                className="gradient-bg hover:opacity-90 neon-glow holo-button px-8 lg:px-10 py-6 lg:py-7 rounded-xl w-full sm:w-auto min-h-[56px]"
              >
                <span className="text-base lg:text-lg">Join the League</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("artist-signin")}
                className="border-accent/50 text-accent hover:bg-accent/20 hover:border-accent hover:text-white neon-glow px-8 lg:px-10 py-6 lg:py-7 rounded-xl transition-all w-full sm:w-auto min-h-[56px]"
              >
                <span className="text-base lg:text-lg">Submit Your Track</span>
              </Button>
            </div>

            {/* Animated Ticker */}
            <div className="w-full glass-card rounded-2xl p-3 lg:p-4 overflow-hidden neon-glow mb-6 max-w-4xl">
              <div className="relative overflow-hidden">
                <div className="flex gap-4 lg:gap-6 ticker-animation whitespace-nowrap">
                  {[...tickerItems, ...tickerItems, ...tickerItems].map(
                    (item, index) => (
                      <span
                        key={index}
                        className="text-xs lg:text-sm text-white/80"
                      >
                        {item} •
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Short Explainer */}
            <p className="text-base lg:text-lg text-white/70 tracking-tight">
              Pick artists. Compete. Earn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Weekly Timeline */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 lg:mb-4 gradient-text tracking-tighter">
              The Weekly Cycle
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              7 days. 100 tracks. Infinite possibilities.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-white/10 hidden md:block">
              <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent w-2/7" />
            </div>

            {/* Timeline nodes */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-2">
              {timelineNodes.map((node, index) => {
                const Icon = node.icon;
                return (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative cursor-pointer group"
                      >
                        <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all neon-glow">
                          <div
                            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                              node.status === "complete"
                                ? "bg-green-500/20"
                                : node.status === "active"
                                  ? "bg-accent/20 ring-2 ring-accent glow-pulse"
                                  : "bg-white/10"
                            }`}
                          >
                            <Icon
                              className={`w-8 h-8 ${
                                node.status === "complete"
                                  ? "text-green-500"
                                  : node.status === "active"
                                    ? "text-accent"
                                    : "text-white/50"
                              }`}
                            />
                          </div>
                          <p className="text-xs text-accent mb-2">{node.day}</p>
                          <p className="text-sm text-white">{node.title}</p>
                        </div>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="glass-card border border-primary/20">
                      <DialogHeader>
                        <DialogTitle className="gradient-text">
                          {node.day}: {node.title}
                        </DialogTitle>
                        <DialogDescription className="text-white/70 pt-4">
                          {node.description}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl mb-4 gradient-text tracking-tighter">
              Choose Your Tier
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free. Upgrade anytime. Cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {subscriptionTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass-card p-8 rounded-2xl hover:scale-105 transition-all neon-glow ${
                  tier.popular ? "border-2 border-accent" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent text-black px-4 py-1 rounded-full text-xs uppercase tracking-wider">
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center`}
                >
                  <Trophy className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl text-white text-center mb-2">
                  {tier.name}
                </h3>
                <div className="text-center mb-6">
                  <span className="text-4xl gradient-text">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-white/80"
                    >
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onNavigate("fan-signin")}
                  className={`w-full ${tier.popular ? "gradient-bg" : "bg-white/10"} hover:opacity-90`}
                >
                  {tier.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Pool Breakdown */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 lg:mb-4 gradient-text tracking-tighter">
              Prize Pool Distribution
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Transparent. Fair. Weekly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Circle Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto relative">
                <svg viewBox="0 0 200 200" className="transform -rotate-90">
                  {/* Artists 40% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="30"
                    strokeDasharray="201 503"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                  {/* Fans 30% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="30"
                    strokeDasharray="151 503"
                    strokeDashoffset="-201"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                  {/* Platform 20% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#gradient3)"
                    strokeWidth="30"
                    strokeDasharray="100 503"
                    strokeDashoffset="-352"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                  {/* Bonus 10% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#gradient4)"
                    strokeWidth="30"
                    strokeDasharray="50 503"
                    strokeDashoffset="-452"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                  <defs>
                    <linearGradient
                      id="gradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#7e1fff" />
                      <stop offset="100%" stopColor="#9d4edd" />
                    </linearGradient>
                    <linearGradient
                      id="gradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#ff1f70" />
                      <stop offset="100%" stopColor="#ff6ec7" />
                    </linearGradient>
                    <linearGradient
                      id="gradient3"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#00ffd5" />
                      <stop offset="100%" stopColor="#00ccaa" />
                    </linearGradient>
                    <linearGradient
                      id="gradient4"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#ffd700" />
                      <stop offset="100%" stopColor="#ffed4e" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl gradient-text">$212K</div>
                    <div className="text-sm text-muted-foreground">
                      This Week
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Breakdown List */}
            <div className="space-y-4">
              {[
                {
                  label: "Artists Pool",
                  value: "40%",
                  description: "Top 10 ranked descending",
                  color: "primary",
                },
                {
                  label: "Fan Share",
                  value: "30%",
                  description: "Top 10 lineups ranked",
                  color: "secondary",
                },
                {
                  label: "Platform",
                  value: "20%",
                  description: "Operations + weekly rewards",
                  color: "accent",
                },
                {
                  label: "Bonus Pool",
                  value: "10%",
                  description: "Special events & jackpots",
                  color: "yellow-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-4 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-white">{item.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-2xl gradient-text">{item.value}</span>
                  </div>
                </motion.div>
              ))}

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-primary/40 text-white hover:bg-primary/20"
                  >
                    How Prize Points Work
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border border-primary/20 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="gradient-text">
                      How Prize Points Work
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-white/80">
                    <div>
                      <h4 className="text-white mb-2">Points Formula:</h4>
                      <p className="text-sm">
                        Points = Lineup Performance + Fan Streaks + Mini-Game
                        Wins
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Cash Conversion:</h4>
                      <p className="text-sm">
                        Cash = (Your Points ÷ Total Points) × Pool Share
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Payout Schedule:</h4>
                      <p className="text-sm">
                        Every Friday 10 AM ET, automatically to your wallet
                      </p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <h4 className="text-accent mb-2">Example:</h4>
                      <p className="text-sm">
                        1,000 points out of 50,000 total = 2% of fan pool
                      </p>
                      <p className="text-sm">
                        2% of $63,600 fan pool = $1,272 payout
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Rounds */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 lg:mb-4 gradient-text tracking-tighter">
              Bonus Rounds
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Tuesday specials for extra rewards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bonusRounds.map((round, index) => {
              const Icon = round.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flip-card h-64"
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front glass-card rounded-2xl p-6 neon-glow">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${round.color} flex items-center justify-center`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg text-white text-center mb-2">
                        {round.title}
                      </h3>
                      <p className="text-sm text-muted-foreground text-center mb-4">
                        {round.description}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-xs text-accent">
                        <Clock className="w-3 h-3" />
                        <span>{round.timeLeft}</span>
                      </div>
                    </div>
                    <div className="flip-card-back glass-card rounded-2xl p-6 neon-glow flex items-center justify-center">
                      <Button
                        onClick={() => onNavigate("weekly-games")}
                        className="gradient-bg hover:opacity-90"
                      >
                        Enter Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Daily Mini-Games */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 lg:mb-4 gradient-text tracking-tighter">
              Daily Mini-Games
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Stay engaged. Earn XP. Climb the ranks.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {miniGames.map((game, index) => {
              const Icon = game.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-6 rounded-2xl hover:scale-105 transition-all neon-glow cursor-pointer group"
                  onClick={() => onNavigate("weekly-games")}
                >
                  <Icon className="w-8 h-8 text-accent mx-auto mb-3 group-hover:animate-pulse" />
                  <h4 className="text-sm text-white text-center mb-2">
                    {game.title}
                  </h4>
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    {game.description}
                  </p>
                  <div className="text-xs text-accent text-center">
                    {game.points}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 lg:mb-4 gradient-text tracking-tighter">
              Why Join the League?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: DollarSign,
                title: "Win Cash Weekly",
                description:
                  "Real money payouts every Friday. Top performers share prize pools.",
                gradient: "from-primary to-purple-600",
              },
              {
                icon: Music,
                title: "Support Real Artists",
                description:
                  "Your picks help emerging artists get discovered and earn money.",
                gradient: "from-purple-600 to-secondary",
              },
              {
                icon: Users,
                title: "Compete Worldwide",
                description:
                  "Join thousands of music fans in the ultimate skill-based competition.",
                gradient: "from-secondary to-accent",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-all neon-glow"
                >
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center glass-card p-8 rounded-2xl"
          >
            <p className="text-2xl text-white mb-2">
              Over <span className="gradient-text">5,000 artists</span>{" "}
              competing.
            </p>
            <p className="text-2xl text-white">
              <span className="gradient-text">25,000 weekly players</span>{" "}
              earning rewards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-sm text-muted-foreground text-center mb-4">
              Featured by
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                "Billboard",
                "TechCrunch",
                "Music Business Worldwide",
                "Rolling Stone",
                "Pitchfork",
              ].map((brand, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="text-white/40 hover:text-white/80 transition-colors cursor-pointer"
                >
                  <span className="text-lg">{brand}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 lg:mb-6 gradient-text">
              Ready to Join the League?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8">
              Start free. Compete weekly. Earn rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate("fan-signin")}
                className="gradient-bg hover:opacity-90 glow-pulse px-8 lg:px-12 py-5 lg:py-6 min-h-[56px]"
              >
                Join Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("weekly-games")}
                className="border-primary/40 text-white hover:bg-primary/20 px-12 py-6"
              >
                Explore Games
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
