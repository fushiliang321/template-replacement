/// <reference types="vite/client" />

declare module '*?worker&inline' {
  const WorkerClass: { new(): Worker }
  export default WorkerClass
}
