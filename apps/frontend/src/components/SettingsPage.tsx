import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Shield,
  Bell,
  CreditCard,
  Music,
  Eye,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "apple-pay";
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

interface LinkedAccount {
  id: string;
  platform: "spotify" | "apple-music" | "youtube-music" | "soundcloud";
  username: string;
  isConnected: boolean;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  // Account Settings State
  const [email, setEmail] = useState("user@fholio.com");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Notification Preferences State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [draftReminders, setDraftReminders] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);

  // Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", type: "card", last4: "4242", brand: "Visa", isDefault: true },
    { id: "2", type: "apple-pay", isDefault: false },
  ]);

  // Linked Music Accounts State
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([
    { id: "1", platform: "spotify", username: "user123", isConnected: true },
    { id: "2", platform: "apple-music", username: "", isConnected: false },
    { id: "3", platform: "youtube-music", username: "", isConnected: false },
    { id: "4", platform: "soundcloud", username: "", isConnected: false },
  ]);

  // Privacy Settings State
  const [profileVisibility, setProfileVisibility] = useState<
    "public" | "friends" | "private"
  >("public");
  const [showStats, setShowStats] = useState(true);
  const [dataSharing, setDataSharing] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSaveEmail = () => {
    setIsEditingEmail(false);
    toast.success("Email updated successfully");
  };

  const handleChangePassword = () => {
    toast.info("Password change email sent", {
      description: "Check your inbox for reset instructions",
    });
  };

  const handleToggle2FA = (enabled: boolean) => {
    setTwoFactorEnabled(enabled);
    toast.success(enabled ? "2FA enabled" : "2FA disabled");
  };

  const handleAddPaymentMethod = () => {
    toast.info("Add payment method", {
      description: "This would open a payment form",
    });
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods((methods) => methods.filter((m) => m.id !== id));
    toast.success("Payment method removed");
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods((methods) =>
      methods.map((m) => ({ ...m, isDefault: m.id === id }))
    );
    toast.success("Default payment method updated");
  };

  const handleToggleLinkedAccount = (id: string) => {
    const account = linkedAccounts.find((a) => a.id === id);
    if (!account) return;

    if (account.isConnected) {
      // Disconnect
      setLinkedAccounts((accounts) =>
        accounts.map((a) =>
          a.id === id ? { ...a, isConnected: false, username: "" } : a
        )
      );
      toast.success(`${account.platform} disconnected`);
    } else {
      // Connect (simulate)
      toast.info("Connecting...", {
        description: "This would open OAuth flow",
      });
      setTimeout(() => {
        setLinkedAccounts((accounts) =>
          accounts.map((a) =>
            a.id === id ? { ...a, isConnected: true, username: "user123" } : a
          )
        );
        toast.success(`${account.platform} connected`);
      }, 1500);
    }
  };

  const getPlatformIcon = (platform: string) => {
    return <Music className="w-5 h-5" />;
  };

  const getPaymentIcon = (type: string) => {
    return <CreditCard className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-white text-5xl tracking-tight mb-3">Settings</h1>
          <p className="text-muted-foreground text-lg">
            Manage your account and preferences
          </p>
        </motion.div>

        {/* Tabs Layout */}
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="glass-card border-primary/20 p-1 h-auto mb-8">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-white px-6 py-3 rounded-lg"
            >
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-white px-6 py-3 rounded-lg"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-white px-6 py-3 rounded-lg"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Payments
            </TabsTrigger>
            <TabsTrigger
              value="accounts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-white px-6 py-3 rounded-lg"
            >
              <Music className="w-4 h-4 mr-2" />
              Linked Accounts
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-white px-6 py-3 rounded-lg"
            >
              <Eye className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <Card className="glass-card border-primary/20 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-5 h-5 text-primary" />
                    <h3 className="text-white">Email Address</h3>
                  </div>
                  {isEditingEmail ? (
                    <div className="space-y-3">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/50 border-primary/20 text-white"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveEmail}
                          className="gradient-bg flex-1"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditingEmail(false)}
                          className="border-white/20"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-muted-foreground mb-3">{email}</p>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditingEmail(true)}
                        className="border-primary/30 text-white hover:bg-primary/20"
                      >
                        Change Email
                      </Button>
                    </div>
                  )}
                </div>
              </Card>

              {/* Password */}
              <Card className="glass-card border-primary/20 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-5 h-5 text-primary" />
                    <h3 className="text-white">Password</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">••••••••••••</p>
                  <Button
                    variant="outline"
                    onClick={handleChangePassword}
                    className="border-primary/30 text-white hover:bg-primary/20"
                  >
                    Change Password
                  </Button>
                </div>
              </Card>

              {/* 2FA */}
              <Card className="glass-card border-primary/20 p-6 md:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="text-white mb-1">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {twoFactorEnabled
                          ? "Extra security is enabled for your account"
                          : "Add an extra layer of security to your account"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={handleToggle2FA}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
                  />
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card border-primary/20 p-6">
                <h3 className="text-white mb-6">Communication Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <p className="text-white text-sm">Email Notifications</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <p className="text-white text-sm">Push Notifications</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Get real-time updates
                      </p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-white text-sm">SMS Notifications</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Text message alerts
                      </p>
                    </div>
                    <Switch
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
                    />
                  </div>
                </div>
              </Card>

              <Card className="glass-card border-primary/20 p-6">
                <h3 className="text-white mb-6">Content Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <p className="text-white text-sm">Weekly Digest</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Summary of your portfolio
                      </p>
                    </div>
                    <Switch
                      checked={weeklyDigest}
                      onCheckedChange={setWeeklyDigest}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <p className="text-white text-sm">Draft Reminders</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Don't miss draft deadlines
                      </p>
                    </div>
                    <Switch
                      checked={draftReminders}
                      onCheckedChange={setDraftReminders}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-white text-sm">Price Alerts</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Artist value changes
                      </p>
                    </div>
                    <Switch
                      checked={priceAlerts}
                      onCheckedChange={setPriceAlerts}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card className="glass-card border-primary/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white">Payment Methods</h3>
                <Button
                  onClick={handleAddPaymentMethod}
                  className="gradient-bg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="glass-card border-white/5 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {getPaymentIcon(method.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-white">
                              {method.type === "card"
                                ? `${method.brand} •••• ${method.last4}`
                                : method.type === "apple-pay"
                                  ? "Apple Pay"
                                  : "PayPal"}
                            </p>
                            {method.isDefault && (
                              <Badge className="bg-gradient-to-r from-primary to-secondary text-white text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          {!method.isDefault && (
                            <button
                              onClick={() => handleSetDefaultPayment(method.id)}
                              className="text-xs text-primary hover:text-secondary transition-colors duration-300 mt-1"
                            >
                              Set as default
                            </button>
                          )}
                        </div>
                      </div>
                      {!method.isDefault && (
                        <button
                          onClick={() => handleRemovePaymentMethod(method.id)}
                          className="p-2 text-muted-foreground hover:text-red-500 transition-colors duration-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Linked Accounts Tab */}
          <TabsContent value="accounts">
            <Card className="glass-card border-primary/20 p-6">
              <h3 className="text-white mb-6">Music Platform Connections</h3>
              <p className="text-muted-foreground mb-6">
                Connect your music accounts to sync listening data and improve
                recommendations.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {linkedAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="glass-card border-white/5 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getPlatformIcon(account.platform)}
                        <div>
                          <p className="text-white capitalize">
                            {account.platform.replace("-", " ")}
                          </p>
                          {account.isConnected && (
                            <p className="text-muted-foreground text-sm mt-0.5">
                              @{account.username}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleToggleLinkedAccount(account.id)}
                        variant={account.isConnected ? "outline" : "default"}
                        className={
                          account.isConnected
                            ? "border-white/20 hover:bg-white/10"
                            : "gradient-bg"
                        }
                      >
                        {account.isConnected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <div className="space-y-6">
              <Card className="glass-card border-primary/20 p-6">
                <h3 className="text-white mb-6">Profile Visibility</h3>
                <div className="flex gap-3 mb-6">
                  {(["public", "friends", "private"] as const).map((option) => (
                    <button
                      key={option}
                      onClick={() => setProfileVisibility(option)}
                      className={`flex-1 px-6 py-4 rounded-xl transition-all duration-300 ${
                        profileVisibility === option
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                          : "glass-card border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">
                  {profileVisibility === "public" &&
                    "Your profile and portfolio are visible to everyone"}
                  {profileVisibility === "friends" &&
                    "Only your friends can see your profile and portfolio"}
                  {profileVisibility === "private" &&
                    "Your profile and portfolio are only visible to you"}
                </p>
              </Card>

              <Card className="glass-card border-primary/20 p-6">
                <h3 className="text-white mb-6">Data & Privacy Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <p className="text-white">Show Portfolio Stats</p>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        Let others see your performance and earnings
                      </p>
                    </div>
                    <Switch
                      checked={showStats}
                      onCheckedChange={setShowStats}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <p className="text-white">Anonymous Data Sharing</p>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        Help improve Fholio with anonymous usage data
                      </p>
                    </div>
                    <Switch
                      checked={dataSharing}
                      onCheckedChange={setDataSharing}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-white">Marketing Emails</p>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        Receive promotions and platform updates
                      </p>
                    </div>
                    <Switch
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
                    />
                  </div>
                </div>
              </Card>

              {/* Danger Zone */}
              <Card className="glass-card border-red-500/20 p-6">
                <h3 className="text-white mb-6">Danger Zone</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10"
                    onClick={() =>
                      toast.error("Account logout", {
                        description: "Logging out...",
                      })
                    }
                  >
                    Log Out
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-red-500/40 text-red-400 hover:bg-red-500/20"
                    onClick={() =>
                      toast.error("Delete account", {
                        description: "This action cannot be undone",
                      })
                    }
                  >
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
