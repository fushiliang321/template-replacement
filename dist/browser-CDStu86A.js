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
//#endregion
//#region node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/browser.js
var s = Uint8Array, c = Uint16Array, l = Int32Array, u = new s([
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
]), d = new s([
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
]), f = new s([
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
]), p = function(e, t) {
	for (var n = new c(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new l(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, m = p(u, 2), h = m.b, g = m.r;
h[28] = 258, g[258] = 28;
var _ = p(d, 0);
_.b;
for (var v = _.r, y = new c(32768), b = 0; b < 32768; ++b) {
	var x = (b & 43690) >> 1 | (b & 21845) << 1;
	x = (x & 52428) >> 2 | (x & 13107) << 2, x = (x & 61680) >> 4 | (x & 3855) << 4, y[b] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
for (var S = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new c(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new c(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new c(1 << t);
		var l = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var u = i << 4 | e[i], d = t - e[i], f = o[e[i] - 1]++ << d, p = f | (1 << d) - 1; f <= p; ++f) s[y[f] >> l] = u;
	} else for (s = new c(r), i = 0; i < r; ++i) e[i] && (s[i] = y[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}), C = new s(288), b = 0; b < 144; ++b) C[b] = 8;
for (var b = 144; b < 256; ++b) C[b] = 9;
for (var b = 256; b < 280; ++b) C[b] = 7;
for (var b = 280; b < 288; ++b) C[b] = 8;
for (var w = new s(32), b = 0; b < 32; ++b) w[b] = 5;
var T = /*#__PURE__*/ S(C, 9, 0), E = /*#__PURE__*/ S(w, 5, 0), ee = function(e) {
	return (e + 7) / 8 | 0;
}, te = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new s(e.subarray(t, n));
}, D = [
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
], O = function(e, t, n) {
	var r = Error(t || D[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, O), !n) throw r;
	return r;
}, k = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, A = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, j = function(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
		s: r,
		f: e[r]
	});
	var i = n.length, a = n.slice();
	if (!i) return {
		t: L,
		l: 0
	};
	if (i == 1) {
		var o = new s(n[0].s + 1);
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
	var l = n[0], u = n[1], d = 0, f = 1, p = 2;
	for (n[0] = {
		s: -1,
		f: l.f + u.f,
		l,
		r: u
	}; f != i - 1;) l = n[n[d].f < n[p].f ? d++ : p++], u = n[d != f && n[d].f < n[p].f ? d++ : p++], n[f++] = {
		s: -1,
		f: l.f + u.f,
		l,
		r: u
	};
	for (var m = a[0].s, r = 1; r < i; ++r) a[r].s > m && (m = a[r].s);
	var h = new c(m + 1), g = M(n[f - 1], h, 0);
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
		t: new s(h),
		l: g
	};
}, M = function(e, t, n) {
	return e.s == -1 ? Math.max(M(e.l, t, n + 1), M(e.r, t, n + 1)) : t[e.s] = n;
}, N = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new c(++t), r = 0, i = e[0], a = 1, o = function(e) {
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
}, P = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, ne = function(e, t, n) {
	var r = n.length, i = ee(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, F = function(e, t, n, r, i, a, o, s, l, p, m) {
	k(t, m++, n), ++i[256];
	for (var h = j(i, 15), g = h.t, _ = h.l, v = j(a, 15), y = v.t, b = v.l, x = N(g), ee = x.c, te = x.n, D = N(y), O = D.c, M = D.n, F = new c(19), I = 0; I < ee.length; ++I) ++F[ee[I] & 31];
	for (var I = 0; I < O.length; ++I) ++F[O[I] & 31];
	for (var L = j(F, 7), R = L.t, z = L.l, B = 19; B > 4 && !R[f[B - 1]]; --B);
	var V = p + 5 << 3, H = P(i, C) + P(a, w) + o, U = P(i, g) + P(a, y) + o + 14 + 3 * B + P(F, R) + 2 * F[16] + 3 * F[17] + 7 * F[18];
	if (l >= 0 && V <= H && V <= U) return ne(t, m, e.subarray(l, l + p));
	var W, G, K, q;
	if (k(t, m, 1 + (U < H)), m += 2, U < H) {
		W = S(g, _, 0), G = g, K = S(y, b, 0), q = y;
		var re = S(R, z, 0);
		k(t, m, te - 257), k(t, m + 5, M - 1), k(t, m + 10, B - 4), m += 14;
		for (var I = 0; I < B; ++I) k(t, m + 3 * I, R[f[I]]);
		m += 3 * B;
		for (var J = [ee, O], Y = 0; Y < 2; ++Y) for (var X = J[Y], I = 0; I < X.length; ++I) {
			var Z = X[I] & 31;
			k(t, m, re[Z]), m += R[Z], Z > 15 && (k(t, m, X[I] >> 5 & 127), m += X[I] >> 12);
		}
	} else W = T, G = C, K = E, q = w;
	for (var I = 0; I < s; ++I) {
		var Q = r[I];
		if (Q > 255) {
			var Z = Q >> 18 & 31;
			A(t, m, W[Z + 257]), m += G[Z + 257], Z > 7 && (k(t, m, Q >> 23 & 31), m += u[Z]);
			var $ = Q & 31;
			A(t, m, K[$]), m += q[$], $ > 3 && (A(t, m, Q >> 5 & 8191), m += d[$]);
		} else A(t, m, W[Q]), m += G[Q];
	}
	return A(t, m, W[256]), m + G[256];
}, I = /*#__PURE__*/ new l([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), L = /*#__PURE__*/ new s(0), R = function(e, t, n, r, i, a) {
	var o = a.z || e.length, f = new s(r + o + 5 * (1 + Math.ceil(o / 7e3)) + i), p = f.subarray(r, f.length - i), m = a.l, h = (a.r || 0) & 7;
	if (t) {
		h && (p[0] = a.r >> 3);
		for (var _ = I[t - 1], y = _ >> 13, b = _ & 8191, x = (1 << n) - 1, S = a.p || new c(32768), C = a.h || new c(x + 1), w = Math.ceil(n / 3), T = 2 * w, E = function(t) {
			return (e[t] ^ e[t + 1] << w ^ e[t + 2] << T) & x;
		}, D = new l(25e3), O = new c(288), k = new c(32), A = 0, j = 0, M = a.i || 0, N = 0, P = a.w || 0, L = 0; M + 2 < o; ++M) {
			var R = E(M), z = M & 32767, B = C[R];
			if (S[z] = B, C[R] = z, P <= M) {
				var V = o - M;
				if ((A > 7e3 || N > 24576) && (V > 423 || !m)) {
					h = F(e, p, 0, D, O, k, j, N, L, M - L, h), N = A = j = 0, L = M;
					for (var H = 0; H < 286; ++H) O[H] = 0;
					for (var H = 0; H < 30; ++H) k[H] = 0;
				}
				var U = 2, W = 0, G = b, K = z - B & 32767;
				if (V > 2 && R == E(M - K)) for (var q = Math.min(y, V) - 1, re = Math.min(32767, M), J = Math.min(258, V); K <= re && --G && z != B;) {
					if (e[M + U] == e[M + U - K]) {
						for (var Y = 0; Y < J && e[M + Y] == e[M + Y - K]; ++Y);
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
					D[N++] = 268435456 | g[U] << 18 | v[W];
					var ie = g[U] & 31, ae = v[W] & 31;
					j += u[ie] + d[ae], ++O[257 + ie], ++k[ae], P = M + U, ++A;
				} else D[N++] = e[M], ++O[e[M]];
			}
		}
		for (M = Math.max(M, P); M < o; ++M) D[N++] = e[M], ++O[e[M]];
		h = F(e, p, m, D, O, k, j, N, L, M - L, h), m || (a.r = h & 7 | p[h / 8 | 0] << 3, h -= 7, a.h = C, a.p = S, a.i = M, a.w = P);
	} else {
		for (var M = a.w || 0; M < o + m; M += 65535) {
			var oe = M + 65535;
			oe >= o && (p[h / 8 | 0] = m, oe = o), h = ne(p, h + 1, e.subarray(M, oe));
		}
		a.i = o;
	}
	return te(f, 0, r + ee(h) + i);
}, z = /*#__PURE__*/ (function() {
	for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
		for (var n = t, r = 9; --r;) n = (n & 1 && -306674912) ^ n >>> 1;
		e[t] = n;
	}
	return e;
})(), B = function() {
	var e = -1;
	return {
		p: function(t) {
			for (var n = e, r = 0; r < t.length; ++r) n = z[n & 255 ^ t[r]] ^ n >>> 8;
			e = n;
		},
		d: function() {
			return ~e;
		}
	};
}, V = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var a = t.dictionary.subarray(-32768), o = new s(a.length + e.length);
		o.set(a), o.set(e, a.length), e = o, i.w = a.length;
	}
	return R(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
}, H = function(e, t) {
	var n = {};
	for (var r in e) n[r] = e[r];
	for (var r in t) n[r] = t[r];
	return n;
}, U = function(e, t, n) {
	for (; n; ++t) e[t] = n, n >>>= 8;
}, W = /* @__PURE__ */ function() {
	function e(e, t) {
		if (typeof e == "function" && (t = e, e = {}), this.ondata = t, this.o = e || {}, this.s = {
			l: 0,
			i: 32768,
			w: 32768,
			z: 32768
		}, this.b = new s(98304), this.o.dictionary) {
			var n = this.o.dictionary.subarray(-32768);
			this.b.set(n, 32768 - n.length), this.s.i = 32768 - n.length;
		}
	}
	return e.prototype.p = function(e, t) {
		this.ondata(V(e, this.o, 0, 0, this.s), t);
	}, e.prototype.push = function(e, t) {
		this.ondata || O(5), this.s.l && O(4);
		var n = e.length + this.s.z;
		if (n > this.b.length) {
			if (n > 2 * this.b.length - 32768) {
				var r = new s(n & -32768);
				r.set(this.b.subarray(0, this.s.z)), this.b = r;
			}
			var i = this.b.length - this.s.z;
			this.b.set(e.subarray(0, i), this.s.z), this.s.z = this.b.length, this.p(this.b, !1), this.b.set(this.b.subarray(-32768)), this.b.set(e.subarray(i), 32768), this.s.z = e.length - i + 32768, this.s.i = 32766, this.s.w = 32768;
		} else this.b.set(e, this.s.z), this.s.z += e.length;
		this.s.l = t & 1, (this.s.z > this.s.w + 8191 || t) && (this.p(this.b, t || !1), this.s.w = this.s.i, this.s.i -= 2), t && (this.s = this.o = {}, this.b = L);
	}, e.prototype.flush = function(e) {
		if (this.ondata || O(5), this.s.l && O(4), this.p(this.b, !1), this.s.w = this.s.i, this.s.i -= 2, e) {
			var t = new s(6);
			t[0] = this.s.r >> 3;
			var n = ne(t, this.s.r, L);
			this.s.r = 0, this.ondata(t.subarray(0, n >> 3), !1);
		}
	}, e;
}(), G = typeof TextEncoder < "u" && /*#__PURE__*/ new TextEncoder(), K = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	K.decode(L, { stream: !0 });
} catch {}
function q(e, t) {
	if (t) {
		for (var n = new s(e.length), r = 0; r < e.length; ++r) n[r] = e.charCodeAt(r);
		return n;
	}
	if (G) return G.encode(e);
	for (var i = e.length, a = new s(e.length + (e.length >> 1)), o = 0, c = function(e) {
		a[o++] = e;
	}, r = 0; r < i; ++r) {
		if (o + 5 > a.length) {
			var l = new s(o + 8 + (i - r << 1));
			l.set(a), a = l;
		}
		var u = e.charCodeAt(r);
		u < 128 || t ? c(u) : u < 2048 ? (c(192 | u >> 6), c(128 | u & 63)) : u > 55295 && u < 57344 ? (u = 65536 + (u & 1047552) | e.charCodeAt(++r) & 1023, c(240 | u >> 18), c(128 | u >> 12 & 63), c(128 | u >> 6 & 63), c(128 | u & 63)) : (c(224 | u >> 12), c(128 | u >> 6 & 63), c(128 | u & 63));
	}
	return te(a, 0, o);
}
var re = function(e) {
	return e == 1 ? 3 : e < 6 ? 2 : +(e == 9);
}, J = function(e) {
	var t = 0;
	if (e) for (var n in e) {
		var r = e[n].length;
		r > 65535 && O(9), t += r + 4;
	}
	return t;
}, Y = function(e, t, n, r, i, a, o, s) {
	var c = r.length, l = n.extra, u = s && s.length, d = J(l);
	U(e, t, o == null ? 67324752 : 33639248), t += 4, o != null && (e[t++] = 20, e[t++] = n.os), e[t] = 20, t += 2, e[t++] = n.flag << 1 | (a < 0 && 8), e[t++] = i && 8, e[t++] = n.compression & 255, e[t++] = n.compression >> 8;
	var f = new Date(n.mtime == null ? Date.now() : n.mtime), p = f.getFullYear() - 1980;
	if ((p < 0 || p > 119) && O(10), U(e, t, p << 25 | f.getMonth() + 1 << 21 | f.getDate() << 16 | f.getHours() << 11 | f.getMinutes() << 5 | f.getSeconds() >> 1), t += 4, a != -1 && (U(e, t, n.crc), U(e, t + 4, a < 0 ? -a - 2 : a), U(e, t + 8, n.size)), U(e, t + 12, c), U(e, t + 14, d), t += 16, o != null && (U(e, t, u), U(e, t + 6, n.attrs), U(e, t + 10, o), t += 14), e.set(r, t), t += c, d) for (var m in l) {
		var h = l[m], g = h.length;
		U(e, t, +m), U(e, t + 2, g), e.set(h, t + 4), t += 4 + g;
	}
	return u && (e.set(s, t), t += u), t;
}, X = function(e, t, n, r, i) {
	U(e, t, 101010256), U(e, t + 8, n), U(e, t + 10, n), U(e, t + 12, r), U(e, t + 16, i);
}, Z = /* @__PURE__ */ function() {
	function e(e) {
		this.filename = e, this.c = B(), this.size = 0, this.compression = 0;
	}
	return e.prototype.process = function(e, t) {
		this.ondata(null, e, t);
	}, e.prototype.push = function(e, t) {
		this.ondata || O(5), this.c.p(e), this.size += e.length, t && (this.crc = this.c.d()), this.process(e, t || !1);
	}, e;
}(), Q = /* @__PURE__ */ function() {
	function e(e, t) {
		var n = this;
		t ||= {}, Z.call(this, e), this.d = new W(t, function(e, t) {
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
		Z.prototype.push.call(this, e, t);
	}, e;
}(), $ = /* @__PURE__ */ function() {
	function e(e) {
		this.ondata = e, this.u = [], this.d = 1;
	}
	return e.prototype.add = function(e) {
		var t = this;
		if (this.ondata || O(5), this.d & 2) this.ondata(O(4 + (this.d & 1) * 8, 0, 1), null, !1);
		else {
			var n = q(e.filename), r = n.length, i = e.comment, a = i && q(i), o = r != e.filename.length || a && i.length != a.length, c = r + J(e.extra) + 30;
			r > 65535 && this.ondata(O(11, 0, 1), null, !1);
			var l = new s(c);
			Y(l, 0, e, n, o, -1);
			var u = [l], d = function() {
				for (var e = 0, n = u; e < n.length; e++) {
					var r = n[e];
					t.ondata(null, r, !1);
				}
				u = [];
			}, f = this.d;
			this.d = 0;
			var p = this.u.length, m = H(e, {
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
					var a = new s(16);
					U(a, 0, 134695760), U(a, 4, e.crc), U(a, 8, h), U(a, 12, e.size), u.push(a), m.c = h, m.b = c + h + 16, m.crc = e.crc, m.size = e.size, f && m.r(), f = 1;
				} else f && d();
			}, this.u.push(m);
		}
	}, e.prototype.end = function() {
		var e = this;
		if (this.d & 2) {
			this.ondata(O(4 + (this.d & 1) * 8, 0, 1), null, !0);
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
			n += 46 + a.f.length + J(a.extra) + (a.o ? a.o.length : 0);
		}
		for (var o = new s(n + 22), c = 0, l = this.u; c < l.length; c++) {
			var a = l[c];
			Y(o, e, a, a.f, a.u, -a.c - 2, t, a.o), e += 46 + a.f.length + J(a.extra) + (a.o ? a.o.length : 0), t += a.b;
		}
		X(o, e, this.u.length, n, t), this.ondata(null, o, !0), this.d = 2;
	}, e.prototype.terminate = function() {
		for (var e = 0, t = this.u; e < t.length; e++) t[e].t();
		this.d = 2;
	}, e;
}();
//#endregion
export { o as a, a as i, Q as n, n as r, $ as t };

//# sourceMappingURL=browser-CDStu86A.js.map