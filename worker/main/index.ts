import { messageData, messageTypes, methodCall, methodCallReply } from '../type'
import DispatcherInterface from '../interface'
import { generateId, splitArrayIntoChunks } from '../../helper'
import ReplaceInterface, { media } from '../../replace/interface'
import paramsData from '../../replace/paramsData'
import Temp, { transmitFileInfo } from '../../temp'
import "web-streams-polyfill/polyfill";
import { Zip, ZipDeflate } from 'fflate'

type methodKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type allMethodNames = methodKeys<ReplaceInterface>

const allowCallMethodNames: Set<allMethodNames> = new Set(["sign"])

// 分片最小任务数量
const chunkMinNum = 20

export default class WorkerReplace implements ReplaceInterface {
  #files: Temp[] = []
  #dispatcher: DispatcherInterface
  #tasks = new Map<string, {
    resolve: (value: unknown) => void,
    reject: (reason?: unknown) => void,
  }>()
  #concurrency: number = 1

  constructor(dispatcher: DispatcherInterface) {
    this.#dispatcher = dispatcher
    this.setDispatcher(dispatcher)
  }

  setDispatcher(dispatcher: DispatcherInterface) {
    dispatcher.addListener<messageData>(event => {
      const data = event.data
      switch (data.type) {
        case messageTypes.methodCallReply:
          const replyData = data.data as methodCallReply
          if (!replyData) {
            return
          }
          const fn = this.#tasks.get(replyData.replyId)
          if (!fn) {
            return
          }
          if (replyData.error) {
            fn.reject(replyData.error)
          } else {
            fn.resolve(replyData.result)
          }
          this.#tasks.delete(replyData.replyId)
          break
        case messageTypes.methodCall:
          const callData = data.data as methodCall<allMethodNames>
          const method = callData.method
          if (!allowCallMethodNames.has(method)) {
            return
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
          const fun = this[method] as Function | undefined
          if (!fun) {
            return
          }

          const callRes = fun.apply(this, callData.params)
          if (!callData.replyId) {
            return
          }
          return new Promise((resolve, reject) => {
            try {
              Promise.resolve(callRes).then(result => {
                resolve({
                  type: messageTypes.methodCallReply,
                  data: {
                    replyId: callData.replyId,
                    result
                  },
                })
              }).catch(reject)
            } catch (error) {
              reject(error)
            }
          })
      }
    })

    this.#dispatcher = dispatcher
    this.#concurrency = this.#dispatcher.concurrency()
  }

  #call<T>(method: allMethodNames, params: unknown[]): Promise<T> {
    const transfer: Transferable[] = []
    //TODO 处理params中的Transferable对象,但要考虑拆分多个worker处理之后Transferable对象所有权只会被一个worker获取
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
    this.#dispatcher.postMessage(
      {
        type: messageTypes.methodCall,
        data: {
          replyId,
          method,
          params,
        },
      },
      transfer.length ? { transfer } : undefined,
    )
    return new Promise((resolve, reject) => {
      this.#tasks.set(replyId, {
        resolve: resolve as (value: unknown) => void,
        reject
      })
    })
  }

  //分片
  #chunk<T, Y = undefined>(
    data: T[],
    chunkPackage?: ((chunkData: T[]) => Y),
  ): T[][] | Y[] {
    let chunks: T[][];
    if (this.#concurrency > 1 && data.length > chunkMinNum) {
      const chunkSize = Math.ceil(
        data.length / Math.round(data.length / chunkMinNum),
      )
      chunks = splitArrayIntoChunks<T>(data, chunkSize)
    } else {
      chunks = [data]
    }
    if (chunkPackage) {
      for (const i in chunks) {
        (chunks as Y[])[i] = chunkPackage(chunks[i])
      }
    }
    return chunks
  }

  async #getTempFileData(
    files: Temp[] | undefined,
  ): Promise<transmitFileInfo[]> {
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

  async #chunkCall<T>(
    method: allMethodNames,
    paramChunks: unknown[][],
  ): Promise<Record<string, T>> {
    const tasks: Promise<Record<string, T>>[] = []
    for (const chunk of paramChunks) {
      tasks.push(this.#call(method, chunk))
    }
    const tasksRes = await Promise.all(tasks)
    return Object.assign({}, ...tasksRes)
  }

  addTempFile(tempFile: Temp): void {
    this.#files.push(tempFile)
  }

  async extractVariables(
    files: Temp[] | undefined,
  ): Promise<Record<string, string[]>> {
    const fileData = await this.#getTempFileData(files)
    const chunks = this.#chunk(fileData, chunkData => {
      return [chunkData]
    })
    return this.#chunkCall('extractVariables', chunks)
  }

  async extractMedias(
    files: Temp[] | undefined,
  ): Promise<Record<string, media[]>> {
    const fileData = await this.#getTempFileData(files)
    const chunks = this.#chunk(fileData, chunkData => {
      return [chunkData]
    })
    return this.#chunkCall('extractMedias', chunks)
  }

  async sign(_: unknown): Promise<string> {
    return ''
  }

  async execute(
    params: paramsData,
    files: Temp[] | undefined,
  ): Promise<Record<string, Uint8Array>> {
    const fileData = await this.#getTempFileData(files)
    const chunks = this.#chunk(fileData, chunkData => {
      return [params, chunkData]
    })
    return this.#chunkCall('execute', chunks)
  }

  async executeToZip(
    params: paramsData,
    files: Temp[] | undefined,
  ): Promise<Uint8Array> {
    const fileData = await this.#getTempFileData(files)
    return new Promise((resolve, reject) => {
      const tasks: Promise<void>[] = []
      const u8s: Uint8Array[] = [];
      const _zip = new Zip((err, dat, final) => {
        if (dat.length) {
          u8s.push(dat)
        }
        if (final) {
          const blob = new Blob(u8s as BlobPart[])
          blob.arrayBuffer().then(res => {
            resolve(new Uint8Array(res))
          })
        }
      });
      this.#chunk(fileData, chunkData => {
        tasks.push(new Promise((resolve, reject) => {
          //直接使用execute方法，无需解压再合并数据，性能更好
          this.#call<Record<string, Uint8Array>>('execute', [params, chunkData]).then(res => {
            for (const name of Object.keys(res)) {
              const helloTxt = new ZipDeflate(name, {
                level: 9,
              });
              _zip.add(helloTxt)
              helloTxt.push(res[name] as Uint8Array, true);
            }
            resolve()
          }).catch(reject)
        }))
      })
      Promise.all(tasks).then(() => {
        _zip.end()
      })
    })
  }

  async executeMultipleParams(
    params: paramsData[],
    files: Temp[] | undefined,
  ): Promise<Record<string, Uint8Array>[]> {
    const fileData = await this.#getTempFileData(files)
    const tasks: Promise<Record<string, Uint8Array>[]>[] = []
    this.#chunk(fileData, chunkData => {
      tasks.push(
        this.#call('executeMultipleParams', [params, chunkData]),
      )
    })
    const tasksRes = await Promise.all(tasks)
    const res = Array.from({ length: params.length }, () => ({}))
    for (const item of tasksRes) {
      for (let index = 0; index < item.length; index++) {
        Object.assign(res[index], item[index])
      }
    }
    return res
  }

  async executeMultipleParamsToZip(
    params: paramsData[],
    files: Temp[] | undefined,
  ): Promise<Uint8Array> {
    const fileData = await this.#getTempFileData(files)
    return new Promise(resolve => {
      const tasks: Promise<void>[] = []
      const u8s: Uint8Array[] = [];
      const _zip = new Zip((err, dat, final) => {
        if (dat.length) {
          u8s.push(dat)
        }
        if (final) {
          const blob = new Blob(u8s as BlobPart[])
          blob.arrayBuffer().then(res => {
            resolve(new Uint8Array(res))
          })
        }
      });

      this.#chunk(fileData, chunkData => {
        tasks.push(new Promise((resolve, reject) => {
          this.#call<Record<string, Uint8Array>[]>('executeMultipleParams', [params, chunkData]).then(res => {
            for (let index = 0; index < res.length; index++) {
              const item = res[index];
              for (const name of Object.keys(item)) {
                const helloTxt = new ZipDeflate(index + "/" + name, {
                  level: 9,
                });
                _zip.add(helloTxt)
                helloTxt.push(item[name] as Uint8Array, true);
              }
            }
            resolve()
          }).catch(reject)
        }))
      })
      Promise.all(tasks).then(() => {
        _zip.end()
      })
    })
  }

  fileEncrypt(file: Uint8Array): Promise<Uint8Array> {
    return this.#call('fileEncrypt', [file])
  }

  async filesEncrypt(files: Uint8Array[]): Promise<Uint8Array[]> {
    const chunks = this.#chunk<Uint8Array>(files)

    const tasks: Promise<Uint8Array[]>[] = []
    for (const chunk of chunks) {
      tasks.push(this.#call('filesEncrypt', [chunk]))
    }
    const tasksRes = await Promise.all(tasks)
    return tasksRes.flat()
  }
}
