import { a as e, i as t, n, o as r, r as i, t as a } from "./asyncToGenerator-CFVEAIDf.js";
//#region \0rolldown/runtime.js
var o = Object.defineProperty, s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), c = (e, t) => {
	let n = {};
	for (var r in e) o(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || o(n, Symbol.toStringTag, { value: "Module" }), n;
}, l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakSet(), m = class {
	constructor() {
		r(this, p), e(this, l, void 0), e(this, u, void 0), e(this, d, void 0), e(this, f, void 0), this._initFinishCallBackFuns = [], i(l, this, !1), i(u, this, "template_replacement_db"), i(d, this, 1), i(f, this, "template_files"), t(p, this, h).call(this);
	}
	awaitInit() {
		var e = this;
		return a(function* () {
			n(l, e) || !e._initFinishCallBackFuns || (yield new Promise((t, n) => {
				var r;
				(r = e._initFinishCallBackFuns) == null || r.push(t);
			}));
		})();
	}
	closeDB() {
		var e;
		(e = this._db) == null || e.close();
	}
	store(e) {
		var t = this;
		return a(function* () {
			return yield t.awaitInit(), t._db.transaction(n(f, t), e).objectStore(n(f, t));
		})();
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
};
function h() {
	return this._init || (this._init = new Promise((e, t) => {
		let r = indexedDB.open(n(u, this), n(d, this));
		r.onsuccess = (t) => {
			if (this._db = r.result, i(l, this, !0), this._initFinishCallBackFuns) {
				try {
					for (let e of this._initFinishCallBackFuns) e();
				} catch (e) {}
				this._initFinishCallBackFuns = void 0;
			}
			e(t);
		}, r.onerror = (e) => {
			console.error(e), t(e);
		}, r.onupgradeneeded = (t) => {
			let i = r.result;
			i.objectStoreNames.contains(n(f, this)) || i.createObjectStore(n(f, this), { keyPath: "key" }), e(t);
		};
	})), this._init;
}
new m();
//#endregion
//#region __vite-browser-external
var g = /* @__PURE__ */ s(((e, t) => {
	t.exports = {};
}));
(/* @__PURE__ */ s(((e, t) => {
	(function() {
		var e = "input is invalid type", n = "finalize already called", r = typeof window == "object", i = r ? window : {};
		i.JS_SHA1_NO_WINDOW && (r = !1);
		var a = !r && typeof self == "object", o = !i.JS_SHA1_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
		o ? i = global : a && (i = self);
		var s = !i.JS_SHA1_NO_COMMON_JS && typeof t == "object" && t.exports, c = typeof define == "function" && define.amd, l = !i.JS_SHA1_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", u = "0123456789abcdef".split(""), d = [
			-2147483648,
			8388608,
			32768,
			128
		], f = [
			24,
			16,
			8,
			0
		], p = [
			"hex",
			"array",
			"digest",
			"arrayBuffer"
		], m = [], h = Array.isArray;
		(i.JS_SHA1_NO_NODE_JS || !h) && (h = function(e) {
			return Object.prototype.toString.call(e) === "[object Array]";
		});
		var _ = ArrayBuffer.isView;
		l && (i.JS_SHA1_NO_ARRAY_BUFFER_IS_VIEW || !_) && (_ = function(e) {
			return typeof e == "object" && e.buffer && e.buffer.constructor === ArrayBuffer;
		});
		var v = function(t) {
			var n = typeof t;
			if (n === "string") return [t, !0];
			if (n !== "object" || t === null) throw Error(e);
			if (l && t.constructor === ArrayBuffer) return [new Uint8Array(t), !1];
			if (!h(t) && !_(t)) throw Error(e);
			return [t, !1];
		}, y = function(e) {
			return function(t) {
				return new w(!0).update(t)[e]();
			};
		}, b = function() {
			var e = y("hex");
			o && (e = x(e)), e.create = function() {
				return new w();
			}, e.update = function(t) {
				return e.create().update(t);
			};
			for (var t = 0; t < p.length; ++t) {
				var n = p[t];
				e[n] = y(n);
			}
			return e;
		}, x = function(t) {
			var n = g(), r = g().Buffer, a = r.from && !i.JS_SHA1_NO_BUFFER_FROM ? r.from : function(e) {
				return new r(e);
			};
			return function(i) {
				if (typeof i == "string") return n.createHash("sha1").update(i, "utf8").digest("hex");
				if (i == null) throw Error(e);
				return i.constructor === ArrayBuffer && (i = new Uint8Array(i)), h(i) || _(i) || i.constructor === r ? n.createHash("sha1").update(a(i)).digest("hex") : t(i);
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
			for (var t = 0; t < p.length; ++t) {
				var n = p[t];
				e[n] = S(n);
			}
			return e;
		};
		function w(e) {
			e ? (m[0] = m[16] = m[1] = m[2] = m[3] = m[4] = m[5] = m[6] = m[7] = m[8] = m[9] = m[10] = m[11] = m[12] = m[13] = m[14] = m[15] = 0, this.blocks = m) : this.blocks = [
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
			if (this.finalized) throw Error(n);
			var t = v(e);
			e = t[0];
			for (var r = t[1], i, a = 0, o, s = e.length || 0, c = this.blocks; a < s;) {
				if (this.hashed && (this.hashed = !1, c[0] = this.block, this.block = c[16] = c[1] = c[2] = c[3] = c[4] = c[5] = c[6] = c[7] = c[8] = c[9] = c[10] = c[11] = c[12] = c[13] = c[14] = c[15] = 0), r) for (o = this.start; a < s && o < 64; ++a) i = e.charCodeAt(a), i < 128 ? c[o >>> 2] |= i << f[o++ & 3] : i < 2048 ? (c[o >>> 2] |= (192 | i >>> 6) << f[o++ & 3], c[o >>> 2] |= (128 | i & 63) << f[o++ & 3]) : i < 55296 || i >= 57344 ? (c[o >>> 2] |= (224 | i >>> 12) << f[o++ & 3], c[o >>> 2] |= (128 | i >>> 6 & 63) << f[o++ & 3], c[o >>> 2] |= (128 | i & 63) << f[o++ & 3]) : (i = 65536 + ((i & 1023) << 10 | e.charCodeAt(++a) & 1023), c[o >>> 2] |= (240 | i >>> 18) << f[o++ & 3], c[o >>> 2] |= (128 | i >>> 12 & 63) << f[o++ & 3], c[o >>> 2] |= (128 | i >>> 6 & 63) << f[o++ & 3], c[o >>> 2] |= (128 | i & 63) << f[o++ & 3]);
				else for (o = this.start; a < s && o < 64; ++a) c[o >>> 2] |= e[a] << f[o++ & 3];
				this.lastByteIndex = o, this.bytes += o - this.start, o >= 64 ? (this.block = c[16], this.start = o - 64, this.hash(), this.hashed = !0) : this.start = o;
			}
			return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes %= 4294967296), this;
		}, w.prototype.finalize = function() {
			if (!this.finalized) {
				this.finalized = !0;
				var e = this.blocks, t = this.lastByteIndex;
				e[16] = this.block, e[t >>> 2] |= d[t & 3], this.block = e[16], t >= 56 && (this.hashed || this.hash(), e[0] = this.block, e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), e[14] = this.hBytes << 3 | this.bytes >>> 29, e[15] = this.bytes << 3, this.hash();
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
			return u[e >>> 28 & 15] + u[e >>> 24 & 15] + u[e >>> 20 & 15] + u[e >>> 16 & 15] + u[e >>> 12 & 15] + u[e >>> 8 & 15] + u[e >>> 4 & 15] + u[e & 15] + u[t >>> 28 & 15] + u[t >>> 24 & 15] + u[t >>> 20 & 15] + u[t >>> 16 & 15] + u[t >>> 12 & 15] + u[t >>> 8 & 15] + u[t >>> 4 & 15] + u[t & 15] + u[n >>> 28 & 15] + u[n >>> 24 & 15] + u[n >>> 20 & 15] + u[n >>> 16 & 15] + u[n >>> 12 & 15] + u[n >>> 8 & 15] + u[n >>> 4 & 15] + u[n & 15] + u[r >>> 28 & 15] + u[r >>> 24 & 15] + u[r >>> 20 & 15] + u[r >>> 16 & 15] + u[r >>> 12 & 15] + u[r >>> 8 & 15] + u[r >>> 4 & 15] + u[r & 15] + u[i >>> 28 & 15] + u[i >>> 24 & 15] + u[i >>> 20 & 15] + u[i >>> 16 & 15] + u[i >>> 12 & 15] + u[i >>> 8 & 15] + u[i >>> 4 & 15] + u[i & 15];
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
		E.sha1 = E, E.sha1.hmac = C(), s ? t.exports = E : (i.sha1 = E, c && define(function() {
			return E;
		}));
	})();
})))();
var _ = /* @__PURE__ */ function(e) {
	return e.word = "word", e.excel = "excel", e.unknown = "unknown", e;
}({}), v = Uint8Array, y = Uint16Array, b = Int32Array, x = new v([
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
]), S = new v([
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
]), C = new v([
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
]), w = function(e, t) {
	for (var n = new y(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new b(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, T = w(x, 2), E = T.b, D = T.r;
E[28] = 258, D[258] = 28;
var O = w(S, 0);
O.b;
for (var ee = O.r, k = new y(32768), A = 0; A < 32768; ++A) {
	var j = (A & 43690) >> 1 | (A & 21845) << 1;
	j = (j & 52428) >> 2 | (j & 13107) << 2, j = (j & 61680) >> 4 | (j & 3855) << 4, k[A] = ((j & 65280) >> 8 | (j & 255) << 8) >> 1;
}
for (var M = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new y(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new y(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new y(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[k[d] >> c] = l;
	} else for (s = new y(r), i = 0; i < r; ++i) e[i] && (s[i] = k[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), N = new v(288), A = 0; A < 144; ++A) N[A] = 8;
for (var A = 144; A < 256; ++A) N[A] = 9;
for (var A = 256; A < 280; ++A) N[A] = 7;
for (var A = 280; A < 288; ++A) N[A] = 8;
for (var P = new v(32), A = 0; A < 32; ++A) P[A] = 5;
var te = /*#__PURE__*/ M(N, 9, 0), F = /*#__PURE__*/ M(P, 5, 0), ne = function(e) {
	return (e + 7) / 8 | 0;
}, I = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new v(e.subarray(t, n));
}, L = [
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
], R = function(e, t, n) {
	var r = Error(t || L[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, R), !n) throw r;
	return r;
}, z = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, B = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, V = function(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
		s: r,
		f: e[r]
	});
	var i = n.length, a = n.slice();
	if (!i) return {
		t: q,
		l: 0
	};
	if (i == 1) {
		var o = new v(n[0].s + 1);
		return o[n[0].s] = 1, {
			t: o,
			l: 1
		};
	}
	n.sort(function(e, t) {
		return e.f - t.f;
	}), n.push({
		s: -1,
		f: 25001
	});
	var s = n[0], c = n[1], l = 0, u = 1, d = 2;
	for (n[0] = {
		s: -1,
		f: s.f + c.f,
		l: s,
		r: c
	}; u != i - 1;) s = n[n[l].f < n[d].f ? l++ : d++], c = n[l != u && n[l].f < n[d].f ? l++ : d++], n[u++] = {
		s: -1,
		f: s.f + c.f,
		l: s,
		r: c
	};
	for (var f = a[0].s, r = 1; r < i; ++r) a[r].s > f && (f = a[r].s);
	var p = new y(f + 1), m = H(n[u - 1], p, 0);
	if (m > t) {
		var r = 0, h = 0, g = m - t, _ = 1 << g;
		for (a.sort(function(e, t) {
			return p[t.s] - p[e.s] || e.f - t.f;
		}); r < i; ++r) {
			var b = a[r].s;
			if (p[b] > t) h += _ - (1 << m - p[b]), p[b] = t;
			else break;
		}
		for (h >>= g; h > 0;) {
			var x = a[r].s;
			p[x] < t ? h -= 1 << t - p[x]++ - 1 : ++r;
		}
		for (; r >= 0 && h; --r) {
			var S = a[r].s;
			p[S] == t && (--p[S], ++h);
		}
		m = t;
	}
	return {
		t: new v(p),
		l: m
	};
}, H = function(e, t, n) {
	return e.s == -1 ? Math.max(H(e.l, t, n + 1), H(e.r, t, n + 1)) : t[e.s] = n;
}, U = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new y(++t), r = 0, i = e[0], a = 1, o = function(e) {
		n[r++] = e;
	}, s = 1; s <= t; ++s) if (e[s] == i && s != t) ++a;
	else {
		if (!i && a > 2) {
			for (; a > 138; a -= 138) o(32754);
			a > 2 && (o(a > 10 ? a - 11 << 5 | 28690 : a - 3 << 5 | 12305), a = 0);
		} else if (a > 3) {
			for (o(i), --a; a > 6; a -= 6) o(8304);
			a > 2 && (o(a - 3 << 5 | 8208), a = 0);
		}
		for (; a--;) o(i);
		a = 1, i = e[s];
	}
	return {
		c: n.subarray(0, r),
		n: t
	};
}, W = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, re = function(e, t, n) {
	var r = n.length, i = ne(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, G = function(e, t, n, r, i, a, o, s, c, l, u) {
	z(t, u++, n), ++i[256];
	for (var d = V(i, 15), f = d.t, p = d.l, m = V(a, 15), h = m.t, g = m.l, _ = U(f), v = _.c, b = _.n, w = U(h), T = w.c, E = w.n, D = new y(19), O = 0; O < v.length; ++O) ++D[v[O] & 31];
	for (var O = 0; O < T.length; ++O) ++D[T[O] & 31];
	for (var ee = V(D, 7), k = ee.t, A = ee.l, j = 19; j > 4 && !k[C[j - 1]]; --j);
	var ne = l + 5 << 3, I = W(i, N) + W(a, P) + o, L = W(i, f) + W(a, h) + o + 14 + 3 * j + W(D, k) + 2 * D[16] + 3 * D[17] + 7 * D[18];
	if (c >= 0 && ne <= I && ne <= L) return re(t, u, e.subarray(c, c + l));
	var R, H, G, K;
	if (z(t, u, 1 + (L < I)), u += 2, L < I) {
		R = M(f, p, 0), H = f, G = M(h, g, 0), K = h;
		var q = M(k, A, 0);
		z(t, u, b - 257), z(t, u + 5, E - 1), z(t, u + 10, j - 4), u += 14;
		for (var O = 0; O < j; ++O) z(t, u + 3 * O, k[C[O]]);
		u += 3 * j;
		for (var ie = [v, T], J = 0; J < 2; ++J) for (var Y = ie[J], O = 0; O < Y.length; ++O) {
			var X = Y[O] & 31;
			z(t, u, q[X]), u += k[X], X > 15 && (z(t, u, Y[O] >> 5 & 127), u += Y[O] >> 12);
		}
	} else R = te, H = N, G = F, K = P;
	for (var O = 0; O < s; ++O) {
		var Z = r[O];
		if (Z > 255) {
			var X = Z >> 18 & 31;
			B(t, u, R[X + 257]), u += H[X + 257], X > 7 && (z(t, u, Z >> 23 & 31), u += x[X]);
			var Q = Z & 31;
			B(t, u, G[Q]), u += K[Q], Q > 3 && (B(t, u, Z >> 5 & 8191), u += S[Q]);
		} else B(t, u, R[Z]), u += H[Z];
	}
	return B(t, u, R[256]), u + H[256];
}, K = /*#__PURE__*/ new b([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), q = /*#__PURE__*/ new v(0), ie = function(e, t, n, r, i, a) {
	var o = a.z || e.length, s = new v(r + o + 5 * (1 + Math.ceil(o / 7e3)) + i), c = s.subarray(r, s.length - i), l = a.l, u = (a.r || 0) & 7;
	if (t) {
		u && (c[0] = a.r >> 3);
		for (var d = K[t - 1], f = d >> 13, p = d & 8191, m = (1 << n) - 1, h = a.p || new y(32768), g = a.h || new y(m + 1), _ = Math.ceil(n / 3), C = 2 * _, w = function(t) {
			return (e[t] ^ e[t + 1] << _ ^ e[t + 2] << C) & m;
		}, T = new b(25e3), E = new y(288), O = new y(32), k = 0, A = 0, j = a.i || 0, M = 0, N = a.w || 0, P = 0; j + 2 < o; ++j) {
			var te = w(j), F = j & 32767, L = g[te];
			if (h[F] = L, g[te] = F, N <= j) {
				var R = o - j;
				if ((k > 7e3 || M > 24576) && (R > 423 || !l)) {
					u = G(e, c, 0, T, E, O, A, M, P, j - P, u), M = k = A = 0, P = j;
					for (var z = 0; z < 286; ++z) E[z] = 0;
					for (var z = 0; z < 30; ++z) O[z] = 0;
				}
				var B = 2, V = 0, H = p, U = F - L & 32767;
				if (R > 2 && te == w(j - U)) for (var W = Math.min(f, R) - 1, q = Math.min(32767, j), ie = Math.min(258, R); U <= q && --H && F != L;) {
					if (e[j + B] == e[j + B - U]) {
						for (var J = 0; J < ie && e[j + J] == e[j + J - U]; ++J);
						if (J > B) {
							if (B = J, V = U, J > W) break;
							for (var Y = Math.min(U, J - 2), X = 0, z = 0; z < Y; ++z) {
								var Z = j - U + z & 32767, Q = Z - h[Z] & 32767;
								Q > X && (X = Q, L = Z);
							}
						}
					}
					F = L, L = h[F], U += F - L & 32767;
				}
				if (V) {
					T[M++] = 268435456 | D[B] << 18 | ee[V];
					var ae = D[B] & 31, oe = ee[V] & 31;
					A += x[ae] + S[oe], ++E[257 + ae], ++O[oe], N = j + B, ++k;
				} else T[M++] = e[j], ++E[e[j]];
			}
		}
		for (j = Math.max(j, N); j < o; ++j) T[M++] = e[j], ++E[e[j]];
		u = G(e, c, l, T, E, O, A, M, P, j - P, u), l || (a.r = u & 7 | c[u / 8 | 0] << 3, u -= 7, a.h = g, a.p = h, a.i = j, a.w = N);
	} else {
		for (var j = a.w || 0; j < o + l; j += 65535) {
			var se = j + 65535;
			se >= o && (c[u / 8 | 0] = l, se = o), u = re(c, u + 1, e.subarray(j, se));
		}
		a.i = o;
	}
	return I(s, 0, r + ne(u) + i);
}, J = /*#__PURE__*/ (function() {
	for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
		for (var n = t, r = 9; --r;) n = (n & 1 && -306674912) ^ n >>> 1;
		e[t] = n;
	}
	return e;
})(), Y = function() {
	var e = -1;
	return {
		p: function(t) {
			for (var n = e, r = 0; r < t.length; ++r) n = J[n & 255 ^ t[r]] ^ n >>> 8;
			e = n;
		},
		d: function() {
			return ~e;
		}
	};
}, X = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var a = t.dictionary.subarray(-32768), o = new v(a.length + e.length);
		o.set(a), o.set(e, a.length), e = o, i.w = a.length;
	}
	return ie(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
}, Z = function(e, t) {
	var n = {};
	for (var r in e) n[r] = e[r];
	for (var r in t) n[r] = t[r];
	return n;
}, Q = function(e, t, n) {
	for (; n; ++t) e[t] = n, n >>>= 8;
}, ae = /* @__PURE__ */ function() {
	function e(e, t) {
		if (typeof e == "function" && (t = e, e = {}), this.ondata = t, this.o = e || {}, this.s = {
			l: 0,
			i: 32768,
			w: 32768,
			z: 32768
		}, this.b = new v(98304), this.o.dictionary) {
			var n = this.o.dictionary.subarray(-32768);
			this.b.set(n, 32768 - n.length), this.s.i = 32768 - n.length;
		}
	}
	return e.prototype.p = function(e, t) {
		this.ondata(X(e, this.o, 0, 0, this.s), t);
	}, e.prototype.push = function(e, t) {
		this.ondata || R(5), this.s.l && R(4);
		var n = e.length + this.s.z;
		if (n > this.b.length) {
			if (n > 2 * this.b.length - 32768) {
				var r = new v(n & -32768);
				r.set(this.b.subarray(0, this.s.z)), this.b = r;
			}
			var i = this.b.length - this.s.z;
			this.b.set(e.subarray(0, i), this.s.z), this.s.z = this.b.length, this.p(this.b, !1), this.b.set(this.b.subarray(-32768)), this.b.set(e.subarray(i), 32768), this.s.z = e.length - i + 32768, this.s.i = 32766, this.s.w = 32768;
		} else this.b.set(e, this.s.z), this.s.z += e.length;
		this.s.l = t & 1, (this.s.z > this.s.w + 8191 || t) && (this.p(this.b, t || !1), this.s.w = this.s.i, this.s.i -= 2), t && (this.s = this.o = {}, this.b = q);
	}, e.prototype.flush = function(e) {
		if (this.ondata || R(5), this.s.l && R(4), this.p(this.b, !1), this.s.w = this.s.i, this.s.i -= 2, e) {
			var t = new v(6);
			t[0] = this.s.r >> 3;
			var n = re(t, this.s.r, q);
			this.s.r = 0, this.ondata(t.subarray(0, n >> 3), !1);
		}
	}, e;
}(), oe = typeof TextEncoder < "u" && /*#__PURE__*/ new TextEncoder(), se = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	se.decode(q, { stream: !0 });
} catch (e) {}
function ce(e, t) {
	if (t) {
		for (var n = new v(e.length), r = 0; r < e.length; ++r) n[r] = e.charCodeAt(r);
		return n;
	}
	if (oe) return oe.encode(e);
	for (var i = e.length, a = new v(e.length + (e.length >> 1)), o = 0, s = function(e) {
		a[o++] = e;
	}, r = 0; r < i; ++r) {
		if (o + 5 > a.length) {
			var c = new v(o + 8 + (i - r << 1));
			c.set(a), a = c;
		}
		var l = e.charCodeAt(r);
		l < 128 || t ? s(l) : l < 2048 ? (s(192 | l >> 6), s(128 | l & 63)) : l > 55295 && l < 57344 ? (l = 65536 + (l & 1047552) | e.charCodeAt(++r) & 1023, s(240 | l >> 18), s(128 | l >> 12 & 63), s(128 | l >> 6 & 63), s(128 | l & 63)) : (s(224 | l >> 12), s(128 | l >> 6 & 63), s(128 | l & 63));
	}
	return I(a, 0, o);
}
var le = function(e) {
	return e == 1 ? 3 : e < 6 ? 2 : +(e == 9);
}, ue = function(e) {
	var t = 0;
	if (e) for (var n in e) {
		var r = e[n].length;
		r > 65535 && R(9), t += r + 4;
	}
	return t;
}, de = function(e, t, n, r, i, a, o, s) {
	var c = r.length, l = n.extra, u = s && s.length, d = ue(l);
	Q(e, t, o == null ? 67324752 : 33639248), t += 4, o != null && (e[t++] = 20, e[t++] = n.os), e[t] = 20, t += 2, e[t++] = n.flag << 1 | (a < 0 && 8), e[t++] = i && 8, e[t++] = n.compression & 255, e[t++] = n.compression >> 8;
	var f = new Date(n.mtime == null ? Date.now() : n.mtime), p = f.getFullYear() - 1980;
	if ((p < 0 || p > 119) && R(10), Q(e, t, p << 25 | f.getMonth() + 1 << 21 | f.getDate() << 16 | f.getHours() << 11 | f.getMinutes() << 5 | f.getSeconds() >> 1), t += 4, a != -1 && (Q(e, t, n.crc), Q(e, t + 4, a < 0 ? -a - 2 : a), Q(e, t + 8, n.size)), Q(e, t + 12, c), Q(e, t + 14, d), t += 16, o != null && (Q(e, t, u), Q(e, t + 6, n.attrs), Q(e, t + 10, o), t += 14), e.set(r, t), t += c, d) for (var m in l) {
		var h = l[m], g = h.length;
		Q(e, t, +m), Q(e, t + 2, g), e.set(h, t + 4), t += 4 + g;
	}
	return u && (e.set(s, t), t += u), t;
}, fe = function(e, t, n, r, i) {
	Q(e, t, 101010256), Q(e, t + 8, n), Q(e, t + 10, n), Q(e, t + 12, r), Q(e, t + 16, i);
}, pe = /* @__PURE__ */ function() {
	function e(e) {
		this.filename = e, this.c = Y(), this.size = 0, this.compression = 0;
	}
	return e.prototype.process = function(e, t) {
		this.ondata(null, e, t);
	}, e.prototype.push = function(e, t) {
		this.ondata || R(5), this.c.p(e), this.size += e.length, t && (this.crc = this.c.d()), this.process(e, t || !1);
	}, e;
}(), me = /* @__PURE__ */ function() {
	function e(e, t) {
		var n = this;
		t || (t = {}), pe.call(this, e), this.d = new ae(t, function(e, t) {
			n.ondata(null, e, t);
		}), this.compression = 8, this.flag = le(t.level);
	}
	return e.prototype.process = function(e, t) {
		try {
			this.d.push(e, t);
		} catch (e) {
			this.ondata(e, null, t);
		}
	}, e.prototype.push = function(e, t) {
		pe.prototype.push.call(this, e, t);
	}, e;
}(), he = /* @__PURE__ */ function() {
	function e(e) {
		this.ondata = e, this.u = [], this.d = 1;
	}
	return e.prototype.add = function(e) {
		var t = this;
		if (this.ondata || R(5), this.d & 2) this.ondata(R(4 + (this.d & 1) * 8, 0, 1), null, !1);
		else {
			var n = ce(e.filename), r = n.length, i = e.comment, a = i && ce(i), o = r != e.filename.length || a && i.length != a.length, s = r + ue(e.extra) + 30;
			r > 65535 && this.ondata(R(11, 0, 1), null, !1);
			var c = new v(s);
			de(c, 0, e, n, o, -1);
			var l = [c], u = function() {
				for (var e = 0, n = l; e < n.length; e++) {
					var r = n[e];
					t.ondata(null, r, !1);
				}
				l = [];
			}, d = this.d;
			this.d = 0;
			var f = this.u.length, p = Z(e, {
				f: n,
				u: o,
				o: a,
				t: function() {
					e.terminate && e.terminate();
				},
				r: function() {
					if (u(), d) {
						var e = t.u[f + 1];
						e ? e.r() : t.d = 1;
					}
					d = 1;
				}
			}), m = 0;
			e.ondata = function(n, r, i) {
				if (n) t.ondata(n, r, i), t.terminate();
				else if (m += r.length, l.push(r), i) {
					var a = new v(16);
					Q(a, 0, 134695760), Q(a, 4, e.crc), Q(a, 8, m), Q(a, 12, e.size), l.push(a), p.c = m, p.b = s + m + 16, p.crc = e.crc, p.size = e.size, d && p.r(), d = 1;
				} else d && u();
			}, this.u.push(p);
		}
	}, e.prototype.end = function() {
		var e = this;
		if (this.d & 2) {
			this.ondata(R(4 + (this.d & 1) * 8, 0, 1), null, !0);
			return;
		}
		this.d ? this.e() : this.u.push({
			r: function() {
				e.d & 1 && (e.u.splice(-1, 1), e.e());
			},
			t: function() {}
		}), this.d = 3;
	}, e.prototype.e = function() {
		for (var e = 0, t = 0, n = 0, r = 0, i = this.u; r < i.length; r++) {
			var a = i[r];
			n += 46 + a.f.length + ue(a.extra) + (a.o ? a.o.length : 0);
		}
		for (var o = new v(n + 22), s = 0, c = this.u; s < c.length; s++) {
			var a = c[s];
			de(o, e, a, a.f, a.u, -a.c - 2, t, a.o), e += 46 + a.f.length + ue(a.extra) + (a.o ? a.o.length : 0), t += a.b;
		}
		fe(o, e, this.u.length, n, t), this.ondata(null, o, !0), this.d = 2;
	}, e.prototype.terminate = function() {
		for (var e = 0, t = this.u; e < t.length; e++) t[e].t();
		this.d = 2;
	}, e;
}();
//#endregion
//#region replace/base.ts
function ge() {
	return _e.apply(this, arguments);
}
function _e() {
	return _e = a(function* (e = []) {
		let t = [];
		for (let n of e) t.push(n.getBuffer());
		yield Promise.all(t);
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
	}), _e.apply(this, arguments);
}
var $ = /* @__PURE__ */ new WeakMap(), ve = class {
	constructor(t) {
		e(this, $, []), this.core = t;
	}
	addTempFile(e) {
		n($, this).push(e);
	}
	clear() {
		n($, this).length = 0;
	}
	extractOneFileVariables(e, t) {
		var n = this;
		return a(function* () {
			let r = yield t.getBuffer();
			if (r) {
				if ((yield t.type()) === _.unknown && !t.isDecode) {
					console.warn("file type is unknown and not decode", t);
					return;
				}
				e[t.name] = n.core.extract_one_file_variable_names(r, t.isDecode);
			}
		})();
	}
	extractVariables(e) {
		var t = this;
		return a(function* () {
			e || (e = n($, t));
			let r = {}, i = [];
			for (let n of e) i.push(t.extractOneFileVariables(r, n));
			return yield Promise.allSettled(i), r;
		})();
	}
	extractOneFileMedias(e, t) {
		var n = this;
		return a(function* () {
			let r = yield t.getBuffer();
			if (!r || (yield t.type()) === _.unknown && !t.isDecode) return;
			let i = n.core.extract_one_file_medias(r, t.isDecode);
			if (e[t.name] = [], Array.isArray(i)) for (let { id: n, data: r } of i) n && r && e[t.name].push({
				id: n,
				data: new Uint8Array(r)
			});
		})();
	}
	extractMedias(e) {
		var t = this;
		return a(function* () {
			e || (e = n($, t));
			let r = {}, i = [];
			for (let n of e) i.push(t.extractOneFileMedias(r, n));
			return yield Promise.all(i), r;
		})();
	}
	handle(e, t, n) {
		return a(function* () {
			return [];
		})();
	}
	handleMultipleParams(e, t, n) {
		return a(function* () {
			return [];
		})();
	}
	sign(e) {
		return a(function* () {
			return "";
		})();
	}
	execute(e, t) {
		var r = this;
		return a(function* () {
			let { noDecode: i, decode: a } = yield ge(t == null ? n($, r) : t), o = yield r.handle(e, i.uint8Arrays, a.uint8Arrays), s = {}, c = 0;
			for (let e of i.names) {
				var l;
				s[e] = (l = o[c++]) == null ? new Uint8Array() : l;
			}
			for (let e of a.names) {
				var u;
				s[e] = (u = o[c++]) == null ? new Uint8Array() : u;
			}
			return s;
		})();
	}
	executeToZip(e, t) {
		var r = this;
		return a(function* () {
			let { noDecode: i, decode: a } = yield ge(t == null ? n($, r) : t), o = yield r.handle(e, i.uint8Arrays, a.uint8Arrays);
			return new Promise((e, t) => {
				let n = [], r = new he((t, r, i) => {
					r.length && n.push(r), i && new Blob(n).arrayBuffer().then((t) => {
						e(new Uint8Array(t));
					});
				}), s = 0;
				for (let e of i.names) {
					var c;
					let t = new me(e, { level: 9 });
					r.add(t), t.push((c = o[s++]) == null ? new Uint8Array() : c, !0);
				}
				for (let e of a.names) {
					var l;
					let t = new me(e, { level: 9 });
					r.add(t), t.push((l = o[s++]) == null ? new Uint8Array() : l, !0);
				}
				r.end();
			});
		})();
	}
	executeMultipleParams(e, t) {
		var r = this;
		return a(function* () {
			let { noDecode: i, decode: a } = yield ge(t == null ? n($, r) : t), o = yield r.handleMultipleParams(e, i.uint8Arrays, a.uint8Arrays), s = Array(e.length), c = 0;
			for (let t = 0; t < e.length; t++) {
				let e = {};
				for (let t of i.names) {
					let n = o[c++];
					n.length && (e[t] = n);
				}
				for (let t of a.names) {
					let n = o[c++];
					n.length && (e[t] = n);
				}
				s[t] = e;
			}
			return s;
		})();
	}
	executeMultipleParamsToZip(e, t) {
		var r = this;
		return a(function* () {
			let { noDecode: i, decode: a } = yield ge(t == null ? n($, r) : t), o = yield r.handleMultipleParams(e, i.uint8Arrays, a.uint8Arrays);
			return new Promise((t, n) => {
				let r = [], s = new he((e, n, i) => {
					n.length && r.push(n), i && new Blob(r).arrayBuffer().then((e) => {
						t(new Uint8Array(e));
					});
				}), c = 0;
				for (let t = 0; t < e.length; t++) {
					for (let e of i.names) {
						let n = o[c++];
						if (n.length) {
							let r = new me(t + "/" + e, { level: 9 });
							s.add(r), r.push(n, !0);
						}
					}
					for (let e of a.names) {
						let n = o[c++];
						if (n.length) {
							let r = new me(t + "/" + e, { level: 9 });
							s.add(r), r.push(n, !0);
						}
					}
				}
				s.end();
			});
		})();
	}
	fileEncrypt(e) {
		var t = this;
		return a(function* () {
			return t.core.file_encrypt(e);
		})();
	}
	filesEncrypt(e) {
		var t = this;
		return a(function* () {
			return t.core.files_encrypt(e);
		})();
	}
}, ye = /* @__PURE__ */ new Map(), be = (e) => {
	let t = ye.get(e);
	return t || (t = new Promise((t) => {
		e.default().then(() => {
			t(e);
		});
	}), ye.set(e, t)), t;
};
//#endregion
export { ve as n, c as r, be as t };

//# sourceMappingURL=base-CBMfJfGx.js.map