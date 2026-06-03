import * as wasm from 'template-replacement-sign-core-wasm-polyfill'
import init from './base'

export default () => {
  return init(wasm)
}
