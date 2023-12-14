import axios from "axios"
import db from "../db/index.js"



export default class urlDownloadTask {
    urls

    constructor(urls) {
        if (urls.constructor !== Array) {
            throw new Error("不是可用的链接数组数据")
        }
        this.urls = urls
    }

    async start() {
        const awaits = []
        for (const url of this.urls) {
            awaits.push(this.getUrlData(url))
        }
        return Promise.all(awaits)
    }

    async getUrlData(url) {
        const data = await db.getDataByKey(url)
        if (data && data.data) {
            return data.data
        }
        const getData = await this.download(url)
        if (!getData) {
            return null
        }
        db.putData({
            url: url,
            data: getData,
        })
        return getData
    }

    async download(url){
        const response = await axios({
            url:url,
            method: 'get',
            responseType: 'blob',
            onDownloadProgress: this.onDownloadProgress
        })
        return response.data
    }

    onDownloadProgress(progressEvent) {}
}