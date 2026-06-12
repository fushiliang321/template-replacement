import ReplaceInterface from '../replace/interface'
import Replace from '../replace/general'
import core from '../core/general'
import ReplaceCommon from '../worker/common/index'
import { getWasmArrayBuffer } from '../core/wasm/general'

export default async (): Promise<ReplaceInterface> => {
  const wasmArrayBuffer = await getWasmArrayBuffer()
  return ReplaceCommon(wasmArrayBuffer, Replace, core)
}
