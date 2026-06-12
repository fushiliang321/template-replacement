import ReplaceInterface from '../replace/interface'
import WorkerReplace from '../worker/main'
import { WorkerSignOptions } from '../../types/options'
import replace from '../worker/main/sign'
import { getWasmFile } from '../core/wasm/sign'

export default async (options: WorkerSignOptions): Promise<ReplaceInterface> => {
  if (!options.sign) {
    throw new Error('sign 字段为必填项')
  }

  let wasmUrl = ""
  async function getWasmUrl() {
    if (wasmUrl) {
      return wasmUrl
    }
    const file = await getWasmFile()
    wasmUrl = URL.createObjectURL(file)
    return wasmUrl
  }

  return new WorkerReplace(replace(options.concurrency || 1), getWasmUrl(), options.sign)
}
