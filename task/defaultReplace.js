export default class defaultReplace {
    fileBlob
    fileBuffer

    constructor(blob) {
        this.fileBlob = blob
    }

    async fileZip() {
        return null
    }

    async replace(tempData) {
        return true
    }
    
    //替换图片文件
    async replaceImage(key,file) {
        return true
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