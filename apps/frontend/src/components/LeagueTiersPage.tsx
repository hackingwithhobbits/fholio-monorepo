import { motion } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  Star,
  Award,
  Users,
  Music,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface LeagueTiersPageProps {
  onNavigate: (page: string) => void;
}

export function LeagueTiersPage({ onNavigate }: LeagueTiersPageProps) {
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
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-xs text-accent tracking-widest uppercase">
                Competition Structure
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 gradient-text tracking-tighter">
              League Tiers
            </h1>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto tracking-tight">
              Fair competition. Major and Minor Leagues ensure artists compete
              at their level.
            </p>
          </motion.div>
        </div>
      </section>

      {/* League Comparison */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Major League */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 neon-glow border border-primary/30"
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl text-white mb-3 tracking-tight">
                  Major League
                </h2>
                <Badge variant="default" className="text-lg px-4 py-1">
                  Premium Tier
                </Badge>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-white mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Eligibility
                  </h3>
                  <div className="glass-card rounded-lg p-4 border border-primary/20">
                    <p className="text-muted-foreground/80 mb-3">
                      Auto-assigned if artist meets either:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground/70">
                      <li>
                        • <strong className="text-white">&gt;100K</strong>{" "}
                        monthly Spotify listeners
                      </li>
                      <li className="text-white">OR</li>
                      <li>
                        • <strong className="text-white">&gt;20K</strong>{" "}
                        Instagram followers
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-white mb-3 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent" />
                    Prize Pool
                  </h3>
                  <div className="glass-card rounded-lg p-4 border border-accent/20">
                    <div className="text-3xl text-accent mb-2">$70K</div>
                    <p className="text-sm text-muted-foreground/70">
                      Typical weekly pool
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-white mb-3 flex items-center gap-2">
                    <Music className="w-5 h-5 text-secondary" />
                    Competition
                  </h3>
                  <div className="glass-card rounded-lg p-4 border border-secondary/20">
                    <p className="text-sm text-muted-foreground/80">
                      Higher stakes, more competitive. Established artists with
                      proven fan bases.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-white mb-3">Perks</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground/70">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Featured placement in Discover</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Priority in Vote Room spotlight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Larger fan share distributions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Cross-promotion opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Minor League */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 neon-glow border border-accent/30"
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl text-white mb-3 tracking-tight">
                  Minor League
                </h2>
                <Badge variant="secondary" className="text-lg px-4 py-1">
                  Rising Talent
                </Badge>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-white mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Eligibility
                  </h3>
                  <div className="glass-card rounded-lg p-4 border border-accent/20">
                    <p className="text-muted-foreground/80 mb-3">
                      Default tier if below Major thresholds:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground/70">
                      <li>
                        • <strong className="text-white">&lt;100K</strong>{" "}
                        monthly Spotify listeners
                      </li>
                      <li className="text-white">AND</li>
                      <li>
                        • <strong className="text-white">&lt;20K</strong>{" "}
                        Instagram followers
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-white mb-3 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Prize Pool
                  </h3>
                  <div className="glass-card rounded-lg p-4 border border-primary/20">
                    <div className="text-3xl text-primary mb-2">$30K</div>
                    <p className="text-sm text-muted-foreground/70">
                      Typical weekly pool
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-white mb-3 flex items-center gap-2">
                    <Music className="w-5 h-5 text-secondary" />
                    Competition
                  </h3>
                  <div className="glass-card rounded-lg p-4 border border-secondary/20">
                    <p className="text-sm text-muted-foreground/80">
                      Level playing field for emerging artists. Build your
                      fanbase and climb the ranks.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-white mb-3">Perks</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground/70">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>Fair competition at your level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>Featured in "Rising Talent" sections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>Underdog bonus multipliers for fans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>Path to Major League promotion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promotion Path */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 neon-glow"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl text-white mb-2 tracking-tight">
                  Promotion & Movement
                </h2>
                <p className="text-muted-foreground/70">
                  League tiers are dynamic, not permanent
                </p>
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground/80">
              <div className="glass-card rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg text-white mb-3">
                  Minor → Major Promotion
                </h3>
                <p className="text-sm mb-3">
                  Artists are automatically promoted to Major League when they
                  meet the eligibility criteria (100K+ Spotify listeners OR 20K+
                  Instagram followers).
                </p>
                <p className="text-sm text-accent">
                  Promotion takes effect the following week.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 border border-accent/20">
                <h3 className="text-lg text-white mb-3">
                  Consistency Bonus (Future)
                </h3>
                <p className="text-sm mb-3">
                  Minor League artists who consistently place in Top 5 for
                  multiple consecutive weeks may earn accelerated promotion
                  consideration.
                </p>
                <Badge variant="outline" className="text-xs">
                  Coming Soon
                </Badge>
              </div>

              <div className="glass-card rounded-xl p-6 border border-secondary/20">
                <h3 className="text-lg text-white mb-3">
                  Why Separate Leagues?
                </h3>
                <p className="text-sm">
                  Ensuring fair competition and giving emerging artists a real
                  shot at winning. A breakout indie artist shouldn't have to
                  compete directly against established superstars.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fan Strategy */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 neon-glow border border-accent/30"
          >
            <h2 className="text-2xl text-white mb-6 tracking-tight text-center">
              Fan Strategy Tips
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg text-white mb-3">Mix Both Leagues</h3>
                <p className="text-sm text-muted-foreground/80">
                  You can pick from both Major and Minor in your 5-track lineup.
                  Diversify for better odds and balanced risk/reward.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 border border-accent/20">
                <h3 className="text-lg text-white mb-3">
                  Underdog Multipliers
                </h3>
                <p className="text-sm text-muted-foreground/80">
                  Minor League tracks that finish Top 20 can earn fans 2x-5x
                  bonus rewards. High risk, high reward!
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 border border-secondary/20">
                <h3 className="text-lg text-white mb-3">Major = Stability</h3>
                <p className="text-sm text-muted-foreground/80">
                  Major League artists often have more predictable performance,
                  good for conservative lineups.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg text-white mb-3">Minor = Discovery</h3>
                <p className="text-sm text-muted-foreground/80">
                  Find the next breakout star. Early supporters of promoted
                  artists often see long-term rewards.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 neon-glow"
          >
            <Trophy className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl text-white mb-4 tracking-tight">
              Ready to Compete?
            </h2>
            <p className="text-muted-foreground/80 mb-8">
              Join Fholio and start building your lineup across both leagues
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => onNavigate("draft")}
                className="gradient-bg neon-glow holo-button text-lg px-8 py-6"
              >
                Build Lineup
              </Button>
              <Button
                onClick={() => onNavigate("rules")}
                variant="outline"
                className="glass-card border-primary/30 text-lg px-8 py-6"
              >
                Read Full Rules
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
