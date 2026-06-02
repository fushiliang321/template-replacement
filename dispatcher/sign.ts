import ReplaceInterface from '../replace/interface'
import replace from '../replace/sign'

export default (): ReplaceInterface => {
  const wasmUrl = new URL('template-replacement-sign-core-wasm/template_replacement_sign_core_wasm_bg.wasm', import.meta.url).href
  return new replace(wasmUrl)
}