import { useState } from "react";
import { motion } from "framer-motion";
import {
  Music,
  TrendingUp,
  Trophy,
  DollarSign,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Target,
  Award,
  Calendar,
  Clock,
  Zap,
  Shield,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-black lg:pt-16">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block glass-card px-4 py-2 rounded-full mb-6">
              <span className="text-sm text-accent tracking-wider uppercase">
                About Fholio
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-4 lg:mb-6 gradient-text tracking-tighter leading-tight">
              The Fantasy League for Music.
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Fholio turns music discovery into a weekly competition. Fans pick
              the artists they think will perform best, earn points based on
              streams and votes, and share cash payouts when their lineup wins.
              Artists upload tracks, gain exposure, and earn from the same pool.{" "}
              <span className="text-accent">
                Everyone wins when the music moves.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Loop Diagram */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Fan */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl text-white mb-2">Fans</h3>
                <p className="text-sm text-muted-foreground">
                  Pick artists, vote on tracks, compete weekly
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center items-center">
                <ArrowRight className="w-8 h-8 text-accent" />
              </div>

              {/* Artist */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Music className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl text-white mb-2">Artists</h3>
                <p className="text-sm text-muted-foreground">
                  Upload music, gain fans, earn rewards
                </p>
              </div>

              {/* Arrow back */}
              <div className="md:col-span-3 flex justify-center my-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-primary" />
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center glow-pulse">
                    <DollarSign className="w-10 h-10 text-white" />
                  </div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent" />
                </div>
              </div>

              {/* Prize Pool */}
              <div className="md:col-span-3 text-center">
                <h3 className="text-xl text-white mb-2">Prize Pool</h3>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  Weekly payouts distributed to top performers. Artists earn
                  from fan engagement. Fans earn from picking winners. The
                  better the music performs, the more everyone earns.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Step by Step */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 gradient-text tracking-tighter">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              From sign-up to payout in 6 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Join Free or Upgrade",
                description:
                  "Start with a free account or choose Pro ($10) or All-Star ($20) to compete for prizes",
                icon: Users,
                color: "from-primary to-purple-600",
              },
              {
                step: "2",
                title: "100 Tracks Drop Friday",
                description:
                  "Every Friday at midnight, 100 brand new tracks go live and voting begins",
                icon: Music,
                color: "from-purple-600 to-secondary",
              },
              {
                step: "3",
                title: "Vote & Pick Lineup",
                description:
                  "Vote on your favorites all weekend, then Monday draft your 5-artist lineup",
                icon: Target,
                color: "from-secondary to-accent",
              },
              {
                step: "4",
                title: "Watch Rankings Shift",
                description:
                  "Track your lineup performance as votes and engagement data updates daily",
                icon: TrendingUp,
                color: "from-accent to-primary",
              },
              {
                step: "5",
                title: "Thursday Night Live",
                description:
                  "Tune in at 7 PM ET for the live reveal of Top 10 artists and fan winners",
                icon: Trophy,
                color: "from-primary to-purple-600",
              },
              {
                step: "6",
                title: "Get Paid Friday",
                description:
                  "Winners receive payouts automatically at 10 AM ET every Friday",
                icon: DollarSign,
                color: "from-secondary to-accent",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl hover:scale-105 transition-all neon-glow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-accent mb-1">
                        Step {item.step}
                      </div>
                      <h3 className="text-lg text-white mb-2">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why It Exists */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-2xl text-center neon-glow"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent" />
            <blockquote className="text-3xl md:text-4xl text-white mb-6 tracking-tight leading-tight">
              "Fholio gives power back to the people who make and love music."
            </blockquote>
            <div className="space-y-4 text-lg text-white/80 max-w-2xl mx-auto">
              <p>
                Our mission is to transform fans into{" "}
                <span className="text-accent">investors in culture</span>. Every
                vote matters. Every pick counts. Your taste can earn you real
                rewards.
              </p>
              <p>
                For artists, Fholio is a{" "}
                <span className="text-primary">fair playing field</span> where
                engagement translates directly to earnings—no record label
                required.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payout Model Recap */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 gradient-text tracking-tighter">
              Payout Model
            </h2>
            <p className="text-xl text-muted-foreground">
              Transparent. Fair. Weekly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Pie Chart */}
            <div className="relative max-w-md mx-auto">
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
                  className="hover:opacity-80 transition-opacity"
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
                  className="hover:opacity-80 transition-opacity"
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
                  className="hover:opacity-80 transition-opacity"
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
                  className="hover:opacity-80 transition-opacity"
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
                  <div className="text-3xl gradient-text">100%</div>
                  <div className="text-sm text-muted-foreground">
                    Prize Pool
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-4">
              {[
                {
                  label: "Artists Pool",
                  value: "40%",
                  description: "Top 10 ranked descending",
                  icon: Music,
                  color: "from-primary to-purple-600",
                },
                {
                  label: "Fan Share",
                  value: "30%",
                  description: "Top 10 lineups ranked",
                  icon: Users,
                  color: "from-secondary to-accent",
                },
                {
                  label: "Platform",
                  value: "20%",
                  description: "Operations + weekly rewards",
                  icon: Shield,
                  color: "from-accent to-primary",
                },
                {
                  label: "Bonus Pool",
                  value: "10%",
                  description: "Special events & jackpots",
                  icon: Sparkles,
                  color: "from-yellow-500 to-amber-600",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 rounded-xl hover:scale-105 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-white">{item.label}</p>
                          <span className="text-xl gradient-text">
                            {item.value}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 gradient-text tracking-tighter">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-white hover:text-accent">
                  Is Fholio gambling?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No. Fholio is a skill-based fantasy model based on engagement
                  and data, not chance. Like fantasy sports, success depends on
                  your knowledge, research, and strategic picks—not random luck.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-white hover:text-accent">
                  How do payouts work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Each week the prize pool is divided based on performance
                  points. Your share = (your points ÷ total points) × pool
                  allocation. Winners are automatically paid every Friday at 10
                  AM ET directly to their Fholio wallet.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-white hover:text-accent">
                  Can artists join for free?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. Uploading tracks is completely free for artists. There
                  are no submission fees or membership costs. Earnings come from
                  the artist portion of the weekly prize pool when your track
                  performs well.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-white hover:text-accent">
                  Do I own any rights to the music?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No. You're backing performance, not ownership. Think of it as
                  fantasy sports for sound—you don't own the football team, but
                  you can earn rewards when your picks perform well. Artists
                  retain all rights to their music.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-white hover:text-accent">
                  How are points calculated?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Points are based on multiple engagement factors: total votes
                  received, streaming data, fan activity, bonus round
                  performance, and weekly streaks. The algorithm is designed to
                  reward both artist popularity and strategic fan picks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-white hover:text-accent">
                  Can I withdraw my earnings?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, instantly through your Wallet page. We support multiple
                  withdrawal methods including bank transfer, PayPal, and
                  crypto. Minimum withdrawal is $10, and funds typically arrive
                  within 1-3 business days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-7"
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-white hover:text-accent">
                  What happens if I miss a week?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No problem! Each week is independent. You can jump back in
                  anytime. However, maintaining a streak of consecutive weeks
                  does earn you bonus multipliers, so staying active helps
                  maximize your earnings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-8"
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-white hover:text-accent">
                  Is Fholio available worldwide?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We're currently available in the US, Canada, UK, and
                  Australia, with plans to expand globally. Artists from
                  anywhere can submit music, but prize eligibility may vary by
                  region. Check our terms for details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Community & Press */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-secondary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 gradient-text tracking-tighter">
              What People Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                quote: "Fantasy sports meets the music industry.",
                source: "Billboard",
                icon: Star,
              },
              {
                quote: "Artists love how Fholio levels the playing field.",
                source: "TechCrunch",
                icon: Heart,
              },
              {
                quote: "The future of music discovery is here.",
                source: "Music Business Worldwide",
                icon: Sparkles,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-all"
                >
                  <Icon className="w-10 h-10 mx-auto mb-4 text-accent" />
                  <p className="text-lg text-white/90 mb-3 italic">
                    "{item.quote}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    — {item.source}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Press Logos */}
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
                "The Verge",
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-2xl text-center neon-glow"
          >
            <Trophy className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-4xl md:text-5xl mb-6 gradient-text tracking-tighter">
              Ready to Play?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of fans and artists competing weekly for real cash
              prizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate("fan-signin")}
                className="gradient-bg hover:opacity-90 glow-pulse px-12 py-6"
              >
                Join as Fan
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("artist-signin")}
                className="border-accent/50 text-accent hover:bg-accent/20 hover:border-accent px-12 py-6"
              >
                Submit as Artist
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
