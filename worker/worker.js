import { generateId } from "../helper/index.js";
import taskExecute from "../task/taskExecute.js";
import progress, { status } from "../task/progress.js";
import { encode } from '../office/xml'
import image from "../replace/image";


async function tempDataEncode(tempData) {
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
  return {
    textData,
    mediaData: tempData.mediaData ?? null,
  }
}

addEventListener('message', async event => {
  const { data } = event

  if (data.taskId === undefined) {
    data.taskId = generateId()
  }

  const tempData = await tempDataEncode(data.tempData)

  const awaits = []

  if (data.urls && data.urls.length) {
    for (const urlObj of data.urls) {
      const task = new taskExecute(data.taskId, urlObj.url, null, tempData, data.eventsMonitorStatus)
      awaits.push(task.execute())
    }
  }

  if (data.fileBuffers && data.fileBuffers.length) {
    for (const file of data.fileBuffers) {
      const task = new taskExecute(data.taskId, file.name, file.buffer, tempData, data.eventsMonitorStatus)
      awaits.push(task.execute())
    }
  }

  if (data.files && data.files.length) {
    for (const file of data.files) {
      const task = new taskExecute(data.taskId, file.name, file, tempData, data.eventsMonitorStatus)
      awaits.push(task.execute())
    }
  }

  if (!awaits.length || !data.eventsMonitorStatus.onFinishAll) {
    return
  }

  const progressAll = await Promise.all(awaits)
  const finishStatusCount = {
    success: 0,
    total: 0
  } //完成状态统计

  const resData = {}
  for (const progressItem of progressAll) {
    finishStatusCount.total++
    if (!progressItem || progressItem.error) {
      continue
    }
    finishStatusCount.success++
    resData[progressItem.key] = progressItem.data
  }
  const p = new progress(data.taskId, '', status.finishAll, (100 * finishStatusCount.success / finishStatusCount.total).toFixed(2))
  p.setData(resData)
  postMessage(p)
})
export default {}