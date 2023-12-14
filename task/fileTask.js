import { filesReaderArrayBuffer } from "../helper/index.js";
import baseTask from "./baseTask.js";

export default class fileTask extends baseTask{
    fileBuffers = null

    async getFileBuffers() {
        if (this.fileBuffers === null) {
            this.fileBuffers = await filesReaderArrayBuffer(this.items)
        }
        return this.fileBuffers
    }

    async getData() {
        const fileBuffers = await this.getFileBuffers()
        return {
            taskId:this.id,
            fileBuffers:fileBuffers,
            tempData:JSON.parse(JSON.stringify(this.tempData)),
            eventsMonitorStatus:this.getEventsMonitorStatus()
        }
    }

    async getTargetOrigin() {
        const fileBuffers = await this.getFileBuffers()
        if (!fileBuffers || !fileBuffers.length) {
            return undefined
        }

        const buffers = []
        for (const fileBuffer of fileBuffers) {
          buffers.push(fileBuffer.buffer)
        }
        return buffers
    }

}