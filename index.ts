import general from './dist/replace/general'
import sign from './dist/replace/sign'
import WorkerDispatcher from './dist/main/general'
import WorkerSignDispatcher from './dist/main/sign'
import ReplaceInterface from './replace/interface'
import WorkerReplace from './worker/main/index'

export function General(): ReplaceInterface {
  return new general()
}

export function Sign(): ReplaceInterface {
  return new sign()
}

export function WorkerGeneral(concurrency?: number): ReplaceInterface {
  return new WorkerReplace(new WorkerDispatcher(concurrency))
}
export function workerSign(concurrency?: number): ReplaceInterface {
  return new WorkerReplace(new WorkerSignDispatcher(concurrency))
}