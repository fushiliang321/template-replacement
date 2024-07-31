import baseTask, { events, taskData } from "./baseTask";
import urlTaskItem from "./urlTaskItem";
import tempDataClass from "../replace/tempData"

type items = string|string[]|urlTaskItem|urlTaskItem[]

export default class urlTask extends baseTask {
    urlObjs: urlTaskItem[] = []

    constructor(items: items, tempData: tempDataClass|Object, events: Partial<events>) {
        super(tempData, events)
        switch (true) {
            case items instanceof String:
                this.urlObjs.push(new urlTaskItem(items as string))
                break;
            case items instanceof urlTaskItem:
                this.urlObjs.push(items)
                break;
            case items instanceof Array:
                for (const item of items) {
                    switch (true) {
                        case item instanceof String:
                            this.urlObjs.push(new urlTaskItem(item as string))
                            break;
                        case item instanceof urlTaskItem:
                            this.urlObjs.push(item)
                            break;
                        default:
                            throw new Error("链接数据类型错误")
                    }
                }
                break;
            default:
                throw new Error("缺少链接或链接数据类型错误")
        }
    }

    getData(): taskData {
        return {
            taskId: this.id,
            urls: this.urlObjs,
            tempData: JSON.parse(JSON.stringify(this.tempData)),
            eventsMonitorStatus: this.getEventsMonitorStatus()
        }
    }
}