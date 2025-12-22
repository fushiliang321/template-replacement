class Er {
  // 构造函数
  constructor() {
    this._initFinishCallBackFuns = [], this.#r = !1, this.#e = "template_replacement_db", this.#n = 1, this.#t = "template_files", this.#a();
  }
  #r;
  #e;
  #n;
  #t;
  #a() {
    return this._init ? this._init : (this._init = new Promise((r, e) => {
      const t = indexedDB.open(this.#e, this.#n);
      t.onsuccess = (i) => {
        if (this._db = t.result, this.#r = !0, this._initFinishCallBackFuns) {
          try {
            for (const a of this._initFinishCallBackFuns)
              a();
          } catch {
          }
          this._initFinishCallBackFuns = void 0;
        }
        r(i);
      }, t.onerror = (i) => {
        console.error(i), e(i);
      }, t.onupgradeneeded = (i) => {
        let a = t.result;
        a.objectStoreNames.contains(this.#t) || a.createObjectStore(this.#t, {
          keyPath: "key"
          // 设置主键
        }), r(i);
      };
    }), this._init);
  }
  async awaitInit() {
    this.#r || !this._initFinishCallBackFuns || await new Promise((r, e) => {
      this._initFinishCallBackFuns?.push(r);
    });
  }
  closeDB() {
    this._db?.close();
  }
  async store(r) {
    return await this.awaitInit(), this._db.transaction(this.#t, r).objectStore(this.#t);
  }
  /**
   * @description : 更新数据
   * @param        {templateData} params 添加到数据库中的数据 { key: 文件key, data: 文件blob }
   * @return       {*}
   */
  putData(r) {
    return new Promise((e, t) => {
      this.store("readwrite").then((i) => {
        const a = i.put(r);
        a.onsuccess = (s) => {
          e(s);
        }, a.onerror = (s) => {
          t(s);
        };
      }).catch(t);
    });
  }
  // 通过主键读取数据
  getDataByKey(r) {
    return new Promise((e, t) => {
      this.store().then((i) => {
        const a = i.get(r);
        a.onsuccess = () => {
          e(a.result);
        }, a.onerror = (s) => {
          t(s);
        };
      }).catch(t);
    });
  }
  // 通过主键移除数据
  deleteDataByKey(r) {
    return new Promise((e, t) => {
      this.store().then((i) => {
        const a = i.delete(r);
        a.onsuccess = () => {
          e(a.result);
        }, a.onerror = (s) => {
          t(s);
        };
      }).catch(t);
    });
  }
  // 清空数据库数据
  clearDB() {
    return new Promise((r, e) => {
      this.store("readwrite").then((t) => {
        const i = t.clear();
        i.onsuccess = (a) => {
          r(a);
        }, i.onerror = (a) => {
          e(a);
        };
      }).catch(e);
    });
  }
}
new Er();
var hr = /* @__PURE__ */ ((n) => (n.word = "word", n.excel = "excel", n.unknown = "unknown", n))(hr || {}), A = Uint8Array, T = Uint16Array, ur = Int32Array, vr = new A([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), wr = new A([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), pr = new A([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), zr = function(n, r) {
  for (var e = new T(31), t = 0; t < 31; ++t)
    e[t] = r += 1 << n[t - 1];
  for (var i = new ur(e[30]), t = 1; t < 30; ++t)
    for (var a = e[t]; a < e[t + 1]; ++a)
      i[a] = a - e[t] << 5 | t;
  return { b: e, r: i };
}, Pr = zr(vr, 2), Sr = Pr.b, lr = Pr.r;
Sr[28] = 258, lr[258] = 28;
var Zr = zr(wr, 0), xr = Zr.r, fr = new T(32768);
for (var m = 0; m < 32768; ++m) {
  var H = (m & 43690) >> 1 | (m & 21845) << 1;
  H = (H & 52428) >> 2 | (H & 13107) << 2, H = (H & 61680) >> 4 | (H & 3855) << 4, fr[m] = ((H & 65280) >> 8 | (H & 255) << 8) >> 1;
}
var $ = (function(n, r, e) {
  for (var t = n.length, i = 0, a = new T(r); i < t; ++i)
    n[i] && ++a[n[i] - 1];
  var s = new T(r);
  for (i = 1; i < r; ++i)
    s[i] = s[i - 1] + a[i - 1] << 1;
  var l;
  if (e) {
    l = new T(1 << r);
    var h = 15 - r;
    for (i = 0; i < t; ++i)
      if (n[i])
        for (var c = i << 4 | n[i], o = r - n[i], u = s[n[i] - 1]++ << o, f = u | (1 << o) - 1; u <= f; ++u)
          l[fr[u] >> h] = c;
  } else
    for (l = new T(t), i = 0; i < t; ++i)
      n[i] && (l[i] = fr[s[n[i] - 1]++] >> 15 - n[i]);
  return l;
}), Y = new A(288);
for (var m = 0; m < 144; ++m)
  Y[m] = 8;
for (var m = 144; m < 256; ++m)
  Y[m] = 9;
for (var m = 256; m < 280; ++m)
  Y[m] = 7;
for (var m = 280; m < 288; ++m)
  Y[m] = 8;
var tr = new A(32);
for (var m = 0; m < 32; ++m)
  tr[m] = 5;
var Or = /* @__PURE__ */ $(Y, 9, 0), qr = /* @__PURE__ */ $(tr, 5, 0), Tr = function(n) {
  return (n + 7) / 8 | 0;
}, Ir = function(n, r, e) {
  return (e == null || e > n.length) && (e = n.length), new A(n.subarray(r, e));
}, Nr = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], C = function(n, r, e) {
  var t = new Error(r || Nr[n]);
  if (t.code = n, Error.captureStackTrace && Error.captureStackTrace(t, C), !e)
    throw t;
  return t;
}, V = function(n, r, e) {
  e <<= r & 7;
  var t = r / 8 | 0;
  n[t] |= e, n[t + 1] |= e >> 8;
}, W = function(n, r, e) {
  e <<= r & 7;
  var t = r / 8 | 0;
  n[t] |= e, n[t + 1] |= e >> 8, n[t + 2] |= e >> 16;
}, or = function(n, r) {
  for (var e = [], t = 0; t < n.length; ++t)
    n[t] && e.push({ s: t, f: n[t] });
  var i = e.length, a = e.slice();
  if (!i)
    return { t: Ur, l: 0 };
  if (i == 1) {
    var s = new A(e[0].s + 1);
    return s[e[0].s] = 1, { t: s, l: 1 };
  }
  e.sort(function(I, k) {
    return I.f - k.f;
  }), e.push({ s: -1, f: 25001 });
  var l = e[0], h = e[1], c = 0, o = 1, u = 2;
  for (e[0] = { s: -1, f: l.f + h.f, l, r: h }; o != i - 1; )
    l = e[e[c].f < e[u].f ? c++ : u++], h = e[c != o && e[c].f < e[u].f ? c++ : u++], e[o++] = { s: -1, f: l.f + h.f, l, r: h };
  for (var f = a[0].s, t = 1; t < i; ++t)
    a[t].s > f && (f = a[t].s);
  var w = new T(f + 1), y = cr(e[o - 1], w, 0);
  if (y > r) {
    var t = 0, g = 0, p = y - r, _ = 1 << p;
    for (a.sort(function(k, b) {
      return w[b.s] - w[k.s] || k.f - b.f;
    }); t < i; ++t) {
      var B = a[t].s;
      if (w[B] > r)
        g += _ - (1 << y - w[B]), w[B] = r;
      else
        break;
    }
    for (g >>= p; g > 0; ) {
      var M = a[t].s;
      w[M] < r ? g -= 1 << r - w[M]++ - 1 : ++t;
    }
    for (; t >= 0 && g; --t) {
      var U = a[t].s;
      w[U] == r && (--w[U], ++g);
    }
    y = r;
  }
  return { t: new A(w), l: y };
}, cr = function(n, r, e) {
  return n.s == -1 ? Math.max(cr(n.l, r, e + 1), cr(n.r, r, e + 1)) : r[n.s] = e;
}, Ar = function(n) {
  for (var r = n.length; r && !n[--r]; )
    ;
  for (var e = new T(++r), t = 0, i = n[0], a = 1, s = function(h) {
    e[t++] = h;
  }, l = 1; l <= r; ++l)
    if (n[l] == i && l != r)
      ++a;
    else {
      if (!i && a > 2) {
        for (; a > 138; a -= 138)
          s(32754);
        a > 2 && (s(a > 10 ? a - 11 << 5 | 28690 : a - 3 << 5 | 12305), a = 0);
      } else if (a > 3) {
        for (s(i), --a; a > 6; a -= 6)
          s(8304);
        a > 2 && (s(a - 3 << 5 | 8208), a = 0);
      }
      for (; a--; )
        s(i);
      a = 1, i = n[l];
    }
  return { c: e.subarray(0, t), n: r };
}, X = function(n, r) {
  for (var e = 0, t = 0; t < r.length; ++t)
    e += n[t] * r[t];
  return e;
}, Cr = function(n, r, e) {
  var t = e.length, i = Tr(r + 2);
  n[i] = t & 255, n[i + 1] = t >> 8, n[i + 2] = n[i] ^ 255, n[i + 3] = n[i + 1] ^ 255;
  for (var a = 0; a < t; ++a)
    n[i + a + 4] = e[a];
  return (i + 4 + t) * 8;
}, Fr = function(n, r, e, t, i, a, s, l, h, c, o) {
  V(r, o++, e), ++i[256];
  for (var u = or(i, 15), f = u.t, w = u.l, y = or(a, 15), g = y.t, p = y.l, _ = Ar(f), B = _.c, M = _.n, U = Ar(g), I = U.c, k = U.n, b = new T(19), d = 0; d < B.length; ++d)
    ++b[B[d] & 31];
  for (var d = 0; d < I.length; ++d)
    ++b[I[d] & 31];
  for (var v = or(b, 7), z = v.t, G = v.l, P = 19; P > 4 && !z[pr[P - 1]]; --P)
    ;
  var J = c + 5 << 3, E = X(i, Y) + X(a, tr) + s, S = X(i, f) + X(a, g) + s + 14 + 3 * P + X(b, z) + 2 * b[16] + 3 * b[17] + 7 * b[18];
  if (h >= 0 && J <= E && J <= S)
    return Cr(r, o, n.subarray(h, h + c));
  var O, F, Z, K;
  if (V(r, o, 1 + (S < E)), o += 2, S < E) {
    O = $(f, w, 0), F = f, Z = $(g, p, 0), K = g;
    var nr = $(z, G, 0);
    V(r, o, M - 257), V(r, o + 5, k - 1), V(r, o + 10, P - 4), o += 14;
    for (var d = 0; d < P; ++d)
      V(r, o + 3 * d, z[pr[d]]);
    o += 3 * P;
    for (var q = [B, I], R = 0; R < 2; ++R)
      for (var L = q[R], d = 0; d < L.length; ++d) {
        var N = L[d] & 31;
        V(r, o, nr[N]), o += z[N], N > 15 && (V(r, o, L[d] >> 5 & 127), o += L[d] >> 12);
      }
  } else
    O = Or, F = Y, Z = qr, K = tr;
  for (var d = 0; d < l; ++d) {
    var D = t[d];
    if (D > 255) {
      var N = D >> 18 & 31;
      W(r, o, O[N + 257]), o += F[N + 257], N > 7 && (V(r, o, D >> 23 & 31), o += vr[N]);
      var Q = D & 31;
      W(r, o, Z[Q]), o += K[Q], Q > 3 && (W(r, o, D >> 5 & 8191), o += wr[Q]);
    } else
      W(r, o, O[D]), o += F[D];
  }
  return W(r, o, O[256]), o + F[256];
}, Vr = /* @__PURE__ */ new ur([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Ur = /* @__PURE__ */ new A(0), Kr = function(n, r, e, t, i, a) {
  var s = a.z || n.length, l = new A(t + s + 5 * (1 + Math.ceil(s / 7e3)) + i), h = l.subarray(t, l.length - i), c = a.l, o = (a.r || 0) & 7;
  if (r) {
    o && (h[0] = a.r >> 3);
    for (var u = Vr[r - 1], f = u >> 13, w = u & 8191, y = (1 << e) - 1, g = a.p || new T(32768), p = a.h || new T(y + 1), _ = Math.ceil(e / 3), B = 2 * _, M = function(sr) {
      return (n[sr] ^ n[sr + 1] << _ ^ n[sr + 2] << B) & y;
    }, U = new ur(25e3), I = new T(288), k = new T(32), b = 0, d = 0, v = a.i || 0, z = 0, G = a.w || 0, P = 0; v + 2 < s; ++v) {
      var J = M(v), E = v & 32767, S = p[J];
      if (g[E] = S, p[J] = E, G <= v) {
        var O = s - v;
        if ((b > 7e3 || z > 24576) && (O > 423 || !c)) {
          o = Fr(n, h, 0, U, I, k, d, z, P, v - P, o), z = b = d = 0, P = v;
          for (var F = 0; F < 286; ++F)
            I[F] = 0;
          for (var F = 0; F < 30; ++F)
            k[F] = 0;
        }
        var Z = 2, K = 0, nr = w, q = E - S & 32767;
        if (O > 2 && J == M(v - q))
          for (var R = Math.min(f, O) - 1, L = Math.min(32767, v), N = Math.min(258, O); q <= L && --nr && E != S; ) {
            if (n[v + Z] == n[v + Z - q]) {
              for (var D = 0; D < N && n[v + D] == n[v + D - q]; ++D)
                ;
              if (D > Z) {
                if (Z = D, K = q, D > R)
                  break;
                for (var Q = Math.min(q, D - 2), yr = 0, F = 0; F < Q; ++F) {
                  var ar = v - q + F & 32767, kr = g[ar], gr = ar - kr & 32767;
                  gr > yr && (yr = gr, S = ar);
                }
              }
            }
            E = S, S = g[E], q += E - S & 32767;
          }
        if (K) {
          U[z++] = 268435456 | lr[Z] << 18 | xr[K];
          var dr = lr[Z] & 31, mr = xr[K] & 31;
          d += vr[dr] + wr[mr], ++I[257 + dr], ++k[mr], G = v + Z, ++b;
        } else
          U[z++] = n[v], ++I[n[v]];
      }
    }
    for (v = Math.max(v, G); v < s; ++v)
      U[z++] = n[v], ++I[n[v]];
    o = Fr(n, h, c, U, I, k, d, z, P, v - P, o), c || (a.r = o & 7 | h[o / 8 | 0] << 3, o -= 7, a.h = p, a.p = g, a.i = v, a.w = G);
  } else {
    for (var v = a.w || 0; v < s + c; v += 65535) {
      var ir = v + 65535;
      ir >= s && (h[o / 8 | 0] = c, ir = s), o = Cr(h, o + 1, n.subarray(v, ir));
    }
    a.i = s;
  }
  return Ir(l, 0, t + Tr(o) + i);
}, Hr = /* @__PURE__ */ (function() {
  for (var n = new Int32Array(256), r = 0; r < 256; ++r) {
    for (var e = r, t = 9; --t; )
      e = (e & 1 && -306674912) ^ e >>> 1;
    n[r] = e;
  }
  return n;
})(), Yr = function() {
  var n = -1;
  return {
    p: function(r) {
      for (var e = n, t = 0; t < r.length; ++t)
        e = Hr[e & 255 ^ r[t]] ^ e >>> 8;
      n = e;
    },
    d: function() {
      return ~n;
    }
  };
}, Gr = function(n, r, e, t, i) {
  if (!i && (i = { l: 1 }, r.dictionary)) {
    var a = r.dictionary.subarray(-32768), s = new A(a.length + n.length);
    s.set(a), s.set(n, a.length), n = s, i.w = a.length;
  }
  return Kr(n, r.level == null ? 6 : r.level, r.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(n.length))) * 1.5) : 20 : 12 + r.mem, e, t, i);
}, Jr = function(n, r) {
  var e = {};
  for (var t in n)
    e[t] = n[t];
  for (var t in r)
    e[t] = r[t];
  return e;
}, x = function(n, r, e) {
  for (; e; ++r)
    n[r] = e, e >>>= 8;
}, Lr = /* @__PURE__ */ (function() {
  function n(r, e) {
    if (typeof r == "function" && (e = r, r = {}), this.ondata = e, this.o = r || {}, this.s = { l: 0, i: 32768, w: 32768, z: 32768 }, this.b = new A(98304), this.o.dictionary) {
      var t = this.o.dictionary.subarray(-32768);
      this.b.set(t, 32768 - t.length), this.s.i = 32768 - t.length;
    }
  }
  return n.prototype.p = function(r, e) {
    this.ondata(Gr(r, this.o, 0, 0, this.s), e);
  }, n.prototype.push = function(r, e) {
    this.ondata || C(5), this.s.l && C(4);
    var t = r.length + this.s.z;
    if (t > this.b.length) {
      if (t > 2 * this.b.length - 32768) {
        var i = new A(t & -32768);
        i.set(this.b.subarray(0, this.s.z)), this.b = i;
      }
      var a = this.b.length - this.s.z;
      this.b.set(r.subarray(0, a), this.s.z), this.s.z = this.b.length, this.p(this.b, !1), this.b.set(this.b.subarray(-32768)), this.b.set(r.subarray(a), 32768), this.s.z = r.length - a + 32768, this.s.i = 32766, this.s.w = 32768;
    } else
      this.b.set(r, this.s.z), this.s.z += r.length;
    this.s.l = e & 1, (this.s.z > this.s.w + 8191 || e) && (this.p(this.b, e || !1), this.s.w = this.s.i, this.s.i -= 2);
  }, n.prototype.flush = function() {
    this.ondata || C(5), this.s.l && C(4), this.p(this.b, !1), this.s.w = this.s.i, this.s.i -= 2;
  }, n;
})(), Dr = typeof TextEncoder < "u" && /* @__PURE__ */ new TextEncoder(), Qr = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Rr = 0;
try {
  Qr.decode(Ur, { stream: !0 }), Rr = 1;
} catch {
}
function _r(n, r) {
  var e;
  if (Dr)
    return Dr.encode(n);
  for (var t = n.length, i = new A(n.length + (n.length >> 1)), a = 0, s = function(c) {
    i[a++] = c;
  }, e = 0; e < t; ++e) {
    if (a + 5 > i.length) {
      var l = new A(a + 8 + (t - e << 1));
      l.set(i), i = l;
    }
    var h = n.charCodeAt(e);
    h < 128 || r ? s(h) : h < 2048 ? (s(192 | h >> 6), s(128 | h & 63)) : h > 55295 && h < 57344 ? (h = 65536 + (h & 1047552) | n.charCodeAt(++e) & 1023, s(240 | h >> 18), s(128 | h >> 12 & 63), s(128 | h >> 6 & 63), s(128 | h & 63)) : (s(224 | h >> 12), s(128 | h >> 6 & 63), s(128 | h & 63));
  }
  return Ir(i, 0, a);
}
var Wr = function(n) {
  return n == 1 ? 3 : n < 6 ? 2 : n == 9 ? 1 : 0;
}, er = function(n) {
  var r = 0;
  if (n)
    for (var e in n) {
      var t = n[e].length;
      t > 65535 && C(9), r += t + 4;
    }
  return r;
}, Br = function(n, r, e, t, i, a, s, l) {
  var h = t.length, c = e.extra, o = l && l.length, u = er(c);
  x(n, r, s != null ? 33639248 : 67324752), r += 4, s != null && (n[r++] = 20, n[r++] = e.os), n[r] = 20, r += 2, n[r++] = e.flag << 1 | (a < 0 && 8), n[r++] = i && 8, n[r++] = e.compression & 255, n[r++] = e.compression >> 8;
  var f = new Date(e.mtime == null ? Date.now() : e.mtime), w = f.getFullYear() - 1980;
  if ((w < 0 || w > 119) && C(10), x(n, r, w << 25 | f.getMonth() + 1 << 21 | f.getDate() << 16 | f.getHours() << 11 | f.getMinutes() << 5 | f.getSeconds() >> 1), r += 4, a != -1 && (x(n, r, e.crc), x(n, r + 4, a < 0 ? -a - 2 : a), x(n, r + 8, e.size)), x(n, r + 12, h), x(n, r + 14, u), r += 16, s != null && (x(n, r, o), x(n, r + 6, e.attrs), x(n, r + 10, s), r += 14), n.set(t, r), r += h, u)
    for (var y in c) {
      var g = c[y], p = g.length;
      x(n, r, +y), x(n, r + 2, p), n.set(g, r + 4), r += 4 + p;
    }
  return o && (n.set(l, r), r += o), r;
}, Xr = function(n, r, e, t, i) {
  x(n, r, 101010256), x(n, r + 8, e), x(n, r + 10, e), x(n, r + 12, t), x(n, r + 16, i);
}, br = /* @__PURE__ */ (function() {
  function n(r) {
    this.filename = r, this.c = Yr(), this.size = 0, this.compression = 0;
  }
  return n.prototype.process = function(r, e) {
    this.ondata(null, r, e);
  }, n.prototype.push = function(r, e) {
    this.ondata || C(5), this.c.p(r), this.size += r.length, e && (this.crc = this.c.d()), this.process(r, e || !1);
  }, n;
})(), j = /* @__PURE__ */ (function() {
  function n(r, e) {
    var t = this;
    e || (e = {}), br.call(this, r), this.d = new Lr(e, function(i, a) {
      t.ondata(null, i, a);
    }), this.compression = 8, this.flag = Wr(e.level);
  }
  return n.prototype.process = function(r, e) {
    try {
      this.d.push(r, e);
    } catch (t) {
      this.ondata(t, null, e);
    }
  }, n.prototype.push = function(r, e) {
    br.prototype.push.call(this, r, e);
  }, n;
})(), Mr = /* @__PURE__ */ (function() {
  function n(r) {
    this.ondata = r, this.u = [], this.d = 1;
  }
  return n.prototype.add = function(r) {
    var e = this;
    if (this.ondata || C(5), this.d & 2)
      this.ondata(C(4 + (this.d & 1) * 8, 0, 1), null, !1);
    else {
      var t = _r(r.filename), i = t.length, a = r.comment, s = a && _r(a), l = i != r.filename.length || s && a.length != s.length, h = i + er(r.extra) + 30;
      i > 65535 && this.ondata(C(11, 0, 1), null, !1);
      var c = new A(h);
      Br(c, 0, r, t, l, -1);
      var o = [c], u = function() {
        for (var p = 0, _ = o; p < _.length; p++) {
          var B = _[p];
          e.ondata(null, B, !1);
        }
        o = [];
      }, f = this.d;
      this.d = 0;
      var w = this.u.length, y = Jr(r, {
        f: t,
        u: l,
        o: s,
        t: function() {
          r.terminate && r.terminate();
        },
        r: function() {
          if (u(), f) {
            var p = e.u[w + 1];
            p ? p.r() : e.d = 1;
          }
          f = 1;
        }
      }), g = 0;
      r.ondata = function(p, _, B) {
        if (p)
          e.ondata(p, _, B), e.terminate();
        else if (g += _.length, o.push(_), B) {
          var M = new A(16);
          x(M, 0, 134695760), x(M, 4, r.crc), x(M, 8, g), x(M, 12, r.size), o.push(M), y.c = g, y.b = h + g + 16, y.crc = r.crc, y.size = r.size, f && y.r(), f = 1;
        } else f && u();
      }, this.u.push(y);
    }
  }, n.prototype.end = function() {
    var r = this;
    if (this.d & 2) {
      this.ondata(C(4 + (this.d & 1) * 8, 0, 1), null, !0);
      return;
    }
    this.d ? this.e() : this.u.push({
      r: function() {
        r.d & 1 && (r.u.splice(-1, 1), r.e());
      },
      t: function() {
      }
    }), this.d = 3;
  }, n.prototype.e = function() {
    for (var r = 0, e = 0, t = 0, i = 0, a = this.u; i < a.length; i++) {
      var s = a[i];
      t += 46 + s.f.length + er(s.extra) + (s.o ? s.o.length : 0);
    }
    for (var l = new A(t + 22), h = 0, c = this.u; h < c.length; h++) {
      var s = c[h];
      Br(l, r, s, s.f, s.u, -s.c - 2, e, s.o), r += 46 + s.f.length + er(s.extra) + (s.o ? s.o.length : 0), e += s.b;
    }
    Xr(l, r, this.u.length, t, e), this.ondata(null, l, !0), this.d = 2;
  }, n.prototype.terminate = function() {
    for (var r = 0, e = this.u; r < e.length; r++) {
      var t = e[r];
      t.t();
    }
    this.d = 2;
  }, n;
})();
async function rr(n = []) {
  const r = [];
  for (const t of n)
    r.push(t.getBuffer());
  await Promise.all(r);
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
  for (const t of n)
    t.uint8Array && (t.isDecode ? (e.decode.names.push(t.name), e.decode.uint8Arrays.push(t.uint8Array)) : (e.noDecode.names.push(t.name), e.noDecode.uint8Arrays.push(t.uint8Array)));
  return e;
}
class $r {
  #r = [];
  #e;
  constructor(r) {
    this.#e = r;
  }
  addTempFile(r) {
    this.#r.push(r);
  }
  clear() {
    this.#r.length = 0;
  }
  //提取单个文件内的所有变量
  async extractOneFileVariables(r, e) {
    const t = await e.getBuffer();
    t && (await e.type() === hr.unknown && !e.isDecode || (r[e.name] = await this.#e.extract_one_file_variable_names(
      t,
      e.isDecode
    )));
  }
  //提取多个文件内的所有变量
  async extractVariables(r) {
    r || (r = this.#r);
    const e = {}, t = [];
    for (const i of r)
      t.push(this.extractOneFileVariables(e, i));
    return await Promise.allSettled(t), e;
  }
  //提取单个文件内的所有媒体文件
  async extractOneFileMedias(r, e) {
    const t = await e.getBuffer();
    if (!t || await e.type() === hr.unknown && !e.isDecode)
      return;
    const i = await this.#e.extract_one_file_medias(
      t,
      e.isDecode
    );
    if (r[e.name] = [], !!Array.isArray(i))
      for (const { id: a, data: s } of i)
        a && s && r[e.name].push({
          id: a,
          data: new Uint8Array(s)
        });
  }
  //提取多个文件内的所有媒体文件
  async extractMedias(r) {
    r || (r = this.#r);
    const e = {}, t = [];
    for (const i of r)
      t.push(this.extractOneFileMedias(e, i));
    return await Promise.all(t), e;
  }
  async handle(r, e, t) {
    return [];
  }
  async handleMultipleParams(r, e, t) {
    return [];
  }
  //签名方法
  async sign(r) {
    return "";
  }
  //执行替换任务
  async execute(r, e) {
    const { noDecode: t, decode: i } = await rr(e ?? this.#r), a = await this.handle(r, t.uint8Arrays, i.uint8Arrays), s = {};
    let l = 0;
    for (const h of t.names)
      s[h] = a[l++] ?? new Uint8Array();
    for (const h of i.names)
      s[h] = a[l++] ?? new Uint8Array();
    return s;
  }
  //执行替换任务（返回zip压缩数据）
  async executeToZip(r, e) {
    const { noDecode: t, decode: i } = await rr(e ?? this.#r), a = await this.handle(r, t.uint8Arrays, i.uint8Arrays);
    return new Promise((s, l) => {
      const h = [], c = new Mr((u, f, w) => {
        f.length && h.push(f), w && new Blob(h).arrayBuffer().then((g) => {
          s(new Uint8Array(g));
        });
      });
      let o = 0;
      for (const u of t.names) {
        const f = new j(u, {
          level: 9
        });
        c.add(f), f.push(a[o++] ?? new Uint8Array(), !0);
      }
      for (const u of i.names) {
        const f = new j(u, {
          level: 9
        });
        c.add(f), f.push(a[o++] ?? new Uint8Array(), !0);
      }
      c.end();
    });
  }
  //执行替换任务（多套参数）
  async executeMultipleParams(r, e) {
    const { noDecode: t, decode: i } = await rr(e ?? this.#r), a = await this.handleMultipleParams(r, t.uint8Arrays, i.uint8Arrays), s = Array(r.length);
    let l = 0;
    for (let h = 0; h < r.length; h++) {
      const c = {};
      for (const o of t.names) {
        const u = a[l++];
        u.length && (c[o] = u);
      }
      for (const o of i.names) {
        const u = a[l++];
        u.length && (c[o] = u);
      }
      s[h] = c;
    }
    return s;
  }
  //执行替换任务（多套参数，返回zip压缩数据）
  async executeMultipleParamsToZip(r, e) {
    const { noDecode: t, decode: i } = await rr(e ?? this.#r), a = await this.handleMultipleParams(r, t.uint8Arrays, i.uint8Arrays);
    return new Promise((s, l) => {
      const h = [], c = new Mr((u, f, w) => {
        f.length && h.push(f), w && new Blob(h).arrayBuffer().then((g) => {
          s(new Uint8Array(g));
        });
      });
      let o = 0;
      for (let u = 0; u < r.length; u++) {
        for (const f of t.names) {
          const w = a[o++];
          if (w.length) {
            const y = new j(u + "/" + f, {
              level: 9
            });
            c.add(y), y.push(w, !0);
          }
        }
        for (const f of i.names) {
          const w = a[o++];
          if (w.length) {
            const y = new j(u + "/" + f, {
              level: 9
            });
            c.add(y), y.push(w, !0);
          }
        }
      }
      c.end();
    });
  }
  //文件加密
  fileEncrypt(r) {
    return this.#e.file_encrypt(r);
  }
  //文件批量加密
  filesEncrypt(r) {
    return this.#e.files_encrypt(r);
  }
}
class jr {
  constructor(r) {
    this.awaitInit = r;
  }
  async add_template(r, e) {
    return (await this.awaitInit).add_template(r, e);
  }
  async add_media(r) {
    return (await this.awaitInit).add_media(r);
  }
  async extract_one_file_variable_names(r, e) {
    return (await this.awaitInit).extract_one_file_variable_names(r, e);
  }
  async extract_variable_names(r, e) {
    return (await this.awaitInit).extract_variable_names(r, e);
  }
  async extract_one_file_medias(r, e) {
    return (await this.awaitInit).extract_one_file_medias(r, e);
  }
  async extract_medias(r, e) {
    return (await this.awaitInit).extract_medias(r, e);
  }
  async file_encrypt(r) {
    return (await this.awaitInit).file_encrypt(r);
  }
  async files_encrypt(r) {
    return (await this.awaitInit).files_encrypt(r);
  }
}
export {
  $r as B,
  jr as b
};
