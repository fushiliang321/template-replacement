import ReplaceInterface from '../replace/interface'
import replace from '../replace/general'
import wasmUrl from 'template-replacement-core-wasm/template_replacement_core_wasm_bg.wasm?url'

export default (): ReplaceInterface => {
  return new replace(wasmUrl)
}
