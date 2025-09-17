import Base from './base';
import core, { add_template, add_media, replace_batch_verify, replace_params_encode, replace_batch_verify_multiple_params, replace_params_encode_multiple_params } from '../core/sign'
import paramsData from './paramsData';

export default class Sign extends Base {
    constructor() {
        super(core())
    }

    async handle(paramsData: paramsData, files: Uint8Array[], isDecode: boolean = false): Promise<Uint8Array[]> {
        paramsData.add_media = add_media
        const [params] = await paramsData.toReplaceParams()

        const addFileTasks: Promise<number>[] = []
        for (const file of files) {
            addFileTasks.push(add_template(file, isDecode))
        }

        const encodeData = {
            files: await Promise.all(addFileTasks),
            variables: params
        }

        const paramsEncode = await replace_params_encode(encodeData)

        const verifyCode = await this.sign(paramsEncode)
        return replace_batch_verify(String(verifyCode), paramsEncode.data)
    }

    async handleMultipleParams(paramsList: paramsData[], files: Uint8Array[], isDecode: boolean = false): Promise<Uint8Array[]> {
        let variables = []
        for (const paramsData of paramsList) {
            paramsData.add_media = add_media
            const [params] = await paramsData.toReplaceParams()
            variables.push(params)
        }

        const addFileTasks: Promise<number>[] = []
        for (const file of files) {
            addFileTasks.push(add_template(file, isDecode))
        }

        const encodeData = {
            files: await Promise.all(addFileTasks),
            variables
        }

        const paramsEncode = await replace_params_encode_multiple_params(encodeData)
        const verifyCode = await this.sign(paramsEncode)
        return replace_batch_verify_multiple_params(String(verifyCode), paramsEncode.data)
    }
}