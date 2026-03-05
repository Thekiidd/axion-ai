import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0C0A08",
        surface: "#161410",
        card: "#1E1A16",
        amber: "#FF9500",
        "amber-dim": "rgba(255,149,0,0.08)",
        muted: "#7A6F65",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Playfair Display'", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease both",
        blink: "blink 2s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
