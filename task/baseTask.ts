import { generateId } from "../helper/index"
import tempDataClass from "../replace/tempData"
import image from '../replace/image'
import progress from "./progress"
import urlTaskItem from "./urlTaskItem"

export interface events {
    onPlayed(progress: progress): void
    onDownloading(progress: progress): void
    onRunning(progress: progress): void
    onFinish(progress: progress): void 
    onFinishAll(progress: progress): void 
    onError(progress: progress): void
}

export type eventNames = 'onPlayed' | 'onDownloading' | 'onRunning'  | 'onFinish' | 'onFinishAll' | 'onError' 

export type eventsMonitorStatus = Record<eventNames, boolean> 

export type taskData = {
    taskId: string,
    urls?: urlTaskItem[],
    files?: Blob[],
    tempData?: tempDataClass,
    eventsMonitorStatus: eventsMonitorStatus
}

export default abstract class baseTask {
    id: string = generateId()
    tempData?: tempDataClass

    constructor(tempData: tempDataClass|Object, events: Partial<events>) {
        if (tempData) {
            switch (true) {
                case tempData instanceof tempDataClass:
                    this.tempData = tempData
                    break;
                case tempData instanceof Object:
                    if (tempData) {
                        if (tempData.hasOwnProperty('textData') || tempData.hasOwnProperty('mediaData')) {
                            this.tempData = new tempDataClass((tempData as any).textData, (tempData as any).mediaData)
                        }else if (Object.keys(tempData).length) {
                            this.tempData = new tempDataClass(tempData as Record<string, string|image>)
                        }
                    }
                    break;
            }
        }

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
    getEventsMonitorStatus(): eventsMonitorStatus {
        return {
            onPlayed: !!this.onPlayed,
            onDownloading: !!this.onDownloading,
            onRunning: !!this.onRunning,
            onFinish: !!this.onFinish,
            onFinishAll: !!this.onFinishAll,
            onError: !!this.onError,
        }
    }

    getData(): taskData {
        return {
            taskId: this.id,
            tempData: this.tempData,
            eventsMonitorStatus: this.getEventsMonitorStatus()
        }
    }

    async getTargetOrigin() {
        return undefined
    }

    onPlayed?: (progress: progress) => void
    onDownloading?: (progress: progress) => void
    onRunning?: (progress: progress) => void
    onFinish?: (progress: progress) => void
    onFinishAll?: (progress: progress) => void
    onError?: (progress: progress) => void
}