import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the build works both locally and under the GitHub Pages sub-path.
export default defineConfig({
  base: './',
  plugins: [react()],
})
