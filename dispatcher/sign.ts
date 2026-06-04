import { options } from '../index'

export default async (options: options) => {
  const { default: replace } = await (options.polyfill ? import('../dist-legacy/worker/common/polyfill/sign') : import('../dist/worker/common/sign'))
  return replace(options.sign!)
}
