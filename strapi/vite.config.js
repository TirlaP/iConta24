import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      // Fix date-fns import issues
      'date-fns/_lib/cloneObject': 'date-fns/_lib/cloneObject/index.js',
      'date-fns/format': 'date-fns/format/index.js',
    },
  },
  build: {
    // Increase chunk size limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: [
        // Externalize problematic dependencies
        'date-fns-tz',
      ],
    },
  },
  optimizeDeps: {
    include: [
      'date-fns',
    ],
    exclude: [
      'date-fns-tz',
    ],
  },
});