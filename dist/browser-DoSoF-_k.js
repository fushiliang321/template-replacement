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
		var e = "input is invalid type", r = typeof window == "object", i = r ? window : {};
		i.JS_SHA1_NO_WINDOW && (r = !1);
		var a = !r && typeof self == "object", o = !i.JS_SHA1_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
		o ? i = global : a && (i = self);
		var s = !i.JS_SHA1_NO_COMMON_JS && typeof n == "object" && n.exports, c = typeof define == "function" && define.amd, l = !i.JS_SHA1_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", u = "0123456789abcdef".split(""), d = [
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
		var g = ArrayBuffer.isView;
		l && (i.JS_SHA1_NO_ARRAY_BUFFER_IS_VIEW || !g) && (g = function(e) {
			return typeof e == "object" && e.buffer && e.buffer.constructor === ArrayBuffer;
		});
		var _ = function(t) {
			var n = typeof t;
			if (n === "string") return [t, !0];
			if (n !== "object" || t === null) throw Error(e);
			if (l && t.constructor === ArrayBuffer) return [new Uint8Array(t), !1];
			if (!h(t) && !g(t)) throw Error(e);
			return [t, !1];
		}, v = function(e) {
			return function(t) {
				return new C(!0).update(t)[e]();
			};
		}, y = function() {
			var e = v("hex");
			o && (e = b(e)), e.create = function() {
				return new C();
			}, e.update = function(t) {
				return e.create().update(t);
			};
			for (var t = 0; t < p.length; ++t) {
				var n = p[t];
				e[n] = v(n);
			}
			return e;
		}, b = function(n) {
			var r = t(), a = t().Buffer, o = a.from && !i.JS_SHA1_NO_BUFFER_FROM ? a.from : function(e) {
				return new a(e);
			};
			return function(t) {
				if (typeof t == "string") return r.createHash("sha1").update(t, "utf8").digest("hex");
				if (t == null) throw Error(e);
				return t.constructor === ArrayBuffer && (t = new Uint8Array(t)), h(t) || g(t) || t.constructor === a ? r.createHash("sha1").update(o(t)).digest("hex") : n(t);
			};
		}, x = function(e) {
			return function(t, n) {
				return new w(t, !0).update(n)[e]();
			};
		}, S = function() {
			var e = x("hex");
			e.create = function(e) {
				return new w(e);
			}, e.update = function(t, n) {
				return e.create(t).update(n);
			};
			for (var t = 0; t < p.length; ++t) {
				var n = p[t];
				e[n] = x(n);
			}
			return e;
		};
		function C(e) {
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
		C.prototype.update = function(e) {
			if (this.finalized) throw Error("finalize already called");
			var t = _(e);
			e = t[0];
			for (var n = t[1], r, i = 0, a, o = e.length || 0, s = this.blocks; i < o;) {
				if (this.hashed && (this.hashed = !1, s[0] = this.block, this.block = s[16] = s[1] = s[2] = s[3] = s[4] = s[5] = s[6] = s[7] = s[8] = s[9] = s[10] = s[11] = s[12] = s[13] = s[14] = s[15] = 0), n) for (a = this.start; i < o && a < 64; ++i) r = e.charCodeAt(i), r < 128 ? s[a >>> 2] |= r << f[a++ & 3] : r < 2048 ? (s[a >>> 2] |= (192 | r >>> 6) << f[a++ & 3], s[a >>> 2] |= (128 | r & 63) << f[a++ & 3]) : r < 55296 || r >= 57344 ? (s[a >>> 2] |= (224 | r >>> 12) << f[a++ & 3], s[a >>> 2] |= (128 | r >>> 6 & 63) << f[a++ & 3], s[a >>> 2] |= (128 | r & 63) << f[a++ & 3]) : (r = 65536 + ((r & 1023) << 10 | e.charCodeAt(++i) & 1023), s[a >>> 2] |= (240 | r >>> 18) << f[a++ & 3], s[a >>> 2] |= (128 | r >>> 12 & 63) << f[a++ & 3], s[a >>> 2] |= (128 | r >>> 6 & 63) << f[a++ & 3], s[a >>> 2] |= (128 | r & 63) << f[a++ & 3]);
				else for (a = this.start; i < o && a < 64; ++i) s[a >>> 2] |= e[i] << f[a++ & 3];
				this.lastByteIndex = a, this.bytes += a - this.start, a >= 64 ? (this.block = s[16], this.start = a - 64, this.hash(), this.hashed = !0) : this.start = a;
			}
			return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes %= 4294967296), this;
		}, C.prototype.finalize = function() {
			if (!this.finalized) {
				this.finalized = !0;
				var e = this.blocks, t = this.lastByteIndex;
				e[16] = this.block, e[t >>> 2] |= d[t & 3], this.block = e[16], t >= 56 && (this.hashed || this.hash(), e[0] = this.block, e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), e[14] = this.hBytes << 3 | this.bytes >>> 29, e[15] = this.bytes << 3, this.hash();
			}
		}, C.prototype.hash = function() {
			var e = this.h0, t = this.h1, n = this.h2, r = this.h3, i = this.h4, a, o, s, c = this.blocks;
			for (o = 16; o < 80; ++o) s = c[o - 3] ^ c[o - 8] ^ c[o - 14] ^ c[o - 16], c[o] = s << 1 | s >>> 31;
			for (o = 0; o < 20; o += 5) a = t & n | ~t & r, s = e << 5 | e >>> 27, i = s + a + i + 1518500249 + c[o] << 0, t = t << 30 | t >>> 2, a = e & t | ~e & n, s = i << 5 | i >>> 27, r = s + a + r + 1518500249 + c[o + 1] << 0, e = e << 30 | e >>> 2, a = i & e | ~i & t, s = r << 5 | r >>> 27, n = s + a + n + 1518500249 + c[o + 2] << 0, i = i << 30 | i >>> 2, a = r & i | ~r & e, s = n << 5 | n >>> 27, t = s + a + t + 1518500249 + c[o + 3] << 0, r = r << 30 | r >>> 2, a = n & r | ~n & i, s = t << 5 | t >>> 27, e = s + a + e + 1518500249 + c[o + 4] << 0, n = n << 30 | n >>> 2;
			for (; o < 40; o += 5) a = t ^ n ^ r, s = e << 5 | e >>> 27, i = s + a + i + 1859775393 + c[o] << 0, t = t << 30 | t >>> 2, a = e ^ t ^ n, s = i << 5 | i >>> 27, r = s + a + r + 1859775393 + c[o + 1] << 0, e = e << 30 | e >>> 2, a = i ^ e ^ t, s = r << 5 | r >>> 27, n = s + a + n + 1859775393 + c[o + 2] << 0, i = i << 30 | i >>> 2, a = r ^ i ^ e, s = n << 5 | n >>> 27, t = s + a + t + 1859775393 + c[o + 3] << 0, r = r << 30 | r >>> 2, a = n ^ r ^ i, s = t << 5 | t >>> 27, e = s + a + e + 1859775393 + c[o + 4] << 0, n = n << 30 | n >>> 2;
			for (; o < 60; o += 5) a = t & n | t & r | n & r, s = e << 5 | e >>> 27, i = s + a + i - 1894007588 + c[o] << 0, t = t << 30 | t >>> 2, a = e & t | e & n | t & n, s = i << 5 | i >>> 27, r = s + a + r - 1894007588 + c[o + 1] << 0, e = e << 30 | e >>> 2, a = i & e | i & t | e & t, s = r << 5 | r >>> 27, n = s + a + n - 1894007588 + c[o + 2] << 0, i = i << 30 | i >>> 2, a = r & i | r & e | i & e, s = n << 5 | n >>> 27, t = s + a + t - 1894007588 + c[o + 3] << 0, r = r << 30 | r >>> 2, a = n & r | n & i | r & i, s = t << 5 | t >>> 27, e = s + a + e - 1894007588 + c[o + 4] << 0, n = n << 30 | n >>> 2;
			for (; o < 80; o += 5) a = t ^ n ^ r, s = e << 5 | e >>> 27, i = s + a + i - 899497514 + c[o] << 0, t = t << 30 | t >>> 2, a = e ^ t ^ n, s = i << 5 | i >>> 27, r = s + a + r - 899497514 + c[o + 1] << 0, e = e << 30 | e >>> 2, a = i ^ e ^ t, s = r << 5 | r >>> 27, n = s + a + n - 899497514 + c[o + 2] << 0, i = i << 30 | i >>> 2, a = r ^ i ^ e, s = n << 5 | n >>> 27, t = s + a + t - 899497514 + c[o + 3] << 0, r = r << 30 | r >>> 2, a = n ^ r ^ i, s = t << 5 | t >>> 27, e = s + a + e - 899497514 + c[o + 4] << 0, n = n << 30 | n >>> 2;
			this.h0 = this.h0 + e << 0, this.h1 = this.h1 + t << 0, this.h2 = this.h2 + n << 0, this.h3 = this.h3 + r << 0, this.h4 = this.h4 + i << 0;
		}, C.prototype.hex = function() {
			this.finalize();
			var e = this.h0, t = this.h1, n = this.h2, r = this.h3, i = this.h4;
			return u[e >>> 28 & 15] + u[e >>> 24 & 15] + u[e >>> 20 & 15] + u[e >>> 16 & 15] + u[e >>> 12 & 15] + u[e >>> 8 & 15] + u[e >>> 4 & 15] + u[e & 15] + u[t >>> 28 & 15] + u[t >>> 24 & 15] + u[t >>> 20 & 15] + u[t >>> 16 & 15] + u[t >>> 12 & 15] + u[t >>> 8 & 15] + u[t >>> 4 & 15] + u[t & 15] + u[n >>> 28 & 15] + u[n >>> 24 & 15] + u[n >>> 20 & 15] + u[n >>> 16 & 15] + u[n >>> 12 & 15] + u[n >>> 8 & 15] + u[n >>> 4 & 15] + u[n & 15] + u[r >>> 28 & 15] + u[r >>> 24 & 15] + u[r >>> 20 & 15] + u[r >>> 16 & 15] + u[r >>> 12 & 15] + u[r >>> 8 & 15] + u[r >>> 4 & 15] + u[r & 15] + u[i >>> 28 & 15] + u[i >>> 24 & 15] + u[i >>> 20 & 15] + u[i >>> 16 & 15] + u[i >>> 12 & 15] + u[i >>> 8 & 15] + u[i >>> 4 & 15] + u[i & 15];
		}, C.prototype.toString = C.prototype.hex, C.prototype.digest = function() {
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
		}, C.prototype.array = C.prototype.digest, C.prototype.arrayBuffer = function() {
			this.finalize();
			var e = /* @__PURE__ */ new ArrayBuffer(20), t = new DataView(e);
			return t.setUint32(0, this.h0), t.setUint32(4, this.h1), t.setUint32(8, this.h2), t.setUint32(12, this.h3), t.setUint32(16, this.h4), e;
		};
		function w(e, t) {
			var n, r = _(e);
			if (e = r[0], r[1]) {
				var i = [], a = e.length, o = 0, s;
				for (n = 0; n < a; ++n) s = e.charCodeAt(n), s < 128 ? i[o++] = s : s < 2048 ? (i[o++] = 192 | s >>> 6, i[o++] = 128 | s & 63) : s < 55296 || s >= 57344 ? (i[o++] = 224 | s >>> 12, i[o++] = 128 | s >>> 6 & 63, i[o++] = 128 | s & 63) : (s = 65536 + ((s & 1023) << 10 | e.charCodeAt(++n) & 1023), i[o++] = 240 | s >>> 18, i[o++] = 128 | s >>> 12 & 63, i[o++] = 128 | s >>> 6 & 63, i[o++] = 128 | s & 63);
				e = i;
			}
			e.length > 64 && (e = new C(!0).update(e).array());
			var c = [], l = [];
			for (n = 0; n < 64; ++n) {
				var u = e[n] || 0;
				c[n] = 92 ^ u, l[n] = 54 ^ u;
			}
			C.call(this, t), this.update(l), this.oKeyPad = c, this.inner = !0, this.sharedMemory = t;
		}
		w.prototype = new C(), w.prototype.finalize = function() {
			if (C.prototype.finalize.call(this), this.inner) {
				this.inner = !1;
				var e = this.array();
				C.call(this, this.sharedMemory), this.update(this.oKeyPad), this.update(e), C.prototype.finalize.call(this);
			}
		};
		var T = y();
		T.sha1 = T, T.sha1.hmac = S(), s ? n.exports = T : (i.sha1 = T, c && define(function() {
			return T;
		}));
	})();
})))();
var n = /* @__PURE__ */ function(e) {
	return e.word = "word", e.excel = "excel", e.unknown = "unknown", e;
}({}), r = String(Math.random()), i = 0;
function a() {
	return `${i++}${r}`;
}
function o(e, t) {
	let n = [];
	for (let r = 0; r < e.length; r += t) {
		let i = e.slice(r, r + t);
		n.push(i);
	}
	return n;
}
var s = typeof window < "u" ? window : self;
"crossOriginIsolated" in s && s.crossOriginIsolated;
//#endregion
//#region node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/browser.js
var c = Uint8Array, l = Uint16Array, u = Int32Array, d = new c([
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
]), f = new c([
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
]), p = new c([
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
]), m = function(e, t) {
	for (var n = new l(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new u(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, h = m(d, 2), g = h.b, _ = h.r;
g[28] = 258, _[258] = 28;
var v = m(f, 0);
v.b;
for (var y = v.r, b = new l(32768), x = 0; x < 32768; ++x) {
	var S = (x & 43690) >> 1 | (x & 21845) << 1;
	S = (S & 52428) >> 2 | (S & 13107) << 2, S = (S & 61680) >> 4 | (S & 3855) << 4, b[x] = ((S & 65280) >> 8 | (S & 255) << 8) >> 1;
}
for (var C = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new l(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new l(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new l(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var u = i << 4 | e[i], d = t - e[i], f = o[e[i] - 1]++ << d, p = f | (1 << d) - 1; f <= p; ++f) s[b[f] >> c] = u;
	} else for (s = new l(r), i = 0; i < r; ++i) e[i] && (s[i] = b[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), w = new c(288), x = 0; x < 144; ++x) w[x] = 8;
for (var x = 144; x < 256; ++x) w[x] = 9;
for (var x = 256; x < 280; ++x) w[x] = 7;
for (var x = 280; x < 288; ++x) w[x] = 8;
for (var T = new c(32), x = 0; x < 32; ++x) T[x] = 5;
var ee = /*#__PURE__*/ C(w, 9, 0), E = /*#__PURE__*/ C(T, 5, 0), te = function(e) {
	return (e + 7) / 8 | 0;
}, D = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new c(e.subarray(t, n));
}, O = [
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
], k = function(e, t, n) {
	var r = Error(t || O[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, k), !n) throw r;
	return r;
}, A = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, j = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, M = function(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
		s: r,
		f: e[r]
	});
	var i = n.length, a = n.slice();
	if (!i) return {
		t: R,
		l: 0
	};
	if (i == 1) {
		var o = new c(n[0].s + 1);
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
	var s = n[0], u = n[1], d = 0, f = 1, p = 2;
	for (n[0] = {
		s: -1,
		f: s.f + u.f,
		l: s,
		r: u
	}; f != i - 1;) s = n[n[d].f < n[p].f ? d++ : p++], u = n[d != f && n[d].f < n[p].f ? d++ : p++], n[f++] = {
		s: -1,
		f: s.f + u.f,
		l: s,
		r: u
	};
	for (var m = a[0].s, r = 1; r < i; ++r) a[r].s > m && (m = a[r].s);
	var h = new l(m + 1), g = N(n[f - 1], h, 0);
	if (g > t) {
		var r = 0, _ = 0, v = g - t, y = 1 << v;
		for (a.sort(function(e, t) {
			return h[t.s] - h[e.s] || e.f - t.f;
		}); r < i; ++r) {
			var b = a[r].s;
			if (h[b] > t) _ += y - (1 << g - h[b]), h[b] = t;
			else break;
		}
		for (_ >>= v; _ > 0;) {
			var x = a[r].s;
			h[x] < t ? _ -= 1 << t - h[x]++ - 1 : ++r;
		}
		for (; r >= 0 && _; --r) {
			var S = a[r].s;
			h[S] == t && (--h[S], ++_);
		}
		g = t;
	}
	return {
		t: new c(h),
		l: g
	};
}, N = function(e, t, n) {
	return e.s == -1 ? Math.max(N(e.l, t, n + 1), N(e.r, t, n + 1)) : t[e.s] = n;
}, P = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new l(++t), r = 0, i = e[0], a = 1, o = function(e) {
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
}, F = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, ne = function(e, t, n) {
	var r = n.length, i = te(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, I = function(e, t, n, r, i, a, o, s, c, u, m) {
	A(t, m++, n), ++i[256];
	for (var h = M(i, 15), g = h.t, _ = h.l, v = M(a, 15), y = v.t, b = v.l, x = P(g), S = x.c, te = x.n, D = P(y), O = D.c, k = D.n, N = new l(19), I = 0; I < S.length; ++I) ++N[S[I] & 31];
	for (var I = 0; I < O.length; ++I) ++N[O[I] & 31];
	for (var L = M(N, 7), R = L.t, z = L.l, B = 19; B > 4 && !R[p[B - 1]]; --B);
	var V = u + 5 << 3, H = F(i, w) + F(a, T) + o, U = F(i, g) + F(a, y) + o + 14 + 3 * B + F(N, R) + 2 * N[16] + 3 * N[17] + 7 * N[18];
	if (c >= 0 && V <= H && V <= U) return ne(t, m, e.subarray(c, c + u));
	var W, G, K, q;
	if (A(t, m, 1 + (U < H)), m += 2, U < H) {
		W = C(g, _, 0), G = g, K = C(y, b, 0), q = y;
		var J = C(R, z, 0);
		A(t, m, te - 257), A(t, m + 5, k - 1), A(t, m + 10, B - 4), m += 14;
		for (var I = 0; I < B; ++I) A(t, m + 3 * I, R[p[I]]);
		m += 3 * B;
		for (var re = [S, O], Y = 0; Y < 2; ++Y) for (var X = re[Y], I = 0; I < X.length; ++I) {
			var Z = X[I] & 31;
			A(t, m, J[Z]), m += R[Z], Z > 15 && (A(t, m, X[I] >> 5 & 127), m += X[I] >> 12);
		}
	} else W = ee, G = w, K = E, q = T;
	for (var I = 0; I < s; ++I) {
		var Q = r[I];
		if (Q > 255) {
			var Z = Q >> 18 & 31;
			j(t, m, W[Z + 257]), m += G[Z + 257], Z > 7 && (A(t, m, Q >> 23 & 31), m += d[Z]);
			var $ = Q & 31;
			j(t, m, K[$]), m += q[$], $ > 3 && (j(t, m, Q >> 5 & 8191), m += f[$]);
		} else j(t, m, W[Q]), m += G[Q];
	}
	return j(t, m, W[256]), m + G[256];
}, L = /*#__PURE__*/ new u([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), R = /*#__PURE__*/ new c(0), z = function(e, t, n, r, i, a) {
	var o = a.z || e.length, s = new c(r + o + 5 * (1 + Math.ceil(o / 7e3)) + i), p = s.subarray(r, s.length - i), m = a.l, h = (a.r || 0) & 7;
	if (t) {
		h && (p[0] = a.r >> 3);
		for (var g = L[t - 1], v = g >> 13, b = g & 8191, x = (1 << n) - 1, S = a.p || new l(32768), C = a.h || new l(x + 1), w = Math.ceil(n / 3), T = 2 * w, ee = function(t) {
			return (e[t] ^ e[t + 1] << w ^ e[t + 2] << T) & x;
		}, E = new u(25e3), O = new l(288), k = new l(32), A = 0, j = 0, M = a.i || 0, N = 0, P = a.w || 0, F = 0; M + 2 < o; ++M) {
			var R = ee(M), z = M & 32767, B = C[R];
			if (S[z] = B, C[R] = z, P <= M) {
				var V = o - M;
				if ((A > 7e3 || N > 24576) && (V > 423 || !m)) {
					h = I(e, p, 0, E, O, k, j, N, F, M - F, h), N = A = j = 0, F = M;
					for (var H = 0; H < 286; ++H) O[H] = 0;
					for (var H = 0; H < 30; ++H) k[H] = 0;
				}
				var U = 2, W = 0, G = b, K = z - B & 32767;
				if (V > 2 && R == ee(M - K)) for (var q = Math.min(v, V) - 1, J = Math.min(32767, M), re = Math.min(258, V); K <= J && --G && z != B;) {
					if (e[M + U] == e[M + U - K]) {
						for (var Y = 0; Y < re && e[M + Y] == e[M + Y - K]; ++Y);
						if (Y > U) {
							if (U = Y, W = K, Y > q) break;
							for (var X = Math.min(K, Y - 2), Z = 0, H = 0; H < X; ++H) {
								var Q = M - K + H & 32767, $ = Q - S[Q] & 32767;
								$ > Z && (Z = $, B = Q);
							}
						}
					}
					z = B, B = S[z], K += z - B & 32767;
				}
				if (W) {
					E[N++] = 268435456 | _[U] << 18 | y[W];
					var ie = _[U] & 31, ae = y[W] & 31;
					j += d[ie] + f[ae], ++O[257 + ie], ++k[ae], P = M + U, ++A;
				} else E[N++] = e[M], ++O[e[M]];
			}
		}
		for (M = Math.max(M, P); M < o; ++M) E[N++] = e[M], ++O[e[M]];
		h = I(e, p, m, E, O, k, j, N, F, M - F, h), m || (a.r = h & 7 | p[h / 8 | 0] << 3, h -= 7, a.h = C, a.p = S, a.i = M, a.w = P);
	} else {
		for (var M = a.w || 0; M < o + m; M += 65535) {
			var oe = M + 65535;
			oe >= o && (p[h / 8 | 0] = m, oe = o), h = ne(p, h + 1, e.subarray(M, oe));
		}
		a.i = o;
	}
	return D(s, 0, r + te(h) + i);
}, B = /*#__PURE__*/ (function() {
	for (var e = /* @__PURE__ */ new Int32Array(256), t = 0; t < 256; ++t) {
		for (var n = t, r = 9; --r;) n = (n & 1 && -306674912) ^ n >>> 1;
		e[t] = n;
	}
	return e;
})(), V = function() {
	var e = -1;
	return {
		p: function(t) {
			for (var n = e, r = 0; r < t.length; ++r) n = B[n & 255 ^ t[r]] ^ n >>> 8;
			e = n;
		},
		d: function() {
			return ~e;
		}
	};
}, H = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var a = t.dictionary.subarray(-32768), o = new c(a.length + e.length);
		o.set(a), o.set(e, a.length), e = o, i.w = a.length;
	}
	return z(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
}, U = function(e, t) {
	var n = {};
	for (var r in e) n[r] = e[r];
	for (var r in t) n[r] = t[r];
	return n;
}, W = function(e, t, n) {
	for (; n; ++t) e[t] = n, n >>>= 8;
}, G = /* @__PURE__ */ function() {
	function e(e, t) {
		if (typeof e == "function" && (t = e, e = {}), this.ondata = t, this.o = e || {}, this.s = {
			l: 0,
			i: 32768,
			w: 32768,
			z: 32768
		}, this.b = new c(98304), this.o.dictionary) {
			var n = this.o.dictionary.subarray(-32768);
			this.b.set(n, 32768 - n.length), this.s.i = 32768 - n.length;
		}
	}
	return e.prototype.p = function(e, t) {
		this.ondata(H(e, this.o, 0, 0, this.s), t);
	}, e.prototype.push = function(e, t) {
		this.ondata || k(5), this.s.l && k(4);
		var n = e.length + this.s.z;
		if (n > this.b.length) {
			if (n > 2 * this.b.length - 32768) {
				var r = new c(n & -32768);
				r.set(this.b.subarray(0, this.s.z)), this.b = r;
			}
			var i = this.b.length - this.s.z;
			this.b.set(e.subarray(0, i), this.s.z), this.s.z = this.b.length, this.p(this.b, !1), this.b.set(this.b.subarray(-32768)), this.b.set(e.subarray(i), 32768), this.s.z = e.length - i + 32768, this.s.i = 32766, this.s.w = 32768;
		} else this.b.set(e, this.s.z), this.s.z += e.length;
		this.s.l = t & 1, (this.s.z > this.s.w + 8191 || t) && (this.p(this.b, t || !1), this.s.w = this.s.i, this.s.i -= 2), t && (this.s = this.o = {}, this.b = R);
	}, e.prototype.flush = function(e) {
		if (this.ondata || k(5), this.s.l && k(4), this.p(this.b, !1), this.s.w = this.s.i, this.s.i -= 2, e) {
			var t = new c(6);
			t[0] = this.s.r >> 3;
			var n = ne(t, this.s.r, R);
			this.s.r = 0, this.ondata(t.subarray(0, n >> 3), !1);
		}
	}, e;
}(), K = typeof TextEncoder < "u" && /*#__PURE__*/ new TextEncoder(), q = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	q.decode(R, { stream: !0 });
} catch {}
function J(e, t) {
	if (t) {
		for (var n = new c(e.length), r = 0; r < e.length; ++r) n[r] = e.charCodeAt(r);
		return n;
	}
	if (K) return K.encode(e);
	for (var i = e.length, a = new c(e.length + (e.length >> 1)), o = 0, s = function(e) {
		a[o++] = e;
	}, r = 0; r < i; ++r) {
		if (o + 5 > a.length) {
			var l = new c(o + 8 + (i - r << 1));
			l.set(a), a = l;
		}
		var u = e.charCodeAt(r);
		u < 128 || t ? s(u) : u < 2048 ? (s(192 | u >> 6), s(128 | u & 63)) : u > 55295 && u < 57344 ? (u = 65536 + (u & 1047552) | e.charCodeAt(++r) & 1023, s(240 | u >> 18), s(128 | u >> 12 & 63), s(128 | u >> 6 & 63), s(128 | u & 63)) : (s(224 | u >> 12), s(128 | u >> 6 & 63), s(128 | u & 63));
	}
	return D(a, 0, o);
}
var re = function(e) {
	return e == 1 ? 3 : e < 6 ? 2 : +(e == 9);
}, Y = function(e) {
	var t = 0;
	if (e) for (var n in e) {
		var r = e[n].length;
		r > 65535 && k(9), t += r + 4;
	}
	return t;
}, X = function(e, t, n, r, i, a, o, s) {
	var c = r.length, l = n.extra, u = s && s.length, d = Y(l);
	W(e, t, o == null ? 67324752 : 33639248), t += 4, o != null && (e[t++] = 20, e[t++] = n.os), e[t] = 20, t += 2, e[t++] = n.flag << 1 | (a < 0 && 8), e[t++] = i && 8, e[t++] = n.compression & 255, e[t++] = n.compression >> 8;
	var f = new Date(n.mtime == null ? Date.now() : n.mtime), p = f.getFullYear() - 1980;
	if ((p < 0 || p > 119) && k(10), W(e, t, p << 25 | f.getMonth() + 1 << 21 | f.getDate() << 16 | f.getHours() << 11 | f.getMinutes() << 5 | f.getSeconds() >> 1), t += 4, a != -1 && (W(e, t, n.crc), W(e, t + 4, a < 0 ? -a - 2 : a), W(e, t + 8, n.size)), W(e, t + 12, c), W(e, t + 14, d), t += 16, o != null && (W(e, t, u), W(e, t + 6, n.attrs), W(e, t + 10, o), t += 14), e.set(r, t), t += c, d) for (var m in l) {
		var h = l[m], g = h.length;
		W(e, t, +m), W(e, t + 2, g), e.set(h, t + 4), t += 4 + g;
	}
	return u && (e.set(s, t), t += u), t;
}, Z = function(e, t, n, r, i) {
	W(e, t, 101010256), W(e, t + 8, n), W(e, t + 10, n), W(e, t + 12, r), W(e, t + 16, i);
}, Q = /* @__PURE__ */ function() {
	function e(e) {
		this.filename = e, this.c = V(), this.size = 0, this.compression = 0;
	}
	return e.prototype.process = function(e, t) {
		this.ondata(null, e, t);
	}, e.prototype.push = function(e, t) {
		this.ondata || k(5), this.c.p(e), this.size += e.length, t && (this.crc = this.c.d()), this.process(e, t || !1);
	}, e;
}(), $ = /* @__PURE__ */ function() {
	function e(e, t) {
		var n = this;
		t ||= {}, Q.call(this, e), this.d = new G(t, function(e, t) {
			n.ondata(null, e, t);
		}), this.compression = 8, this.flag = re(t.level);
	}
	return e.prototype.process = function(e, t) {
		try {
			this.d.push(e, t);
		} catch (e) {
			this.ondata(e, null, t);
		}
	}, e.prototype.push = function(e, t) {
		Q.prototype.push.call(this, e, t);
	}, e;
}(), ie = /* @__PURE__ */ function() {
	function e(e) {
		this.ondata = e, this.u = [], this.d = 1;
	}
	return e.prototype.add = function(e) {
		var t = this;
		if (this.ondata || k(5), this.d & 2) this.ondata(k(4 + (this.d & 1) * 8, 0, 1), null, !1);
		else {
			var n = J(e.filename), r = n.length, i = e.comment, a = i && J(i), o = r != e.filename.length || a && i.length != a.length, s = r + Y(e.extra) + 30;
			r > 65535 && this.ondata(k(11, 0, 1), null, !1);
			var l = new c(s);
			X(l, 0, e, n, o, -1);
			var u = [l], d = function() {
				for (var e = 0, n = u; e < n.length; e++) {
					var r = n[e];
					t.ondata(null, r, !1);
				}
				u = [];
			}, f = this.d;
			this.d = 0;
			var p = this.u.length, m = U(e, {
				f: n,
				u: o,
				o: a,
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
			e.ondata = function(n, r, i) {
				if (n) t.ondata(n, r, i), t.terminate();
				else if (h += r.length, u.push(r), i) {
					var a = new c(16);
					W(a, 0, 134695760), W(a, 4, e.crc), W(a, 8, h), W(a, 12, e.size), u.push(a), m.c = h, m.b = s + h + 16, m.crc = e.crc, m.size = e.size, f && m.r(), f = 1;
				} else f && d();
			}, this.u.push(m);
		}
	}, e.prototype.end = function() {
		var e = this;
		if (this.d & 2) {
			this.ondata(k(4 + (this.d & 1) * 8, 0, 1), null, !0);
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
			n += 46 + a.f.length + Y(a.extra) + (a.o ? a.o.length : 0);
		}
		for (var o = new c(n + 22), s = 0, l = this.u; s < l.length; s++) {
			var a = l[s];
			X(o, e, a, a.f, a.u, -a.c - 2, t, a.o), e += 46 + a.f.length + Y(a.extra) + (a.o ? a.o.length : 0), t += a.b;
		}
		Z(o, e, this.u.length, n, t), this.ondata(null, o, !0), this.d = 2;
	}, e.prototype.terminate = function() {
		for (var e = 0, t = this.u; e < t.length; e++) t[e].t();
		this.d = 2;
	}, e;
}();
//#endregion
export { o as a, a as i, $ as n, n as r, ie as t };

//# sourceMappingURL=browser-DoSoF-_k.js.map