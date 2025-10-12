import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MusicPlayerProps {
  track: {
    id: number;
    title: string;
    artist: string;
    duration: number;
    cover: string;
  };
  isPlaying: boolean;
  onPlayPause: () => void;
  className?: string;
  size?: "compact" | "full";
}

export function MusicPlayer({
  track,
  isPlaying,
  onPlayPause,
  className = "",
  size = "compact",
}: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(false);
  const waveformRef = useRef<HTMLCanvasElement>(null);

  // Generate waveform visualization
  useEffect(() => {
    const canvas = waveformRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const bars = 80;
    const barWidth = width / bars;

    ctx.clearRect(0, 0, width, height);

    // Generate random waveform data (in real app, this would come from audio analysis)
    for (let i = 0; i < bars; i++) {
      const barHeight = Math.random() * height * 0.8;
      const x = i * barWidth;
      const progress = currentTime / track.duration;

      // Create gradient for played/unplayed sections
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#8B5CF6");
      gradient.addColorStop(1, "#EC4899");

      if (i < progress * bars) {
        ctx.fillStyle = gradient.toString();
      } else {
        ctx.fillStyle = "rgba(139, 92, 246, 0.3)";
      }

      ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
    }
  }, [currentTime, track.duration]);

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= track.duration) return 0;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, track.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (size === "compact") {
    return (
      <div
        className={`flex items-center space-x-4 p-4 bg-card rounded-xl border shadow-sm ${className}`}
      >
        <div className="relative">
          <ImageWithFallback
            src={track.cover}
            alt={track.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <Button
            size="icon"
            onClick={onPlayPause}
            className="absolute inset-0 bg-black/60 hover:bg-black/80 text-white border-0 rounded-lg"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold truncate">{track.title}</h4>
          <p className="text-sm text-muted-foreground truncate">
            {track.artist}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Heart
              className={`w-4 h-4 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-card rounded-2xl border shadow-lg overflow-hidden ${className}`}
    >
      {/* Track Info */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-4 mb-6">
          <ImageWithFallback
            src={track.cover}
            alt={track.title}
            className="w-20 h-20 rounded-xl object-cover shadow-md"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{track.title}</h3>
            <p className="text-muted-foreground text-lg">{track.artist}</p>
            <div className="flex items-center space-x-4 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Waveform */}
        <div className="mb-6">
          <canvas
            ref={waveformRef}
            width={500}
            height={80}
            className="w-full h-20 cursor-pointer rounded-lg"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const progress = x / rect.width;
              setCurrentTime(Math.floor(progress * track.duration));
            }}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button
            size="icon"
            onClick={onPlayPause}
            className="w-16 h-16 rounded-full shadow-lg"
            style={{ background: "var(--gradient-primary)" }}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-3">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-10">
            {volume[0]}%
          </span>
        </div>
      </div>
    </div>
  );
}
