import path from 'path'
import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './test/vitest.setup.ts',
    environment: 'happy-dom',
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