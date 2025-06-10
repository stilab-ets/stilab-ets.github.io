import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths()
  ],
  server: {
    port: 5173
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.js'],
  }
})
