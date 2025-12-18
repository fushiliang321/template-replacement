class y {
  // 构造函数
  constructor() {
    this._initFinishCallBackFuns = [], this.#t = !1, this.#e = "template_replacement_db", this.#n = 1, this.#a = "template_files", this.#s();
  }
  #t;
  #e;
  #n;
  #a;
  #s() {
    return this._init ? this._init : (this._init = new Promise((t, e) => {
      const a = indexedDB.open(this.#e, this.#n);
      a.onsuccess = (s) => {
        if (this._db = a.result, this.#t = !0, this._initFinishCallBackFuns) {
          try {
            for (const n of this._initFinishCallBackFuns)
              n();
          } catch {
          }
          this._initFinishCallBackFuns = void 0;
        }
        t(s);
      }, a.onerror = (s) => {
        console.error(s), e(s);
      }, a.onupgradeneeded = (s) => {
        let n = a.result;
        n.objectStoreNames.contains(this.#a) || n.createObjectStore(this.#a, {
          keyPath: "key"
          // 设置主键
        }), t(s);
      };
    }), this._init);
  }
  async awaitInit() {
    this.#t || !this._initFinishCallBackFuns || await new Promise((t, e) => {
      this._initFinishCallBackFuns?.push(t);
    });
  }
  closeDB() {
    this._db?.close();
  }
  async store(t) {
    return await this.awaitInit(), this._db.transaction(this.#a, t).objectStore(this.#a);
  }
  /**
   * @description : 更新数据
   * @param        {templateData} params 添加到数据库中的数据 { key: 文件key, data: 文件blob }
   * @return       {*}
   */
  putData(t) {
    return new Promise((e, a) => {
      this.store("readwrite").then((s) => {
        const n = s.put(t);
        n.onsuccess = (i) => {
          e(i);
        }, n.onerror = (i) => {
          a(i);
        };
      }).catch(a);
    });
  }
  // 通过主键读取数据
  getDataByKey(t) {
    return new Promise((e, a) => {
      this.store().then((s) => {
        const n = s.get(t);
        n.onsuccess = () => {
          e(n.result);
        }, n.onerror = (i) => {
          a(i);
        };
      }).catch(a);
    });
  }
  // 通过主键移除数据
  deleteDataByKey(t) {
    return new Promise((e, a) => {
      this.store().then((s) => {
        const n = s.delete(t);
        n.onsuccess = () => {
          e(n.result);
        }, n.onerror = (i) => {
          a(i);
        };
      }).catch(a);
    });
  }
  // 清空数据库数据
  clearDB() {
    return new Promise((t, e) => {
      this.store("readwrite").then((a) => {
        const s = a.clear();
        s.onsuccess = (n) => {
          t(n);
        }, s.onerror = (n) => {
          e(n);
        };
      }).catch(e);
    });
  }
}
new y();
var d = /* @__PURE__ */ ((r) => (r.word = "word", r.excel = "excel", r.unknown = "unknown", r))(d || {});
async function f(r = []) {
  const t = [];
  for (const a of r)
    t.push(a.getBuffer());
  await Promise.all(t);
  const e = {
    decode: {
      names: [],
      uint8Arrays: []
    },
    noDecode: {
      names: [],
      uint8Arrays: []
    }
  };
  for (const a of r)
    a.uint8Array && (a.isDecode ? (e.decode.names.push(a.name), e.decode.uint8Arrays.push(a.uint8Array)) : (e.noDecode.names.push(a.name), e.noDecode.uint8Arrays.push(a.uint8Array)));
  return e;
}
class _ {
  #t = [];
  #e;
  constructor(t) {
    this.#e = t;
  }
  addTempFile(t) {
    this.#t.push(t);
  }
  clear() {
    this.#t.length = 0;
  }
  //提取单个文件内的所有变量
  async extractOneFileVariables(t, e) {
    const a = await e.getBuffer();
    a && (await e.type() === d.unknown && !e.isDecode || (t[e.name] = await this.#e.extract_one_file_variable_names(
      a,
      e.isDecode
    )));
  }
  //提取多个文件内的所有变量
  async extractVariables(t) {
    t || (t = this.#t);
    const e = {}, a = [];
    for (const s of t)
      a.push(this.extractOneFileVariables(e, s));
    return await Promise.allSettled(a), e;
  }
  //提取单个文件内的所有媒体文件
  async extractOneFileMedias(t, e) {
    const a = await e.getBuffer();
    if (!a || await e.type() === d.unknown && !e.isDecode)
      return;
    const s = await this.#e.extract_one_file_medias(
      a,
      e.isDecode
    );
    if (t[e.name] = [], !!Array.isArray(s))
      for (const { id: n, data: i } of s)
        n && i && t[e.name].push({
          id: n,
          data: new Uint8Array(i)
        });
  }
  //提取多个文件内的所有媒体文件
  async extractMedias(t) {
    t || (t = this.#t);
    const e = {}, a = [];
    for (const s of t)
      a.push(this.extractOneFileMedias(e, s));
    return await Promise.all(a), e;
  }
  async handle(t, e, a) {
    return [];
  }
  async handleMultipleParams(t, e, a) {
    return [];
  }
  async sign(t) {
    return "";
  }
  async execute(t, e) {
    const { noDecode: a, decode: s } = await f(e ?? this.#t), n = await this.handle(t, a.uint8Arrays, s.uint8Arrays), i = {};
    let o = 0;
    for (const c of a.names)
      i[c] = n[o++] ?? new Uint8Array();
    for (const c of s.names)
      i[c] = n[o++] ?? new Uint8Array();
    return i;
  }
  async executeMultipleParams(t, e) {
    const { noDecode: a, decode: s } = await f(e ?? this.#t), n = await this.handleMultipleParams(t, a.uint8Arrays, s.uint8Arrays), i = Array(t.length);
    let o = 0;
    for (let c = 0; c < t.length; c++) {
      const h = {};
      for (const l of a.names) {
        const u = n[o++];
        u.length && (h[l] = u);
      }
      for (const l of s.names) {
        const u = n[o++];
        u.length && (h[l] = u);
      }
      i[c] = h;
    }
    return i;
  }
  async fileEncrypt(t) {
    return this.#e.file_encrypt(t);
  }
  async filesEncrypt(t) {
    return this.#e.files_encrypt(t);
  }
}
class m {
  constructor(t) {
    this.awaitInit = t;
  }
  async add_template(t, e) {
    return (await this.awaitInit).add_template(t, e);
  }
  async add_media(t) {
    return (await this.awaitInit).add_media(t);
  }
  async extract_one_file_variable_names(t, e) {
    return (await this.awaitInit).extract_one_file_variable_names(t, e);
  }
  async extract_variable_names(t, e) {
    return (await this.awaitInit).extract_variable_names(t, e);
  }
  async extract_one_file_medias(t, e) {
    return (await this.awaitInit).extract_one_file_medias(t, e);
  }
  async extract_medias(t, e) {
    return (await this.awaitInit).extract_medias(t, e);
  }
  async file_encrypt(t) {
    return (await this.awaitInit).file_encrypt(t);
  }
  async files_encrypt(t) {
    return (await this.awaitInit).files_encrypt(t);
  }
}
export {
  _ as B,
  m as b
};
