export interface rawCoreInterface {
  add_media(file: Uint8Array): string
  add_template(file_data: Uint8Array, is_decode: boolean): number
  extract_medias(files: Uint8Array[], encode_files: Uint8Array[]): unknown
  extract_one_file_medias(data: Uint8Array, is_decode: boolean): unknown
  extract_one_file_variable_names(
    data: Uint8Array,
    is_decode: boolean,
  ): string[]
  extract_variable_names(
    files: Uint8Array[],
    encode_files: Uint8Array[],
  ): string[]
  file_encrypt(file: Uint8Array): Uint8Array
  files_encrypt(files: Uint8Array[]): Uint8Array[]

  replace_batch(params: unknown, medias: Uint8Array[], files: Uint8Array[], encode_files: Uint8Array[]): Uint8Array[]
  replace_batch_multiple_params(params: unknown, medias: Uint8Array[], files: Uint8Array[], encode_files: Uint8Array[]): Uint8Array[]

  replace_batch(verify_code: string, params_data: string): Uint8Array[]
  replace_batch_multiple_params(verify_code: string, params_data: string): Uint8Array[]
  replace_params_encode?(params: unknown): { data: string }
  replace_params_encode_multiple_params?(params: unknown): { data: string }
}

type ModuleType = {
  default(): Promise<unknown>
}

const initMap = new Map<ModuleType, Promise<ModuleType>>()

export default (Module: ModuleType): Promise<rawCoreInterface> => {
  let _init = initMap.get(Module)
  if (!_init) {
    _init = new Promise((resolve) => {
      Module.default().then(() => {
        resolve(Module)
      })
    })
    initMap.set(Module, _init)
  }
  return _init as unknown as Promise<rawCoreInterface>
}
