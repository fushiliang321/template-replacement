import Base from './base'
import core, {
  awaitInit,
  replace_batch,
  replace_batch_multiple_params
} from '../core/general'
import paramsData, { replaceParams } from './paramsData'

// 核心初始化完成
let coreInited = false;

export default class General extends Base {
  constructor() {
    super(core())
  }

  async handle(
    paramsData: paramsData,
    files: Uint8Array[],
    encode_files: Uint8Array[],
  ): Promise<Uint8Array[]> {
    const [params, mediaBuffers] = await paramsData.toReplaceParams()
    if (!coreInited) {
      await awaitInit;
      coreInited = true
    }
    return replace_batch(params, mediaBuffers, files, encode_files)
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
    const mediaBuffers: Uint8Array[] = [],
      newParamsListTasks: Promise<replaceParams>[] = []
    for (const paramsData of paramsList) {
      newParamsListTasks.push(
        new Promise<replaceParams>((resolve, reject) => {
          paramsData
            .toReplaceParams(mediaBuffers)
            .then(([params]) => {
              resolve(params)
            })
            .catch(reject)
        }),
      )
    }
    const newParamsList = await Promise.all(newParamsListTasks)
    return replace_batch_multiple_params(
      newParamsList,
      mediaBuffers,
      files,
      encode_files,
    )
  }
}
