"use client";
import { useState, useEffect } from "react";
import { HomePageComplete } from "./HomePageComplete";
import { GlobalNavigation } from "./GlobalNavigation";
import { GlobalFooter } from "./GlobalFooter";
import { MobileNavigationBar } from "./MobileNavigationBar";
import { HelpButton } from "./HelpButton";
import { FanSignIn } from "./FanSignIn";
import { ArtistSignIn } from "./ArtistSignIn";
import { FanOnboardingV2 } from "./FanOnboardingV2";
import { ArtistOnboardingV2 } from "./ArtistOnboardingV2";
import { FanDashboard } from "./FanDashboard";
import { ArtistDashboardV2 } from "./ArtistDashboardV2";
import { FanProfilePage } from "./FanProfilePage";
import { ArtistProfilePage } from "./ArtistProfilePage";
import { LeaderboardPage } from "./LeaderboardPage";
import { LiveShowPage } from "./LiveShowPage";
import { WeeklyGamesPage } from "./WeeklyGamesPage";
import { WalletPage } from "./WalletPage";
import { AboutPage } from "./AboutPage";
import { Toaster } from "./ui/sonner";
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
            onNavigate={handleNavigate}
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
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            userType={userType}
          />
        </div>
      )}

      <main className={showMobileNav ? "lg:pt-0 pt-16 pb-20" : ""}>
        {renderPage()}
      </main>

      {/* Global Footer - Desktop Only */}
      {showFooter && (
        <div className="hidden lg:block">
          <GlobalFooter onNavigate={handleNavigate} />
        </div>
      )}

      {/* Help Button - Desktop Only */}
      {showHelp && (
        <div className="hidden lg:block">
          <HelpButton onNavigate={handleNavigate} />
        </div>
      )}

      {/* Toast Notifications */}
      <Toaster position={isMobile ? "top-center" : "top-right"} />
    </div>
  );
}
