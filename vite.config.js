import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "components": path.resolve(__dirname, "./src/components"),
      "utils": path.resolve(__dirname, "./src/lib/utils"),
      "ui": path.resolve(__dirname, "./src/components/ui"),
      "lib": path.resolve(__dirname, "./src/lib"),
      "hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  optimizeDeps: {
    entries: [
      '!ignore/**'
    ]
  },
  plugins: [
    react(),
    tailwindcss()
  ],
});
