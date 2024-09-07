// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true
//       }
//     }
//   },
//   optimizeDeps: {
//     exclude: [
//       'chunk-UU4BA6RT.js',
//       'chunk-A6ZBQOM7.js'
//     ]
//   }
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     proxy: {
//       '/api': {
//         target: 'https://www.konnect.rw/',
//         changeOrigin: true
//       }
//     }
//   },
//   build: {
//     outDir: 'public' // Change the output directory to "public"
//   },
//   optimizeDeps: {
//     exclude: [
//       'chunk-UU4BA6RT.js',
//       'chunk-A6ZBQOM7.js'
//     ]
//   }
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://www.konnect.rw/',
        changeOrigin: true
      }
    }
  },
})

