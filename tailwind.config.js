/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080c0b",
          900: "#0b1210",
          850: "#0e1614",
          800: "#121c19",
          700: "#1a2622",
          600: "#26352f",
        },
        mist: {
          400: "#8fa39c",
          300: "#aebdb7",
          200: "#cdd8d3",
        },
        moss: {
          300: "#7fe2b8",
          400: "#4fd4a3",
          500: "#2fbd8c",
          600: "#1f9c72",
          700: "#187a59",
        },
        gold: {
          300: "#f2cf8a",
          400: "#e8b95c",
          500: "#d6a03f",
        },
      },
      fontFamily: {
        display: ["\"Fraunces\"", "serif"],
        body: ["\"Manrope\"", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(79, 212, 163, 0.45)",
        card: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(79,212,163,0.55)" },
          "50%": { boxShadow: "0 0 0 12px rgba(79,212,163,0)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(14px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        floatIn: {
          "0%": { opacity: 0, transform: "scale(0.92) translateY(6px)" },
          "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease forwards",
        floatIn: "floatIn 0.22s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};
