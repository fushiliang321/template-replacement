import Replace from '../../replace/sign'
import init, { call } from './base'

const replace = new Replace()
init(replace)

replace.sign = async (data: unknown): Promise<string> => {
  return await call<string>('sign', data)
}
