import Replace from '../../../replace/signPolyfill'
import init, { call } from '../base'

const replace = new Replace()

replace.sign = async (data: unknown): Promise<string> => {
  return call<string>('sign', data)
}
replace.init().then(() => {
  init(replace)
})
export default {}
