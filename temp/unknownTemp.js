import { filesReaderArrayBuffer } from "../helper"
import unknownFile from "../office/unknownFile"

export default class unknownTemp extends unknownFile{
    name
    file
    url
    status = 0 // 0已加载,1完成替换,2替换失败
    _output

    documentFile = ''
    mediaDir = ''

    constructor(file, url) {
        super(file)
        if (file) {
            this.name = file.name
            this.file = file
        }
        this.url = url
        this._output = file
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

    async generateArrayBuffer(){
        const res = await filesReaderArrayBuffer([this.file])
        return res[0]
    }
}