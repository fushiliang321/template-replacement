import Replace from '../../replace/sign'
import init, { call } from './base'

const replace = new Replace()
init(replace)

replace.sign = (data: unknown): Promise<string> => {
  return call<string>('sign', data)
}
