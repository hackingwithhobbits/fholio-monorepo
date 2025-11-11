"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Trophy,
  TrendingUp,
  MapPin,
  Heart,
  Sparkles,
  Music,
  Users,
  Plus,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { artists } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import { ShareButtons } from "./ShareButtons";
import { toast } from "sonner";
import { WorldMap } from "./WorldMap";

interface DiscoverPageV2Props {}

export function DiscoverPageV2({}: DiscoverPageV2Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const router = useRouter();
  // Categorized artists
  const lastWeekWinners = [...artists]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  const trendingNow = [...artists]
    .sort((a, b) => b.change - a.change)
    .slice(0, 8);
  const fanFavorites = [...artists]
    .sort((a, b) => b.fanBackers - a.fanBackers)
    .slice(0, 8);
  const newReleases = artists.filter((a) => a.status === "New Entrant");

  // Mock city data with better positioning
  const cities = [
    { name: "Los Angeles", count: 15, coords: { x: 15, y: 55 } },
    { name: "New York", count: 12, coords: { x: 82, y: 40 } },
    { name: "Nashville", count: 8, coords: { x: 68, y: 52 } },
    { name: "Atlanta", count: 10, coords: { x: 72, y: 58 } },
    { name: "Chicago", count: 7, coords: { x: 65, y: 42 } },
    { name: "Miami", count: 6, coords: { x: 78, y: 75 } },
    { name: "London", count: 9, coords: { x: 45, y: 25 } },
    { name: "Paris", count: 5, coords: { x: 48, y: 28 } },
  ];

  const getCityArtists = (cityName: string) => {
    return artists.filter((a) => a.location.includes(cityName)).slice(0, 10);
  };

  const handleAddToLineup = (artistId: string, artistName: string) => {
    toast.success(`${artistName} added to your lineup!`, {
      description: "View your lineup in My Fholio",
    });
  };

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
            SCOUT THE SOUND
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 gradient-text tracking-tighter">
            Discover Artists
          </h1>
          <p className="text-xl text-muted-foreground/80 tracking-tight">
            Find your next winning lineup
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 neon-glow"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                <Input
                  type="text"
                  placeholder="Search artists, genres, cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 glass-card border-primary/20 text-white"
                />
              </div>

              <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                <SelectTrigger className="w-full md:w-48 h-12 glass-card border-primary/20">
                  <SelectValue placeholder="League" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Leagues</SelectItem>
                  <SelectItem value="Major">Major League</SelectItem>
                  <SelectItem value="Minor">Minor League</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => router.push("/charts")}
                variant="outline"
                className="h-12 border-primary/30 hover:bg-primary/10 neon-glow whitespace-nowrap"
              >
                <Trophy className="w-4 h-4 mr-2" />
                View Charts
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="glass-card border-accent/30 text-accent hover:bg-accent/10"
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Hot Streak
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="glass-card border-primary/30 hover:bg-primary/10"
              >
                Rising
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="glass-card border-secondary/30 hover:bg-secondary/10"
              >
                Potential
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="glass-card border-primary/30 hover:bg-primary/10"
              >
                Trending
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Discovery Sections */}
        <Tabs defaultValue="winners" className="w-full">
          <TabsList className="glass-card mb-8 grid w-full grid-cols-2 md:grid-cols-5 gap-2 p-2">
            <TabsTrigger value="winners">
              <Trophy className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Last Week's </span>Winners
            </TabsTrigger>
            <TabsTrigger value="trending">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="cities">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">By </span>City
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Fan </span>Faves
            </TabsTrigger>
            <TabsTrigger value="new">
              <Sparkles className="w-4 h-4 mr-2" />
              New
            </TabsTrigger>
          </TabsList>

          {/* Last Week's Winners */}
          <TabsContent value="winners">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white tracking-tight">
                  Last Week's Top 10
                </h2>
                <p className="text-sm text-muted-foreground/70">
                  Week ending Oct 27, 2025
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {lastWeekWinners.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card rounded-2xl overflow-hidden neon-glow hover:scale-[1.02] transition-all group cursor-pointer"
                    onClick={() => router.push(`/artist/${artist.id}`)}
                  >
                    <div className="flex items-center gap-4 p-4">
                      {/* Rank Trophy */}
                      <div
                        className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                          index === 0
                            ? "bg-accent/20 border-2 border-accent"
                            : index === 1
                              ? "bg-primary/20 border-2 border-primary"
                              : index === 2
                                ? "bg-secondary/20 border-2 border-secondary"
                                : "bg-white/5 border border-white/10"
                        }`}
                      >
                        {index < 3 ? (
                          <Trophy
                            className={`w-8 h-8 ${
                              index === 0
                                ? "text-accent"
                                : index === 1
                                  ? "text-primary"
                                  : "text-secondary"
                            }`}
                          />
                        ) : (
                          <span className="text-2xl text-white">
                            #{index + 1}
                          </span>
                        )}
                      </div>

                      {/* Artist Image */}
                      <ImageWithFallback
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-20 h-20 rounded-xl object-cover group-hover:scale-110 transition-transform"
                      />

                      {/* Artist Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg text-white tracking-tight truncate mb-1">
                          {artist.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge
                            className={`text-xs ${
                              artist.league === "Major"
                                ? "bg-accent/20 text-accent border-accent/30"
                                : "bg-primary/20 text-primary border-primary/30"
                            }`}
                          >
                            {artist.league}
                          </Badge>
                          <span className="text-sm text-muted-foreground/70">
                            {artist.genre}
                          </span>
                        </div>
                        <div className="text-xl gradient-text tracking-tight">
                          {artist.score.toFixed(1)}
                        </div>
                      </div>

                      {/* Add Button */}
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToLineup(artist.id, artist.name);
                        }}
                        className="gradient-bg neon-glow holo-button rounded-xl hidden md:flex"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Trending Now */}
          <TabsContent value="trending">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl text-white tracking-tight mb-6">
                Fastest Growing Artists
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {trendingNow.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card rounded-2xl overflow-hidden neon-glow hover:scale-105 transition-all group cursor-pointer"
                    onClick={() => router.push(`/artist/${artist.id}`)}
                  >
                    <div className="relative h-64">
                      <ImageWithFallback
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                      {/* Hot Streak Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-accent/20 text-accent border-accent/30 backdrop-blur-xl">
                          <TrendingUp className="w-3 h-3 mr-1" />+
                          {artist.change.toFixed(1)}%
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg text-white mb-1 tracking-tight">
                          {artist.name}
                        </h3>
                        <div className="text-sm text-muted-foreground/70 mb-2">
                          {artist.genre}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xl gradient-text tracking-tight">
                            {artist.score.toFixed(1)}
                          </div>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToLineup(artist.id, artist.name);
                            }}
                            className="gradient-bg neon-glow holo-button rounded-lg"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Top Songs by City */}
          <TabsContent value="cities">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl text-white tracking-tight mb-6">
                Music Scenes Across the Globe
              </h2>

              {/* Interactive Map Mock */}
              <div className="glass-card rounded-2xl p-8 neon-glow mb-8 bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="relative h-[500px] rounded-xl overflow-hidden border border-white/10">
                  {/* Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black via-primary/5 to-secondary/5">
                    {/* Actual World Map SVG */}
                    <WorldMap className="absolute inset-0 w-full h-full opacity-60" />
                  </div>

                  {/* City Pins */}
                  {cities.map((city, index) => (
                    <motion.div
                      key={city.name}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute"
                      style={{
                        left: `${city.coords.x}%`,
                        top: `${city.coords.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedCity(city.name)}
                        className={`relative group ${
                          selectedCity === city.name ? "z-20" : "z-10"
                        }`}
                      >
                        {/* Pin Glow Effect */}
                        <div
                          className={`absolute inset-0 rounded-full blur-xl transition-all ${
                            selectedCity === city.name
                              ? "bg-accent/50 scale-150"
                              : "bg-primary/30 scale-100 group-hover:bg-accent/40 group-hover:scale-150"
                          }`}
                        />

                        {/* Pin Icon */}
                        <div
                          className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all border-2 ${
                            selectedCity === city.name
                              ? "bg-accent border-accent shadow-[0_0_30px_rgba(0,255,213,0.5)]"
                              : "bg-primary/30 border-primary/50 backdrop-blur-xl group-hover:bg-accent/30 group-hover:border-accent/50"
                          }`}
                        >
                          <MapPin
                            className={`w-7 h-7 transition-colors ${
                              selectedCity === city.name
                                ? "text-black"
                                : "text-white"
                            }`}
                          />
                        </div>

                        {/* City Label */}
                        <div
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-lg whitespace-nowrap transition-all ${
                            selectedCity === city.name
                              ? "bg-accent/90 backdrop-blur-xl border border-accent text-black"
                              : "bg-black/80 backdrop-blur-xl border border-white/20 text-white opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <div className="text-sm font-medium">{city.name}</div>
                          <div className="text-xs opacity-70">
                            {city.count} artists
                          </div>
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}

                  {/* Instruction Text (only show when no city selected) */}
                  {!selectedCity && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card px-6 py-4 rounded-xl border border-accent/30 text-center"
                      >
                        <MapPin className="w-8 h-8 mx-auto mb-2 text-accent" />
                        <p className="text-white text-lg mb-1">
                          Explore Music Cities
                        </p>
                        <p className="text-muted-foreground/70 text-sm">
                          Click a pin to discover local artists
                        </p>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>

              {/* City Artists */}
              {selectedCity && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-xl text-white mb-4 tracking-tight">
                    Top Artists in {selectedCity}
                  </h3>
                  <div className="grid md:grid-cols-5 gap-4">
                    {getCityArtists(selectedCity).map((artist, index) => (
                      <div
                        key={artist.id}
                        onClick={() => router.push(`/artist/${artist.id}`)}
                        className="glass-card rounded-xl p-4 neon-glow hover:scale-105 transition-all cursor-pointer text-center"
                      >
                        <ImageWithFallback
                          src={artist.imageUrl}
                          alt={artist.name}
                          className="w-full aspect-square rounded-lg object-cover mb-3"
                        />
                        <div className="text-white text-sm truncate">
                          {artist.name}
                        </div>
                        <div className="text-xs text-muted-foreground/70">
                          {artist.genre}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </TabsContent>

          {/* Fan Favorites */}
          <TabsContent value="favorites">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl text-white tracking-tight mb-6">
                Most Added to Fan Lineups
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {fanFavorites.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => router.push(`/artist/${artist.id}`)}
                    className="glass-card rounded-2xl p-6 neon-glow hover:scale-105 transition-all cursor-pointer text-center"
                  >
                    <ImageWithFallback
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-full aspect-square rounded-xl object-cover mb-4"
                    />
                    <h3 className="text-white mb-2 tracking-tight">
                      {artist.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/70 mb-3">
                      <Users className="w-4 h-4 text-primary" />
                      {artist.fanBackers.toLocaleString()} backers
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToLineup(artist.id, artist.name);
                      }}
                      className="w-full gradient-bg neon-glow holo-button rounded-xl"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Lineup
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* New Releases */}
          <TabsContent value="new">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl text-white tracking-tight mb-6">
                Fresh Tracks This Week
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {newReleases.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => router.push(`/artist/${artist.id}`)}
                    className="glass-card rounded-2xl overflow-hidden neon-glow hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-accent/20 text-accent border-accent/30 backdrop-blur-xl">
                        <Sparkles className="w-3 h-3 mr-1" />
                        New Entry
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl text-white mb-2 tracking-tight">
                        {artist.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground/70 mb-4">
                        <Music className="w-4 h-4" />
                        {artist.weeklyTrack || "Latest Track"}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg gradient-text tracking-tight">
                          {artist.score.toFixed(1)}
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToLineup(artist.id, artist.name);
                          }}
                          className="gradient-bg neon-glow holo-button rounded-xl"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
