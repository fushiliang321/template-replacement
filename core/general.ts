import init, * as core from 'template-replacement-core-wasm'
import base, { Interface } from './base'
export * from 'template-replacement-core-wasm'

let awaitInit: Promise<unknown> | undefined

export default () => {
  if (!awaitInit) {
    awaitInit = init()
  }
  return new base(awaitInit as Promise<Interface>, core as unknown as Interface)
}
