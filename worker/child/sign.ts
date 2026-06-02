import Replace from '../../replace/sign'
import init from './base'
const initWasm = async () => {
  const wasmUrl = new URL('template-replacement-sign-core-wasm/template_replacement_sign_core_wasm_bg.wasm', import.meta.url).href
  const response = await fetch(wasmUrl)
  const wasmBuffer = await response.arrayBuffer()
  init(new Replace(wasmBuffer))
}

initWasm()
