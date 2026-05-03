import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  assetsInclude: ['**/*.wasm'],
  server: {
    port: 5173,
    mimeTypes: {
      'application/wasm': ['wasm']
    }
  }
});
