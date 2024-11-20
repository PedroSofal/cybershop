import { defineConfig } from 'vite'
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react'
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@banners': path.resolve(__dirname, 'src/components/ui/banners'),
      '@buttons': path.resolve(__dirname, 'src/components/ui/buttons'),
      '@forms': path.resolve(__dirname, 'src/components/ui/forms'),
      '@inputs': path.resolve(__dirname, 'src/components/ui/inputs'),
      '@containers': path.resolve(__dirname, 'src/components/ui/containers'),
      '@menus': path.resolve(__dirname, 'src/components/ui/menus'),
      '@suspended': path.resolve(__dirname, 'src/components/ui/suspended'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@authentication': path.resolve(__dirname, 'src/features/authentication'),
      '@checkout': path.resolve(__dirname, 'src/features/checkout'),
      '@shopping-cart': path.resolve(__dirname, 'src/features/shopping-cart'),
      '@user-profile': path.resolve(__dirname, 'src/features/user-profile'),
      '@search': path.resolve(__dirname, 'src/features/search'),
      '@showcase': path.resolve(__dirname, 'src/features/showcase'),
      '@error-handling': path.resolve(__dirname, 'src/features/error-handling'),
    },
  },
  server: {
    host: true
  }
});