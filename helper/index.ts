import { nanoid } from 'nanoid'
import CryptoJS from "crypto-js"
import urlDownloadTask from '../task/urlDownloadTask'
import { fileTypeFromBuffer } from 'file-type'

export function urlSuffix(url: string): string {
    url = url.split('?')[0]
    if (url.lastIndexOf('.') === -1) {
        return ''
    }
    return url.substring(url.lastIndexOf('.') + 1)
}

export function getFileNameFromUrl(url: string): string  {
    url = url.split('?')[0]
    const pathParts = url.split('/')
    return pathParts[pathParts.length - 1]
}

export const enum fileTypes  {
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
    'docx': fileTypes.word,
    'dotx': fileTypes.word,
    'xlsx': fileTypes.excel,
}

export function fileType(file: File): fileTypes {
    return officeMIMETypes[file.type] ?? fileTypes.unknown
}

export function fileTypeByName(name: string): fileTypes {
    return officeSuffixTypes[urlSuffix(name)] ?? fileTypes.unknown
}

export async function fileTypeByBuffer(buffer: Uint8Array|ArrayBuffer|Blob): Promise<fileTypes> {
    if (buffer instanceof Blob) {
        buffer = await buffer.arrayBuffer()
    }
    const type = await fileTypeFromBuffer(buffer)
    if (type && officeMIMETypes[type.mime]) {
        return officeMIMETypes[type.mime]
    }
    return fileTypes.unknown
}

export function generateId(): string {
    return nanoid()
}

export type fileArrayBufferData = {
    name: string
    buffer: ArrayBuffer
}

export async function filesReaderArrayBuffer(files: File[]): Promise<fileArrayBufferData[]> {
    const awaits = []
    files.forEach
    for (const file of files) {
        awaits.push(new Promise(async (resolve, reject) => {
            try {
                resolve({
                    name: file.name,
                    buffer: await file.arrayBuffer()
                } as fileArrayBufferData)
            } catch (error) {
                reject(error)
            }
        }))
    }
    return (await Promise.all(awaits)) as fileArrayBufferData[]
}


export type fileBase64Data = {
    name: string
    base64: string
}

export async function filesReaderBase64(files: File[]): Promise<fileBase64Data[]> {
    const awaits = []
    for (const file of files) {
        awaits.push(new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.onload = function(e) {
                let base64 = e.target?.result as string
                if (!base64) {
                    resolve({
                        name: file.name,
                        base64: ''
                    })
                    return
                }
                const index = base64.indexOf(",")
                if (index != -1) {
                    base64 = base64.slice(index + 1)
                }
                resolve({
                    name: file.name,
                    base64: base64
                })
            }
            fileReader.onerror = function (e) {
                reject(e)
            }
            fileReader.readAsDataURL(file)
        }))
    }
    return await Promise.all(awaits) as fileBase64Data[]
}

type Hash = {
    sha256: string,
    md5: string
}

export function WordArrayHash(wordArray: CryptoJS.lib.WordArray): Hash {
    const sha256 = CryptoJS.SHA256(wordArray).toString()
    const md5 = CryptoJS.MD5(wordArray).toString()
    return {
        sha256,
        md5
    }
}

export function base64Hash(base64: string): Hash {
    const wordArray = CryptoJS.enc.Base64.parse(base64)
    return WordArrayHash(wordArray)
}

export function base64HashString(base64: string): string {
    const hash = base64Hash(base64)
    return hash.sha256 + hash.md5
}

export function Base64ToSHA256(base64: string): string {
    const wordArray = CryptoJS.enc.Base64.parse(base64)
    return CryptoJS.SHA256(wordArray).toString()
}

export function Base64ToMD5(base64: string): string {
    const wordArray = CryptoJS.enc.Base64.parse(base64)
    return CryptoJS.MD5(wordArray).toString()
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

export function ArrayBufferHash(arrayBuffer: ArrayBuffer): Hash {
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer)
    return WordArrayHash(wordArray)
}

export function ArrayBufferHashString(arrayBuffer: ArrayBuffer): string {
    const hash = ArrayBufferHash(arrayBuffer)
    return hash.sha256 + hash.md5
}

//urls提取为文件二进制数据
export async function urlsToFileBlobs(urls: string[], onDownloadProgress?: (progressEvent: any) => void): Promise<(Blob|undefined)[]> {
    const task = new urlDownloadTask(urls)
    if(onDownloadProgress) {
        task.onDownloadProgress(onDownloadProgress)
    }
    return await task.start()
}

const decoder = new TextDecoder('utf-8')
export function TextDecode(input: AllowSharedBufferSource): string {
    return decoder.decode(input, {
        stream: false
    })

}
const encoder = new TextEncoder()
export function TextEncode(input: string): Uint8Array {
    return encoder.encode(input)
}
export function TextEncodeInto(input: string, destination: Uint8Array): TextEncoderEncodeIntoResult {
    return encoder.encodeInto(input, destination)
}

export function splitArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize)
        result.push(chunk)
    }
    return result
  }