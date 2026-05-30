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
}({});
//#endregion
//#region node_modules/.pnpm/web-streams-polyfill@4.3.0/node_modules/web-streams-polyfill/dist/polyfill.js
(function() {
	function e() {}
	function t(e) {
		return typeof e == "object" && !!e || typeof e == "function";
	}
	let n = e;
	function r(e, t) {
		try {
			Object.defineProperty(e, "name", {
				value: t,
				configurable: !0
			});
		} catch {}
	}
	let i = Promise, a = Promise.resolve.bind(i), o = Promise.prototype.then, s = Promise.reject.bind(i), c = a;
	function l(e) {
		return new i(e);
	}
	function u(e) {
		return l((t) => t(e));
	}
	function d(e) {
		return s(e);
	}
	function f(e, t, n) {
		return o.call(e, t, n);
	}
	function p(e, t, r) {
		f(f(e, t, r), void 0, n);
	}
	function m(e, t) {
		p(e, t);
	}
	function h(e, t) {
		p(e, void 0, t);
	}
	function g(e, t, n) {
		return f(e, t, n);
	}
	function _(e) {
		f(e, void 0, n);
	}
	let v = (e) => {
		if (typeof queueMicrotask == "function") v = queueMicrotask;
		else {
			let e = u(void 0);
			v = (t) => f(e, t);
		}
		return v(e);
	};
	function y(e, t, n) {
		if (typeof e != "function") throw TypeError("Argument is not a function");
		return Function.prototype.apply.call(e, t, n);
	}
	function b(e, t, n) {
		try {
			return u(y(e, t, n));
		} catch (e) {
			return d(e);
		}
	}
	class x {
		constructor() {
			this._cursor = 0, this._size = 0, this._front = {
				_elements: [],
				_next: void 0
			}, this._back = this._front, this._cursor = 0, this._size = 0;
		}
		get length() {
			return this._size;
		}
		push(e) {
			let t = this._back, n = t;
			t._elements.length === 16383 && (n = {
				_elements: [],
				_next: void 0
			}), t._elements.push(e), n !== t && (this._back = n, t._next = n), ++this._size;
		}
		shift() {
			let e = this._front, t = e, n = this._cursor, r = n + 1, i = e._elements, a = i[n];
			return r === 16384 && (t = e._next, r = 0), --this._size, this._cursor = r, e !== t && (this._front = t), i[n] = void 0, a;
		}
		forEach(e) {
			let t = this._cursor, n = this._front, r = n._elements;
			for (; !(t === r.length && n._next === void 0 || t === r.length && (n = n._next, r = n._elements, t = 0, r.length === 0));) e(r[t]), ++t;
		}
		peek() {
			let e = this._front, t = this._cursor;
			return e._elements[t];
		}
	}
	let S = Symbol("[[AbortSteps]]"), C = Symbol("[[ErrorSteps]]"), w = Symbol("[[CancelSteps]]"), T = Symbol("[[PullSteps]]"), E = Symbol("[[CanPullSyncSteps]]"), D = Symbol("[[ReleaseSteps]]");
	function ee(e, t) {
		e._ownerReadableStream = t, t._reader = e, t._state === "readable" ? j(e) : t._state === "closed" ? function(e) {
			j(e), re(e);
		}(e) : te(e, t._storedError);
	}
	function O(e, t) {
		return $(e._ownerReadableStream, t);
	}
	function k(e) {
		let t = e._ownerReadableStream;
		t._state === "readable" ? ne(e, /* @__PURE__ */ TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : function(e, t) {
			te(e, t);
		}(e, /* @__PURE__ */ TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), t._readableStreamController[D](), t._reader = void 0, e._ownerReadableStream = void 0;
	}
	function A(e) {
		return /* @__PURE__ */ TypeError("Cannot " + e + " a stream using a released reader");
	}
	function j(e) {
		e._closedPromise = l((t, n) => {
			e._closedPromise_resolve = t, e._closedPromise_reject = n;
		});
	}
	function te(e, t) {
		j(e), ne(e, t);
	}
	function ne(e, t) {
		e._closedPromise_reject !== void 0 && (_(e._closedPromise), e._closedPromise_reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
	}
	function re(e) {
		e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
	}
	let M = Number.isFinite || function(e) {
		return typeof e == "number" && isFinite(e);
	}, N = Math.trunc || function(e) {
		return e < 0 ? Math.ceil(e) : Math.floor(e);
	};
	function P(e, t) {
		if (e !== void 0 && typeof (n = e) != "object" && typeof n != "function") throw TypeError(`${t} is not an object.`);
		var n;
	}
	function F(e, t) {
		if (typeof e != "function") throw TypeError(`${t} is not a function.`);
	}
	function I(e, t) {
		if (!function(e) {
			return typeof e == "object" && !!e || typeof e == "function";
		}(e)) throw TypeError(`${t} is not an object.`);
	}
	function L(e, t, n) {
		if (e === void 0) throw TypeError(`Parameter ${t} is required in '${n}'.`);
	}
	function R(e, t, n) {
		if (e === void 0) throw TypeError(`${t} is required in '${n}'.`);
	}
	function z(e) {
		return Number(e);
	}
	function ie(e) {
		return e === 0 ? 0 : e;
	}
	function B(e, t) {
		let n = 2 ** 53 - 1, r = Number(e);
		if (r = ie(r), !M(r)) throw TypeError(`${t} is not a finite number`);
		if (r = function(e) {
			return ie(N(e));
		}(r), r < 0 || r > n) throw TypeError(`${t} is outside the accepted range of 0 to ${n}, inclusive`);
		return M(r) && r !== 0 ? r : 0;
	}
	function V(e, t) {
		if (!qn(e)) throw TypeError(`${t} is not a ReadableStream.`);
	}
	function H(e) {
		return new G(e);
	}
	function U(e, t) {
		e._reader._readRequests.push(t);
	}
	function W(e, t, n) {
		let r = e._reader._readRequests.shift();
		n ? r._closeSteps() : r._chunkSteps(t);
	}
	function ae(e) {
		return e._reader._readRequests.length;
	}
	function oe(e) {
		let t = e._reader;
		return t !== void 0 && !!q(t);
	}
	class G {
		constructor(e) {
			if (L(e, 1, "ReadableStreamDefaultReader"), V(e, "First parameter"), Jn(e)) throw TypeError("This stream has already been locked for exclusive reading by another reader");
			ee(this, e), this._readRequests = new x();
		}
		get closed() {
			return q(this) ? this._closedPromise : d(ue("closed"));
		}
		cancel(e = void 0) {
			return q(this) ? this._ownerReadableStream === void 0 ? d(A("cancel")) : O(this, e) : d(ue("cancel"));
		}
		read() {
			if (!q(this)) return d(ue("read"));
			if (this._ownerReadableStream === void 0) return d(A("read from"));
			let e = ce(this) ? new se() : new K();
			return J(this, e), e._promise;
		}
		releaseLock() {
			if (!q(this)) throw ue("releaseLock");
			this._ownerReadableStream !== void 0 && function(e) {
				k(e), le(e, /* @__PURE__ */ TypeError("Reader was released"));
			}(this);
		}
	}
	Object.defineProperties(G.prototype, {
		cancel: { enumerable: !0 },
		read: { enumerable: !0 },
		releaseLock: { enumerable: !0 },
		closed: { enumerable: !0 }
	}), r(G.prototype.cancel, "cancel"), r(G.prototype.read, "read"), r(G.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(G.prototype, Symbol.toStringTag, {
		value: "ReadableStreamDefaultReader",
		configurable: !0
	});
	class K {
		constructor() {
			this._promise = l((e, t) => {
				this._resolvePromise = e, this._rejectPromise = t;
			});
		}
		_chunkSteps(e) {
			this._resolvePromise({
				value: e,
				done: !1
			});
		}
		_closeSteps() {
			this._resolvePromise({
				value: void 0,
				done: !0
			});
		}
		_errorSteps(e) {
			this._rejectPromise(e);
		}
	}
	class se {
		constructor() {
			this._promise = void 0;
		}
		_chunkSteps(e) {
			this._promise = c({
				value: e,
				done: !1
			});
		}
		_closeSteps() {
			this._promise = c({
				value: void 0,
				done: !0
			});
		}
		_errorSteps(e) {
			this._promise = d(e);
		}
	}
	function q(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_readRequests") && e instanceof G;
	}
	function J(e, t) {
		let n = e._ownerReadableStream;
		n._disturbed = !0, n._state === "closed" ? t._closeSteps() : n._state === "errored" ? t._errorSteps(n._storedError) : n._readableStreamController[T](t);
	}
	function ce(e) {
		let t = e._ownerReadableStream;
		return t._state === "closed" || t._state === "errored" || t._readableStreamController[E]();
	}
	function le(e, t) {
		let n = e._readRequests;
		e._readRequests = new x(), n.forEach((e) => {
			e._errorSteps(t);
		});
	}
	function ue(e) {
		return /* @__PURE__ */ TypeError(`ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`);
	}
	function de(e) {
		return e.slice();
	}
	function fe(e, t, n, r, i) {
		new Uint8Array(e).set(new Uint8Array(n, r, i), t);
	}
	let pe = (e) => (pe = typeof e.transfer == "function" ? (e) => e.transfer() : typeof structuredClone == "function" ? (e) => structuredClone(e, { transfer: [e] }) : (e) => e, pe(e)), me = (e) => (me = typeof e.detached == "boolean" ? (e) => e.detached : (e) => e.byteLength === 0, me(e));
	function he(e, t, n) {
		if (e.slice) return e.slice(t, n);
		let r = n - t, i = new ArrayBuffer(r);
		return fe(i, 0, e, t, r), i;
	}
	function ge(e, t) {
		let n = e[t];
		if (n != null) {
			if (typeof n != "function") throw TypeError(`${String(t)} is not a function`);
			return n;
		}
	}
	function _e(e) {
		try {
			let t = e.done, n = e.value;
			return f(c(n), (e) => ({
				done: t,
				value: e
			}));
		} catch (e) {
			return d(e);
		}
	}
	let ve = Symbol.asyncIterator ?? Symbol.for?.call(Symbol, "Symbol.asyncIterator") ?? "@@asyncIterator";
	function ye(e, n = "sync", r) {
		if (r === void 0) if (n === "async") {
			if ((r = ge(e, ve)) === void 0) return function(e) {
				let n = {
					next() {
						let t;
						try {
							t = be(e);
						} catch (e) {
							return d(e);
						}
						return _e(t);
					},
					return(n) {
						let r;
						try {
							let t = ge(e.iterator, "return");
							if (t === void 0) return u({
								done: !0,
								value: n
							});
							r = y(t, e.iterator, [n]);
						} catch (e) {
							return d(e);
						}
						return t(r) ? _e(r) : d(/* @__PURE__ */ TypeError("The iterator.return() method must return an object"));
					}
				};
				return {
					iterator: n,
					nextMethod: n.next,
					done: !1
				};
			}(ye(e, "sync", ge(e, Symbol.iterator)));
		} else r = ge(e, Symbol.iterator);
		if (r === void 0) throw TypeError("The object is not iterable");
		let i = y(r, e, []);
		if (!t(i)) throw TypeError("The iterator method must return an object");
		return {
			iterator: i,
			nextMethod: i.next,
			done: !1
		};
	}
	function be(e) {
		let n = y(e.nextMethod, e.iterator, []);
		if (!t(n)) throw TypeError("The iterator.next() method must return an object");
		return n;
	}
	class xe {
		constructor(e, t) {
			this._ongoingPromise = void 0, this._isFinished = !1, this._reader = e, this._preventCancel = t;
		}
		next() {
			let e = () => this._nextSteps();
			return this._ongoingPromise = this._ongoingPromise ? g(this._ongoingPromise, e, e) : e(), this._ongoingPromise;
		}
		return(e) {
			let t = () => this._returnSteps(e);
			return this._ongoingPromise = this._ongoingPromise ? g(this._ongoingPromise, t, t) : t(), this._ongoingPromise;
		}
		_nextSteps() {
			if (this._isFinished) return Promise.resolve({
				value: void 0,
				done: !0
			});
			let e = this._reader, t = new Se(this);
			return J(e, t), t._promise;
		}
		_returnSteps(e) {
			if (this._isFinished) return Promise.resolve({
				value: e,
				done: !0
			});
			this._isFinished = !0;
			let t = this._reader;
			if (!this._preventCancel) {
				let n = O(t, e);
				return k(t), g(n, () => ({
					value: e,
					done: !0
				}));
			}
			return k(t), u({
				value: e,
				done: !0
			});
		}
	}
	class Se {
		constructor(e) {
			this._iterator = e, this._promise = l((e, t) => {
				this._resolvePromise = e, this._rejectPromise = t;
			});
		}
		_chunkSteps(e) {
			this._iterator._ongoingPromise = void 0, v(() => this._resolvePromise({
				value: e,
				done: !1
			}));
		}
		_closeSteps() {
			let e = this._iterator;
			e._ongoingPromise = void 0, e._isFinished = !0, k(e._reader), this._resolvePromise({
				value: void 0,
				done: !0
			});
		}
		_errorSteps(e) {
			let t = this._iterator;
			t._ongoingPromise = void 0, t._isFinished = !0, k(t._reader), this._rejectPromise(e);
		}
	}
	let Ce = {
		next() {
			return we(this) ? this._asyncIteratorImpl.next() : d(Te("next"));
		},
		return(e) {
			return we(this) ? this._asyncIteratorImpl.return(e) : d(Te("return"));
		},
		[ve]() {
			return this;
		}
	};
	function we(e) {
		if (!t(e) || !Object.prototype.hasOwnProperty.call(e, "_asyncIteratorImpl")) return !1;
		try {
			return e._asyncIteratorImpl instanceof xe;
		} catch {
			return !1;
		}
	}
	function Te(e) {
		return /* @__PURE__ */ TypeError(`ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`);
	}
	Object.defineProperty(Ce, ve, { enumerable: !1 });
	let Ee = Number.isNaN || function(e) {
		return e != e;
	};
	function De(e) {
		let t = he(e.buffer, e.byteOffset, e.byteOffset + e.byteLength);
		return new Uint8Array(t);
	}
	function Oe(e) {
		let t = e._queue.shift();
		return e._queueTotalSize -= t.size, e._queueTotalSize < 0 && (e._queueTotalSize = 0), t.value;
	}
	function ke(e, t, n) {
		if (typeof (r = n) != "number" || Ee(r) || r < 0 || n === Infinity) throw RangeError("Size must be a finite, non-NaN, non-negative number.");
		var r;
		e._queue.push({
			value: t,
			size: n
		}), e._queueTotalSize += n;
	}
	function Ae(e) {
		e._queue = new x(), e._queueTotalSize = 0;
	}
	function je(e) {
		return e === DataView;
	}
	function Me(e) {
		return je(e) ? 1 : e.BYTES_PER_ELEMENT;
	}
	class Ne {
		constructor() {
			throw TypeError("Illegal constructor");
		}
		get view() {
			if (!Ie(this)) throw st("view");
			return this._view;
		}
		respond(e) {
			if (!Ie(this)) throw st("respond");
			if (L(e, 1, "respond"), e = B(e, "First parameter"), this._associatedReadableByteStreamController === void 0) throw TypeError("This BYOB request has been invalidated");
			if (me(this._view.buffer)) throw TypeError("The BYOB request's buffer has been detached and so cannot be used as a response");
			it(this._associatedReadableByteStreamController, e);
		}
		respondWithNewView(e) {
			if (!Ie(this)) throw st("respondWithNewView");
			if (L(e, 1, "respondWithNewView"), !ArrayBuffer.isView(e)) throw TypeError("You can only respond with array buffer views");
			if (this._associatedReadableByteStreamController === void 0) throw TypeError("This BYOB request has been invalidated");
			if (me(e.buffer)) throw TypeError("The given view's buffer has been detached and so cannot be used as a response");
			at(this._associatedReadableByteStreamController, e);
		}
	}
	Object.defineProperties(Ne.prototype, {
		respond: { enumerable: !0 },
		respondWithNewView: { enumerable: !0 },
		view: { enumerable: !0 }
	}), r(Ne.prototype.respond, "respond"), r(Ne.prototype.respondWithNewView, "respondWithNewView"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Ne.prototype, Symbol.toStringTag, {
		value: "ReadableStreamBYOBRequest",
		configurable: !0
	});
	class Pe {
		constructor() {
			throw TypeError("Illegal constructor");
		}
		get byobRequest() {
			if (!Fe(this)) throw ct("byobRequest");
			return nt(this);
		}
		get desiredSize() {
			if (!Fe(this)) throw ct("desiredSize");
			return rt(this);
		}
		close() {
			if (!Fe(this)) throw ct("close");
			if (this._closeRequested) throw TypeError("The stream has already been closed; do not close it again!");
			let e = this._controlledReadableByteStream._state;
			if (e !== "readable") throw TypeError(`The stream (in ${e} state) is not in the readable state and cannot be closed`);
			$e(this);
		}
		enqueue(e) {
			if (!Fe(this)) throw ct("enqueue");
			if (L(e, 1, "enqueue"), !ArrayBuffer.isView(e)) throw TypeError("chunk must be an array buffer view");
			if (e.byteLength === 0) throw TypeError("chunk must have non-zero byteLength");
			if (e.buffer.byteLength === 0) throw TypeError("chunk's buffer must have non-zero byteLength");
			if (this._closeRequested) throw TypeError("stream is closed or draining");
			let t = this._controlledReadableByteStream._state;
			if (t !== "readable") throw TypeError(`The stream (in ${t} state) is not in the readable state and cannot be enqueued to`);
			et(this, e);
		}
		error(e = void 0) {
			if (!Fe(this)) throw ct("error");
			Y(this, e);
		}
		[w](e) {
			Re(this), Ae(this);
			let t = this._cancelAlgorithm(e);
			return Qe(this), t;
		}
		[T](e) {
			let t = this._controlledReadableByteStream;
			if (this._queueTotalSize > 0) return void tt(this, e);
			let n = this._autoAllocateChunkSize;
			if (n !== void 0) {
				let t;
				try {
					t = new ArrayBuffer(n);
				} catch (t) {
					e._errorSteps(t);
					return;
				}
				let r = {
					buffer: t,
					bufferByteLength: n,
					byteOffset: 0,
					byteLength: n,
					bytesFilled: 0,
					minimumFill: 1,
					elementSize: 1,
					viewConstructor: Uint8Array,
					readerType: "default"
				};
				this._pendingPullIntos.push(r);
			}
			U(t, e), Le(this);
		}
		[E]() {
			return this._queueTotalSize > 0;
		}
		[D]() {
			if (this._pendingPullIntos.length > 0) {
				let e = this._pendingPullIntos.peek();
				e.readerType = "none", this._pendingPullIntos = new x(), this._pendingPullIntos.push(e);
			}
		}
	}
	function Fe(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_controlledReadableByteStream") && e instanceof Pe;
	}
	function Ie(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_associatedReadableByteStreamController") && e instanceof Ne;
	}
	function Le(e) {
		if (function(e) {
			let t = e._controlledReadableByteStream;
			return t._state !== "readable" || e._closeRequested || !e._started ? !1 : !!(oe(t) && ae(t) > 0 || pt(t) && ft(t) > 0 || rt(e) > 0);
		}(e)) {
			if (e._pulling) return void (e._pullAgain = !0);
			e._pulling = !0, p(e._pullAlgorithm(), () => (e._pulling = !1, e._pullAgain && (e._pullAgain = !1, Le(e)), null), (t) => (Y(e, t), null));
		}
	}
	function Re(e) {
		Je(e), e._pendingPullIntos = new x();
	}
	function ze(e, t) {
		let n = !1;
		e._state === "closed" && (n = !0);
		let r = Ve(t);
		t.readerType === "default" ? W(e, r, n) : function(e, t, n) {
			let r = e._reader._readIntoRequests.shift();
			n ? r._closeSteps(t) : r._chunkSteps(t);
		}(e, r, n);
	}
	function Be(e, t) {
		for (let n = 0; n < t.length; ++n) ze(e, t[n]);
	}
	function Ve(e) {
		let t = e.bytesFilled, n = e.elementSize;
		return new e.viewConstructor(e.buffer, e.byteOffset, t / n);
	}
	function He(e, t, n, r) {
		e._queue.push({
			buffer: t,
			byteOffset: n,
			byteLength: r
		}), e._queueTotalSize += r;
	}
	function Ue(e, t, n, r) {
		let i;
		try {
			i = he(t, n, n + r);
		} catch (t) {
			throw Y(e, t), t;
		}
		He(e, i, 0, r);
	}
	function We(e, t) {
		t.bytesFilled > 0 && Ue(e, t.buffer, t.byteOffset, t.bytesFilled), Ze(e);
	}
	function Ge(e, t) {
		let n = Math.min(e._queueTotalSize, t.byteLength - t.bytesFilled), r = t.bytesFilled + n, i = n, a = !1, o = r - r % t.elementSize;
		o >= t.minimumFill && (i = o - t.bytesFilled, a = !0);
		let s = e._queue;
		for (; i > 0;) {
			let n = s.peek(), r = Math.min(i, n.byteLength), a = t.byteOffset + t.bytesFilled;
			fe(t.buffer, a, n.buffer, n.byteOffset, r), n.byteLength === r ? s.shift() : (n.byteOffset += r, n.byteLength -= r), e._queueTotalSize -= r, Ke(e, r, t), i -= r;
		}
		return a;
	}
	function Ke(e, t, n) {
		n.bytesFilled += t;
	}
	function qe(e) {
		e._queueTotalSize === 0 && e._closeRequested ? (Qe(e), Yn(e._controlledReadableByteStream)) : Le(e);
	}
	function Je(e) {
		e._byobRequest !== null && (e._byobRequest._associatedReadableByteStreamController = void 0, e._byobRequest._view = null, e._byobRequest = null);
	}
	function Ye(e) {
		let t = [];
		for (; e._pendingPullIntos.length > 0 && e._queueTotalSize !== 0;) {
			let n = e._pendingPullIntos.peek();
			Ge(e, n) && (Ze(e), t.push(n));
		}
		return t;
	}
	function Xe(e, t) {
		let n = e._pendingPullIntos.peek();
		Je(e), e._controlledReadableByteStream._state === "closed" ? function(e, t) {
			t.readerType === "none" && Ze(e);
			let n = e._controlledReadableByteStream;
			if (pt(n)) {
				let t = [];
				for (; t.length < ft(n);) t.push(Ze(e));
				Be(n, t);
			}
		}(e, n) : function(e, t, n) {
			if (Ke(0, t, n), n.readerType === "none") {
				We(e, n);
				let t = Ye(e);
				Be(e._controlledReadableByteStream, t);
				return;
			}
			if (n.bytesFilled < n.minimumFill) return;
			Ze(e);
			let r = n.bytesFilled % n.elementSize;
			if (r > 0) {
				let t = n.byteOffset + n.bytesFilled;
				Ue(e, n.buffer, t - r, r);
			}
			n.bytesFilled -= r;
			let i = Ye(e);
			ze(e._controlledReadableByteStream, n), Be(e._controlledReadableByteStream, i);
		}(e, t, n), Le(e);
	}
	function Ze(e) {
		return e._pendingPullIntos.shift();
	}
	function Qe(e) {
		e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0;
	}
	function $e(e) {
		let t = e._controlledReadableByteStream;
		if (!e._closeRequested && t._state === "readable") if (e._queueTotalSize > 0) e._closeRequested = !0;
		else {
			if (e._pendingPullIntos.length > 0) {
				let t = e._pendingPullIntos.peek();
				if (t.bytesFilled % t.elementSize !== 0) {
					let t = /* @__PURE__ */ TypeError("Insufficient bytes to fill elements in the given buffer");
					throw Y(e, t), t;
				}
			}
			Qe(e), Yn(t);
		}
	}
	function et(e, t) {
		let n = e._controlledReadableByteStream;
		if (e._closeRequested || n._state !== "readable") return;
		let { buffer: r, byteOffset: i, byteLength: a } = t;
		if (me(r)) throw TypeError("chunk's buffer is detached and so cannot be enqueued");
		let o = pe(r);
		if (e._pendingPullIntos.length > 0) {
			let t = e._pendingPullIntos.peek();
			if (me(t.buffer)) throw TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
			Je(e), t.buffer = pe(t.buffer), t.readerType === "none" && We(e, t);
		}
		oe(n) ? (function(e) {
			let t = e._controlledReadableByteStream._reader;
			for (; t._readRequests.length > 0;) {
				if (e._queueTotalSize === 0) return;
				tt(e, t._readRequests.shift());
			}
		}(e), ae(n) === 0 ? He(e, o, i, a) : (e._pendingPullIntos.length > 0 && Ze(e), W(n, new Uint8Array(o, i, a), !1))) : pt(n) ? (He(e, o, i, a), Be(n, Ye(e))) : He(e, o, i, a), Le(e);
	}
	function Y(e, t) {
		let n = e._controlledReadableByteStream;
		n._state === "readable" && (Re(e), Ae(e), Qe(e), Xn(n, t));
	}
	function tt(e, t) {
		let n = e._queue.shift();
		e._queueTotalSize -= n.byteLength, qe(e);
		let r = new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
		t._chunkSteps(r);
	}
	function nt(e) {
		if (e._byobRequest === null && e._pendingPullIntos.length > 0) {
			let t = e._pendingPullIntos.peek(), n = new Uint8Array(t.buffer, t.byteOffset + t.bytesFilled, t.byteLength - t.bytesFilled), r = Object.create(Ne.prototype);
			(function(e, t, n) {
				e._associatedReadableByteStreamController = t, e._view = n;
			})(r, e, n), e._byobRequest = r;
		}
		return e._byobRequest;
	}
	function rt(e) {
		let t = e._controlledReadableByteStream._state;
		return t === "errored" ? null : t === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
	}
	function it(e, t) {
		let n = e._pendingPullIntos.peek();
		if (e._controlledReadableByteStream._state === "closed") {
			if (t !== 0) throw TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
		} else {
			if (t === 0) throw TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
			if (n.bytesFilled + t > n.byteLength) throw RangeError("bytesWritten out of range");
		}
		n.buffer = pe(n.buffer), Xe(e, t);
	}
	function at(e, t) {
		let n = e._pendingPullIntos.peek();
		if (e._controlledReadableByteStream._state === "closed") {
			if (t.byteLength !== 0) throw TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
		} else if (t.byteLength === 0) throw TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
		if (n.byteOffset + n.bytesFilled !== t.byteOffset) throw RangeError("The region specified by view does not match byobRequest");
		if (n.bufferByteLength !== t.buffer.byteLength) throw RangeError("The buffer of view has different capacity than byobRequest");
		if (n.bytesFilled + t.byteLength > n.byteLength) throw RangeError("The region specified by view is larger than byobRequest");
		let r = t.byteLength;
		n.buffer = pe(t.buffer), Xe(e, r);
	}
	function ot(e, t, n, r, i, a, o) {
		t._controlledReadableByteStream = e, t._pullAgain = !1, t._pulling = !1, t._byobRequest = null, t._queue = t._queueTotalSize = void 0, Ae(t), t._closeRequested = !1, t._started = !1, t._strategyHWM = a, t._pullAlgorithm = r, t._cancelAlgorithm = i, t._autoAllocateChunkSize = o, t._pendingPullIntos = new x(), e._readableStreamController = t, p(u(n()), () => (t._started = !0, Le(t), null), (e) => (Y(t, e), null));
	}
	function st(e) {
		return /* @__PURE__ */ TypeError(`ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`);
	}
	function ct(e) {
		return /* @__PURE__ */ TypeError(`ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`);
	}
	function lt(e, t) {
		if ((e = `${e}`) != "byob") throw TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`);
		return e;
	}
	function ut(e) {
		return new mt(e);
	}
	function dt(e, t) {
		e._reader._readIntoRequests.push(t);
	}
	function ft(e) {
		return e._reader._readIntoRequests.length;
	}
	function pt(e) {
		let t = e._reader;
		return t !== void 0 && !!_t(t);
	}
	Object.defineProperties(Pe.prototype, {
		close: { enumerable: !0 },
		enqueue: { enumerable: !0 },
		error: { enumerable: !0 },
		byobRequest: { enumerable: !0 },
		desiredSize: { enumerable: !0 }
	}), r(Pe.prototype.close, "close"), r(Pe.prototype.enqueue, "enqueue"), r(Pe.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Pe.prototype, Symbol.toStringTag, {
		value: "ReadableByteStreamController",
		configurable: !0
	});
	class mt {
		constructor(e) {
			if (L(e, 1, "ReadableStreamBYOBReader"), V(e, "First parameter"), Jn(e)) throw TypeError("This stream has already been locked for exclusive reading by another reader");
			if (!Fe(e._readableStreamController)) throw TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
			ee(this, e), this._readIntoRequests = new x();
		}
		get closed() {
			return _t(this) ? this._closedPromise : d(bt("closed"));
		}
		cancel(e = void 0) {
			return _t(this) ? this._ownerReadableStream === void 0 ? d(A("cancel")) : O(this, e) : d(bt("cancel"));
		}
		read(e, t = {}) {
			if (!_t(this)) return d(bt("read"));
			if (!ArrayBuffer.isView(e)) return d(/* @__PURE__ */ TypeError("view must be an array buffer view"));
			if (e.byteLength === 0) return d(/* @__PURE__ */ TypeError("view must have non-zero byteLength"));
			if (e.buffer.byteLength === 0) return d(/* @__PURE__ */ TypeError("view's buffer must have non-zero byteLength"));
			if (me(e.buffer)) return d(/* @__PURE__ */ TypeError("view's buffer has been detached"));
			let n;
			try {
				n = function(e, t) {
					return P(e, t), { min: B(e?.min ?? 1, `${t} has member 'min' that`) };
				}(t, "options");
			} catch (e) {
				return d(e);
			}
			let r = n.min;
			if (r === 0) return d(/* @__PURE__ */ TypeError("options.min must be greater than 0"));
			if (function(e) {
				return je(e.constructor);
			}(e)) {
				if (r > e.byteLength) return d(/* @__PURE__ */ RangeError("options.min must be less than or equal to view's byteLength"));
			} else if (r > e.length) return d(/* @__PURE__ */ RangeError("options.min must be less than or equal to view's length"));
			if (this._ownerReadableStream === void 0) return d(A("read from"));
			let i = function(e, t, n) {
				let r = e._ownerReadableStream;
				return r._state === "errored" || function(e, t, n) {
					let r = e._controlledReadableByteStream, i = Me(t.constructor), { byteLength: a } = t, o = n * i;
					return !(e._pendingPullIntos.length > 0) && (r._state === "closed" || e._queueTotalSize >= o);
				}(r._readableStreamController, t, n);
			}(this, e, r) ? new gt() : new ht();
			return vt(this, e, r, i), i._promise;
		}
		releaseLock() {
			if (!_t(this)) throw bt("releaseLock");
			this._ownerReadableStream !== void 0 && function(e) {
				k(e), yt(e, /* @__PURE__ */ TypeError("Reader was released"));
			}(this);
		}
	}
	Object.defineProperties(mt.prototype, {
		cancel: { enumerable: !0 },
		read: { enumerable: !0 },
		releaseLock: { enumerable: !0 },
		closed: { enumerable: !0 }
	}), r(mt.prototype.cancel, "cancel"), r(mt.prototype.read, "read"), r(mt.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(mt.prototype, Symbol.toStringTag, {
		value: "ReadableStreamBYOBReader",
		configurable: !0
	});
	class ht {
		constructor() {
			this._promise = l((e, t) => {
				this._resolvePromise = e, this._rejectPromise = t;
			});
		}
		_chunkSteps(e) {
			this._resolvePromise({
				value: e,
				done: !1
			});
		}
		_closeSteps(e) {
			this._resolvePromise({
				value: e,
				done: !0
			});
		}
		_errorSteps(e) {
			this._rejectPromise(e);
		}
	}
	class gt {
		constructor() {
			this._promise = void 0;
		}
		_chunkSteps(e) {
			this._promise = c({
				value: e,
				done: !1
			});
		}
		_closeSteps(e) {
			this._promise = c({
				value: e,
				done: !0
			});
		}
		_errorSteps(e) {
			this._promise = d(e);
		}
	}
	function _t(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_readIntoRequests") && e instanceof mt;
	}
	function vt(e, t, n, r) {
		let i = e._ownerReadableStream;
		i._disturbed = !0, i._state === "errored" ? r._errorSteps(i._storedError) : function(e, t, n, r) {
			let i = e._controlledReadableByteStream, a = t.constructor, o = Me(a), { byteOffset: s, byteLength: c } = t, l = n * o, u;
			try {
				u = pe(t.buffer);
			} catch (e) {
				r._errorSteps(e);
				return;
			}
			let d = {
				buffer: u,
				bufferByteLength: u.byteLength,
				byteOffset: s,
				byteLength: c,
				bytesFilled: 0,
				minimumFill: l,
				elementSize: o,
				viewConstructor: a,
				readerType: "byob"
			};
			if (e._pendingPullIntos.length > 0) return e._pendingPullIntos.push(d), void dt(i, r);
			if (i._state === "closed") {
				let e = new a(d.buffer, d.byteOffset, 0);
				r._closeSteps(e);
				return;
			}
			if (e._queueTotalSize > 0) {
				if (Ge(e, d)) {
					let t = Ve(d);
					qe(e), r._chunkSteps(t);
					return;
				}
				if (e._closeRequested) {
					let t = /* @__PURE__ */ TypeError("Insufficient bytes to fill elements in the given buffer");
					Y(e, t), r._errorSteps(t);
					return;
				}
			}
			e._pendingPullIntos.push(d), dt(i, r), Le(e);
		}(i._readableStreamController, t, n, r);
	}
	function yt(e, t) {
		let n = e._readIntoRequests;
		e._readIntoRequests = new x(), n.forEach((e) => {
			e._errorSteps(t);
		});
	}
	function bt(e) {
		return /* @__PURE__ */ TypeError(`ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`);
	}
	function xt(e, t) {
		let { highWaterMark: n } = e;
		if (n === void 0) return t;
		if (Ee(n) || n < 0) throw RangeError("Invalid highWaterMark");
		return n;
	}
	function St(e) {
		let { size: t } = e;
		return t || (() => 1);
	}
	function Ct(e, t) {
		P(e, t);
		let n = e?.highWaterMark, r = e?.size;
		return {
			highWaterMark: n === void 0 ? void 0 : z(n),
			size: r === void 0 ? void 0 : wt(r, `${t} has member 'size' that`)
		};
	}
	function wt(e, t) {
		return F(e, t), (t) => z(e(t));
	}
	function Tt(e, t, n) {
		return F(e, n), (n) => b(e, t, [n]);
	}
	function Et(e, t, n) {
		return F(e, n), () => b(e, t, []);
	}
	function Dt(e, t, n) {
		return F(e, n), (n) => y(e, t, [n]);
	}
	function Ot(e, t, n) {
		return F(e, n), (n, r) => b(e, t, [n, r]);
	}
	function kt(e, t) {
		if (!Nt(e)) throw TypeError(`${t} is not a WritableStream.`);
	}
	class At {
		constructor(e = {}, t = {}) {
			e === void 0 ? e = null : I(e, "First parameter");
			let n = Ct(t, "Second parameter"), r = function(e, t) {
				P(e, t);
				let n = e?.abort, r = e?.close, i = e?.start, a = e?.type, o = e?.write;
				return {
					abort: n === void 0 ? void 0 : Tt(n, e, `${t} has member 'abort' that`),
					close: r === void 0 ? void 0 : Et(r, e, `${t} has member 'close' that`),
					start: i === void 0 ? void 0 : Dt(i, e, `${t} has member 'start' that`),
					write: o === void 0 ? void 0 : Ot(o, e, `${t} has member 'write' that`),
					type: a
				};
			}(e, "First parameter");
			if (Mt(this), r.type !== void 0) throw RangeError("Invalid type is specified");
			let i = St(n);
			(function(e, t, n, r) {
				let i = Object.create(Xt.prototype), a, o, s, c;
				a = t.start === void 0 ? () => {} : () => t.start(i), o = t.write === void 0 ? () => u(void 0) : (e) => t.write(e, i), s = t.close === void 0 ? () => u(void 0) : () => t.close(), c = t.abort === void 0 ? () => u(void 0) : (e) => t.abort(e), Qt(e, i, a, o, s, c, n, r);
			})(this, r, xt(n, 1), i);
		}
		get locked() {
			if (!Nt(this)) throw on("locked");
			return Pt(this);
		}
		abort(e = void 0) {
			return Nt(this) ? Pt(this) ? d(/* @__PURE__ */ TypeError("Cannot abort a stream that already has a writer")) : Ft(this, e) : d(on("abort"));
		}
		close() {
			return Nt(this) ? Pt(this) ? d(/* @__PURE__ */ TypeError("Cannot close a stream that already has a writer")) : X(this) ? d(/* @__PURE__ */ TypeError("Cannot close an already-closing stream")) : It(this) : d(on("close"));
		}
		getWriter() {
			if (!Nt(this)) throw on("getWriter");
			return jt(this);
		}
	}
	function jt(e) {
		return new Ht(e);
	}
	function Mt(e) {
		e._state = "writable", e._storedError = void 0, e._writer = void 0, e._writableStreamController = void 0, e._writeRequests = new x(), e._inFlightWriteRequest = void 0, e._closeRequest = void 0, e._inFlightCloseRequest = void 0, e._pendingAbortRequest = void 0, e._backpressure = !1;
	}
	function Nt(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_writableStreamController") && e instanceof At;
	}
	function Pt(e) {
		return e._writer !== void 0;
	}
	function Ft(e, t) {
		var n;
		if (e._state === "closed" || e._state === "errored") return u(void 0);
		e._writableStreamController._abortReason = t, (n = e._writableStreamController._abortController) == null || n.abort(t);
		let r = e._state;
		if (r === "closed" || r === "errored") return u(void 0);
		if (e._pendingAbortRequest !== void 0) return e._pendingAbortRequest._promise;
		let i = !1;
		r === "erroring" && (i = !0, t = void 0);
		let a = l((n, r) => {
			e._pendingAbortRequest = {
				_promise: void 0,
				_resolve: n,
				_reject: r,
				_reason: t,
				_wasAlreadyErroring: i
			};
		});
		return e._pendingAbortRequest._promise = a, i || Rt(e, t), a;
	}
	function It(e) {
		let t = e._state;
		if (t === "closed" || t === "errored") return d(/* @__PURE__ */ TypeError(`The stream (in ${t} state) is not in the writable state and cannot be closed`));
		let n = l((t, n) => {
			e._closeRequest = {
				_resolve: t,
				_reject: n
			};
		}), r = e._writer;
		var i;
		return r !== void 0 && e._backpressure && t === "writable" && vn(r), ke(i = e._writableStreamController, Yt, 0), tn(i), n;
	}
	function Lt(e, t) {
		e._state === "writable" ? Rt(e, t) : zt(e);
	}
	function Rt(e, t) {
		let n = e._writableStreamController;
		e._state = "erroring", e._storedError = t;
		let r = e._writer;
		r !== void 0 && Kt(r, t), !function(e) {
			return !(e._inFlightWriteRequest === void 0 && e._inFlightCloseRequest === void 0);
		}(e) && n._started && zt(e);
	}
	function zt(e) {
		e._state = "errored", e._writableStreamController[C]();
		let t = e._storedError;
		if (e._writeRequests.forEach((e) => {
			e._reject(t);
		}), e._writeRequests = new x(), e._pendingAbortRequest === void 0) return void Bt(e);
		let n = e._pendingAbortRequest;
		if (e._pendingAbortRequest = void 0, n._wasAlreadyErroring) return n._reject(t), void Bt(e);
		p(e._writableStreamController[S](n._reason), () => (n._resolve(), Bt(e), null), (t) => (n._reject(t), Bt(e), null));
	}
	function X(e) {
		return e._closeRequest !== void 0 || e._inFlightCloseRequest !== void 0;
	}
	function Bt(e) {
		e._closeRequest !== void 0 && (e._closeRequest._reject(e._storedError), e._closeRequest = void 0);
		let t = e._writer;
		t !== void 0 && fn(t, e._storedError);
	}
	function Vt(e, t) {
		let n = e._writer;
		n !== void 0 && t !== e._backpressure && (t ? function(e) {
			mn(e);
		}(n) : vn(n)), e._backpressure = t;
	}
	Object.defineProperties(At.prototype, {
		abort: { enumerable: !0 },
		close: { enumerable: !0 },
		getWriter: { enumerable: !0 },
		locked: { enumerable: !0 }
	}), r(At.prototype.abort, "abort"), r(At.prototype.close, "close"), r(At.prototype.getWriter, "getWriter"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(At.prototype, Symbol.toStringTag, {
		value: "WritableStream",
		configurable: !0
	});
	class Ht {
		constructor(e) {
			if (L(e, 1, "WritableStreamDefaultWriter"), kt(e, "First parameter"), Pt(e)) throw TypeError("This stream has already been locked for exclusive writing by another writer");
			this._ownerWritableStream = e, e._writer = this;
			let t = e._state;
			if (t === "writable") !X(e) && e._backpressure ? mn(this) : gn(this), un(this);
			else if (t === "erroring") hn(this, e._storedError), un(this);
			else if (t === "closed") gn(this), un(n = this), pn(n);
			else {
				let t = e._storedError;
				hn(this, t), dn(this, t);
			}
			var n;
		}
		get closed() {
			return Ut(this) ? this._closedPromise : d(cn("closed"));
		}
		get desiredSize() {
			if (!Ut(this)) throw cn("desiredSize");
			if (this._ownerWritableStream === void 0) throw ln("desiredSize");
			return function(e) {
				let t = e._ownerWritableStream, n = t._state;
				return n === "errored" || n === "erroring" ? null : n === "closed" ? 0 : en(t._writableStreamController);
			}(this);
		}
		get ready() {
			return Ut(this) ? this._readyPromise : d(cn("ready"));
		}
		abort(e = void 0) {
			return Ut(this) ? this._ownerWritableStream === void 0 ? d(ln("abort")) : function(e, t) {
				return Ft(e._ownerWritableStream, t);
			}(this, e) : d(cn("abort"));
		}
		close() {
			if (!Ut(this)) return d(cn("close"));
			let e = this._ownerWritableStream;
			return e === void 0 ? d(ln("close")) : X(e) ? d(/* @__PURE__ */ TypeError("Cannot close an already-closing stream")) : Wt(this);
		}
		releaseLock() {
			if (!Ut(this)) throw cn("releaseLock");
			this._ownerWritableStream !== void 0 && qt(this);
		}
		write(e = void 0) {
			return Ut(this) ? this._ownerWritableStream === void 0 ? d(ln("write to")) : Jt(this, e) : d(cn("write"));
		}
	}
	function Ut(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_ownerWritableStream") && e instanceof Ht;
	}
	function Wt(e) {
		return It(e._ownerWritableStream);
	}
	function Gt(e, t) {
		e._closedPromiseState === "pending" ? fn(e, t) : function(e, t) {
			dn(e, t);
		}(e, t);
	}
	function Kt(e, t) {
		e._readyPromiseState === "pending" ? _n(e, t) : function(e, t) {
			hn(e, t);
		}(e, t);
	}
	function qt(e) {
		let t = e._ownerWritableStream, n = /* @__PURE__ */ TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
		Kt(e, n), Gt(e, n), t._writer = void 0, e._ownerWritableStream = void 0;
	}
	function Jt(e, t) {
		let n = e._ownerWritableStream, r = n._writableStreamController, i = function(e, t) {
			if (e._strategySizeAlgorithm === void 0) return 1;
			try {
				return e._strategySizeAlgorithm(t);
			} catch (t) {
				return nn(e, t), 1;
			}
		}(r, t);
		if (n !== e._ownerWritableStream) return d(ln("write to"));
		let a = n._state;
		if (a === "errored") return d(n._storedError);
		if (X(n) || a === "closed") return d(/* @__PURE__ */ TypeError("The stream is closing or closed and cannot be written to"));
		if (a === "erroring") return d(n._storedError);
		let o = function(e) {
			return l((t, n) => {
				let r = {
					_resolve: t,
					_reject: n
				};
				e._writeRequests.push(r);
			});
		}(n);
		return function(e, t, n) {
			try {
				ke(e, t, n);
			} catch (t) {
				nn(e, t);
				return;
			}
			let r = e._controlledWritableStream;
			!X(r) && r._state === "writable" && Vt(r, rn(e)), tn(e);
		}(r, t, i), o;
	}
	Object.defineProperties(Ht.prototype, {
		abort: { enumerable: !0 },
		close: { enumerable: !0 },
		releaseLock: { enumerable: !0 },
		write: { enumerable: !0 },
		closed: { enumerable: !0 },
		desiredSize: { enumerable: !0 },
		ready: { enumerable: !0 }
	}), r(Ht.prototype.abort, "abort"), r(Ht.prototype.close, "close"), r(Ht.prototype.releaseLock, "releaseLock"), r(Ht.prototype.write, "write"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Ht.prototype, Symbol.toStringTag, {
		value: "WritableStreamDefaultWriter",
		configurable: !0
	});
	let Yt = {};
	class Xt {
		constructor() {
			throw TypeError("Illegal constructor");
		}
		get abortReason() {
			if (!Zt(this)) throw sn("abortReason");
			return this._abortReason;
		}
		get signal() {
			if (!Zt(this)) throw sn("signal");
			if (this._abortController === void 0) throw TypeError("WritableStreamDefaultController.prototype.signal is not supported");
			return this._abortController.signal;
		}
		error(e = void 0) {
			if (!Zt(this)) throw sn("error");
			this._controlledWritableStream._state === "writable" && an(this, e);
		}
		[S](e) {
			let t = this._abortAlgorithm(e);
			return $t(this), t;
		}
		[C]() {
			Ae(this);
		}
	}
	function Zt(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_controlledWritableStream") && e instanceof Xt;
	}
	function Qt(e, t, n, r, i, a, o, s) {
		t._controlledWritableStream = e, e._writableStreamController = t, t._queue = void 0, t._queueTotalSize = void 0, Ae(t), t._abortReason = void 0, t._abortController = function() {
			if (typeof AbortController == "function") return new AbortController();
		}(), t._started = !1, t._strategySizeAlgorithm = s, t._strategyHWM = o, t._writeAlgorithm = r, t._closeAlgorithm = i, t._abortAlgorithm = a, Vt(e, rn(t)), p(u(n()), () => (t._started = !0, tn(t), null), (n) => (t._started = !0, Lt(e, n), null));
	}
	function $t(e) {
		e._writeAlgorithm = void 0, e._closeAlgorithm = void 0, e._abortAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
	}
	function en(e) {
		return e._strategyHWM - e._queueTotalSize;
	}
	function tn(e) {
		let t = e._controlledWritableStream;
		if (!e._started || t._inFlightWriteRequest !== void 0) return;
		if (t._state === "erroring") return void zt(t);
		if (e._queue.length === 0) return;
		let n = e._queue.peek().value;
		n === Yt ? function(e) {
			let t = e._controlledWritableStream;
			(function(e) {
				e._inFlightCloseRequest = e._closeRequest, e._closeRequest = void 0;
			})(t), Oe(e);
			let n = e._closeAlgorithm();
			$t(e), p(n, () => (function(e) {
				e._inFlightCloseRequest._resolve(void 0), e._inFlightCloseRequest = void 0, e._state === "erroring" && (e._storedError = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._resolve(), e._pendingAbortRequest = void 0)), e._state = "closed";
				let t = e._writer;
				t !== void 0 && pn(t);
			}(t), null), (e) => (function(e, t) {
				e._inFlightCloseRequest._reject(t), e._inFlightCloseRequest = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._reject(t), e._pendingAbortRequest = void 0), Lt(e, t);
			}(t, e), null));
		}(e) : function(e, t) {
			let n = e._controlledWritableStream;
			(function(e) {
				e._inFlightWriteRequest = e._writeRequests.shift();
			})(n), p(e._writeAlgorithm(t), () => {
				(function(e) {
					e._inFlightWriteRequest._resolve(void 0), e._inFlightWriteRequest = void 0;
				})(n);
				let t = n._state;
				return Oe(e), !X(n) && t === "writable" && Vt(n, rn(e)), tn(e), null;
			}, (t) => (n._state === "writable" && $t(e), function(e, t) {
				e._inFlightWriteRequest._reject(t), e._inFlightWriteRequest = void 0, Lt(e, t);
			}(n, t), null));
		}(e, n);
	}
	function nn(e, t) {
		e._controlledWritableStream._state === "writable" && an(e, t);
	}
	function rn(e) {
		return en(e) <= 0;
	}
	function an(e, t) {
		let n = e._controlledWritableStream;
		$t(e), Rt(n, t);
	}
	function on(e) {
		return /* @__PURE__ */ TypeError(`WritableStream.prototype.${e} can only be used on a WritableStream`);
	}
	function sn(e) {
		return /* @__PURE__ */ TypeError(`WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`);
	}
	function cn(e) {
		return /* @__PURE__ */ TypeError(`WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`);
	}
	function ln(e) {
		return /* @__PURE__ */ TypeError("Cannot " + e + " a stream using a released writer");
	}
	function un(e) {
		e._closedPromise = l((t, n) => {
			e._closedPromise_resolve = t, e._closedPromise_reject = n, e._closedPromiseState = "pending";
		});
	}
	function dn(e, t) {
		un(e), fn(e, t);
	}
	function fn(e, t) {
		e._closedPromise_reject !== void 0 && (_(e._closedPromise), e._closedPromise_reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "rejected");
	}
	function pn(e) {
		e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "resolved");
	}
	function mn(e) {
		e._readyPromise = l((t, n) => {
			e._readyPromise_resolve = t, e._readyPromise_reject = n;
		}), e._readyPromiseState = "pending";
	}
	function hn(e, t) {
		mn(e), _n(e, t);
	}
	function gn(e) {
		mn(e), vn(e);
	}
	function _n(e, t) {
		e._readyPromise_reject !== void 0 && (_(e._readyPromise), e._readyPromise_reject(t), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "rejected");
	}
	function vn(e) {
		e._readyPromise_resolve !== void 0 && (e._readyPromise_resolve(void 0), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "fulfilled");
	}
	Object.defineProperties(Xt.prototype, {
		abortReason: { enumerable: !0 },
		signal: { enumerable: !0 },
		error: { enumerable: !0 }
	}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Xt.prototype, Symbol.toStringTag, {
		value: "WritableStreamDefaultController",
		configurable: !0
	});
	let yn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : void 0, bn = function() {
		let e = yn?.DOMException;
		return function(e) {
			if (typeof e != "function" && typeof e != "object" || e.name !== "DOMException") return !1;
			try {
				return new e(), !0;
			} catch {
				return !1;
			}
		}(e) ? e : void 0;
	}() || function() {
		let e = function(e, t) {
			this.message = e || "", this.name = t || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
		};
		return r(e, "DOMException"), e.prototype = Object.create(Error.prototype), Object.defineProperty(e.prototype, "constructor", {
			value: e,
			writable: !0,
			configurable: !0
		}), e;
	}();
	function xn(e, t, n, r, i, a) {
		let o = H(e), s = jt(t);
		e._disturbed = !0;
		let c = new Sn(s), h = new wn(c);
		return l((g, v) => {
			let y;
			if (a !== void 0) {
				if (y = () => {
					let n = a.reason === void 0 ? new bn("Aborted", "AbortError") : a.reason, o = [];
					r || o.push(() => t._state === "writable" ? Ft(t, n) : u(void 0)), i || o.push(() => e._state === "readable" ? $(e, n) : u(void 0)), w(() => Promise.all(o.map((e) => e())), !0, n);
				}, a.aborted) return void y();
				a.addEventListener("abort", y);
			}
			function b() {
				for (; !c._shuttingDown && !t._backpressure && t._state === "writable" && !X(t) && e._state === "readable" && ce(o);) J(o, h);
				if (c._shuttingDown) return u(!0);
				if (t._backpressure) return f(s._readyPromise, b);
				let n = new Cn(c);
				return J(o, n), n._promise;
			}
			var x, S, C;
			if (Tn(e, o._closedPromise, (e) => (r ? T(!0, e) : w(() => Ft(t, e), !0, e), null)), Tn(t, s._closedPromise, (t) => (i ? T(!0, t) : w(() => $(e, t), !0, t), null)), x = e, S = o._closedPromise, C = () => (n ? T() : w(() => function(e) {
				let t = e._ownerWritableStream, n = t._state;
				return X(t) || n === "closed" ? u(void 0) : n === "errored" ? d(t._storedError) : Wt(e);
			}(s)), null), x._state === "closed" ? C() : m(S, C), X(t) || t._state === "closed") {
				let t = /* @__PURE__ */ TypeError("the destination writable stream closed before all data could be piped to it");
				i ? T(!0, t) : w(() => $(e, t), !0, t);
			}
			function w(e, n, r) {
				function i() {
					return p(e(), () => E(n, r), (e) => E(!0, e)), null;
				}
				c._shuttingDown || (c._shuttingDown = !0, t._state !== "writable" || X(t) ? i() : m(c._waitForWritesToFinish(), i));
			}
			function T(e, n) {
				c._shuttingDown || (c._shuttingDown = !0, t._state !== "writable" || X(t) ? E(e, n) : m(c._waitForWritesToFinish(), () => E(e, n)));
			}
			function E(e, t) {
				return qt(s), k(o), a !== void 0 && a.removeEventListener("abort", y), e ? v(t) : g(void 0), null;
			}
			_(l((e, t) => {
				(function n(r) {
					r ? e() : f(b(), n, t);
				})(!1);
			}));
		});
	}
	class Sn {
		constructor(e) {
			this._writer = e, this._shuttingDown = !1, this._currentWrite = u(void 0);
		}
		_waitForWritesToFinish() {
			let e = this._currentWrite;
			return f(this._currentWrite, () => e === this._currentWrite ? void 0 : this._waitForWritesToFinish());
		}
	}
	class Cn {
		constructor(e) {
			this._state = e, this._promise = l((e, t) => {
				this._resolvePromise = e, this._rejectPromise = t;
			});
		}
		_chunkSteps(t) {
			this._state._currentWrite = f(Jt(this._state._writer, t), void 0, e), this._resolvePromise(!1);
		}
		_closeSteps() {
			this._resolvePromise(!0);
		}
		_errorSteps(e) {
			this._rejectPromise(e);
		}
	}
	class wn {
		constructor(e) {
			this._state = e;
		}
		_chunkSteps(t) {
			this._state._currentWrite = f(Jt(this._state._writer, t), void 0, e);
		}
		_closeSteps() {}
		_errorSteps(e) {}
	}
	function Tn(e, t, n) {
		e._state === "errored" ? n(e._storedError) : h(t, n);
	}
	class En {
		constructor() {
			throw TypeError("Illegal constructor");
		}
		get desiredSize() {
			if (!Dn(this)) throw In("desiredSize");
			return Nn(this);
		}
		close() {
			if (!Dn(this)) throw In("close");
			if (!Pn(this)) throw TypeError("The stream is not in a state that permits close");
			jn(this);
		}
		enqueue(e = void 0) {
			if (!Dn(this)) throw In("enqueue");
			if (!Pn(this)) throw TypeError("The stream is not in a state that permits enqueue");
			return Mn(this, e);
		}
		error(e = void 0) {
			if (!Dn(this)) throw In("error");
			Z(this, e);
		}
		[w](e) {
			Ae(this);
			let t = this._cancelAlgorithm(e);
			return An(this), t;
		}
		[T](e) {
			let t = this._controlledReadableStream;
			if (this._queue.length > 0) {
				let n = Oe(this);
				this._closeRequested && this._queue.length === 0 ? (An(this), Yn(t)) : On(this), e._chunkSteps(n);
			} else U(t, e), On(this);
		}
		[E]() {
			return this._queue.length > 0;
		}
		[D]() {}
	}
	function Dn(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_controlledReadableStream") && e instanceof En;
	}
	function On(e) {
		if (kn(e)) {
			if (e._pulling) return void (e._pullAgain = !0);
			e._pulling = !0, p(e._pullAlgorithm(), () => (e._pulling = !1, e._pullAgain && (e._pullAgain = !1, On(e)), null), (t) => (Z(e, t), null));
		}
	}
	function kn(e) {
		let t = e._controlledReadableStream;
		return !Pn(e) || !e._started ? !1 : Jn(t) && ae(t) > 0 ? !0 : Nn(e) > 0;
	}
	function An(e) {
		e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
	}
	function jn(e) {
		if (!Pn(e)) return;
		let t = e._controlledReadableStream;
		e._closeRequested = !0, e._queue.length === 0 && (An(e), Yn(t));
	}
	function Mn(e, t) {
		if (!Pn(e)) return;
		let n = e._controlledReadableStream;
		if (Jn(n) && ae(n) > 0) W(n, t, !1);
		else {
			let n;
			try {
				n = e._strategySizeAlgorithm(t);
			} catch (t) {
				throw Z(e, t), t;
			}
			try {
				ke(e, t, n);
			} catch (t) {
				throw Z(e, t), t;
			}
		}
		On(e);
	}
	function Z(e, t) {
		let n = e._controlledReadableStream;
		n._state === "readable" && (Ae(e), An(e), Xn(n, t));
	}
	function Nn(e) {
		let t = e._controlledReadableStream._state;
		return t === "errored" ? null : t === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
	}
	function Pn(e) {
		let t = e._controlledReadableStream._state;
		return !e._closeRequested && t === "readable";
	}
	function Fn(e, t, n, r, i, a, o) {
		t._controlledReadableStream = e, t._queue = void 0, t._queueTotalSize = void 0, Ae(t), t._started = !1, t._closeRequested = !1, t._pullAgain = !1, t._pulling = !1, t._strategySizeAlgorithm = o, t._strategyHWM = a, t._pullAlgorithm = r, t._cancelAlgorithm = i, e._readableStreamController = t, p(u(n()), () => (t._started = !0, On(t), null), (e) => (Z(t, e), null));
	}
	function In(e) {
		return /* @__PURE__ */ TypeError(`ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`);
	}
	function Ln(e, t) {
		return Fe(e._readableStreamController) ? function(e) {
			let t, n, r, i, a, o = H(e), s = !1, c = !1, d = !1, f = !1, p = !1, m = l((e) => {
				a = e;
			});
			function g(e) {
				h(e._closedPromise, (t) => (e !== o || (Y(r._readableStreamController, t), Y(i._readableStreamController, t), f && p || a(void 0)), null));
			}
			function _() {
				_t(o) && (k(o), o = H(e), g(o)), J(o, {
					_chunkSteps: (t) => {
						v(() => {
							c = !1, d = !1;
							let n = t, o = t;
							if (!f && !p) try {
								o = De(t);
							} catch (t) {
								Y(r._readableStreamController, t), Y(i._readableStreamController, t), a($(e, t));
								return;
							}
							f || et(r._readableStreamController, n), p || et(i._readableStreamController, o), s = !1, c ? b() : d && x();
						});
					},
					_closeSteps: () => {
						s = !1, f || $e(r._readableStreamController), p || $e(i._readableStreamController), r._readableStreamController._pendingPullIntos.length > 0 && it(r._readableStreamController, 0), i._readableStreamController._pendingPullIntos.length > 0 && it(i._readableStreamController, 0), f && p || a(void 0);
					},
					_errorSteps: () => {
						s = !1;
					}
				});
			}
			function y(t, n) {
				q(o) && (k(o), o = ut(e), g(o));
				let l = n ? i : r, u = n ? r : i;
				vt(o, t, 1, {
					_chunkSteps: (t) => {
						v(() => {
							c = !1, d = !1;
							let r = n ? p : f;
							if (n ? f : p) r || at(l._readableStreamController, t);
							else {
								let n;
								try {
									n = De(t);
								} catch (t) {
									Y(l._readableStreamController, t), Y(u._readableStreamController, t), a($(e, t));
									return;
								}
								r || at(l._readableStreamController, t), et(u._readableStreamController, n);
							}
							s = !1, c ? b() : d && x();
						});
					},
					_closeSteps: (e) => {
						s = !1;
						let t = n ? p : f, r = n ? f : p;
						t || $e(l._readableStreamController), r || $e(u._readableStreamController), e !== void 0 && (t || at(l._readableStreamController, e), !r && u._readableStreamController._pendingPullIntos.length > 0 && it(u._readableStreamController, 0)), t && r || a(void 0);
					},
					_errorSteps: () => {
						s = !1;
					}
				});
			}
			function b() {
				if (s) return c = !0, u(void 0);
				s = !0;
				let e = nt(r._readableStreamController);
				return e === null ? _() : y(e._view, !1), u(void 0);
			}
			function x() {
				if (s) return d = !0, u(void 0);
				s = !0;
				let e = nt(i._readableStreamController);
				return e === null ? _() : y(e._view, !0), u(void 0);
			}
			function S(r) {
				if (f = !0, t = r, p) {
					let r = $(e, de([t, n]));
					a(r);
				}
				return m;
			}
			function C(r) {
				if (p = !0, n = r, f) {
					let r = $(e, de([t, n]));
					a(r);
				}
				return m;
			}
			function w() {}
			return r = Gn(w, b, S), i = Gn(w, x, C), g(o), [r, i];
		}(e) : function(e) {
			let t = H(e), n, r, i, a, o, s = !1, c = !1, d = !1, f = !1, p = l((e) => {
				o = e;
			});
			function m() {
				return s ? (c = !0, u(void 0)) : (s = !0, J(t, {
					_chunkSteps: (e) => {
						v(() => {
							c = !1;
							let t = e, n = e;
							d || Mn(i._readableStreamController, t), f || Mn(a._readableStreamController, n), s = !1, c && m();
						});
					},
					_closeSteps: () => {
						s = !1, d || jn(i._readableStreamController), f || jn(a._readableStreamController), d && f || o(void 0);
					},
					_errorSteps: () => {
						s = !1;
					}
				}), u(void 0));
			}
			function g(t) {
				if (d = !0, n = t, f) {
					let t = $(e, de([n, r]));
					o(t);
				}
				return p;
			}
			function _(t) {
				if (f = !0, r = t, d) {
					let t = $(e, de([n, r]));
					o(t);
				}
				return p;
			}
			function y() {}
			return i = Wn(y, m, g), a = Wn(y, m, _), h(t._closedPromise, (e) => (Z(i._readableStreamController, e), Z(a._readableStreamController, e), d && f || o(void 0), null)), [i, a];
		}(e);
	}
	function Rn(n) {
		return t(r = n) && r.getReader !== void 0 ? function(n) {
			let r;
			function i() {
				let e;
				try {
					e = n.read();
				} catch (e) {
					return d(e);
				}
				return g(e, (e) => {
					if (!t(e)) throw TypeError("The promise returned by the reader.read() method must fulfill with an object");
					if (e.done) jn(r._readableStreamController);
					else {
						let t = e.value;
						Mn(r._readableStreamController, t);
					}
				});
			}
			function a(e) {
				try {
					return u(n.cancel(e));
				} catch (e) {
					return d(e);
				}
			}
			return r = Wn(e, i, a, 0), r;
		}(n.getReader()) : function(n) {
			let r, i = ye(n, "async");
			function a() {
				let e;
				try {
					e = be(i);
				} catch (e) {
					return d(e);
				}
				return g(u(e), (e) => {
					if (!t(e)) throw TypeError("The promise returned by the iterator.next() method must fulfill with an object");
					if (e.done) jn(r._readableStreamController);
					else {
						let t = e.value;
						Mn(r._readableStreamController, t);
					}
				});
			}
			function o(e) {
				let n = i.iterator, r;
				try {
					r = ge(n, "return");
				} catch (e) {
					return d(e);
				}
				return r === void 0 ? u(void 0) : g(b(r, n, [e]), (e) => {
					if (!t(e)) throw TypeError("The promise returned by the iterator.return() method must fulfill with an object");
				});
			}
			return r = Wn(e, a, o, 0), r;
		}(n);
		var r;
	}
	function zn(e, t, n) {
		return F(e, n), (n) => b(e, t, [n]);
	}
	function Bn(e, t, n) {
		return F(e, n), (n) => b(e, t, [n]);
	}
	function Vn(e, t, n) {
		return F(e, n), (n) => y(e, t, [n]);
	}
	function Hn(e, t) {
		if ((e = `${e}`) != "bytes") throw TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamType`);
		return e;
	}
	function Un(e, t) {
		P(e, t);
		let n = e?.preventAbort, r = e?.preventCancel, i = e?.preventClose, a = e?.signal;
		return a !== void 0 && function(e, t) {
			if (!function(e) {
				if (typeof e != "object" || !e) return !1;
				try {
					return typeof e.aborted == "boolean";
				} catch {
					return !1;
				}
			}(e)) throw TypeError(`${t} is not an AbortSignal.`);
		}(a, `${t} has member 'signal' that`), {
			preventAbort: !!n,
			preventCancel: !!r,
			preventClose: !!i,
			signal: a
		};
	}
	Object.defineProperties(En.prototype, {
		close: { enumerable: !0 },
		enqueue: { enumerable: !0 },
		error: { enumerable: !0 },
		desiredSize: { enumerable: !0 }
	}), r(En.prototype.close, "close"), r(En.prototype.enqueue, "enqueue"), r(En.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(En.prototype, Symbol.toStringTag, {
		value: "ReadableStreamDefaultController",
		configurable: !0
	});
	class Q {
		constructor(e = {}, t = {}) {
			e === void 0 ? e = null : I(e, "First parameter");
			let n = Ct(t, "Second parameter"), r = function(e, t) {
				P(e, t);
				let n = e, r = n?.autoAllocateChunkSize, i = n?.cancel, a = n?.pull, o = n?.start, s = n?.type;
				return {
					autoAllocateChunkSize: r === void 0 ? void 0 : B(r, `${t} has member 'autoAllocateChunkSize' that`),
					cancel: i === void 0 ? void 0 : zn(i, n, `${t} has member 'cancel' that`),
					pull: a === void 0 ? void 0 : Bn(a, n, `${t} has member 'pull' that`),
					start: o === void 0 ? void 0 : Vn(o, n, `${t} has member 'start' that`),
					type: s === void 0 ? void 0 : Hn(s, `${t} has member 'type' that`)
				};
			}(e, "First parameter");
			if (Kn(this), r.type === "bytes") {
				if (n.size !== void 0) throw RangeError("The strategy for a byte stream cannot have a size function");
				(function(e, t, n) {
					let r = Object.create(Pe.prototype), i, a, o;
					i = t.start === void 0 ? () => {} : () => t.start(r), a = t.pull === void 0 ? () => u(void 0) : () => t.pull(r), o = t.cancel === void 0 ? () => u(void 0) : (e) => t.cancel(e);
					let s = t.autoAllocateChunkSize;
					if (s === 0) throw TypeError("autoAllocateChunkSize must be greater than 0");
					ot(e, r, i, a, o, n, s);
				})(this, r, xt(n, 0));
			} else {
				let e = St(n);
				(function(e, t, n, r) {
					let i = Object.create(En.prototype), a, o, s;
					a = t.start === void 0 ? () => {} : () => t.start(i), o = t.pull === void 0 ? () => u(void 0) : () => t.pull(i), s = t.cancel === void 0 ? () => u(void 0) : (e) => t.cancel(e), Fn(e, i, a, o, s, n, r);
				})(this, r, xt(n, 1), e);
			}
		}
		get locked() {
			if (!qn(this)) throw Zn("locked");
			return Jn(this);
		}
		cancel(e = void 0) {
			return qn(this) ? Jn(this) ? d(/* @__PURE__ */ TypeError("Cannot cancel a stream that already has a reader")) : $(this, e) : d(Zn("cancel"));
		}
		getReader(e = void 0) {
			if (!qn(this)) throw Zn("getReader");
			return function(e, t) {
				P(e, t);
				let n = e?.mode;
				return { mode: n === void 0 ? void 0 : lt(n, `${t} has member 'mode' that`) };
			}(e, "First parameter").mode === void 0 ? H(this) : ut(this);
		}
		pipeThrough(e, t = {}) {
			if (!qn(this)) throw Zn("pipeThrough");
			L(e, 1, "pipeThrough");
			let n = function(e, t) {
				P(e, t);
				let n = e?.readable;
				R(n, "readable", "ReadableWritablePair"), V(n, `${t} has member 'readable' that`);
				let r = e?.writable;
				return R(r, "writable", "ReadableWritablePair"), kt(r, `${t} has member 'writable' that`), {
					readable: n,
					writable: r
				};
			}(e, "First parameter"), r = Un(t, "Second parameter");
			if (Jn(this)) throw TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
			if (Pt(n.writable)) throw TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
			return _(xn(this, n.writable, r.preventClose, r.preventAbort, r.preventCancel, r.signal)), n.readable;
		}
		pipeTo(e, t = {}) {
			if (!qn(this)) return d(Zn("pipeTo"));
			if (e === void 0) return d("Parameter 1 is required in 'pipeTo'.");
			if (!Nt(e)) return d(/* @__PURE__ */ TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
			let n;
			try {
				n = Un(t, "Second parameter");
			} catch (e) {
				return d(e);
			}
			return Jn(this) ? d(/* @__PURE__ */ TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : Pt(e) ? d(/* @__PURE__ */ TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : xn(this, e, n.preventClose, n.preventAbort, n.preventCancel, n.signal);
		}
		tee() {
			if (!qn(this)) throw Zn("tee");
			return de(Ln(this));
		}
		values(e = void 0) {
			if (!qn(this)) throw Zn("values");
			return function(e, t) {
				let n = new xe(H(e), t), r = Object.create(Ce);
				return r._asyncIteratorImpl = n, r;
			}(this, function(e, t) {
				return P(e, t), { preventCancel: !!e?.preventCancel };
			}(e, "First parameter").preventCancel);
		}
		[ve](e) {
			return this.values(e);
		}
		static from(e) {
			return Rn(e);
		}
	}
	function Wn(e, t, n, r = 1, i = () => 1) {
		let a = Object.create(Q.prototype);
		return Kn(a), Fn(a, Object.create(En.prototype), e, t, n, r, i), a;
	}
	function Gn(e, t, n) {
		let r = Object.create(Q.prototype);
		return Kn(r), ot(r, Object.create(Pe.prototype), e, t, n, 0, void 0), r;
	}
	function Kn(e) {
		e._state = "readable", e._reader = void 0, e._storedError = void 0, e._disturbed = !1;
	}
	function qn(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_readableStreamController") && e instanceof Q;
	}
	function Jn(e) {
		return e._reader !== void 0;
	}
	function $(t, n) {
		if (t._disturbed = !0, t._state === "closed") return u(void 0);
		if (t._state === "errored") return d(t._storedError);
		Yn(t);
		let r = t._reader;
		if (r !== void 0 && _t(r)) {
			let e = r._readIntoRequests;
			r._readIntoRequests = new x(), e.forEach((e) => {
				e._closeSteps(void 0);
			});
		}
		return g(t._readableStreamController[w](n), e);
	}
	function Yn(e) {
		e._state = "closed";
		let t = e._reader;
		if (t !== void 0 && (re(t), q(t))) {
			let e = t._readRequests;
			t._readRequests = new x(), e.forEach((e) => {
				e._closeSteps();
			});
		}
	}
	function Xn(e, t) {
		e._state = "errored", e._storedError = t;
		let n = e._reader;
		n !== void 0 && (ne(n, t), q(n) ? le(n, t) : yt(n, t));
	}
	function Zn(e) {
		return /* @__PURE__ */ TypeError(`ReadableStream.prototype.${e} can only be used on a ReadableStream`);
	}
	function Qn(e, t) {
		P(e, t);
		let n = e?.highWaterMark;
		return R(n, "highWaterMark", "QueuingStrategyInit"), { highWaterMark: z(n) };
	}
	Object.defineProperties(Q, { from: { enumerable: !0 } }), Object.defineProperties(Q.prototype, {
		cancel: { enumerable: !0 },
		getReader: { enumerable: !0 },
		pipeThrough: { enumerable: !0 },
		pipeTo: { enumerable: !0 },
		tee: { enumerable: !0 },
		values: { enumerable: !0 },
		locked: { enumerable: !0 }
	}), r(Q.from, "from"), r(Q.prototype.cancel, "cancel"), r(Q.prototype.getReader, "getReader"), r(Q.prototype.pipeThrough, "pipeThrough"), r(Q.prototype.pipeTo, "pipeTo"), r(Q.prototype.tee, "tee"), r(Q.prototype.values, "values"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Q.prototype, Symbol.toStringTag, {
		value: "ReadableStream",
		configurable: !0
	}), Object.defineProperty(Q.prototype, ve, {
		value: Q.prototype.values,
		writable: !0,
		configurable: !0
	});
	let $n = (e) => e.byteLength;
	r($n, "size");
	class er {
		constructor(e) {
			L(e, 1, "ByteLengthQueuingStrategy"), e = Qn(e, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = e.highWaterMark;
		}
		get highWaterMark() {
			if (!nr(this)) throw tr("highWaterMark");
			return this._byteLengthQueuingStrategyHighWaterMark;
		}
		get size() {
			if (!nr(this)) throw tr("size");
			return $n;
		}
	}
	function tr(e) {
		return /* @__PURE__ */ TypeError(`ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`);
	}
	function nr(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_byteLengthQueuingStrategyHighWaterMark") && e instanceof er;
	}
	Object.defineProperties(er.prototype, {
		highWaterMark: { enumerable: !0 },
		size: { enumerable: !0 }
	}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(er.prototype, Symbol.toStringTag, {
		value: "ByteLengthQueuingStrategy",
		configurable: !0
	});
	let rr = () => 1;
	r(rr, "size");
	class ir {
		constructor(e) {
			L(e, 1, "CountQueuingStrategy"), e = Qn(e, "First parameter"), this._countQueuingStrategyHighWaterMark = e.highWaterMark;
		}
		get highWaterMark() {
			if (!or(this)) throw ar("highWaterMark");
			return this._countQueuingStrategyHighWaterMark;
		}
		get size() {
			if (!or(this)) throw ar("size");
			return rr;
		}
	}
	function ar(e) {
		return /* @__PURE__ */ TypeError(`CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`);
	}
	function or(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_countQueuingStrategyHighWaterMark") && e instanceof ir;
	}
	function sr(e, t, n) {
		return F(e, n), (n) => b(e, t, [n]);
	}
	function cr(e, t, n) {
		return F(e, n), (n) => y(e, t, [n]);
	}
	function lr(e, t, n) {
		return F(e, n), (n, r) => b(e, t, [n, r]);
	}
	function ur(e, t, n) {
		return F(e, n), (n) => b(e, t, [n]);
	}
	Object.defineProperties(ir.prototype, {
		highWaterMark: { enumerable: !0 },
		size: { enumerable: !0 }
	}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ir.prototype, Symbol.toStringTag, {
		value: "CountQueuingStrategy",
		configurable: !0
	});
	class dr {
		constructor(e = {}, t = {}, n = {}) {
			e === void 0 && (e = null);
			let r = Ct(t, "Second parameter"), i = Ct(n, "Third parameter"), a = function(e, t) {
				P(e, t);
				let n = e?.cancel, r = e?.flush, i = e?.readableType, a = e?.start, o = e?.transform, s = e?.writableType;
				return {
					cancel: n === void 0 ? void 0 : ur(n, e, `${t} has member 'cancel' that`),
					flush: r === void 0 ? void 0 : sr(r, e, `${t} has member 'flush' that`),
					readableType: i,
					start: a === void 0 ? void 0 : cr(a, e, `${t} has member 'start' that`),
					transform: o === void 0 ? void 0 : lr(o, e, `${t} has member 'transform' that`),
					writableType: s
				};
			}(e, "First parameter");
			if (a.readableType !== void 0) throw RangeError("Invalid readableType specified");
			if (a.writableType !== void 0) throw RangeError("Invalid writableType specified");
			let o = xt(i, 0), s = St(i), c = xt(r, 1), f = St(r), m;
			(function(e, t, n, r, i, a) {
				function o() {
					return t;
				}
				function s(t) {
					return function(e, t) {
						let n = e._transformStreamController;
						return e._backpressure ? g(e._backpressureChangePromise, () => {
							let r = e._writable;
							if (r._state === "erroring") throw r._storedError;
							return xr(n, t);
						}) : xr(n, t);
					}(e, t);
				}
				function c(t) {
					return function(e, t) {
						let n = e._transformStreamController;
						if (n._finishPromise !== void 0) return n._finishPromise;
						let r = e._readable;
						n._finishPromise = l((e, t) => {
							n._finishPromise_resolve = e, n._finishPromise_reject = t;
						});
						let i = n._cancelAlgorithm(t);
						return yr(n), p(i, () => (r._state === "errored" ? wr(n, r._storedError) : (Z(r._readableStreamController, t), Cr(n)), null), (e) => (Z(r._readableStreamController, e), wr(n, e), null)), n._finishPromise;
					}(e, t);
				}
				function u() {
					return function(e) {
						let t = e._transformStreamController;
						if (t._finishPromise !== void 0) return t._finishPromise;
						let n = e._readable;
						t._finishPromise = l((e, n) => {
							t._finishPromise_resolve = e, t._finishPromise_reject = n;
						});
						let r = t._flushAlgorithm();
						return yr(t), p(r, () => (n._state === "errored" ? wr(t, n._storedError) : (jn(n._readableStreamController), Cr(t)), null), (e) => (Z(n._readableStreamController, e), wr(t, e), null)), t._finishPromise;
					}(e);
				}
				function d() {
					return function(e) {
						return gr(e, !1), e._backpressureChangePromise;
					}(e);
				}
				function f(t) {
					return function(e, t) {
						let n = e._transformStreamController;
						if (n._finishPromise !== void 0) return n._finishPromise;
						let r = e._writable;
						n._finishPromise = l((e, t) => {
							n._finishPromise_resolve = e, n._finishPromise_reject = t;
						});
						let i = n._cancelAlgorithm(t);
						return yr(n), p(i, () => (r._state === "errored" ? wr(n, r._storedError) : (nn(r._writableStreamController, t), hr(e), Cr(n)), null), (t) => (nn(r._writableStreamController, t), hr(e), wr(n, t), null)), n._finishPromise;
					}(e, t);
				}
				e._writable = function(e, t, n, r, i = 1, a = () => 1) {
					let o = Object.create(At.prototype);
					return Mt(o), Qt(o, Object.create(Xt.prototype), e, t, n, r, i, a), o;
				}(o, s, u, c, n, r), e._readable = Wn(o, d, f, i, a), e._backpressure = void 0, e._backpressureChangePromise = void 0, e._backpressureChangePromise_resolve = void 0, gr(e, !0), e._transformStreamController = void 0;
			})(this, l((e) => {
				m = e;
			}), c, f, o, s), function(e, t) {
				let n = Object.create(_r.prototype), r, i, a;
				r = t.transform === void 0 ? (e) => {
					try {
						return br(n, e), u(void 0);
					} catch (e) {
						return d(e);
					}
				} : (e) => t.transform(e, n), i = t.flush === void 0 ? () => u(void 0) : () => t.flush(n), a = t.cancel === void 0 ? () => u(void 0) : (e) => t.cancel(e), (function(e, t, n, r, i) {
					t._controlledTransformStream = e, e._transformStreamController = t, t._transformAlgorithm = n, t._flushAlgorithm = r, t._cancelAlgorithm = i, t._finishPromise = void 0, t._finishPromise_resolve = void 0, t._finishPromise_reject = void 0;
				})(e, n, r, i, a);
			}(this, a), a.start === void 0 ? m(void 0) : m(a.start(this._transformStreamController));
		}
		get readable() {
			if (!fr(this)) throw Tr("readable");
			return this._readable;
		}
		get writable() {
			if (!fr(this)) throw Tr("writable");
			return this._writable;
		}
	}
	function fr(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_transformStreamController") && e instanceof dr;
	}
	function pr(e, t) {
		Z(e._readable._readableStreamController, t), mr(e, t);
	}
	function mr(e, t) {
		yr(e._transformStreamController), nn(e._writable._writableStreamController, t), hr(e);
	}
	function hr(e) {
		e._backpressure && gr(e, !1);
	}
	function gr(e, t) {
		e._backpressureChangePromise !== void 0 && e._backpressureChangePromise_resolve(), e._backpressureChangePromise = l((t) => {
			e._backpressureChangePromise_resolve = t;
		}), e._backpressure = t;
	}
	Object.defineProperties(dr.prototype, {
		readable: { enumerable: !0 },
		writable: { enumerable: !0 }
	}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(dr.prototype, Symbol.toStringTag, {
		value: "TransformStream",
		configurable: !0
	});
	class _r {
		constructor() {
			throw TypeError("Illegal constructor");
		}
		get desiredSize() {
			if (!vr(this)) throw Sr("desiredSize");
			return Nn(this._controlledTransformStream._readable._readableStreamController);
		}
		enqueue(e = void 0) {
			if (!vr(this)) throw Sr("enqueue");
			br(this, e);
		}
		error(e = void 0) {
			if (!vr(this)) throw Sr("error");
			var t = e;
			pr(this._controlledTransformStream, t);
		}
		terminate() {
			if (!vr(this)) throw Sr("terminate");
			(function(e) {
				let t = e._controlledTransformStream;
				jn(t._readable._readableStreamController), mr(t, /* @__PURE__ */ TypeError("TransformStream terminated"));
			})(this);
		}
	}
	function vr(e) {
		return !!t(e) && !!Object.prototype.hasOwnProperty.call(e, "_controlledTransformStream") && e instanceof _r;
	}
	function yr(e) {
		e._transformAlgorithm = void 0, e._flushAlgorithm = void 0, e._cancelAlgorithm = void 0;
	}
	function br(e, t) {
		let n = e._controlledTransformStream, r = n._readable._readableStreamController;
		if (!Pn(r)) throw TypeError("Readable side is not in a state that permits enqueue");
		try {
			Mn(r, t);
		} catch (e) {
			throw mr(n, e), n._readable._storedError;
		}
		(function(e) {
			return !kn(e);
		})(r) !== n._backpressure && gr(n, !0);
	}
	function xr(e, t) {
		return g(e._transformAlgorithm(t), void 0, (t) => {
			throw pr(e._controlledTransformStream, t), t;
		});
	}
	function Sr(e) {
		return /* @__PURE__ */ TypeError(`TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`);
	}
	function Cr(e) {
		e._finishPromise_resolve !== void 0 && (e._finishPromise_resolve(), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
	}
	function wr(e, t) {
		e._finishPromise_reject !== void 0 && (_(e._finishPromise), e._finishPromise_reject(t), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
	}
	function Tr(e) {
		return /* @__PURE__ */ TypeError(`TransformStream.prototype.${e} can only be used on a TransformStream`);
	}
	Object.defineProperties(_r.prototype, {
		enqueue: { enumerable: !0 },
		error: { enumerable: !0 },
		terminate: { enumerable: !0 },
		desiredSize: { enumerable: !0 }
	}), r(_r.prototype.enqueue, "enqueue"), r(_r.prototype.error, "error"), r(_r.prototype.terminate, "terminate"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(_r.prototype, Symbol.toStringTag, {
		value: "TransformStreamDefaultController",
		configurable: !0
	});
	let Er = {
		ReadableStream: Q,
		ReadableStreamDefaultController: En,
		ReadableByteStreamController: Pe,
		ReadableStreamBYOBRequest: Ne,
		ReadableStreamDefaultReader: G,
		ReadableStreamBYOBReader: mt,
		WritableStream: At,
		WritableStreamDefaultController: Xt,
		WritableStreamDefaultWriter: Ht,
		ByteLengthQueuingStrategy: er,
		CountQueuingStrategy: ir,
		TransformStream: dr,
		TransformStreamDefaultController: _r
	};
	for (let e in Er) Object.prototype.hasOwnProperty.call(Er, e) && Object.defineProperty(yn, e, {
		value: Er[e],
		writable: !0,
		configurable: !0
	});
})();
//#endregion
//#region node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/browser.js
var r = Uint8Array, i = Uint16Array, a = Int32Array, o = new r([
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
}, ee = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, O = function(e, t) {
	for (var n = [], a = 0; a < e.length; ++a) e[a] && n.push({
		s: a,
		f: e[a]
	});
	var o = n.length, s = n.slice();
	if (!o) return {
		t: M,
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
	var h = new i(m + 1), g = k(n[f - 1], h, 0);
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
}, k = function(e, t, n) {
	return e.s == -1 ? Math.max(k(e.l, t, n + 1), k(e.r, t, n + 1)) : t[e.s] = n;
}, A = function(e) {
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
}, j = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, te = function(e, t, n) {
	var r = n.length, i = C(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, ne = function(e, t, n, r, a, l, u, d, f, p, m) {
	D(t, m++, n), ++a[256];
	for (var h = O(a, 15), g = h.t, _ = h.l, C = O(l, 15), w = C.t, T = C.l, E = A(g), k = E.c, ne = E.n, re = A(w), M = re.c, N = re.n, P = new i(19), F = 0; F < k.length; ++F) ++P[k[F] & 31];
	for (var F = 0; F < M.length; ++F) ++P[M[F] & 31];
	for (var I = O(P, 7), L = I.t, R = I.l, z = 19; z > 4 && !L[c[z - 1]]; --z);
	var ie = p + 5 << 3, B = j(a, y) + j(l, b) + u, V = j(a, g) + j(l, w) + u + 14 + 3 * z + j(P, L) + 2 * P[16] + 3 * P[17] + 7 * P[18];
	if (f >= 0 && ie <= B && ie <= V) return te(t, m, e.subarray(f, f + p));
	var H, U, W, ae;
	if (D(t, m, 1 + (V < B)), m += 2, V < B) {
		H = v(g, _, 0), U = g, W = v(w, T, 0), ae = w;
		var oe = v(L, R, 0);
		D(t, m, ne - 257), D(t, m + 5, N - 1), D(t, m + 10, z - 4), m += 14;
		for (var F = 0; F < z; ++F) D(t, m + 3 * F, L[c[F]]);
		m += 3 * z;
		for (var G = [k, M], K = 0; K < 2; ++K) for (var se = G[K], F = 0; F < se.length; ++F) {
			var q = se[F] & 31;
			D(t, m, oe[q]), m += L[q], q > 15 && (D(t, m, se[F] >> 5 & 127), m += se[F] >> 12);
		}
	} else H = x, U = y, W = S, ae = b;
	for (var F = 0; F < d; ++F) {
		var J = r[F];
		if (J > 255) {
			var q = J >> 18 & 31;
			ee(t, m, H[q + 257]), m += U[q + 257], q > 7 && (D(t, m, J >> 23 & 31), m += o[q]);
			var ce = J & 31;
			ee(t, m, W[ce]), m += ae[ce], ce > 3 && (ee(t, m, J >> 5 & 8191), m += s[ce]);
		} else ee(t, m, H[J]), m += U[J];
	}
	return ee(t, m, H[256]), m + U[256];
}, re = /* @__PURE__ */ new a([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), M = /* @__PURE__ */ new r(0), N = function(e, t, n, c, l, u) {
	var d = u.z || e.length, p = new r(c + d + 5 * (1 + Math.ceil(d / 7e3)) + l), h = p.subarray(c, p.length - l), g = u.l, _ = (u.r || 0) & 7;
	if (t) {
		_ && (h[0] = u.r >> 3);
		for (var v = re[t - 1], y = v >> 13, b = v & 8191, x = (1 << n) - 1, S = u.p || new i(32768), T = u.h || new i(x + 1), E = Math.ceil(n / 3), D = 2 * E, ee = function(t) {
			return (e[t] ^ e[t + 1] << E ^ e[t + 2] << D) & x;
		}, O = new a(25e3), k = new i(288), A = new i(32), j = 0, M = 0, N = u.i || 0, P = 0, F = u.w || 0, I = 0; N + 2 < d; ++N) {
			var L = ee(N), R = N & 32767, z = T[L];
			if (S[R] = z, T[L] = R, F <= N) {
				var ie = d - N;
				if ((j > 7e3 || P > 24576) && (ie > 423 || !g)) {
					_ = ne(e, h, 0, O, k, A, M, P, I, N - I, _), P = j = M = 0, I = N;
					for (var B = 0; B < 286; ++B) k[B] = 0;
					for (var B = 0; B < 30; ++B) A[B] = 0;
				}
				var V = 2, H = 0, U = b, W = R - z & 32767;
				if (ie > 2 && L == ee(N - W)) for (var ae = Math.min(y, ie) - 1, oe = Math.min(32767, N), G = Math.min(258, ie); W <= oe && --U && R != z;) {
					if (e[N + V] == e[N + V - W]) {
						for (var K = 0; K < G && e[N + K] == e[N + K - W]; ++K);
						if (K > V) {
							if (V = K, H = W, K > ae) break;
							for (var se = Math.min(W, K - 2), q = 0, B = 0; B < se; ++B) {
								var J = N - W + B & 32767, ce = J - S[J] & 32767;
								ce > q && (q = ce, z = J);
							}
						}
					}
					R = z, z = S[R], W += R - z & 32767;
				}
				if (H) {
					O[P++] = 268435456 | f[V] << 18 | m[H];
					var le = f[V] & 31, ue = m[H] & 31;
					M += o[le] + s[ue], ++k[257 + le], ++A[ue], F = N + V, ++j;
				} else O[P++] = e[N], ++k[e[N]];
			}
		}
		for (N = Math.max(N, F); N < d; ++N) O[P++] = e[N], ++k[e[N]];
		_ = ne(e, h, g, O, k, A, M, P, I, N - I, _), g || (u.r = _ & 7 | h[_ / 8 | 0] << 3, _ -= 7, u.h = T, u.p = S, u.i = N, u.w = F);
	} else {
		for (var N = u.w || 0; N < d + g; N += 65535) {
			var de = N + 65535;
			de >= d && (h[_ / 8 | 0] = g, de = d), _ = te(h, _ + 1, e.subarray(N, de));
		}
		u.i = d;
	}
	return w(p, 0, c + C(_) + l);
}, P = /* @__PURE__ */ (function() {
	for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
		for (var n = t, r = 9; --r;) n = (n & 1 && -306674912) ^ n >>> 1;
		e[t] = n;
	}
	return e;
})(), F = function() {
	var e = -1;
	return {
		p: function(t) {
			for (var n = e, r = 0; r < t.length; ++r) n = P[n & 255 ^ t[r]] ^ n >>> 8;
			e = n;
		},
		d: function() {
			return ~e;
		}
	};
}, I = function(e, t, n, i, a) {
	if (!a && (a = { l: 1 }, t.dictionary)) {
		var o = t.dictionary.subarray(-32768), s = new r(o.length + e.length);
		s.set(o), s.set(e, o.length), e = s, a.w = o.length;
	}
	return N(e, t.level == null ? 6 : t.level, t.mem == null ? a.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, i, a);
}, L = function(e, t) {
	var n = {};
	for (var r in e) n[r] = e[r];
	for (var r in t) n[r] = t[r];
	return n;
}, R = function(e, t, n) {
	for (; n; ++t) e[t] = n, n >>>= 8;
}, z = /* @__PURE__ */ function() {
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
		this.ondata(I(e, this.o, 0, 0, this.s), t);
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
		this.s.l = t & 1, (this.s.z > this.s.w + 8191 || t) && (this.p(this.b, t || !1), this.s.w = this.s.i, this.s.i -= 2), t && (this.s = this.o = {}, this.b = M);
	}, e.prototype.flush = function(e) {
		if (this.ondata || E(5), this.s.l && E(4), this.p(this.b, !1), this.s.w = this.s.i, this.s.i -= 2, e) {
			var t = new r(6);
			t[0] = this.s.r >> 3;
			var n = te(t, this.s.r, M);
			this.s.r = 0, this.ondata(t.subarray(0, n >> 3), !1);
		}
	}, e;
}(), ie = typeof TextEncoder < "u" && /* @__PURE__ */ new TextEncoder(), B = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder();
try {
	B.decode(M, { stream: !0 });
} catch {}
function V(e, t) {
	if (t) {
		for (var n = new r(e.length), i = 0; i < e.length; ++i) n[i] = e.charCodeAt(i);
		return n;
	}
	if (ie) return ie.encode(e);
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
var H = function(e) {
	return e == 1 ? 3 : e < 6 ? 2 : +(e == 9);
}, U = function(e) {
	var t = 0;
	if (e) for (var n in e) {
		var r = e[n].length;
		r > 65535 && E(9), t += r + 4;
	}
	return t;
}, W = function(e, t, n, r, i, a, o, s) {
	var c = r.length, l = n.extra, u = s && s.length, d = U(l);
	R(e, t, o == null ? 67324752 : 33639248), t += 4, o != null && (e[t++] = 20, e[t++] = n.os), e[t] = 20, t += 2, e[t++] = n.flag << 1 | (a < 0 && 8), e[t++] = i && 8, e[t++] = n.compression & 255, e[t++] = n.compression >> 8;
	var f = new Date(n.mtime == null ? Date.now() : n.mtime), p = f.getFullYear() - 1980;
	if ((p < 0 || p > 119) && E(10), R(e, t, p << 25 | f.getMonth() + 1 << 21 | f.getDate() << 16 | f.getHours() << 11 | f.getMinutes() << 5 | f.getSeconds() >> 1), t += 4, a != -1 && (R(e, t, n.crc), R(e, t + 4, a < 0 ? -a - 2 : a), R(e, t + 8, n.size)), R(e, t + 12, c), R(e, t + 14, d), t += 16, o != null && (R(e, t, u), R(e, t + 6, n.attrs), R(e, t + 10, o), t += 14), e.set(r, t), t += c, d) for (var m in l) {
		var h = l[m], g = h.length;
		R(e, t, +m), R(e, t + 2, g), e.set(h, t + 4), t += 4 + g;
	}
	return u && (e.set(s, t), t += u), t;
}, ae = function(e, t, n, r, i) {
	R(e, t, 101010256), R(e, t + 8, n), R(e, t + 10, n), R(e, t + 12, r), R(e, t + 16, i);
}, oe = /* @__PURE__ */ function() {
	function e(e) {
		this.filename = e, this.c = F(), this.size = 0, this.compression = 0;
	}
	return e.prototype.process = function(e, t) {
		this.ondata(null, e, t);
	}, e.prototype.push = function(e, t) {
		this.ondata || E(5), this.c.p(e), this.size += e.length, t && (this.crc = this.c.d()), this.process(e, t || !1);
	}, e;
}(), G = /* @__PURE__ */ function() {
	function e(e, t) {
		var n = this;
		t ||= {}, oe.call(this, e), this.d = new z(t, function(e, t) {
			n.ondata(null, e, t);
		}), this.compression = 8, this.flag = H(t.level);
	}
	return e.prototype.process = function(e, t) {
		try {
			this.d.push(e, t);
		} catch (e) {
			this.ondata(e, null, t);
		}
	}, e.prototype.push = function(e, t) {
		oe.prototype.push.call(this, e, t);
	}, e;
}(), K = /* @__PURE__ */ function() {
	function e(e) {
		this.ondata = e, this.u = [], this.d = 1;
	}
	return e.prototype.add = function(e) {
		var t = this;
		if (this.ondata || E(5), this.d & 2) this.ondata(E(4 + (this.d & 1) * 8, 0, 1), null, !1);
		else {
			var n = V(e.filename), i = n.length, a = e.comment, o = a && V(a), s = i != e.filename.length || o && a.length != o.length, c = i + U(e.extra) + 30;
			i > 65535 && this.ondata(E(11, 0, 1), null, !1);
			var l = new r(c);
			W(l, 0, e, n, s, -1);
			var u = [l], d = function() {
				for (var e = 0, n = u; e < n.length; e++) {
					var r = n[e];
					t.ondata(null, r, !1);
				}
				u = [];
			}, f = this.d;
			this.d = 0;
			var p = this.u.length, m = L(e, {
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
					R(o, 0, 134695760), R(o, 4, e.crc), R(o, 8, h), R(o, 12, e.size), u.push(o), m.c = h, m.b = c + h + 16, m.crc = e.crc, m.size = e.size, f && m.r(), f = 1;
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
			n += 46 + o.f.length + U(o.extra) + (o.o ? o.o.length : 0);
		}
		for (var s = new r(n + 22), c = 0, l = this.u; c < l.length; c++) {
			var o = l[c];
			W(s, e, o, o.f, o.u, -o.c - 2, t, o.o), e += 46 + o.f.length + U(o.extra) + (o.o ? o.o.length : 0), t += o.b;
		}
		ae(s, e, this.u.length, n, t), this.ondata(null, s, !0), this.d = 2;
	}, e.prototype.terminate = function() {
		for (var e = 0, t = this.u; e < t.length; e++) t[e].t();
		this.d = 2;
	}, e;
}();
//#endregion
//#region replace/base.ts
async function se(e = []) {
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
var q = class {
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
		let { noDecode: n, decode: r } = await se(t ?? this.#e), i = await this.handle(e, n.uint8Arrays, r.uint8Arrays), a = {}, o = 0;
		for (let e of n.names) a[e] = i[o++] ?? new Uint8Array();
		for (let e of r.names) a[e] = i[o++] ?? new Uint8Array();
		return a;
	}
	async executeToZip(e, t) {
		let { noDecode: n, decode: r } = await se(t ?? this.#e), i = await this.handle(e, n.uint8Arrays, r.uint8Arrays);
		return new Promise((e, t) => {
			let a = [], o = new K((t, n, r) => {
				n.length && a.push(n), r && new Blob(a).arrayBuffer().then((t) => {
					e(new Uint8Array(t));
				});
			}), s = 0;
			for (let e of n.names) {
				let t = new G(e, { level: 9 });
				o.add(t), t.push(i[s++] ?? new Uint8Array(), !0);
			}
			for (let e of r.names) {
				let t = new G(e, { level: 9 });
				o.add(t), t.push(i[s++] ?? new Uint8Array(), !0);
			}
			o.end();
		});
	}
	async executeMultipleParams(e, t) {
		let { noDecode: n, decode: r } = await se(t ?? this.#e), i = await this.handleMultipleParams(e, n.uint8Arrays, r.uint8Arrays), a = Array(e.length), o = 0;
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
		let { noDecode: n, decode: r } = await se(t ?? this.#e), i = await this.handleMultipleParams(e, n.uint8Arrays, r.uint8Arrays);
		return new Promise((t, a) => {
			let o = [], s = new K((e, n, r) => {
				n.length && o.push(n), r && new Blob(o).arrayBuffer().then((e) => {
					t(new Uint8Array(e));
				});
			}), c = 0;
			for (let t = 0; t < e.length; t++) {
				for (let e of n.names) {
					let n = i[c++];
					if (n.length) {
						let r = new G(t + "/" + e, { level: 9 });
						s.add(r), r.push(n, !0);
					}
				}
				for (let e of r.names) {
					let n = i[c++];
					if (n.length) {
						let r = new G(t + "/" + e, { level: 9 });
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
}, J = class {
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
export { q as n, J as t };

//# sourceMappingURL=base-CIzqVHPC.js.map