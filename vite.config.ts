import { defineConfig } from "vite";

export default defineConfig(({ command, isPreview }) => ({
  base: command === "build" || isPreview ? "/library-app/" : "/",
  server: {
    port: 9000,
    open: true,
  },
  build: {
    outDir: "dist",
  },
}));
