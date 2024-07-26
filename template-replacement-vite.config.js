export default {
  build: {
    outDir: 'dist', 
    lib: {
      entry: 'index.js', 
      name: 'template-replacement', 
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].[format].js',
        chunkFileNames: '[name].[format].js',
        format: 'es',
      },
    },
  },
}