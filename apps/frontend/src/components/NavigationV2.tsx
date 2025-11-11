import { Home, Trophy, Music, Eye, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Logo } from './Logo';

interface NavigationV2Props {
  currentPage: string;
  userType: 'guest' | 'fan' | 'artist' | null;
  router.push: (page: string, artistId?: string, userType?: 'guest' | 'fan' | 'artist') => void;
}

export function NavigationV2({ currentPage, userType, router.push }: NavigationV2Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items based on user type
  const getNavItems = () => {
    if (!userType || userType === 'guest') {
      return [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        { id: 'about', label: 'About', icon: Eye },
      ];
    }
    
    // Both fan and artist can see leaderboard
    return [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => router.push('home')}
          >
            <Logo size="md" glow className="group-hover:scale-110 transition-transform" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 ease-in-out group ${
                    isActive
                      ? 'text-white'
                      : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 gradient-bg rounded-xl opacity-20 neon-glow" />
                  )}
                  {!isActive && (
                    <div className="absolute inset-0 gradient-bg rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200 ease-in-out" />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-primary' : ''}`} />
                  <span className="relative z-10 tracking-tight text-sm whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!userType || userType === 'guest' ? (
              <Button
                onClick={() => router.push('auth')}
                className="gradient-bg hover:opacity-90 neon-glow holo-button rounded-xl px-6 transition-all duration-200 ease-in-out"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary/20 glass-card">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    router.push(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-primary/20 text-white'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            {!userType || userType === 'guest' ? (
              <div className="pt-4 space-y-2">
                <Button
                  className="w-full gradient-bg"
                  onClick={() => {
                    router.push('/auth');
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}
