import init, { call } from './base'
import replace from '../common/sign'

replace(
  data => {
    return call<string>('sign', data)
  }
).then(r => {
  init(r)
})
export default {}
