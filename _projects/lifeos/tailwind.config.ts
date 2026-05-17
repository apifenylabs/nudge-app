import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Premium minimal palette
        cream: "#FAF7F2",
        creamDark: "#F5F0E8",
        ink: "#1A1A2E",
        accent: "#7C3AED",      // Purple — creativity & AI
        accentLight: "#A78BFA",
        accentDark: "#5B21B6",
        highlight: "#F59E0B",   // Amber — warmth
        surface: "#FFFFFF",
        surfaceDark: "#1E1E3A",
        muted: "#9CA3AF",
        border: "#E5E7EB",
        darkBorder: "#2D2D4A",
        success: "#10B981",
        error: "#EF4444",
        warning: "#F59E0B",
        // Category colors
        meal: "#10B981",        // Green — fresh, natural
        finance: "#3B82F6",     // Blue — trust, money
        solopreneur: "#8B5CF6", // Purple — creativity
        travel: "#F97316",      // Orange — adventure
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
