import image from '../../replace/image'
import ReplaceInterface, { media } from '../../replace/interface'
import paramsData, { mediaData, textData } from '../../replace/paramsData'
import Temp, { transmitFileInfo, transmitFileInfoToTemp } from '../../temp'

export default class implements ReplaceInterface {
  #replace: ReplaceInterface

  constructor(replace: ReplaceInterface) {
    this.#replace = replace
  }

  addTempFile(tempFile: transmitFileInfo | Temp): void {
    tempFile = transmitFileInfoToTemp(tempFile as transmitFileInfo)
    return this.#replace.addTempFile(tempFile)
  }

  clear() {
    return this.#replace.clear()
  }

  //提取变量
  extractVariables(
    files: Temp[] | transmitFileInfo[] | undefined,
  ): Promise<Record<string, string[]>> {
    if (files) {
      for (const i in files) {
        files[i] = transmitFileInfoToTemp(files[i] as transmitFileInfo)
      }
    }
    return this.#replace.extractVariables(files as Temp[])
  }

  //提取媒体
  extractMedias(files: Temp[] | transmitFileInfo[] | undefined): Promise<Record<string, media[]>> {
    if (files) {
      for (const i in files) {
        files[i] = transmitFileInfoToTemp(files[i] as transmitFileInfo)
      }
    }
    return this.#replace.extractMedias(files as Temp[])
  }

  //签名方法
  sign(data: unknown): Promise<string> {
    return this.#replace.sign(data)
  }

  //执行替换任务
  execute(
    params: paramsData,
    files: Temp[] | transmitFileInfo[] | undefined,
  ): Promise<Record<string, Uint8Array>> {
    if (files) {
      for (const i in files) {
        files[i] = transmitFileInfoToTemp(files[i] as transmitFileInfo)
      }
    }
    const text: textData = {}
    for (const key in params.textData) {
      const value = params.textData[key]
      if (value && (value as image).file instanceof Blob) {
        text[key] = new image((value as image).file)
        delete (value as Record<keyof image, unknown>).file
        text[key].setProperties((value as Record<keyof image, unknown>))
      } else {
        text[key] = value
      }
    }

    const media: mediaData = {}
    for (const key in params.mediaData) {
      const value = params.mediaData[key] as Record<keyof image, unknown>
      if (value && value.file instanceof Blob) {
        media[key] = new image(value.file)
        delete value.file
        media[key].setProperties(value)
      }
    }
    return this.#replace.execute(new paramsData(text, media), files as Temp[])
  }

  //执行替换任务（多套参数）
  executeMultipleParams(
    paramsMultiple: paramsData[],
    files: Temp[] | undefined,
  ): Promise<Record<string, Uint8Array>[]> {
    if (files) {
      for (const i in files) {
        files[i] = transmitFileInfoToTemp(files[i] as transmitFileInfo)
      }
    }
    const paramsList = []
    for (const params of paramsMultiple) {
      const text: textData = {}
      for (const key in params.textData) {
        const value = params.textData[key]
        if (value && (value as image).file instanceof Blob) {
          text[key] = new image((value as image).file)
          delete (value as Record<keyof image, unknown>).file
          text[key].setProperties((value as Record<keyof image, unknown>))
        } else {
          text[key] = value
        }
      }

      const media: mediaData = {}
      for (const key in params.mediaData) {
        const value = params.mediaData[key] as Record<keyof image, unknown>
        if (value && value.file instanceof Blob) {
          media[key] = new image(value.file)
          delete value.file
          media[key].setProperties(value)
        }
      }
      paramsList.push(new paramsData(text, media))
    }
    return this.#replace.executeMultipleParams(paramsList, files)
  }

  //文件加密
  fileEncrypt(file: Uint8Array): Promise<Uint8Array> {
    return this.#replace.fileEncrypt(file)
  }

  //文件批量加密
  filesEncrypt(files: Uint8Array[]): Promise<Uint8Array[]> {
    return this.#replace.filesEncrypt(files)
  }
}
