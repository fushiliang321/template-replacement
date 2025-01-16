import image from "../../replace/image";
import ReplaceInterface, { media } from "../../replace/interface";
import paramsData, { mediaData, textData } from "../../replace/paramsData";
import Temp, { transmitFileInfo, transmitFileInfoToTemp } from "../../temp";

export default class implements ReplaceInterface {
  replace: ReplaceInterface

  constructor(replace: ReplaceInterface) {
    this.replace = replace
  }

  addTempFile(tempFile: any) {
    tempFile = transmitFileInfoToTemp(tempFile)
    return this.replace.addTempFile(tempFile)
  }

  clear() {
    return this.replace.clear()
  }

  //提取变量
  extractVariables(files: Temp[] | undefined): Promise<Record<string, string[]>> {
    if (files) {
      for (const i in files) {
        files[i] = transmitFileInfoToTemp(files[i] as transmitFileInfo)
      }
    }
    return this.replace.extractVariables(files)
  }

  //提取媒体
  extractMedias(files: Temp[] | undefined): Promise<Record<string, media[]>> {
    if (files) {
      for (const i in files) {
        files[i] = transmitFileInfoToTemp(files[i] as transmitFileInfo)
      }
    }
    return this.replace.extractMedias(files)
  }

  //签名方法
  sign(data: any): Promise<string> {
    return this.replace.sign(data)
  }

  //执行替换任务
  execute(params: paramsData, files: Temp[] | undefined): Promise<Record<string, Uint8Array>> {
    if (files) {
      for (const i in files) {
        files[i] = transmitFileInfoToTemp(files[i] as transmitFileInfo)
      }
    }
    const text: textData = {}
    for (const key in params.textData) {
      const value = params.textData[key] as Record<keyof image, any>
      if (value.file && value.file instanceof Blob) {
        text[key] = new image(value.file)
        delete value.file
        text[key].setPropertys(value)
      }else {
        text[key] = value
      }
    }

    const media: mediaData = {}
    for (const key in params.mediaData) {
      const value = params.mediaData[key] as Record<keyof image, any>
      if (value.file && value.file instanceof Blob) {
        media[key] = new image(value.file)
        delete value.file
        media[key].setPropertys(value)
      }
    }
    return this.replace.execute(new paramsData(text, media), files)
  }

}