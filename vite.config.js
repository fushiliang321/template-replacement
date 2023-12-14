export default {
    build: {
      outDir: 'dist', // 构建输出路径
      lib: {
        entry: 'index.js', // 入口文件路径
        name: 'template-replacement', // 包名称
        formats: ['es', 'umd'], // 输出的文件格式
      },
    },
  };