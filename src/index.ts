import ReplaceInterface from './replace/interface'
import { options, SignOptions, WorkerGeneralOptions, WorkerSignOptions } from '../types/options'

async function general(options: options) {
  const { default: dispatcher } = options.polyfill ? (await import('../dist/dispatcher/polyfill/general')) : (await import('../dist/dispatcher/general'))
  return await dispatcher()
}

async function sign(options: SignOptions) {
  const { default: dispatcher } = options.polyfill ? (await import('../dist/dispatcher/polyfill/sign')) : (await import('../dist/dispatcher/sign'))
  return await dispatcher(options)
}

async function workerGeneral(options: WorkerGeneralOptions) {
  const { default: dispatcher } = options.polyfill ? (await import('../dist/dispatcher/polyfill/workerGeneral')) : (await import('../dist/dispatcher/workerGeneral'))
  return await dispatcher(options)
}

async function workerSign(options: WorkerSignOptions) {
  const { default: dispatcher } = options.polyfill ? (await import('../dist/dispatcher/polyfill/workerSign')) : (await import('../dist/dispatcher/workerSign'))
  return await dispatcher(options)
}

export default (options: options = {}): Promise<ReplaceInterface> => {
  if (options.concurrency) {
    if (options.sign) {
      return workerSign(options as WorkerSignOptions) as unknown as Promise<ReplaceInterface>
    }
    return workerGeneral(options as WorkerGeneralOptions) as unknown as Promise<ReplaceInterface>
  }
  if (options.sign) {
    return sign(options as SignOptions) as unknown as Promise<ReplaceInterface>
  }
  return general(options) as unknown as Promise<ReplaceInterface>
}
