import init, { InitInput } from 'template-replacement-core-wasm'
import base, { rawCoreInterface } from './base'

export let awaitInit: Promise<rawCoreInterface> | undefined

export default (module: InitInput) => {
  if (!awaitInit) {
    awaitInit = new Promise((resolve) => {
      init(module).then(res => {
        resolve(res as unknown as rawCoreInterface)
      })
    })
  }
  return base(awaitInit)
}
