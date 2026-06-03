import ReplaceInterface from '../replace/interface'
export default async (polyfill: boolean = false): Promise<ReplaceInterface> => {
  const { default: replace } = await (polyfill ? import('../replace/generalPolyfill') : import('../replace/general'))
  const res = new replace()
  await res.init()
  return res
}
