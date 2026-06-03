import init, { call } from './base'
import replace from '../common/sign'

replace({
  sign: async (data: unknown): Promise<string> => {
    return call<string>('sign', data)
  },
}).then((r) => {
  init(r)
})
export default {}
