import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces (required for Docker)
    port: 3000,
    watch: {
      usePolling: true, // Required for Docker on Windows/Mac
    },
    hmr: {
      host: 'localhost', // Use localhost for HMR connections
      port: 3000,
    },
  },
});
