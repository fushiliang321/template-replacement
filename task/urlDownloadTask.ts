import axios, { AxiosProgressEvent } from "axios"
import db from "../db/index"

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
        const data = await db.getDataByKey<Blob>(url)
        if (data && data.data) {
            return data.data
        }
        const getData = await this.download(url)
        if (!getData) {
            return undefined
        }
        db.putData<Blob>({
            url: url,
            data: getData,
        })
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
        return response.data
    }

    onDownloadProgress(listen: (progressEvent: AxiosProgressEvent) => void) {
        this.downloadProgressListener.push(listen)
    }
}