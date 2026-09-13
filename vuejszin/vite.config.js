import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],

  server: {
    proxy: {
      "/vrcel": {
        target: "https://cert-namo.onrender.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vrcel/, ""),
      },
    },
  },
});
