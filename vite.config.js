import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with '/api' to your backend server
      '/api': {
        target: 'https://www.swiggy.com/dapi', // Replace with your backend server's URL and port
        changeOrigin: true, // This is crucial for CORS to work correctly
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: remove '/api' prefix from the request
      },
      // You can add more proxy rules for different backend endpoints if needed
      // '/another-api': {
      //   target: 'http://localhost:3001',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/another-api/, ''),
      // },
    },
  },
})
