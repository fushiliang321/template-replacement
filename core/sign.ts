import init, * as core from 'template-replacement-sign-core-wasm'
import base from './base'
export * from 'template-replacement-sign-core-wasm'

const awaitInit = init()

export default () => {
    return new base(awaitInit, core)
}
