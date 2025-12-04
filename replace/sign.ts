import Base from './base'
import core, {
  add_template,
  add_media,
  replace_batch_verify,
  replace_params_encode,
  replace_batch_verify_multiple_params,
  replace_params_encode_multiple_params,
} from '../core/sign'
import paramsData, { replaceParams } from './paramsData'

export default class Sign extends Base {
  constructor() {
    super(core())
  }

  async handle(
    paramsData: paramsData,
    files: Uint8Array[],
    isDecode: boolean = false,
  ): Promise<Uint8Array[]> {
    paramsData.add_media = add_media

    const addFileTasks: Promise<number>[] = []
    for (const file of files) {
      addFileTasks.push(add_template(file, isDecode))
    }
    const [tempFiles, [variables]] = await Promise.all([
      Promise.all(addFileTasks),
      paramsData.toReplaceParams(),
    ])
    const encodeData = {
      files: tempFiles,
      variables,
    }

    const paramsEncode = await replace_params_encode(encodeData)
    const verifyCode = await this.sign(paramsEncode)
    return replace_batch_verify(String(verifyCode), paramsEncode.data)
  }

  async handleMultipleParams(
    paramsList: paramsData[],
    files: Uint8Array[],
    isDecode: boolean = false,
  ): Promise<Uint8Array[]> {
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

    const addFileTasks: Promise<number>[] = []
    for (const file of files) {
      addFileTasks.push(add_template(file, isDecode))
    }

    const [tempFiles, variables] = await Promise.all([
      Promise.all(addFileTasks),
      Promise.all(variablesTasks),
    ])

    const encodeData = {
      files: tempFiles,
      variables,
    }

    const paramsEncode = await replace_params_encode_multiple_params(encodeData)
    const verifyCode = await this.sign(paramsEncode)
    return replace_batch_verify_multiple_params(
      String(verifyCode),
      paramsEncode.data,
    )
  }
}
