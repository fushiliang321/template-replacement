import { generateId } from "../helper/index.js"
import tempDataClass from "../replace/tempData.js"
import image from '../replace/image'

export default class baseTask {
    id
    items
    tempData
    valueFileBuffers=null

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

    //获取变量值里面的Buffer数据
    getValueBuffers() {
        if (this.valueFileBuffers === null && Object.keys(this.tempData.textData).length) {
            this.valueFileBuffers = []
            for (const key in this.tempData.textData) {
                if (this.tempData.textData[key] instanceof image && this.tempData.textData[key].fileArrayBufferData) {
                    this.valueFileBuffers.push(this.tempData.textData[key].fileArrayBufferData)
                }
            }
        }
        return this.valueFileBuffers
    }

    async getData() {
        return {
            taskId:this.id,
            urls:this.items,
            tempData:this.tempData,
            eventsMonitorStatus:this.getEventsMonitorStatus()
        }
    }

    async getTargetOrigin() {
        const buffers = []
        const valueFileBuffers = this.getValueBuffers()
        if (valueFileBuffers && valueFileBuffers.length) {
            for (const fileBuffer of valueFileBuffers) {
              buffers.push(fileBuffer)
            }
        }
        if(!buffers.length) {
            return undefined
        }
        return buffers
    }

    onPlayed(progress) {}
    onDownloading(progress) {}
    onRunning(progress){}
    onFinish(progress){}
    onFinishAll(progress){}
    onError(progress){}
}