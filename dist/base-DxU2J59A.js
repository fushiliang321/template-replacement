//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), n = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
};
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
var r = /* @__PURE__ */ t(((e, t) => {
	t.exports = {};
}));
(/* @__PURE__ */ t(((e, t) => {
	(function() {
		var e = "input is invalid type", n = "finalize already called", i = typeof window == "object", a = i ? window : {};
		a.JS_SHA1_NO_WINDOW && (i = !1);
		var o = !i && typeof self == "object", s = !a.JS_SHA1_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
		s ? a = global : o && (a = self);
		var c = !a.JS_SHA1_NO_COMMON_JS && typeof t == "object" && t.exports, l = typeof define == "function" && define.amd, u = !a.JS_SHA1_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", d = "0123456789abcdef".split(""), f = [
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
		}, x = function(t) {
			var n = r(), i = r().Buffer, o = i.from && !a.JS_SHA1_NO_BUFFER_FROM ? i.from : function(e) {
				return new i(e);
			};
			return function(r) {
				if (typeof r == "string") return n.createHash("sha1").update(r, "utf8").digest("hex");
				if (r == null) throw Error(e);
				return r.constructor === ArrayBuffer && (r = new Uint8Array(r)), g(r) || _(r) || r.constructor === i ? n.createHash("sha1").update(o(r)).digest("hex") : t(r);
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
			if (this.finalized) throw Error(n);
			var t = v(e);
			e = t[0];
			for (var r = t[1], i, a = 0, o, s = e.length || 0, c = this.blocks; a < s;) {
				if (this.hashed && (this.hashed = !1, c[0] = this.block, this.block = c[16] = c[1] = c[2] = c[3] = c[4] = c[5] = c[6] = c[7] = c[8] = c[9] = c[10] = c[11] = c[12] = c[13] = c[14] = c[15] = 0), r) for (o = this.start; a < s && o < 64; ++a) i = e.charCodeAt(a), i < 128 ? c[o >>> 2] |= i << p[o++ & 3] : i < 2048 ? (c[o >>> 2] |= (192 | i >>> 6) << p[o++ & 3], c[o >>> 2] |= (128 | i & 63) << p[o++ & 3]) : i < 55296 || i >= 57344 ? (c[o >>> 2] |= (224 | i >>> 12) << p[o++ & 3], c[o >>> 2] |= (128 | i >>> 6 & 63) << p[o++ & 3], c[o >>> 2] |= (128 | i & 63) << p[o++ & 3]) : (i = 65536 + ((i & 1023) << 10 | e.charCodeAt(++a) & 1023), c[o >>> 2] |= (240 | i >>> 18) << p[o++ & 3], c[o >>> 2] |= (128 | i >>> 12 & 63) << p[o++ & 3], c[o >>> 2] |= (128 | i >>> 6 & 63) << p[o++ & 3], c[o >>> 2] |= (128 | i & 63) << p[o++ & 3]);
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
		E.sha1 = E, E.sha1.hmac = C(), c ? t.exports = E : (a.sha1 = E, l && define(function() {
			return E;
		}));
	})();
})))();
var i = /* @__PURE__ */ function(e) {
	return e.word = "word", e.excel = "excel", e.unknown = "unknown", e;
}({}), a = Uint8Array, o = Uint16Array, s = Int32Array, c = new a([
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
]), l = new a([
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
]), u = new a([
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
]), d = function(e, t) {
	for (var n = new o(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new s(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, f = d(c, 2), p = f.b, m = f.r;
p[28] = 258, m[258] = 28;
var h = d(l, 0);
h.b;
for (var g = h.r, _ = new o(32768), v = 0; v < 32768; ++v) {
	var y = (v & 43690) >> 1 | (v & 21845) << 1;
	y = (y & 52428) >> 2 | (y & 13107) << 2, y = (y & 61680) >> 4 | (y & 3855) << 4, _[v] = ((y & 65280) >> 8 | (y & 255) << 8) >> 1;
}
for (var b = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new o(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var s = new o(t);
	for (i = 1; i < t; ++i) s[i] = s[i - 1] + a[i - 1] << 1;
	var c;
	if (n) {
		c = new o(1 << t);
		var l = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var u = i << 4 | e[i], d = t - e[i], f = s[e[i] - 1]++ << d, p = f | (1 << d) - 1; f <= p; ++f) c[_[f] >> l] = u;
	} else for (c = new o(r), i = 0; i < r; ++i) e[i] && (c[i] = _[s[e[i] - 1]++] >> 15 - e[i]);
	return c;
}), x = new a(288), v = 0; v < 144; ++v) x[v] = 8;
for (var v = 144; v < 256; ++v) x[v] = 9;
for (var v = 256; v < 280; ++v) x[v] = 7;
for (var v = 280; v < 288; ++v) x[v] = 8;
for (var S = new a(32), v = 0; v < 32; ++v) S[v] = 5;
var C = /*#__PURE__*/ b(x, 9, 0), w = /*#__PURE__*/ b(S, 5, 0), T = function(e) {
	return (e + 7) / 8 | 0;
}, E = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new a(e.subarray(t, n));
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
	var i = n.length, s = n.slice();
	if (!i) return {
		t: I,
		l: 0
	};
	if (i == 1) {
		var c = new a(n[0].s + 1);
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
	}; f != i - 1;) l = n[n[d].f < n[p].f ? d++ : p++], u = n[d != f && n[d].f < n[p].f ? d++ : p++], n[f++] = {
		s: -1,
		f: l.f + u.f,
		l,
		r: u
	};
	for (var m = s[0].s, r = 1; r < i; ++r) s[r].s > m && (m = s[r].s);
	var h = new o(m + 1), g = M(n[f - 1], h, 0);
	if (g > t) {
		var r = 0, _ = 0, v = g - t, y = 1 << v;
		for (s.sort(function(e, t) {
			return h[t.s] - h[e.s] || e.f - t.f;
		}); r < i; ++r) {
			var b = s[r].s;
			if (h[b] > t) _ += y - (1 << g - h[b]), h[b] = t;
			else break;
		}
		for (_ >>= v; _ > 0;) {
			var x = s[r].s;
			h[x] < t ? _ -= 1 << t - h[x]++ - 1 : ++r;
		}
		for (; r >= 0 && _; --r) {
			var S = s[r].s;
			h[S] == t && (--h[S], ++_);
		}
		g = t;
	}
	return {
		t: new a(h),
		l: g
	};
}, M = function(e, t, n) {
	return e.s == -1 ? Math.max(M(e.l, t, n + 1), M(e.r, t, n + 1)) : t[e.s] = n;
}, N = function(e) {
	for (var t = e.length; t && !e[--t];);
	for (var n = new o(++t), r = 0, i = e[0], a = 1, s = function(e) {
		n[r++] = e;
	}, c = 1; c <= t; ++c) if (e[c] == i && c != t) ++a;
	else {
		if (!i && a > 2) {
			for (; a > 138; a -= 138) s(32754);
			a > 2 && (s(a > 10 ? a - 11 << 5 | 28690 : a - 3 << 5 | 12305), a = 0);
		} else if (a > 3) {
			for (s(i), --a; a > 6; a -= 6) s(8304);
			a > 2 && (s(a - 3 << 5 | 8208), a = 0);
		}
		for (; a--;) s(i);
		a = 1, i = e[c];
	}
	return {
		c: n.subarray(0, r),
		n: t
	};
}, P = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, ee = function(e, t, n) {
	var r = n.length, i = T(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, F = function(e, t, n, r, i, a, s, d, f, p, m) {
	k(t, m++, n), ++i[256];
	for (var h = j(i, 15), g = h.t, _ = h.l, v = j(a, 15), y = v.t, T = v.l, E = N(g), D = E.c, O = E.n, M = N(y), F = M.c, te = M.n, I = new o(19), L = 0; L < D.length; ++L) ++I[D[L] & 31];
	for (var L = 0; L < F.length; ++L) ++I[F[L] & 31];
	for (var R = j(I, 7), z = R.t, B = R.l, V = 19; V > 4 && !z[u[V - 1]]; --V);
	var H = p + 5 << 3, U = P(i, x) + P(a, S) + s, W = P(i, g) + P(a, y) + s + 14 + 3 * V + P(I, z) + 2 * I[16] + 3 * I[17] + 7 * I[18];
	if (f >= 0 && H <= U && H <= W) return ee(t, m, e.subarray(f, f + p));
	var G, K, q, J;
	if (k(t, m, 1 + (W < U)), m += 2, W < U) {
		G = b(g, _, 0), K = g, q = b(y, T, 0), J = y;
		var ne = b(z, B, 0);
		k(t, m, O - 257), k(t, m + 5, te - 1), k(t, m + 10, V - 4), m += 14;
		for (var L = 0; L < V; ++L) k(t, m + 3 * L, z[u[L]]);
		m += 3 * V;
		for (var re = [D, F], Y = 0; Y < 2; ++Y) for (var X = re[Y], L = 0; L < X.length; ++L) {
			var Z = X[L] & 31;
			k(t, m, ne[Z]), m += z[Z], Z > 15 && (k(t, m, X[L] >> 5 & 127), m += X[L] >> 12);
		}
	} else G = C, K = x, q = w, J = S;
	for (var L = 0; L < d; ++L) {
		var Q = r[L];
		if (Q > 255) {
			var Z = Q >> 18 & 31;
			A(t, m, G[Z + 257]), m += K[Z + 257], Z > 7 && (k(t, m, Q >> 23 & 31), m += c[Z]);
			var $ = Q & 31;
			A(t, m, q[$]), m += J[$], $ > 3 && (A(t, m, Q >> 5 & 8191), m += l[$]);
		} else A(t, m, G[Q]), m += K[Q];
	}
	return A(t, m, G[256]), m + K[256];
}, te = /*#__PURE__*/ new s([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), I = /*#__PURE__*/ new a(0), L = function(e, t, n, r, i, u) {
	var d = u.z || e.length, f = new a(r + d + 5 * (1 + Math.ceil(d / 7e3)) + i), p = f.subarray(r, f.length - i), h = u.l, _ = (u.r || 0) & 7;
	if (t) {
		_ && (p[0] = u.r >> 3);
		for (var v = te[t - 1], y = v >> 13, b = v & 8191, x = (1 << n) - 1, S = u.p || new o(32768), C = u.h || new o(x + 1), w = Math.ceil(n / 3), D = 2 * w, O = function(t) {
			return (e[t] ^ e[t + 1] << w ^ e[t + 2] << D) & x;
		}, k = new s(25e3), A = new o(288), j = new o(32), M = 0, N = 0, P = u.i || 0, I = 0, L = u.w || 0, R = 0; P + 2 < d; ++P) {
			var z = O(P), B = P & 32767, V = C[z];
			if (S[B] = V, C[z] = B, L <= P) {
				var H = d - P;
				if ((M > 7e3 || I > 24576) && (H > 423 || !h)) {
					_ = F(e, p, 0, k, A, j, N, I, R, P - R, _), I = M = N = 0, R = P;
					for (var U = 0; U < 286; ++U) A[U] = 0;
					for (var U = 0; U < 30; ++U) j[U] = 0;
				}
				var W = 2, G = 0, K = b, q = B - V & 32767;
				if (H > 2 && z == O(P - q)) for (var J = Math.min(y, H) - 1, ne = Math.min(32767, P), re = Math.min(258, H); q <= ne && --K && B != V;) {
					if (e[P + W] == e[P + W - q]) {
						for (var Y = 0; Y < re && e[P + Y] == e[P + Y - q]; ++Y);
						if (Y > W) {
							if (W = Y, G = q, Y > J) break;
							for (var X = Math.min(q, Y - 2), Z = 0, U = 0; U < X; ++U) {
								var Q = P - q + U & 32767, $ = Q - S[Q] & 32767;
								$ > Z && (Z = $, V = Q);
							}
						}
					}
					B = V, V = S[B], q += B - V & 32767;
				}
				if (G) {
					k[I++] = 268435456 | m[W] << 18 | g[G];
					var ie = m[W] & 31, ae = g[G] & 31;
					N += c[ie] + l[ae], ++A[257 + ie], ++j[ae], L = P + W, ++M;
				} else k[I++] = e[P], ++A[e[P]];
			}
		}
		for (P = Math.max(P, L); P < d; ++P) k[I++] = e[P], ++A[e[P]];
		_ = F(e, p, h, k, A, j, N, I, R, P - R, _), h || (u.r = _ & 7 | p[_ / 8 | 0] << 3, _ -= 7, u.h = C, u.p = S, u.i = P, u.w = L);
	} else {
		for (var P = u.w || 0; P < d + h; P += 65535) {
			var oe = P + 65535;
			oe >= d && (p[_ / 8 | 0] = h, oe = d), _ = ee(p, _ + 1, e.subarray(P, oe));
		}
		u.i = d;
	}
	return E(f, 0, r + T(_) + i);
}, R = /*#__PURE__*/ (function() {
	for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
		for (var n = t, r = 9; --r;) n = (n & 1 && -306674912) ^ n >>> 1;
		e[t] = n;
	}
	return e;
})(), z = function() {
	var e = -1;
	return {
		p: function(t) {
			for (var n = e, r = 0; r < t.length; ++r) n = R[n & 255 ^ t[r]] ^ n >>> 8;
			e = n;
		},
		d: function() {
			return ~e;
		}
	};
}, B = function(e, t, n, r, i) {
	if (!i && (i = { l: 1 }, t.dictionary)) {
		var o = t.dictionary.subarray(-32768), s = new a(o.length + e.length);
		s.set(o), s.set(e, o.length), e = s, i.w = o.length;
	}
	return L(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, i);
}, V = function(e, t) {
	var n = {};
	for (var r in e) n[r] = e[r];
	for (var r in t) n[r] = t[r];
	return n;
}, H = function(e, t, n) {
	for (; n; ++t) e[t] = n, n >>>= 8;
}, U = /* @__PURE__ */ function() {
	function e(e, t) {
		if (typeof e == "function" && (t = e, e = {}), this.ondata = t, this.o = e || {}, this.s = {
			l: 0,
			i: 32768,
			w: 32768,
			z: 32768
		}, this.b = new a(98304), this.o.dictionary) {
			var n = this.o.dictionary.subarray(-32768);
			this.b.set(n, 32768 - n.length), this.s.i = 32768 - n.length;
		}
	}
	return e.prototype.p = function(e, t) {
		this.ondata(B(e, this.o, 0, 0, this.s), t);
	}, e.prototype.push = function(e, t) {
		this.ondata || O(5), this.s.l && O(4);
		var n = e.length + this.s.z;
		if (n > this.b.length) {
			if (n > 2 * this.b.length - 32768) {
				var r = new a(n & -32768);
				r.set(this.b.subarray(0, this.s.z)), this.b = r;
			}
			var i = this.b.length - this.s.z;
			this.b.set(e.subarray(0, i), this.s.z), this.s.z = this.b.length, this.p(this.b, !1), this.b.set(this.b.subarray(-32768)), this.b.set(e.subarray(i), 32768), this.s.z = e.length - i + 32768, this.s.i = 32766, this.s.w = 32768;
		} else this.b.set(e, this.s.z), this.s.z += e.length;
		this.s.l = t & 1, (this.s.z > this.s.w + 8191 || t) && (this.p(this.b, t || !1), this.s.w = this.s.i, this.s.i -= 2), t && (this.s = this.o = {}, this.b = I);
	}, e.prototype.flush = function(e) {
		if (this.ondata || O(5), this.s.l && O(4), this.p(this.b, !1), this.s.w = this.s.i, this.s.i -= 2, e) {
			var t = new a(6);
			t[0] = this.s.r >> 3;
			var n = ee(t, this.s.r, I);
			this.s.r = 0, this.ondata(t.subarray(0, n >> 3), !1);
		}
	}, e;
}(), W = typeof TextEncoder < "u" && /*#__PURE__*/ new TextEncoder(), G = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	G.decode(I, { stream: !0 });
} catch {}
function K(e, t) {
	if (t) {
		for (var n = new a(e.length), r = 0; r < e.length; ++r) n[r] = e.charCodeAt(r);
		return n;
	}
	if (W) return W.encode(e);
	for (var i = e.length, o = new a(e.length + (e.length >> 1)), s = 0, c = function(e) {
		o[s++] = e;
	}, r = 0; r < i; ++r) {
		if (s + 5 > o.length) {
			var l = new a(s + 8 + (i - r << 1));
			l.set(o), o = l;
		}
		var u = e.charCodeAt(r);
		u < 128 || t ? c(u) : u < 2048 ? (c(192 | u >> 6), c(128 | u & 63)) : u > 55295 && u < 57344 ? (u = 65536 + (u & 1047552) | e.charCodeAt(++r) & 1023, c(240 | u >> 18), c(128 | u >> 12 & 63), c(128 | u >> 6 & 63), c(128 | u & 63)) : (c(224 | u >> 12), c(128 | u >> 6 & 63), c(128 | u & 63));
	}
	return E(o, 0, s);
}
var q = function(e) {
	return e == 1 ? 3 : e < 6 ? 2 : +(e == 9);
}, J = function(e) {
	var t = 0;
	if (e) for (var n in e) {
		var r = e[n].length;
		r > 65535 && O(9), t += r + 4;
	}
	return t;
}, ne = function(e, t, n, r, i, a, o, s) {
	var c = r.length, l = n.extra, u = s && s.length, d = J(l);
	H(e, t, o == null ? 67324752 : 33639248), t += 4, o != null && (e[t++] = 20, e[t++] = n.os), e[t] = 20, t += 2, e[t++] = n.flag << 1 | (a < 0 && 8), e[t++] = i && 8, e[t++] = n.compression & 255, e[t++] = n.compression >> 8;
	var f = new Date(n.mtime == null ? Date.now() : n.mtime), p = f.getFullYear() - 1980;
	if ((p < 0 || p > 119) && O(10), H(e, t, p << 25 | f.getMonth() + 1 << 21 | f.getDate() << 16 | f.getHours() << 11 | f.getMinutes() << 5 | f.getSeconds() >> 1), t += 4, a != -1 && (H(e, t, n.crc), H(e, t + 4, a < 0 ? -a - 2 : a), H(e, t + 8, n.size)), H(e, t + 12, c), H(e, t + 14, d), t += 16, o != null && (H(e, t, u), H(e, t + 6, n.attrs), H(e, t + 10, o), t += 14), e.set(r, t), t += c, d) for (var m in l) {
		var h = l[m], g = h.length;
		H(e, t, +m), H(e, t + 2, g), e.set(h, t + 4), t += 4 + g;
	}
	return u && (e.set(s, t), t += u), t;
}, re = function(e, t, n, r, i) {
	H(e, t, 101010256), H(e, t + 8, n), H(e, t + 10, n), H(e, t + 12, r), H(e, t + 16, i);
}, Y = /* @__PURE__ */ function() {
	function e(e) {
		this.filename = e, this.c = z(), this.size = 0, this.compression = 0;
	}
	return e.prototype.process = function(e, t) {
		this.ondata(null, e, t);
	}, e.prototype.push = function(e, t) {
		this.ondata || O(5), this.c.p(e), this.size += e.length, t && (this.crc = this.c.d()), this.process(e, t || !1);
	}, e;
}(), X = /* @__PURE__ */ function() {
	function e(e, t) {
		var n = this;
		t ||= {}, Y.call(this, e), this.d = new U(t, function(e, t) {
			n.ondata(null, e, t);
		}), this.compression = 8, this.flag = q(t.level);
	}
	return e.prototype.process = function(e, t) {
		try {
			this.d.push(e, t);
		} catch (e) {
			this.ondata(e, null, t);
		}
	}, e.prototype.push = function(e, t) {
		Y.prototype.push.call(this, e, t);
	}, e;
}(), Z = /* @__PURE__ */ function() {
	function e(e) {
		this.ondata = e, this.u = [], this.d = 1;
	}
	return e.prototype.add = function(e) {
		var t = this;
		if (this.ondata || O(5), this.d & 2) this.ondata(O(4 + (this.d & 1) * 8, 0, 1), null, !1);
		else {
			var n = K(e.filename), r = n.length, i = e.comment, o = i && K(i), s = r != e.filename.length || o && i.length != o.length, c = r + J(e.extra) + 30;
			r > 65535 && this.ondata(O(11, 0, 1), null, !1);
			var l = new a(c);
			ne(l, 0, e, n, s, -1);
			var u = [l], d = function() {
				for (var e = 0, n = u; e < n.length; e++) {
					var r = n[e];
					t.ondata(null, r, !1);
				}
				u = [];
			}, f = this.d;
			this.d = 0;
			var p = this.u.length, m = V(e, {
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
			e.ondata = function(n, r, i) {
				if (n) t.ondata(n, r, i), t.terminate();
				else if (h += r.length, u.push(r), i) {
					var o = new a(16);
					H(o, 0, 134695760), H(o, 4, e.crc), H(o, 8, h), H(o, 12, e.size), u.push(o), m.c = h, m.b = c + h + 16, m.crc = e.crc, m.size = e.size, f && m.r(), f = 1;
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
			var o = i[r];
			n += 46 + o.f.length + J(o.extra) + (o.o ? o.o.length : 0);
		}
		for (var s = new a(n + 22), c = 0, l = this.u; c < l.length; c++) {
			var o = l[c];
			ne(s, e, o, o.f, o.u, -o.c - 2, t, o.o), e += 46 + o.f.length + J(o.extra) + (o.o ? o.o.length : 0), t += o.b;
		}
		re(s, e, this.u.length, n, t), this.ondata(null, s, !0), this.d = 2;
	}, e.prototype.terminate = function() {
		for (var e = 0, t = this.u; e < t.length; e++) t[e].t();
		this.d = 2;
	}, e;
}();
//#endregion
//#region replace/base.ts
async function Q(e = []) {
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
var $ = class {
	#e = [];
	constructor(e) {
		this.core = e;
	}
	addTempFile(e) {
		this.#e.push(e);
	}
	clear() {
		this.#e.length = 0;
	}
	async extractOneFileVariables(e, t) {
		let n = await t.getBuffer();
		if (n) {
			if (await t.type() === i.unknown && !t.isDecode) {
				console.warn("file type is unknown and not decode", t);
				return;
			}
			e[t.name] = this.core.extract_one_file_variable_names(n, t.isDecode);
		}
	}
	async extractVariables(e) {
		e ||= this.#e;
		let t = {}, n = [];
		for (let r of e) n.push(this.extractOneFileVariables(t, r));
		return await Promise.allSettled(n), t;
	}
	async extractOneFileMedias(e, t) {
		let n = await t.getBuffer();
		if (!n || await t.type() === i.unknown && !t.isDecode) return;
		let r = this.core.extract_one_file_medias(n, t.isDecode);
		if (e[t.name] = [], Array.isArray(r)) for (let { id: n, data: i } of r) n && i && e[t.name].push({
			id: n,
			data: new Uint8Array(i)
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
		let { noDecode: n, decode: r } = await Q(t ?? this.#e), i = await this.handle(e, n.uint8Arrays, r.uint8Arrays), a = {}, o = 0;
		for (let e of n.names) a[e] = i[o++] ?? new Uint8Array();
		for (let e of r.names) a[e] = i[o++] ?? new Uint8Array();
		return a;
	}
	async executeToZip(e, t) {
		let { noDecode: n, decode: r } = await Q(t ?? this.#e), i = await this.handle(e, n.uint8Arrays, r.uint8Arrays);
		return new Promise((e, t) => {
			let a = [], o = new Z((t, n, r) => {
				n.length && a.push(n), r && new Blob(a).arrayBuffer().then((t) => {
					e(new Uint8Array(t));
				});
			}), s = 0;
			for (let e of n.names) {
				let t = new X(e, { level: 9 });
				o.add(t), t.push(i[s++] ?? new Uint8Array(), !0);
			}
			for (let e of r.names) {
				let t = new X(e, { level: 9 });
				o.add(t), t.push(i[s++] ?? new Uint8Array(), !0);
			}
			o.end();
		});
	}
	async executeMultipleParams(e, t) {
		let { noDecode: n, decode: r } = await Q(t ?? this.#e), i = await this.handleMultipleParams(e, n.uint8Arrays, r.uint8Arrays), a = Array(e.length), o = 0;
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
		let { noDecode: n, decode: r } = await Q(t ?? this.#e), i = await this.handleMultipleParams(e, n.uint8Arrays, r.uint8Arrays);
		return new Promise((t, a) => {
			let o = [], s = new Z((e, n, r) => {
				n.length && o.push(n), r && new Blob(o).arrayBuffer().then((e) => {
					t(new Uint8Array(e));
				});
			}), c = 0;
			for (let t = 0; t < e.length; t++) {
				for (let e of n.names) {
					let n = i[c++];
					if (n.length) {
						let r = new X(t + "/" + e, { level: 9 });
						s.add(r), r.push(n, !0);
					}
				}
				for (let e of r.names) {
					let n = i[c++];
					if (n.length) {
						let r = new X(t + "/" + e, { level: 9 });
						s.add(r), r.push(n, !0);
					}
				}
			}
			s.end();
		});
	}
	async fileEncrypt(e) {
		return this.core.file_encrypt(e);
	}
	async filesEncrypt(e) {
		return this.core.files_encrypt(e);
	}
};
//#endregion
export { n, $ as t };

//# sourceMappingURL=base-DxU2J59A.js.map