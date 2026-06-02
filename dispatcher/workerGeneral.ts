import ReplaceInterface from '../replace/interface'
import WorkerReplace from '../worker/main'
import replace from '../dist/worker/main/general'

export default (concurrency?: number): ReplaceInterface => new WorkerReplace(new replace(concurrency))
