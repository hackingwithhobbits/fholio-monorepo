import { TrendingUp, TrendingDown, Users } from "lucide-react";
import { Artist } from "../data/data-types";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ArtistCardProps {
  artist: Artist;
  onClick?: () => void;
  showAddButton?: boolean;
  onAdd?: () => void;
  compact?: boolean;
}

export function ArtistCard({
  artist,
  onClick,
  showAddButton,
  onAdd,
  compact = false,
}: ArtistCardProps) {
  const isPositive = artist.change >= 0;

  if (compact) {
    return (
      <div
        className="glass-card p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <ImageWithFallback
              src={artist.imageUrl}
              alt={artist.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="truncate text-white group-hover:text-primary transition-colors">
              {artist.name}
            </h4>
            <p className="text-sm text-muted-foreground">{artist.genre}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-white">{artist.score.toFixed(1)}</span>
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-accent" />
              ) : (
                <TrendingDown className="w-4 h-4 text-secondary" />
              )}
            </div>
            <p
              className={`text-sm ${
                isPositive ? "text-accent" : "text-secondary"
              }`}
            >
              {isPositive ? "+" : ""}
              {artist.change.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 cursor-pointer group relative neon-glow card-reflection"
      onClick={onClick}
    >
      {/* Performance Ring */}
      <div
        className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, ${
            isPositive ? "#00ffd5" : "#ff1f70"
          } ${artist.score}%, transparent ${artist.score}%)`,
          padding: "2px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <ImageWithFallback
            src={artist.imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Score Badge */}
          <div className="absolute top-4 right-4 glass-card px-4 py-2 rounded-xl backdrop-blur-xl border-primary/20 neon-glow">
            <span className="gradient-text text-lg tracking-tight">
              {artist.score.toFixed(1)}
            </span>
          </div>

          {/* Change Indicator */}
          <div
            className={`absolute top-4 left-4 px-4 py-2 rounded-xl flex items-center gap-2 backdrop-blur-xl ${
              isPositive
                ? "bg-accent/10 border border-accent/30"
                : "bg-secondary/10 border border-secondary/30"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-accent" />
            ) : (
              <TrendingDown className="w-4 h-4 text-secondary" />
            )}
            <span
              className={`tracking-tight ${
                isPositive ? "text-accent" : "text-secondary"
              }`}
            >
              {isPositive ? "+" : ""}
              {artist.change.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-white group-hover:gradient-text transition-all text-xl tracking-tight">
              {artist.name}
            </h3>
            <p className="text-sm text-muted-foreground/80">{artist.genre}</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground/70">
              <Users className="w-4 h-4" />
              <span className="tracking-tight">
                {artist.fanBackers.toLocaleString()} backers
              </span>
            </div>
          </div>

          {showAddButton && onAdd && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="w-full py-3 rounded-xl gradient-bg hover:opacity-90 transition-all neon-glow holo-button text-white tracking-tight"
            >
              Add to Fholio
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
