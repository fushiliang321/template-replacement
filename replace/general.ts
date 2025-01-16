import Base from './base';
import core, { replace_batch } from '../core/general'
import paramsData from './paramsData';

export default class General extends Base {
    constructor() {
        super(core())
    }

    async handle(paramsData: paramsData, files: Uint8Array[]): Promise<Uint8Array[]> {
      const [params, mediaBuffers] = await paramsData.toReplaceParams()
      return replace_batch(params, mediaBuffers, files)
    }
}