import urlDownloadTask from '../task/urlDownloadTask'
import { fileTypeFromBuffer } from 'file-type'
import { v4 as uuidV4 } from 'uuid'
import { sha1 } from 'js-sha1'

export function urlSuffix(url: string): string {
  url = url.split('?')[0]
  if (url.lastIndexOf('.') === -1) {
    return ''
  }
  return url.substring(url.lastIndexOf('.') + 1)
}

export function getFileNameFromUrl(url: string): string {
  url = url.split('?')[0]
  const pathParts = url.split('/')
  return pathParts[pathParts.length - 1]
}

export const enum fileTypes {
  word = 'word',
  excel = 'excel',
  unknown = 'unknown',
}

export const officeMIMETypes: Record<string, fileTypes> = {
  //docx
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': fileTypes.word,
  //dotx
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template': fileTypes.word,
  //xlsx
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': fileTypes.excel,
}

export const officeSuffixTypes: Record<string, fileTypes> = {
  docx: fileTypes.word,
  dotx: fileTypes.word,
  xlsx: fileTypes.excel,
}

export function fileType(file: File): fileTypes {
  return officeMIMETypes[file.type] ?? fileTypes.unknown
}

export function fileTypeByName(name: string): fileTypes {
  return officeSuffixTypes[urlSuffix(name)] ?? fileTypes.unknown
}

export async function fileTypeByBuffer(
  buffer: Uint8Array | ArrayBuffer | Blob,
): Promise<fileTypes> {
  if (buffer instanceof Blob) {
    if (buffer.type && officeMIMETypes[buffer.type]) {
      return officeMIMETypes[buffer.type]
    }
    buffer = await buffer.arrayBuffer()
  }
  const type = await fileTypeFromBuffer(buffer)

  if (type && officeMIMETypes[type.mime]) {
    return officeMIMETypes[type.mime]
  }
  return fileTypes.unknown
}

export function generateId(): string {
  try {
    return window.crypto.randomUUID()
  } catch (error) {
    return uuidV4()
  }
}

export type fileArrayBufferData = {
  name: string
  buffer: ArrayBuffer
}

export function filesReaderArrayBuffer(
  files: File[],
): Promise<fileArrayBufferData[]> {
  const awaits: Promise<fileArrayBufferData>[] = []
  for (const file of files) {
    awaits.push(
      new Promise((resolve, reject) => {
        try {
          file
            .arrayBuffer()
            .then((buffer) => {
              resolve({
                name: file.name,
                buffer,
              })
            })
            .catch(reject)
        } catch (error) {
          reject(error)
        }
      }),
    )
  }
  return Promise.all(awaits)
}

export type fileBase64Data = {
  name: string
  base64: string
}

export function filesReaderBase64(files: File[]): Promise<fileBase64Data[]> {
  const awaits: Promise<fileBase64Data>[] = []
  for (const file of files) {
    awaits.push(
      new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = function (e) {
          let base64 = e.target?.result as string
          if (!base64) {
            resolve({
              name: file.name,
              base64: '',
            })
            return
          }
          const index = base64.indexOf(',')
          if (index != -1) {
            base64 = base64.slice(index + 1)
          }
          resolve({
            name: file.name,
            base64: base64,
          })
        }
        fileReader.onerror = function (e) {
          reject(e)
        }
        fileReader.readAsDataURL(file)
      }),
    )
  }
  return Promise.all(awaits)
}

export function base64ToBlob(base64: string): Blob {
  const arr = base64.split(',')
  let mime
  if (arr.length > 1) {
    const m: RegExpMatchArray | null = arr[0].match(/:(.*?);/)
    if (m?.length) {
      mime = m[1]
      base64 = arr[1]
    }
  }
  if (!mime) {
    mime = 'application/octet-stream'
  }

  const byteCharacters = atob(base64)
  const byteArray = new Uint8Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i)
  }
  return new Blob([byteArray], { type: mime })
}

//urls提取为文件二进制数据
export function urlsToFileBlobs(
  urls: string[],
  onDownloadProgress?: (progressEvent: unknown) => void,
): Promise<(Blob | undefined)[]> {
  const task = new urlDownloadTask(urls)
  if (onDownloadProgress) {
    task.onDownloadProgress(onDownloadProgress)
  }
  return task.start()
}

export function splitArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    result.push(chunk)
  }
  return result
}

// 字符串SHA-1哈希值
export async function hashString(str: string): Promise<string> {
  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await window.crypto.subtle.digest('SHA-1', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  } catch (error) {
    return sha1(str)
  }
}
