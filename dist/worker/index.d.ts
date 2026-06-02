import { messageData } from './type';
import DispatcherInterface from './interface';
export type webworker = new () => Worker;
export default class worker implements DispatcherInterface {
    #private;
    constructor(webworker: webworker, concurrency?: number);
    concurrency(): number;
    postMessage(message: messageData, options?: StructuredSerializeOptions): void;
    addListener(fun: (event: MessageEvent) => void): void;
    removeListener(fun: (event: MessageEvent) => void): void;
}
