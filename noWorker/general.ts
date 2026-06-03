import { options } from '../index'
import ReplaceInterface from '../replace/interface'

export default async (options: options): Promise<ReplaceInterface> => {
  const { default: replace } = await (options.polyfill ? import('../replace/generalPolyfill') : import('../replace/general'))
  const res = new replace()
  await res.init()
  return res
}
