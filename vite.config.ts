import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  return {
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      ...(isDev && {
        https: {
          key: fs.readFileSync('./mkcert/localhost+1-key.pem'),
          cert: fs.readFileSync('./mkcert/localhost+1.pem'),
        },
        proxy: {
          '/api': {
            target: 'http://trinity.dobby.kr',
            changeOrigin: true,
            secure: false,
          }
        }
      })
    }
  }
});