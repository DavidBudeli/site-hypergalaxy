import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        foreground: "#F8FAFC",
        border: "rgba(148, 163, 184, 0.16)",
        galaxy: {
          950: "#030712",
          900: "#050816",
          850: "#081120",
          cyan: "#22D3EE",
          cyanDeep: "#06B6D4",
          violet: "#7C3AED",
          violetSoft: "#8B5CF6",
          blue: "#3B82F6",
          blueDeep: "#2563EB",
          mint: "#34D399",
          amber: "#F59E0B"
        }
      },
      boxShadow: {
        glow: "0 0 45px rgba(34, 211, 238, 0.16), 0 0 90px rgba(124, 58, 237, 0.12)",
        "violet-glow": "0 0 38px rgba(124, 58, 237, 0.3)",
        "cyan-glow": "0 0 34px rgba(34, 211, 238, 0.26)"
      },
      backgroundImage: {
        "holo-grid":
          "linear-gradient(rgba(103,232,249,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.08) 1px, transparent 1px)",
        "galaxy-radial":
          "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.22), transparent 28%), radial-gradient(circle at 78% 18%, rgba(34,211,238,0.15), transparent 24%), radial-gradient(circle at 50% 80%, rgba(37,99,235,0.18), transparent 30%)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" }
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        }
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        orbit: "orbit 18s linear infinite",
        scan: "scan 5s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
