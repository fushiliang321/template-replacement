import JSZip from 'jszip'
import { stream } from '../download'

export default class zip {
    name
    file
    _fileZip
    isZipFile = true
    _lastUpdateTime = 0;

    constructor(file) {
        if (file) {
            this.name = file.name
            this.file = file
        }
    }

    async fileZip() {
        if (!this.isZipFile) {
            return null
        }
        if (!this._fileZip) {
            if (this.file) {
                try {
                    this._fileZip = await JSZip.loadAsync(this.file)
                } catch (e) {
                    this.isZipFile = false
                    return null
                }
            } else {
                this._fileZip = new JSZip()
            }
        }
        return this._fileZip
    }

    async setZipData(path, data) {
        (await this.fileZip())?.file(path, data)
        this._lastUpdateTime = (new Date()).getTime()
    }

    async generate(options) {
        return (await this.fileZip())?.generateAsync(options)
    }

    async download(fileName) {
        if (fileName == undefined) {
            fileName = this.name
        }
        const zipStream = (await this.fileZip())?.generateInternalStream({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: {
                level: 9
            }
        })

        const downloadStream = stream(fileName)
        zipStream.on('data', (dataChunk, metadata) => {
            downloadStream.write(dataChunk)
        })
        zipStream.on('end', async () => {
            downloadStream.close()
        })
        zipStream.on('error', (error) => {
            downloadStream.abort(error)
        })
        zipStream.accumulate()
    }
}