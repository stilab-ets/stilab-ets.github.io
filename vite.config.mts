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
    include: ['src/test/**/*.spec.ts', 'src/test/**/*.spec.js'],
    coverage: {
      include: ['src/components/**/*.{ts,js,vue}'],
      exclude: ['**/index.ts'],
      reporter: ['text', 'lcov'],
      all: true
    }
  }
})
