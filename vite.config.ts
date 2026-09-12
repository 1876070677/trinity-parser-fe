import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const hasHttpsCert =
    fs.existsSync('./mkcert/localhost+1-key.pem') &&
    fs.existsSync('./mkcert/localhost+1.pem');
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
        ...(hasHttpsCert && {
          https: {
            key: fs.readFileSync('./mkcert/localhost+1-key.pem'),
            cert: fs.readFileSync('./mkcert/localhost+1.pem'),
          },
        }),
        proxy: {
          '/api': {
            target: 'https://trinity.dobby.kr',
            changeOrigin: true,
            secure: false,
          },
          '/uploads': {
            target: 'https://trinity.dobby.kr',
            changeOrigin: true,
            secure: false,
          }
        }
      })
    }
  }
});