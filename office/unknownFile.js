export default class unknownFile {
    fileBlob
    fileBuffer

    constructor(blob) {
        this.fileBlob = blob
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
    
    async replaceText(tempData = {}){
        return true
    }

    //替换图片文件
    async replaceImages(tempData = {}){
        return true
    }

    async extractTempFields() {
        return []
    }

    async extractTempImages(){
        return {}
    }

    async generateArrayBuffer() {
        if (this.fileBuffer && this.fileBuffer.byteLength) {
            return this.fileBuffer
        }
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.onloadend= function() {
                this.fileBuffer = reader.result
                resolve(reader.result)
            }
            reader.readAsArrayBuffer(new Blob([this.fileBlob]))
        })
    }
}