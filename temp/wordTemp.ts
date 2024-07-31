import { TempInterface } from "./index.d"
import base from './base'
import { OfficeInterface } from '../office'
import word from '../office/word'

export default class wordTemp extends base implements TempInterface {
    async getOffice(): Promise<OfficeInterface> {
        const blob = await this.getFileBlob()
        if (blob) {
           this.office = new word(blob)
        }else{
            throw new Error("文件数据加载失败")
        }
        return this.office
    }
}