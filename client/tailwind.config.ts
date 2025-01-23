import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-Poppins), sans-serif"], // Added fallback
        josefin: ["var(--font-Josefin), sans-serif"], // Added fallback
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
          sm: "400px",
          md: "800px",
          lg: "1000px",
          xl: "1200px",
          "2xl": "1500px",
          "1100px": "1100px", // Custom breakpoint (if needed)
          "1300px": "1300px", // Custom breakpoint (if needed)
          "1400px": "1400px", // Custom breakpoint (if needed)
        // "1000px": "1000px",
        // "1100px": "1100px",
        // "1200px": "1200px",
        // "1300px": "1300px",
        // "1400px": "1400px",
        // "1500px": "1500px",
        // "800px": "800px",
        // "400px": "400px",
      }
      
    },
  },
  plugins: [],
} satisfies Config;
