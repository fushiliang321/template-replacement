import Base from './base';
import core, { add_template, add_media, replace_batch_verify, replace_params_encode } from '../core/sign'
import paramsData from './paramsData';

export default class Sign extends Base {
    constructor() {
        super(core())
    }

    async handle(paramsData: paramsData, files: Uint8Array[], isDecode: boolean = false): Promise<Uint8Array[]> {
        paramsData.add_media = add_media
        const [params] = await paramsData.toReplaceParams()

        const addFileTasks: Promise<number>[] = []
        files.forEach((file, i) => {
            addFileTasks.push(new Promise<number>(async resolve => {
                resolve(await add_template(file, isDecode))
            }))
        })

        const encodeData = {
            files: await Promise.all(addFileTasks),
            variables: params
        }

        const paramsEncode = await replace_params_encode(encodeData)

        const verifyCode = await this.sign(paramsEncode)
        return replace_batch_verify(String(verifyCode), paramsEncode.data)
    }
}