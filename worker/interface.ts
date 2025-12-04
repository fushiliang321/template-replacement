import { messageData, methodCall } from './type'

export default interface DispatcherInterface {
  concurrency(): number

  postMessage(
    message: messageData | methodCall,
    options?: StructuredSerializeOptions,
  ): void

  addListener(fun: (event: MessageEvent) => void): void

  removeListener(fun: (event: MessageEvent) => void): void
}
