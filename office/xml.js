import JSZip from 'jszip'
import replace from '../replace'
import extract from '../extract'
import { base64HashString, base64ToBlob, filesReaderArrayBuffer } from '../helper'

export default class {
    fileBlob

    documentFile
    mediaDir

    _fileZip
    isZipFile = true
    
    tempImages = {}
    extractTempImagesFinish = false

    constructor(blob) {
        this.fileBlob = blob
    }
    
    async fileZip() {
        if (!this.isZipFile) {
            return null
        }
        if (!this._fileZip) {
            try{
                let blob = this.fileBlob
                if (this.fileBlob.constructor === File) {
                    const buffers = await filesReaderArrayBuffer([this.fileBlob])
                    blob = buffers[0].buffer
                }
                this._fileZip = await JSZip.loadAsync(blob)
            }catch(e) {
                console.error(e)
                this.isZipFile = false
                return null
            }
        }
        return this._fileZip
    }

    //获取所有需要替换的文件名
    async getDocumentFiles() {
        return [
            this.documentFile
        ]
    }

    //替换文本
    async replaceText(tempTextData = {}) {
        if (!tempTextData || Object.keys(tempTextData).length==0) {
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

        for (const file of files) {
            try {
                if (!zip.files[file]) {
                    continue
                }
                const fileData = await zip.files[file].async('string')
                const data = replace(fileData,tempTextData)
                if (data == fileData) {
                    continue
                }
                zip.file(file,data)
                res = true
            } catch (error) {
                console.error(error)
            }
        }

        return res
    }

    //替换图片文件
    async replaceImages(tempImagesData = {}) {
        if (!tempImagesData || Object.keys(tempImagesData).length==0) {
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
            zip.file(key,blob)
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
                extractFields.forEach((tempField)=>{
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
                awaits.push(new Promise(async resolve=>{
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
        return (await this.fileZip())?.generateAsync({type:"ArrayBuffer",compression:'DEFLATE'})
    }
}