import streamSaver from 'streamsaver'

export function setMitm(mitm: string) {
  streamSaver.mitm = mitm
}

export default class Stream {
  tasks: Promise<unknown>[] = []
  writer: WritableStreamDefaultWriter<unknown>
  fileStream: WritableStream

  constructor(fileName: string, size?: number) {
    this.fileStream = streamSaver.createWriteStream(fileName, {
      size,
    })
    this.writer = this.fileStream.getWriter()
  }

  async write(chunk: unknown): Promise<void> {
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

  async abort(reason?: unknown): Promise<void> {
    return await this.fileStream.abort(reason)
  }
}
