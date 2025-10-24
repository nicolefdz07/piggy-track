import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
    colors: {
      primary: "#13a4ec",
      "background-light": "#f6f7f8",
      "background-dark": "#101c22",
    },
    borderRadius: { DEFAULT: "0.5rem", lg: "1rem", xl: "1.5rem", full: "9999px" },
  },
  plugins: [],
});
