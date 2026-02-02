import Base from './base'
import core, {
  awaitInit,
  add_media,
  add_template,
  replace_batch,
  replace_params_encode,
  replace_batch_multiple_params,
  replace_params_encode_multiple_params,
} from '../core/sign'
import paramsData, { replaceParams } from './paramsData'

// 核心初始化完成
let coreInited = false;

export default class Sign extends Base {
  constructor() {
    super(core())
  }

  async handle(
    paramsData: paramsData,
    files: Uint8Array[],
    encode_files: Uint8Array[],
  ): Promise<Uint8Array[]> {
    if (!coreInited) {
      await awaitInit;
      coreInited = true
    }
    paramsData.add_media = add_media
    const tempFiles = []
    for (const file of files) {
      tempFiles.push(add_template(file, false))
    }
    for (const file of encode_files) {
      tempFiles.push(add_template(file, true))
    }
    const [variables] = await paramsData.toReplaceParams()
    const encodeData = {
      files: tempFiles,
      variables,
    }
    const paramsEncode = await replace_params_encode(encodeData)
    const verifyCode = await this.sign(paramsEncode)
    return replace_batch(verifyCode, paramsEncode.data)
  }

  async handleMultipleParams(
    paramsList: paramsData[],
    files: Uint8Array[],
    encode_files: Uint8Array[],
  ): Promise<Uint8Array[]> {
    if (!coreInited) {
      await awaitInit;
      coreInited = true
    }
    let variablesTasks: Promise<replaceParams>[] = []
    for (const paramsData of paramsList) {
      paramsData.add_media = add_media
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
      tempFiles.push(add_template(file, false))
    }
    for (const file of encode_files) {
      tempFiles.push(add_template(file, true))
    }

    const encodeData = {
      files: tempFiles,
      variables: await Promise.all(variablesTasks),
    }

    const paramsEncode = await replace_params_encode_multiple_params(encodeData)
    const verifyCode = await this.sign(paramsEncode)
    return replace_batch_multiple_params(
      verifyCode,
      paramsEncode.data,
    )
  }
}
