import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths()
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
      ignored: ['**/node_modules/**']
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/test/**/*.spec.ts', 'src/test/**/*.spec.js'],
    coverage: {
      include: ['src/components/**/*.{ts,js,vue}'],
      exclude: ['**/index.ts'],
      reporter: ['text', 'lcov'],
      thresholds: {
        statements: 60,
        branches: 60,
        lines: 60,
      },
      all: true
    }
  }
})
