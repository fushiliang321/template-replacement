import ReplaceInterface from '../../replace/interface'
import WorkerReplace from '../../worker/main'
import replace from '../../worker/main/polyfill/general'
import { getWasmFile } from '../../core/wasm/polyfill/general'
import { WorkerGeneralOptions } from '../../../types/options'

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
