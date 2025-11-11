"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  BookOpen,
  Users,
  Music,
  Shield,
  TrendingUp,
  DollarSign,
  Trophy,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface RulesPageProps {}

export function RulesPage({}: RulesPageProps) {
  const router = useRouter();
  return (
    <div className="min-h-screen pb-32">
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-black to-black" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-accent" />
              <span className="text-xs text-accent tracking-widest uppercase">
                The Rules
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 gradient-text tracking-tighter">
              How Fholio Works
            </h1>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto tracking-tight">
              No bets. Just brilliance. Skill-based music competition for fans
              and artists.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="fans" className="w-full">
            <TabsList className="glass-card border-primary/20 w-full max-w-md mx-auto mb-12">
              <TabsTrigger value="fans" className="flex-1">
                <Users className="w-4 h-4 mr-2" />
                For Fans
              </TabsTrigger>
              <TabsTrigger value="artists" className="flex-1">
                <Music className="w-4 h-4 mr-2" />
                For Artists
              </TabsTrigger>
            </TabsList>

            {/* Fan Rules */}
            <TabsContent value="fans">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Weekly Cycle */}
                <div className="glass-card rounded-2xl p-8 neon-glow">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-white mb-2 tracking-tight">
                        The Weekly Cycle
                      </h2>
                      <p className="text-muted-foreground/70">
                        Fholio operates on a weekly competition schedule
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="pl-16">
                      <div className="glass-card rounded-xl p-6 border border-primary/20">
                        <h3 className="text-lg text-white mb-3">
                          1. Vote Room (Mon-Wed)
                        </h3>
                        <p className="text-muted-foreground/80 mb-4">
                          Artists submit tracks. Fans vote to determine which
                          tracks make the Top 100 Draft Pool.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground/70">
                          <li>• 10 votes per day per fan</li>
                          <li>• Earn XP with every vote</li>
                          <li>• Help discover emerging talent</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pl-16">
                      <div className="glass-card rounded-xl p-6 border border-primary/20">
                        <h3 className="text-lg text-white mb-3">
                          2. Draft (Thu-Fri)
                        </h3>
                        <p className="text-muted-foreground/80 mb-4">
                          Top 100 tracks are locked. Build your lineup of up to
                          5 tracks.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground/70">
                          <li>• Pick up to 5 tracks from the Top 100</li>
                          <li>• Mix Major and Minor League artists</li>
                          <li>• Lineups lock Friday 6:00 PM ET</li>
                          <li>• Early picks get small multiplier bonus</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pl-16">
                      <div className="glass-card rounded-xl p-6 border border-primary/20">
                        <h3 className="text-lg text-white mb-3">
                          3. Live Week (Sat-Sun)
                        </h3>
                        <p className="text-muted-foreground/80 mb-4">
                          Track your lineup's momentum signals. No rankings
                          revealed during competition.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground/70">
                          <li>
                            • Momentum indicators only (On Fire, Rising, Steady,
                            Cooling)
                          </li>
                          <li>• See how many fans picked after you</li>
                          <li>• Share and discuss with community</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pl-16">
                      <div className="glass-card rounded-xl p-6 border border-accent/30">
                        <h3 className="text-lg text-white mb-3">
                          4. Results Reveal (Sun 8PM ET)
                        </h3>
                        <p className="text-muted-foreground/80 mb-4">
                          Top 20 winners announced. Fan shares distributed
                          automatically.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground/70">
                          <li>• Top 20 artists split prize pool</li>
                          <li>
                            • 15% of each artist's winnings → fan share pool
                          </li>
                          <li>• Distributed to fans who picked that artist</li>
                          <li>
                            • Underdog bonus for outside Top 20 entries that
                            finish high
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rewards System */}
                <div className="glass-card rounded-2xl p-8 neon-glow">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-white mb-2 tracking-tight">
                        Fan Share Rewards
                      </h2>
                      <p className="text-muted-foreground/70">
                        Skill-based rewards — not gambling
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-muted-foreground/80">
                    <p>
                      When an artist in your lineup finishes Top 20, you earn a
                      share of their fan pool. The fan share is 15% of the
                      artist's prize, divided among all fans who picked that
                      artist.
                    </p>
                    <p>
                      <strong className="text-white">Example:</strong> If an
                      artist wins $5,000 and 100 fans picked them, the fan share
                      pool is $750. Each fan receives $7.50.
                    </p>
                    <div className="glass-card rounded-lg p-4 border border-accent/20">
                      <p className="text-sm text-accent mb-2">Underdog Bonus</p>
                      <p className="text-sm">
                        Tracks ranked 21-100 in draft that finish Top 20 earn
                        fans a 2x-5x multiplier on rewards. Find the hidden
                        gems!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legal Framework */}
                <div className="glass-card rounded-2xl p-8 neon-glow border border-yellow-500/20">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-white mb-2 tracking-tight">
                        Legal & Fair Play
                      </h2>
                      <p className="text-muted-foreground/70">
                        Fholio is skill-based membership, not gambling
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-muted-foreground/80">
                    <p>
                      <strong className="text-white">No entry fees:</strong>{" "}
                      Free to join, vote, and compete.
                    </p>
                    <p>
                      <strong className="text-white">Skill-based:</strong>{" "}
                      Rewards based on research, discovery, and lineup strategy.
                    </p>
                    <p>
                      <strong className="text-white">
                        Transparent scoring:
                      </strong>{" "}
                      Performance metrics from real streaming, social
                      engagement, and fan activity.
                    </p>
                    <p>
                      <strong className="text-white">Fan shares:</strong>{" "}
                      Rewards come from prize pool allocation, not wagers.
                    </p>
                    <div className="glass-card rounded-lg p-4 bg-yellow-500/5 border border-yellow-500/20 mt-4">
                      <AlertCircle className="w-4 h-4 text-yellow-500 inline mr-2" />
                      <span className="text-xs text-yellow-500">
                        Fholio is not intended for collecting PII or securing
                        sensitive financial data. Rewards are for entertainment
                        and artist discovery purposes.
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Artist Rules */}
            <TabsContent value="artists">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Participation */}
                <div className="glass-card rounded-2xl p-8 neon-glow">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-white mb-2 tracking-tight">
                        Artist Participation
                      </h2>
                      <p className="text-muted-foreground/70">
                        How to compete on Fholio
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-muted-foreground/80">
                    <div className="glass-card rounded-xl p-6 border border-primary/20">
                      <h3 className="text-lg text-white mb-3">Eligibility</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• One active track per week</li>
                        <li>
                          • Must connect verified Spotify, YouTube, or TikTok
                          account
                        </li>
                        <li>
                          • Auto-assigned to Major or Minor League (see League
                          Tiers)
                        </li>
                        <li>
                          • Can submit same track multiple weeks (decay applies)
                        </li>
                      </ul>
                    </div>

                    <div className="glass-card rounded-xl p-6 border border-primary/20">
                      <h3 className="text-lg text-white mb-3">Track Decay</h3>
                      <p className="text-sm mb-3">
                        Tracks can run multiple weeks, but performance scoring
                        applies a 10-15% decay factor each consecutive week to
                        encourage fresh content.
                      </p>
                      <p className="text-sm text-accent">
                        Week 1: 100% scoring • Week 2: 85-90% • Week 3: 70-80%
                      </p>
                    </div>

                    <div className="glass-card rounded-xl p-6 border border-primary/20">
                      <h3 className="text-lg text-white mb-3">
                        Scoring Metrics
                      </h3>
                      <p className="text-sm mb-3">
                        Performance index calculated from:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li>• Spotify streams (% change week-over-week)</li>
                        <li>• YouTube views and engagement</li>
                        <li>• TikTok usage and virality</li>
                        <li>• Instagram/Twitter mentions and shares</li>
                        <li>• Fan votes in Fholio Vote Room</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Payouts */}
                <div className="glass-card rounded-2xl p-8 neon-glow">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-white mb-2 tracking-tight">
                        Prizes & Payouts
                      </h2>
                      <p className="text-muted-foreground/70">
                        Transparent reward structure
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-muted-foreground/80">
                    <p>
                      Top 20 tracks each week split the prize pool based on
                      their final ranking and performance score.
                    </p>
                    <div className="glass-card rounded-xl p-6 border border-accent/20">
                      <p className="text-sm mb-3">
                        <strong className="text-white">Artist Prize:</strong>{" "}
                        85% of allocated winnings
                      </p>
                      <p className="text-sm mb-3">
                        <strong className="text-white">Fan Share:</strong> 15%
                        distributed to fans who picked that artist
                      </p>
                      <p className="text-xs text-muted-foreground/60">
                        Example: #1 wins $10,000 → Artist receives $8,500, fans
                        split $1,500
                      </p>
                    </div>
                    <div className="glass-card rounded-lg p-4 bg-primary/5 border border-primary/20">
                      <p className="text-sm">
                        <strong className="text-white">
                          Payment Schedule:
                        </strong>{" "}
                        Payouts processed within 7 business days after week
                        close. KYC verification required for all payouts.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fair Play */}
                <div className="glass-card rounded-2xl p-8 neon-glow border border-yellow-500/20">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-white mb-2 tracking-tight">
                        Anti-Fraud & Fair Play
                      </h2>
                      <p className="text-muted-foreground/70">
                        Keep the competition legitimate
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-muted-foreground/80">
                    <p>
                      <strong className="text-white">No fake streams:</strong>{" "}
                      Bot activity, fake plays, or purchased engagement will
                      result in immediate disqualification and potential ban.
                    </p>
                    <p>
                      <strong className="text-white">Verified accounts:</strong>{" "}
                      All artist accounts must be verified through official
                      platform APIs.
                    </p>
                    <p>
                      <strong className="text-white">Monitoring:</strong>{" "}
                      Automated and manual review of unusual activity patterns.
                    </p>
                    <div className="glass-card rounded-lg p-4 bg-red-500/5 border border-red-500/20 mt-4">
                      <AlertCircle className="w-4 h-4 text-red-500 inline mr-2" />
                      <span className="text-xs text-red-500">
                        Violations result in forfeiture of prizes, removal from
                        platform, and potential legal action.
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button
              onClick={() => router.push("/leagues")}
              className="gradient-bg neon-glow holo-button text-lg px-8 py-6"
            >
              Learn About League Tiers
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
