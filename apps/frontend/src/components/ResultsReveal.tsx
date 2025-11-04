import { motion } from "framer-motion";
import { useState } from "react";
import {
  Trophy,
  DollarSign,
  TrendingUp,
  Share2,
  ChevronRight,
  Medal,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ResultsRevealProps {
  onNavigate: (page: string) => void;
}

export function ResultsReveal({ onNavigate }: ResultsRevealProps) {
  const [revealed, setRevealed] = useState(true);

  const top20Winners = [
    {
      rank: 1,
      artistName: "Solaris",
      trackName: "Golden Hour",
      imageUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400",
      league: "Major",
      points: 9847,
      prize: 8420,
      fanShare: 1263,
    },
    {
      rank: 2,
      artistName: "Luna Echo",
      trackName: "Midnight Drive",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      league: "Major",
      points: 9214,
      prize: 7180,
      fanShare: 1077,
    },
    {
      rank: 3,
      artistName: "The Neon Wolves",
      trackName: "Electric Dreams",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
      league: "Major",
      points: 8893,
      prize: 6340,
      fanShare: 951,
    },
    {
      rank: 4,
      artistName: "Velvet Storm",
      trackName: "Thunder",
      imageUrl:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400",
      league: "Major",
      points: 8567,
      prize: 5620,
      fanShare: 843,
    },
    {
      rank: 5,
      artistName: "Bass Therapy",
      trackName: "Frequency",
      imageUrl:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
      league: "Minor",
      points: 8234,
      prize: 5010,
      fanShare: 752,
    },
  ];

  const topFanRewards = [
    { initial: "J***", location: "Dallas", earnings: 486 },
    { initial: "M***", location: "Los Angeles", earnings: 423 },
    { initial: "S***", location: "Nashville", earnings: 397 },
  ];

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-300";
      case 3:
        return "text-amber-600";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Dramatic Reveal Header */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-secondary/10 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(126,31,255,0.15),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <Trophy className="w-8 h-8 text-accent animate-pulse" />
              <span className="text-sm text-accent tracking-widest uppercase">
                Week 42 • Results
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl mb-8 gradient-text tracking-tighter"
            >
              The Winners
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
            >
              <div className="glass-card rounded-2xl p-6 neon-glow">
                <DollarSign className="w-8 h-8 mx-auto mb-3 text-accent" />
                <div className="text-3xl text-white mb-1">$100K</div>
                <div className="text-sm text-muted-foreground/70">
                  Total Prize Pool
                </div>
              </div>
              <div className="glass-card rounded-2xl p-6 neon-glow">
                <Trophy className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl text-white mb-1">20</div>
                <div className="text-sm text-muted-foreground/70">
                  Winning Tracks
                </div>
              </div>
              <div className="glass-card rounded-2xl p-6 neon-glow">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 text-secondary" />
                <div className="text-3xl text-white mb-1">$18.4K</div>
                <div className="text-sm text-muted-foreground/70">
                  Fan Shares Paid
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Top 20 Winners Table */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl text-white mb-3 tracking-tight">
              Top 20 Chart
            </h2>
            <p className="text-muted-foreground/70">
              This week's winning tracks and artist payouts
            </p>
          </motion.div>

          <div className="space-y-3">
            {top20Winners.map((winner, index) => (
              <motion.div
                key={winner.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card rounded-xl p-6 neon-glow hover:scale-[1.02] transition-all ${
                  winner.rank <= 3 ? "border border-accent/30" : ""
                }`}
              >
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="w-16 text-center">
                    {winner.rank <= 3 ? (
                      <Medal
                        className={`w-10 h-10 mx-auto ${getMedalColor(
                          winner.rank
                        )}`}
                      />
                    ) : (
                      <div className="text-2xl text-primary">
                        #{winner.rank}
                      </div>
                    )}
                  </div>

                  {/* Track Info */}
                  <ImageWithFallback
                    src={winner.imageUrl}
                    alt={winner.trackName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl text-white mb-1 tracking-tight">
                      {winner.trackName}
                    </h3>
                    <p className="text-muted-foreground/70 mb-2">
                      {winner.artistName}
                    </p>
                    <Badge
                      variant={
                        winner.league === "Major" ? "default" : "secondary"
                      }
                    >
                      {winner.league} League
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:block text-right">
                    <div className="text-sm text-muted-foreground/70 mb-1">
                      Points
                    </div>
                    <div className="text-xl text-white">
                      {winner.points.toLocaleString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground/70 mb-1">
                      Artist Prize
                    </div>
                    <div className="text-2xl text-accent">
                      ${winner.prize.toLocaleString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground/70 mb-1">
                      Fan Share
                    </div>
                    <div className="text-xl text-primary">
                      ${winner.fanShare.toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Button
              onClick={() => onNavigate("charts")}
              variant="outline"
              className="glass-card border-primary/30 text-white hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all"
            >
              View Full Top 100
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Fan Rewards */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 neon-glow"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl text-white mb-3 tracking-tight">
                Claimed By Fans
              </h3>
              <p className="text-xl text-muted-foreground/70">
                <span className="text-accent">${18400}</span> distributed to
                winning lineup holders
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {topFanRewards.map((fan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 text-center border border-primary/20"
                >
                  <div className="text-sm text-muted-foreground/70 mb-2">
                    Top Fan #{index + 1}
                  </div>
                  <div className="text-2xl text-white mb-1">{fan.initial}</div>
                  <div className="text-xs text-muted-foreground/70 mb-3">
                    {fan.location}
                  </div>
                  <div className="text-3xl text-accent">${fan.earnings}</div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground/70 mb-4">
                12,847 fans participated this week • Average payout: $14.32
              </p>
              <Button
                onClick={() => onNavigate("wallet")}
                className="gradient-bg neon-glow holo-button"
              >
                View Your Earnings
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 neon-glow text-center"
          >
            <Trophy className="w-16 h-16 mx-auto mb-6 text-accent glow-pulse" />
            <h2 className="text-4xl text-white mb-4 tracking-tight">
              Ready for Next Week?
            </h2>
            <p className="text-xl text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
              Voting opens Monday. Build your lineup and compete for even bigger
              prizes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => onNavigate("vote")}
                className="gradient-bg neon-glow holo-button text-lg px-8 py-6"
              >
                Start Voting
              </Button>
              <Button
                variant="outline"
                className="glass-card border-accent/30 text-lg px-8 py-6"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share Results
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
