import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import locale from './plugins/locale';
import countries from './plugins/countries';

export default defineConfig({
  plugins: [
    react(),
    dynamicImport(),
    locale(),
    countries()
  ],
  css: {
    preprocessorOptions: {
      less: {
        math: 'parens-division'
      },
    },
  },
  base: '/zzcal/',
  server: {
    proxy: {
      '/calculate': {
        target: 'http://121.196.216.228:8090',
        changeOrigin: true,
      },
      '/userInfo': {
        target: 'http://121.196.216.228:8090',
        changeOrigin: true,
      },
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ]
  }
})
