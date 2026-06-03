import ReplaceInterface from './replace/interface'

type signFun = (data: unknown) => Promise<string>

export type options = {
  concurrency?: number
  sign?: signFun
  polyfill?: boolean
}

export default async (options: options): Promise<ReplaceInterface> => {
  let res: ReplaceInterface
  let dispatcher
  if (options.concurrency) {
    dispatcher = (await import(options.sign ? './dispatcher/workerSign' : './dispatcher/workerGeneral')).default
  } else {
    dispatcher = (await import(options.sign ? './dispatcher/sign' : './dispatcher/general')).default
  }
  res = await dispatcher(options)
  if (options.sign) {
    res.sign = options.sign
  }
  return res
}
