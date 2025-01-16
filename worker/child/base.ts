import agency from './agency'
import { messageData, messageTypes, methodCall } from '../type';
import ReplaceInterface, { media } from '../../replace/interface';
import { generateId } from '../../helper';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

type methodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

const allowCallMethodNames: Partial<Record<methodKeys<ReplaceInterface>, boolean>> = {
  addTempFile: true,
  extractVariables: true,
  extractMedias: true,
  execute: true,
}

const tasks: Record<string, Function> = {} = {}

let dispatch: ReplaceInterface

export default function _init(replace: ReplaceInterface) {
    dispatch = new agency(replace)
}

export async function call<T>(method: string, ...params: any[]): Promise<T> {
  const replyId = generateId()
  postMessage({
    type: messageTypes.methodCall,
    data: {
      replyId,
      method: method,
      params: params
    }
  })

  return new Promise<T>((resolve, reject) => {
    tasks[replyId] = resolve
  })
}


addEventListener('message', async event => {
    const data = event.data as messageData
    switch (data.type) {
      case messageTypes.methodCall:
        const callData = data.data as methodCall
        const method = callData.method as methodKeys<ReplaceInterface>
        if (!allowCallMethodNames[method]) {
          return
        }
        const fun = dispatch[method]
        if (!dispatch[method]) {
          return
        }
        const res = await Promise.resolve(fun.apply(dispatch, callData.params))
        if (callData.replyId) {
          const transfer: any = []
          if (res) {
            switch (method) {
              case 'execute':
                for (const key in (res as Record<string, Uint8Array>)) {
                  const value: Uint8Array = res[key]
                  value.buffer && transfer.push(value.buffer)
                }
                break;
              case 'extractMedias':
                for (const key in (res as Record<string, Uint8Array>)) {
                  const medias: media[] = res[key]
                  medias.forEach(media => {
                    transfer.push(media.data.buffer)
                  })
                }
            }
          }
          postMessage({
            type: messageTypes.methodCallReply,
            data: {
              replyId: callData.replyId,
              result: res
            }
          }, { transfer })
        }
        break;
      case messageTypes.methodCallReply:
        tasks[data?.data?.replyId](data?.data?.result)
        delete tasks[data?.data?.replyId]
    }
})
