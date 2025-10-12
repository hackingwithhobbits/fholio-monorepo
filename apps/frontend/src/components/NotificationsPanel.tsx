import { useState } from "react";
import {
  Bell,
  X,
  Check,
  TrendingUp,
  Music,
  DollarSign,
  Users,
  Clock,
  Settings,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsPanel({
  isOpen,
  onClose,
}: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "investment",
      title: "Investment Update",
      message: "Midnight Dreams reached 50% funding milestone",
      track: "Midnight Dreams",
      artist: "Luna Valley",
      time: "2 minutes ago",
      read: false,
      cover:
        "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      type: "profit",
      title: "Profit Earned",
      message: "You earned $12.50 from Electric Pulse streaming revenue",
      track: "Electric Pulse",
      artist: "Neon Riders",
      time: "1 hour ago",
      read: false,
      cover:
        "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      type: "launch",
      title: "New Track Launch",
      message: "Digital Sunset campaign is now live and accepting backers",
      track: "Digital Sunset",
      artist: "Synth Masters",
      time: "3 hours ago",
      read: true,
      cover:
        "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 4,
      type: "milestone",
      title: "Track Milestone",
      message:
        "Ocean Waves hit 10,000 streams - your shares increased in value!",
      track: "Ocean Waves",
      artist: "Coastal Sound",
      time: "1 day ago",
      read: true,
      cover:
        "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 5,
      type: "system",
      title: "Portfolio Summary",
      message: "Your weekly portfolio update is ready to view",
      time: "2 days ago",
      read: true,
    },
    {
      id: 6,
      type: "artist",
      title: "Artist Update",
      message: "Luna Valley shared an update about their upcoming EP",
      artist: "Luna Valley",
      time: "3 days ago",
      read: true,
      cover:
        "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODgwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ]);

  const [settings, setSettings] = useState({
    investments: true,
    profits: true,
    launches: true,
    milestones: true,
    system: false,
    artist: true,
    email: true,
    push: false,
  });

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "investment":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "profit":
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case "launch":
        return <Music className="w-5 h-5 text-purple-500" />;
      case "milestone":
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case "system":
        return <Settings className="w-5 h-5 text-gray-500" />;
      case "artist":
        return <Users className="w-5 h-5 text-pink-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-full max-w-md h-full bg-background shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <h2 className="font-semibold">Notifications</h2>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
              <TabsTrigger value="all">
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="flex-1 flex flex-col p-0 m-0">
              {/* Actions */}
              <div className="p-4 pb-2">
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Mark all read
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {unreadCount} unread
                  </span>
                </div>
              </div>

              {/* Notifications List */}
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-2 pb-4">
                  {notifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer transition-colors ${
                        !notification.read
                          ? "bg-primary/5 border-primary/20"
                          : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex space-x-3">
                          {/* Icon or Cover */}
                          <div className="flex-shrink-0">
                            {notification.cover ? (
                              <ImageWithFallback
                                src={notification.cover}
                                alt={
                                  notification.track ||
                                  notification.artist ||
                                  ""
                                }
                                className="w-10 h-10 rounded object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                                {getNotificationIcon(notification.type)}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-medium truncate">
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-1 ml-2">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-6 h-6 opacity-0 group-hover:opacity-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              {(notification.track || notification.artist) && (
                                <div className="text-xs text-muted-foreground">
                                  {notification.track && (
                                    <span>"{notification.track}"</span>
                                  )}
                                  {notification.artist && (
                                    <span> by {notification.artist}</span>
                                  )}
                                </div>
                              )}
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                {notification.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="investments">Investment Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Funding milestones and campaign updates
                        </p>
                      </div>
                      <Switch
                        id="investments"
                        checked={settings.investments}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            investments: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="profits">Profit Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Revenue sharing and dividend payments
                        </p>
                      </div>
                      <Switch
                        id="profits"
                        checked={settings.profits}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, profits: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="launches">New Track Launches</Label>
                        <p className="text-xs text-muted-foreground">
                          New campaigns from artists you follow
                        </p>
                      </div>
                      <Switch
                        id="launches"
                        checked={settings.launches}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            launches: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="milestones">Track Milestones</Label>
                        <p className="text-xs text-muted-foreground">
                          Stream counts, chart positions, and achievements
                        </p>
                      </div>
                      <Switch
                        id="milestones"
                        checked={settings.milestones}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            milestones: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="artist">Artist Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          News and updates from artists you back
                        </p>
                      </div>
                      <Switch
                        id="artist"
                        checked={settings.artist}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, artist: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system">System Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Account updates and platform news
                        </p>
                      </div>
                      <Switch
                        id="system"
                        checked={settings.system}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, system: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Delivery Method</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email">Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email"
                        checked={settings.email}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, email: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push">Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Browser push notifications
                        </p>
                      </div>
                      <Switch
                        id="push"
                        checked={settings.push}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, push: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    Save Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
