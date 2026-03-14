import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,js,tsx,ts}',
    }),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth', 'firebase/firestore']
  },
  rollupOptions: {
    external: ['tslib']
  }
})
