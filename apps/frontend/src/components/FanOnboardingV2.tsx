import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";

interface FanOnboardingV2Props {
  onNavigate: (page: string) => void;
}

export function FanOnboardingV2({ onNavigate }: FanOnboardingV2Props) {
  const [step, setStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Welcome to Fholio!",
      description: "Pick your favorite songs each week to win cash and prizes.",
      icon: Trophy,
      gradient: "from-primary to-purple-600",
    },
    {
      id: 2,
      title: "How it Works",
      description:
        "Every Friday we drop 100 new tracks. Vote and add 5 to your team.",
      icon: TrendingUp,
      gradient: "from-purple-600 to-accent",
    },
    {
      id: 3,
      title: "Earn Rewards",
      description:
        "Top fans share the prize pool. Stay active to climb the leaderboard.",
      icon: DollarSign,
      gradient: "from-accent to-secondary",
    },
  ];

  const currentStep = steps[step - 1];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onNavigate("fan-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background - Purple Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"
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
                        ? "w-8 bg-gradient-to-r from-primary to-purple-600"
                        : s.id < step
                          ? "w-2 bg-primary/50"
                          : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* Button */}
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white neon-glow py-6 px-12 rounded-xl transition-all duration-200 w-full"
                size="lg"
              >
                {step < 3 ? (
                  <>
                    Next
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                ) : (
                  "Let's Go!"
                )}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
