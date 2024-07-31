import baseTask, { events, taskData } from "./baseTask"
import tempDataClass from "../replace/tempData"

export default class fileTask extends baseTask {
    files: Blob[]

    constructor(items: Blob|Blob[], tempData: tempDataClass|Object, events: Partial<events>) {
        super(tempData, events)
        switch (true) {
            case items instanceof Blob:
                this.files = [items as Blob]
                break;
            case items instanceof Array:
                this.files = items
                break;
            default:
                throw new Error("缺少文件或文件数据类型错误")
        }
    }

    getData(): taskData {
        const data = super.getData()
        data.files = this.files
        return data
    }
}