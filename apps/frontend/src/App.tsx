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
import { MobileWalletPage } from "./components/MobileWalletPage";
import { MobileSettingsPage } from "./components/MobileSettingsPage";
import { SettingsPage } from "./components/SettingsPage";
import { CommunityPage } from "./components/CommunityPage";
import { ArtistSignupPage } from "./components/ArtistSignupPage";
import { SponsorsPage } from "./components/SponsorsPage";
import { ChartsPage } from "./components/ChartsPage";
import { RulesPage } from "./components/RulesPage";
import { LeagueTiersPage } from "./components/LeagueTiersPage";
import { HomePageComplete } from "./components/HomePageComplete";
import { GlobalNavigation } from "./components/GlobalNavigation";
import { GlobalFooter } from "./components/GlobalFooter";
import { HelpButton } from "./components/HelpButton";
import { FanSignIn } from "./components/FanSignIn";
import { ArtistSignIn } from "./components/ArtistSignIn";
import { FanOnboardingV2 } from "./components/FanOnboardingV2";
import { ArtistOnboardingV2 } from "./components/ArtistOnboardingV2";
import { FanDashboard } from "./components/FanDashboard";
import { ArtistDashboardV2 } from "./components/ArtistDashboardV2";
import { FanProfilePage } from "./components/FanProfilePage";
import { ArtistProfilePage } from "./components/ArtistProfilePage";
import { LeaderboardPage } from "./components/LeaderboardPage";
import { LiveShowPage } from "./components/LiveShowPage";
import { WeeklyGamesPage } from "./components/WeeklyGamesPage";
import { WalletPage } from "./components/WalletPage";
import { AboutPage } from "./components/AboutPage";
import { Logo } from "./components/Logo";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

type Page =
  | "home"
  | "fan-signin"
  | "artist-signin"
  | "fan-onboarding"
  | "artist-onboarding"
  | "fan-dashboard"
  | "artist-dashboard"
  | "fan-profile"
  | "artist-profile"
  | "leaderboard"
  | "live-show"
  | "weekly-games"
  | "wallet"
  | "about";

type UserType = "guest" | "fan" | "artist" | null;

export default function App() {
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

  const isLoggedIn = userType === "fan" || userType === "artist";

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePageComplete onNavigate={handleNavigate} />;
      case "fan-signin":
        return (
          <FanSignIn
            onNavigate={handleNavigate}
            onSuccess={() => handleAuthSuccess("fan")}
          />
        );
      case "artist-signin":
        return (
          <ArtistSignIn
            onNavigate={handleNavigate}
            onSuccess={() => handleAuthSuccess("artist")}
          />
        );
      case "fan-onboarding":
        return <FanOnboardingV2 onNavigate={handleNavigate} />;
      case "artist-onboarding":
        return <ArtistOnboardingV2 onNavigate={handleNavigate} />;
      case "fan-dashboard":
        return (
          <FanDashboard onNavigate={handleNavigate} onLogout={handleLogout} />
        );
      case "artist-dashboard":
        return (
          <ArtistDashboardV2
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "fan-profile":
        return (
          <FanProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />
        );
      case "artist-profile":
        return (
          <ArtistProfilePage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "leaderboard":
        return <LeaderboardPage onNavigate={handleNavigate} />;
      case "live-show":
        return <LiveShowPage onNavigate={handleNavigate} />;
      case "weekly-games":
        return <WeeklyGamesPage onNavigate={handleNavigate} />;
      case "wallet":
        return <WalletPage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      default:
        return <HomePageComplete onNavigate={handleNavigate} />;
    }
  };

  // Pages that should hide the global navigation
  const hideNav = [
    "fan-signin",
    "artist-signin",
    "fan-onboarding",
    "artist-onboarding",
    "fan-dashboard",
    "artist-dashboard",
    "fan-profile",
    "artist-profile",
  ].includes(currentPage);

  // Pages that should show footer
  const showFooter =
    [
      "home",
      "leaderboard",
      "live-show",
      "weekly-games",
      "wallet",
      "about",
    ].includes(currentPage) && !isLoggedIn;

  // Pages that should show help button
  const showHelp = ![
    "fan-signin",
    "artist-signin",
    "fan-onboarding",
    "artist-onboarding",
  ].includes(currentPage);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Global Navigation */}
      {!hideNav && (
        <GlobalNavigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          userType={userType}
        />
      )}

      <main>{renderPage()}</main>

      {/* Global Footer */}
      {showFooter && <GlobalFooter onNavigate={handleNavigate} />}

      {/* Help Button */}
      {showHelp && <HelpButton onNavigate={handleNavigate} />}

      {/* Toast Notifications */}
      <Toaster position={isMobile ? "top-center" : "top-right"} />
    </div>
  );
}
