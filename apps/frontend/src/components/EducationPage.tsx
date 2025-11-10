import { motion } from "framer-motion";
import {
  Brain,
  Shield,
  DollarSign,
  TrendingUp,
  Users,
  Trophy,
  CheckCircle2,
  Music,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { faqs } from "../data/mockData";
import { Logo } from "./Logo";

interface EducationPageProps {
  onNavigate: (page: string) => void;
}

export function EducationPage({ onNavigate }: EducationPageProps) {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Logo Watermark */}
      <div className="logo-watermark">
        <Logo size="xl" className="opacity-100" style={{ height: "400px" }} />
      </div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-6">
            <Logo size="lg" glow className="mx-auto" />
          </div>
          <div className="text-xs text-accent mb-4 tracking-widest uppercase">
            SCOUT THE SOUND
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 gradient-text tracking-tighter">
            How Fholio Works
          </h1>
          <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto tracking-tight">
            Everything you need to know about building your music portfolio and
            earning rewards
          </p>
        </motion.div>

        {/* The Concept */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-primary" />
            <h2 className="text-2xl text-white">The Concept</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Fholio is a fantasy league for music fans. Instead of betting on
            sports teams, you build a portfolio of up to 5 artists you believe
            will perform well each week. When your artists rank in the top 100
            based on real-world metrics, you earn rewards from the Fan Pool.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-accent mb-2" />
              <h3 className="text-white mb-2">Skill-Based</h3>
              <p className="text-sm text-muted-foreground">
                Success depends on your music knowledge and strategic picks
              </p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-accent mb-2" />
              <h3 className="text-white mb-2">Real Metrics</h3>
              <p className="text-sm text-muted-foreground">
                Artists are scored on actual streams, engagement, and votes
              </p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-accent mb-2" />
              <h3 className="text-white mb-2">Weekly Competition</h3>
              <p className="text-sm text-muted-foreground">
                New scoring period every week with fresh opportunities
              </p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-accent mb-2" />
              <h3 className="text-white mb-2">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Fan Pool funded by members, rewarding both artists and fans
              </p>
            </div>
          </div>
        </motion.div>

        {/* How Scores Are Calculated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-2xl text-white">How Scores Are Calculated</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Artist scores are calculated weekly using a proprietary algorithm
            that weights multiple performance factors:
          </p>

          <div className="space-y-6">
            {[
              {
                metric: "Streaming Performance",
                weight: "40%",
                description:
                  "Total streams across Spotify, Apple Music, and other platforms",
                icon: Music,
              },
              {
                metric: "Social Engagement",
                weight: "25%",
                description:
                  "Likes, shares, comments, and viral moments on TikTok, Instagram, and Twitter",
                icon: Users,
              },
              {
                metric: "Fan Votes",
                weight: "20%",
                description:
                  "Direct votes from Fholio members and engagement within the platform",
                icon: Trophy,
              },
              {
                metric: "Growth Rate",
                weight: "15%",
                description:
                  "Week-over-week momentum in followers, streams, and engagement",
                icon: TrendingUp,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="glass-card p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white">{item.metric}</h3>
                        <span className="text-primary">{item.weight}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-6 glass-card rounded-xl bg-accent/5 border border-accent/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-accent">Note:</strong> Scores are updated
              daily at 12:00 AM EST and finalized each Sunday at 11:59 PM EST
              for the weekly rankings.
            </p>
          </div>
        </motion.div>

        {/* Fan Pool Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-8 h-8 text-primary" />
            <h2 className="text-2xl text-white">Fan Pool Breakdown</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Every member's monthly subscription goes into a shared Fan Pool.
            Here's exactly how the funds are distributed:
          </p>

          <div className="relative">
            {/* Flow Diagram */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="glass-card px-6 py-4 rounded-xl flex-1 text-center">
                  <div className="text-2xl gradient-text mb-1">$850,000</div>
                  <div className="text-sm text-muted-foreground">
                    Total Weekly Pool
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-card p-6 rounded-xl text-center border-2 border-primary/40">
                  <div className="text-3xl text-primary mb-2">60%</div>
                  <div className="text-white mb-2">Artist Pool</div>
                  <div className="text-sm text-muted-foreground">$510,000</div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Rewards top 100 artists
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl text-center border-2 border-accent/40">
                  <div className="text-3xl text-accent mb-2">15%</div>
                  <div className="text-white mb-2">Fan Share</div>
                  <div className="text-sm text-muted-foreground">$127,500</div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Shared with backing fans
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl text-center border-2 border-secondary/40">
                  <div className="text-3xl text-secondary mb-2">20%</div>
                  <div className="text-white mb-2">Platform</div>
                  <div className="text-sm text-muted-foreground">$170,000</div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Operations & growth
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl text-center border-2 border-purple-500/40">
                  <div className="text-3xl text-purple-400 mb-2">5%</div>
                  <div className="text-white mb-2">Bonus Events</div>
                  <div className="text-sm text-muted-foreground">$42,500</div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Special promotions
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 glass-card rounded-xl">
              <h3 className="text-white mb-4">How Fan Share Works</h3>
              <p className="text-muted-foreground mb-4">
                When one of your chosen artists finishes in the top 100, that
                artist receives their portion of the Artist Pool. They then
                distribute 15% of their winnings to all fans who backed them
                that week.
              </p>
              <div className="glass-card p-4 rounded-lg bg-accent/5">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-white">Example:</strong> If an artist
                  earns $5,000 and you're one of 1,000 backers, you receive a
                  proportional share of $750 (15% of $5,000) based on your
                  portfolio allocation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What Makes It Legal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-2xl text-white">What Makes It Legal</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Fholio is classified as a skill-based fantasy competition, not
            gambling. Here's why:
          </p>

          <div className="space-y-4">
            {[
              {
                title: "Skill-Based Outcomes",
                description:
                  "Success depends entirely on your knowledge, research, and strategic decision-making—not chance or random outcomes.",
              },
              {
                title: "Transparent Scoring",
                description:
                  "All artist scores are calculated using publicly verifiable metrics from streaming platforms and social media.",
              },
              {
                title: "Fixed Entry Fee",
                description:
                  "Membership is a flat monthly rate ($10 or $20), not variable wagers based on odds.",
              },
              {
                title: "No House Edge",
                description:
                  "We don't profit from player losses. Platform fees cover operational costs only.",
              },
              {
                title: "Similar to Fantasy Sports",
                description:
                  "Fholio operates under the same legal framework as fantasy football, basketball, and other skill-based games.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="glass-card p-5 rounded-xl flex items-start gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-6 glass-card rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-white">Disclaimer:</strong> Fholio is
              available only in jurisdictions where skill-based fantasy
              competitions are legal. We comply with all applicable regulations
              and age restrictions (18+).
            </p>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <h2 className="text-2xl text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 rounded-xl border-0"
              >
                <AccordionTrigger className="text-white hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center glass-card p-12 rounded-2xl"
        >
          <h2 className="text-3xl gradient-text mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of music fans already earning rewards on Fholio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate("dashboard")}
              className="gradient-bg hover:opacity-90 neon-glow holo-button rounded-xl px-10"
            >
              Join the League
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("home")}
              className="border-primary/30 text-white hover:bg-primary/10 neon-glow rounded-xl px-10"
            >
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
