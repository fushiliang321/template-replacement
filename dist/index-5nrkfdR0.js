var l = (r) => {
  throw TypeError(r);
};
var d = (r, s, t) => s.has(r) || l("Cannot " + t);
var e = (r, s, t) => (d(r, s, "read from private field"), t ? t.call(r) : s.get(r)), h = (r, s, t) => s.has(r) ? l("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(r) : s.set(r, t), c = (r, s, t, o) => (d(r, s, "write to private field"), o ? o.call(r, t) : s.set(r, t), t), y = (r, s, t) => (d(r, s, "access private method"), t);
var g = (r, s, t, o) => ({
  set _(f) {
    c(r, s, f, t);
  },
  get _() {
    return e(r, s, o);
  }
});
var i, a, u, n, w, k;
class L {
  constructor(s, t) {
    h(this, w);
    h(this, i);
    h(this, a, 0);
    h(this, u, []);
    h(this, n, []);
    if (c(this, i, Number(t)), !e(this, i) || e(this, i) < 1)
      try {
        c(this, i, navigator.hardwareConcurrency < 8 ? navigator.hardwareConcurrency : 8);
      } catch {
      }
    (!e(this, i) || e(this, i) < 1) && c(this, i, 1);
    for (let o = 0; o < e(this, i); o++)
      y(this, w, k).call(this, s);
  }
  concurrency() {
    return e(this, i);
  }
  postMessage(s, t) {
    e(this, u)[++g(this, a)._] || c(this, a, 0), e(this, u)[e(this, a)].postMessage(s, t);
  }
  addListener(s) {
    e(this, n).push(s);
  }
  removeListener(s) {
    for (const t in e(this, n))
      if (e(this, n)[t] == s) {
        e(this, n).splice(t, 1);
        return;
      }
  }
}
i = new WeakMap(), a = new WeakMap(), u = new WeakMap(), n = new WeakMap(), w = new WeakSet(), k = function(s) {
  const t = new s();
  t.onmessage = async (o) => {
    const f = [];
    for (const p of e(this, n))
      f.push(p(o));
    const m = await Promise.all(f);
    for (const p of m)
      p && t.postMessage(p);
  }, e(this, u).push(t);
};
export {
  L as w
};
