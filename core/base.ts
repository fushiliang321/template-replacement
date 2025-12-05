export interface Interface {
  await(): Promise<Interface>
  add_template(file: Uint8Array, is_decode: boolean): Promise<number>
  add_media(file: Uint8Array): Promise<string>
  extract_one_file_variable_names(
    data: Uint8Array,
    is_decode: boolean,
  ): Promise<string[]>
  extract_variable_names(
    files: Uint8Array[],
    is_decode: boolean,
  ): Promise<string[]>
  extract_one_file_medias(data: Uint8Array, is_decode: boolean): Promise<unknown>
  extract_medias(files: Uint8Array[], is_decode: boolean): Promise<unknown>
  file_encrypt(file: Uint8Array): Promise<Uint8Array>
  files_encrypt(files: Uint8Array[]): Promise<Uint8Array[]>
}

export default class implements Interface {
  awaitInit: Promise<Interface>

  constructor(init: Promise<Interface>) {
    this.awaitInit = init
  }

  async await(): Promise<Interface> {
    await this.awaitInit
    return this
  }

  async add_template(file: Uint8Array, is_decode: boolean): Promise<number> {
    return (await this.awaitInit).add_template(file, is_decode)
  }

  async add_media(file: Uint8Array): Promise<string> {
    return (await this.awaitInit).add_media(file)
  }

  async extract_one_file_variable_names(
    data: Uint8Array,
    is_decode: boolean,
  ): Promise<string[]> {
    return (await this.awaitInit).extract_one_file_variable_names(data, is_decode)
  }

  async extract_variable_names(
    files: Uint8Array[],
    is_decode: boolean,
  ): Promise<string[]> {
    return (await this.awaitInit).extract_variable_names(files, is_decode)
  }

  async extract_one_file_medias(
    data: Uint8Array,
    is_decode: boolean,
  ): Promise<unknown> {
    return (await this.awaitInit).extract_one_file_medias(data, is_decode)
  }

  async extract_medias(files: Uint8Array[], is_decode: boolean): Promise<unknown> {
    return (await this.awaitInit).extract_medias(files, is_decode)
  }

  async file_encrypt(file: Uint8Array): Promise<Uint8Array> {
    return (await this.awaitInit).file_encrypt(file)
  }

  async files_encrypt(files: Uint8Array[]): Promise<Uint8Array[]> {
    return (await this.awaitInit).files_encrypt(files)
  }
}
