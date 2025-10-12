import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { DiscoverPage } from "./components/DiscoverPage";
import { FanDashboard } from "./components/FanDashboard";
import { TrackDetailPage } from "./components/TrackDetailPage";
import { PortfolioPage } from "./components/PortfolioPage";
import { ArtistPage } from "./components/ArtistPage";
import { ArtistDashboard } from "./components/ArtistDashboard";
import { AuthPage } from "./components/AuthPage";
import { PaymentPage } from "./components/PaymentPage";
import { SettingsPage } from "./components/SettingsPage";
import { SupportPage } from "./components/SupportPage";
import { HowItWorksPage } from "./components/HowItWorksPage";
import { NotificationsPanel } from "./components/NotificationsPanel";
import { PersistentMiniPlayer } from "./components/PersistentMiniPlayer";

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
  | "support"
  | "how-it-works";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("landing");
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
      case "how-it-works":
        return <HowItWorksPage onPageChange={handlePageChange} />;
      default:
        return <LandingPage onPageChange={handlePageChange} />;
    }
  };

  const showNavigation = currentPage !== "auth" && currentPage !== "payment";

  // Set dark theme background for the entire app
  const isDarkBackground = currentPage !== "auth" && currentPage !== "payment";

  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
}
