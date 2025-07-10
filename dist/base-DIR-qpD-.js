var m = (n) => {
  throw TypeError(n);
};
var f = (n, e, t) => e.has(n) || m("Cannot " + t);
var c = (n, e, t) => (f(n, e, "read from private field"), t ? t.call(n) : e.get(n)), _ = (n, e, t) => e.has(n) ? m("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), y = (n, e, t, s) => (f(n, e, "write to private field"), s ? s.call(n, t) : e.set(n, t), t);
class p {
  //表配置
  // 构造函数
  constructor() {
    this._initFinishCallBackFuns = [], this._isInitFinish = !1, this._dbName = "template_replacement", this._dbversion = 1, this._cacheTableName = "templates", this._tableMap = {}, this.initDB();
  }
  initDB() {
    return new Promise((e, t) => {
      const s = indexedDB.open(this._dbName, this._dbversion);
      s.onsuccess = (a) => {
        if (this._db = s.result, this._isInitFinish = !0, this._initFinishCallBackFuns) {
          try {
            for (const i of this._initFinishCallBackFuns)
              i();
          } catch {
          }
          this._initFinishCallBackFuns = void 0;
        }
        e(a);
      }, s.onerror = (a) => {
        console.error(a), t(a);
      }, s.onupgradeneeded = (a) => {
        let i = s.result;
        i.objectStoreNames.contains(this._cacheTableName) || i.createObjectStore(this._cacheTableName, {
          keyPath: "url"
          // 设置主键
        }), e(a);
      };
    });
  }
  async awaitInit() {
    this._isInitFinish || !this._initFinishCallBackFuns || await new Promise((e, t) => {
      var s;
      (s = this._initFinishCallBackFuns) == null || s.push(e);
    });
  }
  closeDB() {
    var e;
    (e = this._db) == null || e.close();
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
    return new Promise(async (t, s) => {
      const a = (await this.store("readwrite")).put(e);
      a.onsuccess = (i) => {
        t(i);
      }, a.onerror = (i) => {
        s(i);
      };
    });
  }
  // 通过主键读取数据
  getDataByKey(e) {
    return new Promise(async (t, s) => {
      const a = (await this.store()).get(e);
      a.onsuccess = () => {
        t(a.result);
      }, a.onerror = (i) => {
        s(i);
      };
    });
  }
  // 通过主键移除数据
  deleteDataByKey(e) {
    return new Promise(async (t, s) => {
      const a = (await this.store()).delete(e);
      a.onsuccess = () => {
        t();
      }, a.onerror = (i) => {
        s(i);
      };
    });
  }
  // 清空数据库数据
  clearDB() {
    return new Promise(async (e, t) => {
      const s = (await this.store("readwrite")).clear();
      s.onsuccess = (a) => {
        e(a);
      }, s.onerror = (a) => {
        t(a);
      };
    });
  }
}
new p();
var w = /* @__PURE__ */ ((n) => (n.word = "word", n.excel = "excel", n.unknown = "unknown", n))(w || {}), h, u;
class D {
  constructor(e) {
    _(this, h, []);
    _(this, u);
    y(this, u, e);
  }
  addTempFile(e) {
    c(this, h).push(e);
  }
  clear() {
    c(this, h).length = 0;
  }
  async extractVariables(e) {
    e || (e = c(this, h));
    const t = {}, s = [];
    for (const a of e)
      s.push(new Promise(async (i, r) => {
        const o = await a.getBuffer();
        o && (a.isDecode || await a.type() !== w.unknown) && (t[a.name] = await c(this, u).extract_one_file_variable_names(o, a.isDecode)), i();
      }));
    return await Promise.all(s), t;
  }
  async extractMedias(e) {
    e || (e = c(this, h));
    const t = {}, s = [];
    for (const a of e)
      s.push(new Promise(async (i, r) => {
        const o = await a.getBuffer();
        if (o && (a.isDecode || await a.type() !== w.unknown)) {
          let l = await c(this, u).extract_one_file_medias(o, a.isDecode);
          t[a.name] = [], l && Array.isArray(l) && l.forEach((d) => {
            d.id && d.data && t[a.name].push({
              id: d.id,
              data: new Uint8Array(d.data)
            });
          });
        }
        i();
      }));
    return await Promise.all(s), t;
  }
  async handle(e, t, s = !1) {
    return [];
  }
  async sign(e) {
    return "";
  }
  async execute(e, t) {
    t || (t = c(this, h));
    const s = [];
    for (const r of t)
      s.push(r.getBuffer());
    await Promise.all(s);
    const a = {
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
    for (const r of t)
      r.uint8Array && (r.isDecode ? (a.decode.names.push(r.name), a.decode.uint8Arrays.push(r.uint8Array)) : (a.noDecode.names.push(r.name), a.noDecode.uint8Arrays.push(r.uint8Array)));
    const i = await Promise.all([
      this._execute(e, a.noDecode.names, a.noDecode.uint8Arrays, !1),
      this._execute(e, a.decode.names, a.decode.uint8Arrays, !0)
    ]);
    return {
      ...i[0],
      ...i[1]
    };
  }
  async _execute(e, t, s, a = !1) {
    const i = {};
    return s.length && (await this.handle(e, s, a)).forEach((o, l) => {
      o.length && (i[t[l]] = o);
    }), i;
  }
  async fileEncrypt(e) {
    return await c(this, u).file_encrypt(e);
  }
  async filesEncrypt(e) {
    return await c(this, u).files_encrypt(e);
  }
}
h = new WeakMap(), u = new WeakMap();
class x {
  constructor(e, t) {
    this.awaitInit = e, this.module = t;
  }
  async await() {
    return await this.awaitInit, this;
  }
  async add_template(e, t) {
    return await this.awaitInit, this.module.add_template(e, t);
  }
  async add_media(e) {
    return await this.awaitInit, this.module.add_media(e);
  }
  async extract_one_file_variable_names(e, t) {
    return await this.awaitInit, this.module.extract_one_file_variable_names(e, t);
  }
  async extract_variable_names(e, t) {
    return await this.awaitInit, this.module.extract_variable_names(e, t);
  }
  async extract_one_file_medias(e, t) {
    return await this.awaitInit, this.module.extract_one_file_medias(e, t);
  }
  async extract_medias(e, t) {
    return await this.awaitInit, this.module.extract_medias(e, t);
  }
  async file_encrypt(e) {
    return await this.awaitInit, this.module.file_encrypt(e);
  }
  async files_encrypt(e) {
    return await this.awaitInit, this.module.files_encrypt(e);
  }
}
export {
  D as B,
  x as b
};
