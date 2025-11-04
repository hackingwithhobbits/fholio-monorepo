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
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

interface Submission {
  id: string;
  artistName: string;
  trackName: string;
  imageUrl: string;
  genre: string;
  location: string;
  votes: number;
  tags: string[];
  previewUrl?: string;
}

interface VoteRoomProps {
  onNavigate: (page: string) => void;
}

export function VoteRoom({ onNavigate }: VoteRoomProps) {
  const [votesRemaining, setVotesRemaining] = useState(10);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const maxVotes = 10;

  // Mock submissions data
  const submissions: Submission[] = [
    {
      id: "1",
      artistName: "Luna Echo",
      trackName: "Midnight Drive",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      genre: "Electronic",
      location: "Los Angeles, CA",
      votes: 2847,
      tags: ["New", "Rising"],
    },
    {
      id: "2",
      artistName: "The Neon Wolves",
      trackName: "Electric Dreams",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
      genre: "Rock",
      location: "Nashville, TN",
      votes: 3254,
      tags: ["Returning", "Hot Streak"],
    },
    {
      id: "3",
      artistName: "Solaris",
      trackName: "Golden Hour",
      imageUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400",
      genre: "Pop",
      location: "New York, NY",
      votes: 4102,
      tags: ["Spotlight", "Rising"],
    },
    {
      id: "4",
      artistName: "Bass Therapy",
      trackName: "Frequency",
      imageUrl:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
      genre: "Hip-Hop",
      location: "Atlanta, GA",
      votes: 1923,
      tags: ["New"],
    },
    {
      id: "5",
      artistName: "Crimson Sky",
      trackName: "Horizon",
      imageUrl:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400",
      genre: "Indie",
      location: "Austin, TX",
      votes: 2156,
      tags: ["Rising"],
    },
    {
      id: "6",
      artistName: "Velvet Storm",
      trackName: "Thunder",
      imageUrl:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400",
      genre: "R&B",
      location: "Miami, FL",
      votes: 3687,
      tags: ["Returning", "Spotlight"],
    },
  ];

  const handleVote = (submissionId: string, artistName: string) => {
    if (votesRemaining > 0 && !votedIds.has(submissionId)) {
      setVotesRemaining((prev) => prev - 1);
      setVotedIds((prev) => new Set([...prev, submissionId]));
      toast.success(`Voted for ${artistName}!`, {
        description: `${votesRemaining - 1} votes remaining • +10 XP earned`,
      });
    } else if (votedIds.has(submissionId)) {
      toast.error("Already voted for this track");
    } else {
      toast.error("No votes remaining", {
        description: "Come back tomorrow for more votes",
      });
    }
  };

  const votesUsed = maxVotes - votesRemaining;
  const voteProgress = (votesUsed / maxVotes) * 100;

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
                Vote Room • Submissions Phase
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
              <div className="text-right">
                <div className="flex items-center gap-2 text-accent mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm tracking-widest uppercase">
                    Voting Ends In
                  </span>
                </div>
                <div className="text-2xl text-white">1d 04h 23m</div>
              </div>
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
                <SelectItem value="pop">Pop</SelectItem>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="hiphop">Hip-Hop</SelectItem>
                <SelectItem value="electronic">Electronic</SelectItem>
                <SelectItem value="indie">Indie</SelectItem>
                <SelectItem value="rnb">R&B</SelectItem>
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
              {submissions.length} submissions this week
            </div>
          </div>
        </div>
      </section>

      {/* Submissions Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((submission, index) => {
              const hasVoted = votedIds.has(submission.id);

              return (
                <motion.div
                  key={submission.id}
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
                      src={submission.imageUrl}
                      alt={submission.trackName}
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {submission.tags.map((tag) => (
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
                    {submission.trackName}
                  </h3>
                  <p className="text-muted-foreground/70 text-sm mb-3">
                    {submission.artistName}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70 mb-4">
                    <Music2 className="w-3 h-3" />
                    <span>{submission.genre}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{submission.location}</span>
                  </div>

                  {/* Vote Count */}
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground/70">
                      {submission.votes.toLocaleString()} votes
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 glass-card border-primary/30 text-white hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        handleVote(submission.id, submission.artistName)
                      }
                      disabled={hasVoted || votesRemaining === 0}
                      className={`flex-1 ${
                        hasVoted
                          ? "bg-accent/20 text-accent"
                          : "gradient-bg neon-glow holo-button"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      {hasVoted ? "Voted" : "Upvote"}
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
