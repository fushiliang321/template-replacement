import webworker from '../../child/polyfill/sign.ts?worker&inline'
import base from '../../index'
import DispatcherInterface from '../../interface'

export default (concurrency?: number): DispatcherInterface => {
  return new base(webworker, concurrency)
}
