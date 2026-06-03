import { options } from '../index'
import ReplaceInterface from '../replace/interface'
import WorkerReplace from '../worker/main'
// import replace from '../dist/worker/main/general'

export default async (options: options): Promise<ReplaceInterface> => {
  const { default: replace } = await (options.polyfill ? import('../dist/worker/main/generalPolyfill') : import('../dist/worker/main/general'))
  return new WorkerReplace(new replace(options.concurrency))
}
