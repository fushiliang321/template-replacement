class l {
  //表配置
  // 构造函数
  constructor() {
    this._initFinishCallBackFuns = [], this._isInitFinish = !1, this._dbName = "template_replacement", this._dbversion = 1, this._cacheTableName = "templates", this._tableMap = {}, this.initDB();
  }
  initDB() {
    return new Promise((e, a) => {
      const s = indexedDB.open(this._dbName, this._dbversion);
      s.onsuccess = (t) => {
        if (this._db = s.result, this._isInitFinish = !0, this._initFinishCallBackFuns) {
          try {
            for (const i of this._initFinishCallBackFuns)
              i();
          } catch {
          }
          this._initFinishCallBackFuns = void 0;
        }
        e(t);
      }, s.onerror = (t) => {
        console.error(t), a(t);
      }, s.onupgradeneeded = (t) => {
        let i = s.result;
        i.objectStoreNames.contains(this._cacheTableName) || i.createObjectStore(this._cacheTableName, {
          keyPath: "url"
          // 设置主键
        }), e(t);
      };
    });
  }
  async awaitInit() {
    this._isInitFinish || !this._initFinishCallBackFuns || await new Promise((e, a) => {
      this._initFinishCallBackFuns?.push(e);
    });
  }
  closeDB() {
    this._db?.close();
  }
  async store(e) {
    return await this.awaitInit(), this._db.transaction(this._cacheTableName, e).objectStore(this._cacheTableName);
  }
  /**
   * @description : 更新数据
   * @param        {Object} params 添加到数据库中的数据 { url: 文件地址, data: 文件blob }
   * @return       {*}
   */
  putData(e) {
    return new Promise(async (a, s) => {
      const t = (await this.store("readwrite")).put(e);
      t.onsuccess = (i) => {
        a(i);
      }, t.onerror = (i) => {
        s(i);
      };
    });
  }
  // 通过主键读取数据
  getDataByKey(e) {
    return new Promise(async (a, s) => {
      const t = (await this.store()).get(e);
      t.onsuccess = () => {
        a(t.result);
      }, t.onerror = (i) => {
        s(i);
      };
    });
  }
  // 通过主键移除数据
  deleteDataByKey(e) {
    return new Promise(async (a, s) => {
      const t = (await this.store()).delete(e);
      t.onsuccess = () => {
        a();
      }, t.onerror = (i) => {
        s(i);
      };
    });
  }
  // 清空数据库数据
  clearDB() {
    return new Promise(async (e, a) => {
      const s = (await this.store("readwrite")).clear();
      s.onsuccess = (t) => {
        e(t);
      }, s.onerror = (t) => {
        a(t);
      };
    });
  }
}
new l();
var u = /* @__PURE__ */ ((c) => (c.word = "word", c.excel = "excel", c.unknown = "unknown", c))(u || {});
class d {
  #e = [];
  #t;
  constructor(e) {
    this.#t = e;
  }
  addTempFile(e) {
    this.#e.push(e);
  }
  clear() {
    this.#e.length = 0;
  }
  async extractVariables(e) {
    e || (e = this.#e);
    const a = {}, s = [];
    for (const t of e)
      s.push(new Promise(async (i, n) => {
        const r = await t.getBuffer();
        r && (t.isDecode || await t.type() !== u.unknown) && (a[t.name] = await this.#t.extract_one_file_variable_names(r, t.isDecode)), i();
      }));
    return await Promise.all(s), a;
  }
  async extractMedias(e) {
    e || (e = this.#e);
    const a = {}, s = [];
    for (const t of e)
      s.push(new Promise(async (i, n) => {
        const r = await t.getBuffer();
        if (r && (t.isDecode || await t.type() !== u.unknown)) {
          let o = await this.#t.extract_one_file_medias(r, t.isDecode);
          a[t.name] = [], o && Array.isArray(o) && o.forEach((h) => {
            h.id && h.data && a[t.name].push({
              id: h.id,
              data: new Uint8Array(h.data)
            });
          });
        }
        i();
      }));
    return await Promise.all(s), a;
  }
  async handle(e, a, s = !1) {
    return [];
  }
  async sign(e) {
    return "";
  }
  async execute(e, a) {
    a || (a = this.#e);
    const s = [];
    for (const n of a)
      s.push(n.getBuffer());
    await Promise.all(s);
    const t = {
      //需要解密的文件
      decode: {
        names: [],
        uint8Arrays: []
      },
      //不需要解密的文件
      noDecode: {
        names: [],
        uint8Arrays: []
      }
    };
    for (const n of a)
      n.uint8Array && (n.isDecode ? (t.decode.names.push(n.name), t.decode.uint8Arrays.push(n.uint8Array)) : (t.noDecode.names.push(n.name), t.noDecode.uint8Arrays.push(n.uint8Array)));
    const i = await Promise.all([
      this._execute(e, t.noDecode.names, t.noDecode.uint8Arrays, !1),
      this._execute(e, t.decode.names, t.decode.uint8Arrays, !0)
    ]);
    return {
      ...i[0],
      ...i[1]
    };
  }
  async _execute(e, a, s, t = !1) {
    const i = {};
    return s.length && (await this.handle(e, s, t)).forEach((r, o) => {
      r.length && (i[a[o]] = r);
    }), i;
  }
  async fileEncrypt(e) {
    return await this.#t.file_encrypt(e);
  }
  async filesEncrypt(e) {
    return await this.#t.files_encrypt(e);
  }
}
class _ {
  constructor(e, a) {
    this.awaitInit = e, this.module = a;
  }
  async await() {
    return await this.awaitInit, this;
  }
  async add_template(e, a) {
    return await this.awaitInit, this.module.add_template(e, a);
  }
  async add_media(e) {
    return await this.awaitInit, this.module.add_media(e);
  }
  async extract_one_file_variable_names(e, a) {
    return await this.awaitInit, this.module.extract_one_file_variable_names(e, a);
  }
  async extract_variable_names(e, a) {
    return await this.awaitInit, this.module.extract_variable_names(e, a);
  }
  async extract_one_file_medias(e, a) {
    return await this.awaitInit, this.module.extract_one_file_medias(e, a);
  }
  async extract_medias(e, a) {
    return await this.awaitInit, this.module.extract_medias(e, a);
  }
  async file_encrypt(e) {
    return await this.awaitInit, this.module.file_encrypt(e);
  }
  async files_encrypt(e) {
    return await this.awaitInit, this.module.files_encrypt(e);
  }
}
export {
  d as B,
  _ as b
};
