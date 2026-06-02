import ReplaceInterface from './replace/interface'

type signFun = (data: unknown) => Promise<string>

export default async (concurrency?: number, signFn?: signFun): Promise<ReplaceInterface> => {
  if (concurrency) {
    if (signFn) {
      const { default: init } = await import('./dispatcher/workerSign')
      const res = init(concurrency)
      res.sign = signFn
      return res
    }
    const { default: init } = await import('./dispatcher/workerGeneral')
    return init(concurrency)
  }
  if (signFn) {
    const { default: init } = await import('./dispatcher/sign')
    const res = await init()
    res.sign = signFn
    return res as unknown as ReplaceInterface
  }
  const { default: init } = await import('./dispatcher/general')
  return await init() as unknown as ReplaceInterface
}
