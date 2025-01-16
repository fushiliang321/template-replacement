import webworker from "../child/general.ts?worker&inline"
import base from ".."

export default class extends base {
    constructor(concurrency?: number) {
        super(webworker, concurrency)
    }
}
