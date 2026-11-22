import path from 'node:path';
import { defineConfig } from 'vite';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
process.env.BROWSER = 'google-chrome';

export default defineConfig(({ command }) => ({
  plugins: [
    vituum(),
    pug({
      root: './src',
    }),
  ],
  base: command === 'build' ? '/jingle-shop/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
    open: true,
  },
}));
