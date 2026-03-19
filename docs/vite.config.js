import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/sensores_jose/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
})