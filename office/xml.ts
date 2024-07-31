import replace from '../replace/index'
import extract from '../extract/index'
import { ArrayBufferHashString } from '../helper/index'
import { OfficeInterface } from './index.d'
import { mediaData, textData } from '../replace/tempData'
import image from '../replace/image'
import { FlateError, unzip, Unzipped, zip, strFromU8, strToU8 } from 'fflate'

//特殊字符编码
const characterEncoderMap: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    "'": '&apos;',
    '"': '&quot;',
    '&': '&amp;',
}

//特殊字符解码
const characterDecoderMap: Record<string, string> = {
    'lt': '<',
    'gt': '>',
    'apos': "'",
    'quot': '"',
    'amp': '&',
}

export function decode(str: string): string {
    return str.replace(/&(lt|gt|apos|amp|quot);/ig, (all, t): string => {
        return characterDecoderMap[t]
    }).replace(/\\/g, '/')
}

export function encode(str: string): string {
    return str.replace(/(<|>|'|"|&)/ig, (all, t) => {
        return characterEncoderMap[t]
    })
}

type TempImageInfo = {
    hash: string,
    blob: Blob,
    path: string
}

export default class implements OfficeInterface{
    fileBlob: Blob

    rootDir: string = ''
    documentFile: string = ''
    mediaDir: string = ''

    _unzipData?: Unzipped
    isZipFile: boolean = true

    tempImages: Record<string, TempImageInfo> = {}

    extractTempImageQueue?: Function[] = []

    constructor(blob: Blob) {
        this.fileBlob = blob
    }

    getFileBlob(): Blob {
        return this.fileBlob
    }

    async fileZip(): Promise<Unzipped|undefined> {
        if (!this.isZipFile) {
            return undefined
        }
        if (!this._unzipData) {
            try {
                const blob = this.getFileBlob()
                this._unzipData = await new Promise(async (resolve, reject) => {
                    unzip(new Uint8Array(await blob.arrayBuffer()), (err: FlateError | null, data: Unzipped) => {
                        if (err) {
                            return reject(err)
                        }
                        resolve(data)
                    })
                })
            } catch (e) {
                console.error(e)
                this.isZipFile = false
                return undefined
            }
        }
        return this._unzipData
    }

    async getRelsData(fileName: string): Promise<string|false> {
        const zip = await this.fileZip()
        if (!zip) {
            return false
        }
        const file = zip[this.rootDir + '_rels/' + fileName + '.rels']
        if (!file) {
            return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>'
        }
        return strFromU8(file)
    }

    async setRelsData(fileName: string, data: string): Promise<boolean> {
        const zip = await this.fileZip()
        if (!zip) {
            return false
        }
        zip[this.rootDir + '_rels/' + fileName + '.rels'] = strToU8(data)
        return true
    }

    //获取所有需要替换的文件名
    async getDocumentFiles(): Promise<string[]> {
        return [
            this.documentFile
        ]
    }

    //替换文本
    async replaceText(tempTextData: textData = {}): Promise<boolean> {
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
                if (!zip[filePath]) {
                    continue
                }
                const fileData = strFromU8(zip[filePath])
                const data = replace(fileData, tempTextData)
                if (data.content == fileData) {
                    continue
                }
                res = true
                zip[filePath] = strToU8(data.content)
                if (!data.mediaFiles || Object.keys(data.mediaFiles).length == 0) {
                    //没有媒体文件
                    continue
                }
                
                //写入媒体文件
                const fileName = filePath.split("/").pop() as string
                const relsData = await this.getRelsData(fileName)
                if (!relsData) {
                    continue
                }
                const index = relsData.indexOf('</Relationships>')
                if (index == -1) {
                    continue
                }
                let relationships = ''
                for (const name in data.mediaFiles) {
                    const path = this.mediaDir + name
                    if (zip[path]) {
                        continue
                    }
                    relationships += '<Relationship Id="' + name + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="' + 'media/' + name + '"/>'
                    zip[path] = new Uint8Array(await data.mediaFiles[name].file.arrayBuffer())
                }
                if (relationships) {
                    this.setRelsData(fileName, relsData.substring(0, index) + relationships + relsData.substring(index))
                }
            } catch (error) {
                console.error(error)
            }
        }
        return res
    }

    //替换图片文件
    async replaceImages(tempImagesData: mediaData = {}): Promise<boolean> {
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
            const tempData = tempImagesData[temp.hash]
            if (!tempData) {
                continue
            }
            if (tempData instanceof Blob) {
                zip[key] = new Uint8Array(await tempData.arrayBuffer())
            }else if (tempData instanceof image) {
                //TODO 后续需要支持改变图片样式
                zip[key] = new Uint8Array(await tempData.file.arrayBuffer())
            }else {
                zip[key] = strToU8(tempData)
            }
            
            res = true
        }
        return res
    }

    //提取模板变量字段
    async extractTempFields(): Promise<string[]> {
        const files = await this.getDocumentFiles()
        if (!files.length) {
            return []
        }
        const zip = await this.fileZip()
        if (!zip) {
            return []
        }
        const fields = new Set<string>()
        for (const file of files) {
            try {
                if (!zip[file]) {
                    continue
                }
                const fileData = strFromU8(zip[file])
                const extractFields = extract(fileData)
                for (const tempField of extractFields) {
                    fields.add(tempField)
                }
            } catch (error) {
                console.error(error)
            }
        }
        return Array.from(fields)
    }

    //提取模板图片
    async extractTempImages(): Promise<Record<string, TempImageInfo>> {
        if (!this.extractTempImageQueue) {
            return this.tempImages
        }
        if (this.extractTempImageQueue.length) {
            await new Promise(resolve => this.extractTempImageQueue?.push(resolve))
            return this.tempImages
        }
        await new Promise(async (resolve, reject) => {
            try {
                if (!this.extractTempImageQueue) {
                    resolve(this.tempImages)
                    return
                }
                
                this.extractTempImageQueue?.push(resolve)

                await (async () => {
                    const zip = await this.fileZip()
                    if (!zip) {
                        return
                    }
                    
                    const tasks: Promise<TempImageInfo>[] = []
                    for (const path in zip) {
                        if (path.startsWith(this.mediaDir) && path !== this.mediaDir) {
                            const file = zip[path]
                            tasks.push(new Promise(async resolve2 => {
                                resolve2({
                                    path: path,
                                    blob: new Blob([file]),
                                    hash: ArrayBufferHashString(file),
                                } as TempImageInfo)
                            }))
                        }
                    }
                    this.tempImages = {}
                    if (!tasks.length) {
                        return
                    }
                    const dataAll = await Promise.all(tasks)
                    for (const data of dataAll) {
                        data && (this.tempImages[data.path] = data)
                    }
                })()
                for (const resolve3 of this.extractTempImageQueue) {
                    resolve3()
                }
                delete this.extractTempImageQueue
            } catch (error) {
                reject(error)
            }
        })
        return this.tempImages
    }

    async generateBlob(): Promise<Blob|undefined> {
        const data = await this.fileZip()
        if (!data) {
            return data
        }
        return await new Promise(async (resolve, reject) => {
            zip(data, { level: 1 },  (err: FlateError | null, data: Uint8Array) => {
                if (err) {
                    return reject(err)
                }
                resolve(new Blob([data]))
            })
        })
    }
}