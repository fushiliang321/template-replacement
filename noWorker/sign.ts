import { options } from '../index'
import ReplaceInterface from '../replace/interface'
// import replace from '../replace/sign'

export default async (options: options): Promise<ReplaceInterface> => {
  const { default: replace } = await (options.polyfill ? import('../replace/signPolyfill') : import('../replace/sign'))
  const res = new replace()
  await res.init()
  return res
}
