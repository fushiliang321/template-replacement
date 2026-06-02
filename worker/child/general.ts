import Replace from '../../replace/general'
import init from './base'
const initWasm = async () => {
  const wasmUrl = new URL('template-replacement-core-wasm/template_replacement_core_wasm_bg.wasm', import.meta.url).href
  const response = await fetch(wasmUrl)
  const wasmBuffer = await response.arrayBuffer()
  init(new Replace(wasmBuffer))
}

export default initWasm()
