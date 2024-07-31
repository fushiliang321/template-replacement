import { generateId } from "../helper/index";
import taskExecute from "../task/taskExecute";
import progress, { status } from "../task/progress";
import { encode } from '../office/xml'
import image from "../replace/image";
import tempDataClass from "../replace/tempData"
import { taskData } from "../task/baseTask";
function tempDataEncode(tempData: any): tempDataClass {
  const textData = tempData.textData ?? null
  if (textData) {
    for (const key in textData) {
      if (textData[key] instanceof image) {
        continue
      }else if (textData[key] instanceof Object) {
        textData[key] = Object.assign(new image(textData[key].file), textData[key]);
      } else {
        textData[key] = encode(String(textData[key]))
      }
    }
  }
  return new tempDataClass(textData, tempData.mediaData ?? undefined)
}

addEventListener('message', async event => {
  const data = event.data as taskData

  if (data.taskId === undefined) {
    data.taskId = generateId()
  }

  const tempData = tempDataEncode(data.tempData)

  const tasks = []

  if (data.urls && data.urls.length) {
    for (const urlObj of data.urls) {
      const task = new taskExecute(data.taskId, urlObj.url, undefined, tempData, data.eventsMonitorStatus)
      tasks.push(task.execute())
    }
  }

  if (data.files && data.files.length) {
    for (const file of data.files) {
      const task = new taskExecute(data.taskId, (file as File)?.name??'', file, tempData, data.eventsMonitorStatus)
      tasks.push(task.execute())
    }
  }

  if (!tasks.length || !data.eventsMonitorStatus.onFinishAll) {
    return
  }

  const progressAll = await Promise.all(tasks)
  const finishStatusCount = {
    success: 0,
    total: 0
  } //完成状态统计

  const resData:Record<string, any> = {}
  for (const progressItem of progressAll) {
    finishStatusCount.total++
    if (!progressItem || progressItem.error) {
      continue
    }
    finishStatusCount.success++
    resData[progressItem.key] = progressItem.data
  }
  const p = new progress(data.taskId, '', status.finishAll, Number((100 * finishStatusCount.success / finishStatusCount.total).toFixed(2)))
  p.setData(resData)
  postMessage(p)
})

export default {}