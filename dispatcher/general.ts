import ReplaceInterface from '../replace/interface'
import replace from '../replace/general'

export default (): ReplaceInterface => {
  const wasmUrl = new URL('template-replacement-core-wasm/template_replacement_core_wasm_bg.wasm', import.meta.url).href
  return new replace(wasmUrl)
}