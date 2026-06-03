import * as wasm from 'template-replacement-core-wasm-polyfill'
import init from './base'

export default () => {
  return init(wasm)
}
