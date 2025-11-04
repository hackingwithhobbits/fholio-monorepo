interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  glow?: boolean;
}

export function Logo({ size = "md", className = "", glow = false }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
    xl: "h-16",
  };

  return (
    <img
      src={null}
      alt="Fholio"
      className={`${sizeClasses[size]} w-auto ${
        glow ? "glow-pulse" : ""
      } ${className}`}
      style={
        glow
          ? {
              filter:
                "drop-shadow(0 0 20px rgba(139, 31, 255, 0.6)) drop-shadow(0 0 40px rgba(255, 31, 112, 0.4))",
            }
          : undefined
      }
    />
  );
}
