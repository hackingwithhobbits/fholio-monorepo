import { motion } from "framer-motion";
import {
  Music,
  Upload,
  CheckCircle2,
  Award,
  TrendingUp,
  DollarSign,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Logo } from "./Logo";
import { toast } from "sonner";

interface ArtistSignupPageProps {
  onNavigate: (page: string) => void;
}

export function ArtistSignupPage({ onNavigate }: ArtistSignupPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    spotify: "",
    youtube: "",
    tiktok: "",
    instagram: "",
    weeklyTrack: "",
    league: "Minor" as "Major" | "Minor",
  });

  const handleSubmit = () => {
    toast.success("Application Submitted!", {
      description:
        "Welcome to Fholio. We'll review your profile and notify you within 24 hours.",
    });
    setTimeout(() => onNavigate("discover"), 1500);
  };

  const steps = [
    { number: 1, title: "Connect Platforms", icon: Music },
    { number: 2, title: "Upload Track", icon: Upload },
    { number: 3, title: "League Placement", icon: Award },
    { number: 4, title: "Review & Confirm", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8 relative">
      {/* Background Logo Watermark */}
      <div className="logo-watermark">
        <Logo size="xl" className="opacity-100" style={{ height: "400px" }} />
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-6">
            <Logo size="lg" glow className="mx-auto" />
          </div>
          <div className="text-xs text-accent mb-4 tracking-widest uppercase">
            ADD ME TO YOUR FHOLIO
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 gradient-text tracking-tighter">
            Join as an Artist
          </h1>
          <p className="text-xl text-muted-foreground/80 tracking-tight max-w-2xl mx-auto">
            Get discovered by fans, compete weekly, and earn when your music
            wins
          </p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isActive = step === s.number;
              const isComplete = step > s.number;

              return (
                <div key={s.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all ${
                        isComplete
                          ? "gradient-bg neon-glow"
                          : isActive
                            ? "border-2 border-primary/50 bg-primary/10"
                            : "border border-white/10 bg-white/5"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <Icon
                          className={`w-6 h-6 ${
                            isActive ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      )}
                    </div>
                    <div
                      className={`text-xs tracking-tight hidden sm:block ${
                        isActive ? "text-white" : "text-muted-foreground/70"
                      }`}
                    >
                      {s.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 ${
                        isComplete ? "bg-primary" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card rounded-2xl p-8 neon-glow"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl text-white tracking-tight mb-6">
                Connect Your Platforms
              </h2>

              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-2">Spotify Profile URL</Label>
                  <Input
                    placeholder="https://open.spotify.com/artist/..."
                    value={formData.spotify}
                    onChange={(e) =>
                      setFormData({ ...formData, spotify: e.target.value })
                    }
                    className="bg-input-background border-primary/20 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2">
                    YouTube Channel (Optional)
                  </Label>
                  <Input
                    placeholder="https://youtube.com/@..."
                    value={formData.youtube}
                    onChange={(e) =>
                      setFormData({ ...formData, youtube: e.target.value })
                    }
                    className="bg-input-background border-primary/20 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2">
                    TikTok Profile (Optional)
                  </Label>
                  <Input
                    placeholder="https://tiktok.com/@..."
                    value={formData.tiktok}
                    onChange={(e) =>
                      setFormData({ ...formData, tiktok: e.target.value })
                    }
                    className="bg-input-background border-primary/20 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2">
                    Instagram Profile (Optional)
                  </Label>
                  <Input
                    placeholder="https://instagram.com/..."
                    value={formData.instagram}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram: e.target.value })
                    }
                    className="bg-input-background border-primary/20 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl text-white tracking-tight mb-6">
                Upload Your Weekly Track
              </h2>

              <div className="glass-card p-8 rounded-xl border-2 border-dashed border-primary/30 text-center hover:border-primary/50 transition-all cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p className="text-white mb-2">
                  Drop your track or click to browse
                </p>
                <p className="text-sm text-muted-foreground/70">
                  MP3, WAV, or FLAC • Max 50MB
                </p>
              </div>

              <div>
                <Label className="text-white mb-2">Track Title</Label>
                <Input
                  placeholder="Your track name"
                  value={formData.weeklyTrack}
                  onChange={(e) =>
                    setFormData({ ...formData, weeklyTrack: e.target.value })
                  }
                  className="bg-input-background border-primary/20 text-white"
                />
              </div>

              <div className="glass-card p-4 rounded-xl bg-accent/5 border border-accent/20">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-sm text-muted-foreground/80">
                    <strong className="text-white">Pro Tip:</strong> Tracks can
                    be reused weekly, but scores decay 10-15% to encourage fresh
                    content. New tracks perform best!
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl text-white tracking-tight mb-6">
                Your League Placement
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className={`glass-card p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.league === "Major"
                      ? "border-accent neon-glow"
                      : "border-white/10 hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl text-white tracking-tight">
                        Major League
                      </h3>
                      <Badge className="bg-accent/20 text-accent border-0 text-xs">
                        Auto-Qualified
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground/70 mb-4">
                    100K+ monthly listeners OR 20K+ Instagram followers
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-white/80">Larger reward pools</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-white/80">Premium visibility</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-white/80">
                        Festival partnerships
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`glass-card p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.league === "Minor"
                      ? "border-primary neon-glow"
                      : "border-white/10 hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl text-white tracking-tight">
                        Minor League
                      </h3>
                      <Badge className="bg-primary/20 text-primary border-0 text-xs">
                        Your Tier
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground/70 mb-4">
                    Under 100K listeners or 20K followers
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-white/80">
                        Faster rise to Major
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-white/80">Discovery features</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-white/80">Growth rewards</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-secondary mt-0.5" />
                  <div className="text-sm text-muted-foreground/80">
                    <strong className="text-white">Note:</strong> League
                    placement is auto-assigned based on your verified follower
                    counts. You'll be promoted automatically when you hit Major
                    League thresholds!
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl text-white tracking-tight mb-6">
                Review & Confirm
              </h2>

              <div className="space-y-4">
                <div className="glass-card p-4 rounded-xl">
                  <div className="text-sm text-muted-foreground/70 mb-1">
                    League
                  </div>
                  <div className="text-white tracking-tight">
                    {formData.league} League
                  </div>
                </div>

                <div className="glass-card p-4 rounded-xl">
                  <div className="text-sm text-muted-foreground/70 mb-1">
                    Weekly Track
                  </div>
                  <div className="text-white tracking-tight">
                    {formData.weeklyTrack || "No track uploaded"}
                  </div>
                </div>

                <div className="glass-card p-4 rounded-xl">
                  <div className="text-sm text-muted-foreground/70 mb-1">
                    Connected Platforms
                  </div>
                  <div className="space-y-1">
                    {formData.spotify && (
                      <div className="text-white text-sm">✓ Spotify</div>
                    )}
                    {formData.youtube && (
                      <div className="text-white text-sm">✓ YouTube</div>
                    )}
                    {formData.tiktok && (
                      <div className="text-white text-sm">✓ TikTok</div>
                    )}
                    {formData.instagram && (
                      <div className="text-white text-sm">✓ Instagram</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Rules */}
              <div className="glass-card p-6 rounded-xl border border-primary/20">
                <h3 className="text-lg text-white mb-4 tracking-tight">
                  Artist Rules & Guidelines
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground/80">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>
                      Submit one active track per week before Friday 11:59 PM
                      EST
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Tracks can repeat but decay 10-15% per week</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>
                      No fake streams, bots, or manipulation—violations =
                      removal
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>
                      Payouts process Monday following the competition week
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>
                      60% of pool goes to top performers, 15% shared with fans
                    </span>
                  </div>
                </div>
              </div>

              {/* Premium Upgrade CTA */}
              <div className="glass-card p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 neon-glow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-white mb-2 tracking-tight">
                      Upgrade to Premium Artist
                    </h3>
                    <p className="text-sm text-muted-foreground/80 mb-4">
                      Get analytics, placement boosts, fan messaging, and
                      promotion features for $15/month
                    </p>
                    <Button className="gradient-bg neon-glow holo-button rounded-xl">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className="text-white hover:bg-white/5"
            >
              Back
            </Button>

            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                className="gradient-bg neon-glow holo-button rounded-xl px-8"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="gradient-bg neon-glow holo-button rounded-xl px-8"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            )}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="glass-card p-6 rounded-2xl text-center neon-glow">
            <div className="w-12 h-12 rounded-xl gradient-bg mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2 tracking-tight">Get Discovered</h3>
            <p className="text-sm text-muted-foreground/70">
              Reach thousands of active music fans
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center neon-glow">
            <div className="w-12 h-12 rounded-xl gradient-bg mx-auto mb-4 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2 tracking-tight">Earn Weekly</h3>
            <p className="text-sm text-muted-foreground/70">
              Get paid for real engagement
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center neon-glow">
            <div className="w-12 h-12 rounded-xl gradient-bg mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white mb-2 tracking-tight">Build Fanbase</h3>
            <p className="text-sm text-muted-foreground/70">
              Connect with superfans who back you
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
