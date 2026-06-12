function loadWasm() {
  return import('template-replacement-sign-core-wasm/template_replacement_sign_core_wasm_bg.wasm?file')
}

export async function getWasmArrayBuffer() {
  const { getWasmArrayBuffer } = await loadWasm()
  return await getWasmArrayBuffer()
}

export async function getWasmFile() {
  const { getWasmFile } = await loadWasm()
  return await getWasmFile()
}
