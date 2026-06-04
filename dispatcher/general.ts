import { options } from '../index'

export default async (options: options) => {
  const { default: replace } = await (options.polyfill ? import('../dist-legacy/worker/common/polyfill/general') : import('../dist/worker/common/general'))
  return replace()
}
