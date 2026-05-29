//#region \0rolldown/runtime.js
var e = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports);
new class {
	#e;
	#t;
	#n;
	#r;
	constructor() {
		this._initFinishCallBackFuns = [], this.#e = !1, this.#t = "template_replacement_db", this.#n = 1, this.#r = "template_files", this.#i();
	}
	#i() {
		return this._init ||= new Promise((e, t) => {
			let n = indexedDB.open(this.#t, this.#n);
			n.onsuccess = (t) => {
				if (this._db = n.result, this.#e = !0, this._initFinishCallBackFuns) {
					try {
						for (let e of this._initFinishCallBackFuns) e();
					} catch {}
					this._initFinishCallBackFuns = void 0;
				}
				e(t);
			}, n.onerror = (e) => {
				console.error(e), t(e);
			}, n.onupgradeneeded = (t) => {
				let r = n.result;
				r.objectStoreNames.contains(this.#r) || r.createObjectStore(this.#r, { keyPath: "key" }), e(t);
			};
		}), this._init;
	}
	async awaitInit() {
		this.#e || !this._initFinishCallBackFuns || await new Promise((e, t) => {
			this._initFinishCallBackFuns?.push(e);
		});
	}
	closeDB() {
		this._db?.close();
	}
	async store(e) {
		return await this.awaitInit(), this._db.transaction(this.#r, e).objectStore(this.#r);
	}
	putData(e) {
		return new Promise((t, n) => {
			this.store("readwrite").then((r) => {
				let i = r.put(e);
				i.onsuccess = (e) => {
					t(e);
				}, i.onerror = (e) => {
					n(e);
				};
			}).catch(n);
		});
	}
	getDataByKey(e) {
		return new Promise((t, n) => {
			this.store().then((r) => {
				let i = r.get(e);
				i.onsuccess = () => {
					t(i.result);
				}, i.onerror = (e) => {
					n(e);
				};
			}).catch(n);
		});
	}
	deleteDataByKey(e) {
		return new Promise((t, n) => {
			this.store().then((r) => {
				let i = r.delete(e);
				i.onsuccess = () => {
					t(i.result);
				}, i.onerror = (e) => {
					n(e);
				};
			}).catch(n);
		});
	}
	clearDB() {
		return new Promise((e, t) => {
			this.store("readwrite").then((n) => {
				let r = n.clear();
				r.onsuccess = (t) => {
					e(t);
				}, r.onerror = (e) => {
					t(e);
				};
			}).catch(t);
		});
	}
}();
//#endregion
//#region __vite-browser-external
var t = /* @__PURE__ */ e(((e, t) => {
	t.exports = {};
}));
(/* @__PURE__ */ e(((e, n) => {
	(function() {
		var e = "input is invalid type", r = "finalize already called", i = typeof window == "object", a = i ? window : {};
		a.JS_SHA1_NO_WINDOW && (i = !1);
		var o = !i && typeof self == "object", s = !a.JS_SHA1_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
		s ? a = global : o && (a = self);
		var c = !a.JS_SHA1_NO_COMMON_JS && typeof n == "object" && n.exports, l = typeof define == "function" && define.amd, u = !a.JS_SHA1_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", d = "0123456789abcdef".split(""), f = [
			-2147483648,
			8388608,
			32768,
			128
		], p = [
			24,
			16,
			8,
			0
		], m = [
			"hex",
			"array",
			"digest",
			"arrayBuffer"
		], h = [], g = Array.isArray;
		(a.JS_SHA1_NO_NODE_JS || !g) && (g = function(e) {
			return Object.prototype.toString.call(e) === "[object Array]";
		});
		var _ = ArrayBuffer.isView;
		u && (a.JS_SHA1_NO_ARRAY_BUFFER_IS_VIEW || !_) && (_ = function(e) {
			return typeof e == "object" && e.buffer && e.buffer.constructor === ArrayBuffer;
		});
		var v = function(t) {
			var n = typeof t;
			if (n === "string") return [t, !0];
			if (n !== "object" || t === null) throw Error(e);
			if (u && t.constructor === ArrayBuffer) return [new Uint8Array(t), !1];
			if (!g(t) && !_(t)) throw Error(e);
			return [t, !1];
		}, y = function(e) {
			return function(t) {
				return new w(!0).update(t)[e]();
			};
		}, b = function() {
			var e = y("hex");
			s && (e = x(e)), e.create = function() {
				return new w();
			}, e.update = function(t) {
				return e.create().update(t);
			};
			for (var t = 0; t < m.length; ++t) {
				var n = m[t];
				e[n] = y(n);
			}
			return e;
		}, x = function(n) {
			var r = t(), i = t().Buffer, o = i.from && !a.JS_SHA1_NO_BUFFER_FROM ? i.from : function(e) {
				return new i(e);
			};
			return function(t) {
				if (typeof t == "string") return r.createHash("sha1").update(t, "utf8").digest("hex");
				if (t == null) throw Error(e);
				return t.constructor === ArrayBuffer && (t = new Uint8Array(t)), g(t) || _(t) || t.constructor === i ? r.createHash("sha1").update(o(t)).digest("hex") : n(t);
			};
		}, S = function(e) {
			return function(t, n) {
				return new T(t, !0).update(n)[e]();
			};
		}, C = function() {
			var e = S("hex");
			e.create = function(e) {
				return new T(e);
			}, e.update = function(t, n) {
				return e.create(t).update(n);
			};
			for (var t = 0; t < m.length; ++t) {
				var n = m[t];
				e[n] = S(n);
			}
			return e;
		};
		function w(e) {
			e ? (h[0] = h[16] = h[1] = h[2] = h[3] = h[4] = h[5] = h[6] = h[7] = h[8] = h[9] = h[10] = h[11] = h[12] = h[13] = h[14] = h[15] = 0, this.blocks = h) : this.blocks = [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			], this.h0 = 1732584193, this.h1 = 4023233417, this.h2 = 2562383102, this.h3 = 271733878, this.h4 = 3285377520, this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0;
		}
		w.prototype.update = function(e) {
			if (this.finalized) throw Error(r);
			var t = v(e);
			e = t[0];
			for (var n = t[1], i, a = 0, o, s = e.length || 0, c = this.blocks; a < s;) {
				if (this.hashed && (this.hashed = !1, c[0] = this.block, this.block = c[16] = c[1] = c[2] = c[3] = c[4] = c[5] = c[6] = c[7] = c[8] = c[9] = c[10] = c[11] = c[12] = c[13] = c[14] = c[15] = 0), n) for (o = this.start; a < s && o < 64; ++a) i = e.charCodeAt(a), i < 128 ? c[o >>> 2] |= i << p[o++ & 3] : i < 2048 ? (c[o >>> 2] |= (192 | i >>> 6) << p[o++ & 3], c[o >>> 2] |= (128 | i & 63) << p[o++ & 3]) : i < 55296 || i >= 57344 ? (c[o >>> 2] |= (224 | i >>> 12) << p[o++ & 3], c[o >>> 2] |= (128 | i >>> 6 & 63) << p[o++ & 3], c[o >>> 2] |= (128 | i & 63) << p[o++ & 3]) : (i = 65536 + ((i & 1023) << 10 | e.charCodeAt(++a) & 1023), c[o >>> 2] |= (240 | i >>> 18) << p[o++ & 3], c[o >>> 2] |= (128 | i >>> 12 & 63) << p[o++ & 3], c[o >>> 2] |= (128 | i >>> 6 & 63) << p[o++ & 3], c[o >>> 2] |= (128 | i & 63) << p[o++ & 3]);
				else for (o = this.start; a < s && o < 64; ++a) c[o >>> 2] |= e[a] << p[o++ & 3];
				this.lastByteIndex = o, this.bytes += o - this.start, o >= 64 ? (this.block = c[16], this.start = o - 64, this.hash(), this.hashed = !0) : this.start = o;
			}
			return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes %= 4294967296), this;
		}, w.prototype.finalize = function() {
			if (!this.finalized) {
				this.finalized = !0;
				var e = this.blocks, t = this.lastByteIndex;
				e[16] = this.block, e[t >>> 2] |= f[t & 3], this.block = e[16], t >= 56 && (this.hashed || this.hash(), e[0] = this.block, e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), e[14] = this.hBytes << 3 | this.bytes >>> 29, e[15] = this.bytes << 3, this.hash();
			}
		}, w.prototype.hash = function() {
			var e = this.h0, t = this.h1, n = this.h2, r = this.h3, i = this.h4, a, o, s, c = this.blocks;
			for (o = 16; o < 80; ++o) s = c[o - 3] ^ c[o - 8] ^ c[o - 14] ^ c[o - 16], c[o] = s << 1 | s >>> 31;
			for (o = 0; o < 20; o += 5) a = t & n | ~t & r, s = e << 5 | e >>> 27, i = s + a + i + 1518500249 + c[o] << 0, t = t << 30 | t >>> 2, a = e & t | ~e & n, s = i << 5 | i >>> 27, r = s + a + r + 1518500249 + c[o + 1] << 0, e = e << 30 | e >>> 2, a = i & e | ~i & t, s = r << 5 | r >>> 27, n = s + a + n + 1518500249 + c[o + 2] << 0, i = i << 30 | i >>> 2, a = r & i | ~r & e, s = n << 5 | n >>> 27, t = s + a + t + 1518500249 + c[o + 3] << 0, r = r << 30 | r >>> 2, a = n & r | ~n & i, s = t << 5 | t >>> 27, e = s + a + e + 1518500249 + c[o + 4] << 0, n = n << 30 | n >>> 2;
			for (; o < 40; o += 5) a = t ^ n ^ r, s = e << 5 | e >>> 27, i = s + a + i + 1859775393 + c[o] << 0, t = t << 30 | t >>> 2, a = e ^ t ^ n, s = i << 5 | i >>> 27, r = s + a + r + 1859775393 + c[o + 1] << 0, e = e << 30 | e >>> 2, a = i ^ e ^ t, s = r << 5 | r >>> 27, n = s + a + n + 1859775393 + c[o + 2] << 0, i = i << 30 | i >>> 2, a = r ^ i ^ e, s = n << 5 | n >>> 27, t = s + a + t + 1859775393 + c[o + 3] << 0, r = r << 30 | r >>> 2, a = n ^ r ^ i, s = t << 5 | t >>> 27, e = s + a + e + 1859775393 + c[o + 4] << 0, n = n << 30 | n >>> 2;
			for (; o < 60; o += 5) a = t & n | t & r | n & r, s = e << 5 | e >>> 27, i = s + a + i - 1894007588 + c[o] << 0, t = t << 30 | t >>> 2, a = e & t | e & n | t & n, s = i << 5 | i >>> 27, r = s + a + r - 1894007588 + c[o + 1] << 0, e = e << 30 | e >>> 2, a = i & e | i & t | e & t, s = r << 5 | r >>> 27, n = s + a + n - 1894007588 + c[o + 2] << 0, i = i << 30 | i >>> 2, a = r & i | r & e | i & e, s = n << 5 | n >>> 27, t = s + a + t - 1894007588 + c[o + 3] << 0, r = r << 30 | r >>> 2, a = n & r | n & i | r & i, s = t << 5 | t >>> 27, e = s + a + e - 1894007588 + c[o + 4] << 0, n = n << 30 | n >>> 2;
			for (; o < 80; o += 5) a = t ^ n ^ r, s = e << 5 | e >>> 27, i = s + a + i - 899497514 + c[o] << 0, t = t << 30 | t >>> 2, a = e ^ t ^ n, s = i << 5 | i >>> 27, r = s + a + r - 899497514 + c[o + 1] << 0, e = e << 30 | e >>> 2, a = i ^ e ^ t, s = r << 5 | r >>> 27, n = s + a + n - 899497514 + c[o + 2] << 0, i = i << 30 | i >>> 2, a = r ^ i ^ e, s = n << 5 | n >>> 27, t = s + a + t - 899497514 + c[o + 3] << 0, r = r << 30 | r >>> 2, a = n ^ r ^ i, s = t << 5 | t >>> 27, e = s + a + e - 899497514 + c[o + 4] << 0, n = n << 30 | n >>> 2;
			this.h0 = this.h0 + e << 0, this.h1 = this.h1 + t << 0, this.h2 = this.h2 + n << 0, this.h3 = this.h3 + r << 0, this.h4 = this.h4 + i << 0;
		}, w.prototype.hex = function() {
			this.finalize();
			var e = this.h0, t = this.h1, n = this.h2, r = this.h3, i = this.h4;
			return d[e >>> 28 & 15] + d[e >>> 24 & 15] + d[e >>> 20 & 15] + d[e >>> 16 & 15] + d[e >>> 12 & 15] + d[e >>> 8 & 15] + d[e >>> 4 & 15] + d[e & 15] + d[t >>> 28 & 15] + d[t >>> 24 & 15] + d[t >>> 20 & 15] + d[t >>> 16 & 15] + d[t >>> 12 & 15] + d[t >>> 8 & 15] + d[t >>> 4 & 15] + d[t & 15] + d[n >>> 28 & 15] + d[n >>> 24 & 15] + d[n >>> 20 & 15] + d[n >>> 16 & 15] + d[n >>> 12 & 15] + d[n >>> 8 & 15] + d[n >>> 4 & 15] + d[n & 15] + d[r >>> 28 & 15] + d[r >>> 24 & 15] + d[r >>> 20 & 15] + d[r >>> 16 & 15] + d[r >>> 12 & 15] + d[r >>> 8 & 15] + d[r >>> 4 & 15] + d[r & 15] + d[i >>> 28 & 15] + d[i >>> 24 & 15] + d[i >>> 20 & 15] + d[i >>> 16 & 15] + d[i >>> 12 & 15] + d[i >>> 8 & 15] + d[i >>> 4 & 15] + d[i & 15];
		}, w.prototype.toString = w.prototype.hex, w.prototype.digest = function() {
			this.finalize();
			var e = this.h0, t = this.h1, n = this.h2, r = this.h3, i = this.h4;
			return [
				e >>> 24 & 255,
				e >>> 16 & 255,
				e >>> 8 & 255,
				e & 255,
				t >>> 24 & 255,
				t >>> 16 & 255,
				t >>> 8 & 255,
				t & 255,
				n >>> 24 & 255,
				n >>> 16 & 255,
				n >>> 8 & 255,
				n & 255,
				r >>> 24 & 255,
				r >>> 16 & 255,
				r >>> 8 & 255,
				r & 255,
				i >>> 24 & 255,
				i >>> 16 & 255,
				i >>> 8 & 255,
				i & 255
			];
		}, w.prototype.array = w.prototype.digest, w.prototype.arrayBuffer = function() {
			this.finalize();
			var e = /* @__PURE__ */ new ArrayBuffer(20), t = new DataView(e);
			return t.setUint32(0, this.h0), t.setUint32(4, this.h1), t.setUint32(8, this.h2), t.setUint32(12, this.h3), t.setUint32(16, this.h4), e;
		};
		function T(e, t) {
			var n, r = v(e);
			if (e = r[0], r[1]) {
				var i = [], a = e.length, o = 0, s;
				for (n = 0; n < a; ++n) s = e.charCodeAt(n), s < 128 ? i[o++] = s : s < 2048 ? (i[o++] = 192 | s >>> 6, i[o++] = 128 | s & 63) : s < 55296 || s >= 57344 ? (i[o++] = 224 | s >>> 12, i[o++] = 128 | s >>> 6 & 63, i[o++] = 128 | s & 63) : (s = 65536 + ((s & 1023) << 10 | e.charCodeAt(++n) & 1023), i[o++] = 240 | s >>> 18, i[o++] = 128 | s >>> 12 & 63, i[o++] = 128 | s >>> 6 & 63, i[o++] = 128 | s & 63);
				e = i;
			}
			e.length > 64 && (e = new w(!0).update(e).array());
			var c = [], l = [];
			for (n = 0; n < 64; ++n) {
				var u = e[n] || 0;
				c[n] = 92 ^ u, l[n] = 54 ^ u;
			}
			w.call(this, t), this.update(l), this.oKeyPad = c, this.inner = !0, this.sharedMemory = t;
		}
		T.prototype = new w(), T.prototype.finalize = function() {
			if (w.prototype.finalize.call(this), this.inner) {
				this.inner = !1;
				var e = this.array();
				w.call(this, this.sharedMemory), this.update(this.oKeyPad), this.update(e), w.prototype.finalize.call(this);
			}
		};
		var E = b();
		E.sha1 = E, E.sha1.hmac = C(), c ? n.exports = E : (a.sha1 = E, l && define(function() {
			return E;
		}));
	})();
})))();
var n = /* @__PURE__ */ function(e) {
	return e.word = "word", e.excel = "excel", e.unknown = "unknown", e;
}({}), r = Uint8Array, i = Uint16Array, a = Int32Array, o = new r([
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
	0,
	0,
	0
]), s = new r([
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
	0,
	0
]), c = new r([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]), l = function(e, t) {
	for (var n = new i(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var o = new a(n[30]), r = 1; r < 30; ++r) for (var s = n[r]; s < n[r + 1]; ++s) o[s] = s - n[r] << 5 | r;
	return {
		b: n,
		r: o
	};
}, u = l(o, 2), d = u.b, f = u.r;
d[28] = 258, f[258] = 28;
var p = l(s, 0);
p.b;
for (var m = p.r, h = new i(32768), g = 0; g < 32768; ++g) {
	var _ = (g & 43690) >> 1 | (g & 21845) << 1;
	_ = (_ & 52428) >> 2 | (_ & 13107) << 2, _ = (_ & 61680) >> 4 | (_ & 3855) << 4, h[g] = ((_ & 65280) >> 8 | (_ & 255) << 8) >> 1;
}
for (var v = (function(e, t, n) {
	for (var r = e.length, a = 0, o = new i(t); a < r; ++a) e[a] && ++o[e[a] - 1];
	var s = new i(t);
	for (a = 1; a < t; ++a) s[a] = s[a - 1] + o[a - 1] << 1;
	var c;
	if (n) {
		c = new i(1 << t);
		var l = 15 - t;
		for (a = 0; a < r; ++a) if (e[a]) for (var u = a << 4 | e[a], d = t - e[a], f = s[e[a] - 1]++ << d, p = f | (1 << d) - 1; f <= p; ++f) c[h[f] >> l] = u;
	} else for (c = new i(r), a = 0; a < r; ++a) e[a] && (c[a] = h[s[e[a] - 1]++] >> 15 - e[a]);
	return c;
}), y = new r(288), g = 0; g < 144; ++g) y[g] = 8;
for (var g = 144; g < 256; ++g) y[g] = 9;
for (var g = 256; g < 280; ++g) y[g] = 7;
for (var g = 280; g < 288; ++g) y[g] = 8;
for (var b = new r(32), g = 0; g < 32; ++g) b[g] = 5;
var x = /* @__PURE__ */ v(y, 9, 0), S = /* @__PURE__ */ v(b, 5, 0), C = function(e) {
	return (e + 7) / 8 | 0;
}, w = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new r(e.subarray(t, n));
}, T = [
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
], E = function(e, t, n) {
	var r = Error(t || T[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, E), !n) throw r;
	return r;
}, D = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, O = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, k = function(e, t) {
	for (var n = [], a = 0; a < e.length; ++a) e[a] && n.push({
		s: a,
		f: e[a]
	});
	var o = n.length, s = n.slice();
	if (!o) return {
		t: N,
		l: 0
	};
	if (o == 1) {
		var c = new r(n[0].s + 1);
		return c[n[0].s] = 1, {
			t: c,
			l: 1
		};
	}
	n.sort(function(e, t) {
		return e.f - t.f;
	}), n.push({
		s: -1,
		f: 25001
	});
	var l = n[0], u = n[1], d = 0, f = 1, p = 2;
	for (n[0] = {
		s: -1,
		f: l.f + u.f,
		l,
		r: u
	}; f != o - 1;) l = n[n[d].f < n[p].f ? d++ : p++], u = n[d != f && n[d].f < n[p].f ? d++ : p++], n[f++] = {
		s: -1,
		f: l.f + u.f,
		l,
		r: u
	};
	for (var m = s[0].s, a = 1; a < o; ++a) s[a].s > m && (m = s[a].s);
	var h = new i(m + 1), g = A(n[f - 1], h, 0);
	if (g > t) {
		var a = 0, _ = 0, v = g - t, y = 1 << v;
		for (s.sort(function(e, t) {
			return h[t.s] - h[e.s] || e.f - t.f;
		}); a < o; ++a) {
			var b = s[a].s;
			if (h[b] > t) _ += y - (1 << g - h[b]), h[b] = t;
			else break;
		}
		for (_ >>= v; _ > 0;) {
			var x = s[a].s;
			h[x] < t ? _ -= 1 << t - h[x]++ - 1 : ++a;
		}
		for (; a >= 0 && _; --a) {
			var S = s[a].s;
			h[S] == t && (--h[S], ++_);
		}
		g = t;
	}
	return {
		t: new r(h),
		l: g
	};
}, A = function(e, t, n) {
	return e.s == -1 ? Math.max(A(e.l, t, n + 1), A(e.r, t, n + 1)) : t[e.s] = n;
}, j = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new i(++t), r = 0, a = e[0], o = 1, s = function(e) {
		n[r++] = e;
	}, c = 1; c <= t; ++c) if (e[c] == a && c != t) ++o;
	else {
		if (!a && o > 2) {
			for (; o > 138; o -= 138) s(32754);
			o > 2 && (s(o > 10 ? o - 11 << 5 | 28690 : o - 3 << 5 | 12305), o = 0);
		} else if (o > 3) {
			for (s(a), --o; o > 6; o -= 6) s(8304);
			o > 2 && (s(o - 3 << 5 | 8208), o = 0);
		}
		for (; o--;) s(a);
		o = 1, a = e[c];
	}
	return {
		c: n.subarray(0, r),
		n: t
	};
}, M = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, ee = function(e, t, n) {
	var r = n.length, i = C(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, te = function(e, t, n, r, a, l, u, d, f, p, m) {
	D(t, m++, n), ++a[256];
	for (var h = k(a, 15), g = h.t, _ = h.l, C = k(l, 15), w = C.t, T = C.l, E = j(g), A = E.c, te = E.n, ne = j(w), N = ne.c, P = ne.n, F = new i(19), I = 0; I < A.length; ++I) ++F[A[I] & 31];
	for (var I = 0; I < N.length; ++I) ++F[N[I] & 31];
	for (var L = k(F, 7), R = L.t, z = L.l, B = 19; B > 4 && !R[c[B - 1]]; --B);
	var V = p + 5 << 3, H = M(a, y) + M(l, b) + u, U = M(a, g) + M(l, w) + u + 14 + 3 * B + M(F, R) + 2 * F[16] + 3 * F[17] + 7 * F[18];
	if (f >= 0 && V <= H && V <= U) return ee(t, m, e.subarray(f, f + p));
	var W, G, K, q;
	if (D(t, m, 1 + (U < H)), m += 2, U < H) {
		W = v(g, _, 0), G = g, K = v(w, T, 0), q = w;
		var re = v(R, z, 0);
		D(t, m, te - 257), D(t, m + 5, P - 1), D(t, m + 10, B - 4), m += 14;
		for (var I = 0; I < B; ++I) D(t, m + 3 * I, R[c[I]]);
		m += 3 * B;
		for (var J = [A, N], Y = 0; Y < 2; ++Y) for (var X = J[Y], I = 0; I < X.length; ++I) {
			var Z = X[I] & 31;
			D(t, m, re[Z]), m += R[Z], Z > 15 && (D(t, m, X[I] >> 5 & 127), m += X[I] >> 12);
		}
	} else W = x, G = y, K = S, q = b;
	for (var I = 0; I < d; ++I) {
		var Q = r[I];
		if (Q > 255) {
			var Z = Q >> 18 & 31;
			O(t, m, W[Z + 257]), m += G[Z + 257], Z > 7 && (D(t, m, Q >> 23 & 31), m += o[Z]);
			var $ = Q & 31;
			O(t, m, K[$]), m += q[$], $ > 3 && (O(t, m, Q >> 5 & 8191), m += s[$]);
		} else O(t, m, W[Q]), m += G[Q];
	}
	return O(t, m, W[256]), m + G[256];
}, ne = /* @__PURE__ */ new a([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), N = /* @__PURE__ */ new r(0), P = function(e, t, n, c, l, u) {
	var d = u.z || e.length, p = new r(c + d + 5 * (1 + Math.ceil(d / 7e3)) + l), h = p.subarray(c, p.length - l), g = u.l, _ = (u.r || 0) & 7;
	if (t) {
		_ && (h[0] = u.r >> 3);
		for (var v = ne[t - 1], y = v >> 13, b = v & 8191, x = (1 << n) - 1, S = u.p || new i(32768), T = u.h || new i(x + 1), E = Math.ceil(n / 3), D = 2 * E, O = function(t) {
			return (e[t] ^ e[t + 1] << E ^ e[t + 2] << D) & x;
		}, k = new a(25e3), A = new i(288), j = new i(32), M = 0, N = 0, P = u.i || 0, F = 0, I = u.w || 0, L = 0; P + 2 < d; ++P) {
			var R = O(P), z = P & 32767, B = T[R];
			if (S[z] = B, T[R] = z, I <= P) {
				var V = d - P;
				if ((M > 7e3 || F > 24576) && (V > 423 || !g)) {
					_ = te(e, h, 0, k, A, j, N, F, L, P - L, _), F = M = N = 0, L = P;
					for (var H = 0; H < 286; ++H) A[H] = 0;
					for (var H = 0; H < 30; ++H) j[H] = 0;
				}
				var U = 2, W = 0, G = b, K = z - B & 32767;
				if (V > 2 && R == O(P - K)) for (var q = Math.min(y, V) - 1, re = Math.min(32767, P), J = Math.min(258, V); K <= re && --G && z != B;) {
					if (e[P + U] == e[P + U - K]) {
						for (var Y = 0; Y < J && e[P + Y] == e[P + Y - K]; ++Y);
						if (Y > U) {
							if (U = Y, W = K, Y > q) break;
							for (var X = Math.min(K, Y - 2), Z = 0, H = 0; H < X; ++H) {
								var Q = P - K + H & 32767, $ = Q - S[Q] & 32767;
								$ > Z && (Z = $, B = Q);
							}
						}
					}
					z = B, B = S[z], K += z - B & 32767;
				}
				if (W) {
					k[F++] = 268435456 | f[U] << 18 | m[W];
					var ie = f[U] & 31, ae = m[W] & 31;
					N += o[ie] + s[ae], ++A[257 + ie], ++j[ae], I = P + U, ++M;
				} else k[F++] = e[P], ++A[e[P]];
			}
		}
		for (P = Math.max(P, I); P < d; ++P) k[F++] = e[P], ++A[e[P]];
		_ = te(e, h, g, k, A, j, N, F, L, P - L, _), g || (u.r = _ & 7 | h[_ / 8 | 0] << 3, _ -= 7, u.h = T, u.p = S, u.i = P, u.w = I);
	} else {
		for (var P = u.w || 0; P < d + g; P += 65535) {
			var oe = P + 65535;
			oe >= d && (h[_ / 8 | 0] = g, oe = d), _ = ee(h, _ + 1, e.subarray(P, oe));
		}
		u.i = d;
	}
	return w(p, 0, c + C(_) + l);
}, F = /* @__PURE__ */ (function() {
	for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
		for (var n = t, r = 9; --r;) n = (n & 1 && -306674912) ^ n >>> 1;
		e[t] = n;
	}
	return e;
})(), I = function() {
	var e = -1;
	return {
		p: function(t) {
			for (var n = e, r = 0; r < t.length; ++r) n = F[n & 255 ^ t[r]] ^ n >>> 8;
			e = n;
		},
		d: function() {
			return ~e;
		}
	};
}, L = function(e, t, n, i, a) {
	if (!a && (a = { l: 1 }, t.dictionary)) {
		var o = t.dictionary.subarray(-32768), s = new r(o.length + e.length);
		s.set(o), s.set(e, o.length), e = s, a.w = o.length;
	}
	return P(e, t.level == null ? 6 : t.level, t.mem == null ? a.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, i, a);
}, R = function(e, t) {
	var n = {};
	for (var r in e) n[r] = e[r];
	for (var r in t) n[r] = t[r];
	return n;
}, z = function(e, t, n) {
	for (; n; ++t) e[t] = n, n >>>= 8;
}, B = /* @__PURE__ */ function() {
	function e(e, t) {
		if (typeof e == "function" && (t = e, e = {}), this.ondata = t, this.o = e || {}, this.s = {
			l: 0,
			i: 32768,
			w: 32768,
			z: 32768
		}, this.b = new r(98304), this.o.dictionary) {
			var n = this.o.dictionary.subarray(-32768);
			this.b.set(n, 32768 - n.length), this.s.i = 32768 - n.length;
		}
	}
	return e.prototype.p = function(e, t) {
		this.ondata(L(e, this.o, 0, 0, this.s), t);
	}, e.prototype.push = function(e, t) {
		this.ondata || E(5), this.s.l && E(4);
		var n = e.length + this.s.z;
		if (n > this.b.length) {
			if (n > 2 * this.b.length - 32768) {
				var i = new r(n & -32768);
				i.set(this.b.subarray(0, this.s.z)), this.b = i;
			}
			var a = this.b.length - this.s.z;
			this.b.set(e.subarray(0, a), this.s.z), this.s.z = this.b.length, this.p(this.b, !1), this.b.set(this.b.subarray(-32768)), this.b.set(e.subarray(a), 32768), this.s.z = e.length - a + 32768, this.s.i = 32766, this.s.w = 32768;
		} else this.b.set(e, this.s.z), this.s.z += e.length;
		this.s.l = t & 1, (this.s.z > this.s.w + 8191 || t) && (this.p(this.b, t || !1), this.s.w = this.s.i, this.s.i -= 2), t && (this.s = this.o = {}, this.b = N);
	}, e.prototype.flush = function(e) {
		if (this.ondata || E(5), this.s.l && E(4), this.p(this.b, !1), this.s.w = this.s.i, this.s.i -= 2, e) {
			var t = new r(6);
			t[0] = this.s.r >> 3;
			var n = ee(t, this.s.r, N);
			this.s.r = 0, this.ondata(t.subarray(0, n >> 3), !1);
		}
	}, e;
}(), V = typeof TextEncoder < "u" && /* @__PURE__ */ new TextEncoder(), H = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder();
try {
	H.decode(N, { stream: !0 });
} catch {}
function U(e, t) {
	if (t) {
		for (var n = new r(e.length), i = 0; i < e.length; ++i) n[i] = e.charCodeAt(i);
		return n;
	}
	if (V) return V.encode(e);
	for (var a = e.length, o = new r(e.length + (e.length >> 1)), s = 0, c = function(e) {
		o[s++] = e;
	}, i = 0; i < a; ++i) {
		if (s + 5 > o.length) {
			var l = new r(s + 8 + (a - i << 1));
			l.set(o), o = l;
		}
		var u = e.charCodeAt(i);
		u < 128 || t ? c(u) : u < 2048 ? (c(192 | u >> 6), c(128 | u & 63)) : u > 55295 && u < 57344 ? (u = 65536 + (u & 1047552) | e.charCodeAt(++i) & 1023, c(240 | u >> 18), c(128 | u >> 12 & 63), c(128 | u >> 6 & 63), c(128 | u & 63)) : (c(224 | u >> 12), c(128 | u >> 6 & 63), c(128 | u & 63));
	}
	return w(o, 0, s);
}
var W = function(e) {
	return e == 1 ? 3 : e < 6 ? 2 : +(e == 9);
}, G = function(e) {
	var t = 0;
	if (e) for (var n in e) {
		var r = e[n].length;
		r > 65535 && E(9), t += r + 4;
	}
	return t;
}, K = function(e, t, n, r, i, a, o, s) {
	var c = r.length, l = n.extra, u = s && s.length, d = G(l);
	z(e, t, o == null ? 67324752 : 33639248), t += 4, o != null && (e[t++] = 20, e[t++] = n.os), e[t] = 20, t += 2, e[t++] = n.flag << 1 | (a < 0 && 8), e[t++] = i && 8, e[t++] = n.compression & 255, e[t++] = n.compression >> 8;
	var f = new Date(n.mtime == null ? Date.now() : n.mtime), p = f.getFullYear() - 1980;
	if ((p < 0 || p > 119) && E(10), z(e, t, p << 25 | f.getMonth() + 1 << 21 | f.getDate() << 16 | f.getHours() << 11 | f.getMinutes() << 5 | f.getSeconds() >> 1), t += 4, a != -1 && (z(e, t, n.crc), z(e, t + 4, a < 0 ? -a - 2 : a), z(e, t + 8, n.size)), z(e, t + 12, c), z(e, t + 14, d), t += 16, o != null && (z(e, t, u), z(e, t + 6, n.attrs), z(e, t + 10, o), t += 14), e.set(r, t), t += c, d) for (var m in l) {
		var h = l[m], g = h.length;
		z(e, t, +m), z(e, t + 2, g), e.set(h, t + 4), t += 4 + g;
	}
	return u && (e.set(s, t), t += u), t;
}, q = function(e, t, n, r, i) {
	z(e, t, 101010256), z(e, t + 8, n), z(e, t + 10, n), z(e, t + 12, r), z(e, t + 16, i);
}, re = /* @__PURE__ */ function() {
	function e(e) {
		this.filename = e, this.c = I(), this.size = 0, this.compression = 0;
	}
	return e.prototype.process = function(e, t) {
		this.ondata(null, e, t);
	}, e.prototype.push = function(e, t) {
		this.ondata || E(5), this.c.p(e), this.size += e.length, t && (this.crc = this.c.d()), this.process(e, t || !1);
	}, e;
}(), J = /* @__PURE__ */ function() {
	function e(e, t) {
		var n = this;
		t ||= {}, re.call(this, e), this.d = new B(t, function(e, t) {
			n.ondata(null, e, t);
		}), this.compression = 8, this.flag = W(t.level);
	}
	return e.prototype.process = function(e, t) {
		try {
			this.d.push(e, t);
		} catch (e) {
			this.ondata(e, null, t);
		}
	}, e.prototype.push = function(e, t) {
		re.prototype.push.call(this, e, t);
	}, e;
}(), Y = /* @__PURE__ */ function() {
	function e(e) {
		this.ondata = e, this.u = [], this.d = 1;
	}
	return e.prototype.add = function(e) {
		var t = this;
		if (this.ondata || E(5), this.d & 2) this.ondata(E(4 + (this.d & 1) * 8, 0, 1), null, !1);
		else {
			var n = U(e.filename), i = n.length, a = e.comment, o = a && U(a), s = i != e.filename.length || o && a.length != o.length, c = i + G(e.extra) + 30;
			i > 65535 && this.ondata(E(11, 0, 1), null, !1);
			var l = new r(c);
			K(l, 0, e, n, s, -1);
			var u = [l], d = function() {
				for (var e = 0, n = u; e < n.length; e++) {
					var r = n[e];
					t.ondata(null, r, !1);
				}
				u = [];
			}, f = this.d;
			this.d = 0;
			var p = this.u.length, m = R(e, {
				f: n,
				u: s,
				o,
				t: function() {
					e.terminate && e.terminate();
				},
				r: function() {
					if (d(), f) {
						var e = t.u[p + 1];
						e ? e.r() : t.d = 1;
					}
					f = 1;
				}
			}), h = 0;
			e.ondata = function(n, i, a) {
				if (n) t.ondata(n, i, a), t.terminate();
				else if (h += i.length, u.push(i), a) {
					var o = new r(16);
					z(o, 0, 134695760), z(o, 4, e.crc), z(o, 8, h), z(o, 12, e.size), u.push(o), m.c = h, m.b = c + h + 16, m.crc = e.crc, m.size = e.size, f && m.r(), f = 1;
				} else f && d();
			}, this.u.push(m);
		}
	}, e.prototype.end = function() {
		var e = this;
		if (this.d & 2) {
			this.ondata(E(4 + (this.d & 1) * 8, 0, 1), null, !0);
			return;
		}
		this.d ? this.e() : this.u.push({
			r: function() {
				e.d & 1 && (e.u.splice(-1, 1), e.e());
			},
			t: function() {}
		}), this.d = 3;
	}, e.prototype.e = function() {
		for (var e = 0, t = 0, n = 0, i = 0, a = this.u; i < a.length; i++) {
			var o = a[i];
			n += 46 + o.f.length + G(o.extra) + (o.o ? o.o.length : 0);
		}
		for (var s = new r(n + 22), c = 0, l = this.u; c < l.length; c++) {
			var o = l[c];
			K(s, e, o, o.f, o.u, -o.c - 2, t, o.o), e += 46 + o.f.length + G(o.extra) + (o.o ? o.o.length : 0), t += o.b;
		}
		q(s, e, this.u.length, n, t), this.ondata(null, s, !0), this.d = 2;
	}, e.prototype.terminate = function() {
		for (var e = 0, t = this.u; e < t.length; e++) t[e].t();
		this.d = 2;
	}, e;
}();
//#endregion
//#region replace/base.ts
async function X(e = []) {
	let t = [];
	for (let n of e) t.push(n.getBuffer());
	await Promise.all(t);
	let n = {
		decode: {
			names: [],
			uint8Arrays: []
		},
		noDecode: {
			names: [],
			uint8Arrays: []
		}
	};
	for (let t of e) t.uint8Array && (t.isDecode ? (n.decode.names.push(t.name), n.decode.uint8Arrays.push(t.uint8Array)) : (n.noDecode.names.push(t.name), n.noDecode.uint8Arrays.push(t.uint8Array)));
	return n;
}
var Z = class {
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
	async extractOneFileVariables(e, t) {
		let r = await t.getBuffer();
		r && (await t.type() === n.unknown && !t.isDecode || (e[t.name] = await this.#t.extract_one_file_variable_names(r, t.isDecode)));
	}
	async extractVariables(e) {
		e ||= this.#e;
		let t = {}, n = [];
		for (let r of e) n.push(this.extractOneFileVariables(t, r));
		return await Promise.allSettled(n), t;
	}
	async extractOneFileMedias(e, t) {
		let r = await t.getBuffer();
		if (!r || await t.type() === n.unknown && !t.isDecode) return;
		let i = await this.#t.extract_one_file_medias(r, t.isDecode);
		if (e[t.name] = [], Array.isArray(i)) for (let { id: n, data: r } of i) n && r && e[t.name].push({
			id: n,
			data: new Uint8Array(r)
		});
	}
	async extractMedias(e) {
		e ||= this.#e;
		let t = {}, n = [];
		for (let r of e) n.push(this.extractOneFileMedias(t, r));
		return await Promise.all(n), t;
	}
	async handle(e, t, n) {
		return [];
	}
	async handleMultipleParams(e, t, n) {
		return [];
	}
	async sign(e) {
		return "";
	}
	async execute(e, t) {
		let { noDecode: n, decode: r } = await X(t ?? this.#e), i = await this.handle(e, n.uint8Arrays, r.uint8Arrays), a = {}, o = 0;
		for (let e of n.names) a[e] = i[o++] ?? new Uint8Array();
		for (let e of r.names) a[e] = i[o++] ?? new Uint8Array();
		return a;
	}
	async executeToZip(e, t) {
		let { noDecode: n, decode: r } = await X(t ?? this.#e), i = await this.handle(e, n.uint8Arrays, r.uint8Arrays);
		return new Promise((e, t) => {
			let a = [], o = new Y((t, n, r) => {
				n.length && a.push(n), r && new Blob(a).arrayBuffer().then((t) => {
					e(new Uint8Array(t));
				});
			}), s = 0;
			for (let e of n.names) {
				let t = new J(e, { level: 9 });
				o.add(t), t.push(i[s++] ?? new Uint8Array(), !0);
			}
			for (let e of r.names) {
				let t = new J(e, { level: 9 });
				o.add(t), t.push(i[s++] ?? new Uint8Array(), !0);
			}
			o.end();
		});
	}
	async executeMultipleParams(e, t) {
		let { noDecode: n, decode: r } = await X(t ?? this.#e), i = await this.handleMultipleParams(e, n.uint8Arrays, r.uint8Arrays), a = Array(e.length), o = 0;
		for (let t = 0; t < e.length; t++) {
			let e = {};
			for (let t of n.names) {
				let n = i[o++];
				n.length && (e[t] = n);
			}
			for (let t of r.names) {
				let n = i[o++];
				n.length && (e[t] = n);
			}
			a[t] = e;
		}
		return a;
	}
	async executeMultipleParamsToZip(e, t) {
		let { noDecode: n, decode: r } = await X(t ?? this.#e), i = await this.handleMultipleParams(e, n.uint8Arrays, r.uint8Arrays);
		return new Promise((t, a) => {
			let o = [], s = new Y((e, n, r) => {
				n.length && o.push(n), r && new Blob(o).arrayBuffer().then((e) => {
					t(new Uint8Array(e));
				});
			}), c = 0;
			for (let t = 0; t < e.length; t++) {
				for (let e of n.names) {
					let n = i[c++];
					if (n.length) {
						let r = new J(t + "/" + e, { level: 9 });
						s.add(r), r.push(n, !0);
					}
				}
				for (let e of r.names) {
					let n = i[c++];
					if (n.length) {
						let r = new J(t + "/" + e, { level: 9 });
						s.add(r), r.push(n, !0);
					}
				}
			}
			s.end();
		});
	}
	fileEncrypt(e) {
		return this.#t.file_encrypt(e);
	}
	filesEncrypt(e) {
		return this.#t.files_encrypt(e);
	}
}, Q = class {
	constructor(e) {
		this.awaitInit = e;
	}
	async add_template(e, t) {
		return (await this.awaitInit).add_template(e, t);
	}
	async add_media(e) {
		return (await this.awaitInit).add_media(e);
	}
	async extract_one_file_variable_names(e, t) {
		return (await this.awaitInit).extract_one_file_variable_names(e, t);
	}
	async extract_variable_names(e, t) {
		return (await this.awaitInit).extract_variable_names(e, t);
	}
	async extract_one_file_medias(e, t) {
		return (await this.awaitInit).extract_one_file_medias(e, t);
	}
	async extract_medias(e, t) {
		return (await this.awaitInit).extract_medias(e, t);
	}
	async file_encrypt(e) {
		return (await this.awaitInit).file_encrypt(e);
	}
	async files_encrypt(e) {
		return (await this.awaitInit).files_encrypt(e);
	}
};
//#endregion
export { Z as n, Q as t };

//# sourceMappingURL=base-hBGwfxE_.js.map