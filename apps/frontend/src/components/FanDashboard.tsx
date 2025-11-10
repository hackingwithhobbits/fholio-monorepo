import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Wallet, User, LogOut, Music } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { DashboardV2 } from "./DashboardV2";
import { LeaderboardPage } from "./LeaderboardPage";
import { WalletPage } from "./WalletPage";
import { toast } from "sonner";
import { authUtils, UserSession } from "@/lib/auth";

interface FanDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function FanDashboard({ onNavigate, onLogout }: FanDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "my-picks" | "leaderboard" | "wallet" | "profile"
  >("my-picks");
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  // Load user session on mount
  useEffect(() => {
    const session = authUtils.getSession();
    if (session) {
      setUserSession(session);
    }
  }, []);

  // Format date nicely
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  const tabs = [
    { id: "my-picks" as const, label: "My Picks", icon: Music },
    { id: "leaderboard" as const, label: "Leaderboard", icon: Trophy },
    { id: "wallet" as const, label: "Wallet", icon: Wallet },
    { id: "profile" as const, label: "Profile", icon: User },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "my-picks":
        return <DashboardV2 onNavigate={onNavigate} />;
      case "leaderboard":
        return <LeaderboardPage onNavigate={onNavigate} />;
      case "wallet":
        return <WalletPage onNavigate={onNavigate} />;
      case "profile":
        return (
          <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
            <div className="max-w-2xl mx-auto">
              <div className="glass-card rounded-2xl p-8">
                {/* Profile Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl text-white mb-2">
                    {userSession?.username || "Fan"}
                  </h2>
                  <p className="text-muted-foreground">Fholio Fan</p>
                </div>

                {/* Profile Details */}
                <div className="space-y-6">
                  <div className="border-t border-white/10 pt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Username
                        </label>
                        <div className="text-white mt-1 text-lg">
                          {userSession?.username || "Loading..."}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          Email
                        </label>
                        <div className="text-white mt-1">
                          {userSession?.email || "Loading..."}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          Member Since
                        </label>
                        <div className="text-white mt-1">
                          {userSession?.createdAt
                            ? formatDate(userSession.createdAt)
                            : "Loading..."}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          Account Type
                        </label>
                        <div className="text-white mt-1 flex items-center gap-2">
                          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                            Beta Fan
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Beta Notice */}
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
                    <p className="text-sm text-primary">
                      🎉 You're part of our Beta! More features coming soon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => onNavigate("home")}
            >
              <Logo
                size="md"
                glow
                className="group-hover:scale-110 transition-transform"
              />
            </div>

            {/* Tab Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-200 ease-in-out group ${
                      isActive
                        ? "text-white"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 gradient-bg rounded-xl opacity-20 neon-glow" />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 gradient-bg rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200 ease-in-out" />
                    )}
                    <TabIcon
                      className={`w-4 h-4 relative z-10 ${isActive ? "text-primary" : ""}`}
                    />
                    <span className="relative z-10 tracking-tight text-sm whitespace-nowrap">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              {/* Show username on desktop */}
              {userSession && (
                <div className="hidden lg:block text-right">
                  <div className="text-white text-sm font-medium">
                    {userSession.username}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {userSession.email}
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                onClick={onLogout}
                className="text-white hover:bg-white/5 rounded-xl transition-all duration-200 ease-in-out"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden border-t border-primary/10 px-4 py-2">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary/20 text-white"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <main>{renderTabContent()}</main>
    </div>
  );
}
