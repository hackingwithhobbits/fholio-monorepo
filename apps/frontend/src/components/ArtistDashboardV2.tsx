"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Upload,
  Music,
  Trophy,
  User,
  LogOut,
  Play,
  Award,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Logo } from "./Logo";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { LeaderboardPage } from "./LeaderboardPage";
import { authUtils, UserSession } from "@/lib/auth";
interface ArtistDashboardV2Props {
  onLogout: () => void;
}

export function ArtistDashboardV2({ onLogout }: ArtistDashboardV2Props) {
  const [activeTab, setActiveTab] = useState<
    "submit" | "tracks" | "leaderboard" | "profile"
  >("submit");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const router = useRouter();
  // Form state
  const [artistName, setArtistName] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  // Load user session on mount
  useEffect(() => {
    const session = authUtils.getSession();
    if (session) {
      setUserSession(session);
    }
  }, []);
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };
  const tabs = [
    { id: "submit" as const, label: "Submit Music", icon: Upload },
    { id: "tracks" as const, label: "My Tracks", icon: Music },
    { id: "leaderboard" as const, label: "Leaderboard", icon: Trophy },
    { id: "profile" as const, label: "Profile", icon: User },
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
    // Reset form
    setArtistName("");
    setTrackTitle("");
    setGenre("");
    setDescription("");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "submit":
        return (
          <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="text-xs text-accent mb-4 tracking-widest uppercase">
                  SUBMIT YOUR TRACK
                </div>
                <h1 className="text-4xl md:text-5xl mb-4 gradient-text tracking-tighter">
                  Upload New Music
                </h1>
                <p className="text-lg text-muted-foreground/80">
                  Get your track into this week's Top 100 voting round
                </p>
              </motion.div>

              {/* Submission Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-8 neon-glow"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Artist Name */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Artist Name
                    </label>
                    <Input
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                      placeholder="Your artist name"
                      className="bg-white/5 border-white/10 text-white rounded-xl"
                      required
                    />
                  </div>

                  {/* Track Title */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Track Title
                    </label>
                    <Input
                      value={trackTitle}
                      onChange={(e) => setTrackTitle(e.target.value)}
                      placeholder="Name of your track"
                      className="bg-white/5 border-white/10 text-white rounded-xl"
                      required
                    />
                  </div>

                  {/* Genre */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Genre
                    </label>
                    <Select value={genre} onValueChange={setGenre} required>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pop">Pop</SelectItem>
                        <SelectItem value="rock">Rock</SelectItem>
                        <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                        <SelectItem value="electronic">Electronic</SelectItem>
                        <SelectItem value="r&b">R&B</SelectItem>
                        <SelectItem value="indie">Indie</SelectItem>
                        <SelectItem value="country">Country</SelectItem>
                        <SelectItem value="jazz">Jazz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Upload Audio */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Upload Audio
                    </label>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-3 text-accent" />
                      <p className="text-white mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">
                        MP3, WAV, or FLAC (max. 50MB)
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Short Description
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell fans about this track..."
                      className="bg-white/5 border-white/10 text-white rounded-xl min-h-[100px]"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-accent to-pink-600 hover:opacity-90 text-white neon-glow py-6 rounded-xl transition-all duration-200"
                    size="lg"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Submit Track
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        );

      case "tracks":
        return (
          <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="text-xs text-accent mb-4 tracking-widest uppercase">
                  ARTIST DASHBOARD
                </div>
                <h1 className="text-4xl md:text-5xl mb-4 gradient-text tracking-tighter">
                  My Submissions
                </h1>
                <p className="text-lg text-muted-foreground/80">
                  Track performance and manage your music
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
                  <div className="text-3xl gradient-text tracking-tight">
                    #7
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 neon-glow">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Total Fans
                    </span>
                  </div>
                  <div className="text-3xl text-white tracking-tight">
                    2,847
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 neon-glow">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-secondary" />
                    <span className="text-sm text-muted-foreground">
                      This Week
                    </span>
                  </div>
                  <div className="text-3xl text-white tracking-tight">
                    $1,240
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 neon-glow">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">
                      Momentum
                    </span>
                  </div>
                  <div className="text-3xl text-accent tracking-tight">
                    +12%
                  </div>
                </div>
              </motion.div>

              {/* Submissions List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-2xl text-white tracking-tight">
                  Your Tracks
                </h2>
                {submissions.map((track, index) => (
                  <div
                    key={track.id}
                    className="glass-card rounded-2xl p-6 neon-glow hover:scale-[1.01] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-pink-600 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg text-white tracking-tight mb-1">
                          {track.title}
                        </h3>
                        <div className="flex items-center gap-3">
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
                          {track.rank && (
                            <span className="text-sm text-muted-foreground">
                              Rank: #{track.rank}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="hidden md:flex items-center gap-6 text-center">
                        <div>
                          <div className="text-2xl text-white tracking-tight">
                            {track.votes.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Votes
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl text-white tracking-tight">
                            {track.streams.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Streams
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        );

      case "leaderboard":
        return <LeaderboardPage />;

      case "profile":
        return (
          <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
            <div className="max-w-2xl mx-auto">
              <div className="glass-card rounded-2xl p-8">
                {/* Profile Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent to-pink-600 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl text-white mb-2">
                    {userSession?.artistName || "Artist"}
                  </h2>
                  <p className="text-muted-foreground">Fholio Artist</p>
                </div>

                {/* Profile Details */}
                <div className="space-y-6">
                  <div className="border-t border-white/10 pt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Artist Name
                        </label>
                        <div className="text-white mt-1 text-lg">
                          {userSession?.artistName || "Loading..."}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          Email
                        </label>
                        <div className="text-white mt-1">
                          {userSession?.email || "Loading..."}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          Member Since
                        </label>
                        <div className="text-white mt-1">
                          {userSession?.createdAt
                            ? formatDate(userSession.createdAt)
                            : "Loading..."}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          Account Type
                        </label>
                        <div className="text-white mt-1 flex items-center gap-2">
                          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                            Beta Artist
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          Total Submissions
                        </label>
                        <div className="text-white mt-1">
                          {submissions.length} tracks
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Beta Notice */}
                  <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
                    <p className="text-sm text-accent">
                      🎵 You're part of our Beta! More features coming soon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => router.push("/")}
            >
              <Logo
                size="md"
                glow
                className="group-hover:scale-110 transition-transform"
              />
            </div>

            {/* Tab Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-200 ease-in-out group ${
                      isActive
                        ? "text-white"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-accent to-pink-600 rounded-xl opacity-20 neon-glow" />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-accent to-pink-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200 ease-in-out" />
                    )}
                    <TabIcon
                      className={`w-4 h-4 relative z-10 ${isActive ? "text-accent" : ""}`}
                    />
                    <span className="relative z-10 tracking-tight text-sm whitespace-nowrap">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Logout Button */}
            <div className="flex items-center gap-4">
              {/* Show artist name on desktop */}
              {userSession && (
                <div className="hidden lg:block text-right">
                  <div className="text-white text-sm font-medium">
                    {userSession.artistName}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {userSession.email}
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                onClick={onLogout}
                className="text-white hover:bg-white/5 rounded-xl transition-all duration-200 ease-in-out"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden border-t border-primary/10 px-4 py-2">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-accent/20 text-white"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <main>{renderTabContent()}</main>

      {/* Success Modal */}
      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent className="glass-card border-accent/30">
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <Upload className="w-8 h-8 text-accent" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-2xl gradient-text">
              Track Submitted Successfully!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-muted-foreground">
              Your track has been submitted and is now being reviewed. You'll be
              notified once it's live in the voting round.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => {
                setShowSuccessModal(false);
                setActiveTab("tracks");
              }}
              className="bg-gradient-to-r from-accent to-pink-600 hover:opacity-90 text-white"
            >
              View My Tracks
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
