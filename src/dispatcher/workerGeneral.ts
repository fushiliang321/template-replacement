import ReplaceInterface from '../replace/interface'
import WorkerReplace from '../worker/main'
import { WorkerGeneralOptions } from '../../types/options'
import replace from '../worker/main/general'
import { getWasmFile } from '../core/wasm/general'

export default async (options: WorkerGeneralOptions): Promise<ReplaceInterface> => {
  let wasmUrl = ""
  async function getWasmUrl() {
    if (wasmUrl) {
      return wasmUrl
    }
    const file = await getWasmFile()
    wasmUrl = URL.createObjectURL(file)
    return wasmUrl
  }

  return new WorkerReplace(replace(options.concurrency || 1), getWasmUrl())
}
