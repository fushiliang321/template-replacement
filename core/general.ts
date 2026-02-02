import {
  replace_batch_multiple_params,
  replace_batch,
  add_media,
  add_template,
  extract_medias,
  extract_one_file_medias,
  extract_one_file_variable_names,
  extract_variable_names,
  file_encrypt,
  files_encrypt,
} from 'template-replacement-core-wasm'
import init from 'template-replacement-core-wasm'
import base, { rawCoreInterface } from './base'

export let awaitInit: Promise<rawCoreInterface> | undefined

export {
  replace_batch_multiple_params,
  replace_batch
}

export default () => {
  if (!awaitInit) {
    awaitInit = new Promise((resolve) => {
      init().then(() => {
        resolve({
          add_media,
          add_template,
          extract_medias,
          extract_one_file_medias,
          extract_one_file_variable_names,
          extract_variable_names,
          file_encrypt,
          files_encrypt,
        })
      })
    })
  }
  return new base(awaitInit)
}
