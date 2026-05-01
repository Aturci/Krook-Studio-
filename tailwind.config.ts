import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Updated palette — values changed, tokens kept for compatibility
        void: "#1A1A1A",       // Charred Black
        bone: "#F4F1EB",       // Bone White
        rust: "#B15341",       // Terracotta
        gold: "#D2BFA3",       // Sandy Clay
        ash: "#4B5E63",        // Petrol
        // Semantic aliases (new names)
        charred: "#1A1A1A",
        boneWhite: "#F4F1EB",
        sandy: "#D2BFA3",
        petrol: "#4B5E63",
        terracotta: "#B15341",
      },
      fontFamily: {
        display: ["var(--font-barrio)", "serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
