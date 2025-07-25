import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
        }
      }
    },
    minify: true,
    target: 'es2015',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    open: true,
  },
  preview: {
    port: 3000,
  },
});