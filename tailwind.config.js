/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Peak & Palm design tokens (Phase 1). Added alongside the existing
        // ink/mist/moss/gold scales so pages not yet migrated keep their look.
        pp: {
          deep: "#061E24", // primary background
          teal: "#0B3036", // secondary background
          glass: "#123F48", // glass panels (use with opacity)
          accent: "#2DE2C5", // primary accent
          aqua: "#55F0D7", // hover accent
          text: "#F5F7F6", // main text
          muted: "#B7C8C9", // secondary text
          sand: "#E7C98B", // warm accent
        },
        // Legacy scale names, now mapped onto the Peak & Palm palette so every
        // existing component picks up the new design without class rewrites.
        ink: {
          950: "#061E24", // primary background
          900: "#08262C",
          850: "#0B3036", // secondary background
          800: "#0E373E",
          700: "#123F48", // glass blue-teal
          600: "#1B4F59",
        },
        mist: {
          100: "#F5F7F6", // main text
          200: "#E4ECEB",
          300: "#B7C8C9", // secondary text
          400: "#8DA5A7",
        },
        moss: {
          300: "#8AF3E2",
          400: "#55F0D7", // hover accent
          500: "#2DE2C5", // primary accent
          600: "#1FC2A8",
          700: "#16917E",
        },
        gold: {
          300: "#F0DDB2",
          400: "#E7C98B", // warm sand accent
          500: "#D2AF6B",
        },
      },
      fontFamily: {
        display: ["\"Playfair Display\"", "Georgia", "serif"],
        body: ["\"Inter\"", "system-ui", "sans-serif"],
        heading: ["\"Playfair Display\"", "Georgia", "serif"],
        ui: ["\"Inter\"", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(45, 226, 197, 0.35)",
        card: "0 20px 60px -20px rgba(0,0,0,0.6)",
        "pp-glass": "0 12px 40px -18px rgba(0,0,0,0.65)",
        "pp-active": "0 0 0 1px rgba(45,226,197,0.45), 0 8px 24px -12px rgba(45,226,197,0.55)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(45,226,197,0.45)" },
          "50%": { boxShadow: "0 0 0 12px rgba(45,226,197,0)" },
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
