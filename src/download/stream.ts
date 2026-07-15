import streamSaver from 'streamsaver'
import download from './index';
import { isCrossOriginIsolated } from '../helper';

streamSaver.mitm = 'https://unpkg.com/streamsaver/mitm.html'

export function setMitm(mitm: string) {
  streamSaver.mitm = mitm
}

export type writeChunk = BufferSource | Blob | string



export default class Stream {
  #tasks: Promise<unknown>[] = []
  #writer: WritableStreamDefaultWriter<unknown>
  #fileStream: WritableStream

  // crossOriginIsolated 回退：缓冲模式
  #bufferMode: boolean
  #bufferChunks: Blob[] = []
  #fileName: string

  constructor(fileName: string, size?: number) {
    this.#fileName = fileName
    if (isCrossOriginIsolated && new URL(streamSaver.mitm).origin !== window.location.origin) {
      // 跨域，使用缓冲模式
      this.#bufferMode = true
      this.#writer = null!
      this.#fileStream = null!
      return
    }

    this.#bufferMode = false
    this.#fileStream = streamSaver.createWriteStream(fileName, { size })
    this.#writer = this.#fileStream.getWriter()
  }

  write(chunk: writeChunk): Promise<void> {
    if (this.#bufferMode) {
      const blob = chunk instanceof Blob
        ? chunk
        : typeof chunk === 'string'
          ? new Blob([chunk])
          : new Blob([new Uint8Array(chunk as ArrayBuffer)])
      this.#bufferChunks.push(blob)
      return Promise.resolve()
    }
    const res = this.#writer.write(chunk)
    this.#tasks.push(res)
    return res
  }

  async close(): Promise<void> {
    if (this.#bufferMode) {
      return download(this.#fileName, new Blob(this.#bufferChunks))
    }
    if (this.#tasks.length) {
      await Promise.all(this.#tasks)
    }
    const res = await this.#writer.close()
    this.#writer.releaseLock()
    return res
  }

  abort(reason?: unknown): Promise<void> {
    if (this.#bufferMode) {
      this.#bufferChunks = []
      return Promise.resolve()
    }
    return this.#fileStream.abort(reason)
  }
}
