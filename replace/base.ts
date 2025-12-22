import Interface, { media } from './interface'
import { AsyncCoreInterface } from '../core/base'
import paramsData from './paramsData'
import Temp from '../temp'
import { fileTypes } from '../helper'
import { Zip, ZipDeflate } from 'fflate'

export type filesTidyResultItem = {
  names: string[]
  uint8Arrays: Uint8Array[]
}

export type filesTidyResult = {
  //需要解密的文件
  decode: filesTidyResultItem,
  //不需要解密的文件
  noDecode: filesTidyResultItem
}

//整理模板文件
async function tempFilesTidy(files: Temp[] = []): Promise<filesTidyResult> {
  //等待文件加载完成
  const tasks = []
  for (const file of files) {
    tasks.push(file.getBuffer())
  }
  await Promise.all(tasks)

  const result: filesTidyResult = {
    decode: {
      names: [],
      uint8Arrays: [],
    },
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
      result.decode.names.push(file.name)
      result.decode.uint8Arrays.push(file.uint8Array)
    } else {
      result.noDecode.names.push(file.name)
      result.noDecode.uint8Arrays.push(file.uint8Array)
    }
  }
  return result
}

export default class Base implements Interface {
  #files: Temp[] = []
  #core: AsyncCoreInterface

  constructor(core: AsyncCoreInterface) {
    this.#core = core
  }

  addTempFile(tempFile: Temp) {
    this.#files.push(tempFile)
  }

  clear(): void {
    this.#files.length = 0
  }

  //提取单个文件内的所有变量
  async extractOneFileVariables(variables: Record<string, string[]>, file: Temp): Promise<void> {
    const buffer = await file.getBuffer()
    if (!buffer) {
      return
    }
    if ((await file.type()) === fileTypes.unknown && !file.isDecode) {
      return
    }
    variables[file.name] = await this.#core.extract_one_file_variable_names(
      buffer,
      file.isDecode,
    )
  }

  //提取多个文件内的所有变量
  async extractVariables(
    files: Temp[] | undefined,
  ): Promise<Record<string, string[]>> {
    if (!files) {
      files = this.#files
    }
    const variables: Record<string, string[]> = {}
    const tasks = []
    for (const file of files) {
      tasks.push(this.extractOneFileVariables(variables, file))
    }
    await Promise.allSettled(tasks)
    return variables
  }

  //提取单个文件内的所有媒体文件
  async extractOneFileMedias(medias: Record<string, media[]>, file: Temp): Promise<void> {
    const buffer = await file.getBuffer()
    if (!buffer) {
      return
    }
    if ((await file.type()) === fileTypes.unknown && !file.isDecode) {
      return
    }
    const res = await this.#core.extract_one_file_medias(
      buffer,
      file.isDecode,
    )
    medias[file.name] = []
    if (!Array.isArray(res)) {
      return
    }
    for (const { id, data } of res) {
      if (id && data) {
        medias[file.name].push({
          id: id,
          data: new Uint8Array(data),
        })
      }
    }
  }

  //提取多个文件内的所有媒体文件
  async extractMedias(
    files: Temp[] | undefined,
  ): Promise<Record<string, media[]>> {
    if (!files) {
      files = this.#files
    }
    const medias: Record<string, media[]> = {}
    const tasks = []
    for (const file of files) {
      tasks.push(this.extractOneFileMedias(medias, file))
    }
    await Promise.all(tasks)
    return medias
  }

  async handle(
    paramsData: paramsData,
    files: Uint8Array[],
    encode_files: Uint8Array[],
  ): Promise<Uint8Array[]> {
    return []
  }

  async handleMultipleParams(
    paramsData: paramsData[],
    files: Uint8Array[],
    encode_files: Uint8Array[],
  ): Promise<Uint8Array[]> {
    return []
  }

  //签名方法
  async sign(data: unknown): Promise<string> {
    return ''
  }

  //执行替换任务
  async execute(
    params: paramsData,
    files: Temp[] | undefined,
  ): Promise<Record<string, Uint8Array>> {
    const { noDecode, decode } = await tempFilesTidy(files ?? this.#files)
    const res = await this.handle(params, noDecode.uint8Arrays, decode.uint8Arrays);
    const result: Record<string, Uint8Array> = {}
    let i = 0
    for (const name of noDecode.names) {
      result[name] = res[i++] ?? new Uint8Array()
    }
    for (const name of decode.names) {
      result[name] = res[i++] ?? new Uint8Array()
    }
    return result
  }

  //执行替换任务（返回zip压缩数据）
  async executeToZip(
    params: paramsData,
    files: Temp[] | undefined,
  ): Promise<Uint8Array> {
    const { noDecode, decode } = await tempFilesTidy(files ?? this.#files)
    const res = await this.handle(params, noDecode.uint8Arrays, decode.uint8Arrays);

    return new Promise((resolve, reject) => {
      const u8s: Uint8Array[] = [];
      const _zip = new Zip((err, dat, final) => {
        if (dat.length) {
          u8s.push(dat)
        }
        if (final) {
          const blob = new Blob(u8s as BlobPart[])
          blob.arrayBuffer().then(res => {
            resolve(new Uint8Array(res))
          })
        }
      });
      let i = 0
      for (const name of noDecode.names) {
        const helloTxt = new ZipDeflate(name, {
          level: 9,
        });
        _zip.add(helloTxt)
        helloTxt.push((res[i++] ?? new Uint8Array()) as Uint8Array, true);
      }
      for (const name of decode.names) {
        const helloTxt = new ZipDeflate(name, {
          level: 9,
        });
        _zip.add(helloTxt)
        helloTxt.push((res[i++] ?? new Uint8Array()) as Uint8Array, true);
      }
      _zip.end()
    })
  }

  //执行替换任务（多套参数）
  async executeMultipleParams(
    paramsList: paramsData[],
    files: Temp[] | undefined,
  ): Promise<Record<string, Uint8Array>[]> {
    const { noDecode, decode } = await tempFilesTidy(files ?? this.#files)
    const resFileList = await this.handleMultipleParams(paramsList, noDecode.uint8Arrays, decode.uint8Arrays);
    const result: Record<string, Uint8Array>[] = Array(paramsList.length)

    let resFileIndex = 0
    for (let index = 0; index < paramsList.length; index++) {
      const resultItem: Record<string, Uint8Array> = {}
      for (const name of noDecode.names) {
        const file = resFileList[resFileIndex++]
        if (file.length) {
          resultItem[name] = file
        }
      }
      for (const name of decode.names) {
        const file = resFileList[resFileIndex++]
        if (file.length) {
          resultItem[name] = file
        }
      }
      result[index] = resultItem
    }
    return result
  }

  //执行替换任务（多套参数，返回zip压缩数据）
  async executeMultipleParamsToZip(
    paramsList: paramsData[],
    files: Temp[] | undefined,
  ): Promise<Uint8Array> {
    const { noDecode, decode } = await tempFilesTidy(files ?? this.#files)
    const resFileList = await this.handleMultipleParams(paramsList, noDecode.uint8Arrays, decode.uint8Arrays);
    return new Promise((resolve, reject) => {
      const u8s: Uint8Array[] = [];
      const _zip = new Zip((err, dat, final) => {
        if (dat.length) {
          u8s.push(dat)
        }
        if (final) {
          const blob = new Blob(u8s as BlobPart[])
          blob.arrayBuffer().then(res => {
            resolve(new Uint8Array(res))
          })
        }
      });

      let resFileIndex = 0
      for (let index = 0; index < paramsList.length; index++) {
        for (const name of noDecode.names) {
          const file = resFileList[resFileIndex++]
          if (file.length) {
            const helloTxt = new ZipDeflate(index + "/" + name, {
              level: 9,
            });
            _zip.add(helloTxt)
            helloTxt.push(file, true);
          }
        }
        for (const name of decode.names) {
          const file = resFileList[resFileIndex++]
          if (file.length) {
            const helloTxt = new ZipDeflate(index + "/" + name, {
              level: 9,
            });
            _zip.add(helloTxt)
            helloTxt.push(file, true);
          }
        }
      }
      _zip.end()
    })
  }

  //文件加密
  fileEncrypt(file: Uint8Array): Promise<Uint8Array> {
    return this.#core.file_encrypt(file)
  }

  //文件批量加密
  filesEncrypt(files: Uint8Array[]): Promise<Uint8Array[]> {
    return this.#core.files_encrypt(files)
  }
}
