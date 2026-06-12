/// <reference types="vite/client" />

declare module '*?worker&inline' {
  const WorkerClass: { new(): Worker }
  export default WorkerClass
}

declare module '*.wasm?file' {
  function getWasmArrayBuffer(): Promise<ArrayBuffer>
  function getWasmFile(): Promise<File>
  function getWasmUint8Array(): Promise<Uint8Array>

  export {
    getWasmArrayBuffer,
    getWasmFile,
    getWasmUint8Array
  };
  export default getWasmFile
}
