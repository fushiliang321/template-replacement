type templateData<T> = {
    key: string;
    data: T;
};
export default class indexedDBCache {
    #private;
    private _initFinishCallBackFuns?;
    private _db?;
    private _init;
    constructor();
    awaitInit(): Promise<void>;
    closeDB(): void;
    store(mode?: IDBTransactionMode): Promise<IDBObjectStore>;
    /**
     * @description : 更新数据
     * @param        {templateData} params 添加到数据库中的数据 { key: 文件key, data: 文件blob }
     * @return       {*}
     */
    putData<T>(params: templateData<T>): Promise<unknown>;
    getDataByKey<T>(key: string): Promise<templateData<T>>;
    deleteDataByKey(key: string): Promise<void>;
    clearDB(): Promise<unknown>;
}
export {};
