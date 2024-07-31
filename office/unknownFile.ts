import { OfficeInterface, TempImageInfo } from './index.d'
import { mediaData, textData } from '../replace/tempData'

export default class unknownFile implements OfficeInterface {
    mediaDir: string = ''
    fileBlob: Blob
    fileBuffer?: ArrayBuffer

    constructor(blob: Blob) {
        this.fileBlob = blob
    }

    getFileBlob(): Blob {
        return this.fileBlob
    }

    async fileZip(): Promise<undefined> {
        return undefined
    }

    async getDocumentFiles(): Promise<string[]> {
        return []
    }

    async replaceText(tempData: textData = {}): Promise<boolean> {
        return false
    }

    //替换图片文件
    async replaceImages(tempData: mediaData = {}): Promise<boolean> {
        return false
    }

    async extractTempFields(): Promise<string[]> {
        return []
    }

    async extractTempImages():  Promise<Record<string, TempImageInfo>> {
        return {}
    }

    async generateBlob(): Promise<Blob> {
        return this.getFileBlob()
    }
}