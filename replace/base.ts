import Interface, { media } from './interface'
import { Interface as CoreInterface } from '../core/base'
import paramsData from './paramsData'
import Temp from '../temp'
import { fileTypes } from '../helper'

export default class Base implements Interface {
  #files: Temp[] = []
  #core: CoreInterface

  constructor(core: CoreInterface) {
    this.#core = core
  }

  addTempFile(tempFile: Temp) {
    this.#files.push(tempFile)
  }

  clear(): void {
    this.#files.length = 0
  }

  async extractVariables(
    files: Temp[] | undefined,
  ): Promise<Record<string, string[]>> {
    if (!files) {
      files = this.#files
    }
    const data: Record<string, string[]> = {}
    const tasks = []
    for (const file of files) {
      tasks.push(
        new Promise<void>(async (resolve) => {
          try {
            const buffer = await file.getBuffer()
            if (
              buffer &&
              (file.isDecode || (await file.type()) !== fileTypes.unknown)
            ) {
              data[file.name] =
                await this.#core.extract_one_file_variable_names(
                  buffer,
                  file.isDecode,
                )
            }
            resolve()
          } catch (error) {
            console.error(error)
          }
        }),
      )
    }
    await Promise.all(tasks)
    return data
  }

  async extractMedias(
    files: Temp[] | undefined,
  ): Promise<Record<string, media[]>> {
    if (!files) {
      files = this.#files
    }
    const data: Record<string, media[]> = {}
    const tasks = []
    for (const file of files) {
      tasks.push(
        new Promise<void>(async (resolve) => {
          try {
            const buffer = await file.getBuffer()
            if (
              buffer &&
              (file.isDecode || (await file.type()) !== fileTypes.unknown)
            ) {
              let medias = await this.#core.extract_one_file_medias(
                buffer,
                file.isDecode,
              )
              data[file.name] = []
              if (medias && Array.isArray(medias)) {
                for (const m of medias) {
                  if (m.id && m.data) {
                    data[file.name].push({
                      id: m.id,
                      data: new Uint8Array(m.data),
                    })
                  }
                }
              }
            }
            resolve()
          } catch (error) {
            console.error(error)
          }
        }),
      )
    }
    await Promise.all(tasks)
    return data
  }

  async handle(
    paramsData: paramsData,
    files: Uint8Array[],
    isDecode: boolean = false,
  ): Promise<Uint8Array[]> {
    return []
  }
  async handleMultipleParams(
    paramsData: paramsData[],
    files: Uint8Array[],
    isDecode: boolean = false,
  ): Promise<Uint8Array[]> {
    return []
  }

  async sign(data: any): Promise<string> {
    return ''
  }

  async execute(
    params: paramsData,
    files: Temp[] | undefined,
  ): Promise<Record<string, Uint8Array>> {
    if (!files) {
      files = this.#files
    }

    //等待文件加载完成
    const tasks = []
    for (const file of files) {
      tasks.push(file.getBuffer())
    }
    await Promise.all(tasks)

    const fileMap: {
      decode: { names: string[]; uint8Arrays: Uint8Array[] }
      noDecode: { names: string[]; uint8Arrays: Uint8Array[] }
    } = {
      //需要解密的文件
      decode: {
        names: [],
        uint8Arrays: [],
      },
      //不需要解密的文件
      noDecode: {
        names: [],
        uint8Arrays: [],
      },
    }

    //整理出需要解密和不需要解密的文件
    for (const file of files) {
      if (!file.uint8Array) {
        continue
      }
      if (file.isDecode) {
        fileMap.decode.names.push(file.name)
        fileMap.decode.uint8Arrays.push(file.uint8Array)
      } else {
        fileMap.noDecode.names.push(file.name)
        fileMap.noDecode.uint8Arrays.push(file.uint8Array)
      }
    }
    //分别处理需要解密和不需要解密的文件
    const res = await Promise.all([
      this._execute(
        params,
        fileMap.noDecode.names,
        fileMap.noDecode.uint8Arrays,
        false,
      ),
      this._execute(
        params,
        fileMap.decode.names,
        fileMap.decode.uint8Arrays,
        true,
      ),
    ])

    return {
      ...res[0],
      ...res[1],
    }
  }

  async _execute(
    params: paramsData,
    names: string[],
    uint8Arrays: Uint8Array[],
    isDecode: boolean = false,
  ): Promise<Record<string, Uint8Array>> {
    const resData: Record<string, Uint8Array> = {}
    if (!uint8Arrays.length) {
      return resData
    }
    const res = await this.handle(params, uint8Arrays, isDecode)
    for (let index = 0; index < res.length; index++) {
      const file = res[index]
      if (file.length) {
        resData[names[index]] = file
      }
    }
    return resData
  }

  async executeMultipleParams(
    paramsList: paramsData[],
    files: Temp[] | undefined,
  ): Promise<Record<string, Uint8Array>[]> {
    if (!files) {
      files = this.#files
    }

    //等待文件加载完成
    const tasks = []
    for (const file of files) {
      tasks.push(file.getBuffer())
    }
    await Promise.all(tasks)

    const fileMap: {
      decode: { names: string[]; uint8Arrays: Uint8Array[] }
      noDecode: { names: string[]; uint8Arrays: Uint8Array[] }
    } = {
      //需要解密的文件
      decode: {
        names: [],
        uint8Arrays: [],
      },
      //不需要解密的文件
      noDecode: {
        names: [],
        uint8Arrays: [],
      },
    }

    //整理出需要解密和不需要解密的文件
    for (const file of files) {
      if (!file.uint8Array) {
        continue
      }
      if (file.isDecode) {
        fileMap.decode.names.push(file.name)
        fileMap.decode.uint8Arrays.push(file.uint8Array)
      } else {
        fileMap.noDecode.names.push(file.name)
        fileMap.noDecode.uint8Arrays.push(file.uint8Array)
      }
    }
    //分别处理需要解密和不需要解密的文件
    const res = await Promise.all([
      this._executeMultipleParams(
        paramsList,
        fileMap.noDecode.names,
        fileMap.noDecode.uint8Arrays,
        false,
      ),
      this._executeMultipleParams(
        paramsList,
        fileMap.decode.names,
        fileMap.decode.uint8Arrays,
        true,
      ),
    ])

    const result = []
    for (let i = 0; i < res[0].length; i++) {
      result.push({ ...res[0][i], ...res[1][i] })
    }
    return result
  }

  async _executeMultipleParams(
    paramsList: paramsData[],
    names: string[],
    uint8Arrays: Uint8Array[],
    isDecode: boolean = false,
  ): Promise<Record<string, Uint8Array>[]> {
    const result: Record<string, Uint8Array>[] = Array(paramsList.length) //整理出每一套参数的替换结果文件
    if (!uint8Arrays.length) {
      return result
    }
    const resFileList = await this.handleMultipleParams(
      paramsList,
      uint8Arrays,
      isDecode,
    )

    let resFileIndex = 0
    for (let index = 0; index < paramsList.length; index++) {
      const resultItem: Record<string, Uint8Array> = {}
      for (const name of names) {
        const file = resFileList[resFileIndex++]
        if (file.length) {
          resultItem[name] = file
        }
      }
      result[index] = resultItem
    }
    return result
  }

  fileEncrypt(file: Uint8Array): Promise<Uint8Array> {
    return this.#core.file_encrypt(file)
  }

  filesEncrypt(files: Uint8Array[]): Promise<Uint8Array[]> {
    return this.#core.files_encrypt(files)
  }
}
