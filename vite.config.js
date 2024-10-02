import { defineConfig } from 'vite'


import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', 
    base: '/Frontend-Backend-CapStone/',
// Ensure this matches your deployment configuration
  },
});