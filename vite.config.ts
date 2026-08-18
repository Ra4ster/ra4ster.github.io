import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split framer-motion into its own chunk
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Split tsparticles into its own chunk
            if (id.includes('tsparticles')) {
              return 'tsparticles';
            }
            // Group all other dependencies into a generic vendor chunk
            return 'vendor';
          }
        }
      }
    }
  }
})