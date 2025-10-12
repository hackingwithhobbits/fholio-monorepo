import {
  Play,
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  Star,
  Music,
  Zap,
  Shield,
  BarChart3,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onPageChange: (page: string) => void;
}

export function LandingPage({ onPageChange }: LandingPageProps) {
  // Concert/music energy background image
  const concertImage =
    "https://images.unsplash.com/photo-1752067883946-d4fba03c326f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaXZlJTIwbXVzaWMlMjBlbmVyZ3l8ZW58MXx8fHwxNzU2OTI1MDk3fDA&ixlib=rb-4.1.0&q=80&w=1080";
  const featuredTracks = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Valley",
      genre: "Indie Pop",
      shares: 2500,
      price: 12.5,
      raised: 31250,
      target: 50000,
      backers: 130,
      trending: true,
      roi: 28.5,
      cover:
        "https://images.unsplash.com/photo-1617431014998-f4f219965a1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHBvcCUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2OTI1MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      title: "Electric Pulse",
      artist: "Neon Riders",
      genre: "Electronic",
      shares: 1800,
      price: 25.0,
      raised: 45000,
      target: 75000,
      backers: 85,
      trending: true,
      roi: 45.2,
      cover:
        "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyJTIwYXJ0fGVufDF8fHx8MTc1NjkyNTEwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      title: "Ocean Waves",
      artist: "Coastal Sound",
      genre: "Ambient",
      shares: 950,
      price: 8.75,
      raised: 8312,
      target: 25000,
      backers: 64,
      trending: false,
      roi: 18.3,
      cover:
        "https://images.unsplash.com/photo-1749383024184-48883730e828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJpZW50JTIwbXVzaWMlMjBuYXR1cmUlMjBhbGJ1bXxlbnwxfHx8fDE3NTY5MjUxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 4,
      title: "Neon Nights",
      artist: "Synthwave Kings",
      genre: "Synthwave",
      shares: 1200,
      price: 18.75,
      raised: 22500,
      target: 40000,
      backers: 95,
      trending: true,
      roi: 32.1,
      cover:
        "https://images.unsplash.com/photo-1611084352382-062f1bfe31e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeW50aHdhdmUlMjByZXRybyUyMGFsYnVtJTIwYXJ0fGVufDF8fHx8MTc1NjkyNTExMXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 5,
      title: "Digital Dreams",
      artist: "Future Bass",
      genre: "Electronic",
      shares: 850,
      price: 14.2,
      raised: 12070,
      target: 30000,
      backers: 67,
      trending: false,
      roi: 22.8,
      cover:
        "https://images.unsplash.com/photo-1653082658341-d18280d0c149?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG11c2ljJTIwd2F2ZXMlMjBlbmVyZ3l8ZW58MXx8fHwxNzU2OTI1MTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Music Investor",
      avatar:
        "https://images.unsplash.com/photo-1718217028088-a23cb3b277c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzU2ODY4Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "Made 165% returns in 8 months. Finally found a way to invest in artists I believe in.",
      investment: "$12.5K",
    },
    {
      name: "Marcus Rodriguez",
      role: "Independent Artist",
      avatar:
        "https://images.unsplash.com/photo-1718217028088-a23cb3b277c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzU2ODY4Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "Raised $125K in 2 weeks. Now I can focus on music while my fans share in my success.",
      raised: "$125K",
    },
    {
      name: "Alex Thompson",
      role: "Music Producer",
      avatar:
        "https://images.unsplash.com/photo-1718217028088-a23cb3b277c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzU2ODY4Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "Building a sustainable music career through fan investment has changed everything.",
      streams: "2.3M",
    },
  ];

  const stats = [
    { label: "Total Invested", value: "$2.4M", icon: DollarSign },
    { label: "Active Artists", value: "1,247", icon: Users },
    { label: "Avg. ROI", value: "34.5%", icon: TrendingUp },
    { label: "Total Streams", value: "48M", icon: Play },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-black">
      {/* Hero Section with Video Background */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 via-black to-pink-900 animate-pulse"></div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            style={{
              filter: "brightness(0.7) contrast(1.2)",
            }}
            onError={(e) => {
              // Fallback to background image if video fails
              e.currentTarget.style.display = "none";
            }}
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              type="video/mp4"
            />
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              type="video/mp4"
            />
          </video>

          {/* Fallback animated background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(138,43,226,0.3), rgba(255,47,185,0.3)), url('${concertImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/70"></div>

          {/* Subtle animated gradients overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(138,43,226,0.2),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,47,185,0.2),transparent_50%)] animate-pulse delay-1000"></div>
        </div>

        {/* Removed floating stats as requested */}

        {/* Hero Content - Clean and Bold */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-white">REWRITING THE</span>
            <br />
            <span className="text-white">RULES OF MUSIC</span>
          </h1>

          <p className="text-2xl md:text-3xl text-white mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Fans Invest. Artists Launch. The world's first music stock exchange.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button
              onClick={() => onPageChange("discover")}
              size="lg"
              className="fintech-gradient text-white border-0 hover:opacity-90 text-xl px-12 py-6 rounded-xl font-bold transform hover:scale-105 transition-all duration-300"
            >
              <TrendingUp className="mr-3 w-6 h-6" />
              Invest in Tracks
            </Button>
            <Button
              onClick={() => onPageChange("auth")}
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 text-xl px-12 py-6 rounded-xl font-bold transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              <Music className="mr-3 w-6 h-6" />
              Launch as Artist
            </Button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-32 bg-card relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground">
              How Fholio Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three simple steps to revolutionize how music gets funded and how
              fans profit from great artists
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Users,
                title: "Discover",
                description:
                  "Browse breakthrough tracks from emerging artists before they hit mainstream. Our AI-powered discovery engine surfaces the next big hits.",
                step: "01",
              },
              {
                icon: DollarSign,
                title: "Invest",
                description:
                  "Buy shares in tracks you believe will succeed. Start with as little as $5 and build a diversified music portfolio.",
                step: "02",
              },
              {
                icon: TrendingUp,
                title: "Profit",
                description:
                  "Earn returns as tracks gain popularity through streams, sales, licensing, and sync deals. Your investment grows with the artist.",
                step: "03",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="premium-card border-0 p-8 text-center group hover:neon-glow transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative mb-8">
                  <div className="absolute -top-4 -right-4 text-6xl font-black text-primary/20">
                    {item.step}
                  </div>
                  <div className="w-20 h-20 rounded-xl fintech-gradient mx-auto flex items-center justify-center mb-6 neon-glow">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Tracks Section - Clean Horizontal Rail */}
      <div className="py-32 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground">
                Featured Tracks
              </h2>
              <p className="text-xl text-muted-foreground">
                The hottest tracks generating returns right now
              </p>
            </div>
            <Button
              onClick={() => onPageChange("discover")}
              variant="outline"
              className="border-2 border-border text-foreground hover:bg-accent rounded-xl px-8 py-3 font-semibold"
            >
              View All <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Horizontal Rail */}
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {featuredTracks.map((track, index) => (
              <Card
                key={index}
                className="premium-card overflow-hidden group hover:neon-glow transition-all duration-500 transform hover:-translate-y-2 cursor-pointer flex-shrink-0 w-80"
                onClick={() => onPageChange("track-detail")}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-xl" />

                  {/* Play Button */}
                  <Button
                    size="icon"
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white border-0 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="w-6 h-6" />
                  </Button>

                  {/* Trending Badge */}
                  {track.trending && (
                    <Badge className="absolute top-4 left-4 positive text-black bg-accent-positive border-0 font-bold">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}

                  {/* ROI Badge */}
                  <Badge className="absolute bottom-4 right-4 fintech-gradient text-white border-0 font-bold">
                    +{track.roi}% ROI
                  </Badge>

                  <div className="absolute bottom-4 left-4">
                    <Badge
                      variant="outline"
                      className="bg-black/60 text-white border-white/20"
                    >
                      {track.genre}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {track.title}
                  </h3>
                  <p
                    className="text-primary font-medium mb-4 cursor-pointer hover:text-primary/80 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPageChange("artist-page");
                    }}
                  >
                    {track.artist}
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Share Price</span>
                      <span className="text-2xl font-bold text-foreground">
                        ${track.price}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Raised</span>
                      <span className="positive font-bold">
                        ${track.raised.toLocaleString()}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full fintech-gradient"
                          style={{
                            width: `${(track.raised / track.target) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{track.backers} backers</span>
                        <span>
                          {Math.round((track.raised / track.target) * 100)}%
                          funded
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full fintech-gradient text-white border-0 hover:opacity-90 rounded-xl font-bold transform hover:scale-105 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPageChange("track-detail");
                      }}
                    >
                      Invest in Track
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="py-32 bg-gradient-to-b from-black to-purple-950/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-xl text-white/70">
              Real investors and artists winning on Fholio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="glass-card border-0 p-8 group hover:neon-glow transition-all duration-500"
              >
                <div className="flex items-center mb-6">
                  <ImageWithFallback
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/50"
                  />
                  <div className="ml-4">
                    <div className="font-bold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-purple-300 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-white/80 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div className="text-xs text-white/60">
                    {testimonial.investment &&
                      `Invested: ${testimonial.investment}`}
                    {testimonial.raised && `Raised: ${testimonial.raised}`}
                    {testimonial.streams && `Streams: ${testimonial.streams}`}
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                    Verified
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 bg-gradient-to-r from-purple-900 via-black to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.4),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.4),transparent_50%)]"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white neon-text">
            Ready to Change Music Forever?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join thousands of investors and artists who are rewriting the rules
            of the music industry.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto mb-8">
            <Input
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/60 rounded-full px-6 py-4 text-lg backdrop-blur-sm"
            />
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 rounded-full px-8 py-4 font-bold neon-glow transform hover:scale-105 transition-all duration-300">
              Get Started
            </Button>
          </div>

          <p className="text-sm text-white/60">
            Free to join • No hidden fees • Start with as little as $5
          </p>

          <div className="flex justify-center items-center space-x-8 mt-12 text-white/40">
            <Shield className="w-8 h-8" />
            <span className="text-sm">SEC Compliant</span>
            <div className="w-px h-8 bg-white/20"></div>
            <Zap className="w-8 h-8" />
            <span className="text-sm">Instant Trading</span>
            <div className="w-px h-8 bg-white/20"></div>
            <BarChart3 className="w-8 h-8" />
            <span className="text-sm">Real-time Analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
