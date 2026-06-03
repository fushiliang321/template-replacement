import ReplaceInterface from '../replace/interface'
// import replace from '../replace/sign'

export default async (polyfill: boolean = false): Promise<ReplaceInterface> => {
  const { default: replace } = await (polyfill ? import('../replace/signPolyfill') : import('../replace/sign'))
  const res = new replace()
  await res.init()
  return res
}
