import { signFun } from '../../index'
import ReplaceInterface from '../../replace/interface'
import Replace from '../../replace/sign'
import core from '../../core/sign'

export default async (sign: signFun): Promise<ReplaceInterface> => {
  const res = new Replace(await core())
  res.sign = sign
  return res
}
