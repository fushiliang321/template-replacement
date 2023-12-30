export default {
    build: {
      outDir: 'dist', 
      lib: {
        entry: 'index.js', 
        name: 'template-replacement', 
        formats: ['es', 'umd'],
      },
    },
  };