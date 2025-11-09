import { Share2, Twitter, Instagram, Music2 } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  description?: string;
  compact?: boolean;
}

export function ShareButtons({
  title,
  description,
  compact = false,
}: ShareButtonsProps) {
  const handleShare = (platform: string) => {
    const text = `${title}${description ? ` - ${description}` : ""} #MyFholio #FansFuelMusic`;

    toast.success(`Share to ${platform} clicked!`, {
      description: "In a live app, this would open the share dialog.",
    });
  };

  const shareOptions = [
    {
      name: "X / Twitter",
      icon: Twitter,
      action: () => handleShare("Twitter"),
    },
    {
      name: "Instagram Story",
      icon: Instagram,
      action: () => handleShare("Instagram"),
    },
    { name: "TikTok", icon: Music2, action: () => handleShare("TikTok") },
  ];

  if (compact) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 glass-card border-primary/20 p-2">
          <div className="space-y-1">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors text-left"
              >
                <option.icon className="w-4 h-4" />
                {option.name}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {shareOptions.map((option) => (
        <Button
          key={option.name}
          variant="outline"
          size="sm"
          onClick={option.action}
          className="border-primary/30 hover:bg-primary/10 neon-glow"
        >
          <option.icon className="w-4 h-4 mr-2" />
          {option.name}
        </Button>
      ))}
    </div>
  );
}
