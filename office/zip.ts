import { stream } from '../download'
import {
  FlateError,
  unzip,
  Unzipped,
  zip,
  strToU8,
  AsyncZipOptions,
  Zip as fflateZip,
  ZipDeflate,
} from 'fflate'

type InputType = string | Uint8Array | ArrayBuffer | Blob

export default class Zip {
  name: string = ''
  fileBlob?: Blob
  private _unzipData?: Unzipped

  constructor(file?: Blob) {
    if (!file) {
      return
    }
    this.name = (file as File)?.name ?? ''
    this.fileBlob = file
  }

  getFileBlob(): Blob | undefined {
    return this.fileBlob
  }

  async fileZip(): Promise<Unzipped> {
    if (!this._unzipData) {
      try {
        const blob = this.getFileBlob()
        if (blob) {
          const arrayBuffer = await blob.arrayBuffer()
          this._unzipData = await new Promise((resolve, reject) => {
            unzip(
              new Uint8Array(arrayBuffer),
              (err: FlateError | null, data: Unzipped) => {
                if (err) {
                  return reject(err)
                }
                resolve(data)
              },
            )
          })
        }
      } catch (e) {
        console.warn(e)
      }
    }
    if (!this._unzipData) {
      this._unzipData = {}
    }
    return this._unzipData
  }

  async setZipData(path: string, data: InputType): Promise<void> {
    const fileZip = await this.fileZip()
    switch (true) {
      case data instanceof Blob:
        data = new Uint8Array(await data.arrayBuffer())
        break
      case data instanceof Uint8Array:
        break
      case data instanceof ArrayBuffer:
        data = new Uint8Array(data)
        break
      case data instanceof String:
        data = strToU8(data as string)
        break
      default:
        throw new Error('Invalid data type')
    }
    fileZip[path] = data as Uint8Array
    this._lastUpdateTime = new Date().getTime()
  }

  async generate(options: AsyncZipOptions): Promise<Blob | undefined> {
    const data = await this.fileZip()
    if (!Object.keys(data).length) {
      return undefined
    }
    return await new Promise((resolve, reject) => {
      zip(data, options, (err: FlateError | null, data: Uint8Array) => {
        if (err) {
          return reject(err)
        }
        resolve(new Blob([data as BlobPart]))
      })
    })
  }

  async download(fileName: string): Promise<void> {
    const data = await this.fileZip()
    if (!Object.keys(data).length) {
      return
    }

    if (fileName == undefined) {
      fileName = this.name
    }

    const downloadStream = stream(fileName)
    const zip = new fflateZip((err, dat, final) => {
      if (err) {
        downloadStream.abort(err)
        return
      }
      downloadStream.write(dat)
      if (final) {
        downloadStream.close()
      }
    })

    for (const key in data) {
      const deflate = new ZipDeflate(key, {
        level: 9,
      })
      zip.add(deflate)
      deflate.push(data[key], true)
    }
    zip.end()
  }
}
