import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize2,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  duration: number;
}

interface PersistentMiniPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  position: number;
  onSeek: (position: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export function PersistentMiniPlayer({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onClose,
  position,
  onSeek,
  volume,
  onVolumeChange,
}: PersistentMiniPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Waveform animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentTrack) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Create animated waveform
      const bars = 40;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        const barHeight = Math.random() * height * 0.6 + height * 0.1;
        const x = i * barWidth;
        const y = (height - barHeight) / 2;

        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, "#8A2BE2");
        gradient.addColorStop(1, "#FF2FB9");

        ctx.fillStyle = isPlaying ? gradient : "#333333";
        ctx.fillRect(x, y, barWidth - 2, barHeight);
      }

      if (isPlaying) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Mini Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border backdrop-blur-xl">
        <div className="flex items-center px-4 py-3 space-x-4">
          {/* Track Info */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <ImageWithFallback
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">
                {currentTrack.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={onPrevious}>
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onPlayPause}
              className="bg-primary hover:bg-primary/80 text-primary-foreground"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={onNext}>
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="hidden md:flex items-center space-x-3 flex-1 max-w-md">
            <span className="text-xs text-muted-foreground">
              {formatTime(position)}
            </span>
            <Slider
              value={[position]}
              max={currentTrack.duration}
              step={1}
              onValueChange={([value]) => onSeek(value)}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">
              {formatTime(currentTrack.duration)}
            </span>
          </div>

          {/* Volume & Actions */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <Volume2 className="w-4 h-4" />
              </Button>
              {showVolumeSlider && (
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-popover border border-border rounded-lg shadow-lg"
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={([value]) => onVolumeChange(value)}
                    className="w-20 h-2"
                    orientation="vertical"
                  />
                </div>
              )}
            </div>

            <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[80vh] bg-card">
                <FullPlayer
                  track={currentTrack}
                  isPlaying={isPlaying}
                  onPlayPause={onPlayPause}
                  onNext={onNext}
                  onPrevious={onPrevious}
                  position={position}
                  onSeek={onSeek}
                  volume={volume}
                  onVolumeChange={onVolumeChange}
                />
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// Full Player Modal Component
function FullPlayer({
  track,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  position,
  onSeek,
  volume,
  onVolumeChange,
}: {
  track: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  position: number;
  onSeek: (position: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Create full waveform
      const bars = 120;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        const progress = i / bars;
        const played = progress < position / track.duration;
        const barHeight =
          Math.sin(i * 0.1) * height * 0.3 + height * 0.2 + Math.random() * 20;
        const x = i * barWidth;
        const y = (height - barHeight) / 2;

        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (played) {
          gradient.addColorStop(0, "#8A2BE2");
          gradient.addColorStop(1, "#FF2FB9");
        } else {
          gradient.addColorStop(0, "#333333");
          gradient.addColorStop(1, "#1A1A1A");
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 1, barHeight);
      }

      if (isPlaying) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isPlaying, position, track.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Track Info */}
      <div className="flex items-center space-x-6 p-6 border-b border-border">
        <ImageWithFallback
          src={track.cover}
          alt={track.title}
          className="w-24 h-24 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-foreground">{track.title}</h2>
          <p className="text-lg text-muted-foreground">{track.artist}</p>
        </div>
      </div>

      {/* Waveform */}
      <div className="flex-1 p-6">
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          className="w-full h-48 cursor-pointer rounded-lg"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const progress = x / rect.width;
            onSeek(progress * track.duration);
          }}
        />

        {/* Time Display */}
        <div className="flex justify-between text-sm text-muted-foreground mt-4">
          <span>{formatTime(position)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6 p-6 border-t border-border">
        <Button variant="ghost" size="icon" onClick={onPrevious}>
          <SkipBack className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          onClick={onPlayPause}
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/80 text-primary-foreground"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={onNext}>
          <SkipForward className="w-6 h-6" />
        </Button>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-center space-x-4 p-4">
        <Volume2 className="w-4 h-4 text-muted-foreground" />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={([value]) => onVolumeChange(value)}
          className="w-32"
        />
      </div>
    </div>
  );
}
