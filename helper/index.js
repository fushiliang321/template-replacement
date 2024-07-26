import { nanoid } from 'nanoid'
import CryptoJS from "crypto-js"
import urlDownloadTask from '../task/urlDownloadTask'

export function urlSuffix(url) {
    url = url.split('?')[0]
    if (url.lastIndexOf('.') === -1) {
        return false
    }
    return url.substr(url.lastIndexOf('.') + 1, url.length)
}

export const fileTypes = {
    word: 'word',
    excel: 'excel',
    unknown: 'unknown',
}

export function fileType(file) {
    switch (file.type) {
        //docx
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return fileTypes.word
        //dotx
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
            return fileTypes.word
        //xlsx
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return fileTypes.excel
        default:
            return fileTypes.unknown
    }
}

export function fileTypeByName(name) {
    switch (urlSuffix(name)) {
        case 'docx':
            return fileTypes.word
        case 'dotx':
            return fileTypes.word
        case 'xlsx':
            return fileTypes.excel
        default:
            return fileTypes.unknown
    }
}

export function generateId() {
    return nanoid()
}

//只能在web worker内使用
export function blobToArrayBuffer(blob) {
    const reader = new FileReaderSync()
    const arrayBuffer = reader.readAsArrayBuffer(blob)
    return arrayBuffer
}

export async function filesReaderArrayBuffer(files) {
    const awaits = []
    for (const file of files) {
        awaits.push(new Promise(async (resolve, reject) => {
            try {
                resolve({
                    name: file.name,
                    buffer: await file.arrayBuffer()
                })
            } catch (error) {
                reject(error)
            }
        }))
    }
    return await Promise.all(awaits)
}

export async function filesReaderBase64(files) {
    const awaits = []
    for (const file of files) {
        awaits.push(new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.onload = function (e) {
                let base64 = e.target.result
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
    return await Promise.all(awaits)
}

export function base64Hash(base64) {
    const sha256 = Base64ToSHA256(base64)
    const md5 = Base64ToMD5(base64)
    return [sha256, md5]
}

export function base64HashString(base64) {
    const hash = base64Hash(base64)
    return hash[0] + hash[1]
}

export function Base64ToSHA256(base64) {
    const wordArray = CryptoJS.enc.Base64.parse(base64)
    return CryptoJS.SHA256(wordArray).toString()
}

export function Base64ToMD5(base64) {
    const wordArray = CryptoJS.enc.Base64.parse(base64)
    return CryptoJS.MD5(wordArray).toString()
}

export function base64ToBlob(base64) {
    const arr = base64.split(',')
    let mime
    if (arr.length > 1) {
        mime = arr[0].match(/:(.*?);/)[1]
        base64 = arr[1]
    } else {
        mime = 'application/octet-stream'
    }

    const byteCharacters = atob(base64)
    const byteArray = new Uint8Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i)
    }
    const blob = new Blob([byteArray], { type: mime })
    return blob
}

export function ArrayBufferToMD5(arrayBuffer) {
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer)
    return CryptoJS.MD5(wordArray).toString()
}

//urls提取为文件二进制数据
export async function urlsToFileBlobs(urls, onDownloadProgress) {
    const task = new urlDownloadTask(urls)
    if(onDownloadProgress) {
        task.onDownloadProgress = onDownloadProgress
    }
    return await task.start()
}