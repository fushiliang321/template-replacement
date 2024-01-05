import { filesReaderArrayBuffer } from "../helper/index.js"
import baseTask from "./baseTask.js"

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
            tempData:this.tempData,
            eventsMonitorStatus:this.getEventsMonitorStatus()
        }
    }

    async getTargetOrigin() {
        const buffers = (await super.getTargetOrigin())??[]
        const fileBuffers = await this.getFileBuffers()
        if (fileBuffers && fileBuffers.length) {
            for (const fileBuffer of fileBuffers) {
              buffers.push(fileBuffer.buffer)
            }
        }
        if(!buffers.length) {
            return undefined
        }
        return buffers
    }

}