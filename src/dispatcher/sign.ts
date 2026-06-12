import ReplaceInterface from '../replace/interface'
import { SignOptions } from '../../types/options'
import Replace from '../replace/sign'
import core from '../core/sign'
import ReplaceCommon from '../worker/common/index'
import { getWasmArrayBuffer } from '../core/wasm/sign'

export default async (options: SignOptions): Promise<ReplaceInterface> => {
  if (!options.sign) {
    throw new Error('sign 字段为必填项')
  }
  const wasmArrayBuffer = await getWasmArrayBuffer()
  return ReplaceCommon(wasmArrayBuffer, Replace, core, options.sign)
}
