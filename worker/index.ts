import { messageData } from "./type"
import DispatcherInterface from "./interface"

export type webworker = new () => Worker

export default class worker implements DispatcherInterface {
    #concurrency: number
    #counter: number = 0
    #workers: Worker[] = []
    #listenerList: ((event: MessageEvent)=>void)[] = []

    constructor(webworker: webworker, concurrency?: number) {
        this.#concurrency = Number(concurrency)
        if (!this.#concurrency || this.#concurrency < 1) {
            try {
                this.#concurrency = navigator.hardwareConcurrency < 8 ? navigator.hardwareConcurrency : 8
            } catch (error) {
            }
        }
        if (!this.#concurrency || this.#concurrency < 1) {
            this.#concurrency = 1
        }
        for (let index = 0; index < this.#concurrency; index++) {
            this.#addOneWorker(webworker)
        }
    }

    #addOneWorker(webworker: webworker) {
        const worker: Worker = new webworker()
        worker.onmessage = async (event: MessageEvent) => {
            const tasks: unknown[] = []
            for (const fun of this.#listenerList) {
                tasks.push(fun(event))
            }
            const res = await Promise.all(tasks)
            for (const reply of res) {
                if (reply) {
                    worker.postMessage(reply)
                }
            }
        }
        this.#workers.push(worker)
    }

    concurrency(): number {
        return this.#concurrency
    }

    postMessage(message: messageData, options?: StructuredSerializeOptions) {
        if (!this.#workers[++this.#counter]) {
            this.#counter = 0
        }
        this.#workers[this.#counter].postMessage(message, options)
    }

    addListener(fun: (event: MessageEvent) => void) {
        this.#listenerList.push(fun)
    }

    removeListener(fun: (event: MessageEvent) => void) {
        for (const i in this.#listenerList) {
            if (this.#listenerList[i] == fun) {
                this.#listenerList.splice((i as unknown) as number, 1)
                return
            }
        }
    }
}