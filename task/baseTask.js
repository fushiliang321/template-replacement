import { generateId } from "../helper/index.js"
import tempDataClass from "../replace/tempData.js"

export default class baseTask {
    id
    items
    tempData

    constructor(items,tempData,events) {
        if (!items) {
            throw new Error("缺少模板文件或模板链接数据")
        }
        
        switch(items.constructor){
            case Array:
                this.items = items
                break;
            case String:
                this.items =  [items]
                break;
            default:
                throw new Error("模板文件或模板链接数据类型错误")
        }
        
        if (tempData) {
            switch(tempData.constructor) {
                case Object:
                    if (Object.keys(tempData).length){
                        this.tempData = new tempDataClass(tempData)
                    }
                    break;
                case tempDataClass:
                    this.tempData = tempData
                    break;
            }
        }

        this.id = generateId()

        if (events) {
            events.onPlayed && (this.onPlayed = events.onPlayed)
            events.onDownloading && (this.onDownloading = events.onDownloading)
            events.onRunning && (this.onRunning = events.onRunning)
            events.onFinish && (this.onFinish = events.onFinish)
            events.onFinishAll && (this.onFinishAll = events.onFinishAll)
            events.onError && (this.onError = events.onError)
        }
    }

    //获取各个事件的监听状态
    getEventsMonitorStatus() {
        return {
            'onPlayed': !!this.onPlayed,
            'onDownloading': !!this.onDownloading,
            'onRunning': !!this.onRunning,
            'onFinish': !!this.onFinish,
            'onFinishAll': !!this.onFinishAll,
            'onError': !!this.onError,
        }
    }

    async getData() {
        return {
            taskId:this.id,
            urls:this.items,
            tempData:JSON.parse(JSON.stringify(this.tempData)),
            eventsMonitorStatus:this.getEventsMonitorStatus()
        }
    }

    async getTargetOrigin() {
        return undefined
    }

    onPlayed(progress) {}
    onDownloading(progress) {}
    onRunning(progress){}
    onFinish(progress){}
    onFinishAll(progress){}
    onError(progress){}
}