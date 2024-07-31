import streamSaver from "streamsaver"

export default class Stream {
    tasks: Promise<any>[] = []
    writer: WritableStreamDefaultWriter<any>
    fileStream: WritableStream

    constructor(fileName: string, size?: number) {
        this.fileStream = streamSaver.createWriteStream(fileName, {
            size
        })
        this.writer = this.fileStream.getWriter()
    }

    async write(chunk: any): Promise<void> {
        const a = this.writer.write(chunk)
        this.tasks.push(a)
        const res = await a
        return res
    }

    async close(): Promise<void> {
        if (this.tasks.length) {
            await Promise.all(this.tasks)
        }
        const res = await this.writer.close()
        this.writer.releaseLock()
        return res
    }

    async abort(reason?: any): Promise<void> {
        return await this.fileStream.abort(reason)
    }
}