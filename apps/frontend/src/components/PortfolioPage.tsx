import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Eye,
  MoreHorizontal,
  PieChart,
  BarChart3,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart as RechartsPie,
  Cell,
} from "recharts";

interface PortfolioPageProps {
  onPageChange: (page: string) => void;
}

export function PortfolioPage({ onPageChange }: PortfolioPageProps) {
  const [viewMode, setViewMode] = useState<"table" | "chart">("table");
  const [timeRange, setTimeRange] = useState("6M");
  const [genreFilter, setGenreFilter] = useState("all");

  const portfolioData = [
    {
      id: 1,
      track: "Midnight Dreams",
      artist: "Luna Valley",
      genre: "Indie Pop",
      shares: 25,
      buyPrice: 10.0,
      currentPrice: 12.5,
      value: 312.5,
      invested: 250.0,
      roi: 25.0,
      change24h: 2.1,
      lastDividend: 5.2,
      cover:
        "https://images.unsplash.com/photo-1617431014998-f4f219965a1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHBvcCUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2OTI1MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      track: "Ocean Waves",
      artist: "Coastal Sound",
      genre: "Ambient",
      shares: 50,
      buyPrice: 7.5,
      currentPrice: 8.75,
      value: 437.5,
      invested: 375.0,
      roi: 16.7,
      change24h: 1.2,
      lastDividend: 8.75,
      cover:
        "https://images.unsplash.com/photo-1749383024184-48883730e828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJpZW50JTIwbXVzaWMlMjBuYXR1cmUlMjBhbGJ1bXxlbnwxfHx8fDE3NTY5MjUxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      track: "Digital Rain",
      artist: "Synth Masters",
      genre: "Synthwave",
      shares: 15,
      buyPrice: 13.0,
      currentPrice: 14.8,
      value: 222.0,
      invested: 195.0,
      roi: 13.8,
      change24h: -0.8,
      lastDividend: 2.85,
      cover:
        "https://images.unsplash.com/photo-1611084352382-062f1bfe31e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeW50aHdhdmUlMjByZXRybyUyMGFsYnVtJTIwYXJ0fGVufDF8fHx8MTc1NjkyNTExMXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 4,
      track: "City Lights",
      artist: "Urban Echo",
      genre: "Hip Hop",
      shares: 20,
      buyPrice: 16.0,
      currentPrice: 18.3,
      value: 366.0,
      invested: 320.0,
      roi: 14.4,
      change24h: 3.2,
      lastDividend: 6.1,
      cover:
        "https://images.unsplash.com/photo-1646900614911-378fd0c1d86d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBhbGJ1bSUyMGNvdmVyJTIwYXJ0fGVufDF8fHx8MTc1NjkyODc4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 5,
      track: "Electric Pulse",
      artist: "Neon Riders",
      genre: "Electronic",
      shares: 8,
      buyPrice: 22.0,
      currentPrice: 25.0,
      value: 200.0,
      invested: 176.0,
      roi: 13.6,
      change24h: -1.5,
      lastDividend: 4.2,
      cover:
        "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyJTIwYXJ0fGVufDF8fHx8MTc1NjkyNTEwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const portfolioHistory = [
    { date: "Jan", value: 1100, invested: 1000 },
    { date: "Feb", value: 1250, invested: 1150 },
    { date: "Mar", value: 1380, invested: 1200 },
    { date: "Apr", value: 1420, invested: 1250 },
    { date: "May", value: 1485, invested: 1300 },
    { date: "Jun", value: 1538, invested: 1316 },
  ];

  const genreDistribution = [
    { name: "Indie Pop", value: 312.5, percentage: 20.3, color: "#8B5CF6" },
    { name: "Ambient", value: 437.5, percentage: 28.4, color: "#EC4899" },
    { name: "Synthwave", value: 222.0, percentage: 14.4, color: "#F472B6" },
    { name: "Hip Hop", value: 366.0, percentage: 23.8, color: "#A78BFA" },
    { name: "Electronic", value: 200.0, percentage: 13.0, color: "#FBBF24" },
  ];

  const transactionHistory = [
    {
      id: 1,
      date: "2024-01-15",
      type: "buy",
      track: "Midnight Dreams",
      artist: "Luna Valley",
      shares: 25,
      price: 10.0,
      amount: 250.0,
      status: "completed",
    },
    {
      id: 2,
      date: "2024-01-20",
      type: "dividend",
      track: "Midnight Dreams",
      artist: "Luna Valley",
      shares: 25,
      price: 0.21,
      amount: 5.25,
      status: "completed",
    },
    {
      id: 3,
      date: "2024-02-01",
      type: "buy",
      track: "Ocean Waves",
      artist: "Coastal Sound",
      shares: 50,
      price: 7.5,
      amount: 375.0,
      status: "completed",
    },
    {
      id: 4,
      date: "2024-02-10",
      type: "sell",
      track: "Digital Rain",
      artist: "Synth Masters",
      shares: 5,
      price: 14.2,
      amount: 71.0,
      status: "completed",
    },
    {
      id: 5,
      date: "2024-02-15",
      type: "buy",
      track: "City Lights",
      artist: "Urban Echo",
      shares: 20,
      price: 16.0,
      amount: 320.0,
      status: "pending",
    },
    {
      id: 6,
      date: "2024-02-18",
      type: "dividend",
      track: "Ocean Waves",
      artist: "Coastal Sound",
      shares: 50,
      price: 0.175,
      amount: 8.75,
      status: "completed",
    },
  ];

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  const totalInvested = portfolioData.reduce(
    (sum, item) => sum + item.invested,
    0
  );
  const totalROI = ((totalValue - totalInvested) / totalInvested) * 100;
  const totalDividends = portfolioData.reduce(
    (sum, item) => sum + item.lastDividend,
    0
  );

  const filteredData =
    genreFilter === "all"
      ? portfolioData
      : portfolioData.filter((item) =>
          item.genre.toLowerCase().includes(genreFilter)
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-background to-pink-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Portfolio</h1>
            <p className="text-muted-foreground">
              Track your music investments and earnings
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="6M">6 Months</SelectItem>
                <SelectItem value="1Y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Value</p>
                  <h3 className="text-2xl font-bold">
                    ${totalValue.toFixed(2)}
                  </h3>
                  <div className="flex items-center text-sm text-purple-100 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />+
                    {totalROI.toFixed(1)}% all time
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">
                    Total Invested
                  </p>
                  <h3 className="text-2xl font-bold">
                    ${totalInvested.toFixed(2)}
                  </h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    Across {portfolioData.length} tracks
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Profit</p>
                  <h3 className="text-2xl font-bold text-green-600">
                    +${(totalValue - totalInvested).toFixed(2)}
                  </h3>
                  <div className="text-sm text-green-600 mt-1">
                    {totalROI.toFixed(1)}% return
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">
                    Dividends Earned
                  </p>
                  <h3 className="text-2xl font-bold text-orange-600">
                    ${totalDividends.toFixed(2)}
                  </h3>
                  <div className="text-sm text-orange-600 mt-1">This month</div>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <PieChart className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioHistory}>
                    <defs>
                      <linearGradient
                        id="valueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8B5CF6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#EC4899"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="investedGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6B7280"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6B7280"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        `$${value}`,
                        name === "value" ? "Current Value" : "Total Invested",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="invested"
                      stroke="#6B7280"
                      strokeWidth={2}
                      fill="url(#investedGradient)"
                      stackId="1"
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="url(#valueGradient)"
                      strokeWidth={3}
                      fill="url(#valueGradient)"
                      stackId="2"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie width={400} height={400}>
                    <RechartsPie
                      data={genreDistribution}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                    >
                      {genreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPie>
                    <Tooltip formatter={(value) => [`$${value}`, "Value"]} />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Holdings & Transactions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <CardTitle>Portfolio Details</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search tracks..."
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="indie">Indie Pop</SelectItem>
                    <SelectItem value="ambient">Ambient</SelectItem>
                    <SelectItem value="synthwave">Synthwave</SelectItem>
                    <SelectItem value="hip hop">Hip Hop</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                  >
                    Table
                  </Button>
                  <Button
                    variant={viewMode === "chart" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("chart")}
                  >
                    Chart
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="holdings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="holdings">My Holdings</TabsTrigger>
                <TabsTrigger value="transactions">
                  Transaction History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="holdings" className="space-y-4">
                {viewMode === "table" ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Track</TableHead>
                          <TableHead>Genre</TableHead>
                          <TableHead>Shares</TableHead>
                          <TableHead>Buy Price</TableHead>
                          <TableHead>Current Price</TableHead>
                          <TableHead>24h Change</TableHead>
                          <TableHead>Total Value</TableHead>
                          <TableHead>ROI</TableHead>
                          <TableHead>Dividend</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.map((holding) => (
                          <TableRow
                            key={holding.id}
                            className="hover:bg-muted/50"
                          >
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <ImageWithFallback
                                  src={holding.cover}
                                  alt={holding.track}
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div>
                                  <div
                                    className="font-medium cursor-pointer hover:underline"
                                    onClick={() => onPageChange("track-detail")}
                                  >
                                    {holding.track}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {holding.artist}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{holding.genre}</Badge>
                            </TableCell>
                            <TableCell>{holding.shares}</TableCell>
                            <TableCell>
                              ${holding.buyPrice.toFixed(2)}
                            </TableCell>
                            <TableCell className="font-semibold">
                              ${holding.currentPrice.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <div
                                className={`flex items-center ${
                                  holding.change24h >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {holding.change24h >= 0 ? (
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                ) : (
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                )}
                                {holding.change24h >= 0 ? "+" : ""}
                                {holding.change24h}%
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold">
                              ${holding.value.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center text-green-500">
                                <TrendingUp className="w-3 h-3 mr-1" />+
                                {holding.roi.toFixed(1)}%
                              </div>
                            </TableCell>
                            <TableCell className="text-orange-600 font-semibold">
                              ${holding.lastDividend.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Button variant="ghost" size="icon">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredData.map((holding) => (
                      <Card
                        key={holding.id}
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => onPageChange("track-detail")}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <ImageWithFallback
                              src={holding.cover}
                              alt={holding.track}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">
                                {holding.track}
                              </h4>
                              <p className="text-sm text-muted-foreground truncate">
                                {holding.artist}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {holding.genre}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Value:
                              </span>
                              <div className="font-semibold">
                                ${holding.value.toFixed(2)}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                ROI:
                              </span>
                              <div className="font-semibold text-green-500">
                                +{holding.roi.toFixed(1)}%
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Shares:
                              </span>
                              <div className="font-semibold">
                                {holding.shares}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Dividend:
                              </span>
                              <div className="font-semibold text-orange-600">
                                ${holding.lastDividend.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Track</TableHead>
                        <TableHead>Shares</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactionHistory.map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.type === "buy"
                                  ? "default"
                                  : transaction.type === "sell"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {transaction.type.charAt(0).toUpperCase() +
                                transaction.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {transaction.track}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {transaction.artist}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{transaction.shares}</TableCell>
                          <TableCell>${transaction.price.toFixed(2)}</TableCell>
                          <TableCell
                            className={
                              transaction.type === "sell" ||
                              transaction.type === "dividend"
                                ? "text-green-600"
                                : ""
                            }
                          >
                            {transaction.type === "sell" ||
                            transaction.type === "dividend"
                              ? "+"
                              : "-"}
                            ${transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.status === "completed"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : ""
                              }
                            >
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
