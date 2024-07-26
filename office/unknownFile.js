export default class unknownFile {
    fileBlob
    fileBuffer

    constructor(blob) {
        this.fileBlob = blob
    }

    async getFileBlob() {
        return this.fileBlob
    }

    async fileZip() {
        return null
    }

    async getDocumentFiles() {
        return []
    }

    async replace(tempData) {
        return true
    }

    async replaceText(tempData = {}) {
        return true
    }

    //替换图片文件
    async replaceImages(tempData = {}) {
        return true
    }

    async extractTempFields() {
        return []
    }

    async extractTempImages() {
        return {}
    }

    async generateArrayBuffer() {
        if (this.fileBuffer && this.fileBuffer.byteLength) {
            return this.fileBuffer
        }
        const blob = await this.getFileBlob()
        return blob.arrayBuffer()
    }
}