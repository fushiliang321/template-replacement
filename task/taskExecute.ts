import axios, { AxiosProgressEvent } from "axios"
import progress, { status } from "./progress";
import db from "../db/index";
import unknownFile from "../office/unknownFile";
import word from "../office/word";
import excel from "../office/excel";
import { fileType, fileTypeByName, fileTypes } from "../helper/index";
import tempDataClass from "../replace/tempData"
import { eventsMonitorStatus } from "./baseTask";

export default class replace {
    taskId: string
    key: string
    fileBlob?: Blob|File
    tempData: tempDataClass
    eventsMonitorStatus?: eventsMonitorStatus

    constructor(taskId: string, key: string, file: Blob|BlobPart|undefined, tempData: tempDataClass, eventsMonitorStatus: eventsMonitorStatus) {
        this.taskId = taskId
        this.key = key
        
        if (file) {
            if(file instanceof Blob) {
                this.fileBlob = file
            }else {
                this.fileBlob = new Blob([file])
            }
        }

        this.tempData = tempData
        this.eventsMonitorStatus = eventsMonitorStatus
    }

    postProgress(status: status, progressValue: number = 0): progress {
        const p = new progress(this.taskId, this.key, status, progressValue)
        this.postMessage(p)
        return p
    }

    postError(error: any): progress {
        const p = new progress(this.taskId, this.key, status.error)
        p.setError(error)
        this.postMessage(p)
        return p
    }

    postFinish(data?: any): progress {
        const p = new progress(this.taskId, this.key, status.finish)
        data !== undefined && p.setData(data)
        this.postMessage(p)
        return p
    }

    postMessage(data: progress): void {
        if (!this.eventsMonitorStatus) {
            return
        }
        switch (data.status) {
            case status.unplayed:
                if (!this.eventsMonitorStatus.onPlayed) {
                    return
                }
                break;
            case status.downloading:
                if (!this.eventsMonitorStatus.onDownloading) {
                    return
                }
                break;
            case status.running:
                if (!this.eventsMonitorStatus.onRunning) {
                    return
                }
                break;
            case status.finish:
                if (!this.eventsMonitorStatus.onFinish) {
                    return
                }
                break;
            case status.finishAll:
                if (!this.eventsMonitorStatus.onFinishAll) {
                    return
                }
                break;
            case status.error:
                if (!this.eventsMonitorStatus.onError) {
                    return
                }
                break;
            default:
                return
        }
        postMessage(data)
    }

    async execute(): Promise<progress> {
        try {
            this.postProgress(status.downloading)
            let fileBlob = this.fileBlob
            if (!fileBlob) {
                fileBlob = await this.getFileBlob()
            }
            if (!fileBlob) {
                return this.postError('没有可用的文件数据')
            }
            this.postProgress(status.downloading, 100)

            this.postProgress(status.running)
            let fileTypeName
            if (this.fileBlob instanceof File) {
                fileTypeName = fileType(this.fileBlob)
            }
            if (!fileTypeName || fileTypeName === fileTypes.unknown) {
                fileTypeName = fileTypeByName(this.key)
            }
            
            let office
            switch (fileTypeName) {
                case fileTypes.word:
                    office = new word(fileBlob)
                    break;
                case fileTypes.excel:
                    office = new excel(fileBlob)
                    break;
                default:
                    office = new unknownFile(fileBlob)
                    break;
            }
            const textRes = await office.replaceText(this.tempData.textData)
            const imageRes = await office.replaceImages(this.tempData.mediaData)
            
            if (textRes || imageRes) {
                fileBlob = await office.generateBlob()
            }

            this.postProgress(status.running, 100)
            if (!fileBlob) {
                return this.postFinish()
            }
            return this.postFinish(fileBlob)
        } catch (e) {
            console.error(e)
            return this.postError((e as any)?.message ?? e)
        }
    }

    async getFileBlob(): Promise<Blob|undefined> {
        const data = await db.getDataByKey(this.key)
        if (data && data.data) {
            return data.data
        }
        const getData = await this.get()
        if (!getData) {
            return undefined
        }
        db.putData({
            url: this.key,
            data: getData,
        })
        return getData
    }

    async get() {
        const response = await axios({
            url: this.key,
            method: 'get',
            responseType: 'blob',
            onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
                const progressVal = ((progressEvent.progress ?? 0) * 100).toFixed(2)
                const p = new progress(this.taskId, this.key, status.downloading, Number(progressVal))
                p.setData(progressEvent)
                this.postMessage(p)
            }
        })
        return response.data
    }
}

