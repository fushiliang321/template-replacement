import general from './dispatcher/general'
import sign from './dispatcher/sign'
import workerGeneral from './dispatcher/workerGeneral'
import workerSign from './dispatcher/workerSign'
import ReplaceInterface from './replace/interface'

export const General = general

export const Sign = sign

export const WorkerGeneral = workerGeneral

export const WorkerSign = workerSign

type signFun = (data: unknown) => Promise<string>

export default (concurrency?: number, signFn?: signFun): ReplaceInterface => {
  let res = undefined
  if (concurrency) {
    if (signFn) {
      res = workerSign(concurrency)
      res.sign = signFn
    } else {
      res = workerGeneral(concurrency)
    }
  } else {
    if (signFn) {
      res = sign()
      res.sign = signFn
    } else {
      res = general()
    }
  }
  return res
}
