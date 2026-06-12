function loadWasm() {
  return import('template-replacement-sign-core-wasm-polyfill/template_replacement_sign_core_wasm_polyfill_bg.wasm?file')
}

export async function getWasmArrayBuffer() {
  const { getWasmArrayBuffer } = await loadWasm()
  return await getWasmArrayBuffer()
}

export async function getWasmFile() {
  const { getWasmFile } = await loadWasm()
  return await getWasmFile()
}
