import react from "@vitejs/plugin-react"
import mkcert from 'vite-plugin-mkcert';
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});