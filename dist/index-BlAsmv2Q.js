var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var _r, _s, _e, _t, _r_instances, c_fn;
class r {
  constructor(r2, s) {
    __privateAdd(this, _r_instances);
    __privateAdd(this, _r);
    __privateAdd(this, _s, 0);
    __privateAdd(this, _e, []);
    __privateAdd(this, _t, []);
    if (__privateSet(this, _r, Number(s)), !__privateGet(this, _r) || __privateGet(this, _r) < 1) try {
      __privateSet(this, _r, navigator.hardwareConcurrency < 8 ? navigator.hardwareConcurrency : 8);
    } catch (r3) {
    }
    (!__privateGet(this, _r) || __privateGet(this, _r) < 1) && __privateSet(this, _r, 1);
    for (let s2 = 0; s2 < __privateGet(this, _r); s2++) __privateMethod(this, _r_instances, c_fn).call(this, r2);
  }
  concurrency() {
    return __privateGet(this, _r);
  }
  postMessage(r2, s) {
    __privateGet(this, _e)[++__privateWrapper(this, _s)._] || __privateSet(this, _s, 0), __privateGet(this, _e)[__privateGet(this, _s)].postMessage(r2, s);
  }
  addListener(r2) {
    __privateGet(this, _t).push(r2);
  }
  removeListener(r2) {
    for (const s in __privateGet(this, _t)) if (__privateGet(this, _t)[s] == r2) return void __privateGet(this, _t).splice(s, 1);
  }
}
_r = new WeakMap();
_s = new WeakMap();
_e = new WeakMap();
_t = new WeakMap();
_r_instances = new WeakSet();
c_fn = function(r2) {
  const s = new r2();
  s.onmessage = async (r3) => {
    const e = [];
    for (const s2 of __privateGet(this, _t)) e.push(s2(r3));
    (await Promise.all(e)).forEach((r4) => {
      r4 && s.postMessage(r4);
    });
  }, __privateGet(this, _e).push(s);
};
export {
  r as w
};
