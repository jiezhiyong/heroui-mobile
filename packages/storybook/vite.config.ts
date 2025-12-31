import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(dirname(fileURLToPath(import.meta.url)), "."),
    },
  },
  optimizeDeps: {
    include: ["@storybook/theming", "@mdx-js/react"],
  },
});
