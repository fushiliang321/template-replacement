import excel from '../office/excel'
import { TempInterface } from "./index.d"
import base from './base'
import { OfficeInterface } from '../office'

export default class excelTemp extends base implements TempInterface {
    async getOffice(): Promise<OfficeInterface> {
        const blob = await this.getFileBlob()
        if (blob) {
           this.office = new excel(blob)
        }else{
            throw new Error("文件数据加载失败")
        }
        return this.office
    }
}