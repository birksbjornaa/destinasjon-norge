import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.tsx', 
    cache: {
      dir: './node_modules/.vitest',
    },
  },
})
