import * as wasm from 'template-replacement-core-wasm'
import init from './base'

export default () => {
  console.log('template-replacement-core-wasm')
  return init(wasm)
}
