// import workerDispatch from './worker/workerDispatch'
import workerDispatch from './worker/dist/index.js'
import progress, { status } from './task/progress'
import { generateId, splitArrayIntoChunks } from './helper/index'
import fileTask from './task/fileTask'
import urlTask from './task/urlTask'
import { eventNames, taskData } from './task/baseTask'
import workerClass from './worker/workerDispatch'

type chunkProgress = {
  status: status,
  result?: any
}

const worker: workerClass = new workerDispatch()
const taskMap: Record<string, urlTask|fileTask> = {}
const taskChunksMap: Record<string, string> = {}
const taskChunksList: Record<string, Record<string, chunkProgress>> = {}

const statusCallMethods: Record<status,string> = {
  [status.unplayed]: 'onPlayed',
  [status.downloading]: 'onDownloading',
  [status.running]: 'onRunning',
  [status.finish]: 'onFinish',
  [status.finishAll]: 'onFinishAll',
  [status.error]: 'onError'
}

function callMethod(instance: any, methodName: string, args: any[]): any {
  if (typeof instance[methodName] === 'function') {
    return instance[methodName](...args)
  }
}

function taskProgressChange(progress: progress) {
  if (taskMap[progress.taskId]) {
    //普通任务
    const task = taskMap[progress.taskId]
    if (progress.status === status.finishAll) {
      delete taskMap[progress.taskId]
    }
    const callFun: string = statusCallMethods[progress.status]
    if (!callFun) {
      return
    }
    callMethod(task, callFun, [progress])
    return
  }
  const taskId = taskChunksMap[progress.taskId]
  if (!taskId){
    //任务不存在
    return
  }
  //分片任务
  const chunkTaskId = progress.taskId
  taskChunksList[taskId][chunkTaskId].status = progress.status
  progress.taskId = taskId
  if (progress.status === status.finishAll) {
    //一个分片完成不算全部完成
    delete taskChunksMap[progress.taskId]
    taskChunksList[taskId][chunkTaskId].result = progress.data
    for (const key in taskChunksList[taskId]) {
      if (taskChunksList[taskId][key].status !== status.finishAll) {
        //有分片没完成
        progress.status = status.finish
        return
      }
    }
    //分片全部完成，整合任务结果
    let results: Record<string, any> = {}
    for (const key in taskChunksList[taskId]) {
      results = {
        ...results,
        ...taskChunksList[taskId][key].result,
      }
    }
    delete taskChunksList[taskId]
    progress.data = results
  }
  return taskProgressChange(progress)
}

worker.addListener(event => {
  const progress = event.data as progress
  if (!progress.taskId) {
    return
  }
  taskProgressChange(progress)
})

function chunkTask(data: taskData, key: keyof taskData) {
  const value = data[key]
  if (!value || !Array.isArray(value) || value.length <= 20) {
    return
  }
  const chunkSize = Math.ceil(value.length / worker.num)
  //分片最少20个
  const chunks = splitArrayIntoChunks(value, chunkSize < 20 ? 20 : chunkSize)
  if (chunks.length <= 1) {
    return
  }
  
  //分片处理
  for (const i in chunks) {
    const taskData: taskData = {
      taskId: 'chunk_' + key + '_' + i + '_' + data.taskId,
      tempData: data.tempData,
      eventsMonitorStatus: data.eventsMonitorStatus
    }
    taskData[key] = chunks[i]
    if (!taskChunksList.hasOwnProperty(data.taskId)) {
      taskChunksList[data.taskId] = {}
    }
    taskChunksList[data.taskId][taskData.taskId] = {
      status: status.unplayed
    }
    taskChunksMap[taskData.taskId] = data.taskId
    worker.postMessage(taskData)
  }
  delete data[key]
}

export async function addTask(taskData: urlTask|fileTask) {
  const data = taskData.getData()

  if (!data.files && !data.urls) {
    throw new Error('没有可以处理的任务数据')
  }

  if (!data.taskId) {
    data.taskId = generateId()
  }
  
  let result: Promise<progress>|undefined

  let hasMonitorEvent = false //是否有监听事件
  for (const key in data.eventsMonitorStatus) {
    if (data.eventsMonitorStatus[key as eventNames]) {
      hasMonitorEvent = true
      break
    }
  }
  if (!hasMonitorEvent) {
    //都没设置监听事件，就默认监听全部完成和失败事件
    result = new Promise((resolve, reject) => {
      taskData.onFinishAll = (progress: progress) => {
        resolve(progress)
      }
      taskData.onError = (progress: progress) => {
        reject(progress)
      }
    })
    data.eventsMonitorStatus.onFinishAll = true
    data.eventsMonitorStatus.onError = true
  }

  taskMap[data.taskId] = taskData

  chunkTask(data, 'urls')
  chunkTask(data, 'files')

  if (data.files || data.urls) {
    worker.postMessage(data)
  }
  return await result
}

export function addListener(fun: (event: MessageEvent)=>void) {
  worker.addListener(fun)
}

export function removeListener(fun: (event: MessageEvent)=>void) {
  worker.removeListener(fun)
}