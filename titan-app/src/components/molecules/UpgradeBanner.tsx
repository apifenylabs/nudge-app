"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, ArrowUp, ChevronRight, Crown, X } from "lucide-react";

interface UpgradeBannerProps {
  title?: string;
  description?: string;
  onUpgrade: () => void;
  onDismiss?: () => void;
  variant?: "banner" | "card" | "toast";
  visible?: boolean;
}

export function UpgradeBanner({
  title = "Unlock Pro",
  description = "Upgrade to Pro for unlimited swarms, all mascots, and save/load support.",
  onUpgrade,
  onDismiss,
  variant = "banner",
  visible = true,
}: UpgradeBannerProps) {
  if (variant === "card") {
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            className="p-4 sm:p-5 rounded-2xl border relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(245, 158, 11, 0.06))",
              borderColor: "rgba(245, 158, 11, 0.2)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Glow */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-30"
              style={{
                background: "radial-gradient(circle, rgba(245, 158, 11, 0.2), transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {onDismiss && (
              <button
                onClick={onDismiss}
                className="absolute top-2 right-2 text-titan-muted/40 hover:text-titan-muted/70 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                }}
              >
                <Crown className="h-5 w-5 text-titan-golden" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-titan-text mb-1">
                  {title}
                </h3>
                <p className="text-[11px] text-titan-muted/70 leading-relaxed mb-3">
                  {description}
                </p>
                <motion.button
                  onClick={onUpgrade}
                  className="px-4 py-1.5 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1.5 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #14B8A6, #F59E0B)",
                    color: "#0A0E17",
                  }}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Zap className="h-3 w-3" />
                  Upgrade to Pro — $19/mo
                  <ChevronRight className="h-3 w-3" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (variant === "toast") {
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl border shadow-2xl backdrop-blur-md"
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              borderColor: "rgba(245, 158, 11, 0.2)",
              maxWidth: "320px",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(245, 158, 11, 0.15)" }}
              >
                <Crown className="h-4 w-4 text-titan-golden" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-titan-text mb-0.5">{title}</p>
                <p className="text-[10px] text-titan-muted/70 mb-2">{description}</p>
                <button
                  onClick={onUpgrade}
                  className="text-[10px] font-semibold titan-text-gradient"
                >
                  Upgrade Now →
                </button>
              </div>
              {onDismiss && (
                <button onClick={onDismiss} className="text-titan-muted/30 hover:text-titan-muted/60">
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Default: banner variant
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="relative overflow-hidden px-4 sm:px-6 py-3 sm:py-4 border-b"
          style={{
            background: "linear-gradient(90deg, rgba(20, 184, 166, 0.06), rgba(245, 158, 11, 0.04))",
            borderColor: "rgba(245, 158, 11, 0.15)",
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <Sparkles className="h-4 w-4 text-titan-golden shrink-0" />
              <p className="text-xs sm:text-sm text-titan-text/90 truncate">
                <span className="font-semibold">{title}</span>
                {description && <span className="text-titan-muted/70 ml-1 hidden sm:inline">{description}</span>}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                onClick={onUpgrade}
                className="px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold inline-flex items-center gap-1 shadow-lg whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #14B8A6, #F59E0B)",
                  color: "#0A0E17",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <ArrowUp className="h-3 w-3" />
                Upgrade
              </motion.button>
              {onDismiss && (
                <button onClick={onDismiss} className="text-titan-muted/30 hover:text-titan-muted/60">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
