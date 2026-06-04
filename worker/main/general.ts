import webworker from '../child/general.ts?worker&inline'
import base from '../index'

export default (concurrency?: number) => {
  return new base(webworker, concurrency)
}
