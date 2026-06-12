import streamSaver from 'streamsaver'

streamSaver.mitm = 'https://unpkg.com/streamsaver/mitm.html'

export function setMitm(mitm: string) {
  streamSaver.mitm = mitm
}

export default class Stream {
  #tasks: Promise<unknown>[] = []
  #writer: WritableStreamDefaultWriter<unknown>
  #fileStream: WritableStream

  constructor(fileName: string, size?: number) {
    this.#fileStream = streamSaver.createWriteStream(fileName, {
      size,
    })
    this.#writer = this.#fileStream.getWriter()
  }

  write(chunk: unknown): Promise<void> {
    const res = this.#writer.write(chunk)
    this.#tasks.push(res)
    return res
  }

  async close(): Promise<void> {
    if (this.#tasks.length) {
      await Promise.all(this.#tasks)
    }
    const res = await this.#writer.close()
    this.#writer.releaseLock()
    return res
  }

  abort(reason?: unknown): Promise<void> {
    return this.#fileStream.abort(reason)
  }
}
