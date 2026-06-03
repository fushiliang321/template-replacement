import ReplaceInterface from '../replace/interface'
import WorkerReplace from '../worker/main'
import { options } from '../index'

export default async (options: options): Promise<ReplaceInterface> => {
  const { default: replace } = await (options.polyfill ? import('../dist/worker/main/signPolyfill') : import('../dist/worker/main/sign'))
  return new WorkerReplace(new replace(options.concurrency))
}
