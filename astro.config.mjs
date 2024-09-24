// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      sourcemap: process.env.NODE_ENV === "development", // Enable source maps only in development
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
