type templateData<T> = {
  key: string // 主键
  data: T // 文件数据
}

export default class indexedDBCache {
  #initFinishCallBackFuns?: ((value: void) => void)[] = [] //初始化完成回调
  #isInitFinish: boolean = false //是否初始化完成

  #db?: IDBDatabase //数据库
  #dbName: string = 'template_replacement_db' //数据库名
  #dbversion: number = 1 //数据库版本
  #cacheTableName: string = 'template_files' //表名

  #init: Promise<unknown> | undefined

  // 构造函数
  constructor() {
    this.#initDB()
  }

  #initDB(): Promise<unknown> {
    if (this.#init) {
      return this.#init
    }
    this.#init = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.#dbName, this.#dbversion) // 打开数据库
      // 数据库初始化成功
      request.onsuccess = (event) => {
        this.#db = request.result
        this.#isInitFinish = true
        if (this.#initFinishCallBackFuns) {
          try {
            for (const fun of this.#initFinishCallBackFuns) {
              fun()
            }
          } catch (error) { }
          this.#initFinishCallBackFuns = undefined
        }
        resolve(event)
      }
      // 数据库初始化失败
      request.onerror = (event) => {
        console.error(event)
        reject(event)
      }
      // 数据库初次创建或更新时会触发
      request.onupgradeneeded = (event) => {
        let db = request.result
        if (!db.objectStoreNames.contains(this.#cacheTableName)) {
          db.createObjectStore(this.#cacheTableName, {
            keyPath: 'key', // 设置主键
          })
        }
        resolve(event)
      }
    })

    return this.#init
  }

  async awaitInit(): Promise<void> {
    if (this.#isInitFinish || !this.#initFinishCallBackFuns) {
      return
    }
    await new Promise((resolve, reject) => {
      this.#initFinishCallBackFuns?.push(resolve)
    })
  }

  closeDB(): void {
    this.#db?.close()
  }

  async store(mode?: IDBTransactionMode): Promise<IDBObjectStore> {
    await this.awaitInit()
    const db = this.#db as IDBDatabase
    const transaction = db.transaction(this.#cacheTableName, mode)
    return transaction.objectStore(this.#cacheTableName)
  }

  /**
   * @description : 更新数据
   * @param        {templateData} params 添加到数据库中的数据 { key: 文件key, data: 文件blob }
   * @return       {*}
   */
  putData<T>(params: templateData<T>): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.store('readwrite')
        .then((store) => {
          const response = store.put(params)
          // 操作成功
          response.onsuccess = (event) => {
            resolve(event)
          }
          // 操作失败
          response.onerror = (event) => {
            reject(event)
          }
        })
        .catch(reject)
    })
  }

  // 通过主键读取数据
  getDataByKey<T>(key: string): Promise<templateData<T>> {
    return new Promise((resolve, reject) => {
      this.store()
        .then((store) => {
          // 通过主键读取数据
          const request = store.get(key)
          // 操作成功
          request.onsuccess = () => {
            resolve(request.result)
          }
          // 操作失败
          request.onerror = (event) => {
            reject(event)
          }
        })
        .catch(reject)
    })
  }

  // 通过主键移除数据
  deleteDataByKey(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.store()
        .then((store) => {
          // 通过主键读取数据
          const request = store.delete(key)
          // 操作成功
          request.onsuccess = () => {
            resolve(request.result)
          }
          // 操作失败
          request.onerror = (event) => {
            reject(event)
          }
        })
        .catch(reject)
    })
  }

  // 清空数据库数据
  clearDB(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.store('readwrite')
        .then((store) => {
          const response = store.clear()
          // 操作成功
          response.onsuccess = (event) => {
            resolve(event)
          }
          // 操作失败
          response.onerror = (event) => {
            reject(event)
          }
        })
        .catch(reject)
    })
  }
}
