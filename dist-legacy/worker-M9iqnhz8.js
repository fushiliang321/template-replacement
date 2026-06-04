import { a as e, i as t, n, o as r, r as i, t as a } from "./asyncToGenerator-CFVEAIDf.js";
//#region worker/index.ts
var o = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakSet(), d = class {
	constructor(a, d) {
		if (r(this, u), e(this, o, void 0), e(this, s, 0), e(this, c, []), e(this, l, []), i(o, this, Number(d)), n(o, this) < 1) try {
			i(o, this, navigator.hardwareConcurrency < 8 ? navigator.hardwareConcurrency : 8);
		} catch (e) {}
		n(o, this) < 1 && i(o, this, 1);
		for (let e = 0; e < n(o, this); e++) t(u, this, f).call(this, a);
	}
	concurrency() {
		return n(o, this);
	}
	postMessage(e, t) {
		var r;
		n(c, this)[i(s, this, (r = n(s, this), ++r))] || i(s, this, 0), n(c, this)[n(s, this)].postMessage(e, t);
	}
	addListener(e) {
		n(l, this).push(e);
	}
	removeListener(e) {
		for (let t in n(l, this)) if (n(l, this)[t] == e) {
			n(l, this).splice(t, 1);
			return;
		}
	}
};
function f(e) {
	var t = this;
	let r = new e();
	r.onmessage = function() {
		var e = a(function* (e) {
			let i = [];
			for (let r of n(l, t)) i.push(r(e));
			let a = yield Promise.all(i);
			for (let e of a) e && r.postMessage(e);
		});
		return function(t) {
			return e.apply(this, arguments);
		};
	}(), n(c, this).push(r);
}
//#endregion
export { d as t };

//# sourceMappingURL=worker-M9iqnhz8.js.map