import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
      colors: {
        ink: {
          950: "#0b1220",
          900: "#0f1a2e",
          800: "#16264a",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;

