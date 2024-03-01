import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      black: "#2B2B2B",
      grey75: "#5F5F5F",
      grey50: "#929292",
      lightGrey: "#CBCBCB",
      white: "#F9F9F9",
      orange: "#FE531D",
    },
    extend: {
      fontFamily: {
        neue: "var(--font-neue-haas)",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
