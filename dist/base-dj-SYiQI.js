var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _e, _t;
new class {
  constructor() {
    this._initFinishCallBackFuns = [], this._isInitFinish = false, this._dbName = "template_replacement", this._dbversion = 1, this._cacheTableName = "templates", this._tableMap = {}, this.initDB();
  }
  initDB() {
    return new Promise((e2, t2) => {
      const a2 = indexedDB.open(this._dbName, this._dbversion);
      a2.onsuccess = (t3) => {
        if (this._db = a2.result, this._isInitFinish = true, this._initFinishCallBackFuns) {
          try {
            for (const e3 of this._initFinishCallBackFuns) e3();
          } catch (e3) {
          }
          this._initFinishCallBackFuns = void 0;
        }
        e2(t3);
      }, a2.onerror = (e3) => {
        console.error(e3), t2(e3);
      }, a2.onupgradeneeded = (t3) => {
        let i = a2.result;
        i.objectStoreNames.contains(this._cacheTableName) || i.createObjectStore(this._cacheTableName, { keyPath: "url" }), e2(t3);
      };
    });
  }
  async awaitInit() {
    !this._isInitFinish && this._initFinishCallBackFuns && await new Promise((e2, t2) => {
      var _a;
      (_a = this._initFinishCallBackFuns) == null ? void 0 : _a.push(e2);
    });
  }
  closeDB() {
    var _a;
    (_a = this._db) == null ? void 0 : _a.close();
  }
  async store(e2) {
    await this.awaitInit();
    return this._db.transaction(this._cacheTableName, e2).objectStore(this._cacheTableName);
  }
  putData(e2) {
    return new Promise(async (t2, a2) => {
      const i = (await this.store("readwrite")).put(e2);
      i.onsuccess = (e3) => {
        t2(e3);
      }, i.onerror = (e3) => {
        a2(e3);
      };
    });
  }
  getDataByKey(e2) {
    return new Promise(async (t2, a2) => {
      const i = (await this.store()).get(e2);
      i.onsuccess = () => {
        t2(i.result);
      }, i.onerror = (e3) => {
        a2(e3);
      };
    });
  }
  deleteDataByKey(e2) {
    return new Promise(async (t2, a2) => {
      const i = (await this.store()).delete(e2);
      i.onsuccess = () => {
        t2();
      }, i.onerror = (e3) => {
        a2(e3);
      };
    });
  }
  clearDB() {
    return new Promise(async (e2, t2) => {
      const a2 = (await this.store("readwrite")).clear();
      a2.onsuccess = (t3) => {
        e2(t3);
      }, a2.onerror = (e3) => {
        t2(e3);
      };
    });
  }
}();
var e = ((e2) => (e2.word = "word", e2.excel = "excel", e2.unknown = "unknown", e2))(e || {});
class t {
  constructor(e2) {
    __privateAdd(this, _e, []);
    __privateAdd(this, _t);
    __privateSet(this, _t, e2);
  }
  addTempFile(e2) {
    __privateGet(this, _e).push(e2);
  }
  clear() {
    __privateGet(this, _e).length = 0;
  }
  async extractVariables(t2) {
    t2 || (t2 = __privateGet(this, _e));
    const a2 = {}, i = [];
    for (const s of t2) i.push(new Promise(async (t3, i2) => {
      const n = await s.getBuffer();
      n && (s.isDecode || await s.type() !== e.unknown) && (a2[s.name] = await __privateGet(this, _t).extract_one_file_variable_names(n, s.isDecode)), t3();
    }));
    return await Promise.all(i), a2;
  }
  async extractMedias(t2) {
    t2 || (t2 = __privateGet(this, _e));
    const a2 = {}, i = [];
    for (const s of t2) i.push(new Promise(async (t3, i2) => {
      const n = await s.getBuffer();
      if (n && (s.isDecode || await s.type() !== e.unknown)) {
        let e2 = await __privateGet(this, _t).extract_one_file_medias(n, s.isDecode);
        a2[s.name] = [], e2 && Array.isArray(e2) && e2.forEach((e3) => {
          e3.id && e3.data && a2[s.name].push({ id: e3.id, data: new Uint8Array(e3.data) });
        });
      }
      t3();
    }));
    return await Promise.all(i), a2;
  }
  async handle(e2, t2, a2 = false) {
    return [];
  }
  async sign(e2) {
    return "";
  }
  async execute(e2, t2) {
    t2 || (t2 = __privateGet(this, _e));
    const a2 = [];
    for (const e3 of t2) a2.push(e3.getBuffer());
    await Promise.all(a2);
    const i = { decode: { names: [], uint8Arrays: [] }, noDecode: { names: [], uint8Arrays: [] } };
    for (const e3 of t2) e3.uint8Array && (e3.isDecode ? (i.decode.names.push(e3.name), i.decode.uint8Arrays.push(e3.uint8Array)) : (i.noDecode.names.push(e3.name), i.noDecode.uint8Arrays.push(e3.uint8Array)));
    const s = await Promise.all([this._execute(e2, i.noDecode.names, i.noDecode.uint8Arrays, false), this._execute(e2, i.decode.names, i.decode.uint8Arrays, true)]);
    return { ...s[0], ...s[1] };
  }
  async _execute(e2, t2, a2, i = false) {
    const s = {};
    if (!a2.length) return s;
    return (await this.handle(e2, a2, i)).forEach((e3, a3) => {
      e3.length && (s[t2[a3]] = e3);
    }), s;
  }
  async fileEncrypt(e2) {
    return await __privateGet(this, _t).file_encrypt(e2);
  }
  async filesEncrypt(e2) {
    return await __privateGet(this, _t).files_encrypt(e2);
  }
}
_e = new WeakMap();
_t = new WeakMap();
class a {
  constructor(e2, t2) {
    this.awaitInit = e2, this.module = t2;
  }
  async await() {
    return await this.awaitInit, this;
  }
  async add_template(e2, t2) {
    return await this.awaitInit, this.module.add_template(e2, t2);
  }
  async add_media(e2) {
    return await this.awaitInit, this.module.add_media(e2);
  }
  async extract_one_file_variable_names(e2, t2) {
    return await this.awaitInit, this.module.extract_one_file_variable_names(e2, t2);
  }
  async extract_variable_names(e2, t2) {
    return await this.awaitInit, this.module.extract_variable_names(e2, t2);
  }
  async extract_one_file_medias(e2, t2) {
    return await this.awaitInit, this.module.extract_one_file_medias(e2, t2);
  }
  async extract_medias(e2, t2) {
    return await this.awaitInit, this.module.extract_medias(e2, t2);
  }
  async file_encrypt(e2) {
    return await this.awaitInit, this.module.file_encrypt(e2);
  }
  async files_encrypt(e2) {
    await this.awaitInit;
    return this.module.files_encrypt(e2);
  }
}
export {
  t as B,
  a as b
};
