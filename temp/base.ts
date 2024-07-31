import { getFileNameFromUrl, urlsToFileBlobs } from '../helper'
import { TempInterface, status } from "./index.d"
import { OfficeInterface, TempImageInfo } from "../office//index.d"

export default class base implements TempInterface{
    name: string = ''
    fileBlob?: File|Blob
    url?: string
    status = status.waitLoad // 0文件待加载,1文件已加载,2完成替换,3替换失败
    _output?: File|Blob

    office?: OfficeInterface

    tempImages: Record<string, TempImageInfo> = {}
    
    constructor(file?: File|Blob, url?: string) {
        if (url) {
            this.url = url
        }

        if (file) {
            this.name = (file as File)?.name ?? (url ? getFileNameFromUrl(url) : '')
            this.fileBlob = file
            this.setStatus(status.loaded)
        }
        if (!url && !file) {
            throw new Error("缺少文件或文件链接")
        }
    }

    async getFileBlob(): Promise<Blob|undefined> {
        if (!this.fileBlob && this.url) {
            const [ blob ] = await urlsToFileBlobs([ this.url ])
            if (blob) {
                this.fileBlob = blob
            }
        }
        if (this.status === status.waitLoad && this.fileBlob) {
            this.setStatus(status.loaded)
        }
        if (!this.fileBlob) {
            this.setStatus(status.loadFail)
        }
        return this.fileBlob
    }

    setStatus(status: status): void {
        this.status = status
    }

    setOutputFile(file: File|Blob): void {
        this._output = file
    }

    outputFile(): File|Blob|undefined {
        return this._output ?? this.fileBlob
    }
    
    async getOffice(): Promise<OfficeInterface> {
        if (!this.office) {
            throw new Error("office实例未初始化")
        }
        return this.office
    }

    //提取模板变量字段
    async extractTempFields(): Promise<string[]> {
        const office = await this.getOffice()
        return await office.extractTempFields()
    }

    //提取模板图片
    async extractTempImages(): Promise<Record<string, TempImageInfo>> {
        const office = await this.getOffice()
        this.tempImages = await office.extractTempImages()
        return this.tempImages
    }
}