import webworker from "./worker.js?worker&inline"

export default class worker{
    counter = 0
    workers = []
    listenerList = []

    constructor(num) {
        num = Number(num)
        if (!num || num < 1) {
            this.num = navigator.hardwareConcurrency
        }else{
            this.num = num
        }
        for (let index = 0; index < this.num; index++) {
            this._addOneWorker()
        }
    }

    _addOneWorker() {
        const worker =  new webworker()
        worker.onmessage = event => {
            for (const fun of this.listenerList) {
                fun(event)
            }
        }
        this.workers.push(worker)
    }

    postMessage(data,targetOrigin) {
        if (!this.workers[this.counter]) {
            this.counter = 0
        }
        this.workers[this.counter].postMessage(data,targetOrigin)
    }

    addListener(fun) {
        this.listenerList.push(fun)
    }

    removeListener(fun){
        for (const i in this.listenerList) {
            if (this.listenerList[i] == fun) {
                this.listenerList.splice(i,1)
                return
            }
        }
    }
}