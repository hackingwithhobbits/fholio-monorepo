import { useState } from "react";
import {
  Upload,
  Play,
  Pause,
  Eye,
  Users,
  DollarSign,
  TrendingUp,
  Music,
  Calendar,
  Target,
  Link,
  Check,
  Settings,
  Percent,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ArtistDashboardProps {
  onPageChange: (page: string) => void;
}

export function ArtistDashboard({ onPageChange }: ArtistDashboardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [royaltyPercentage, setRoyaltyPercentage] = useState(60);

  const trackData = {
    title: "Electric Dreams",
    genre: "Synthwave",
    targetRaise: 50000,
    currentRaise: 32500,
    shares: 2000,
    pricePerShare: 25.0,
    backers: 130,
    daysLeft: 45,
  };

  const analyticsData = [
    { month: "Jan", listens: 1200, backers: 45, revenue: 1125 },
    { month: "Feb", listens: 1800, backers: 68, revenue: 1700 },
    { month: "Mar", listens: 2400, backers: 89, revenue: 2225 },
    { month: "Apr", listens: 3200, backers: 130, revenue: 3250 },
  ];

  const genreDistribution = [
    { name: "Synthwave", value: 45, color: "#8B5CF6" },
    { name: "Electronic", value: 30, color: "#EC4899" },
    { name: "Ambient", value: 25, color: "#F472B6" },
  ];

  const recentTracks = [
    {
      title: "Midnight Runner",
      status: "Live",
      funded: 85,
      raised: 42500,
      target: 50000,
      backers: 156,
    },
    {
      title: "Neon Nights",
      status: "Completed",
      funded: 100,
      raised: 75000,
      target: 75000,
      backers: 245,
    },
    {
      title: "Digital Sunset",
      status: "Draft",
      funded: 0,
      raised: 0,
      target: 60000,
      backers: 0,
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handlePreviewCampaign = () => {
    setActiveTab("preview");
  };

  const distributionPlatforms = [
    {
      name: "TuneCore",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGRpc3RyaWJ1dGlvbiUyMGxvZ298ZW58MXx8fHwxNzU2OTI1MTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Distribute to 100+ platforms worldwide",
      connected: connectedPlatforms.includes("tunecore"),
    },
    {
      name: "DistroKid",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGRpc3RyaWJ1dGlvbiUyMGxvZ298ZW58MXx8fHwxNzU2OTI1MTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Fast uploads to all major streaming services",
      connected: connectedPlatforms.includes("distrokid"),
    },
    {
      name: "CD Baby",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGRpc3RyaWJ1dGlvbiUyMGxvZ298ZW58MXx8fHwxNzU2OTI1MTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Full-service distribution with sync licensing",
      connected: connectedPlatforms.includes("cdbaby"),
    },
    {
      name: "Amuse",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGRpc3RyaWJ1dGlvbiUyMGxvZ298ZW58MXx8fHwxNzU2OTI1MTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Free distribution to major platforms",
      connected: connectedPlatforms.includes("amuse"),
    },
  ];

  const handleConnectPlatform = (platformName: string) => {
    if (connectedPlatforms.includes(platformName.toLowerCase())) {
      setConnectedPlatforms(
        connectedPlatforms.filter((p) => p !== platformName.toLowerCase())
      );
    } else {
      setConnectedPlatforms([
        ...connectedPlatforms,
        platformName.toLowerCase(),
      ]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Artist Hub</h1>
            <p className="text-muted-foreground">
              Manage your music campaigns and track performance
            </p>
          </div>
          <TabsList className="grid w-full max-w-sm grid-cols-3 gap-1 p-1 bg-muted rounded-xl lg:w-auto">
            <TabsTrigger
              value="upload"
              className="text-sm px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Upload
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="text-sm px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-sm px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Form */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload New Track
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Audio Upload */}
                <div className="space-y-2">
                  <Label htmlFor="audio">Audio File</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <input
                      id="audio"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="audio" className="cursor-pointer">
                      <Music className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">
                        {uploadedFile
                          ? uploadedFile.name
                          : "Drag and drop your audio file here"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports MP3, WAV, FLAC (max 50MB)
                      </p>
                    </label>
                  </div>
                </div>

                {/* Cover Art */}
                <div className="space-y-2">
                  <Label htmlFor="cover">Cover Art</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Upload cover art (1:1 ratio recommended)
                    </p>
                  </div>
                </div>

                {/* Track Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Track Title</Label>
                    <Input id="title" placeholder="Enter track title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronic">Electronic</SelectItem>
                        <SelectItem value="synthwave">Synthwave</SelectItem>
                        <SelectItem value="ambient">Ambient</SelectItem>
                        <SelectItem value="indie">Indie Pop</SelectItem>
                        <SelectItem value="hiphop">Hip Hop</SelectItem>
                        <SelectItem value="rock">Rock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell fans about your track, the story behind it, and what makes it special..."
                    rows={4}
                  />
                </div>

                {/* Campaign Details */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Campaign Settings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shares">Total Shares</Label>
                      <Input id="shares" type="number" placeholder="2000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Share</Label>
                      <Input id="price" type="number" placeholder="25.00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="target">Target Raise</Label>
                      <Input id="target" type="number" placeholder="50000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Campaign Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="45">45 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Connect Distribution */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Link className="w-5 h-5 mr-2" />
                    Connect Distribution
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Connect your music distribution platforms to enable
                    automatic royalty sharing with your investors.
                  </p>

                  {/* Distribution Platforms */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {distributionPlatforms.map((platform) => (
                      <div
                        key={platform.name}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <ImageWithFallback
                              src={platform.logo}
                              alt={platform.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div>
                              <h4 className="font-medium">{platform.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {platform.description}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant={platform.connected ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleConnectPlatform(platform.name)}
                            className={
                              platform.connected
                                ? "bg-green-600 hover:bg-green-700"
                                : ""
                            }
                          >
                            {platform.connected ? (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                Connected
                              </>
                            ) : (
                              "Connect"
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Royalty Allocation */}
                  {connectedPlatforms.length > 0 && (
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Percent className="w-4 h-4 mr-2" />
                        Royalty Allocation
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Set the percentage of royalties to share with your
                        investors. You keep the rest.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Label htmlFor="royalty-percentage" className="w-32">
                            Investor Share:
                          </Label>
                          <div className="flex-1">
                            <Input
                              id="royalty-percentage"
                              type="range"
                              min="10"
                              max="80"
                              value={royaltyPercentage}
                              onChange={(e) =>
                                setRoyaltyPercentage(parseInt(e.target.value))
                              }
                              className="w-full"
                            />
                          </div>
                          <div className="w-16 text-right font-medium">
                            {royaltyPercentage}%
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-background p-3 rounded border">
                            <div className="text-muted-foreground">
                              Investors get:
                            </div>
                            <div className="text-lg font-bold text-primary">
                              {royaltyPercentage}%
                            </div>
                          </div>
                          <div className="bg-background p-3 rounded border">
                            <div className="text-muted-foreground">
                              You keep:
                            </div>
                            <div className="text-lg font-bold">
                              {100 - royaltyPercentage}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Connected Accounts Summary */}
                  {connectedPlatforms.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2 text-green-700">
                        <Check className="w-4 h-4" />
                        <span className="font-medium">
                          {connectedPlatforms.length} platform
                          {connectedPlatforms.length > 1 ? "s" : ""} connected
                        </span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        Your royalties will automatically be shared with
                        investors ({royaltyPercentage}% to investors,{" "}
                        {100 - royaltyPercentage}% to you)
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                  <Button variant="outline" className="flex-1">
                    Save Draft
                  </Button>
                  <Button
                    className="flex-1 fintech-gradient text-white border-0 hover:opacity-90"
                    onClick={handlePreviewCampaign}
                  >
                    Preview Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Your Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold">$117,500</div>
                      <div className="text-sm text-muted-foreground">
                        Total Raised
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold">401</div>
                      <div className="text-sm text-muted-foreground">
                        Total Backers
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">
                        Active Campaigns
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold">89%</div>
                      <div className="text-sm text-muted-foreground">
                        Avg. Success Rate
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          New backer invested $250 in "Midnight Runner"
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          Track reached 10k streams milestone
                        </p>
                        <p className="text-xs text-muted-foreground">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          "Digital Sunset" campaign fully funded!
                        </p>
                        <p className="text-xs text-muted-foreground">
                          3 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Tips for Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start space-x-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0 mt-0.5"></div>
                      <span>
                        High-quality cover art increases backing by 60%
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0 mt-0.5"></div>
                      <span>
                        Share your campaign on social media early and often
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0 mt-0.5"></div>
                      <span>Engage with your backers through updates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Campaign Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Track Preview */}
                <div className="lg:col-span-2">
                  <div className="relative mb-6">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1573470369532-03944ae8ab93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyJTIwbmVvbnxlbnwxfHx8fDE3NTY5Mjk2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Track Cover"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      size="icon"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white border-0 w-16 h-16"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8" />
                      )}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">{trackData.title}</h2>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="outline">{trackData.genre}</Badge>
                        <span className="text-muted-foreground">
                          by Synth Masters
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Funding Progress</span>
                          <span>
                            {Math.round(
                              (trackData.currentRaise / trackData.targetRaise) *
                                100
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            (trackData.currentRaise / trackData.targetRaise) *
                            100
                          }
                          className="h-3"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                          <span>
                            ${trackData.currentRaise.toLocaleString()} raised
                          </span>
                          <span>
                            ${trackData.targetRaise.toLocaleString()} goal
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold">
                            {trackData.backers}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Backers
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            ${trackData.pricePerShare}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Per Share
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            {trackData.daysLeft}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Days Left
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">About This Track</h3>
                      <p className="text-muted-foreground">
                        Electric Dreams is a nostalgic journey through neon-lit
                        cities and digital landscapes. Drawing inspiration from
                        80s synthwave and modern electronic production, this
                        track captures the essence of retro-futurism with a
                        contemporary twist.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Investment Panel */}
                <Card className="premium-card">
                  <CardHeader>
                    <CardTitle className="text-center">
                      Back This Track
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">
                        ${trackData.pricePerShare}
                      </div>
                      <div className="text-muted-foreground">per share</div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shares">Number of Shares</Label>
                      <Input id="shares" type="number" placeholder="10" />
                    </div>

                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Shares</span>
                        <span>10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price per share</span>
                        <span>${trackData.pricePerShare}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>$250.00</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full fintech-gradient text-white border-0 hover:opacity-90">
                      Back This Track
                    </Button>

                    <div className="text-center text-xs text-muted-foreground">
                      <p>
                        By backing this track, you agree to our Terms of Service
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("upload")}
                >
                  Back to Edit
                </Button>
                <Button className="fintech-gradient text-white border-0 hover:opacity-90">
                  Launch Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="premium-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Total Streams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127.3K</div>
                <div className="text-xs text-green-500 flex items-center">
                  +23% from last month
                </div>
              </CardContent>
            </Card>
            <Card className="premium-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Total Backers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">401</div>
                <div className="text-xs text-green-500">
                  +12% from last month
                </div>
              </CardContent>
            </Card>
            <Card className="premium-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$32.5K</div>
                <div className="text-xs text-green-500">
                  +18% from last month
                </div>
              </CardContent>
            </Card>
            <Card className="premium-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <div className="text-xs text-muted-foreground">
                  Campaign funding rate
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="listens"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="backers"
                        stroke="#EC4899"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Genre Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genreDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {genreDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tracks */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Your Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTracks.map((track, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg space-y-4 sm:space-y-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold">{track.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant={
                              track.status === "Live"
                                ? "default"
                                : track.status === "Completed"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {track.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {track.backers} backers
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="font-semibold">
                        ${track.raised.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {track.funded}% of ${track.target.toLocaleString()}
                      </div>
                      <div className="w-full sm:w-32 bg-muted rounded-full h-2 mt-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            background:
                              track.funded === 100
                                ? "#22C55E"
                                : "var(--gradient-primary)",
                            width: `${track.funded}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
