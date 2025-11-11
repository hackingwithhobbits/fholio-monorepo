import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Trophy,
  Zap,
  DollarSign,
  Settings,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import { ArtistCard } from "./ArtistCard";
import { artists } from "../data/mockData";
import { useState, useEffect } from "react";

interface MobileHomePageProps {}

export function MobileHomePage({}: MobileHomePageProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const router = useRouter();
  // Prize pool constants
  const WEEKLY_PRIZE_POOL = 100000;

  const calculatePrizeMoney = (rank: number): number => {
    if (rank > 100) return 0;
    const normalizedRank = rank / 100;
    const decayFactor = Math.pow(1 - normalizedRank, 2.5);
    const totalWeights = Array.from({ length: 100 }, (_, i) => {
      const pos = (i + 1) / 100;
      return Math.pow(1 - pos, 2.5);
    }).reduce((sum, weight) => sum + weight, 0);
    const individualPrize = (decayFactor / totalWeights) * WEEKLY_PRIZE_POOL;
    return Math.round(individualPrize);
  };

  const phases = [
    {
      id: "vote",
      icon: Play,
      title: "Vote",
      subtitle: "Discover & Upvote",
      description: "Shape the Top 100 with your taste",
      color: "from-primary to-purple-600",
      action: () => router.push("/vote"),
    },
    {
      id: "draft",
      icon: Zap,
      title: "Draft",
      subtitle: "Build Your Lineup",
      description: "Pick 5 artists you believe in",
      color: "from-purple-600 to-secondary",
      action: () => router.push("/draft"),
    },
    {
      id: "live",
      icon: TrendingUp,
      title: "Track",
      subtitle: "Watch the Heat",
      description: "Follow momentum all week long",
      color: "from-secondary to-pink-600",
      action: () => router.push("/liveweek"),
    },
    {
      id: "results",
      icon: Trophy,
      title: "Reveal",
      subtitle: "Winners Crowned",
      description: "Earn rewards when your picks win",
      color: "from-pink-600 to-accent",
      action: () => router.push("/results"),
    },
  ];

  // Auto-rotate phases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Mobile Header with Logo */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-safe">
        <div className="flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-xl border-b border-primary/10">
          <div className="w-10" /> {/* Spacer for centering */}
          <Logo size="md" glow />
          <button
            onClick={() => router.push("/settings")}
            className="p-2 text-white hover:text-primary transition-colors duration-300"
            aria-label="Settings"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Hero Section - Optimized for mobile */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden pt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1727425863432-c31c4e764472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBhcnRpc3QlMjBzdGFnZXxlbnwxfHx8fDE3NjE4NTU4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Concert crowd"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        </div>

        {/* Particles */}
        <div className="particles">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 text-center max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Title */}
            <h1 className="text-5xl tracking-tighter leading-[1.1]">
              <span className="gradient-text block">The Fantasy League</span>
              <span className="gradient-text block">for Music</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl text-white/90 tracking-tight">
              Pick 5 Artists. Watch Them Rise.
              <br />
              When They Win, You Earn.
            </p>

            <p className="text-base text-muted-foreground">
              Your Fandom. Your Fortune.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-4">
              <Button
                size="lg"
                onClick={() => router.push("/vote")}
                className="w-full gradient-bg hover:opacity-90 neon-glow text-base py-6 rounded-2xl"
              >
                Join the League
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/discover")}
                className="w-full border-primary/30 text-white hover:bg-primary/20 hover:border-primary/50 hover:text-white text-base py-6 rounded-2xl transition-all"
              >
                Discover Artists
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs"
        >
          Swipe to explore
        </motion.div>
      </section>

      {/* This Week Ticker */}
      <section className="py-6 border-y border-primary/10 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 text-sm text-white/70 whitespace-nowrap"
          >
            <span>🔥 This Week on Fholio</span>
            <span>•</span>
            <span>327 Artists Competing</span>
            <span>•</span>
            <span>$50K Prize Pool</span>
            <span>•</span>
            <span>Vote Closes in 2d 14h</span>
            <span>•</span>
            <span>🔥 This Week on Fholio</span>
            <span>•</span>
            <span>327 Artists Competing</span>
            <span>•</span>
            <span>$50K Prize Pool</span>
          </motion.div>
        </div>
      </section>

      {/* 4-Phase Carousel - Swipeable */}
      <section className="py-12 px-6">
        <h2 className="text-center text-white mb-8">How It Works</h2>

        {/* Phase Cards - Horizontal Scroll */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide -mx-6 px-6">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = currentPhase === index;

              return (
                <motion.div
                  key={phase.id}
                  className={`flex-shrink-0 w-[85vw] max-w-sm snap-center ${
                    isActive ? "scale-100" : "scale-95"
                  } transition-transform duration-300`}
                  onClick={() => setCurrentPhase(index)}
                >
                  <div
                    className={`glass-card p-6 rounded-3xl h-full bg-gradient-to-br ${phase.color} bg-opacity-5`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2 mb-6">
                      <div className="text-sm text-muted-foreground">
                        {phase.subtitle}
                      </div>
                      <h3 className="text-white text-2xl">{phase.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {phase.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <Button
                      variant="outline"
                      onClick={phase.action}
                      className="w-full border-white/20 hover:bg-white/10"
                    >
                      Explore {phase.title}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {phases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhase(index)}
                className={`h-2 rounded-full transition-all ${
                  currentPhase === index
                    ? "w-8 bg-gradient-to-r from-primary to-secondary"
                    : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-6 py-12">
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="text-2xl gradient-text mb-1">327</div>
            <div className="text-xs text-muted-foreground">Artists</div>
          </div>
          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="text-2xl gradient-text mb-1">$50K</div>
            <div className="text-xs text-muted-foreground">This Week</div>
          </div>
          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="text-2xl gradient-text mb-1">12.5K</div>
            <div className="text-xs text-muted-foreground">Fans</div>
          </div>
        </div>
      </section>

      {/* The Power of the Fan Pool */}
      <section className="px-6 py-12 bg-gradient-to-b from-black via-primary/5 to-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl gradient-text mb-3">
            The Power of the Fan Pool
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every member's monthly fee fuels the weekly prize pool. Top 100
            artists win—and each winning artist shares 15% of their rewards with
            fans who picked them.
          </p>
        </motion.div>

        {/* Prize Pool Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-3xl text-center mb-6 bg-gradient-to-br from-primary/10 to-secondary/10"
        >
          <Trophy className="w-16 h-16 mx-auto mb-4 text-accent" />
          <div className="text-4xl mb-2 gradient-text">
            ${(WEEKLY_PRIZE_POOL / 1000).toFixed(0)}K
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            This Week's Fan Pool
          </p>

          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-xs text-muted-foreground">
                12,847 active members
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
              <span className="text-xs text-muted-foreground">
                Rank #1 wins ${calculatePrizeMoney(1).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
              <span className="text-xs text-muted-foreground">
                Top 100 artists share prize pool
              </span>
            </div>
          </div>
        </motion.div>

        {/* Pool Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          {[
            { label: "Artist Pool", value: "60%", color: "primary" },
            { label: "Fan Share", value: "15%", color: "accent" },
            { label: "Platform", value: "20%", color: "secondary" },
            { label: "Bonus Events", value: "5%", color: "purple-500" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="glass-card p-4 rounded-2xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">{item.label}</span>
                <span className="text-accent">{item.value}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: item.value }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* See Who's Rising */}
      <section className="px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl gradient-text mb-3">See Who's Rising</h2>
          <p className="text-sm text-muted-foreground">
            Real-time artist performance updated daily
          </p>
        </motion.div>

        {/* Artist Cards Grid */}
        <div className="space-y-4 mb-6">
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
                onClick={() => router.push("/artist")}
              />
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <Button
          onClick={() => router.push("/dashboard")}
          variant="outline"
          className="w-full border-primary/30 text-white hover:bg-primary/10 py-6 rounded-2xl"
        >
          View Full Leaderboard
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-12">
        <div className="glass-card p-8 rounded-3xl text-center bg-gradient-to-br from-primary/10 to-secondary/10">
          <h3 className="text-white mb-3">Your Fandom. Your Fortune.</h3>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            Join thousands of fans building music portfolios and earning real
            rewards.
          </p>
          <Button
            onClick={() => router.push("/vote")}
            className="w-full gradient-bg py-6 rounded-2xl"
          >
            Start Voting Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
