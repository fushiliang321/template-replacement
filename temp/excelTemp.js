import excel from '../office/excel'

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