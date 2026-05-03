import { defineConfig } from 'vite';

export default defineConfig({
  base: '/speckit/',   // <-- indispensable pour GitHub Pages
  root: 'src',
  build: {
    outDir: '../dist'
  },
  server: {
    port: 5173,
    mimeTypes: {
      'application/wasm': ['wasm']
    }
  }
});
