import { options } from '../../index'
import ReplaceInterface from '../../replace/interface'
import Replace from '../../replace/sign'

export default async (options: options): Promise<ReplaceInterface> => {
  const { default: core } = await (options.polyfill ? import('../../core/signPolyfill') : import('../../core/sign'))
  const res = new Replace(await core())
  if (options.sign) {
    res.sign = options.sign
  }
  return res
}
