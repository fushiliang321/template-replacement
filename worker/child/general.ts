import Replace from '../../replace/general'
import init from './base'
import wasmUrl from 'template-replacement-core-wasm/template_replacement_core_wasm_bg.wasm?url'
const initWasm = async () => {
  const response = await fetch(wasmUrl)
  const wasmBuffer = await response.arrayBuffer()
  init(new Replace(wasmBuffer))
}

initWasm()
