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
        background: "#020510",
        foreground: "#F8FAFC",
        border: "rgba(148, 163, 184, 0.12)",
        galaxy: {
          950: "#020510",
          900: "#040814",
          850: "#060b18",
          cyan: "#22D3EE",
          cyanDeep: "#06B6D4",
          violet: "#7C3AED",
          violetSoft: "#8B5CF6",
          violetLight: "#A78BFA",
          indigo: "#6366F1",
          blue: "#3B82F6",
          blueDeep: "#2563EB",
          mint: "#34D399",
          amber: "#F59E0B"
        }
      },
      boxShadow: {
        glow: "0 0 20px rgba(109, 40, 217, 0.08), 0 0 40px rgba(99, 102, 241, 0.05)",
        "violet-glow": "0 0 14px rgba(124, 58, 237, 0.14)",
        "cyan-glow": "0 0 10px rgba(34, 211, 238, 0.07)"
      },
      backgroundImage: {
        "holo-grid":
          "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
        "galaxy-radial":
          "radial-gradient(circle at 20% 20%, rgba(109,40,217,0.16), transparent 28%), radial-gradient(circle at 78% 18%, rgba(99,102,241,0.10), transparent 24%), radial-gradient(circle at 50% 80%, rgba(79,70,229,0.12), transparent 30%)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.03)" }
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
        marquee: "marquee 32s linear infinite",
        "pulse-glow": "pulseGlow 5s ease-in-out infinite",
        orbit: "orbit 22s linear infinite",
        scan: "scan 6s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
