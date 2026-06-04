import ReplaceInterface from '../replace/interface'
import WorkerReplace from '../worker/main'
import { options } from '../index'

export default async (options: options): Promise<ReplaceInterface> => {
  const { default: replace } = await (options.polyfill ? import('../dist/worker/main/polyfill/sign') : import('../dist/worker/main/sign'))
  const res = new WorkerReplace(replace(options.concurrency))
  res.sign = options.sign!
  return res
}
