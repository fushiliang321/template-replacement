import { mediaData, textData } from '../replace/tempData'

export type TempImageInfo = {
    hash: string,
    blob: Blob,
    path: string
}

export interface OfficeInterface {
    mediaDir: string

    getFileBlob(): Blob

    fileZip(): Promise<Unzipped|undefined>

    getDocumentFiles(): Promise<string[]>

    replaceText(tempData: textData): Promise<boolean>

    //替换图片文件
    replaceImages(tempData: mediaData): Promise<boolean>
    
    extractTempFields(): Promise<string[]>

    extractTempImages(): Promise<Record<string, TempImageInfo>>

    generateBlob(): Promise<Blob|undefined>
}