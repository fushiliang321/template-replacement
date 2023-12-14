import baseTask from "./baseTask.js";
import urlTaskItem from "./urlTaskItem.js";

export default class urlTask extends baseTask{
    urlObjs = null

    async getUrlObjs() {
        if (this.urlObjs === null) {
            this.urlObjs = []
            for (const url of this.items) {
                this.urlObjs.push(new urlTaskItem(url))
            }
        }
        return this.urlObjs
    }

    async getData() {
        const urlObjs = await this.getUrlObjs()
        return {
            taskId:this.id,
            urls:urlObjs,
            tempData:JSON.parse(JSON.stringify(this.tempData)),
            eventsMonitorStatus:this.getEventsMonitorStatus()
        }
    }
}