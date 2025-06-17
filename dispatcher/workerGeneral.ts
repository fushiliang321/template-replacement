import ReplaceInterface from '../replace/interface'
import WorkerReplace from '../worker/main'
// import replace from '../worker/main/general'
import replace from '../dist/main/general'

export default (concurrency?: number): ReplaceInterface => {
    return new WorkerReplace(new replace(concurrency))
}
