import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //절대경로 설정 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
