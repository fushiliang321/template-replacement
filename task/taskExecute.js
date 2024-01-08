import axios from "axios"
import progress, { status } from "./progress.js";
import db from "../db/index.js";
import unknownFile from "../office/unknownFile.js";
import word from "../office/word.js";
import excel from "../office/excel.js";
import { fileTypeByName, fileTypes, filesReaderArrayBuffer } from "../helper/index.js";

export default class replace {
    eventsMonitorStatus = {}
    taskId
    key
    fileBuffer
    tempData

    constructor(taskId, key, fileBuffer, tempData, eventsMonitorStatus) {
        this.taskId = taskId
        this.key = key
        this.fileBuffer = fileBuffer
        this.tempData = tempData
        this.eventsMonitorStatus = eventsMonitorStatus
    }

    postProgress(status, progressValue) {
        this.postMessage(new progress(this.taskId, this.key, status, progressValue))
    }

    postMessage(data) {
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

    async execute() {
        this.postProgress()
        try {
            this.postProgress(status.downloading)
            const fileBlob = this.fileBuffer ? new Blob([this.fileBuffer]) : await this.getFileBlob()
            if (!fileBlob) {
                const p = new progress(status.error)
                p.setError('没有可用的文件数据')
                this.postMessage(p)
                return
            }
            this.postProgress(status.downloading, 100)

            this.postProgress(status.running)
            let office;
            switch (fileTypeByName(this.key)) {
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
            let buffer = null
            if (textRes || imageRes) {
                buffer = await office.generateArrayBuffer()
            } else {
                const buffers = await filesReaderArrayBuffer([fileBlob])
                buffer = buffers[0]?.buffer
            }
            this.postProgress(status.running, 100)
            const p = new progress(this.taskId, this.key, status.finish)
            if (!buffer) {
                this.postMessage(p)
                return p
            }
            p.setData(buffer)
            this.postMessage(p)
            return p
        } catch (e) {
            console.error(e)
            const p = new progress(status.error)
            p.setError(e.message)
            this.postMessage(p)
            return p
        }
    }

    async getFileBlob() {
        const data = await db.getDataByKey(this.key)
        if (data && data.data) {
            return data.data
        }
        const getData = await this.get()
        if (!getData) {
            return null
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
            onDownloadProgress: progressEvent => {
                const progressVal = (progressEvent.progress * 100).toFixed(2)
                const p = new progress(this.taskId, this.key, status.downloading, progressVal)
                p.setData({
                    bytes: progressEvent.bytes,
                    estimated: progressEvent.estimated,
                    loaded: progressEvent.loaded,
                    progress: progressEvent.progress,
                    rate: progressEvent.rate,
                    total: progressEvent.total,
                })
                this.postMessage(p)
            }
        })
        return response.data
    }
}

