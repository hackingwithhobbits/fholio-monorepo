import { useState, useRef, useEffect } from "react";
import {
  TrendingUp,
  User,
  Bell,
  Search,
  Menu,
  Compass,
  ChevronDown,
  Settings,
  LogOut,
  X,
  HelpCircle,
  Briefcase,
  Info,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onNotificationsToggle?: () => void;
}

export function Navigation({
  currentPage,
  onPageChange,
  onNotificationsToggle,
}: NavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showMobileSearchResults, setShowMobileSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock logged in state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search results
  const searchResults = [
    {
      type: "track",
      title: "Midnight Dreams",
      artist: "Luna Valley",
      price: "$12.50",
    },
    {
      type: "track",
      title: "Electric Pulse",
      artist: "Neon Riders",
      price: "$25.00",
    },
    {
      type: "artist",
      title: "Echo Chamber",
      genre: "Electronic",
      tracks: "3 tracks",
    },
    { type: "genre", title: "Synthwave", tracks: "127 tracks" },
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "investment",
      message: 'Your investment in "Midnight Dreams" is up 8.5%',
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      type: "payout",
      message: "Payout of $45.20 processed for Q4 earnings",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      type: "launch",
      message: 'New track "Neon Nights" listed by Synthwave Kings',
      time: "3h ago",
      unread: false,
    },
    {
      id: 4,
      type: "milestone",
      message: '"Electric Pulse" reached 1M streams milestone',
      time: "6h ago",
      unread: false,
    },
    {
      id: 5,
      type: "distribution",
      message: "Your portfolio distribution has been updated",
      time: "12h ago",
      unread: false,
    },
    {
      id: 6,
      type: "launch",
      message: 'New track listed by Luna Valley - "Digital Dreams"',
      time: "1d ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const handleMobileSearch = (query: string) => {
    setMobileSearchQuery(query);
    setShowMobileSearchResults(query.length > 0);
  };

  const handleSearchResultClick = (resultType: string) => {
    if (resultType === "track") onPageChange("track-detail");
    else if (resultType === "artist") onPageChange("artist-page");
    setShowSearchResults(false);
    setShowMobileSearchResults(false);
    setSearchQuery("");
    setMobileSearchQuery("");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-card/95 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo - Updated */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => onPageChange("landing")}
            >
              //TODO: Replace with actual logo
              <img src="" alt="Fholio" className="h-10 w-auto" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => onPageChange("how-it-works")}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                currentPage === "how-it-works"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => onPageChange("browse")}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                currentPage === "browse"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => onPageChange("discover")}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                currentPage === "discover"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => onPageChange("portfolio")}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                currentPage === "portfolio"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => onPageChange("artist-dashboard")}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                currentPage === "artist-dashboard"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              Artist Hub
            </button>
          </div>

          {/* Search Bar */}
          <div
            className="hidden md:flex flex-1 max-w-md mx-8 relative"
            ref={searchRef}
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search tracks, artists, genres..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-muted border-border rounded-xl"
              />
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <Card className="absolute top-12 left-0 right-0 z-50 premium-card">
                <CardContent className="p-0">
                  {searchResults
                    .filter(
                      (result) =>
                        result.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        (result.artist &&
                          result.artist
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))
                    )
                    .map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer border-b border-border last:border-b-0"
                        onClick={() => {
                          if (result.type === "track")
                            onPageChange("track-detail");
                          else if (result.type === "artist")
                            onPageChange("artist-page");
                          setShowSearchResults(false);
                          setSearchQuery("");
                        }}
                      >
                        <div>
                          <div className="font-medium text-foreground">
                            {result.title}
                          </div>
                          {result.artist && (
                            <div className="text-sm text-muted-foreground">
                              {result.artist}
                            </div>
                          )}
                          {result.genre && (
                            <div className="text-sm text-muted-foreground">
                              {result.genre}
                            </div>
                          )}
                          {result.tracks && (
                            <div className="text-sm text-muted-foreground">
                              {result.tracks}
                            </div>
                          )}
                        </div>
                        {result.price && (
                          <div className="font-bold text-foreground">
                            {result.price}
                          </div>
                        )}
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Mobile Search */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-accent rounded-xl"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 premium-card" align="end">
                <div className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search tracks, artists..."
                      value={mobileSearchQuery}
                      onChange={(e) => handleMobileSearch(e.target.value)}
                      className="pl-10 bg-muted border-border rounded-xl"
                    />
                  </div>

                  {/* Mobile Search Results */}
                  {showMobileSearchResults && mobileSearchQuery && (
                    <div className="mt-3 max-h-60 overflow-y-auto">
                      {searchResults
                        .filter(
                          (result) =>
                            result.title
                              .toLowerCase()
                              .includes(mobileSearchQuery.toLowerCase()) ||
                            (result.artist &&
                              result.artist
                                .toLowerCase()
                                .includes(mobileSearchQuery.toLowerCase()))
                        )
                        .map((result, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer border-b border-border last:border-b-0 rounded-lg mb-1"
                            onClick={() => handleSearchResultClick(result.type)}
                          >
                            <div>
                              <div className="font-medium text-foreground">
                                {result.title}
                              </div>
                              {result.artist && (
                                <div className="text-sm text-muted-foreground">
                                  {result.artist}
                                </div>
                              )}
                              {result.genre && (
                                <div className="text-sm text-muted-foreground">
                                  {result.genre}
                                </div>
                              )}
                              {result.tracks && (
                                <div className="text-sm text-muted-foreground">
                                  {result.tracks}
                                </div>
                              )}
                            </div>
                            {result.price && (
                              <div className="font-bold text-foreground">
                                {result.price}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <Popover
                  open={showNotifications}
                  onOpenChange={setShowNotifications}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-accent rounded-xl relative"
                    >
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 premium-card" align="end">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-border hover:bg-accent cursor-pointer ${
                            notification.unread ? "bg-accent/50" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm text-foreground">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-border">
                      <Button variant="ghost" className="w-full text-sm">
                        View All Notifications
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Profile */}
                <Popover open={showProfile} onOpenChange={setShowProfile}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hover:bg-accent rounded-xl flex items-center space-x-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 hidden sm:block" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-0 premium-card" align="end">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">
                            John Doe
                          </p>
                          <p className="text-xs text-muted-foreground">
                            john@example.com
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-accent rounded-lg"
                        onClick={() => onPageChange("portfolio")}
                      >
                        <Briefcase className="w-4 h-4 mr-2" />
                        My Portfolio
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-accent rounded-lg"
                        onClick={() => onPageChange("settings")}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-accent rounded-lg"
                        onClick={() => onPageChange("support")}
                      >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Support
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-accent rounded-lg text-destructive"
                        onClick={() => setIsLoggedIn(false)}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Log Out
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => onPageChange("auth")}
                  className="hover:bg-accent rounded-xl font-semibold"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => onPageChange("auth")}
                  className="fintech-gradient text-white border-0 hover:opacity-90 rounded-xl px-6 py-2 font-semibold"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-accent rounded-xl"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 premium-card border-l border-border"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="font-semibold text-foreground">Menu</h2>
                  </div>

                  <nav className="flex-1 p-4">
                    <div className="space-y-3">
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-accent rounded-xl p-4"
                        onClick={() => {
                          onPageChange("how-it-works");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Info className="w-4 h-4 mr-2" />
                        How It Works
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-accent rounded-xl p-4"
                        onClick={() => {
                          onPageChange("browse");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Browse
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-accent rounded-xl p-4"
                        onClick={() => {
                          onPageChange("discover");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Compass className="w-4 h-4 mr-2" />
                        Discover
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-accent rounded-xl p-4"
                        onClick={() => {
                          onPageChange("portfolio");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Portfolio
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-accent rounded-xl p-4"
                        onClick={() => {
                          onPageChange("artist-dashboard");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Artist Hub
                      </Button>
                    </div>

                    {/* Mobile Search */}
                    <div className="mt-6 relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          type="text"
                          placeholder="Search tracks, artists..."
                          value={mobileSearchQuery}
                          onChange={(e) => handleMobileSearch(e.target.value)}
                          className="w-full pl-10 bg-muted border-border rounded-xl"
                        />
                      </div>

                      {/* Mobile Search Results in Sheet */}
                      {showMobileSearchResults && mobileSearchQuery && (
                        <div className="mt-3 max-h-40 overflow-y-auto bg-card rounded-lg border border-border">
                          {searchResults
                            .filter(
                              (result) =>
                                result.title
                                  .toLowerCase()
                                  .includes(mobileSearchQuery.toLowerCase()) ||
                                (result.artist &&
                                  result.artist
                                    .toLowerCase()
                                    .includes(mobileSearchQuery.toLowerCase()))
                            )
                            .map((result, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer border-b border-border last:border-b-0"
                                onClick={() =>
                                  handleSearchResultClick(result.type)
                                }
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-foreground truncate">
                                    {result.title}
                                  </div>
                                  {result.artist && (
                                    <div className="text-sm text-muted-foreground truncate">
                                      {result.artist}
                                    </div>
                                  )}
                                </div>
                                {result.price && (
                                  <div className="font-bold text-foreground ml-2">
                                    {result.price}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </nav>

                  {isLoggedIn && (
                    <div className="p-4 border-t border-border">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            John Doe
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            john@example.com
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover:bg-accent rounded-lg"
                          onClick={() => {
                            onPageChange("settings");
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover:bg-accent rounded-lg"
                          onClick={() => {
                            onPageChange("support");
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <HelpCircle className="w-4 h-4 mr-2" />
                          Support
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover:bg-accent rounded-lg text-destructive"
                          onClick={() => {
                            setIsLoggedIn(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Log Out
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
