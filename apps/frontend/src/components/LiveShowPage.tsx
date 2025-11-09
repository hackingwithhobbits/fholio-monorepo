import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Clock,
  Trophy,
  Star,
  DollarSign,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LiveShowPageProps {
  onNavigate: (page: string) => void;
}

export function LiveShowPage({ onNavigate }: LiveShowPageProps) {
  const [timeUntilShow, setTimeUntilShow] = useState({
    days: 3,
    hours: 14,
    minutes: 27,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilShow((prev) => {
        let { days, hours, minutes, seconds } = prev;

        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
              if (days < 0) {
                days = 6;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pastEpisodes = [
    {
      week: 43,
      date: "Nov 21, 2024",
      thumbnail:
        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop",
      topArtist: "Neon Dreams",
      topFan: "@MusicMogul92",
      pool: "$198,500",
    },
    {
      week: 42,
      date: "Nov 14, 2024",
      thumbnail:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
      topArtist: "Luna Waves",
      topFan: "@BeatHunter",
      pool: "$185,200",
    },
    {
      week: 41,
      date: "Nov 7, 2024",
      thumbnail:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
      topArtist: "Cyber Echo",
      topFan: "@SoundSeeker",
      pool: "$192,800",
    },
  ];

  const highlightStats = [
    {
      label: "Top Artist",
      value: "Neon Dreams",
      subvalue: "$42,500 earned",
      icon: Trophy,
      color: "from-yellow-500 to-amber-600",
    },
    {
      label: "Top Fan",
      value: "@MusicMogul92",
      subvalue: "$8,240 won",
      icon: Star,
      color: "from-primary to-purple-600",
    },
    {
      label: "Total Prize Pool",
      value: "$212,000",
      subvalue: "This week",
      icon: DollarSign,
      color: "from-secondary to-accent",
    },
    {
      label: "Live Viewers",
      value: "18,234",
      subvalue: "Peak last week",
      icon: Users,
      color: "from-accent to-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&h=600&fit=crop"
            alt="Live show"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block glass-card px-4 py-2 rounded-full mb-6">
              <span className="text-sm text-accent tracking-wider uppercase">
                🔴 Live Weekly
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl mb-6 gradient-text tracking-tighter leading-tight">
              Fholio Live Showdown
            </h1>

            <p className="text-2xl text-white/90 mb-8 max-w-2xl">
              Every Thursday 7 PM ET
            </p>

            {/* Countdown Timer */}
            <div className="glass-card inline-block p-6 rounded-2xl mb-8 neon-glow">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Next show starts in:
              </p>
              <div className="flex gap-4">
                {[
                  { value: timeUntilShow.days, label: "Days" },
                  { value: timeUntilShow.hours, label: "Hours" },
                  { value: timeUntilShow.minutes, label: "Minutes" },
                  { value: timeUntilShow.seconds, label: "Seconds" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="glass-card px-4 py-3 rounded-xl min-w-[80px]">
                      <div className="text-3xl gradient-text">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gradient-bg hover:opacity-90 neon-glow"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Live
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("fan-signin")}
                className="border-accent/50 text-accent hover:bg-accent/20"
              >
                Join Next Week's League
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* This Week's Broadcast */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 gradient-text tracking-tighter">
              This Week's Broadcast
            </h2>
            <p className="text-xl text-muted-foreground">
              The moment of truth. Top 10 revealed live.
            </p>
          </motion.div>

          {/* Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video glass-card rounded-2xl overflow-hidden neon-glow group cursor-pointer"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=675&fit=crop"
              alt="Live broadcast"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white">LIVE NOW</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlight Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 gradient-text tracking-tighter">
              Highlight Stats
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlightStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl hover:scale-105 transition-all neon-glow"
                >
                  <div
                    className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {stat.label}
                  </p>
                  <p className="text-2xl text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-accent">{stat.subvalue}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Past Episodes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 gradient-text tracking-tighter">
              Past Episodes
            </h2>
            <p className="text-xl text-muted-foreground">
              Relive the greatest moments
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pastEpisodes.map((episode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all neon-glow group cursor-pointer"
              >
                <div className="relative aspect-video">
                  <ImageWithFallback
                    src={episode.thumbnail}
                    alt={`Week ${episode.week}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="glass-card px-3 py-1 rounded-lg">
                      <span className="text-sm text-white">
                        Week {episode.week}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    {episode.date}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Top Artist:</span>
                      <span className="text-accent">{episode.topArtist}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Top Fan:</span>
                      <span className="text-primary">{episode.topFan}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Prize Pool:</span>
                      <span className="text-secondary">{episode.pool}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-2xl text-center neon-glow"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-4xl mb-4 gradient-text">Be Part of the Show</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the league, pick your artists, and watch them compete live
              every Thursday.
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate("fan-signin")}
              className="gradient-bg hover:opacity-90 glow-pulse px-12 py-6"
            >
              Join Next Week's League
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
