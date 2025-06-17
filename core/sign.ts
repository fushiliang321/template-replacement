import init, * as core from 'template-replacement-sign-core-wasm'
import base from './base'
export * from 'template-replacement-sign-core-wasm'

let awaitInit: Promise<any> | undefined

export default () => {
    if (!awaitInit) {
        awaitInit = init()
    }
    return new base(awaitInit as Promise<any>, core)
}

