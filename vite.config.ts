import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(
      {
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Piggy Web Bank',
          short_name: 'PWB',
          description: 'A simple Piggy Web Bank',
          theme_color: '#282828',
          icons: [
            {
              src: '/icon.png',
              sizes: '1024x1024',
              type: 'image/png',
            }
          ],
        },
      }
    )
  ],
})
