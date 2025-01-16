var g = (r) => {
  throw TypeError(r);
};
var p = (r, s, t) => s.has(r) || g("Cannot " + t);
var e = (r, s, t) => (p(r, s, "read from private field"), t ? t.call(r) : s.get(r)), n = (r, s, t) => s.has(r) ? g("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(r) : s.set(r, t), a = (r, s, t, o) => (p(r, s, "write to private field"), o ? o.call(r, t) : s.set(r, t), t), k = (r, s, t) => (p(r, s, "access private method"), t);
var l = (r, s, t, o) => ({
  set _(f) {
    a(r, s, f, t);
  },
  get _() {
    return e(r, s, o);
  }
});
var i, c, u, h, d, y;
class v {
  constructor(s, t) {
    n(this, d);
    n(this, i);
    n(this, c, 0);
    n(this, u, []);
    n(this, h, []);
    if (a(this, i, Number(t)), !e(this, i) || e(this, i) < 1)
      try {
        a(this, i, navigator.hardwareConcurrency < 8 ? navigator.hardwareConcurrency : 8);
      } catch {
      }
    (!e(this, i) || e(this, i) < 1) && a(this, i, 1);
    for (let o = 0; o < e(this, i); o++)
      k(this, d, y).call(this, s);
  }
  concurrency() {
    return e(this, i);
  }
  postMessage(s, t) {
    e(this, u)[++l(this, c)._] || a(this, c, 0), e(this, u)[e(this, c)].postMessage(s, t);
  }
  addListener(s) {
    e(this, h).push(s);
  }
  removeListener(s) {
    for (const t in e(this, h))
      if (e(this, h)[t] == s) {
        e(this, h).splice(t, 1);
        return;
      }
  }
}
i = new WeakMap(), c = new WeakMap(), u = new WeakMap(), h = new WeakMap(), d = new WeakSet(), y = function(s) {
  const t = new s();
  t.onmessage = async (o) => {
    const f = [];
    for (const w of e(this, h))
      f.push(w(o));
    (await Promise.all(f)).forEach((w) => {
      w && t.postMessage(w);
    });
  }, e(this, u).push(t);
};
export {
  v as w
};
