import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps asset paths relative, so the build works on GitHub Pages
// under any repository name (https://<user>.github.io/<repo>/).
export default defineConfig({
  plugins: [react()],
  base: "./",
});
