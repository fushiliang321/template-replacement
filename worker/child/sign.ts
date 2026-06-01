import Replace from '../../replace/sign'
import init from './base'
import wasmUrl from 'template-replacement-sign-core-wasm/template_replacement_sign_core_wasm_bg.wasm?url'
const initWasm = async () => {
  const response = await fetch(wasmUrl)
  const wasmBuffer = await response.arrayBuffer()
  init(new Replace(wasmBuffer))
}

initWasm()

