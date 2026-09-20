/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#080706",
        secondary: "#11100D",
        panel: "#161410",
        gold: {
          DEFAULT: "#C9A45C",
          bright: "#E8C77A",
          deep: "#8A6F3C",
        },
        ivory: "#F4EFE5",
        muted: "#B8B1A5",
      },
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
      },
      transitionDuration: {
        400: "400ms",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Manrope"', "ui-sans-serif", "system-ui", "sans-serif"],
        script: ['"Great Vibes"', "cursive"],
      },
      letterSpacing: {
        luxe: "0.28em",
        wider2: "0.16em",
      },
      boxShadow: {
        "gold-glow": "0 0 0 1px rgba(201,164,92,.35), 0 18px 60px -18px rgba(201,164,92,.35)",
        "card": "0 24px 60px -24px rgba(0,0,0,.8)",
        "lift": "0 34px 80px -28px rgba(0,0,0,.9), 0 0 0 1px rgba(201,164,92,.28)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(1.5deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: ".45" },
          "50%": { opacity: "1" },
        },
        "spin-slower": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "draw-line": {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        "float-slow": "float-slow 7s ease-in-out infinite",
        "float-slower": "float-slower 11s ease-in-out infinite",
        shimmer: "shimmer 3.2s linear infinite",
        "pulse-glow": "pulse-glow 3.4s ease-in-out infinite",
        "spin-slower": "spin-slower 22s linear infinite",
        "draw-line": "draw-line 1.6s ease forwards",
      },
    },
  },
  plugins: [],
};
