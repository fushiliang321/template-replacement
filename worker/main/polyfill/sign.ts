import webworker from '../../child/polyfill/sign.ts?worker&inline'
import base from '../../index'

export default (concurrency?: number) => {
  return new base(webworker, concurrency)
}
