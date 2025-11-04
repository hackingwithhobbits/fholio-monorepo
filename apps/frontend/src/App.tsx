import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { MobileNav } from "./components/MobileNav";
import { BottomNavigation } from "./components/BottomNavigation";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { LandingPage } from "./components/LandingPage";
import { MobileHomePage } from "./components/MobileHomePage";
import { VoteRoom } from "./components/VoteRoom";
import { MobileVoteRoom } from "./components/MobileVoteRoom";
import { DraftPage } from "./components/DraftPage";
import { MobileDraftPage } from "./components/MobileDraftPage";
import { LiveWeek } from "./components/LiveWeek";
import { MobileLiveWeek } from "./components/MobileLiveWeek";
import { ResultsReveal } from "./components/ResultsReveal";
import { DashboardV2 } from "./components/DashboardV2";
import { ArtistProfile } from "./components/ArtistProfile";
import { EducationPage } from "./components/EducationPage";
import { DiscoverPageV2 } from "./components/DiscoverPageV2";
import { WalletPage } from "./components/WalletPage";
import { MobileWalletPage } from "./components/MobileWalletPage";
import { MobileSettingsPage } from "./components/MobileSettingsPage";
import { SettingsPage } from "./components/SettingsPage";
import { LeaderboardPage } from "./components/LeaderboardPage";
import { CommunityPage } from "./components/CommunityPage";
import { ArtistSignupPage } from "./components/ArtistSignupPage";
import { SponsorsPage } from "./components/SponsorsPage";
import { ChartsPage } from "./components/ChartsPage";
import { RulesPage } from "./components/RulesPage";
import { LeagueTiersPage } from "./components/LeagueTiersPage";
import { Logo } from "./components/Logo";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

type Page =
  | "home"
  | "vote"
  | "draft"
  | "liveweek"
  | "results"
  | "dashboard"
  | "artist"
  | "education"
  | "discover"
  | "wallet"
  | "settings"
  | "leaderboard"
  | "community"
  | "artist-signup"
  | "sponsors"
  | "charts"
  | "rules"
  | "leagues";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedArtistId, setSelectedArtistId] = useState<string>(
    "17fa9d7f-04b6-46f7-b877-39606b1d0a0c"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleNavigate = (page: string, artistId?: string) => {
    // Auto-login when navigating to certain pages
    if (
      [
        "vote",
        "draft",
        "liveweek",
        "results",
        "dashboard",
        "artist",
        "wallet",
        "settings",
        "community",
      ].includes(page)
    ) {
      setIsLoggedIn(true);
    }

    if (artistId) {
      setSelectedArtistId(artistId);
    }

    setCurrentPage(page as Page);

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle FAB actions based on current page
  const handleFABAction = () => {
    switch (currentPage) {
      case "vote":
        toast.success("Track upvoted!", {
          description: "Your vote has been recorded.",
        });
        break;
      case "draft":
        toast.info("Add artist to lineup", {
          description: "Select from the list below.",
        });
        break;
      case "dashboard":
        handleNavigate("draft");
        break;
      case "discover":
        toast.info("Add to Fholio", {
          description: "Build your music portfolio.",
        });
        break;
      default:
        break;
    }
  };

  const renderPage = () => {
    // Use mobile-optimized components on mobile devices
    if (isMobile) {
      switch (currentPage) {
        case "home":
          return <MobileHomePage onNavigate={handleNavigate} />;
        case "vote":
          return <MobileVoteRoom onNavigate={handleNavigate} />;
        case "draft":
          return <MobileDraftPage onNavigate={handleNavigate} />;
        case "liveweek":
          return <MobileLiveWeek onNavigate={handleNavigate} />;
        case "results":
          return <ResultsReveal onNavigate={handleNavigate} />;
        case "discover":
          return <DiscoverPageV2 onNavigate={handleNavigate} />;
        case "dashboard":
          return <DashboardV2 onNavigate={handleNavigate} />;
        case "artist":
          return (
            <ArtistProfile
              artistId={selectedArtistId}
              onNavigate={handleNavigate}
            />
          );
        case "education":
          return <EducationPage onNavigate={handleNavigate} />;
        case "wallet":
          return <MobileWalletPage onNavigate={handleNavigate} />;
        case "settings":
          return <MobileSettingsPage onNavigate={handleNavigate} />;
        case "leaderboard":
          return <LeaderboardPage onNavigate={handleNavigate} />;
        case "community":
          return <CommunityPage onNavigate={handleNavigate} />;
        case "artist-signup":
          return <ArtistSignupPage onNavigate={handleNavigate} />;
        case "sponsors":
          return <SponsorsPage onNavigate={handleNavigate} />;
        case "charts":
          return <ChartsPage onNavigate={handleNavigate} />;
        case "rules":
          return <RulesPage onNavigate={handleNavigate} />;
        case "leagues":
          return <LeagueTiersPage onNavigate={handleNavigate} />;
        default:
          return <MobileHomePage onNavigate={handleNavigate} />;
      }
    }

    // Desktop versions
    switch (currentPage) {
      case "home":
        return <LandingPage onNavigate={handleNavigate} />;
      case "vote":
        return <VoteRoom onNavigate={handleNavigate} />;
      case "draft":
        return <DraftPage onNavigate={handleNavigate} />;
      case "liveweek":
        return <LiveWeek onNavigate={handleNavigate} />;
      case "results":
        return <ResultsReveal onNavigate={handleNavigate} />;
      case "discover":
        return <DiscoverPageV2 onNavigate={handleNavigate} />;
      case "dashboard":
        return <DashboardV2 onNavigate={handleNavigate} />;
      case "artist":
        return (
          <ArtistProfile
            artistId={selectedArtistId}
            onNavigate={handleNavigate}
          />
        );
      case "education":
        return <EducationPage onNavigate={handleNavigate} />;
      case "wallet":
        return <WalletPage onNavigate={handleNavigate} />;
      case "settings":
        return <SettingsPage onNavigate={handleNavigate} />;
      case "leaderboard":
        return <LeaderboardPage onNavigate={handleNavigate} />;
      case "community":
        return <CommunityPage onNavigate={handleNavigate} />;
      case "artist-signup":
        return <ArtistSignupPage onNavigate={handleNavigate} />;
      case "sponsors":
        return <SponsorsPage onNavigate={handleNavigate} />;
      case "charts":
        return <ChartsPage onNavigate={handleNavigate} />;
      case "rules":
        return <RulesPage onNavigate={handleNavigate} />;
      case "leagues":
        return <LeagueTiersPage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Navigation */}
      {!isMobile && (
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
        />
      )}

      <main>{renderPage()}</main>

      {/* Mobile Bottom Navigation */}
      {isMobile ? (
        <>
          <BottomNavigation
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
          <FloatingActionButton
            currentPage={currentPage}
            onAction={handleFABAction}
          />
        </>
      ) : (
        <MobileNav currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      {/* Footer - Hide on mobile */}
      {!isMobile && (
        <footer className="border-t border-primary/10 mt-20 glass-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-12">
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
                <h3 className="text-white mb-6 tracking-tight">Platform</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <button
                      onClick={() => handleNavigate("vote")}
                      className="hover:text-white hover:gradient-text transition-all"
                    >
                      Vote Room
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("draft")}
                      className="hover:text-white hover:gradient-text transition-all"
                    >
                      Draft
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("discover")}
                      className="hover:text-white hover:gradient-text transition-all"
                    >
                      Discover
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("charts")}
                      className="hover:text-white hover:gradient-text transition-all"
                    >
                      Charts
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("dashboard")}
                      className="hover:text-white hover:gradient-text transition-all"
                    >
                      My Fholio
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("wallet")}
                      className="hover:text-white hover:gradient-text transition-all"
                    >
                      Wallet & Rewards
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("community")}
                      className="hover:text-white hover:gradient-text transition-all"
                    >
                      Community
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("artist-signup")}
                      className="hover:text-white hover:gradient-text transition-all"
                    >
                      For Artists
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("rules")}
                      className="hover:text-white hover:gradient-text transition-all"
                    >
                      Rules
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("leagues")}
                      className="hover:text-white hover:gradient-text transition-all"
                    >
                      League Tiers
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate("sponsors")}
                      className="hover:text-white hover:gradient-text transition-all"
                    >
                      Partners
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white mb-6 tracking-tight">Legal</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <button className="hover:text-white hover:gradient-text transition-all">
                      Terms of Service
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white hover:gradient-text transition-all">
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white hover:gradient-text transition-all">
                      Responsible Gaming
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white hover:gradient-text transition-all">
                      Contact Us
                    </button>
                  </li>
                </ul>
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
