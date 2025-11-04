import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 4173, // or any port you want
    host: true, // allow external access
    allowedHosts: ['employee-frontend-0ebl.onrender.com']
  }
})
