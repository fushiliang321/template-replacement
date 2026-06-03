import ReplaceInterface from './replace/interface'

type signFun = (data: unknown) => Promise<string>

export default async (concurrency?: number, signFn?: signFun, polyfill: boolean = false): Promise<ReplaceInterface> => {
  if (concurrency) {
    if (signFn) {
      const { default: init } = await import('./dispatcher/workerSign')
      const res = await init(concurrency, polyfill)
      res.sign = signFn
      return res
    }
    const { default: init } = await import('./dispatcher/workerGeneral')
    return await init(concurrency, polyfill)
  }
  if (signFn) {
    const { default: init } = await import('./dispatcher/sign')
    const res = await init(polyfill)
    res.sign = signFn
    return res as unknown as ReplaceInterface
  }
  const { default: init } = await import('./dispatcher/general')
  return await init(polyfill) as unknown as ReplaceInterface
}
