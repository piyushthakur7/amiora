import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      // now correctly points to client/src/assets
      "@assets": path.resolve(__dirname, "client/src/assets"),
    },
  },

  root: path.resolve(__dirname, "client"),

  build: {
    outDir: "../dist",
    emptyOutDir: true
  },

  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    },
    proxy: {
      "/api/wc": {
        target: "https://darkgray-rail-803191.hostingersite.com/wp-json/wc/v3",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wc/, ""),
      },
    }
  }
});
