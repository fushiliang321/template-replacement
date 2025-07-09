import axios, { AxiosProgressEvent } from "axios"
import file from "../fileSystem"

async function hashString(str: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await window.crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
}

export default class urlDownloadTask {
    urls: string[]
    downloadProgressListener:((progressEvent: AxiosProgressEvent) => void)[] = []

    constructor(urls: string[]) {
        if (urls.constructor !== Array) {
            throw new Error("不是可用的链接数组数据")
        }
        this.urls = urls
    }

    async start(): Promise<(Blob|undefined)[]> {
        const tasks = []
        for (const url of this.urls) {
            tasks.push(this.getUrlData(url))
        }
        return Promise.all(tasks)
    }

    async getUrlData(url: string): Promise<Blob|undefined> {
        const hash = await hashString(url)
        const fileObj = file(hash)
        const data = await fileObj.read()
        if (data.size) {
            return data
        }
        const getData = await this.download(url)
        if (!getData) {
            return undefined
        }
        fileObj.write(getData)
        return getData
    }

    async download(url: string): Promise<Blob> {
        const response = await axios({
            url: url,
            method: 'get',
            responseType: 'blob',
            onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
                for (const fun of this.downloadProgressListener) {
                    fun(progressEvent)
                }
            }
        })

        const contentDisposition = response.headers['content-disposition']
        // 解析文件名
        if (contentDisposition) {
            const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition)
            if (matches != null && matches[1]) {
                const filename = matches[1].replace(/['"]/g, '')
                const contentType = response.headers['content-type'] ?? 'application/octet-stream'
                return new File([response.data], filename, { type: contentType })
            }
        }
        return response.data
    }

    onDownloadProgress(listen: (progressEvent: AxiosProgressEvent) => void) {
        this.downloadProgressListener.push(listen)
    }
}