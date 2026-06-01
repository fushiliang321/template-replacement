import ReplaceInterface from '../replace/interface'
import replace from '../replace/sign'
import wasmUrl from 'template-replacement-sign-core-wasm/template_replacement_sign_core_wasm_bg.wasm?url'

export default (): ReplaceInterface => {
  return new replace(wasmUrl)
}
