import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// use port 3000
// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
    port: 3000,
  },
  plugins: [react()],
});
