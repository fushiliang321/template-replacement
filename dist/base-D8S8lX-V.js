class f {
  #e = [];
  //初始化完成回调
  #t = !1;
  //是否初始化完成
  #n;
  //数据库
  #r = "template_replacement_db";
  //数据库名
  #i = 1;
  //数据库版本
  #a = "template_files";
  //表名
  #s;
  // 构造函数
  constructor() {
    this.#o();
  }
  #o() {
    return this.#s ? this.#s : (this.#s = new Promise((e, a) => {
      const n = indexedDB.open(this.#r, this.#i);
      n.onsuccess = (t) => {
        if (this.#n = n.result, this.#t = !0, this.#e) {
          try {
            for (const s of this.#e)
              s();
          } catch {
          }
          this.#e = void 0;
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
    }), this.#s);
  }
  async awaitInit() {
    this.#t || !this.#e || await new Promise((e, a) => {
      this.#e?.push(e);
    });
  }
  closeDB() {
    this.#n?.close();
  }
  async store(e) {
    return await this.awaitInit(), this.#n.transaction(this.#a, e).objectStore(this.#a);
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
        s.onsuccess = (r) => {
          a(r);
        }, s.onerror = (r) => {
          n(r);
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
        }, s.onerror = (r) => {
          n(r);
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
        }, s.onerror = (r) => {
          n(r);
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
            const r = await t.getBuffer();
            r && (t.isDecode || await t.type() !== u.unknown) && (a[t.name] = await this.#t.extract_one_file_variable_names(
              r,
              t.isDecode
            )), s();
          } catch (r) {
            console.error(r);
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
            const r = await t.getBuffer();
            if (r && (t.isDecode || await t.type() !== u.unknown)) {
              let i = await this.#t.extract_one_file_medias(
                r,
                t.isDecode
              );
              if (a[t.name] = [], i && Array.isArray(i))
                for (const o of i)
                  o.id && o.data && a[t.name].push({
                    id: o.id,
                    data: new Uint8Array(o.data)
                  });
            }
            s();
          } catch (r) {
            console.error(r);
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
    const r = await this.handle(e, n, t);
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      o.length && (s[a[i]] = o);
    }
    return s;
  }
  async executeMultipleParams(e, a) {
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
    ]), r = [];
    for (let i = 0; i < s[0].length; i++)
      r.push({ ...s[0][i], ...s[1][i] });
    return r;
  }
  async _executeMultipleParams(e, a, n, t = !1) {
    const s = Array(e.length);
    if (!n.length)
      return s;
    const r = await this.handleMultipleParams(
      e,
      n,
      t
    );
    let i = 0;
    for (let o = 0; o < e.length; o++) {
      const l = {};
      for (const d of a) {
        const h = r[i++];
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
