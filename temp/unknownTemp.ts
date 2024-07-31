import { OfficeInterface } from "../office"
import unknownFile from "../office/unknownFile"
import base from "./base"
import { TempInterface } from "./index.d"

export default class unknownTemp extends base implements TempInterface {
    async getOffice(): Promise<OfficeInterface> {
        const blob = await this.getFileBlob()
        if (blob) {
           this.office = new unknownFile(blob)
        }else{
            throw new Error("文件数据加载失败")
        }
        return this.office
    }
}