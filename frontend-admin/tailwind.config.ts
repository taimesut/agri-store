// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",
        danger: "#d32f2f",
      },
    },
  },
  plugins: [],
};

export default config;
