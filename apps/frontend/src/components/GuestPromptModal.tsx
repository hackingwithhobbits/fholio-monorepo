import { motion } from "framer-motion";
import { UserCircle, Music, X } from "lucide-react";
import { Button } from "./ui/button";

interface GuestPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpFan: () => void;
  onSignUpArtist: () => void;
}

export function GuestPromptModal({
  isOpen,
  onClose,
  onSignUpFan,
  onSignUpArtist,
}: GuestPromptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative glass-card rounded-2xl p-8 max-w-md w-full neon-glow"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          <div className="text-4xl mb-4">🎵</div>
          <h2 className="text-2xl text-white tracking-tight">
            Join Fholio to Participate
          </h2>
          <p className="text-muted-foreground">
            Sign up as a fan to vote and draft artists, or as an artist to
            submit your music and compete.
          </p>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={onSignUpFan}
              className="w-full gradient-bg hover:opacity-90 neon-glow holo-button py-6 rounded-xl"
              size="lg"
            >
              <UserCircle className="w-5 h-5 mr-2" />
              Sign Up as Fan
            </Button>

            <Button
              onClick={onSignUpArtist}
              className="w-full bg-gradient-to-r from-accent to-pink-600 hover:opacity-90 neon-glow py-6 rounded-xl"
              size="lg"
            >
              <Music className="w-5 h-5 mr-2" />
              Sign Up as Artist
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
