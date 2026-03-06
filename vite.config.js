import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'ngrok-skip-warning',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader('ngrok-skip-browser-warning', 'true')
          next()
        })
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    strictPort: false,
    // DEAKTIVIERE Host-Validierung komplett für Tunnels
    proxy: {},
    hmr: {
      clientPort: 443
    }
  },
  // Deaktiviere Host-Check über Preview-Optionen
  preview: {
    host: '0.0.0.0',
    strictPort: false
  }
})
