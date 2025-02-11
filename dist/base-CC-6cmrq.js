var m = (i) => {
  throw TypeError(i);
};
var f = (i, t, a) => t.has(i) || m("Cannot " + a);
var c = (i, t, a) => (f(i, t, "read from private field"), a ? a.call(i) : t.get(i)), _ = (i, t, a) => t.has(i) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, a), y = (i, t, a, e) => (f(i, t, "write to private field"), e ? e.call(i, a) : t.set(i, a), a);
class b {
  //表配置
  // 构造函数
  constructor() {
    this._initFinishCallBackFuns = [], this._isInitFinish = !1, this._dbName = "template_replacement", this._dbversion = 1, this._cacheTableName = "templates", this._tableMap = {}, this.initDB();
  }
  initDB() {
    return new Promise((t, a) => {
      const e = indexedDB.open(this._dbName, this._dbversion);
      e.onsuccess = (s) => {
        if (this._db = e.result, this._isInitFinish = !0, this._initFinishCallBackFuns) {
          try {
            for (const n of this._initFinishCallBackFuns)
              n();
          } catch {
          }
          this._initFinishCallBackFuns = void 0;
        }
        t(s);
      }, e.onerror = (s) => {
        console.error(s), a(s);
      }, e.onupgradeneeded = (s) => {
        let n = e.result;
        n.objectStoreNames.contains(this._cacheTableName) || n.createObjectStore(this._cacheTableName, {
          keyPath: "url"
          // 设置主键
        }), t(s);
      };
    });
  }
  async awaitInit() {
    this._isInitFinish || !this._initFinishCallBackFuns || await new Promise((t, a) => {
      var e;
      (e = this._initFinishCallBackFuns) == null || e.push(t);
    });
  }
  closeDB() {
    var t;
    (t = this._db) == null || t.close();
  }
  async store(t) {
    return await this.awaitInit(), this._db.transaction(this._cacheTableName, t).objectStore(this._cacheTableName);
  }
  /**
   * @description : 更新数据
   * @param        {Object} params 添加到数据库中的数据 { url: 文件地址, data: 文件blob }
   * @return       {*}
   */
  putData(t) {
    return new Promise(async (a, e) => {
      const s = (await this.store("readwrite")).put(t);
      s.onsuccess = (n) => {
        a(n);
      }, s.onerror = (n) => {
        e(n);
      };
    });
  }
  // 通过主键读取数据
  getDataByKey(t) {
    return new Promise(async (a, e) => {
      const s = (await this.store()).get(t);
      s.onsuccess = () => {
        a(s.result);
      }, s.onerror = (n) => {
        e(n);
      };
    });
  }
  // 清空数据库数据
  clearDB() {
    return new Promise(async (t, a) => {
      const e = (await this.store("readwrite")).clear();
      e.onsuccess = (s) => {
        t(s);
      }, e.onerror = (s) => {
        a(s);
      };
    });
  }
}
new b();
var w = /* @__PURE__ */ ((i) => (i.word = "word", i.excel = "excel", i.unknown = "unknown", i))(w || {}), o, u;
class x {
  constructor(t) {
    _(this, o, []);
    _(this, u);
    y(this, u, t);
  }
  addTempFile(t) {
    c(this, o).push(t);
  }
  clear() {
    c(this, o).length = 0;
  }
  async extractVariables(t) {
    t || (t = c(this, o));
    const a = {}, e = [];
    for (const s of t)
      e.push(new Promise(async (n, d) => {
        const r = await s.getBuffer();
        r && await s.type() !== w.unknown && (a[s.name] = await c(this, u).extract_one_file_variable_names(r)), n();
      }));
    return await Promise.all(e), a;
  }
  async extractMedias(t) {
    t || (t = c(this, o));
    const a = {}, e = [];
    for (const s of t)
      e.push(new Promise(async (n, d) => {
        const r = await s.getBuffer();
        if (r && await s.type() !== w.unknown) {
          let h = await c(this, u).extract_one_file_medias(r);
          a[s.name] = [], h && Array.isArray(h) && h.forEach((l) => {
            l.id && l.data && a[s.name].push({
              id: l.id,
              data: new Uint8Array(l.data)
            });
          });
        }
        n();
      }));
    return await Promise.all(e), a;
  }
  async handle(t, a) {
    return [];
  }
  async sign(t) {
    return "";
  }
  async execute(t, a) {
    a || (a = c(this, o));
    const e = {
      names: [],
      uint8Arrays: []
    }, s = [];
    for (const r of a)
      s.push(new Promise(async (h, l) => {
        h(r.getBuffer());
      }));
    await Promise.all(s);
    for (const r of a)
      r.uint8Array && (e.names.push(r.name), e.uint8Arrays.push(r.uint8Array));
    if (!e.uint8Arrays.length)
      return {};
    const n = await this.handle(t, e.uint8Arrays);
    e.uint8Arrays.length;
    const d = {};
    return n.forEach((r, h) => {
      r.length && (d[e.names[h]] = r);
    }), d;
  }
}
o = new WeakMap(), u = new WeakMap();
class B {
  constructor(t, a) {
    this.awaitInit = t, this.module = a;
  }
  async await() {
    return await this.awaitInit, this;
  }
  async add_template(t) {
    return await this.awaitInit, this.module.add_template(t);
  }
  async add_media(t) {
    return await this.awaitInit, this.module.add_media(t);
  }
  async extract_one_file_variable_names(t) {
    return await this.awaitInit, this.module.extract_one_file_variable_names(t);
  }
  async extract_variable_names(t) {
    return await this.awaitInit, this.module.extract_variable_names(t);
  }
  async extract_one_file_medias(t) {
    return await this.awaitInit, this.module.extract_one_file_medias(t);
  }
  async extract_medias(t) {
    return await this.awaitInit, this.module.extract_medias(t);
  }
}
export {
  x as B,
  B as b
};
