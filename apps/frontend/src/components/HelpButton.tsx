import { useState } from "react";
import { HelpCircle, X as XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HelpButtonProps {
  onNavigate: (page: string) => void;
}

export function HelpButton({ onNavigate }: HelpButtonProps) {
  const [showQuickHelp, setShowQuickHelp] = useState(false);

  const quickLinks = [
    { label: "How It Works", page: "about" },
    { label: "FAQ", page: "about" },
    { label: "Weekly Games Guide", page: "weekly-games" },
    { label: "Prize Pool Info", page: "about" },
  ];

  return (
    <>
      {/* Floating Help Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQuickHelp(!showQuickHelp)}
              className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg neon-glow cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {showQuickHelp ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XIcon className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="help"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HelpCircle className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left" className="glass-card border-primary/20">
            <p>Need help?</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Quick Help Menu */}
      <AnimatePresence>
        {showQuickHelp && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 glass-card rounded-2xl p-4 w-64 neon-glow"
          >
            <h4 className="text-white mb-3">Quick Help</h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onNavigate(link.page);
                    setShowQuickHelp(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  onNavigate("about");
                  setShowQuickHelp(false);
                }}
                className="w-full gradient-bg text-white px-3 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                View Full FAQ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
