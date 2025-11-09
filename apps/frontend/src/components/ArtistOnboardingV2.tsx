import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Upload, Award, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";

interface ArtistOnboardingV2Props {
  onNavigate: (page: string) => void;
}

export function ArtistOnboardingV2({ onNavigate }: ArtistOnboardingV2Props) {
  const [step, setStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Welcome, Artist!",
      description: "Fholio helps your music get heard and rewarded.",
      icon: Music,
      gradient: "from-accent to-pink-600",
    },
    {
      id: 2,
      title: "Submit & Compete",
      description: "Upload your track each week to enter the league.",
      icon: Upload,
      gradient: "from-pink-600 to-secondary",
    },
    {
      id: 3,
      title: "Grow Your Base",
      description: "Fans vote, you rise up, and share in the rewards.",
      icon: Award,
      gradient: "from-secondary to-primary",
    },
  ];

  const currentStep = steps[step - 1];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onNavigate("artist-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background - Pink Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-pink-950/30 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-lg w-full relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="md" glow />
        </div>

        {/* Modal Card */}
        <div className="glass-card rounded-2xl p-10 neon-glow">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-6"
            >
              {/* Icon */}
              <div className="flex justify-center">
                <div
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${currentStep.gradient} flex items-center justify-center`}
                >
                  <Icon className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="text-3xl text-white tracking-tight mb-3">
                  {currentStep.title}
                </h2>
                <p className="text-lg text-muted-foreground/80">
                  {currentStep.description}
                </p>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 pt-4">
                {steps.map((s) => (
                  <div
                    key={s.id}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      s.id === step
                        ? "w-8 bg-gradient-to-r from-accent to-pink-600"
                        : s.id < step
                          ? "w-2 bg-accent/50"
                          : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* Button */}
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-accent to-pink-600 hover:opacity-90 text-white neon-glow py-6 px-12 rounded-xl transition-all duration-200 w-full"
                size="lg"
              >
                {step < 3 ? (
                  <>
                    Next
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                ) : (
                  "Start Submitting"
                )}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
