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

export default class WorkerReplace implements ReplaceInterface{
  #files: Temp[] = []
  #dispatcher: DispatcherInterface
  #tasks: Record<string, Function> = {}
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
          if (this.#tasks[replyData.replyId]) {
            this.#tasks[replyData.replyId](replyData.result)
            delete this.#tasks[replyData.replyId]
          }
          break;
        case messageTypes.methodCall:
          const callData = data.data as methodCall
          const method = callData.method as methodKeys<ReplaceInterface>
          if (!allowCallMethodNames[method]) {
            return
          }
          const fun = this[method]
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

    params.forEach(param => {
      if (param instanceof Array) {
        param.forEach(item => {
          if (item?.uint8Array?.buffer?.length) {
            transfer.push(item.uint8Array.buffer)
          }
        })
      }
    })

    const replyId = generateId()
    this.#dispatcher.postMessage({
      type: messageTypes.methodCall,
      data: {
        replyId,
        method,
        params
      }
    }, { transfer })
    return new Promise((resolve, reject) => {
      this.#tasks[replyId] = resolve
    })
  }

  //分片
  #chunk<T>(files: T[], chunkPackage?: (chunkData:T[]) => any): any[] {
    let chunks = []
    if (this.#concurrency > 1 && files.length > chunkMinNum) {
      const chunkSize = Math.ceil(files.length/(Math.round(files.length/chunkMinNum)))
      chunks = splitArrayIntoChunks(files, chunkSize)
    }else {
      chunks = [files]
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
    const tasks: Promise<transmitFileInfo|undefined>[] = []
    files.forEach(file => {
      tasks.push(file.getTransmitFileInfo())
    })
    const res = await Promise.all(tasks)
    return res.filter(item => !!item)
  }

  addTempFile(tempFile: Temp): void {
    this.#files.push(tempFile)
  }

  clear(): void {
    this.#files.length = 0
  }

  async #chunkCall(method: string, paramChunks: any[]): Promise<Record<string, any>>{
    const tasks: Promise<Record<string, any>>[] = []
    paramChunks.forEach(chunk => {
      tasks.push(this.#call(method, chunk))
    })
    const tasksRes = await Promise.all(tasks)
    return tasksRes.reduce((accumulator, current) => {
      return {...accumulator, ...current}
    }, {})
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
}