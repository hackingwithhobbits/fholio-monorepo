"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GlobalNavigation } from "./GlobalNavigation";
import { GlobalFooter } from "./GlobalFooter";
import { MobileNavigationBar } from "./MobileNavigationBar";
import { HelpButton } from "./HelpButton";
import { authUtils } from "@/lib/auth";
import { toast } from "sonner";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"fan" | "artist" | null>(null);

  // Check authentication on mount and pathname change
  useEffect(() => {
    const session = authUtils.getSession();
    if (session) {
      setIsLoggedIn(true);
      setUserType(session.userType);
    } else {
      setIsLoggedIn(false);
      setUserType(null);
    }
  }, [pathname]);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle logout
  const handleLogout = () => {
    authUtils.clearSession();
    setIsLoggedIn(false);
    setUserType(null);
    toast.success("Logged out successfully");
    router.push("/");
  };

  // Pages that should hide the global navigation
  const hideNav = [
    "/fan-signin",
    "/artist-signin",
    "/fan-onboarding",
    "/artist-onboarding",
    "/fan-dashboard",
    "/artist-dashboard",
    "/fan-profile",
    "/artist-profile",
  ].includes(pathname);

  // Pages that should show footer
  const showFooter =
    [
      "/",
      "/home",
      "/leaderboard",
      "/live-show",
      "/weekly-games",
      "/wallet",
      "/about",
    ].includes(pathname) && !isLoggedIn;

  // Pages that should show help button
  const showHelp = ![
    "/fan-signin",
    "/artist-signin",
    "/fan-onboarding",
    "/artist-onboarding",
  ].includes(pathname);

  // Show mobile navigation on public pages
  const showMobileNav = ![
    "/fan-signin",
    "/artist-signin",
    "/fan-onboarding",
    "/artist-onboarding",
  ].includes(pathname);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Navigation */}
      {!hideNav && (
        <div className="hidden lg:block">
          <GlobalNavigation
            currentPage={pathname.slice(1) || "home"}
            isLoggedIn={isLoggedIn}
            userType={userType}
          />
        </div>
      )}

      {/* Mobile Navigation */}
      {showMobileNav && (
        <div className="lg:hidden">
          <MobileNavigationBar
            currentPage={pathname.slice(1) || "home"}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            userType={userType}
          />
        </div>
      )}

      <main className={showMobileNav ? "lg:pt-0 pt-16 pb-20" : ""}>
        {children}
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
    </div>
  );
}
