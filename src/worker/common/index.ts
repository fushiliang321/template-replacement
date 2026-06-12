import type { signFun } from '../../../types/options'
import ReplaceInterface from '../../replace/interface'
import { rawCoreInterface } from '../../core/base';

export default (buffer: BufferSource, replace: new (core: rawCoreInterface) => ReplaceInterface, core: (buffer: BufferSource) => rawCoreInterface, sign?: signFun): ReplaceInterface => {
  const res = new replace(core(buffer))
  if (sign) {
    res.sign = sign
  }
  return res
}
