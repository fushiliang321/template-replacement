class f {
  // 构造函数
  constructor() {
    this._initFinishCallBackFuns = [], this.#e = !1, this.#t = "template_replacement_db", this.#s = 1, this.#a = "template_files", this.#n();
  }
  #e;
  #t;
  #s;
  #a;
  #n() {
    return this._init ? this._init : (this._init = new Promise((e, a) => {
      const n = indexedDB.open(this.#t, this.#s);
      n.onsuccess = (t) => {
        if (this._db = n.result, this.#e = !0, this._initFinishCallBackFuns) {
          try {
            for (const s of this._initFinishCallBackFuns)
              s();
          } catch {
          }
          this._initFinishCallBackFuns = void 0;
        }
        e(t);
      }, n.onerror = (t) => {
        console.error(t), a(t);
      }, n.onupgradeneeded = (t) => {
        let s = n.result;
        s.objectStoreNames.contains(this.#a) || s.createObjectStore(this.#a, {
          keyPath: "key"
          // 设置主键
        }), e(t);
      };
    }), this._init);
  }
  async awaitInit() {
    this.#e || !this._initFinishCallBackFuns || await new Promise((e, a) => {
      this._initFinishCallBackFuns?.push(e);
    });
  }
  closeDB() {
    this._db?.close();
  }
  async store(e) {
    return await this.awaitInit(), this._db.transaction(this.#a, e).objectStore(this.#a);
  }
  /**
   * @description : 更新数据
   * @param        {templateData} params 添加到数据库中的数据 { key: 文件key, data: 文件blob }
   * @return       {*}
   */
  putData(e) {
    return new Promise((a, n) => {
      this.store("readwrite").then((t) => {
        const s = t.put(e);
        s.onsuccess = (i) => {
          a(i);
        }, s.onerror = (i) => {
          n(i);
        };
      }).catch(n);
    });
  }
  // 通过主键读取数据
  getDataByKey(e) {
    return new Promise((a, n) => {
      this.store().then((t) => {
        const s = t.get(e);
        s.onsuccess = () => {
          a(s.result);
        }, s.onerror = (i) => {
          n(i);
        };
      }).catch(n);
    });
  }
  // 通过主键移除数据
  deleteDataByKey(e) {
    return new Promise((a, n) => {
      this.store().then((t) => {
        const s = t.delete(e);
        s.onsuccess = () => {
          a(s.result);
        }, s.onerror = (i) => {
          n(i);
        };
      }).catch(n);
    });
  }
  // 清空数据库数据
  clearDB() {
    return new Promise((e, a) => {
      this.store("readwrite").then((n) => {
        const t = n.clear();
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
var u = /* @__PURE__ */ ((c) => (c.word = "word", c.excel = "excel", c.unknown = "unknown", c))(u || {});
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
    const a = {}, n = [];
    for (const t of e)
      n.push(
        new Promise(async (s) => {
          try {
            const i = await t.getBuffer();
            i && (t.isDecode || await t.type() !== u.unknown) && (a[t.name] = await this.#t.extract_one_file_variable_names(
              i,
              t.isDecode
            )), s();
          } catch (i) {
            console.error(i);
          }
        })
      );
    return await Promise.all(n), a;
  }
  async extractMedias(e) {
    e || (e = this.#e);
    const a = {}, n = [];
    for (const t of e)
      n.push(
        new Promise(async (s) => {
          try {
            const i = await t.getBuffer();
            if (i && (t.isDecode || await t.type() !== u.unknown)) {
              let r = await this.#t.extract_one_file_medias(
                i,
                t.isDecode
              );
              if (a[t.name] = [], r && Array.isArray(r))
                for (const o of r)
                  o.id && o.data && a[t.name].push({
                    id: o.id,
                    data: new Uint8Array(o.data)
                  });
            }
            s();
          } catch (i) {
            console.error(i);
          }
        })
      );
    return await Promise.all(n), a;
  }
  async handle(e, a, n = !1) {
    return [];
  }
  async handleMultipleParams(e, a, n = !1) {
    return [];
  }
  async sign(e) {
    return "";
  }
  async execute(e, a) {
    a || (a = this.#e);
    const n = [];
    for (const i of a)
      n.push(i.getBuffer());
    await Promise.all(n);
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
    for (const i of a)
      i.uint8Array && (i.isDecode ? (t.decode.names.push(i.name), t.decode.uint8Arrays.push(i.uint8Array)) : (t.noDecode.names.push(i.name), t.noDecode.uint8Arrays.push(i.uint8Array)));
    const s = await Promise.all([
      this._execute(
        e,
        t.noDecode.names,
        t.noDecode.uint8Arrays,
        !1
      ),
      this._execute(
        e,
        t.decode.names,
        t.decode.uint8Arrays,
        !0
      )
    ]);
    return {
      ...s[0],
      ...s[1]
    };
  }
  async _execute(e, a, n, t = !1) {
    const s = {};
    if (!n.length)
      return s;
    const i = await this.handle(e, n, t);
    for (let r = 0; r < i.length; r++) {
      const o = i[r];
      o.length && (s[a[r]] = o);
    }
    return s;
  }
  async executeMultipleParams(e, a) {
    a || (a = this.#e);
    const n = [];
    for (const r of a)
      n.push(r.getBuffer());
    await Promise.all(n);
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
      this._executeMultipleParams(
        e,
        t.noDecode.names,
        t.noDecode.uint8Arrays,
        !1
      ),
      this._executeMultipleParams(
        e,
        t.decode.names,
        t.decode.uint8Arrays,
        !0
      )
    ]), i = [];
    for (let r = 0; r < s[0].length; r++)
      i.push({ ...s[0][r], ...s[1][r] });
    return i;
  }
  async _executeMultipleParams(e, a, n, t = !1) {
    const s = Array(e.length);
    if (!n.length)
      return s;
    const i = await this.handleMultipleParams(
      e,
      n,
      t
    );
    let r = 0;
    for (let o = 0; o < e.length; o++) {
      const l = {};
      for (const d of a) {
        const h = i[r++];
        h.length && (l[d] = h);
      }
      s[o] = l;
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
class y {
  constructor(e) {
    this.awaitInit = e;
  }
  async await() {
    return await this.awaitInit, this;
  }
  async add_template(e, a) {
    return (await this.awaitInit).add_template(e, a);
  }
  async add_media(e) {
    return (await this.awaitInit).add_media(e);
  }
  async extract_one_file_variable_names(e, a) {
    return (await this.awaitInit).extract_one_file_variable_names(e, a);
  }
  async extract_variable_names(e, a) {
    return (await this.awaitInit).extract_variable_names(e, a);
  }
  async extract_one_file_medias(e, a) {
    return (await this.awaitInit).extract_one_file_medias(e, a);
  }
  async extract_medias(e, a) {
    return (await this.awaitInit).extract_medias(e, a);
  }
  async file_encrypt(e) {
    return (await this.awaitInit).file_encrypt(e);
  }
  async files_encrypt(e) {
    return (await this.awaitInit).files_encrypt(e);
  }
}
export {
  m as B,
  y as b
};
