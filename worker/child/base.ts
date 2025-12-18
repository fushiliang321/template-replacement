import agency from './agency'
import { messageData, messageTypes, methodCall, methodCallReply } from '../type'
import ReplaceInterface, { media } from '../../replace/interface'
import { generateId } from '../../helper'

type methodKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

//允许调用的方法
const allowCallMethodNames: Set<methodKeys<ReplaceInterface>> = new Set(["addTempFile", "extractVariables", "extractMedias", "execute", "filesEncrypt", "fileEncrypt", "executeMultipleParams"])

//处理方法调用的返回值
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resultHandles = new Map<methodKeys<ReplaceInterface>, (result: any, transfer: Transferable[]) => Transferable[]>([
  ['execute', (result: Record<string, Uint8Array>, transfer: Transferable[] = []) => {
    for (const key in result) {
      const value = result[key]
      if (value?.length) {
        transfer.push(value.buffer)
      }
    }
    return transfer
  }],
  ['executeMultipleParams', (result: Record<string, Uint8Array>[], transfer: Transferable[] = []) => {
    for (const map of result) {
      for (const key in map) {
        const value = map[key]
        if (value?.length) {
          transfer.push(value.buffer)
        }
      }
    }
    return transfer
  }],
  ['extractMedias', (result: Record<string, media[]>, transfer: Transferable[] = []) => {
    for (const key in result) {
      const medias = result[key]
      for (const media of medias) {
        if (media.data?.length) {
          transfer.push(media.data.buffer)
        }
      }
    }
    return transfer
  }],
  ['fileEncrypt', (result: Uint8Array, transfer: Transferable[] = []) => {
    if (result?.length) {
      transfer.push(result.buffer)
    }
    return transfer
  }],
  ['filesEncrypt', (result: Uint8Array[], transfer: Transferable[] = []) => {
    for (const item of result) {
      if (item?.length) {
        transfer.push(item.buffer)
      }
    }
    return transfer
  }],
])

const tasks = new Map<string, (value: unknown) => void>()

let dispatch: ReplaceInterface

export default function _init(replace: ReplaceInterface) {
  dispatch = new agency(replace)
}

export function call<T>(method: string, ...params: unknown[]): Promise<T> {
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
  if (!data?.data) {
    return
  }
  switch (data.type) {
    case messageTypes.methodCall:
      // 调用方法
      const callData = data.data as methodCall<methodKeys<ReplaceInterface>>
      const method = callData.method
      if (!allowCallMethodNames.has(method)) {
        //跳过不允许被调用的方法
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      const fun = dispatch[method] as Function | undefined
      if (!fun) {
        return
      }
      let result: unknown
      let error: unknown = undefined
      try {
        result = await Promise.resolve(fun.apply(dispatch, callData.params))
      } catch (e) {
        console.error(e)
        error = (e as Error).message || ((e as Error).name || "error")
      }
      if (!callData.replyId) {
        return
      }
      const transfer: Transferable[] = []
      if (result) {
        const resultHandle = resultHandles.get(method)
        if (resultHandle) {
          resultHandle(result, transfer)
        }
      }
      postMessage(
        {
          type: messageTypes.methodCallReply,
          data: {
            replyId: callData.replyId,
            result,
            error
          },
        },
        transfer.length ? { transfer } : undefined,
      )
      break
    case messageTypes.methodCallReply:
      // 方法调用的返回数据
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
