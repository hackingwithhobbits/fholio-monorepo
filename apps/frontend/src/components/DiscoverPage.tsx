import { useState } from "react";
import {
  Play,
  Pause,
  Heart,
  TrendingUp,
  TrendingDown,
  MapPin,
  Music,
  Zap,
  Crown,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DiscoverPageProps {
  onPageChange: (page: string) => void;
}

export function DiscoverPage({ onPageChange }: DiscoverPageProps) {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);

  const topMovers = [
    {
      id: 1,
      title: "Electric Dreams",
      artist: "Nova Sound",
      genre: "Electronic",
      price: 15.75,
      change: 24.5,
      cover:
        "https://images.unsplash.com/photo-1573470369532-03944ae8ab93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyJTIwbmVvbnxlbnwxfHx8fDE3NTY5Mjk2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      title: "Midnight Drive",
      artist: "Retro Wave",
      genre: "Synthwave",
      price: 22.3,
      change: 18.7,
      cover:
        "https://images.unsplash.com/photo-1611084352382-062f1bfe31e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeW50aHdhdmUlMjBhbGJ1bSUyMGNvdmVyJTIwcmV0cm98ZW58MXx8fHwxNzU2OTI5NjcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      title: "Ocean Waves",
      artist: "Coastal Sound",
      genre: "Ambient",
      price: 8.9,
      change: 15.2,
      cover:
        "https://images.unsplash.com/photo-1589528272863-16654bde3a71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJpZW50JTIwbXVzaWMlMjBvY2VhbiUyMHdhdmVzfGVufDF8fHx8MTc1NjkyOTY3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      title: "Urban Pulse",
      artist: "City Beats",
      genre: "Hip Hop",
      price: 12.4,
      change: 12.8,
      cover:
        "https://images.unsplash.com/photo-1735977162604-6e6cb5795124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBhbGJ1bSUyMGNvdmVyJTIwdXJiYW58ZW58MXx8fHwxNzU2OTI5Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 5,
      title: "Stellar Journey",
      artist: "Space Collective",
      genre: "Progressive",
      price: 19.6,
      change: 9.4,
      cover:
        "https://images.unsplash.com/photo-1708199011440-82c0afc27b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmVzc2l2ZSUyMG11c2ljJTIwc3BhY2UlMjBjb3Ntb3N8ZW58MXx8fHwxNzU2OTI5NjgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const trendingToday = [
    {
      id: 6,
      title: "Neon Nights",
      artist: "Luna Valley",
      genre: "Indie Pop",
      price: 14.25,
      trending: true,
      cover:
        "https://images.unsplash.com/photo-1701696934148-83396d061968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHBvcCUyMGFsYnVtJTIwY292ZXIlMjBkcmVhbXl8ZW58MXx8fHwxNzU2OTI5Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 7,
      title: "Digital Love",
      artist: "Cyber Dreams",
      genre: "Electronic",
      price: 18.8,
      trending: true,
      cover:
        "https://images.unsplash.com/photo-1746365588568-3513fdefde2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbXVzaWMlMjBjb3ZlciUyMGN5YmVycHVua3xlbnwxfHx8fDE3NTY5Mjk2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 8,
      title: "Sunset Boulevard",
      artist: "West Coast",
      genre: "Pop Rock",
      price: 11.5,
      trending: true,
      cover:
        "https://images.unsplash.com/photo-1669335596758-4437aef2d612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3AlMjByb2NrJTIwc3Vuc2V0JTIwbXVzaWN8ZW58MXx8fHwxNzU2OTI5NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 9,
      title: "Cosmic Flow",
      artist: "Astral Plane",
      genre: "Psychedelic",
      price: 16.7,
      trending: true,
      cover:
        "https://images.unsplash.com/photo-1621974714993-465ae51a4483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaGVkZWxpYyUyMG11c2ljJTIwY29zbWljJTIwZmxvd3xlbnwxfHx8fDE3NTY5Mjk2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const newLaunches = [
    {
      id: 10,
      title: "First Light",
      artist: "Dawn Collective",
      genre: "Ambient",
      price: 10.0,
      isNew: true,
      daysLeft: 29,
      cover:
        "https://images.unsplash.com/photo-1621546852360-0a9e6e63eab0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJpZW50JTIwZGF3biUyMGxpZ2h0JTIwbXVzaWN8ZW58MXx8fHwxNzU2OTI5Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 11,
      title: "Rising Sun",
      artist: "Tokyo Drift",
      genre: "Lo-Fi",
      price: 7.5,
      isNew: true,
      daysLeft: 25,
      cover:
        "https://images.unsplash.com/photo-1718952199003-63687f5e0f05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2ZpJTIwbXVzaWMlMjB0b2t5byUyMHJpc2luZyUyMHN1bnxlbnwxfHx8fDE3NTY5Mjk3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 12,
      title: "Velocity",
      artist: "Speed Runners",
      genre: "Drum & Bass",
      price: 13.25,
      isNew: true,
      daysLeft: 22,
      cover:
        "https://images.unsplash.com/photo-1596121589085-da000f4e0d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVtJTIwYmFzcyUyMG11c2ljJTIwdmVsb2NpdHklMjBzcGVlZHxlbnwxfHx8fDE3NTY5Mjk3MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const byGenre = [
    { genre: "Electronic", count: 127, color: "from-blue-500 to-cyan-500" },
    { genre: "Hip Hop", count: 89, color: "from-orange-500 to-red-500" },
    { genre: "Indie Pop", count: 156, color: "from-pink-500 to-purple-500" },
    { genre: "Rock", count: 98, color: "from-green-500 to-emerald-500" },
    { genre: "Ambient", count: 67, color: "from-indigo-500 to-blue-500" },
    { genre: "Jazz", count: 45, color: "from-yellow-500 to-orange-500" },
  ];

  const byLocation = [
    { location: "Los Angeles", count: 234, flag: "🇺🇸" },
    { location: "London", count: 189, flag: "🇬🇧" },
    { location: "Berlin", count: 156, flag: "🇩🇪" },
    { location: "Tokyo", count: 134, flag: "🇯🇵" },
    { location: "Nashville", count: 112, flag: "🇺🇸" },
    { location: "Stockholm", count: 89, flag: "🇸🇪" },
  ];

  const risingArtists = [
    {
      id: 13,
      name: "Echo Chamber",
      genre: "Electronic",
      location: "Berlin",
      totalRaised: "$45,200",
      tracks: 3,
      roi: 28.5,
      avatar:
        "https://images.unsplash.com/photo-1573470369532-03944ae8ab93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyJTIwbmVvbnxlbnwxfHx8fDE3NTY5Mjk2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 14,
      name: "Midnight Collective",
      genre: "Synthwave",
      location: "Los Angeles",
      totalRaised: "$67,800",
      tracks: 5,
      roi: 34.2,
      avatar:
        "https://images.unsplash.com/photo-1611084352382-062f1bfe31e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeW50aHdhdmUlMjBhbGJ1bSUyMGNvdmVyJTIwcmV0cm98ZW58MXx8fHwxNzU2OTI5NjcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 15,
      name: "Ocean Depths",
      genre: "Ambient",
      location: "Vancouver",
      totalRaised: "$23,400",
      tracks: 2,
      roi: 19.7,
      avatar:
        "https://images.unsplash.com/photo-1589528272863-16654bde3a71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJpZW50JTIwbXVzaWMlMjBvY2VhbiUyMHdhdmVzfGVufDF8fHx8MTc1NjkyOTY3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 16,
      name: "Urban Legends",
      genre: "Hip Hop",
      location: "Atlanta",
      totalRaised: "$89,100",
      tracks: 7,
      roi: 42.1,
      avatar:
        "https://images.unsplash.com/photo-1735977162604-6e6cb5795124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBhbGJ1bSUyMGNvdmVyJTIwdXJiYW58ZW58MXx8fHwxNzU2OTI5Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const togglePlay = (trackId: number) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
  };

  const renderTrackCard = (
    track: any,
    size: "large" | "medium" | "small" = "medium"
  ) => {
    const sizeClasses = {
      large: "w-80",
      medium: "w-64",
      small: "w-56",
    };

    const imageSizes = {
      large: "h-80",
      medium: "h-64",
      small: "h-56",
    };

    return (
      <Card
        key={track.id}
        className={`${sizeClasses[size]} premium-card hover:neon-glow transition-all duration-300 cursor-pointer group flex-shrink-0`}
        onClick={() => onPageChange("track-detail")}
      >
        <div className="relative">
          <ImageWithFallback
            src={track.cover}
            alt={track.title}
            className={`w-full ${imageSizes[size]} object-cover rounded-t-xl`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-xl" />

          {/* Play Button */}
          <Button
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay(track.id);
            }}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white border-0 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            {playingTrack === track.id ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>

          {/* Heart Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 left-4 bg-black/60 hover:bg-black/80 text-white border-0 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Heart className="w-6 h-6" />
          </Button>

          {/* Badges */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <Badge className="bg-black/60 text-white border-0">
              {track.genre}
            </Badge>
            {track.trending && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 font-bold">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
            {track.isNew && (
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 font-bold">
                <Zap className="w-3 h-3 mr-1" />
                New
              </Badge>
            )}
            {track.change && (
              <Badge
                className={`border-0 font-bold ${
                  track.change > 0 ? "positive" : "negative"
                }`}
              >
                {track.change > 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {track.change > 0 ? "+" : ""}
                {track.change}%
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-bold text-foreground text-lg mb-1 truncate">
            {track.title}
          </h3>
          <p
            className="text-muted-foreground mb-3 cursor-pointer hover:text-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onPageChange("artist-page");
            }}
          >
            {track.artist}
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-foreground">
              ${track.price}
            </span>
            {track.daysLeft && (
              <span className="text-sm text-muted-foreground">
                {track.daysLeft} days left
              </span>
            )}
          </div>

          <Button
            className="w-full fintech-gradient text-white border-0 hover:opacity-90 rounded-xl font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              onPageChange("track-detail");
            }}
          >
            Invest in Track
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-foreground mb-4">
            Discover Your Next Big Investment
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore trending tracks, rising artists, and breakthrough music
            across genres and locations
          </p>
        </div>

        {/* Top Movers */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-accent-positive" />
              <h2 className="text-2xl font-bold text-foreground">
                Top Movers (24h)
              </h2>
            </div>
            <Button variant="outline" className="hover:bg-accent">
              View All
            </Button>
          </div>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {topMovers.map((track) => renderTrackCard(track, "large"))}
          </div>
        </section>

        {/* Trending Today */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Trending Today
              </h2>
            </div>
            <Button variant="outline" className="hover:bg-accent">
              View All
            </Button>
          </div>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {trendingToday.map((track) => renderTrackCard(track))}
          </div>
        </section>

        {/* New Launches */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-foreground">
                New Launches
              </h2>
            </div>
            <Button variant="outline" className="hover:bg-accent">
              View All
            </Button>
          </div>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {newLaunches.map((track) => renderTrackCard(track))}
          </div>
        </section>

        {/* Browse by Category */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* By Genre */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Music className="w-6 h-6 text-purple-500" />
                <h2 className="text-2xl font-bold text-foreground">By Genre</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {byGenre.map((item, index) => (
                <Card
                  key={index}
                  className="premium-card hover:neon-glow transition-all duration-300 cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} mb-4 flex items-center justify-center`}
                    >
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      {item.genre}
                    </h3>
                    <p className="text-muted-foreground">{item.count} tracks</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* By Location */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-green-500" />
                <h2 className="text-2xl font-bold text-foreground">
                  By Location
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {byLocation.map((item, index) => (
                <Card
                  key={index}
                  className="premium-card hover:neon-glow transition-all duration-300 cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">{item.flag}</span>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">
                          {item.location}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.count} artists
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Rising Artists */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Crown className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-foreground">
                Rising Artists
              </h2>
            </div>
            <Button variant="outline" className="hover:bg-accent">
              View All
            </Button>
          </div>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {risingArtists.map((artist) => (
              <Card
                key={artist.id}
                className="w-80 premium-card hover:neon-glow transition-all duration-300 cursor-pointer flex-shrink-0"
                onClick={() => onPageChange("artist-page")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <ImageWithFallback
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-foreground text-lg">
                        {artist.name}
                      </h3>
                      <p className="text-muted-foreground">{artist.genre}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {artist.location}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-bold text-foreground">
                        {artist.tracks}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Tracks
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-accent-positive">
                        +{artist.roi}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg ROI
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-foreground">
                        {artist.totalRaised}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Raised
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4 fintech-gradient text-white border-0 hover:opacity-90 rounded-xl font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPageChange("artist-page");
                    }}
                  >
                    View Artist
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
