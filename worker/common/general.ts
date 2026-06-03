import { options } from '../../index'
import Replace from '../../replace/general'
import ReplaceInterface from '../../replace/interface'

export default async (options: options): Promise<ReplaceInterface> => {
  const { default: core } = await (options.polyfill ? import('../../core/generalPolyfill') : import('../../core/general'))
  return new Replace(await core())
}
