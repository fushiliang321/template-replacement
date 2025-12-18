import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: './dist',
    lib: {
      entry: [
        './worker/main/sign.ts',
        './worker/main/general.ts',
        './replace/general.ts',
        './replace/sign.ts',
      ],
      name: 'template-replacement',
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: (info) => {
          const modules = info.facadeModuleId?.split('/')
          if (!modules?.length || modules?.length < 2) {
            return '[name].js'
          }
          return modules[modules?.length - 2] + '/[name].js'
        },
      },
    },
  },
  worker: {
    format: 'es',
  },
})
