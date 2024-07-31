export enum status {
    unplayed = 0, //未开始
    downloading = 1, //下载中
    running = 2, //执行中
    finish = 3, //结束
    finishAll = 4, //全部结束
    error = -1, //执行出错
}

export default class progress {
    taskId: string
    key: string
    status: status //状态-1执行出错 0未开始 1下载中 2执行中 3结束 4全部结束
    error: any //错误数据
    progress: number //进度0-100
    data: any //进度数据

    constructor(taskId: string, key: string, status: status, progress: number = 0) {
        this.taskId = taskId
        this.key = key
        this.status = status ?? 0
        this.progress = progress ?? 0
    }

    setError(error: any) {
        this.error = error
    }

    setData(data: any) {
        this.data = data
    }
}