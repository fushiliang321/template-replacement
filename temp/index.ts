import { fileTypeByBuffer, fileTypes, getFileNameFromUrl, urlsToFileBlobs } from '../helper'
import { TempInterface } from './interface'

export type TempImageInfo = {
    hash: string,
    blob: Blob,
    path: string
}

export enum status {
    waitLoad, //文件待加载
    loaded, //文件已加载
    replaceFinish, //完成替换
    replaceFail, //替换失败
    loadFail, //文件加载失败
}

//传递的文件信息
export type transmitFileInfo = {
    name: string,
    uint8Array: Uint8Array,
}

export function transmitFileInfoToTemp(data: transmitFileInfo) {
    if (!data.uint8Array || !data.name) {
        throw new Error("模板文件信息错误")
    }
    return new Temp(undefined, undefined, data.uint8Array, data.name)
}

export default class Temp implements TempInterface{
    name: string = ''
    blob?: File|Blob
    uint8Array?: Uint8Array
    url?: string
    status = status.waitLoad // 0文件待加载,1文件已加载,2完成替换,3替换失败

    _output?: File|Blob
    _type?: fileTypes

    tempImages: Record<string, TempImageInfo> = {}

    constructor(file?: File|Blob, url?: string, uint8Array?: Uint8Array, name?: string) {
        if (uint8Array) {
            this.uint8Array = uint8Array
            this.setStatus(status.loaded)
        }else if (file) {
            this.blob = file
            this.setStatus(status.loaded)
        }else if (url) {
            this.url = url
        }
        if (name) {
            this.name = name
        }else{
            this.name = (file as File)?.name ?? (url ? getFileNameFromUrl(url) : '')
        }

        if (!url && !file && !uint8Array) {
            throw new Error("缺少文件数据或文件链接")
        }
    }

    async type(): Promise<fileTypes> {
        if (this._type) {
            return this._type
        }
        if (this.uint8Array) {
            this._type = await fileTypeByBuffer(this.uint8Array)
        }else{
            const file = await this.getBlob()
            if (file) {
                this._type = await fileTypeByBuffer(file)
            }else{
                this._type = fileTypes.unknown
            }
        }
        return this._type
    }

    async getBuffer(): Promise<Uint8Array|undefined>{
        if (this.uint8Array) {
            return this.uint8Array
        }
        const blob = await this.getBlob()
        if (blob) {
            this.uint8Array = new Uint8Array(await blob.arrayBuffer())
        }

        return this.uint8Array
    }

    async getBlob(): Promise<Blob|undefined> {
        if (this.blob) {
            return this.blob
        }
        if (!this.blob) {
            if (this.uint8Array) {
                this.blob = new Blob([ this.uint8Array ])
            }else if (this.url) {
                const [ blob ] = await urlsToFileBlobs([ this.url ])
                if (blob) {
                    this.blob = blob
                }
            }
        }
        if ((this.status === status.waitLoad || this.status === status.loadFail) && this.blob) {
            this.setStatus(status.loaded)
        }
        if (!this.blob) {
            this.setStatus(status.loadFail)
        }
        return this.blob
    }

    setStatus(status: status): void {
        this.status = status
    }

    setOutputFile(file: File|Blob): void {
        this._output = file
    }

    setTempImages(images: Record<string, TempImageInfo>): void {
        this.tempImages = images
    }

    outputFile(): File|Blob|undefined {
        return this._output ?? this.blob
    }

    async getTransmitFileInfo(): Promise<transmitFileInfo|undefined> {
        let uint8Array = this.uint8Array
        this.uint8Array = undefined
        if (!uint8Array) {
            uint8Array = await this.getBuffer()
        }
        if (!uint8Array) {
            return undefined
        }
        return {
            name: this.name,
            uint8Array: new Uint8Array(uint8Array.buffer.slice(0)),
        }
    }
}
