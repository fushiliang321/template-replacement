import { OfficeInterface } from '../office/index.d'

export enum status {
    waitLoad, //文件待加载
    loaded, //文件已加载
    replaceFinish, //完成替换
    replaceFail, //替换失败
    loadFail, //文件加载失败
}

export interface TempInterface {
    
    getFileBlob(): Promise<Blob|undefined>

    setStatus(status: status): void

    setOutputFile(file: File|Blob): void

    extractTempFields(): Promise<string[]> 

    extractTempImages(): Promise<Record<string, TempImageInfo>>

    outputFile(): File|Blob|undefined
}