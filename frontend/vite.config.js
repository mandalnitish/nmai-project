import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-plugin-prerender'

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      routes: [
        '/',
        '/current-affairs',
        '/mcq-practice',
        '/daily-quiz',
        '/about-us',
        '/contact-us',
        '/privacy-policy',
        '/terms-of-service',
        '/disclaimer',
        '/faq'
      ]
    })
  ]
})