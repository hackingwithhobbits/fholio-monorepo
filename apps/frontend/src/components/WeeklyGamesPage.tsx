// apps/frontend/src/components/WeeklyGamesPage.tsx

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  TrendingUp,
  Users,
  Music,
  Clock,
  Vote,
  CheckCircle2,
  Lock,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Logo } from "./Logo";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCurrentWeekTracks } from "@/hooks/useTracks";
import { useCurrentWeek } from "@/hooks/useWeek";
import {
  useMyVotes,
  useRemainingVotes,
  useVotingActions,
} from "@/hooks/useVoting";
import { authUtils } from "@/lib/auth";
import { toast } from "sonner";

interface WeeklyGamesPageProps {
  onNavigate: (page: string, artistId?: string) => void;
}

export function WeeklyGamesPage({ onNavigate }: WeeklyGamesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const userSession = authUtils.getSession();
  const isAuthenticated = !!userSession;

  // Fetch data
  const { week } = useCurrentWeek();
  const { tracks, isLoading: tracksLoading } = useCurrentWeekTracks();
  const { votes: myVotes, refresh: refreshVotes } = useMyVotes(week?.id);
  const {
    remaining,
    limit,
    used,
    refresh: refreshRemaining,
  } = useRemainingVotes(week?.id);
  const { submitVote, isVoting } = useVotingActions();

  // Check if voting is open
  const isVotingOpen = useMemo(() => {
    if (!week) return false;
    const now = new Date();
    const votingStart = new Date(week.voting_open_at);
    const votingEnd = new Date(week.voting_close_at);
    return now >= votingStart && now <= votingEnd;
  }, [week]);

  // Get voted artist IDs
  const votedArtistIds = useMemo(() => {
    return new Set(myVotes.map((v: any) => v.artist_id));
  }, [myVotes]);

  // Filter tracks
  const filteredTracks = useMemo(() => {
    return tracks.filter((track: any) => {
      const matchesSearch =
        track.artist?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre =
        !selectedGenre || track.artist?.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [tracks, searchQuery, selectedGenre]);

  // Get unique genres
  const genres = useMemo(() => {
    const genreSet = new Set(
      tracks.map((t: any) => t.artist?.genre).filter(Boolean),
    );
    return Array.from(genreSet);
  }, [tracks]);

  // Handle vote
  const handleVote = async (artistId: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to vote");
      onNavigate("signin-fan");
      return;
    }

    if (!isVotingOpen) {
      toast.error("Voting is not open");
      return;
    }

    if (remaining <= 0) {
      toast.error(`You've used all ${limit} votes for this week`);
      return;
    }

    const success = await submitVote(artistId, week?.id);
    if (success) {
      await refreshVotes();
      await refreshRemaining();
    }
  };

  // Calculate time until voting closes
  const getTimeUntilVotingCloses = () => {
    if (!week?.voting_close_at) return "N/A";

    const now = new Date();
    const closeTime = new Date(week.voting_close_at);
    const diff = closeTime.getTime() - now.getTime();

    if (diff <= 0) return "Closed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
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
          <div className="text-xs text-accent mb-2 tracking-widest uppercase">
            THIS WEEK'S ARTISTS
          </div>
          <h1 className="text-5xl md:text-6xl gradient-text tracking-tighter mb-2">
            Vote for Artists
          </h1>
          <p className="text-muted-foreground/80 tracking-tight">
            Week {week?.week_number || "N/A"} • Vote for your favorites
          </p>
        </motion.div>

        {/* Voting Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-4"
        >
          {/* Voting Status */}
          <div
            className={`glass-card rounded-2xl p-6 neon-glow ${isVotingOpen ? "border-2 border-accent" : "border-2 border-muted"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock
                className={`w-5 h-5 ${isVotingOpen ? "text-accent" : "text-muted-foreground"}`}
              />
              <span className="text-sm tracking-tight text-muted-foreground">
                Voting Status
              </span>
            </div>
            <div
              className={`text-2xl tracking-tight ${isVotingOpen ? "text-accent" : "text-muted-foreground"}`}
            >
              {isVotingOpen ? "OPEN" : "CLOSED"}
            </div>
            {isVotingOpen && (
              <div className="text-xs text-muted-foreground/70 mt-1">
                Closes in {getTimeUntilVotingCloses()}
              </div>
            )}
          </div>

          {/* Votes Used */}
          {isAuthenticated && (
            <>
              <div className="glass-card rounded-2xl p-6 neon-glow">
                <div className="flex items-center gap-2 mb-2">
                  <Vote className="w-5 h-5 text-primary" />
                  <span className="text-sm tracking-tight text-muted-foreground">
                    Votes Used
                  </span>
                </div>
                <div className="text-3xl gradient-text tracking-tight">
                  {used} / {limit}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 neon-glow">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm tracking-tight text-muted-foreground">
                    Remaining
                  </span>
                </div>
                <div className="text-3xl text-accent tracking-tight">
                  {remaining}
                </div>
              </div>
            </>
          )}

          {/* Total Artists */}
          <div className="glass-card rounded-2xl p-6 neon-glow">
            <div className="flex items-center gap-2 mb-2">
              <Music className="w-5 h-5 text-secondary" />
              <span className="text-sm tracking-tight text-muted-foreground">
                Total Artists
              </span>
            </div>
            <div className="text-3xl text-white tracking-tight">
              {tracks.length}
            </div>
          </div>
        </motion.div>

        {/* Auth Prompt for Non-logged Users */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 text-center neon-glow border-2 border-primary/30"
          >
            <Vote className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">Sign In to Vote</h3>
            <p className="text-muted-foreground mb-4">
              Create an account to vote for your favorite artists and compete
              for prizes
            </p>
            <Button
              onClick={() => onNavigate("signin-fan")}
              className="gradient-bg neon-glow holo-button rounded-xl"
            >
              Sign In / Sign Up
            </Button>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search artists or tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/40 border-primary/30 focus:border-primary text-white pl-12 pr-4 py-6 rounded-xl"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedGenre === null ? "default" : "outline"}
              onClick={() => setSelectedGenre(null)}
              className={
                selectedGenre === null ? "gradient-bg" : "border-primary/30"
              }
            >
              All Genres
            </Button>
            {genres.map((genre: any) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                onClick={() => setSelectedGenre(genre)}
                className={
                  selectedGenre === genre ? "gradient-bg" : "border-primary/30"
                }
              >
                {genre}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {tracksLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        )}

        {/* Tracks Grid */}
        {!tracksLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTracks.map((track: any, index: number) => {
              const hasVoted = votedArtistIds.has(track.artist_id);
              const voteCount = track.artist_week?.votes || 0;

              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass-card rounded-2xl p-6 neon-glow hover:scale-[1.02] transition-all ${
                    hasVoted ? "border-2 border-accent" : ""
                  }`}
                >
                  {/* Artist Image & Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <ImageWithFallback
                      src={track.artist?.image_url || track.cover_image_url}
                      alt={track.artist?.name || "Artist"}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-lg text-white tracking-tight cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => onNavigate("artist", track.artist_id)}
                      >
                        {track.artist?.name || "Unknown Artist"}
                      </h3>
                      <p className="text-sm text-muted-foreground/70 truncate">
                        {track.title}
                      </p>
                    </div>
                  </div>

                  {/* Track Details */}
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {track.artist?.genre || "Unknown"}
                    </Badge>
                    <Badge className="bg-white/10 text-white/70">
                      {track.artist?.league || "Minor"}
                    </Badge>
                  </div>

                  {/* Vote Count */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {voteCount} votes
                      </span>
                    </div>
                    {track.artist_week?.status && (
                      <Badge className="bg-accent/20 text-accent text-xs">
                        {track.artist_week.status}
                      </Badge>
                    )}
                  </div>

                  {/* Vote Button */}
                  {isAuthenticated ? (
                    <Button
                      onClick={() => handleVote(track.artist_id)}
                      disabled={
                        !isVotingOpen || hasVoted || isVoting || remaining <= 0
                      }
                      className={`w-full ${
                        hasVoted
                          ? "bg-accent/20 text-accent border-accent/30"
                          : "gradient-bg neon-glow holo-button"
                      } rounded-xl`}
                    >
                      {hasVoted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Voted
                        </>
                      ) : !isVotingOpen ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Voting Closed
                        </>
                      ) : isVoting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Voting...
                        </>
                      ) : remaining <= 0 ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          No Votes Left
                        </>
                      ) : (
                        <>
                          <Vote className="w-4 h-4 mr-2" />
                          Vote ({remaining} left)
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onNavigate("signin-fan")}
                      variant="outline"
                      className="w-full border-primary/30 hover:bg-primary/10"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Sign In to Vote
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Empty State */}
        {!tracksLoading && filteredTracks.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center neon-glow">
            <Music className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-white text-xl mb-2">No tracks found</p>
            <p className="text-muted-foreground">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
