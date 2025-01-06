import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import { tempo } from "tempo-devtools/dist/vite";

const conditionalPlugins = [];

// @ts-ignore
if (process.env.TEMPO) {
  conditionalPlugins.push('tempo-devtools/swc');
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    plugins: [["tempo-devtools/swc", {}]],
  }),
  tempo()
],
  resolve: {
    preserveSymlinks: true,
  }
})
