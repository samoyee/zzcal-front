import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import locale from './plugins/locale';

export default defineConfig({
  plugins: [react(), dynamicImport(), locale()],
  css: {
    preprocessorOptions: {
      less: {
        math: 'parens-division'
      },
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://121.196.216.228:8090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ]
  }
})
