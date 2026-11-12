import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // مسار نسبي ليعمل على GitHub Pages وعلى أي استضافة مباشرة
})
