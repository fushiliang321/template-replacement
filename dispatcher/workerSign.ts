import ReplaceInterface from '../replace/interface'
import WorkerReplace from '../worker/main'

export default async (concurrency?: number, polyfill: boolean = false): Promise<ReplaceInterface> => {
  const { default: replace } = await (polyfill ? import('../dist/worker/main/signPolyfill') : import('../dist/worker/main/sign'))
  const res = new replace(concurrency)
  return new WorkerReplace(res)
}
