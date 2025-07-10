import general from './dispatcher/general'
import sign from './dispatcher/sign'
import workerGeneral from './dispatcher/workerGeneral'
import workerSign from './dispatcher/workerSign'
import ReplaceInterface from './replace/interface'

export function General(): ReplaceInterface {
  return general()
}

export function Sign(): ReplaceInterface {
  return sign()
}

export function WorkerGeneral(concurrency?: number): ReplaceInterface {
  return workerGeneral(concurrency)
}

export function WorkerSign(concurrency?: number): ReplaceInterface {
  return workerSign(concurrency)
}

type signFun = (data: any) => Promise<string>;

export default (concurrency?: number, signFn?: signFun): ReplaceInterface => {
  let res = undefined
  if (concurrency) {
    if (signFn) {
      res = workerSign(concurrency)
      res.sign = signFn
    }else{
      res = workerGeneral(concurrency)
    }
  }else {
    if (signFn) {
      res = sign()
      res.sign = signFn
    }else{
      res = general()
    }
  }
  return res
}