import webworkerPolyfill from '../child/polyfill/general.ts?worker&inline'
import base from '../index'

export default class extends base {
  constructor(concurrency?: number) {
    super(webworkerPolyfill, concurrency)
  }
}
