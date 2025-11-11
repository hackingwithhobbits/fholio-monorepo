import { useState, useEffect } from "react";
import { HomePageComplete } from "./components/HomePageComplete";
import { GlobalNavigation } from "./components/GlobalNavigation";
import { GlobalFooter } from "./components/GlobalFooter";
import { MobileNavigationBar } from "./components/MobileNavigationBar";
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
        return <HomePageComplete />;
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
      case "fan-profile":
        return <FanProfilePage onLogout={handleLogout} />;
      case "artist-profile":
        return <ArtistProfilePage onLogout={handleLogout} />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "live-show":
        return <LiveShowPage />;
      case "weekly-games":
        return <WeeklyGamesPage />;
      case "wallet":
        return <WalletPage />;
      case "about":
        return <AboutPage />;
      default:
        return <HomePageComplete />;
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

  // Show mobile navigation on public pages
  const showMobileNav = ![
    "fan-signin",
    "artist-signin",
    "fan-onboarding",
    "artist-onboarding",
  ].includes(currentPage);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Navigation */}
      {!hideNav && (
        <div className="hidden lg:block">
          <GlobalNavigation
            currentPage={currentPage}
            isLoggedIn={isLoggedIn}
            userType={userType}
          />
        </div>
      )}

      {/* Mobile Navigation */}
      {showMobileNav && (
        <div className="lg:hidden">
          <MobileNavigationBar
            currentPage={currentPage}
            isLoggedIn={isLoggedIn}
            userType={userType}
            onLogout={handleLogout}
          />
        </div>
      )}

      <main className={showMobileNav ? "lg:pt-0 pt-16 pb-20" : ""}>
        {renderPage()}
      </main>

      {/* Global Footer - Desktop Only */}
      {showFooter && (
        <div className="hidden lg:block">
          <GlobalFooter />
        </div>
      )}

      {/* Help Button - Desktop Only */}
      {showHelp && (
        <div className="hidden lg:block">
          <HelpButton />
        </div>
      )}

      {/* Toast Notifications */}
      <Toaster position={isMobile ? "top-center" : "top-right"} />
    </div>
  );
}
