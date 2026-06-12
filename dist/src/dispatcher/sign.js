import { t as e } from "../../common-B1t7Jz-V.js";
import { t } from "../../sign-Dih8N_X_.js";
import { t as n } from "../../sign-Dq1OPvbj.js";
//#region node_modules/.pnpm/template-replacement-sign-core-wasm@1.8.8/node_modules/template-replacement-sign-core-wasm/template_replacement_sign_core_wasm.js
function r(e) {
	let t, n;
	try {
		let r = F.add_media(e);
		return t = r[0], n = r[1], S(r[0], r[1]);
	} finally {
		F.__wbindgen_free(t, n, 1);
	}
}
function i(e, t) {
	return F.add_template(e, t) >>> 0;
}
function a(e, t) {
	let n = D(e, F.__wbindgen_malloc), r = P, i = D(t, F.__wbindgen_malloc), a = P;
	return F.extract_medias(n, r, i, a);
}
function o(e, t) {
	return F.extract_one_file_medias(e, t);
}
function s(e, t) {
	let n = F.extract_one_file_variable_names(e, t);
	var r = v(n[0], n[1]).slice();
	return F.__wbindgen_free(n[0], n[1] * 4, 4), r;
}
function c(e, t) {
	let n = D(e, F.__wbindgen_malloc), r = P, i = D(t, F.__wbindgen_malloc), a = P, o = F.extract_variable_names(n, r, i, a);
	var s = v(o[0], o[1]).slice();
	return F.__wbindgen_free(o[0], o[1] * 4, 4), s;
}
function l(e) {
	let t = F.file_encrypt(e);
	var n = y(t[0], t[1]).slice();
	return F.__wbindgen_free(t[0], t[1] * 1, 1), n;
}
function u(e) {
	let t = D(e, F.__wbindgen_malloc), n = P, r = F.files_encrypt(t, n);
	var i = v(r[0], r[1]).slice();
	return F.__wbindgen_free(r[0], r[1] * 4, 4), i;
}
function d(e, t) {
	let n = O(e, F.__wbindgen_malloc, F.__wbindgen_realloc), r = P, i = O(t, F.__wbindgen_malloc, F.__wbindgen_realloc), a = P, o = F.replace_batch(n, r, i, a);
	var s = v(o[0], o[1]).slice();
	return F.__wbindgen_free(o[0], o[1] * 4, 4), s;
}
function f(e, t) {
	let n = O(e, F.__wbindgen_malloc, F.__wbindgen_realloc), r = P, i = O(t, F.__wbindgen_malloc, F.__wbindgen_realloc), a = P, o = F.replace_batch_multiple_params(n, r, i, a);
	var s = v(o[0], o[1]).slice();
	return F.__wbindgen_free(o[0], o[1] * 4, 4), s;
}
function p(e) {
	return F.replace_params_encode(e);
}
function m(e) {
	return F.replace_params_encode_multiple_params(e);
}
function h() {
	return {
		__proto__: null,
		"./template_replacement_sign_core_wasm_bg.js": {
			__proto__: null,
			__wbg_Error_9dc85fe1bc224456: function(e, t) {
				return Error(S(e, t));
			},
			__wbg_Number_4779d427bae39753: function(e) {
				return Number(e);
			},
			__wbg___wbindgen_bigint_get_as_i64_8ea6736501f396b6: function(e, t) {
				let n = t, r = typeof n == "bigint" ? n : void 0;
				x().setBigInt64(e + 8, E(r) ? BigInt(0) : r, !0), x().setInt32(e + 0, !E(r), !0);
			},
			__wbg___wbindgen_boolean_get_b131b2f36d6b2f55: function(e) {
				let t = e, n = typeof t == "boolean" ? t : void 0;
				return E(n) ? 16777215 : +!!n;
			},
			__wbg___wbindgen_debug_string_56c147eb1a51f0c4: function(e, t) {
				let n = O(_(t), F.__wbindgen_malloc, F.__wbindgen_realloc), r = P;
				x().setInt32(e + 4, r, !0), x().setInt32(e + 0, n, !0);
			},
			__wbg___wbindgen_in_ce8569b2fc6f5088: function(e, t) {
				return e in t;
			},
			__wbg___wbindgen_is_bigint_df272c65456269c2: function(e) {
				return typeof e == "bigint";
			},
			__wbg___wbindgen_is_function_147961669f068cd4: function(e) {
				return typeof e == "function";
			},
			__wbg___wbindgen_is_object_3a2c414391dbf751: function(e) {
				let t = e;
				return typeof t == "object" && !!t;
			},
			__wbg___wbindgen_is_string_6541b0f6ecd4e8e5: function(e) {
				return typeof e == "string";
			},
			__wbg___wbindgen_is_undefined_4410e3c20a99fa97: function(e) {
				return e === void 0;
			},
			__wbg___wbindgen_jsval_eq_174c93ec61bab0c5: function(e, t) {
				return e === t;
			},
			__wbg___wbindgen_jsval_loose_eq_e07e3b1f5db6da6c: function(e, t) {
				return e == t;
			},
			__wbg___wbindgen_number_get_588ed6b97f0d7e14: function(e, t) {
				let n = t, r = typeof n == "number" ? n : void 0;
				x().setFloat64(e + 8, E(r) ? 0 : r, !0), x().setInt32(e + 0, !E(r), !0);
			},
			__wbg___wbindgen_string_get_fa2687d531ed17a5: function(e, t) {
				let n = t, r = typeof n == "string" ? n : void 0;
				var i = E(r) ? 0 : O(r, F.__wbindgen_malloc, F.__wbindgen_realloc), a = P;
				x().setInt32(e + 4, a, !0), x().setInt32(e + 0, i, !0);
			},
			__wbg___wbindgen_throw_bbadd78c1bac3a77: function(e, t) {
				throw Error(S(e, t));
			},
			__wbg_call_91f00ddc43e01490: function() {
				return T(function(e, t) {
					return e.call(t);
				}, arguments);
			},
			__wbg_done_6a8439e544ec6206: function(e) {
				return e.done;
			},
			__wbg_entries_5a6a7e7e0df09fe5: function(e) {
				return Object.entries(e);
			},
			__wbg_error_a6fa202b58aa1cd3: function(e, t) {
				let n, r;
				try {
					n = e, r = t, console.error(S(e, t));
				} finally {
					F.__wbindgen_free(n, r, 1);
				}
			},
			__wbg_get_44e98e27bda25b5b: function() {
				return T(function(e, t) {
					return Reflect.get(e, t);
				}, arguments);
			},
			__wbg_get_4b90d6d8c5deb5d5: function(e, t) {
				return e[t >>> 0];
			},
			__wbg_get_unchecked_46e778e3cec74b5e: function(e, t) {
				return e[t >>> 0];
			},
			__wbg_get_with_ref_key_6412cf3094599694: function(e, t) {
				return e[t];
			},
			__wbg_instanceof_ArrayBuffer_a581da923203f29f: function(e) {
				let t;
				try {
					t = e instanceof ArrayBuffer;
				} catch {
					t = !1;
				}
				return t;
			},
			__wbg_instanceof_Uint8Array_b6fe1ac89eba107e: function(e) {
				let t;
				try {
					t = e instanceof Uint8Array;
				} catch {
					t = !1;
				}
				return t;
			},
			__wbg_isArray_139f48e3c057ede8: function(e) {
				return Array.isArray(e);
			},
			__wbg_isSafeInteger_c22ccb4af2201fe9: function(e) {
				return Number.isSafeInteger(e);
			},
			__wbg_iterator_9b36cebf3be7b7cd: function() {
				return Symbol.iterator;
			},
			__wbg_length_68a9d5278d084f4f: function(e) {
				return e.length;
			},
			__wbg_length_fb04d16d7bdf6d4c: function(e) {
				return e.length;
			},
			__wbg_new_0b303268aa395a38: function() {
				return [];
			},
			__wbg_new_20b778a4c5c691c3: function() {
				return {};
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ Error();
			},
			__wbg_new_b06772b280cc6e52: function(e) {
				return new Uint8Array(e);
			},
			__wbg_new_from_slice_bb2d1778c0b87eb1: function(e, t) {
				return new Uint8Array(y(e, t));
			},
			__wbg_next_8cb028b6ba50743f: function() {
				return T(function(e) {
					return e.next();
				}, arguments);
			},
			__wbg_next_cfd0b146c9538df8: function(e) {
				return e.next;
			},
			__wbg_prototypesetcall_956c7493c68e29b4: function(e, t, n) {
				Uint8Array.prototype.set.call(y(e, t), n);
			},
			__wbg_set_6be42768c690e380: function(e, t, n) {
				e[t] = n;
			},
			__wbg_set_da33c120a6584674: function(e, t, n) {
				e[t >>> 0] = n;
			},
			__wbg_stack_3b0d974bbf31e44f: function(e, t) {
				let n = t.stack, r = O(n, F.__wbindgen_malloc, F.__wbindgen_realloc), i = P;
				x().setInt32(e + 4, i, !0), x().setInt32(e + 0, r, !0);
			},
			__wbg_value_3d3defe09fb1ffca: function(e) {
				return e.value;
			},
			__wbindgen_cast_0000000000000001: function(e) {
				return e;
			},
			__wbindgen_cast_0000000000000002: function(e, t) {
				return S(e, t);
			},
			__wbindgen_cast_0000000000000003: function(e) {
				return BigInt.asUintN(64, e);
			},
			__wbindgen_init_externref_table: function() {
				let e = F.__wbindgen_externrefs, t = e.grow(4);
				e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
			}
		}
	};
}
function g(e) {
	let t = F.__externref_table_alloc();
	return F.__wbindgen_externrefs.set(t, e), t;
}
function _(e) {
	let t = typeof e;
	if (t == "number" || t == "boolean" || e == null) return `${e}`;
	if (t == "string") return `"${e}"`;
	if (t == "symbol") {
		let t = e.description;
		return t == null ? "Symbol" : `Symbol(${t})`;
	}
	if (t == "function") {
		let t = e.name;
		return typeof t == "string" && t.length > 0 ? `Function(${t})` : "Function";
	}
	if (Array.isArray(e)) {
		let t = e.length, n = "[";
		t > 0 && (n += _(e[0]));
		for (let r = 1; r < t; r++) n += ", " + _(e[r]);
		return n += "]", n;
	}
	let n = /\[object ([^\]]+)\]/.exec(toString.call(e)), r;
	if (n && n.length > 1) r = n[1];
	else return toString.call(e);
	if (r == "Object") try {
		return "Object(" + JSON.stringify(e) + ")";
	} catch {
		return "Object";
	}
	return e instanceof Error ? `${e.name}: ${e.message}\n${e.stack}` : r;
}
function v(e, t) {
	e >>>= 0;
	let n = x(), r = [];
	for (let i = e; i < e + 4 * t; i += 4) r.push(F.__wbindgen_externrefs.get(n.getUint32(i, !0)));
	return F.__externref_drop_slice(e, t), r;
}
function y(e, t) {
	return e >>>= 0, w().subarray(e / 1, e / 1 + t);
}
var b = null;
function x() {
	return (b === null || b.buffer.detached === !0 || b.buffer.detached === void 0 && b.buffer !== F.memory.buffer) && (b = new DataView(F.memory.buffer)), b;
}
function S(e, t) {
	return M(e >>> 0, t);
}
var C = null;
function w() {
	return (C === null || C.byteLength === 0) && (C = new Uint8Array(F.memory.buffer)), C;
}
function T(e, t) {
	try {
		return e.apply(this, t);
	} catch (e) {
		let t = g(e);
		F.__wbindgen_exn_store(t);
	}
}
function E(e) {
	return e == null;
}
function D(e, t) {
	let n = t(e.length * 4, 4) >>> 0;
	for (let t = 0; t < e.length; t++) {
		let r = g(e[t]);
		x().setUint32(n + 4 * t, r, !0);
	}
	return P = e.length, n;
}
function O(e, t, n) {
	if (n === void 0) {
		let n = N.encode(e), r = t(n.length, 1) >>> 0;
		return w().subarray(r, r + n.length).set(n), P = n.length, r;
	}
	let r = e.length, i = t(r, 1) >>> 0, a = w(), o = 0;
	for (; o < r; o++) {
		let t = e.charCodeAt(o);
		if (t > 127) break;
		a[i + o] = t;
	}
	if (o !== r) {
		o !== 0 && (e = e.slice(o)), i = n(i, r, r = o + e.length * 3, 1) >>> 0;
		let t = w().subarray(i + o, i + r), a = N.encodeInto(e, t);
		o += a.written, i = n(i, r, o, 1) >>> 0;
	}
	return P = o, i;
}
var k = new TextDecoder("utf-8", {
	ignoreBOM: !0,
	fatal: !0
});
k.decode();
var A = 2146435072, j = 0;
function M(e, t) {
	return j += t, j >= A && (k = new TextDecoder("utf-8", {
		ignoreBOM: !0,
		fatal: !0
	}), k.decode(), j = t), k.decode(w().subarray(e, e + t));
}
var N = new TextEncoder();
"encodeInto" in N || (N.encodeInto = function(e, t) {
	let n = N.encode(e);
	return t.set(n), {
		read: e.length,
		written: n.length
	};
});
var P = 0, F;
function I(e, t) {
	return F = e.exports, b = null, C = null, F.__wbindgen_start(), F;
}
function L(e) {
	if (F !== void 0) return F;
	e !== void 0 && (Object.getPrototypeOf(e) === Object.prototype ? {module: e} = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
	let t = h();
	return e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e)), I(new WebAssembly.Instance(e, t), e);
}
//#endregion
//#region src/core/sign.ts
var R = (e) => (L(e), {
	add_media: r,
	add_template: i,
	extract_medias: a,
	extract_one_file_medias: o,
	extract_one_file_variable_names: s,
	extract_variable_names: c,
	file_encrypt: l,
	files_encrypt: u,
	replace_batch: d,
	replace_batch_multiple_params: f,
	replace_params_encode: p,
	replace_params_encode_multiple_params: m
}), z = async (r) => {
	if (!r.sign) throw Error("sign 字段为必填项");
	return e(await n(), t, R, r.sign);
};
//#endregion
export { z as default };

//# sourceMappingURL=sign.js.map