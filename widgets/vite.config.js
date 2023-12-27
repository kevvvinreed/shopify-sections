import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const conf = {
    plugins: [react()],
    server: {
      port: 3001,
    },
    preview: {
      port: 3001,
    },
    build: {
      rollupOptions: {
        input: {
          app: "./src/index.tsx",
        },
      },
    },
  };
  if (command === "serve") {
    return {
      ...conf,
      build: { rollupOptions: { input: { app: "./src/index.html" } } },
    };
  } else {
    return conf;
  }
});
