import * as wasm from 'template-replacement-core-wasm-polyfill'
import init from './base'

export default () => {
  console.log('template-replacement-core-wasm-polyfill')
  return init(wasm)
}
