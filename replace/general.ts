import Base from './base';
import core, { replace_batch, replace_batch_multiple_params } from '../core/general'
import paramsData from './paramsData';

export default class General extends Base {
    constructor() {
        super(core())
    }

    async handle(paramsData: paramsData, files: Uint8Array[], isDecode: boolean = false): Promise<Uint8Array[]> {
      const [params, mediaBuffers] = await paramsData.toReplaceParams()
      return replace_batch(params, mediaBuffers, files, isDecode)
    }

    async handleMultipleParams(paramsList: paramsData[], files: Uint8Array[], isDecode: boolean = false): Promise<Uint8Array[]> {
      let params, mediaBuffers: Uint8Array[] = [], newParamsList: any[] = []
      for (const paramsData of paramsList) {
        [params, mediaBuffers] = await paramsData.toReplaceParams(mediaBuffers)
        newParamsList.push(params)
      }
      return replace_batch_multiple_params(newParamsList, mediaBuffers, files, isDecode)
    }
}