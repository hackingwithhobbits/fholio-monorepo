import { useState } from "react";
import {
  Play,
  Pause,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Grid,
  List,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Progress } from "./ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface FanDashboardProps {
  onPageChange: (page: string) => void;
}

export function FanDashboard({ onPageChange }: FanDashboardProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list"); // Default to list for condensed view
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);

  const tracks = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Valley",
      genre: "Indie Pop",
      price: 12.5,
      change: 8.5,
      volume: 1250,
      funded: 62,
      trending: true,
      cover:
        "https://images.unsplash.com/photo-1617431014998-f4f219965a1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHBvcCUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2OTI1MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      title: "Electric Pulse",
      artist: "Neon Riders",
      genre: "Electronic",
      price: 25.0,
      change: -2.1,
      volume: 890,
      funded: 84,
      trending: false,
      cover:
        "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyJTIwYXJ0fGVufDF8fHx8MTc1NjkyNTEwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      title: "Ocean Waves",
      artist: "Coastal Sound",
      genre: "Ambient",
      price: 8.75,
      change: 15.2,
      volume: 567,
      funded: 33,
      trending: true,
      cover:
        "https://images.unsplash.com/photo-1749383024184-48883730e828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJpZW50JTIwbXVzaWMlMjBuYXR1cmUlMjBhbGJ1bXxlbnwxfHx8fDE3NTY5MjUxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 4,
      title: "City Lights",
      artist: "Urban Echo",
      genre: "Hip Hop",
      price: 18.3,
      change: 5.7,
      volume: 2100,
      funded: 95,
      trending: true,
      cover:
        "https://images.unsplash.com/photo-1646900614911-378fd0c1d86d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBhbGJ1bSUyMGNvdmVyJTIwYXJ0fGVufDF8fHx8MTc1NjkyODc4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 5,
      title: "Sunset Boulevard",
      artist: "West Coast Dreams",
      genre: "Rock",
      price: 22.1,
      change: -1.2,
      volume: 1800,
      funded: 78,
      trending: false,
      cover:
        "https://images.unsplash.com/photo-1631786170318-ef467b60ef9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwYWxidW0lMjBjb3ZlciUyMGRlc2lnbnxlbnwxfHx8fDE3NTY5Mjg3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 6,
      title: "Digital Rain",
      artist: "Synth Masters",
      genre: "Synthwave",
      price: 14.8,
      change: 12.3,
      volume: 950,
      funded: 56,
      trending: true,
      cover:
        "https://images.unsplash.com/photo-1611084352382-062f1bfe31e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeW50aHdhdmUlMjByZXRybyUyMGFsYnVtJTIwYXJ0fGVufDF8fHx8MTc1NjkyNTExMXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const portfolioData = [
    {
      track: "Midnight Dreams",
      artist: "Luna Valley",
      shares: 25,
      buyPrice: 10.0,
      currentPrice: 12.5,
      value: 312.5,
      roi: 25.0,
      cover:
        "https://images.unsplash.com/photo-1617431014998-f4f219965a1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHBvcCUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2OTI1MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      track: "Ocean Waves",
      artist: "Coastal Sound",
      shares: 50,
      buyPrice: 7.5,
      currentPrice: 8.75,
      value: 437.5,
      roi: 16.7,
      cover:
        "https://images.unsplash.com/photo-1749383024184-48883730e828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJpZW50JTIwbXVzaWMlMjBuYXR1cmUlMjBhbGJ1bXxlbnwxfHx8fDE3NTY5MjUxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      track: "Digital Rain",
      artist: "Synth Masters",
      shares: 15,
      buyPrice: 13.0,
      currentPrice: 14.8,
      value: 222.0,
      roi: 13.8,
      cover:
        "https://images.unsplash.com/photo-1611084352382-062f1bfe31e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeW50aHdhdmUlMjByZXRybyUyMGFsYnVtJTIwYXJ0fGVufDF8fHx8MTc1NjkyNTExMXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const portfolioChartData = [
    { month: "Jan", value: 800 },
    { month: "Feb", value: 850 },
    { month: "Mar", value: 920 },
    { month: "Apr", value: 880 },
    { month: "May", value: 950 },
    { month: "Jun", value: 972 },
  ];

  const togglePlay = (trackId: number) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
  };

  // Condensed Track Row (110-140px tall)
  const renderCondensedTrackRow = (track: any) => (
    <Card
      key={track.id}
      className="premium-card hover:neon-glow transition-all duration-300 cursor-pointer mb-2 h-32"
      onClick={() => onPageChange("track-detail")}
    >
      <CardContent className="p-4 h-full">
        <div className="flex items-center h-full space-x-4">
          {/* Left: Cover Art + Info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative">
              <ImageWithFallback
                src={track.cover}
                alt={track.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <Button
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay(track.id);
                }}
                className="absolute inset-0 bg-black/60 hover:bg-black/80 text-white border-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
              >
                {playingTrack === track.id ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-foreground truncate">
                {track.title}
              </h3>
              <p
                className="text-muted-foreground text-sm cursor-pointer hover:text-primary transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onPageChange("artist-page");
                }}
              >
                {track.artist}
              </p>
              <Badge variant="outline" className="mt-1 text-xs">
                {track.genre}
              </Badge>
            </div>
          </div>

          {/* Middle: Price + Change */}
          <div className="text-center min-w-[100px]">
            <div className="text-lg font-bold text-foreground">
              ${track.price}
            </div>
            <div
              className={`text-sm flex items-center justify-center ${
                track.change >= 0 ? "positive" : "negative"
              }`}
            >
              {track.change >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {track.change >= 0 ? "+" : ""}
              {track.change}%
            </div>
            {/* Thin Progress Bar */}
            <Progress value={track.funded} className="w-20 h-1 mt-1" />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-accent rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-accent rounded-xl"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay(track.id);
              }}
            >
              {playingTrack === track.id ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button
              className="fintech-gradient text-white border-0 hover:opacity-90 rounded-xl font-semibold px-4"
              onClick={(e) => {
                e.stopPropagation();
                onPageChange("track-detail");
              }}
            >
              Invest
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderTrackCard = (track: any) => (
    <Card
      key={track.id}
      className="premium-card overflow-hidden hover:neon-glow transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group"
      onClick={() => onPageChange("track-detail")}
    >
      <div className="relative">
        <ImageWithFallback
          src={track.cover}
          alt={track.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Play Button */}
        <Button
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay(track.id);
          }}
          className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white border-0 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          {playingTrack === track.id ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </Button>

        {/* Heart Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 left-4 bg-black/60 hover:bg-black/80 text-white border-0 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Heart className="w-6 h-6" />
        </Button>

        {/* Trending Badge */}
        {track.trending && (
          <Badge className="absolute bottom-20 left-4 positive text-black bg-accent-positive border-0 font-bold">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </Badge>
        )}

        {/* Genre Badge */}
        <Badge
          variant="outline"
          className="absolute bottom-4 left-4 bg-black/60 text-white border-white/20"
        >
          {track.genre}
        </Badge>

        {/* Price Change */}
        <Badge
          className={`absolute bottom-4 right-4 border-0 font-bold ${
            track.change >= 0 ? "positive" : "negative"
          }`}
        >
          {track.change >= 0 ? "+" : ""}
          {track.change}%
        </Badge>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-2">
            {track.title}
          </h3>
          <p
            className="text-primary font-medium cursor-pointer hover:text-primary/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onPageChange("artist-page");
            }}
          >
            {track.artist}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Share Price</span>
            <span className="text-2xl font-bold text-foreground">
              ${track.price}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Volume</span>
            <span className="text-foreground font-semibold">
              {track.volume} shares
            </span>
          </div>

          <Button
            className="w-full fintech-gradient text-white border-0 hover:opacity-90 rounded-xl font-bold transform hover:scale-105 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onPageChange("track-detail");
            }}
          >
            Invest in Track
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderTableRow = (track: any) => (
    <TableRow
      key={track.id}
      className="hover:bg-accent/50 cursor-pointer"
      onClick={() => onPageChange("track-detail")}
    >
      <TableCell className="py-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <ImageWithFallback
              src={track.cover}
              alt={track.title}
              className="w-12 h-12 rounded object-cover"
            />
            <Button
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay(track.id);
              }}
              className="absolute inset-0 bg-black/60 hover:bg-black/80 text-white border-0 rounded opacity-0 hover:opacity-100 transition-opacity"
            >
              {playingTrack === track.id ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3" />
              )}
            </Button>
          </div>
          <div>
            <div className="font-semibold text-foreground">{track.title}</div>
            <div className="text-sm text-muted-foreground">{track.artist}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{track.genre}</Badge>
      </TableCell>
      <TableCell className="font-bold text-foreground">
        ${track.price}
      </TableCell>
      <TableCell>
        <div
          className={`flex items-center font-semibold ${
            track.change >= 0 ? "positive" : "negative"
          }`}
        >
          {track.change >= 0 ? (
            <TrendingUp className="w-3 h-3 mr-1" />
          ) : (
            <TrendingDown className="w-3 h-3 mr-1" />
          )}
          {track.change >= 0 ? "+" : ""}
          {track.change}%
        </div>
      </TableCell>
      <TableCell>{track.volume}</TableCell>
      <TableCell>
        <Button
          size="sm"
          className="fintech-gradient text-white border-0 hover:opacity-90 rounded-xl font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            onPageChange("track-detail");
          }}
        >
          Invest in Track
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="browse" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-card rounded-2xl p-2">
            <TabsTrigger value="browse" className="rounded-xl font-semibold">
              Browse Tracks
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="rounded-xl font-semibold">
              My Portfolio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h1 className="text-4xl font-black text-foreground">
                  Browse Tracks
                </h1>
                <p className="text-muted-foreground text-xl">
                  Condensed view for efficient track scanning
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-xl"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-xl"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tracks, artists, or genres..."
                  className="pl-10 bg-card border-border rounded-xl"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 bg-card border-border rounded-xl">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="indie">Indie Pop</SelectItem>
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="ambient">Ambient</SelectItem>
                  <SelectItem value="hiphop">Hip Hop</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48 bg-card border-border rounded-xl">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="change">% Change</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tracks */}
            {viewMode === "list" ? (
              // Condensed List View
              <div className="space-y-2">
                {tracks.map(renderCondensedTrackRow)}
              </div>
            ) : viewMode === "grid" ? (
              // Visual Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tracks.map(renderTrackCard)}
              </div>
            ) : (
              // Finance Table View
              <Card className="premium-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Track</TableHead>
                      <TableHead>Genre</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>24h Change</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>{tracks.map(renderTableRow)}</TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="premium-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    $972.00
                  </div>
                  <div className="text-xs positive flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +18.5% all time
                  </div>
                </CardContent>
              </Card>
              <Card className="premium-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Tracks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">3</div>
                  <div className="text-xs text-muted-foreground">
                    90 total shares
                  </div>
                </CardContent>
              </Card>
              <Card className="premium-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Best Performer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    25.0%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Midnight Dreams
                  </div>
                </CardContent>
              </Card>
              <Card className="premium-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Today's P&L
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold positive">+$12.40</div>
                  <div className="text-xs positive">+1.3%</div>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Chart */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Portfolio Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioChartData}>
                      <defs>
                        <linearGradient
                          id="portfolioGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8A2BE2"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#FF2FB9"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#B3B3B3" />
                      <YAxis stroke="#B3B3B3" />
                      <Tooltip
                        formatter={(value) => [`$${value}`, "Portfolio Value"]}
                        labelStyle={{ color: "#FFFFFF" }}
                        contentStyle={{
                          backgroundColor: "#111111",
                          border: "1px solid #1A1A1A",
                          borderRadius: "12px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8A2BE2"
                        strokeWidth={2}
                        fill="url(#portfolioGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Holdings Table */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-foreground">My Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Track</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Buy Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioData.map((holding, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <ImageWithFallback
                              src={holding.cover}
                              alt={holding.track}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div>
                              <div className="font-medium text-foreground">
                                {holding.track}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {holding.artist}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground">
                          {holding.shares}
                        </TableCell>
                        <TableCell className="text-foreground">
                          ${holding.buyPrice}
                        </TableCell>
                        <TableCell className="text-foreground">
                          ${holding.currentPrice}
                        </TableCell>
                        <TableCell className="font-semibold text-foreground">
                          ${holding.value}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center positive">
                            <TrendingUp className="w-3 h-3 mr-1" />+
                            {holding.roi}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
