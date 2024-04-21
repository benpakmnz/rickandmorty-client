import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.STORAGE_KEY": JSON.stringify(env.STORAGE_KEY),
      "process.env.BASE_URL": JSON.stringify(env.BASE_URL),
    },
    base: "http://benpakmnz.github.io/rickandmorty-client/",
    plugins: [react()],
  };
});
