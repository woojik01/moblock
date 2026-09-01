import { defineConfig } from 'vite';

export default defineConfig({
  base: '/moblock/',
  build: {
    target: 'es2022',
    sourcemap: true
  }
});
