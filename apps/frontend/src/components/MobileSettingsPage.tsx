import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Shield,
  Bell,
  CreditCard,
  Music,
  Eye,
  ChevronRight,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Logo } from "./Logo";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

interface MobileSettingsPageProps {
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

export function MobileSettingsPage({ onNavigate }: MobileSettingsPageProps) {
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
    <div className="min-h-screen bg-black pb-24 pt-safe">
      {/* Mobile Header with Logo and Back Button */}
      <div className="sticky top-0 z-40 pt-safe bg-black/90 backdrop-blur-xl border-b border-primary/10">
        <div className="flex items-center justify-between px-6 py-3">
          <button
            onClick={() => onNavigate("home")}
            className="p-2 -ml-2 text-white hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <Logo size="sm" glow />
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Page Title */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-white text-3xl tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {/* Account Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-white text-xl">Account</h2>
          </div>

          {/* Email */}
          <div className="glass-card rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-white text-sm">Email</p>
                  {isEditingEmail ? (
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 bg-black/50 border-primary/20 text-white"
                      autoFocus
                    />
                  ) : (
                    <p className="text-muted-foreground text-sm">{email}</p>
                  )}
                </div>
              </div>
              {isEditingEmail ? (
                <Button
                  size="sm"
                  onClick={handleSaveEmail}
                  className="bg-gradient-to-r from-primary to-secondary text-white rounded-full px-4 transition-all duration-300"
                >
                  Save
                </Button>
              ) : (
                <button
                  onClick={() => setIsEditingEmail(true)}
                  className="text-primary text-sm hover:text-secondary transition-colors duration-300"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-white text-sm">Password</p>
                  <p className="text-muted-foreground text-sm">••••••••</p>
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                className="text-primary text-sm hover:text-secondary transition-colors duration-300"
              >
                Change
              </button>
            </div>
          </div>

          {/* 2FA */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-white text-sm">
                    Two-Factor Authentication
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {twoFactorEnabled
                      ? "Extra security enabled"
                      : "Add extra security"}
                  </p>
                </div>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={handleToggle2FA}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
              />
            </div>
          </div>
        </motion.section>

        {/* Notification Preferences */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-white text-xl">Notifications</h2>
          </div>

          <div className="glass-card rounded-2xl p-4 space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
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

            <div className="h-px bg-white/5" />

            {/* Push Notifications */}
            <div className="flex items-center justify-between">
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

            <div className="h-px bg-white/5" />

            {/* SMS Notifications */}
            <div className="flex items-center justify-between">
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

            <div className="h-px bg-white/5" />

            {/* Weekly Digest */}
            <div className="flex items-center justify-between">
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

            <div className="h-px bg-white/5" />

            {/* Draft Reminders */}
            <div className="flex items-center justify-between">
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

            <div className="h-px bg-white/5" />

            {/* Price Alerts */}
            <div className="flex items-center justify-between">
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
        </motion.section>

        {/* Payment Methods */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              <h2 className="text-white text-xl">Payment Methods</h2>
            </div>
            <button
              onClick={handleAddPaymentMethod}
              className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-80 transition-all duration-300"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="glass-card rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {getPaymentIcon(method.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-white text-sm">
                          {method.type === "card"
                            ? `${method.brand} •••• ${method.last4}`
                            : method.type === "apple-pay"
                              ? "Apple Pay"
                              : "PayPal"}
                        </p>
                        {method.isDefault && (
                          <Badge className="bg-gradient-to-r from-primary to-secondary text-white text-xs px-2 py-0.5 rounded-full">
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
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Linked Music Accounts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Music className="w-5 h-5 text-primary" />
            <h2 className="text-white text-xl">Linked Accounts</h2>
          </div>

          <div className="space-y-3">
            {linkedAccounts.map((account) => (
              <div key={account.id} className="glass-card rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getPlatformIcon(account.platform)}
                    <div>
                      <p className="text-white text-sm capitalize">
                        {account.platform.replace("-", " ")}
                      </p>
                      {account.isConnected && (
                        <p className="text-muted-foreground text-xs mt-0.5">
                          @{account.username}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleLinkedAccount(account.id)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                      account.isConnected
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-80"
                    }`}
                  >
                    {account.isConnected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Privacy Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="space-y-4 pb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="text-white text-xl">Privacy</h2>
          </div>

          <div className="glass-card rounded-2xl p-4 space-y-4">
            {/* Profile Visibility */}
            <div>
              <p className="text-white text-sm mb-3">Profile Visibility</p>
              <div className="flex gap-2">
                {(["public", "friends", "private"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setProfileVisibility(option)}
                    className={`flex-1 px-3 py-2 rounded-full text-sm transition-all duration-300 ${
                      profileVisibility === option
                        ? "bg-gradient-to-r from-primary to-secondary text-white"
                        : "bg-white/10 text-muted-foreground hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Show Stats */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">Show Portfolio Stats</p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Let others see your performance
                </p>
              </div>
              <Switch
                checked={showStats}
                onCheckedChange={setShowStats}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
              />
            </div>

            <div className="h-px bg-white/5" />

            {/* Data Sharing */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">Anonymous Data Sharing</p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Help improve Fholio
                </p>
              </div>
              <Switch
                checked={dataSharing}
                onCheckedChange={setDataSharing}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
              />
            </div>

            <div className="h-px bg-white/5" />

            {/* Marketing Emails */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">Marketing Emails</p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Promotions and updates
                </p>
              </div>
              <Switch
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
              />
            </div>
          </div>
        </motion.section>

        {/* Danger Zone */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="space-y-3 pb-8"
        >
          <Button
            variant="outline"
            className="w-full py-6 rounded-2xl border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all duration-300"
            onClick={() =>
              toast.error("Account logout", { description: "Logging out..." })
            }
          >
            Log Out
          </Button>

          <Button
            variant="outline"
            className="w-full py-6 rounded-2xl border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all duration-300"
            onClick={() =>
              toast.error("Delete account", {
                description: "This action cannot be undone",
              })
            }
          >
            Delete Account
          </Button>
        </motion.section>
      </div>
    </div>
  );
}
