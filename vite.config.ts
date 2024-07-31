import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'worker/dist', 
    lib: {
      entry: './worker/workerDispatch.ts', 
      name: 'template-replacement', 
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        format: 'es',
      },
    },
  },
  worker: {
    format: 'es',
  }
})