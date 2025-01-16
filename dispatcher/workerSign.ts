import ReplaceInterface from '../replace/interface'
import WorkerReplace from '../worker/main'
import replace from '../dist/main/sign'

export default (concurrency?: number): ReplaceInterface => {
    return new WorkerReplace(new replace(concurrency))
}
