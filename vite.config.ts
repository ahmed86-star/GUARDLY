import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tempo from "vite-plugin-react-tempo";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tempo()],
})
