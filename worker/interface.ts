import { messageData, methodCall } from './type'

export default interface DispatcherInterface {
  concurrency(): number

  postMessage(
    message: messageData | methodCall,
    options?: StructuredSerializeOptions,
  ): void

  addListener<T>(fun: (event: MessageEvent<T>) => void): void

  removeListener<T>(fun: (event: MessageEvent<T>) => void): void
}
