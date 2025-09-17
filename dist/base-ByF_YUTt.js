var w = (r) => {
  throw TypeError(r);
};
var y = (r, e, t) => e.has(r) || w("Cannot " + t);
var o = (r, e, t) => (y(r, e, "read from private field"), t ? t.call(r) : e.get(r)), m = (r, e, t) => e.has(r) ? w("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), p = (r, e, t, s) => (y(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t);
class b {
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
new b();
var f = /* @__PURE__ */ ((r) => (r.word = "word", r.excel = "excel", r.unknown = "unknown", r))(f || {}), l, h;
class P {
  constructor(e) {
    m(this, l, []);
    m(this, h);
    p(this, h, e);
  }
  addTempFile(e) {
    o(this, l).push(e);
  }
  clear() {
    o(this, l).length = 0;
  }
  async extractVariables(e) {
    e || (e = o(this, l));
    const t = {}, s = [];
    for (const a of e)
      s.push(new Promise(async (i, c) => {
        const n = await a.getBuffer();
        n && (a.isDecode || await a.type() !== f.unknown) && (t[a.name] = await o(this, h).extract_one_file_variable_names(n, a.isDecode)), i();
      }));
    return await Promise.all(s), t;
  }
  async extractMedias(e) {
    e || (e = o(this, l));
    const t = {}, s = [];
    for (const a of e)
      s.push(new Promise(async (i, c) => {
        const n = await a.getBuffer();
        if (n && (a.isDecode || await a.type() !== f.unknown)) {
          let u = await o(this, h).extract_one_file_medias(n, a.isDecode);
          if (t[a.name] = [], u && Array.isArray(u))
            for (const d of u)
              d.id && d.data && t[a.name].push({
                id: d.id,
                data: new Uint8Array(d.data)
              });
        }
        i();
      }));
    return await Promise.all(s), t;
  }
  async handle(e, t, s = !1) {
    return [];
  }
  async handleMultipleParams(e, t, s = !1) {
    return [];
  }
  async sign(e) {
    return "";
  }
  async execute(e, t) {
    t || (t = o(this, l));
    const s = [];
    for (const c of t)
      s.push(c.getBuffer());
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
    for (const c of t)
      c.uint8Array && (c.isDecode ? (a.decode.names.push(c.name), a.decode.uint8Arrays.push(c.uint8Array)) : (a.noDecode.names.push(c.name), a.noDecode.uint8Arrays.push(c.uint8Array)));
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
    if (!s.length)
      return i;
    const c = await this.handle(e, s, a);
    for (let n = 0; n < c.length; n++) {
      const u = c[n];
      u.length && (i[t[n]] = u);
    }
    return i;
  }
  async executeMultipleParams(e, t) {
    t || (t = o(this, l));
    const s = [];
    for (const n of t)
      s.push(n.getBuffer());
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
    for (const n of t)
      n.uint8Array && (n.isDecode ? (a.decode.names.push(n.name), a.decode.uint8Arrays.push(n.uint8Array)) : (a.noDecode.names.push(n.name), a.noDecode.uint8Arrays.push(n.uint8Array)));
    const i = await Promise.all([
      this._executeMultipleParams(e, a.noDecode.names, a.noDecode.uint8Arrays, !1),
      this._executeMultipleParams(e, a.decode.names, a.decode.uint8Arrays, !0)
    ]), c = [];
    for (let n = 0; n < i[0].length; n++)
      c.push({ ...i[0][n], ...i[1][n] });
    return c;
  }
  async _executeMultipleParams(e, t, s, a = !1) {
    const i = Array(e.length);
    if (!s.length)
      return i;
    const c = await this.handleMultipleParams(e, s, a);
    let n = 0;
    for (let u = 0; u < e.length; u++) {
      const d = {};
      for (const D of t) {
        const _ = c[n++];
        _.length && (d[D] = _);
      }
      i[u] = d;
    }
    return i;
  }
  async fileEncrypt(e) {
    return await o(this, h).file_encrypt(e);
  }
  async filesEncrypt(e) {
    return await o(this, h).files_encrypt(e);
  }
}
l = new WeakMap(), h = new WeakMap();
class A {
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
  P as B,
  A as b
};
