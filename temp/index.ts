import {
  fileTypeByBuffer,
  fileTypes,
  getFileNameFromUrl,
  urlsToFileBlobs,
} from '../helper'
import { TempInterface } from './interface'

export type TempImageInfo = {
  hash: string
  blob: Blob
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
  name: string
  uint8Array: Uint8Array
  isDecode: boolean
}

//将传递的文件信息转为模板对象
export function transmitFileInfoToTemp(data: transmitFileInfo): Temp {
  if (!data.uint8Array || !data.name) {
    throw new Error('模板文件信息错误')
  }
  const temp = new Temp(undefined, undefined, data.uint8Array, data.name)
  temp.isDecode = data.isDecode
  return temp
}

export default class Temp implements TempInterface {
  name: string = ''
  blob?: File | Blob
  uint8Array?: Uint8Array
  url?: string
  status = status.waitLoad // 0文件待加载,1文件已加载,2完成替换,3替换失败
  isDecode: boolean = false //文件是否需要解密

  tempImages: Record<string, TempImageInfo> = {}

  private _output?: File | Blob = undefined
  private _type?: fileTypes = undefined

  constructor(
    file?: File | Blob,
    url?: string,
    uint8Array?: Uint8Array,
    name?: string,
  ) {
    if (uint8Array) {
      this.uint8Array = uint8Array
      this.setStatus(status.loaded)
    } else if (file) {
      this.blob = file
      this.setStatus(status.loaded)
    } else if (url) {
      this.url = url
    }
    if (name) {
      this.name = name
    } else {
      this.name = (file as File)?.name ?? ''
    }

    if (!url && !file && !uint8Array) {
      throw new Error('缺少文件数据或文件链接')
    }
  }

  getName() {
    if (this.name) {
      return this.name
    }
    if ((this.blob as File)?.name) {
      this.name = (this.blob as File).name
      return this.name
    }
    return this.url ? getFileNameFromUrl(this.url) : ''
  }

  async type(): Promise<fileTypes> {
    if (this._type) {
      return this._type
    }
    const buffer = await this.getBuffer()
    if (buffer) {
      this._type = await fileTypeByBuffer(buffer)
    } else {
      this._type = fileTypes.unknown
    }
    return this._type
  }

  async getBuffer(): Promise<Uint8Array | undefined> {
    if (this.uint8Array) {
      return this.uint8Array
    }
    const blob = await this.getBlob()
    if (blob) {
      this.uint8Array = new Uint8Array(await blob.arrayBuffer())
    }

    return this.uint8Array
  }

  async getBlob(): Promise<Blob | undefined> {
    if (this.blob) {
      return this.blob
    }
    if (!this.blob) {
      if (this.uint8Array) {
        this.blob = new Blob([this.uint8Array as BlobPart])
      } else if (this.url) {
        const [blob] = await urlsToFileBlobs([this.url])
        if (blob) {
          this.blob = blob
        }
      }
    }
    if (
      (this.status === status.waitLoad || this.status === status.loadFail) &&
      this.blob
    ) {
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

  setOutputFile(file: File | Blob): void {
    this._output = file
  }

  setTempImages(images: Record<string, TempImageInfo>): void {
    this.tempImages = images
  }

  outputFile(): File | Blob | undefined {
    return this._output ?? this.blob
  }

  async getTransmitFileInfo(): Promise<transmitFileInfo | undefined> {
    const uint8Array = this.uint8Array
      ? this.uint8Array
      : await this.getBuffer()
    if (!uint8Array) {
      return undefined
    }
    this.uint8Array = undefined
    return {
      name: this.getName(),
      uint8Array,
      isDecode: this.isDecode,
    }
  }
}
