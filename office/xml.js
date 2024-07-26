import JSZip from 'jszip'
import replace from '../replace'
import extract from '../extract'
import { base64HashString, base64ToBlob, filesReaderArrayBuffer } from '../helper'

//特殊字符编码
const characterEncoderMap = {
    '<': '&lt;',
    '>': '&gt;',
    "'": '&apos;',
    '"': '&quot;',
    '&': '&amp;',
}

//特殊字符解码
const characterDecoderMap = {
    'lt': '<',
    'gt': '>',
    'apos': "'",
    'quot': '"',
    'amp': '&',
}

export function decode(str) {
    return str.replace(/&(lt|gt|apos|amp|quot);/ig, (all, t) => {
        return characterDecoderMap[t]
    }).replace(/\\/g, '/')
}

export function encode(str) {
    return str.replace(/(<|>|'|"|&)/ig, (all, t) => {
        return characterEncoderMap[t]
    })
}

export default class {
    fileBlob

    rootDir
    documentFile
    mediaDir

    _fileZip
    isZipFile = true

    tempImages = {}
    extractTempImagesFinish = false

    constructor(blob) {
        this.fileBlob = blob
    }

    async getFileBlob() {
        return this.fileBlob
    }

    async fileZip() {
        if (!this.isZipFile) {
            return null
        }
        if (!this._fileZip) {
            try {
                let blob = await this.getFileBlob() 
                if (blob.constructor === File) {
                    const buffers = await filesReaderArrayBuffer([blob])
                    blob = buffers[0].buffer
                }
                this._fileZip = await JSZip.loadAsync(blob)
            } catch (e) {
                console.error(e)
                this.isZipFile = false
                return null
            }
        }
        return this._fileZip
    }

    async getRelsData(fileName) {
        const zip = await this.fileZip()
        if (!zip) {
            return false
        }
        if (!zip.files[this.rootDir + '_rels/' + fileName + '.rels']) {
            return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>'
        }
        return await zip.files[this.rootDir + '_rels/' + fileName + '.rels'].async('string')
    }

    async setRelsData(fileName, data) {
        const zip = await this.fileZip()
        if (!zip) {
            return false
        }
        return zip.file(this.rootDir + '_rels/' + fileName + '.rels', data)
    }

    //获取所有需要替换的文件名
    async getDocumentFiles() {
        return [
            this.documentFile
        ]
    }

    //替换文本
    async replaceText(tempTextData = {}) {
        if (!tempTextData || Object.keys(tempTextData).length == 0) {
            return false
        }
        const files = await this.getDocumentFiles()
        if (!files.length) {
            return false
        }

        const zip = await this.fileZip()
        if (!zip) {
            return false
        }

        let res = false

        for (const filePath of files) {
            try {
                if (!zip.files[filePath]) {
                    continue
                }
                const fileData = await zip.files[filePath].async('string')
                const data = replace(fileData, tempTextData)
                if (data.content == fileData) {
                    continue
                }
                zip.file(filePath, data.content)
                if (data.mediaFiles) {
                    //写入媒体文件
                    const fileName = filePath.split("/").pop()
                    const relsData = await this.getRelsData(fileName)
                    const index = relsData.indexOf('</Relationships>')
                    if (index == -1) {
                        continue
                    }
                    let relationships = ''
                    for (const name in data.mediaFiles) {
                        if (zip.files[this.mediaDir + name]) {
                            continue
                        }
                        relationships += '<Relationship Id="' + name + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="' + 'media/' + name + '"/>'
                        zip.file(this.mediaDir + name, data.mediaFiles[name].arrayBuffer)
                    }
                    if (relationships) {
                        this.setRelsData(fileName, relsData.substring(0, index) + relationships + relsData.substring(index))
                    }
                }
                res = true
            } catch (error) {
                console.error(error)
            }
        }
        return res
    }

    //替换图片文件
    async replaceImages(tempImagesData = {}) {
        if (!tempImagesData || Object.keys(tempImagesData).length == 0) {
            return false
        }
        const tempImages = await this.extractTempImages()
        if (Object.keys(tempImages).length === 0) {
            return false
        }
        const zip = await this.fileZip()
        if (!zip) {
            return false
        }
        let res = false
        for (const key in tempImages) {
            const temp = tempImages[key]
            if (!tempImagesData[temp.hash]) {
                continue
            }
            const blob = base64ToBlob(tempImagesData[temp.hash])
            zip.file(key, blob)
            res = true
        }
        return res
    }

    //提取模板变量字段
    async extractTempFields() {
        const files = await this.getDocumentFiles()
        if (!files.length) {
            return []
        }
        const zip = await this.fileZip()
        if (!zip) {
            return []
        }
        const fields = new Set()
        for (const file of files) {
            try {
                if (!zip.files[file]) {
                    continue
                }
                const fileData = await zip.files[file].async('string')
                const extractFields = extract(fileData)
                extractFields.forEach((tempField) => {
                    fields.add(tempField)
                })

            } catch (error) {
                console.error(error)
            }
        }
        return Array.from(fields)
    }

    //提取模板图片
    async extractTempImages() {
        if (this.extractTempImagesFinish) {
            return this.tempImages
        }
        this.extractTempImagesFinish = true
        const zip = await this.fileZip()
        if (!zip) {
            return this.tempImages
        }
        const awaits = []
        for (const path in zip.files) {
            if (path.startsWith(this.mediaDir) && path !== this.mediaDir) {
                const file = zip.files[path]
                awaits.push(new Promise(async resolve => {
                    const base64 = await file.async("base64")
                    resolve({
                        path: path,
                        base64: base64,
                        hash: base64HashString(base64),
                    })
                }))
            }
        }
        this.tempImages = {}
        if (!awaits.length) {
            return this.tempImages
        }
        const dataAll = await Promise.all(awaits)
        for (const data of dataAll) {
            this.tempImages[data.path] = {
                ...data
            }
        }
        return this.tempImages
    }

    async generateArrayBuffer() {
        return (await this.fileZip())?.generateAsync({ type: "ArrayBuffer", compression: 'DEFLATE', compressionOptions:{ level: 1}  })
    }

    async generateBlob() {
        return (await this.fileZip())?.generateAsync({ type: "blob", compression: 'DEFLATE', compressionOptions:{ level: 1} })
    }
}