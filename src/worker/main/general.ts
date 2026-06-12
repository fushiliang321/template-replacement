import webworker from '../child/general.ts?worker&inline'
import base from '../index'
import DispatcherInterface from '../interface'

export default (concurrency?: number): DispatcherInterface => {
  return new base(webworker, concurrency)
}
