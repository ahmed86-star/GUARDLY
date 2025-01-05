import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tempoVitePlugin as tempo } from "tempo-devtools"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tempo()],
  resolve: {
    preserveSymlinks: true,
  }
})
