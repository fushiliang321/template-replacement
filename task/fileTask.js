import { filesReaderArrayBuffer } from "../helper/index.js"
import baseTask from "./baseTask.js"

export default class fileTask extends baseTask {
    fileBuffers = null

    async getFileBuffers() {
        if (this.fileBuffers === null) {
            this.fileBuffers = await filesReaderArrayBuffer(this.items)
        }
        return this.fileBuffers
    }

    async getData() {
        return {
            taskId: this.id,
            files: this.items,
            tempData: this.tempData,
            eventsMonitorStatus: this.getEventsMonitorStatus()
        }
    }

    async getTargetOrigin() {
        return undefined
    }

}