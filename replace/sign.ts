import Base from './base'
import core from '../core/sign'
import paramsData, { replaceParams } from './paramsData'

export default class Sign extends Base {
  constructor(wasmBuffer: RequestInfo | URL | Response | BufferSource | WebAssembly.Module) {
    super(core(wasmBuffer))
  }

  async handle(
    paramsData: paramsData,
    files: Uint8Array[],
    encode_files: Uint8Array[],
  ): Promise<Uint8Array[]> {
    paramsData.add_media = this.core.add_media
    const tempFiles = []
    for (const file of files) {
      tempFiles.push(this.core.add_template(file, false))
    }
    for (const file of encode_files) {
      tempFiles.push(this.core.add_template(file, true))
    }
    const [variables] = await paramsData.toReplaceParams()
    const encodeData = {
      files: await Promise.all(tempFiles),
      variables,
    }
    const paramsEncode = await this.core.replace_params_encode!(encodeData)
    const verifyCode = await this.sign(paramsEncode)
    return this.core.replace_batch(verifyCode, paramsEncode.data)
  }

  async handleMultipleParams(
    paramsList: paramsData[],
    files: Uint8Array[],
    encode_files: Uint8Array[],
  ): Promise<Uint8Array[]> {
    let variablesTasks: Promise<replaceParams>[] = []
    for (const paramsData of paramsList) {
      paramsData.add_media = this.core.add_media
      variablesTasks.push(
        new Promise((resolve, reject) => {
          paramsData
            .toReplaceParams()
            .then(([params]) => {
              resolve(params)
            })
            .catch(reject)
        }),
      )
    }
    const tempFiles = []
    for (const file of files) {
      tempFiles.push(this.core.add_template(file, false))
    }
    for (const file of encode_files) {
      tempFiles.push(this.core.add_template(file, true))
    }

    const encodeData = {
      files: await Promise.all(tempFiles),
      variables: await Promise.all(variablesTasks),
    }

    const paramsEncode = await this.core.replace_params_encode_multiple_params!(encodeData)
    const verifyCode = await this.sign(paramsEncode)
    return this.core.replace_batch_multiple_params(
      verifyCode,
      paramsEncode.data,
    )
  }
}
