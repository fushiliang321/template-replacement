import excel from '../office/excel'
import { urlsToFileBlobs } from '../helper'
 
export default class excelTemp extends excel {
    name
    file
    url
    status = 0 // 0已加载,1完成替换,2替换失败
    tempImages = {}
    replaceImages = {}
    extractTempImagesFinish = false
    _output
    _lastOutputTime = 0

    constructor(file, url) {
        super(file)

        if (file) {
            this.name = file.name
            this.file = file
        }
        this.url = url
        this._output = file
    }
    
    async getFileBlob() {
        if (!this.fileBlob && this.url) {
            const blobs = await urlsToFileBlobs([this.url])
            if (blobs[0]) {
                this.fileBlob = blobs[0]
            }
        }
        return this.fileBlob
    }

    setStatus(status) {
        this.status = status
    }

    setOutputFile(file) {
        this._output = file
    }

    outputFile() {
        return this._output
    }
}