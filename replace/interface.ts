import paramsData from './paramsData'
import Temp from '../temp'

export type media = {
  id: string
  data: Uint8Array
}

export default interface ReplaceInterface {
  //添加模板文件
  addTempFile(tempFile: Temp): void

  //清空文件和链接
  clear(): void

  //提取变量
  extractVariables(files: Temp[] | undefined): Promise<Record<string, string[]>>

  //提取媒体
  extractMedias(files: Temp[] | undefined): Promise<Record<string, media[]>>

  //签名方法
  sign(data: any): Promise<string>

  //执行替换任务
  execute(
    params: paramsData,
    files: Temp[] | undefined,
  ): Promise<Record<string, Uint8Array>>

  //执行替换任务（多套参数）
  executeMultipleParams(
    params: paramsData[],
    files: Temp[] | undefined,
  ): Promise<Record<string, Uint8Array>[]>

  //文件加密
  fileEncrypt(file: Uint8Array): Promise<Uint8Array>

  //文件批量加密
  filesEncrypt(files: Uint8Array[]): Promise<Uint8Array[]>
}
