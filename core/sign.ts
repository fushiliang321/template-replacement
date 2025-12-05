import init, * as core from 'template-replacement-sign-core-wasm'
import base, { Interface } from './base'
export * from 'template-replacement-sign-core-wasm'

let awaitInit: Promise<unknown> | undefined

export default () => {
  if (!awaitInit) {
    awaitInit = init()
  }
  return new base(awaitInit as Promise<Interface>, core as unknown as Interface)
}
