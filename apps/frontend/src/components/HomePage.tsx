import { useState, useEffect } from "react";
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
  Menu,
  X,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { weeklyTracks as tracksData } from "../data/weeklyTracks";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 18,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
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

  // Sticky navigation
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use real weekly tracks data - take first 6 for preview
  const weeklyTracks = tracksData.slice(0, 6);

  // Mock data for top artists and fans
  const topArtists = [
    { rank: 1, name: "Neon Dreams", earnings: "$12,420", avatar: "🎸" },
    { rank: 2, name: "Luna Waves", earnings: "$9,850", avatar: "🎹" },
    { rank: 3, name: "Cyber Echo", earnings: "$7,340", avatar: "🎧" },
  ];

  const topFans = [
    { rank: 1, name: "MusicMogul92", winnings: "$8,240", avatar: "👑" },
    { rank: 2, name: "BeatHunter", winnings: "$6,150", avatar: "🏆" },
    { rank: 3, name: "SoundSeeker", winnings: "$4,920", avatar: "⭐" },
  ];

  // Ticker content
  const tickerItems = [
    "🧃 JUICE BENDER IPO OPENS AT $0.74/SHARE",
    "LEXI VOID ▲ 18.9% AFTER LATE NIGHT STREAM SPIKE",
    "SMOKE MATH DROPS NEW AI COLLAB",
    "GHOST CASSETTE LISTED ON THE AMBER EXCHANGE",
    "FHOLO-NXT INDEX CLOSES +4.4%",
    "MIDNIGHT RIDER HITS 1M STREAMS",
    "CRYSTAL SKIES ▲ 22% THIS WEEK",
  ];

  const navItems = [
    { label: "Home", onClick: () => onNavigate("home") },
    {
      label: "Weekly Games",
      onClick: () =>
        window.scrollTo({
          top: document.getElementById("weekly-games")?.offsetTop || 0,
          behavior: "smooth",
        }),
    },
    { label: "Leaderboard", onClick: () => onNavigate("leaderboard") },
    { label: "My Picks", onClick: () => onNavigate("fan-dashboard") },
    { label: "Submissions", onClick: () => onNavigate("artist-dashboard") },
    { label: "Wallet", onClick: () => onNavigate("fan-dashboard") },
    { label: "Profile", onClick: () => onNavigate("fan-dashboard") },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-card border-b border-primary/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => onNavigate("home")}
            >
              <Logo size="md" glow />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 rounded-lg transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden glass-card border-t border-primary/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 rounded-lg transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b3d] via-[#7e1fff] to-[#ff1f70] opacity-40" />
        <div className="absolute inset-0 bg-black/60" />

        {/* Particles */}
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

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Centered Logo */}
            <div className="flex justify-center mb-8">
              <Logo size="xl" glow />
            </div>

            <h1 className="text-6xl md:text-8xl mb-6 tracking-tighter leading-[0.9]">
              <span className="gradient-text">Stock Up on Sound.</span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl mx-auto tracking-tight">
              Where fans back the future of music.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => onNavigate("fan-signin")}
                className="gradient-bg hover:opacity-90 neon-glow holo-button px-10 py-7 rounded-xl"
              >
                Join the League
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("artist-signin")}
                className="border-accent/50 text-accent hover:bg-accent/20 hover:border-accent hover:text-white neon-glow px-10 py-7 rounded-xl transition-all"
              >
                Submit Your Track
              </Button>
            </div>

            {/* Animated Ticker */}
            <div className="glass-card rounded-2xl p-4 overflow-hidden neon-glow">
              <div className="relative overflow-hidden">
                <div className="flex gap-6 ticker-animation whitespace-nowrap">
                  {[...tickerItems, ...tickerItems].map((item, index) => (
                    <span key={index} className="text-sm text-white/80">
                      {item} •
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl mb-6 gradient-text tracking-tighter">
              How It Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Pick 5 songs every week.",
                description:
                  "Choose from 100 hot tracks and build your lineup.",
                gradient: "from-primary to-purple-600",
              },
              {
                icon: TrendingUp,
                title: "Watch them climb the charts.",
                description:
                  "Track performance as your picks compete for the top.",
                gradient: "from-purple-600 to-accent",
              },
              {
                icon: DollarSign,
                title: "Get paid when they win.",
                description:
                  "Top 10 artists share winnings with their backers.",
                gradient: "from-accent to-secondary",
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
                  <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-all neon-glow h-full">
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weekly Games Section */}
      <section
        id="weekly-games"
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl mb-4 gradient-text tracking-tighter">
              This Week's 100 Tracks
            </h2>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
              <Clock className="w-4 h-4 text-accent" />
              <span>Voting closes in</span>
              <div className="flex gap-2">
                <div className="glass-card px-3 py-1 rounded-lg">
                  <span className="text-white">{timeLeft.days}</span>
                  <span className="text-xs ml-1">d</span>
                </div>
                <div className="glass-card px-3 py-1 rounded-lg">
                  <span className="text-white">{timeLeft.hours}</span>
                  <span className="text-xs ml-1">h</span>
                </div>
                <div className="glass-card px-3 py-1 rounded-lg">
                  <span className="text-white">{timeLeft.minutes}</span>
                  <span className="text-xs ml-1">m</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Carousel Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {weeklyTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-all neon-glow group cursor-pointer"
              >
                <div className="aspect-square relative">
                  <ImageWithFallback
                    src={track.image}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      className="w-full gradient-bg hover:opacity-90"
                    >
                      Vote
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm text-white truncate">{track.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {track.artist}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => onNavigate("fan-dashboard")}
              variant="outline"
              className="border-primary/40 text-white hover:bg-primary/20"
            >
              View Full Game
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Winners Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl mb-4 gradient-text tracking-tighter">
              Featured Winners
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Artists */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 neon-glow"
            >
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-accent" />
                <h3 className="text-2xl text-white">Top Artists</h3>
              </div>
              <div className="space-y-4">
                {topArtists.map((artist) => (
                  <div
                    key={artist.rank}
                    className="glass-card p-4 rounded-xl hover:scale-105 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl ${
                          artist.rank === 1
                            ? "bg-gradient-to-br from-yellow-500 to-amber-600"
                            : artist.rank === 2
                              ? "bg-gradient-to-br from-gray-400 to-gray-500"
                              : "bg-gradient-to-br from-orange-700 to-orange-800"
                        }`}
                      >
                        {artist.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-sm">
                            #{artist.rank}
                          </span>
                          <p className="text-white">{artist.name}</p>
                        </div>
                        <p className="text-sm text-accent">{artist.earnings}</p>
                      </div>
                      <Star className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Fans */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 neon-glow"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="text-2xl text-white">Top Fans</h3>
              </div>
              <div className="space-y-4">
                {topFans.map((fan) => (
                  <div
                    key={fan.rank}
                    className="glass-card p-4 rounded-xl hover:scale-105 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl ${
                          fan.rank === 1
                            ? "bg-gradient-to-br from-yellow-500 to-amber-600"
                            : fan.rank === 2
                              ? "bg-gradient-to-br from-gray-400 to-gray-500"
                              : "bg-gradient-to-br from-orange-700 to-orange-800"
                        }`}
                      >
                        {fan.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-sm">
                            #{fan.rank}
                          </span>
                          <p className="text-white">{fan.name}</p>
                        </div>
                        <p className="text-sm text-primary">{fan.winnings}</p>
                      </div>
                      <Sparkles className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Artist Callout Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl overflow-hidden neon-glow">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Text */}
              <div className="p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl mb-6 gradient-text tracking-tighter">
                    Artists – Submit Your Track to the League.
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Get exposure, earn money, and climb the charts with fan
                    backing. Join thousands of artists competing for the Top 10
                    every week.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => onNavigate("artist-signin")}
                    className="gradient-bg hover:opacity-90 neon-glow holo-button px-8 py-6"
                  >
                    Submit My Music
                    <Music className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Right Side - Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-full min-h-[400px]"
              >
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop"
                    alt="Artist performing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/80" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 glass-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <Logo size="md" glow />
              </div>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                The Fantasy League of Music. Build your portfolio, back your
                favorite artists, and earn rewards based on real performance.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => onNavigate("leaderboard")}
                  className="block text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Leaderboard
                </button>
                <button
                  onClick={() => onNavigate("about")}
                  className="block text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  How It Works
                </button>
                <button
                  onClick={() => onNavigate("fan-signin")}
                  className="block text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Join as Fan
                </button>
                <button
                  onClick={() => onNavigate("artist-signin")}
                  className="block text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Join as Artist
                </button>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white mb-4">Connect</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Discord
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4 text-xs text-muted-foreground/70">
              <p>© 2025 Fholio</p>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <p className="text-xs text-accent gradient-text">
              Your Fandom. Your Fortune.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
