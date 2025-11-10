import { Logo } from './Logo';
import { Twitter, Instagram, MessageCircle } from 'lucide-react';

interface GlobalFooterProps {
  onNavigate: (page: string) => void;
}

export function GlobalFooter({ onNavigate }: GlobalFooterProps) {
  return (
    <footer className="border-t border-primary/10 glass-card mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Logo size="md" glow />
            </div>
            <p className="text-sm text-muted-foreground">
              The world's first fantasy league for music.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Product</h4>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('weekly-games')}
                className="block text-sm text-muted-foreground hover:text-white transition-colors"
              >
                Weekly Games
              </button>
              <button
                onClick={() => onNavigate('leaderboard')}
                className="block text-sm text-muted-foreground hover:text-white transition-colors"
              >
                Leaderboard
              </button>
              <button
                onClick={() => onNavigate('live-show')}
                className="block text-sm text-muted-foreground hover:text-white transition-colors"
              >
                Live Show
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="block text-sm text-muted-foreground hover:text-white transition-colors"
              >
                How It Works
              </button>
            </div>
          </div>

          {/* Join */}
          <div>
            <h4 className="text-white mb-4">Join</h4>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('fan-signin')}
                className="block text-sm text-muted-foreground hover:text-white transition-colors"
              >
                Join as Fan
              </button>
              <button
                onClick={() => onNavigate('artist-signin')}
                className="block text-sm text-muted-foreground hover:text-white transition-colors"
              >
                Join as Artist
              </button>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground/70">
            <p>© 2025 Fholio</p>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <p className="text-xs gradient-text">Your Fandom. Your Fortune.</p>
        </div>
      </div>
    </footer>
  );
}
