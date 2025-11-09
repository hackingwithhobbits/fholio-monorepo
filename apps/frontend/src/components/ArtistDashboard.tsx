import { motion } from "framer-motion";
import {
  Music,
  Upload,
  TrendingUp,
  Users,
  DollarSign,
  Award,
  Sparkles,
  Play,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Logo } from "./Logo";

interface ArtistDashboardProps {
  onNavigate: (page: string) => void;
}

export function ArtistDashboard({ onNavigate }: ArtistDashboardProps) {
  const submissions = [
    {
      id: 1,
      title: "Summer Nights",
      status: "Live",
      rank: 7,
      votes: 2847,
      streams: 45230,
    },
    {
      id: 2,
      title: "Electric Dreams",
      status: "In Review",
      rank: null,
      votes: 0,
      streams: 0,
    },
    {
      id: 3,
      title: "Midnight City",
      status: "Past",
      rank: 23,
      votes: 1234,
      streams: 28940,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8 relative">
      {/* Background Logo Watermark */}
      <div className="logo-watermark">
        <Logo size="xl" className="opacity-100" style={{ height: "400px" }} />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-xs text-accent mb-4 tracking-widest uppercase">
            ARTIST DASHBOARD
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 gradient-text tracking-tighter">
            My Submissions
          </h1>
          <p className="text-xl text-muted-foreground/80 tracking-tight">
            Manage your music and track performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="glass-card rounded-2xl p-6 neon-glow">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">
                Current Rank
              </span>
            </div>
            <div className="text-3xl gradient-text tracking-tight">#7</div>
          </div>

          <div className="glass-card rounded-2xl p-6 neon-glow">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Fans</span>
            </div>
            <div className="text-3xl text-white tracking-tight">2,847</div>
          </div>

          <div className="glass-card rounded-2xl p-6 neon-glow">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-secondary" />
              <span className="text-sm text-muted-foreground">This Week</span>
            </div>
            <div className="text-3xl text-white tracking-tight">$1,240</div>
          </div>

          <div className="glass-card rounded-2xl p-6 neon-glow">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Momentum</span>
            </div>
            <div className="text-3xl text-accent tracking-tight">+12%</div>
          </div>
        </motion.div>

        {/* Upload New Track */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8 neon-glow text-center"
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-accent" />
          <h2 className="text-2xl text-white tracking-tight mb-3">
            Submit This Week's Track
          </h2>
          <p className="text-muted-foreground/80 mb-6">
            Submissions close Friday at 12:00 AM. Get your music in to be
            considered for Top 100.
          </p>
          <Button
            className="bg-gradient-to-r from-accent to-pink-600 hover:opacity-90 text-white neon-glow px-8 py-6 rounded-xl transition-all duration-200"
            size="lg"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Track
          </Button>
        </motion.div>

        {/* Submissions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl text-white tracking-tight mb-6">
            Recent Submissions
          </h2>
          <div className="space-y-4">
            {submissions.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-card rounded-2xl p-6 neon-glow hover:scale-[1.01] transition-all"
              >
                <div className="flex items-center gap-6">
                  {/* Album Art Placeholder */}
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-accent to-pink-600 flex items-center justify-center flex-shrink-0">
                    <Music className="w-10 h-10 text-white" />
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl text-white tracking-tight">
                        {track.title}
                      </h3>
                      <Badge
                        className={
                          track.status === "Live"
                            ? "bg-accent/20 text-accent border-accent/30"
                            : track.status === "In Review"
                              ? "bg-primary/20 text-primary border-primary/30"
                              : "bg-white/10 text-white/70 border-white/20"
                        }
                      >
                        {track.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground/70">
                      {track.rank && (
                        <>
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            Rank #{track.rank}
                          </span>
                          <span>•</span>
                        </>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {track.votes.toLocaleString()} votes
                      </span>
                      {track.streams > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Play className="w-4 h-4" />
                            {track.streams.toLocaleString()} streams
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <Button
                    variant="outline"
                    className="border-accent/30 text-accent hover:bg-accent/20 hover:border-accent rounded-xl"
                  >
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-2xl p-8 neon-glow"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-accent" />
            <h2 className="text-2xl text-white tracking-tight">
              Tips for Success
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white mb-2 tracking-tight">
                Quality Over Quantity
              </h3>
              <p className="text-sm text-muted-foreground/70">
                Focus on your best work. Fans vote for exceptional tracks.
              </p>
            </div>
            <div>
              <h3 className="text-white mb-2 tracking-tight">
                Engage Your Fans
              </h3>
              <p className="text-sm text-muted-foreground/70">
                Share your submission on social media to build your fan base.
              </p>
            </div>
            <div>
              <h3 className="text-white mb-2 tracking-tight">
                Consistency Wins
              </h3>
              <p className="text-sm text-muted-foreground/70">
                Submit every week to build momentum and loyal supporters.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
