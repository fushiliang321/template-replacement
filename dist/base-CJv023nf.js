class f {
  // 构造函数
  constructor() {
    this._initFinishCallBackFuns = [], this._isInitFinish = !1, this._dbName = "template_replacement_db", this._dbversion = 1, this._cacheTableName = "template_files", this._tableMap = {}, this.initDB();
  }
  initDB() {
    return this._init ? this._init : (this._init = new Promise((e, a) => {
      const i = indexedDB.open(this._dbName, this._dbversion);
      i.onsuccess = (t) => {
        if (this._db = i.result, this._isInitFinish = !0, this._initFinishCallBackFuns) {
          try {
            for (const s of this._initFinishCallBackFuns)
              s();
          } catch {
          }
          this._initFinishCallBackFuns = void 0;
        }
        e(t);
      }, i.onerror = (t) => {
        console.error(t), a(t);
      }, i.onupgradeneeded = (t) => {
        let s = i.result;
        s.objectStoreNames.contains(this._cacheTableName) || s.createObjectStore(this._cacheTableName, {
          keyPath: "key"
          // 设置主键
        }), e(t);
      };
    }), this._init);
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
   * @param        {templateData} params 添加到数据库中的数据 { key: 文件key, data: 文件blob }
   * @return       {*}
   */
  putData(e) {
    return new Promise((a, i) => {
      this.store("readwrite").then((t) => {
        const s = t.put(e);
        s.onsuccess = (n) => {
          a(n);
        }, s.onerror = (n) => {
          i(n);
        };
      }).catch(i);
    });
  }
  // 通过主键读取数据
  getDataByKey(e) {
    return new Promise((a, i) => {
      this.store().then((t) => {
        const s = t.get(e);
        s.onsuccess = () => {
          a(s.result);
        }, s.onerror = (n) => {
          i(n);
        };
      }).catch(i);
    });
  }
  // 通过主键移除数据
  deleteDataByKey(e) {
    return new Promise((a, i) => {
      this.store().then((t) => {
        const s = t.delete(e);
        s.onsuccess = () => {
          a(s.result);
        }, s.onerror = (n) => {
          i(n);
        };
      }).catch(i);
    });
  }
  // 清空数据库数据
  clearDB() {
    return new Promise((e, a) => {
      this.store("readwrite").then((i) => {
        const t = i.clear();
        t.onsuccess = (s) => {
          e(s);
        }, t.onerror = (s) => {
          a(s);
        };
      }).catch(a);
    });
  }
}
new f();
var l = /* @__PURE__ */ ((c) => (c.word = "word", c.excel = "excel", c.unknown = "unknown", c))(l || {});
class m {
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
    const a = {}, i = [];
    for (const t of e)
      i.push(new Promise(async (s) => {
        try {
          const n = await t.getBuffer();
          n && (t.isDecode || await t.type() !== l.unknown) && (a[t.name] = await this.#t.extract_one_file_variable_names(n, t.isDecode)), s();
        } catch (n) {
          console.error(n);
        }
      }));
    return await Promise.all(i), a;
  }
  async extractMedias(e) {
    e || (e = this.#e);
    const a = {}, i = [];
    for (const t of e)
      i.push(new Promise(async (s) => {
        try {
          const n = await t.getBuffer();
          if (n && (t.isDecode || await t.type() !== l.unknown)) {
            let r = await this.#t.extract_one_file_medias(n, t.isDecode);
            if (a[t.name] = [], r && Array.isArray(r))
              for (const o of r)
                o.id && o.data && a[t.name].push({
                  id: o.id,
                  data: new Uint8Array(o.data)
                });
          }
          s();
        } catch (n) {
          console.error(n);
        }
      }));
    return await Promise.all(i), a;
  }
  async handle(e, a, i = !1) {
    return [];
  }
  async handleMultipleParams(e, a, i = !1) {
    return [];
  }
  async sign(e) {
    return "";
  }
  async execute(e, a) {
    a || (a = this.#e);
    const i = [];
    for (const n of a)
      i.push(n.getBuffer());
    await Promise.all(i);
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
    const s = await Promise.all([
      this._execute(e, t.noDecode.names, t.noDecode.uint8Arrays, !1),
      this._execute(e, t.decode.names, t.decode.uint8Arrays, !0)
    ]);
    return {
      ...s[0],
      ...s[1]
    };
  }
  async _execute(e, a, i, t = !1) {
    const s = {};
    if (!i.length)
      return s;
    const n = await this.handle(e, i, t);
    for (let r = 0; r < n.length; r++) {
      const o = n[r];
      o.length && (s[a[r]] = o);
    }
    return s;
  }
  async executeMultipleParams(e, a) {
    a || (a = this.#e);
    const i = [];
    for (const r of a)
      i.push(r.getBuffer());
    await Promise.all(i);
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
    for (const r of a)
      r.uint8Array && (r.isDecode ? (t.decode.names.push(r.name), t.decode.uint8Arrays.push(r.uint8Array)) : (t.noDecode.names.push(r.name), t.noDecode.uint8Arrays.push(r.uint8Array)));
    const s = await Promise.all([
      this._executeMultipleParams(e, t.noDecode.names, t.noDecode.uint8Arrays, !1),
      this._executeMultipleParams(e, t.decode.names, t.decode.uint8Arrays, !0)
    ]), n = [];
    for (let r = 0; r < s[0].length; r++)
      n.push({ ...s[0][r], ...s[1][r] });
    return n;
  }
  async _executeMultipleParams(e, a, i, t = !1) {
    const s = Array(e.length);
    if (!i.length)
      return s;
    const n = await this.handleMultipleParams(e, i, t);
    let r = 0;
    for (let o = 0; o < e.length; o++) {
      const u = {};
      for (const d of a) {
        const h = n[r++];
        h.length && (u[d] = h);
      }
      s[o] = u;
    }
    return s;
  }
  fileEncrypt(e) {
    return this.#t.file_encrypt(e);
  }
  filesEncrypt(e) {
    return this.#t.files_encrypt(e);
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
  m as B,
  _ as b
};
