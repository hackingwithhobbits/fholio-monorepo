// src/components/VoteRoom.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ThumbsUp,
  Play,
  Filter,
  Sparkles,
  Clock,
  TrendingUp,
  MapPin,
  Music2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";
import { useCurrentPool } from "@/hooks/useArtists";
import { useVoting } from "@/hooks/useVoting";
import { useCurrentWeek } from "@/hooks/useWeek";

interface VoteRoomProps {
  onNavigate: (page: string) => void;
}

export function VoteRoom({ onNavigate }: VoteRoomProps) {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [votingArtistId, setVotingArtistId] = useState<string | null>(null);

  // Real backend data
  const { pool, isLoading, error } = useCurrentPool();
  const { votes, remaining, limit, submitVote, isSubmitting } = useVoting();
  const { week, timeRemaining, phase } = useCurrentWeek();

  const votesRemaining = remaining;
  const maxVotes = limit;

  // Extract unique genres from real data
  const genres = [
    "all",
    ...new Set(pool.map((p) => p.artist?.genre).filter(Boolean)),
  ];

  // Filter pool by genre and filter
  const filteredSubmissions = pool.filter((item) => {
    const artist = item.artist;
    if (!artist) return false;

    const matchesGenre =
      selectedGenre === "all" ||
      artist.genre.toLowerCase() === selectedGenre.toLowerCase();

    // Apply filter based on status or tags
    let matchesFilter = true;
    if (selectedFilter !== "all") {
      // You can customize these filters based on your data
      matchesFilter = selectedFilter === "all";
    }

    return matchesGenre && matchesFilter;
  });

  const handleVote = async (artistId: string, artistName: string) => {
    if (votesRemaining <= 0) {
      toast.error("No votes remaining", {
        description: "Come back tomorrow for more votes",
      });
      return;
    }

    const hasVoted = votes.some((v) => v.artist_id === artistId);
    if (hasVoted) {
      toast.error("Already voted for this track");
      return;
    }

    setVotingArtistId(artistId);
    const success = await submitVote(artistId);
    setVotingArtistId(null);

    if (success) {
      toast.success(`Voted for ${artistName}!`, {
        description: `${remaining - 1} votes remaining • +10 XP earned`,
      });
    }
  };

  const votesUsed = maxVotes - votesRemaining;
  const voteProgress = (votesUsed / maxVotes) * 100;

  const isVotingOpen = phase === "voting";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 mb-4">Failed to load submissions</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-black to-black" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <ThumbsUp className="w-5 h-5 text-accent" />
              <span className="text-xs text-accent tracking-widest uppercase">
                Vote Room •{" "}
                {isVotingOpen ? "Submissions Phase" : "Voting Closed"}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 gradient-text tracking-tighter">
              Vote. Discover. Elevate.
            </h1>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto tracking-tight">
              Help decide which tracks make it into this week's Top 100 Draft
              Pool
            </p>
          </motion.div>

          {/* Vote Counter & Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 neon-glow max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <ThumbsUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl text-white">
                    {votesRemaining} Votes Remaining
                  </div>
                  <div className="text-sm text-muted-foreground/70">
                    Daily voting allowance
                  </div>
                </div>
              </div>
              {isVotingOpen && timeRemaining ? (
                <div className="text-right">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm tracking-widest uppercase">
                      Voting Ends In
                    </span>
                  </div>
                  <div className="text-2xl text-white">
                    {timeRemaining.days}d {timeRemaining.hours}h{" "}
                    {timeRemaining.minutes}m
                  </div>
                </div>
              ) : (
                <div className="text-right">
                  <div className="text-red-500 text-sm tracking-widest uppercase">
                    Voting Closed
                  </div>
                </div>
              )}
            </div>
            <Progress value={voteProgress} className="h-2" />
            <div className="mt-3 text-center text-sm text-muted-foreground/70">
              {votesUsed} of {maxVotes} votes used • Earn XP with every vote
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-48 glass-card border-primary/20">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres
                  .filter((g) => g !== "all")
                  .map((genre) => (
                    <SelectItem key={genre} value={genre.toLowerCase()}>
                      {genre}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48 glass-card border-primary/20">
                <SelectValue placeholder="All Submissions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Submissions</SelectItem>
                <SelectItem value="new">New Entries</SelectItem>
                <SelectItem value="returning">Returning</SelectItem>
                <SelectItem value="spotlight">Premium Spotlight</SelectItem>
                <SelectItem value="rising">Rising Fast</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1" />

            <div className="text-sm text-muted-foreground/70">
              {filteredSubmissions.length} submissions this week
            </div>
          </div>
        </div>
      </section>

      {/* Submissions Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map((item, index) => {
              const artist = item.artist;
              if (!artist) return null;

              const hasVoted = votes.some((v) => v.artist_id === artist.id);
              const isVoting = votingArtistId === artist.id;

              // Determine tags based on data
              const tags: string[] = [];
              if (item.source_flag === "new_submission") tags.push("New");
              if (item.source_flag === "past_performer") tags.push("Returning");
              if (item.votes && item.votes > 100) tags.push("Rising");

              return (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass-card rounded-2xl p-6 neon-glow hover:scale-105 transition-all ${
                    hasVoted ? "border-accent/50" : ""
                  }`}
                >
                  {/* Track Art */}
                  <div className="relative mb-4">
                    <ImageWithFallback
                      src={
                        artist.image_url ||
                        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
                      }
                      alt={artist.name}
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={
                            tag === "Spotlight" ? "default" : "secondary"
                          }
                          className="text-xs backdrop-blur-xl"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {hasVoted && (
                      <div className="absolute inset-0 bg-accent/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <ThumbsUp className="w-12 h-12 text-accent mx-auto mb-2" />
                          <div className="text-white">Voted!</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Track Info */}
                  <h3 className="text-white mb-1 tracking-tight">
                    {artist.name}
                  </h3>
                  <p className="text-muted-foreground/70 text-sm mb-3">
                    {artist.genre}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70 mb-4">
                    <Music2 className="w-3 h-3" />
                    <span>{artist.genre}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{artist.location || "Unknown"}</span>
                  </div>

                  {/* Vote Count */}
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground/70">
                      {item.votes?.toLocaleString() || 0} votes
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 glass-card border-primary/30 text-white hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all"
                      disabled
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleVote(artist.id, artist.name)}
                      disabled={
                        hasVoted ||
                        votesRemaining === 0 ||
                        !isVotingOpen ||
                        isVoting
                      }
                      className={`flex-1 ${
                        hasVoted
                          ? "bg-accent/20 text-accent"
                          : "gradient-bg neon-glow holo-button"
                      }`}
                    >
                      {isVoting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Voting...
                        </>
                      ) : (
                        <>
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          {hasVoted ? "Voted" : "Upvote"}
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 neon-glow text-center"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h3 className="text-2xl text-white mb-3 tracking-tight">
              How Voting Works
            </h3>
            <p className="text-muted-foreground/80 mb-6 max-w-2xl mx-auto">
              Your votes help determine which tracks make it into the Top 100
              Draft Pool. Earn XP with every vote, and watch the tracks you
              support compete for the top spots.
            </p>
            <Button
              onClick={() => onNavigate("rules")}
              variant="outline"
              className="glass-card border-accent/30"
            >
              Learn More About Voting
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
