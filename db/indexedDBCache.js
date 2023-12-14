export default class indexedDBCache {
    _initFinishCallBackFuns=[];
    _isInitFinish = false;

    // 构造函数
    constructor() {
      this._db = null //数据库
      this._transaction = null //事务
      this._request = null
      this._dbName = 'file' //数据库名
      this._cacheTableName = 'templates' //表名
      this._dbversion = 1 //数据库版本 
    }

    initDB() {
        return new Promise((resolve, reject) => {
            this._request = indexedDB.open(this._dbName, this._dbversion) // 打开数据库
            // 数据库初始化成功
            this._request.onsuccess = (event) => {
                this._db = this._request.result
                this._isInitFinish = true
                for (const fun of this._initFinishCallBackFuns) {
                    fun()
                }
                resolve(event)
            }
            // 数据库初始化失败
            this._request.onerror = (event) => {
                console.error(event)
                reject(event)
            }
            // 数据库初次创建或更新时会触发
            this._request.onupgradeneeded = (event) => {
                let db = this._request.result
                if (!db.objectStoreNames.contains(this._cacheTableName)) {
                    db.createObjectStore(this._cacheTableName, {
                        keyPath: 'url', // 设置主键
                    })
                }
                resolve(event)
            }
        })
    }

    async awaitInit() {
        await new Promise((resolve, reject) =>{
            this._initFinishCallBackFuns.push(()=>{
                resolve()
            })
        })
    }

    closeDB() {
        this._db.close()
    }

    async store(mode) {
        if (!this._isInitFinish) {
             await this.awaitInit()
        }
        const transaction = this._db.transaction(this._cacheTableName, mode)
        return transaction.objectStore(this._cacheTableName)
    }

    /**
     * @description : 更新数据
     * @param        {Object} params 添加到数据库中的数据 { imageName: 文件名, image: base64格式图片 }
     * @return       {*}
     */
    putData(params) {
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
    getDataByKey(key) {
        return new Promise(async (resolve, reject) => {
            // 通过主键读取数据
            const request =(await this.store()).get(key)
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

    // 清空数据库数据
    clearDB() {
        return new Promise(async(resolve, reject) => {
            const response = (await this.store('readwrite')).clear()
            // 操作成功
            response.onsuccss = (event) => {
                resolve(event)
            }
            // 操作失败
            response.onerror = (event) => {
                reject(event)
            }
        })
    }

  }