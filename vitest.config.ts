import path from 'path'
import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'src/**/types.ts'],
    coverage: {
      include: ['src/**/*'],
      exclude: [...(configDefaults.coverage.exclude || []), 'src/**/types.ts', 'src/**/type.ts'],
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
 
})