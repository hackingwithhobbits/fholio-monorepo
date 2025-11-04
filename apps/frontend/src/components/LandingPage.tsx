import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Trophy,
  DollarSign,
  Music,
  Sparkles,
  Users,
  Zap,
  Target,
} from "lucide-react";
import { Button } from "./ui/button";
import { artists } from "../data/mockData";
import { ArtistCard } from "./ArtistCard";
import { Logo } from "./Logo";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const tickerArtists = [...artists, ...artists]; // Duplicate for infinite scroll effect

  // Prize pool distribution
  const WEEKLY_PRIZE_POOL = 100000; // $100k weekly pool

  // Calculate prize money based on rank (1-100)
  const calculatePrizeMoney = (rank: number): number => {
    if (rank > 100) return 0;

    // Exponential decay formula for prize distribution
    // Top ranks get significantly more
    const normalizedRank = rank / 100;
    const decayFactor = Math.pow(1 - normalizedRank, 2.5);

    // Calculate individual prize based on position
    // This creates a natural distribution where rank 1 gets ~8-10x more than rank 100
    const totalWeights = Array.from({ length: 100 }, (_, i) => {
      const pos = (i + 1) / 100;
      return Math.pow(1 - pos, 2.5);
    }).reduce((sum, weight) => sum + weight, 0);

    const individualPrize = (decayFactor / totalWeights) * WEEKLY_PRIZE_POOL;
    return Math.round(individualPrize);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Particles Background */}
        <div className="particles">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Background */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1727425863432-c31c4e764472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBhcnRpc3QlMjBzdGFnZXxlbnwxfHx8fDE3NjE4NTU4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Concert crowd and artist"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />

          {/* Animated gradient waves */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/3 left-0 w-full h-32 bg-gradient-to-r from-primary via-secondary to-primary shimmer" />
            <div
              className="absolute bottom-1/3 left-0 w-full h-32 bg-gradient-to-r from-secondary via-accent to-secondary shimmer"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-8xl mb-6 tracking-tighter leading-[0.9]">
              <span className="gradient-text">The Fantasy League</span>
              <br />
              <span className="gradient-text">for Music</span>
            </h1>
            <p className="text-xl md:text-3xl text-white/90 mb-4 max-w-3xl mx-auto font-light tracking-tight leading-relaxed">
              Pick 5 Artists. Watch Them Rise.
              <br />
              When They Win, You Earn.
            </p>
            <p className="text-lg text-muted-foreground/80 mb-8 tracking-tight">
              Your Fandom. Your Fortune.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate("vote")}
                className="gradient-bg hover:opacity-90 neon-glow holo-button text-lg px-10 py-7 rounded-xl"
              >
                Join the League
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("discover")}
                className="border-primary/30 text-white hover:bg-primary/20 hover:border-primary/50 hover:text-white neon-glow text-lg px-10 py-7 rounded-xl transition-all"
              >
                Discover Artists
              </Button>
            </div>
          </motion.div>

          {/* Live Stats Ticker */}
          <div className="mt-20 glass-card rounded-2xl p-6 overflow-hidden neon-glow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-sm text-accent tracking-widest uppercase">
                  Live This Week
                </span>
              </div>
              <span className="text-xs text-muted-foreground/50 tracking-wider">
                SKILL BEATS LUCK
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="glass-card px-4 py-3 rounded-lg">
                <div className="text-2xl gradient-text">$1,248,000</div>
                <div className="text-xs text-muted-foreground">Fan Pool</div>
              </div>
              <div className="glass-card px-4 py-3 rounded-lg">
                <div className="text-2xl text-primary">32</div>
                <div className="text-xs text-muted-foreground">Hot Streaks</div>
              </div>
              <div className="glass-card px-4 py-3 rounded-lg">
                <div className="text-2xl text-accent">18,234</div>
                <div className="text-xs text-muted-foreground">Members</div>
              </div>
              <div className="glass-card px-4 py-3 rounded-lg">
                <div className="text-2xl text-secondary">3,842</div>
                <div className="text-xs text-muted-foreground">
                  Lineups Created
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="flex gap-4 ticker-animation">
                {tickerArtists.map((artist, index) => {
                  const rank = (index % artists.length) + 1;
                  const prizeMoney = calculatePrizeMoney(rank);

                  return (
                    <div
                      key={`${artist.id}-${index}`}
                      className="flex items-center gap-3 glass-card px-4 py-2 rounded-lg whitespace-nowrap"
                    >
                      <span className="text-primary">#{rank}</span>
                      <span className="text-white">{artist.name}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {artist.genre}
                      </span>
                      <span className="text-accent flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {prizeMoney.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Step Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs text-accent mb-4 tracking-widest uppercase">
              The Weekly Cycle
            </div>
            <h2 className="text-5xl md:text-6xl mb-6 gradient-text tracking-tighter">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground/80 tracking-tight">
              Monday Draft → Friday Reveal → Saturday Payouts → Sunday Reset
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                title: "Build Your Fholio",
                description:
                  "Pick 5 artists. Mix rising stars and proven hits. Strategy beats luck.",
                gradient: "from-primary to-purple-600",
                step: "1",
              },
              {
                icon: TrendingUp,
                title: "Watch the Leaderboard",
                description:
                  "Track weekly performance. See who's rising. Real-time scores, no spoilers.",
                gradient: "from-purple-600 to-accent",
                step: "2",
              },
              {
                icon: DollarSign,
                title: "Earn Rewards",
                description:
                  "When your artists chart, you win. Fan shares distributed automatically every Saturday.",
                gradient: "from-accent to-secondary",
                step: "3",
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative group"
                >
                  <div className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-all neon-glow">
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm text-primary">{step.step}</span>
                    </div>
                    <div
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center group-hover:glow-pulse float-animation`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl mb-3 text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80">
                      {step.description}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-accent/50" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fan Pool Explainer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 gradient-text">
              The Power of the Fan Pool
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every member's monthly fee fuels the weekly prize pool. Top 100
              artists win—and each winning artist shares 15% of their rewards
              with fans who picked them.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  label: "Artist Pool",
                  value: "60%",
                  color: "primary",
                  description: "Direct to top 100 artists",
                },
                {
                  label: "Fan Share",
                  value: "15%",
                  color: "accent",
                  description: "Distributed to winning lineups",
                },
                {
                  label: "Platform",
                  value: "20%",
                  color: "secondary",
                  description: "Operations & development",
                },
                {
                  label: "Bonus Events",
                  value: "5%",
                  color: "purple-500",
                  description: "Jackpots & special prizes",
                },
              ].map((item, index) => (
                <div key={index} className="glass-card p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-white block">{item.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                    <span className={`text-${item.color} text-2xl`}>
                      {item.value}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.value }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r from-${item.color} to-${item.color}/50`}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl text-center"
            >
              <Trophy className="w-20 h-20 mx-auto mb-6 text-accent" />
              <div className="text-5xl mb-2 gradient-text">
                ${(WEEKLY_PRIZE_POOL / 1000).toFixed(0)}K
              </div>
              <p className="text-muted-foreground mb-6">This Week's Fan Pool</p>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">
                    12,847 active members
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm text-muted-foreground">
                    Rank #1 wins ${calculatePrizeMoney(1).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-sm text-muted-foreground">
                    Top 100 artists share prize pool
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Leaderboard Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 gradient-text">
              See Who's Rising
            </h2>
            <p className="text-xl text-muted-foreground">
              Real-time artist performance updated daily
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {artists.slice(0, 6).map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ArtistCard
                  artist={artist}
                  onClick={() => onNavigate("artist")}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => onNavigate("discover")}
              variant="outline"
              className="border-primary/40 text-white hover:bg-primary/20"
            >
              View All Artists
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 gradient-text">
              Join the League
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose your tier. Build your fandom. Earn rewards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl text-white">Standard</h3>
                  <div className="text-right">
                    <div className="text-3xl gradient-text">$10</div>
                    <div className="text-xs text-muted-foreground">/month</div>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>5-artist lineup</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Weekly voting power</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Fan share rewards</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Community access</span>
                  </li>
                </ul>
                <Button
                  onClick={() => onNavigate("leagues")}
                  className="w-full gradient-bg hover:opacity-90 neon-glow"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-all border-2 border-accent/50"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -top-2 -right-2">
                <div className="bg-accent text-black px-3 py-1 rounded-lg text-xs uppercase tracking-wider">
                  Popular
                </div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl text-white">Premium</h3>
                  <div className="text-right">
                    <div className="text-3xl gradient-text">$20</div>
                    <div className="text-xs text-muted-foreground">/month</div>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-white">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Everything in Standard</span>
                  </li>
                  <li className="flex items-center gap-2 text-white">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>2x voting power</span>
                  </li>
                  <li className="flex items-center gap-2 text-white">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Bonus jackpot entries</span>
                  </li>
                  <li className="flex items-center gap-2 text-white">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Early artist access</span>
                  </li>
                  <li className="flex items-center gap-2 text-white">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>VIP badge & perks</span>
                  </li>
                </ul>
                <Button
                  onClick={() => onNavigate("leagues")}
                  className="w-full bg-accent text-black hover:bg-accent/90 neon-glow"
                >
                  Go Premium
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Weekly Rewards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-2xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full filter blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary rounded-full filter blur-3xl" />
            </div>
            <div className="relative z-10">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h2 className="text-4xl mb-4 gradient-text">
                Discover. Draft. Dominate.
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Fans earn fan shares when their chosen artists make the charts.
                The more artists you back, the better your odds.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 rounded-xl">
                  <div className="text-3xl mb-2 text-accent">$127.50</div>
                  <p className="text-sm text-muted-foreground">
                    Avg. Weekly Payout
                  </p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <div className="text-3xl mb-2 text-primary">3.2x</div>
                  <p className="text-sm text-muted-foreground">
                    Avg. Return Multiple
                  </p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <div className="text-3xl mb-2 text-secondary">78%</div>
                  <p className="text-sm text-muted-foreground">
                    Win Rate (Premium Tier)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl mb-6 gradient-text">
              Join the Fantasy League for Music
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              $10 or $20/month membership. No betting, no gambling—just skill,
              taste, and fandom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                onClick={() => onNavigate("leagues")}
                className="gradient-bg hover:opacity-90 glow-pulse text-lg px-12 py-6"
              >
                Join Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("discover")}
                className="border-primary/40 text-white hover:bg-primary/20 text-lg px-12 py-6"
              >
                Explore Artists
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Skill Beats Luck • Fans Fuel the Future of Music
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
