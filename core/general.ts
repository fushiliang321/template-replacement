import init, * as core from 'template-replacement-core-wasm'
import base from './base'
export * from 'template-replacement-core-wasm'

const awaitInit = init()

export default () => {
    return new base(awaitInit, core)
}

