import webworker from "./worker.ts?worker&inline"

export default class worker {
    num: number
    counter: number = 0
    workers: Worker[] = []
    listenerList: ((event: MessageEvent)=>void)[] = []

    constructor(num?: number) {
        this.num = Number(num)
        if (!this.num || this.num < 1) {
            try {
                this.num = navigator.hardwareConcurrency
            } catch (error) {
            }
        }
        if (!this.num || this.num < 1) {
            this.num = 1
        }
        for (let index = 0; index < this.num; index++) {
            this._addOneWorker()
        }
    }

    _addOneWorker() {
        const worker: Worker = new webworker()
        worker.onmessage = (event: MessageEvent) => {
            for (const fun of this.listenerList) {
                fun(event)
            }
        }
        this.workers.push(worker)
    }

    postMessage(message: any, options?: StructuredSerializeOptions) {
        if (!this.workers[++this.counter]) {
            this.counter = 0
        }
        this.workers[this.counter].postMessage(message, options)
    }

    addListener(fun: (event: MessageEvent) => void) {
        this.listenerList.push(fun)
    }

    removeListener(fun: (event: MessageEvent) => void) {
        for (const i in this.listenerList) {
            if (this.listenerList[i] == fun) {
                this.listenerList.splice((i as unknown) as number, 1)
                return
            }
        }
    }
}