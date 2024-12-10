import baseTask, { events, taskData } from "./baseTask";
import urlTaskItem from "./urlTaskItem";
import tempDataClass from "../replace/tempData"

type items = string|string[]|urlTaskItem|urlTaskItem[]

export default class urlTask extends baseTask {
    urlObjs: urlTaskItem[] = []

    constructor(items: items, tempData: tempDataClass|Object, events: Partial<events>) {
        super(tempData, events)
        if (!this.addUrl(items)) {
            if (!items || !Array.isArray(items) || items.length === 0) {
                throw new Error("缺少链接或链接数据类型错误")
            }
            for (const item of items) {
                if (!this.addUrl(item)) {
                    throw new Error("链接数据类型错误")
                }
            }
        }
    }

    addUrl(url: any): boolean {
        switch (true) {
            case typeof url === 'string':
                this.urlObjs.push(new urlTaskItem(url as string))
                break;
            case url instanceof urlTaskItem:
                this.urlObjs.push(url)
                break;
            default:
                return false
        }
        return true
    }

    getData(): taskData {
        const data = super.getData()
        data.urls = this.urlObjs
        return data
    }
}