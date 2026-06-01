import { initSync, SyncInitInput } from 'template-replacement-sign-core-wasm'
import base, { rawCoreInterface } from './base'

export let awaitInit: Promise<rawCoreInterface> | undefined

export default (module: SyncInitInput) => {
  if (!awaitInit) {
    awaitInit = new Promise((resolve) => {
      resolve(initSync(module) as unknown as rawCoreInterface)
    })
  }
  return base(awaitInit)
}
