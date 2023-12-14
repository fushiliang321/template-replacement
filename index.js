import workerDispatch from './worker/workerDispatch'
import { status } from './task/progress.js'
import { generateId } from './helper'

const worker = new workerDispatch(1)
const taskMap = {}

worker.addListener(event=> {
  if(!event.data.taskId || !taskMap.hasOwnProperty(event.data.taskId) || !taskMap[event.data.taskId].task) {
    return;
  }
  const task = taskMap[event.data.taskId].task
  const progress = event.data
  switch(progress.status) {
    case status.unplayed:
      task.onPlayed && task.onPlayed(progress)
      break;
    case status.downloading:
      task.onDownloading && task.onDownloading(progress)
      break;
    case status.running:
      task.onRunning && task.onRunning(progress)
      break;
    case status.finish:
      task.onFinish && task.onFinish(progress)
      break;
    case status.finishAll:
      task.onFinishAll && task.onFinishAll(progress)
      if (taskMap[event.data.taskId].resolve) {
        taskMap[event.data.taskId].resolve(progress)
      }
      break;
    case status.error:
      task.onFinish && task.onError(progress)
      if (taskMap[event.data.taskId].reject) {
        taskMap[event.data.taskId].reject(progress)
      }
      break;
  }
})

const eventNames = ['onPlayed','onDownloading','onRunning','onFinish','onFinishAll','onError'] 

export async function addTask(taskData) {
  let data = taskData
  let targetOrigin
  
  if (taskData.getData && taskData.getTargetOrigin) {
     data = await taskData.getData()
     targetOrigin = await taskData.getTargetOrigin()
  }

  let hasMonitorEvent = false //是否有监听事件
  for (const eventName of eventNames) {
    if (data[eventName]) {
      hasMonitorEvent = true
    }
  }

  if (!data.taskId) {
    data.taskId = generateId()
  }

  const taskId = data.taskId

  const task = {
    task:taskData,
    resolve:null,
    reject:null
  }
  taskMap[taskId] = task
  if(hasMonitorEvent) {
    worker.postMessage(data,targetOrigin)
    return
  }
  data.onFinishAll = true
  data.onError = true
  worker.postMessage(data,targetOrigin)

  return await new Promise((resolve,reject)=>{
    task.resolve = resolve
    task.reject = reject
  })
}

export function addListener(fun) {
  worker.addListener(fun)
}

export function removeListener(fun){
  worker.removeListener(fun)
}