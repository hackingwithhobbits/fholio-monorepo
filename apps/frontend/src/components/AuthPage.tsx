import { useState } from "react";
import {
  Music,
  User,
  Headphones,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserPlus,
  LogIn,
  Check,
  Star,
  Trophy,
  DollarSign,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

interface AuthPageProps {
  onPageChange: (page: string) => void;
}

export function AuthPage({ onPageChange }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<
    "auth" | "user-selection" | "onboarding" | "verification" | "complete"
  >("auth");
  const [userType, setUserType] = useState<"fan" | "artist" | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Form data states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    // Fan fields
    displayName: "",
    favoriteGenres: [] as string[],
    investmentBudget: "",
    // Artist fields
    artistName: "",
    realName: "",
    primaryGenre: "",
    bio: "",
    socialLinks: {
      spotify: "",
      instagram: "",
      youtube: "",
      soundcloud: "",
    },
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleAuth = () => {
    if (authMode === "signup") {
      setStep("user-selection");
    } else {
      setStep("complete");
    }
  };

  const handleUserTypeSelection = (type: "fan" | "artist") => {
    setUserType(type);
    setStep("onboarding");
  };

  const handleOnboardingSubmit = () => {
    setStep("verification");
  };

  const handleVerificationComplete = () => {
    setStep("complete");
    setTimeout(() => {
      onPageChange(userType === "artist" ? "artist-dashboard" : "browse");
    }, 2000);
  };

  const genres = [
    "Electronic",
    "Hip Hop",
    "Pop",
    "Rock",
    "Indie",
    "R&B",
    "Jazz",
    "Classical",
    "Country",
    "Reggae",
    "Punk",
    "Metal",
    "Folk",
    "Blues",
    "Ambient",
    "Synthwave",
  ];

  // Complete success screen
  if (step === "complete") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full mx-auto flex items-center justify-center animate-pulse neon-glow"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Music className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-white">
              Welcome to Fholio!
            </h2>
            <p className="text-muted-foreground">
              {userType === "artist"
                ? "Setting up your artist profile..."
                : "Preparing your discovery feed..."}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  // Email verification step
  if (step === "verification") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <Card className="w-full max-w-md glass-card">
          <CardHeader className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle>Check Your Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground">
              We've sent a verification link to{" "}
              <strong>{formData.email}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Click the link in your email to verify your account and complete
              setup.
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleVerificationComplete}
                className="w-full fintech-gradient text-white border-0"
              >
                I've Verified My Email
              </Button>
              <Button variant="ghost" className="w-full text-sm">
                Resend verification email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User type selection step
  if (step === "user-selection") {
    return (
      <div className="min-h-screen bg-black px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Music className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-medium text-white mb-4">
              Choose Your Journey
            </h1>
            <p className="text-muted-foreground text-lg">
              How do you want to experience Fholio?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card
              className="cursor-pointer hover:neon-glow transition-all duration-300 hover:scale-105 glass-card border-glass-border group"
              onClick={() => handleUserTypeSelection("fan")}
            >
              <CardContent className="p-8 text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:neon-glow transition-all"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">
                  Music Fan
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Discover breakthrough artists and earn returns from the next
                  big hits
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Early access to new releases
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Invest in tracks you love
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Trophy className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Share in artist success
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:neon-glow transition-all duration-300 hover:scale-105 glass-card border-glass-border group"
              onClick={() => handleUserTypeSelection("artist")}
            >
              <CardContent className="p-8 text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:neon-glow transition-all"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">
                  Music Artist
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Launch campaigns, raise funds, and build a community around
                  your music
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Fund your music projects
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Share revenue with fans
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Trophy className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Build lasting relationships
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Onboarding step
  if (step === "onboarding") {
    return (
      <div className="min-h-screen bg-black px-4 py-16">
        <div className="max-w-lg mx-auto">
          <Card className="glass-card">
            <CardHeader className="text-center">
              <CardTitle className="text-white">
                {userType === "fan"
                  ? "Complete Your Fan Profile"
                  : "Complete Your Artist Profile"}
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Help us personalize your Fholio experience
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {userType === "artist" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="artist-name">Artist/Stage Name</Label>
                    <Input
                      id="artist-name"
                      placeholder="Your artistic identity"
                      value={formData.artistName}
                      onChange={(e) =>
                        handleInputChange("artistName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="real-name">Real Name</Label>
                    <Input
                      id="real-name"
                      placeholder="For legal and payment purposes"
                      value={formData.realName}
                      onChange={(e) =>
                        handleInputChange("realName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primary-genre">Primary Genre</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("primaryGenre", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="What genre defines your sound?" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre.toLowerCase()}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Artist Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell fans about your music journey..."
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>Social Links (Optional)</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Spotify URL"
                        value={formData.socialLinks.spotify}
                        onChange={(e) =>
                          handleSocialLinkChange("spotify", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Instagram"
                        value={formData.socialLinks.instagram}
                        onChange={(e) =>
                          handleSocialLinkChange("instagram", e.target.value)
                        }
                      />
                      <Input
                        placeholder="YouTube"
                        value={formData.socialLinks.youtube}
                        onChange={(e) =>
                          handleSocialLinkChange("youtube", e.target.value)
                        }
                      />
                      <Input
                        placeholder="SoundCloud"
                        value={formData.socialLinks.soundcloud}
                        onChange={(e) =>
                          handleSocialLinkChange("soundcloud", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      placeholder="How should artists know you?"
                      value={formData.displayName}
                      onChange={(e) =>
                        handleInputChange("displayName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Favorite Genres</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {genres.map((genre) => (
                        <div
                          key={genre}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={genre}
                            checked={formData.favoriteGenres.includes(genre)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleInputChange("favoriteGenres", [
                                  ...formData.favoriteGenres,
                                  genre,
                                ]);
                              } else {
                                handleInputChange(
                                  "favoriteGenres",
                                  formData.favoriteGenres.filter(
                                    (g) => g !== genre
                                  )
                                );
                              }
                            }}
                          />
                          <Label htmlFor={genre} className="text-sm">
                            {genre}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investment-budget">Investment Range</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("investmentBudget", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="How much do you plan to invest?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-50">$0 - $50 per track</SelectItem>
                        <SelectItem value="50-200">
                          $50 - $200 per track
                        </SelectItem>
                        <SelectItem value="200-500">
                          $200 - $500 per track
                        </SelectItem>
                        <SelectItem value="500+">$500+ per track</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  <h4 className="font-medium mb-2 text-white">What's Next:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-primary mr-2" />
                      Verify your email address
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-primary mr-2" />
                      {userType === "artist"
                        ? "Set up payment details"
                        : "Add payment method"}
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-primary mr-2" />
                      {userType === "artist"
                        ? "Upload your first track"
                        : "Start discovering music"}
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={handleOnboardingSubmit}
                  className="w-full fintech-gradient text-white border-0"
                  disabled={!formData.displayName && !formData.artistName}
                >
                  Continue Setup
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main auth screen
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Branding */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-3"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-medium neon-text">Fholio</span>
            </div>
            <h1 className="text-4xl font-medium text-white mb-4">
              Stock Up on Sound
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join the world's first music stock exchange. Discover breakthrough
              tracks, invest in artists, and profit from the future of music.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-medium text-white">12K+</div>
                <div className="text-sm text-muted-foreground">
                  Active Users
                </div>
              </div>
              <div>
                <div className="text-2xl font-medium text-white">$2.1M</div>
                <div className="text-sm text-muted-foreground">Raised</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-white">850+</div>
                <div className="text-sm text-muted-foreground">Tracks</div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <Card className="w-full max-w-md mx-auto glass-card">
            <Tabs
              value={authMode}
              onValueChange={(value) =>
                setAuthMode(value as "login" | "signup")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-muted/20">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-primary"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-primary"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <CardHeader className="text-center">
                  <CardTitle className="text-white">Welcome Back</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Sign in to your Fholio account
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button
                      className="w-full fintech-gradient text-white border-0"
                      onClick={handleAuth}
                      disabled={!formData.email || !formData.password}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </div>

                  <div className="text-center">
                    <Button
                      variant="link"
                      className="text-sm text-muted-foreground"
                    >
                      Forgot your password?
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <CardHeader className="text-center">
                  <CardTitle className="text-white">Join Fholio</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Create your account to get started
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="signup-email"
                        className="flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="signup-password"
                        className="flex items-center"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={setAgreedToTerms}
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        I agree to the{" "}
                        <Button
                          variant="link"
                          className="text-primary p-0 h-auto text-sm"
                        >
                          Terms of Service
                        </Button>{" "}
                        and{" "}
                        <Button
                          variant="link"
                          className="text-primary p-0 h-auto text-sm"
                        >
                          Privacy Policy
                        </Button>
                      </Label>
                    </div>

                    <Button
                      className="w-full fintech-gradient text-white border-0"
                      onClick={handleAuth}
                      disabled={
                        !formData.email ||
                        !formData.password ||
                        formData.password !== formData.confirmPassword ||
                        !agreedToTerms
                      }
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
