import webworkerPolyfill from '../child/polyfill/sign.ts?worker&inline'
import base from '../index'

export default class extends base {
  constructor(concurrency?: number) {
    super(webworkerPolyfill, concurrency)
  }
}
