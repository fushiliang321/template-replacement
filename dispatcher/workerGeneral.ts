import ReplaceInterface from '../replace/interface'
import WorkerReplace from '../worker/main'
// import replace from '../dist/worker/main/general'

export default async (concurrency?: number, polyfill: boolean = false): Promise<ReplaceInterface> => {
  const { default: replace } = await (polyfill ? import('../dist/worker/main/generalPolyfill') : import('../dist/worker/main/general'))
  return new WorkerReplace(new replace(concurrency))
}
