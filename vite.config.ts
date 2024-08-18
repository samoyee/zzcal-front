import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import locale from './plugins/locale';
import countries from './plugins/countries';
import pxToRem from 'postcss-pxtorem';

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
    postcss: {
      plugins: [
        pxToRem({
          rootValue: 75,
          unitPrecision: 5, // （数字）允许 REM 单位增长到的十进制数字
          propList: ['*'], // 可以从 px 更改为 rem 的属性 使用通配符*启用所有属性
          selectorBlackList: [],// （数组）要忽略并保留为 px 的选择器。
          replace: true, // 替换包含 rems 的规则，而不是添加回退。
          mediaQuery: false,  // 允许在媒体查询中转换 px
          minPixelValue: 0, // 最小的转化单位
          exclude(file) {
            return file.includes('pc');
          },
        })
      ]
    }
  },
  base: '/zzcal',
  server: {
    proxy: {
      '/api': {
        target: 'https://www.zzcal.com/api',
        changeOrigin: true,
        rewrite(path) {
          return path.replace('/api', '/');
        }
      },
    }
  },
  resolve: {
    alias: [
      { find: 'antd-mobile', replacement: 'antd-mobile/2x' },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ]
  }
})
