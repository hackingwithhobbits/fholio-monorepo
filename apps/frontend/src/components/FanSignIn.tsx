import { motion } from "framer-motion";
import { Mail, User, ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Logo } from "./Logo";
import { supabase } from "@/lib/supabase";
import { authUtils } from "@/lib/auth";

interface FanSignInProps {
  onNavigate: (page: string) => void;
  onSuccess: (isNewUser: boolean) => void;
}

export function FanSignIn({ onNavigate, onSuccess }: FanSignInProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isSignUp) {
        // Sign Up - Create new fan account
        const { data, error } = await supabase
          .from("beta_fans")
          .insert([
            {
              email: email.toLowerCase().trim(),
              username: username.trim(),
            },
          ])
          .select();

        if (error) {
          if (error.code === "23505") {
            setError("This email or username is already registered!");
          } else {
            console.error("Sign-up error:", error);
            setError("Sign-up failed. Please try again.");
          }
          setIsLoading(false);
          return;
        }

        if (data && data[0]) {
          authUtils.setSession({
            id: data[0].id,
            email: data[0].email,
            username: data[0].username,
            userType: "fan",
            createdAt: data[0].created_at,
          });

          setSuccess("Account created! Redirecting...");

          setTimeout(() => {
            onSuccess(true); // true = new user, go to onboarding
          }, 1000);
        }
      } else {
        // Sign In - Check if fan exists
        const { data, error } = await supabase
          .from("beta_fans")
          .select("*")
          .eq("email", email.toLowerCase().trim())
          .single();

        if (error || !data) {
          setError("No account found with this email. Please sign up first!");
          setIsLoading(false);
          return;
        }

        authUtils.setSession({
          id: data.id,
          email: data.email,
          username: data.username,
          userType: "fan",
          createdAt: data.created_at,
        });

        setSuccess("Welcome back! Redirecting...");

        setTimeout(() => {
          onSuccess(false); // false = existing user, go to dashboard
        }, 1000);
      }

      setIsLoading(false);
    } catch (error: any) {
      console.error("Error:", error);
      setError(error.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated Background - Purple Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to home
        </motion.button>

        {/* Logo and Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <Logo size="md" glow />
          </div>
          <h1 className="text-4xl mb-3 text-white tracking-tighter">
            {isSignUp ? "Join as a Fan" : "Welcome Back, Fan"}
          </h1>
          <p className="text-muted-foreground/80">
            {isSignUp
              ? "Start building your music portfolio"
              : "Sign in to access your Fholio"}
          </p>
        </motion.div>

        {/* Sign In Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 neon-glow"
        >
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-sm">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Username *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Choose a unique username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-black/40 border-primary/30 focus:border-primary text-white pl-12 pr-4 py-6 rounded-xl transition-all duration-200"
                    required
                    minLength={3}
                    maxLength={20}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  3-20 characters, will be visible to others
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/40 border-primary/30 focus:border-primary text-white pl-12 pr-4 py-6 rounded-xl transition-all duration-200"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white neon-glow py-6 rounded-xl transition-all duration-200"
              size="lg"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </span>
              ) : isSignUp ? (
                "Create Fan Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Toggle Sign Up/Sign In */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setSuccess("");
              }}
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              {isSignUp ? "Sign in" : "Create account"}
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-xs text-muted-foreground/60"
        >
          <p>Beta Version - Simplified authentication for testing</p>
        </motion.div>
      </div>
    </div>
  );
}
