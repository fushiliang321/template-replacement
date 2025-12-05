import agency from './agency'
import { messageData, messageTypes, methodCall, methodCallReply } from '../type'
import ReplaceInterface, { media } from '../../replace/interface'
import { generateId } from '../../helper'

type methodKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

const allowCallMethodNames: Set<methodKeys<ReplaceInterface>> = new Set(["addTempFile", "extractVariables", "extractMedias", "execute", "filesEncrypt", "fileEncrypt", "executeMultipleParams"])

const tasks = new Map<string, (value: unknown) => void>()

let dispatch: ReplaceInterface

export default function _init(replace: ReplaceInterface) {
  dispatch = new agency(replace)
}

export async function call<T>(method: string, ...params: unknown[]): Promise<T> {
  const replyId = generateId()
  postMessage({
    type: messageTypes.methodCall,
    data: {
      replyId,
      method: method,
      params: params,
    },
  })

  return new Promise<T>((resolve, reject) => {
    tasks.set(replyId, resolve as (value: unknown) => void)
  })
}

addEventListener('message', async (event) => {
  const data = event.data as messageData
  switch (data.type) {
    case messageTypes.methodCall:
      // 调用方法
      const callData = data.data as methodCall
      const method = callData.method as methodKeys<ReplaceInterface>
      if (!allowCallMethodNames.has(method)) {
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      const fun = dispatch[method] as Function | undefined
      if (!fun) {
        return
      }
      const res = await Promise.resolve(fun.apply(dispatch, callData.params))
      if (!callData.replyId) {
        return
      }
      const transfer: Transferable[] = []
      if (res) {
        switch (method) {
          case 'execute':
            for (const key in res as Record<string, Uint8Array>) {
              const value: Uint8Array = res[key]
              if (value?.length) {
                transfer.push(value.buffer)
              }
            }
            break
          case 'executeMultipleParams':
            for (const map of res as Record<string, Uint8Array>[]) {
              for (const key in map) {
                const value: Uint8Array = map[key]
                if (value?.length) {
                  transfer.push(value.buffer)
                }
              }
            }
            break
          case 'extractMedias':
            for (const key in res as Record<string, Uint8Array>) {
              const medias: media[] = res[key]
              for (const media of medias) {
                transfer.push(media.data.buffer)
              }
            }
            break
          case 'fileEncrypt':
            if ((res as Uint8Array).length) {
              transfer.push((res as Uint8Array).buffer)
            }
            break
          case 'filesEncrypt':
            for (const item of res as Uint8Array[]) {
              transfer.push(item.buffer)
            }
            break
        }
      }
      postMessage(
        {
          type: messageTypes.methodCallReply,
          data: {
            replyId: callData.replyId,
            result: res,
          },
        },
        transfer.length ? { transfer } : undefined,
      )
      break
    case messageTypes.methodCallReply:
      // 方法调用的返回数据
      if (!data?.data) {
        return
      }
      const replyId = (data.data as methodCallReply).replyId
      if (!replyId) {
        return
      }
      const fn = tasks.get(replyId)
      if (!fn) {
        return
      }
      fn((data.data as methodCallReply).result)
      tasks.delete(replyId)
  }
})
