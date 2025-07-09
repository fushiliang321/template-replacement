
type templateData<T> = {
    url: string
    data: T
}

export default class indexedDBCache {
    _initFinishCallBackFuns?: Function[] = [] //初始化完成回调
    _isInitFinish: boolean = false  //是否初始化完成

    _db?: IDBDatabase //数据库
    _dbName: string = 'template_replacement' //数据库名
    _dbversion: number  = 1 //数据库版本
    _cacheTableName: string = 'templates' //表名
    _tableMap: any = {} //表配置


    // 构造函数
    constructor() {
        this.initDB()
    }

    initDB(): Promise<any> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this._dbName, this._dbversion) // 打开数据库
            // 数据库初始化成功
            request.onsuccess = (event) => {
                this._db = request.result
                this._isInitFinish = true
                if (this._initFinishCallBackFuns) {
                    try {
                        for (const fun of this._initFinishCallBackFuns) {
                            fun()
                        }
                    } catch (error) {
                    }
                    this._initFinishCallBackFuns = undefined
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
                if (!db.objectStoreNames.contains(this._cacheTableName)) {
                    db.createObjectStore(this._cacheTableName, {
                        keyPath: 'url', // 设置主键
                    })
                }
                resolve(event)
            }
        })
    }

    async awaitInit(): Promise<void> {
        if(this._isInitFinish || !this._initFinishCallBackFuns) {
            return
        }
        await new Promise((resolve, reject) => {
            this._initFinishCallBackFuns?.push(resolve)
        })
    }

    closeDB(): void {
        this._db?.close()
    }

    async store(mode?: IDBTransactionMode): Promise<IDBObjectStore> {
        await this.awaitInit()
        const db = this._db as IDBDatabase
        const transaction = db.transaction(this._cacheTableName, mode)
        return transaction.objectStore(this._cacheTableName)
    }

    /**
     * @description : 更新数据
     * @param        {Object} params 添加到数据库中的数据 { url: 文件地址, data: 文件blob }
     * @return       {*}
     */
    putData<T>(params: templateData<T>): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const response = (await this.store('readwrite')).put(params)
            // 操作成功
            response.onsuccess = (event) => {
                resolve(event)
            }
            // 操作失败
            response.onerror = (event) => {
                reject(event)
            }
        })
    }

    // 通过主键读取数据
    getDataByKey<T>(key: string): Promise<templateData<T>> {
        return new Promise(async (resolve, reject) => {
            // 通过主键读取数据
            const request = (await this.store()).get(key)
            // 操作成功
            request.onsuccess = () => {
                resolve(request.result)
            }
            // 操作失败
            request.onerror = (event) => {
                reject(event)
            }
        })
    }

    // 通过主键移除数据
    deleteDataByKey<T>(key: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            // 通过主键读取数据
            const request = (await this.store()).delete(key)
            // 操作成功
            request.onsuccess = () => {
                resolve()
            }
            // 操作失败
            request.onerror = (event) => {
                reject(event)
            }
        })
    }

    // 清空数据库数据
    clearDB(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const response = (await this.store('readwrite')).clear()
            // 操作成功
            response.onsuccess = (event) => {
                resolve(event)
            }
            // 操作失败
            response.onerror = (event) => {
                reject(event)
            }
        })
    }

}