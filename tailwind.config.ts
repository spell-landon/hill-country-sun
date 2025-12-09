import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // Ensure custom font sizes are generated
    'text-display-lg',
    'text-display-md',
    'text-display-sm',
    'text-heading-lg',
    'text-heading-md',
    'text-heading-sm',
    'text-body-lg',
    'text-body-md',
    'text-body-sm',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A3A",
          50: "#E8F0F0",
          100: "#D1E1E1",
          200: "#A3C3C3",
          300: "#75A5A5",
          400: "#4A7A7A",
          500: "#1E3A3A",
          600: "#1A3333",
          700: "#152929",
          800: "#111F1F",
          900: "#0C1515",
        },
        secondary: {
          DEFAULT: "#D4A574",
          50: "#FCF8F4",
          100: "#F7EDE2",
          200: "#EDDBC5",
          300: "#E3C9A8",
          400: "#D9B78B",
          500: "#D4A574",
          600: "#C48A4F",
          700: "#A06D3A",
          800: "#78522C",
          900: "#50371D",
        },
        accent: {
          DEFAULT: "#8B4513",
          light: "#A0522D",
          dark: "#6B3410",
        },
        background: "#FEFDFB",
        surface: "#F5F3EF",
        text: {
          DEFAULT: "#2D2D2D",
          muted: "#6B6B6B",
          light: "#9B9B9B",
        },
      },
      fontFamily: {
        serif: ["Merriweather", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-lg": ["1.875rem", { lineHeight: "1.3" }],
        "heading-md": ["1.5rem", { lineHeight: "1.4" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
