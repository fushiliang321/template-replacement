import ReplaceInterface from '../replace/interface'
import WorkerReplace from '../worker/main'
import { options } from '../index'

export default async (options: options): Promise<ReplaceInterface> => {
  const { default: replace } = await (options.polyfill ? import('../dist-legacy/worker/main/polyfill/general') : import('../dist/worker/main/general'))
  return new WorkerReplace(replace(options.concurrency))
}
