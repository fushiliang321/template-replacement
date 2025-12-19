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
}

type PromisifyAll<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer R
  ? (...args: Args) => R extends Promise<unknown>
    ? R
    : Promise<R>
  : never;
};

export type AsyncCoreInterface = PromisifyAll<rawCoreInterface>;

export default class implements AsyncCoreInterface {
  awaitInit: Promise<rawCoreInterface>

  constructor(init: Promise<rawCoreInterface>) {
    this.awaitInit = init
  }

  async add_template(file: Uint8Array, is_decode: boolean) {
    return (await this.awaitInit).add_template(file, is_decode)
  }

  async add_media(file: Uint8Array) {
    return (await this.awaitInit).add_media(file)
  }

  async extract_one_file_variable_names(data: Uint8Array, is_decode: boolean) {
    return (await this.awaitInit).extract_one_file_variable_names(data, is_decode)
  }

  async extract_variable_names(files: Uint8Array[], encode_files: Uint8Array[]) {
    return (await this.awaitInit).extract_variable_names(files, encode_files)
  }

  async extract_one_file_medias(data: Uint8Array, is_decode: boolean) {
    return (await this.awaitInit).extract_one_file_medias(data, is_decode)
  }

  async extract_medias(files: Uint8Array[], encode_files: Uint8Array[]) {
    return (await this.awaitInit).extract_medias(files, encode_files)
  }

  async file_encrypt(file: Uint8Array) {
    return (await this.awaitInit).file_encrypt(file)
  }

  async files_encrypt(files: Uint8Array[]) {
    return (await this.awaitInit).files_encrypt(files)
  }
}
