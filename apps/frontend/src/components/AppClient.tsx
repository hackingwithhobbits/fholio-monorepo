"use client";

import { useState } from "react";
import { Navigation } from "./Navigation";
import { LandingPage } from "./LandingPage";
import { DiscoverPage } from "./DiscoverPage";
import { FanDashboard } from "./FanDashboard";
import { TrackDetailPage } from "./TrackDetailPage";
import { PortfolioPage } from "./PortfolioPage";
import { ArtistPage } from "./ArtistPage";
import { ArtistDashboard } from "./ArtistDashboard";
import { AuthPage } from "./AuthPage";
import { PaymentPage } from "./PaymentPage";
import { SettingsPage } from "./SettingsPage";
import { SupportPage } from "./SupportPage";
import { NotificationsPanel } from "./NotificationsPanel";
import { PersistentMiniPlayer } from "./PersistentMiniPlayer";

type PageType =
  | "landing"
  | "discover"
  | "browse"
  | "track-detail"
  | "portfolio"
  | "artist-page"
  | "artist-dashboard"
  | "auth"
  | "payment"
  | "settings"
  | "support";

interface AppClientProps {
  initialPage?: PageType;
}

export function AppClient({ initialPage = "landing" }: AppClientProps) {
  const [currentPage, setCurrentPage] = useState<PageType>(initialPage);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Mini Player State
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(75);

  const handlePageChange = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setPosition(0);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    // Logic for next track
  };

  const handlePrevious = () => {
    // Logic for previous track
  };

  const handleSeek = (newPosition: number) => {
    setPosition(newPosition);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleCloseMiniPlayer = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
    setPosition(0);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onPageChange={handlePageChange} />;
      case "discover":
        return <DiscoverPage onPageChange={handlePageChange} />;
      case "browse":
        return <FanDashboard onPageChange={handlePageChange} />;
      case "track-detail":
        return <TrackDetailPage onPageChange={handlePageChange} />;
      case "portfolio":
        return <PortfolioPage onPageChange={handlePageChange} />;
      case "artist-page":
        return <ArtistPage onPageChange={handlePageChange} />;
      case "artist-dashboard":
        return <ArtistDashboard onPageChange={handlePageChange} />;
      case "auth":
        return <AuthPage onPageChange={handlePageChange} />;
      case "payment":
        return <PaymentPage onPageChange={handlePageChange} />;
      case "settings":
        return <SettingsPage onPageChange={handlePageChange} />;
      case "support":
        return <SupportPage onPageChange={handlePageChange} />;
      default:
        return <LandingPage onPageChange={handlePageChange} />;
    }
  };

  const showNavigation = currentPage !== "auth" && currentPage !== "payment";

  return (
    <>
      {showNavigation && (
        <Navigation
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onNotificationsToggle={() =>
            setIsNotificationsOpen(!isNotificationsOpen)
          }
        />
      )}

      <main className={currentTrack ? "pb-20" : ""}>{renderCurrentPage()}</main>

      <NotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Persistent Mini Player */}
      {currentTrack && (
        <PersistentMiniPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onClose={handleCloseMiniPlayer}
          position={position}
          onSeek={handleSeek}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
      )}
    </>
  );
}
