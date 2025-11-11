import { motion } from "framer-motion";
import {
  Sparkles,
  Trophy,
  Calendar,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { sponsors } from "../data/mockData";
import { Logo } from "./Logo";

interface SponsorsPageProps {}

export function SponsorsPage({}: SponsorsPageProps) {
  const challenges = [
    {
      id: "1",
      name: "Red Bull Rising Week",
      sponsor: "Red Bull",
      prize: "$25,000",
      description: "Extra rewards for artists with highest growth % this week",
      ends: "3 days",
      color: "from-red-500/20 to-yellow-500/20",
    },
    {
      id: "2",
      name: "Spotify Underground Week",
      sponsor: "Spotify",
      prize: "$15,000",
      description: "Bonus pool for Minor League artists with 10K-50K listeners",
      ends: "5 days",
      color: "from-green-500/20 to-emerald-500/20",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8 relative">
      {/* Background Logo Watermark */}
      <div className="logo-watermark">
        <Logo size="xl" className="opacity-100" style={{ height: "400px" }} />
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-xs text-accent mb-4 tracking-widest uppercase">
            POWERED BY THE BEST
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 gradient-text tracking-tighter">
            League Partners
          </h1>
          <p className="text-xl text-muted-foreground/80 tracking-tight max-w-2xl mx-auto">
            Brands, festivals, and labels fueling the future of music
          </p>
        </motion.div>

        {/* Partner Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-12 neon-glow text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

          <div className="relative z-10">
            <h2 className="text-3xl text-white mb-8 tracking-tight">
              Current Partners
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="glass-card rounded-2xl p-8 hover:scale-110 transition-all cursor-pointer neon-glow"
                >
                  <div className="text-6xl mb-3">{sponsor.logo}</div>
                  <div className="text-white tracking-tight">
                    {sponsor.name}
                  </div>
                  <Badge className="mt-2 text-xs bg-primary/20 text-primary border-primary/30">
                    {sponsor.type}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sponsored Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-accent" />
            <h2 className="text-3xl text-white tracking-tight">
              Sponsored Challenges
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden neon-glow hover:scale-[1.02] transition-all"
              >
                <div className={`h-2 bg-gradient-to-r ${challenge.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl text-white mb-1 tracking-tight">
                        {challenge.name}
                      </h3>
                      <div className="text-sm text-muted-foreground/70">
                        by {challenge.sponsor}
                      </div>
                    </div>
                    <Badge className="bg-accent/20 text-accent border-accent/30">
                      <Calendar className="w-3 h-3 mr-1" />
                      {challenge.ends}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground/80 mb-4">
                    {challenge.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground/70 mb-1">
                        Prize Pool
                      </div>
                      <div className="text-2xl gradient-text tracking-tight">
                        {challenge.prize}
                      </div>
                    </div>
                    <Button className="gradient-bg neon-glow holo-button rounded-xl">
                      Enter Challenge
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Brand Takeover Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-8 neon-glow relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-secondary/5" />

          <div className="relative z-10 text-center">
            <div className="w-16 h-16 rounded-2xl gradient-bg mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl text-white mb-2 tracking-tight">
              Partner With Fholio
            </h3>
            <p className="text-muted-foreground/80 mb-6 max-w-2xl mx-auto">
              Reach thousands of engaged music fans, sponsor challenges, and
              support emerging artists
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="glass-card p-4 rounded-xl">
                <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl gradient-text tracking-tight mb-1">
                  18K+
                </div>
                <div className="text-xs text-muted-foreground/70">
                  Active Members
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl gradient-text tracking-tight mb-1">
                  127
                </div>
                <div className="text-xs text-muted-foreground/70">
                  Artists/Week
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <Award className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <div className="text-2xl gradient-text tracking-tight mb-1">
                  $284K
                </div>
                <div className="text-xs text-muted-foreground/70">
                  Distributed
                </div>
              </div>
            </div>
            <Button className="gradient-bg neon-glow holo-button rounded-xl px-10">
              Contact Partnerships Team
            </Button>
          </div>
        </motion.div>

        {/* Sample Brand Banner Placements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl text-white mb-4 tracking-tight">
            Brand Visibility Examples
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6 neon-glow">
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-3">
                Leaderboard Banner
              </Badge>
              <p className="text-sm text-muted-foreground/80">
                Premium placement at top of leaderboards
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 neon-glow">
              <Badge className="bg-accent/20 text-accent border-accent/30 mb-3">
                Artist Card Sponsor
              </Badge>
              <p className="text-sm text-muted-foreground/80">
                Co-branded artist discovery cards
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 neon-glow">
              <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-3">
                Weekly Event
              </Badge>
              <p className="text-sm text-muted-foreground/80">
                Exclusive challenge weeks with custom branding
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 neon-glow">
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-3">
                Email Features
              </Badge>
              <p className="text-sm text-muted-foreground/80">
                Weekly newsletter sponsorships
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
