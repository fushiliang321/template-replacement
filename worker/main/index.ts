import { messageData, messageTypes, methodCall, methodCallReply } from '../type';
import DispatcherInterface from '../interface';
import { generateId, splitArrayIntoChunks } from '../../helper';
import ReplaceInterface, { media } from '../../replace/interface';
import paramsData from '../../replace/paramsData';
import Temp, { transmitFileInfo } from '../../temp';

type methodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

const allowCallMethodNames: Partial<Record<methodKeys<ReplaceInterface>, boolean>> = {
  sign: true,
}

// 分片最小任务数量
const chunkMinNum = 20

export default class WorkerReplace implements ReplaceInterface {
  #files: Temp[] = []
  #dispatcher: DispatcherInterface
  #tasks = new Map<string, Function>()
  #concurrency: number = 1

  constructor(dispatcher: DispatcherInterface) {
    this.#dispatcher = dispatcher
    this.setDispatcher(dispatcher)
  }

  setDispatcher(dispatcher: DispatcherInterface) {
    dispatcher.addListener(event => {
      const data = event.data as messageData
      switch (data.type) {
        case messageTypes.methodCallReply:
          const replyData = data.data as methodCallReply
          if (!replyData) {
            return
          }
          const fn = this.#tasks.get(replyData.replyId)
          if (fn) {
            fn(replyData.result)
            this.#tasks.delete(replyData.replyId)
          }
          break;
        case messageTypes.methodCall:
          const callData = data.data as methodCall
          const method = callData.method as methodKeys<ReplaceInterface>
          if (!allowCallMethodNames[method]) {
            return
          }
          const fun = this[method] as Function | undefined
          if (!fun) {
            return
          }
          const callRes = fun.apply(this, callData.params)
          if (!callData.replyId) {
            return
          }
          return new Promise(async (resolve, reject) => {
            resolve({
              type: messageTypes.methodCallReply,
              data: {
                replyId: callData.replyId,
                result: await Promise.resolve(callRes)
              }
            })
          })
      }
    })

    this.#dispatcher = dispatcher
    this.#concurrency = this.#dispatcher.concurrency()
  }

  #call(method: string, params: any[]): any {
    const transfer: any = []

    for (const param of params) {
      if (param instanceof Array) {
        for (const item of param) {
          if (item?.uint8Array?.buffer?.length) {
            transfer.push(item.uint8Array.buffer)
          }
        }
      }
    }

    const replyId = generateId()
    this.#dispatcher.postMessage({
      type: messageTypes.methodCall,
      data: {
        replyId,
        method,
        params
      }
    }, transfer.length ? { transfer } :  undefined)
    return new Promise((resolve, reject) => {
      this.#tasks.set(replyId, resolve)
    })
  }

  //分片
  #chunk<T>(data: T[], chunkPackage?: (chunkData: T[]) => any): (T[] | ((chunkData: T[]) => any))[] {
    let chunks
    if (this.#concurrency > 1 && data.length > chunkMinNum) {
      const chunkSize = Math.ceil(data.length / (Math.round(data.length / chunkMinNum)))
      chunks = splitArrayIntoChunks<T>(data, chunkSize)
    } else {
      chunks = [data]
    }
    if (chunkPackage) {
      for (const i in chunks) {
        chunks[i] = chunkPackage(chunks[i])
      }
    }
    return chunks
  }

  async #getTempFileData(files: Temp[] | undefined): Promise<transmitFileInfo[]> {
    if (!files) {
      files = this.#files
    }
    const tasks: Promise<transmitFileInfo | undefined>[] = []
    for (const file of files) {
      tasks.push(file.getTransmitFileInfo())
    }
    const res = await Promise.all(tasks)
    return res.filter(item => !!item)
  }


  clear(): void {
    this.#files.length = 0
  }

  async #chunkCall(method: string, paramChunks: any[]): Promise<Record<string, any>> {
    const tasks: Promise<Record<string, any>>[] = []
    for (const chunk of paramChunks) {
      tasks.push(this.#call(method, chunk))
    }
    const tasksRes = await Promise.all(tasks)
    return tasksRes.reduce((accumulator, current) => {
      return { ...accumulator, ...current }
    }, {})
  }

  addTempFile(tempFile: Temp): void {
    this.#files.push(tempFile)
  }

  async extractVariables(files: Temp[] | undefined): Promise<Record<string, string[]>> {
    const fileData = await this.#getTempFileData(files)
    const chunks = this.#chunk(fileData, chunkData => {
      return [chunkData]
    })
    return this.#chunkCall('extractVariables', chunks)
  }

  async extractMedias(files: Temp[] | undefined): Promise<Record<string, media[]>> {
    const fileData = await this.#getTempFileData(files)
    const chunks = this.#chunk(fileData, chunkData => {
      return [chunkData]
    })
    return this.#chunkCall('extractMedias', chunks)
  }

  async sign(data: any): Promise<string> {
    return ''
  }

  async execute(params: paramsData, files: Temp[] | undefined): Promise<Record<string, Uint8Array>> {
    const fileData = await this.#getTempFileData(files)
    const chunks = this.#chunk(fileData, chunkData => {
      return [params, chunkData]
    })
    return this.#chunkCall('execute', chunks)
  }

  async executeMultipleParams(params: paramsData[], files: Temp[] | undefined): Promise<Record<string, Uint8Array>[]> {
    const fileData = await this.#getTempFileData(files)
    const tasks: Promise<Record<string, any>[]>[] = []
    this.#chunk(fileData, chunkData => {
      tasks.push(this.#call('executeMultipleParams', [params, chunkData] as any))
    })
    const tasksRes = (await Promise.all(tasks)) as Record<string, Uint8Array>[][]
    const res = new Array(params.length)
    for (const item of tasksRes) {
      for (let index = 0; index < item.length; index++) {
        res[index] = {...item[index], ...res[index]}
      }
    }
    return res
  }

  async fileEncrypt(file: Uint8Array): Promise<Uint8Array> {
    return await this.#call('fileEncrypt', [file])
  }

  async filesEncrypt(files: Uint8Array[]): Promise<Uint8Array[]> {
    const chunks = this.#chunk<Uint8Array>(files) as (Uint8Array[])[]

    const tasks: Promise<Uint8Array[]>[] = []
    for (const chunk of chunks) {
      tasks.push(this.#call('filesEncrypt', [chunk]))
    }
    const tasksRes = await Promise.all(tasks)
    return tasksRes.flat()
  }
}