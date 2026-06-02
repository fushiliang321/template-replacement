import ReplaceInterface from '../replace/interface'
import replace from '../replace/sign'

export default async (): Promise<ReplaceInterface> => {
  const res = new replace()
  await res.init()
  return res
}
