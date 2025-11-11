import { useState, useEffect } from "react";
import { LandingPageV2 } from "./components/LandingPageV2";
import { NavigationV2 } from "./components/NavigationV2";
import { FanSignIn } from "./components/FanSignIn";
import { ArtistSignIn } from "./components/ArtistSignIn";
import { FanOnboardingV2 } from "./components/FanOnboardingV2";
import { ArtistOnboardingV2 } from "./components/ArtistOnboardingV2";
import { FanDashboard } from "./components/FanDashboard";
import { ArtistDashboardV2 } from "./components/ArtistDashboardV2";
import { LeaderboardPage } from "./components/LeaderboardPage";
import { AuthPage } from "./components/AuthPage";
import { Logo } from "./components/Logo";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

type Page =
  | "home"
  | "auth"
  | "fan-signin"
  | "artist-signin"
  | "fan-onboarding"
  | "artist-onboarding"
  | "fan-dashboard"
  | "artist-dashboard"
  | "leaderboard"
  | "about";

type UserType = "guest" | "fan" | "artist" | null;

export default function AppV2() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [userType, setUserType] = useState<UserType>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavigate = (
    page: string,
    artistId?: string,
    newUserType?: UserType
  ) => {
    // Set user type if provided
    if (newUserType !== undefined) {
      setUserType(newUserType);
    }

    setCurrentPage(page as Page);

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthSuccess = (type: "fan" | "artist") => {
    setUserType(type);
    if (type === "fan") {
      setCurrentPage("fan-onboarding");
    } else {
      setCurrentPage("artist-onboarding");
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentPage("home");
    toast.success("Logged out successfully");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPageV2 />;
      case "auth":
        return <AuthPage />;
      case "fan-signin":
        return <FanSignIn onSuccess={() => handleAuthSuccess("fan")} />;
      case "artist-signin":
        return <ArtistSignIn onSuccess={() => handleAuthSuccess("artist")} />;
      case "fan-onboarding":
        return <FanOnboardingV2 />;
      case "artist-onboarding":
        return <ArtistOnboardingV2 />;
      case "fan-dashboard":
        return <FanDashboard onLogout={handleLogout} />;
      case "artist-dashboard":
        return <ArtistDashboardV2 onLogout={handleLogout} />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "about":
        return (
          <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl mb-6 gradient-text tracking-tighter">
                  About Fholio
                </h1>
                <p className="text-xl text-muted-foreground">
                  The Fantasy League for Music
                </p>
              </div>
              <div className="glass-card rounded-2xl p-8 space-y-6">
                <p className="text-lg text-white/90">
                  Fholio is a next-generation platform where fans build "music
                  portfolios" of artists and earn rewards when those artists
                  perform well.
                </p>
                <p className="text-muted-foreground">
                  Every week, fans vote on 100 tracks, draft 5 artists to their
                  lineup, and watch as their picks compete for the Top 10. When
                  your artists win, you earn a share of the prize pool.
                </p>
                <p className="text-muted-foreground">
                  Artists upload their music, build a fan base, and earn 40% of
                  the weekly prize pool when they make the Top 10.
                </p>
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-white mb-3 tracking-tight">
                    Weekly Cycle
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Friday: Reveal Top 100 tracks and vote</li>
                    <li>• Monday: Draft your 5-artist lineup</li>
                    <li>• Thursday: Live show reveals Top 10 winners</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <LandingPageV2 />;
    }
  };

  // Hide navigation on certain pages
  const hideNav = [
    "home",
    "auth",
    "fan-signin",
    "artist-signin",
    "fan-onboarding",
    "artist-onboarding",
    "fan-dashboard",
    "artist-dashboard",
  ].includes(currentPage);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation - Only show on guest pages */}
      {!hideNav && (
        <NavigationV2 currentPage={currentPage} userType={userType} />
      )}

      <main>{renderPage()}</main>

      {/* Footer - Only show on certain pages */}
      {!isMobile && currentPage === "leaderboard" && userType === "guest" && (
        <footer className="border-t border-primary/10 mt-20 glass-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <div className="mb-6">
                  <Logo size="md" glow />
                </div>
                <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
                  The Fantasy League of Music. Build your portfolio, back your
                  favorite artists, and earn rewards based on real performance.
                </p>
                <div className="flex gap-4 text-sm text-muted-foreground/70">
                  <p>© 2025 Fholio</p>
                  <span>•</span>
                  <p className="gradient-text">Your Fandom. Your Fortune.</p>
                </div>
              </div>
              <div>
                <h3 className="text-white mb-6 tracking-tight">Get Started</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleNavigate("fan-signin")}
                    className="block text-muted-foreground hover:text-white hover:gradient-text transition-all"
                  >
                    Sign Up as Fan
                  </button>
                  <button
                    onClick={() => handleNavigate("artist-signin")}
                    className="block text-muted-foreground hover:text-white hover:gradient-text transition-all"
                  >
                    Sign Up as Artist
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/5 text-center space-y-4">
              <p className="text-sm text-muted-foreground/80">
                Fholio is a skill-based fantasy platform. 18+ only. Available in
                participating regions. Please play responsibly.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-muted-foreground/60 tracking-wider">
                <span className="hover:text-accent transition-colors">
                  NO BETS. JUST BRILLIANCE.
                </span>
                <span>•</span>
                <span className="hover:text-primary transition-colors">
                  FANS FUEL THE FUTURE.
                </span>
                <span>•</span>
                <span className="hover:text-secondary transition-colors">
                  DISCOVER. DRAFT. DOMINATE.
                </span>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Toast Notifications */}
      <Toaster position={isMobile ? "top-center" : "top-right"} />
    </div>
  );
}
