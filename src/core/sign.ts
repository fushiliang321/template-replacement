import {
  initSync,
  add_media,
  add_template,
  extract_medias,
  extract_one_file_medias,
  extract_one_file_variable_names,
  extract_variable_names,
  file_encrypt,
  files_encrypt,
  replace_batch,
  replace_batch_multiple_params,
  replace_params_encode,
  replace_params_encode_multiple_params
} from 'template-replacement-sign-core-wasm'
import { rawCoreInterface } from './base'

export default (buffer: BufferSource): rawCoreInterface => {
  initSync(buffer)
  return {
    add_media,
    add_template,
    extract_medias,
    extract_one_file_medias,
    extract_one_file_variable_names,
    extract_variable_names,
    file_encrypt,
    files_encrypt,
    replace_batch,
    replace_batch_multiple_params,
    replace_params_encode,
    replace_params_encode_multiple_params
  } as unknown as rawCoreInterface
}

