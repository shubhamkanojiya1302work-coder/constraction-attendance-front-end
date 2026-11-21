import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves the site from a subfolder named after the repo:
// https://<user>.github.io/constraction-attendance-front-end/
// so production builds need that as the base path. `yarn dev` stays at "/".
const PAGES_BASE = "/constraction-attendance-front-end/";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: command === "build" ? PAGES_BASE : "/",
    plugins: [react(), tailwindcss()],
    server: {
      port: Number(env.VITE_PORT) || 5173,
    },
  };
});
