import { generateId } from "../helper/index.js";
import taskExecute from "../task/taskExecute.js";
import progress, { status } from "../task/progress.js";


addEventListener('message',async event => {
  const { data } = event
  if (data.taskId === undefined) {
    data.taskId = generateId()
  }

  const awaits = []

  if (data.urls && data.urls.length) {
    for (const urlObj of data.urls) {
      const task = new taskExecute(data.taskId, urlObj.url, null, data.tempData, data.eventsMonitorStatus)
      awaits.push(task.execute()) 
    }
  }

  if (data.fileBuffers && data.fileBuffers.length) {
    for (const file of data.fileBuffers) {
      const task = new taskExecute(data.taskId, file.name, file.buffer, data.tempData, data.eventsMonitorStatus)
      awaits.push(task.execute()) 
    }
  }

  if (!awaits.length || !data.eventsMonitorStatus.onFinishAll) {
    return
  }

  const progressAll = await Promise.all(awaits)
  const finishStatusCount = {
    success:0,
    total:0
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
  const p = new progress(data.taskId,'',status.finishAll,(100*finishStatusCount.success/finishStatusCount.total).toFixed(2))
  p.setData(resData)
  postMessage(p, Object.values(resData))
}) 
export default {}