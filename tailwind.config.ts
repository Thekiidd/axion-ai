import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#05050A",
        surface: "#0D0D18",
        lime: "#C8FF00",
        muted: "#6A6A82",
        border: "rgba(255,255,255,0.07)",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "cursive"],
        serif: ["var(--font-instrument)", "serif"],
        sans: ["var(--font-figtree)", "sans-serif"],
      },
      animation: {
        ticker: "ticker 25s linear infinite",
        blink: "blink 2s infinite",
        "fade-up": "fadeUp 0.8s ease both",
        "dot-bounce": "dotBounce 1.2s infinite",
      },
      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        dotBounce: {
          "0%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
