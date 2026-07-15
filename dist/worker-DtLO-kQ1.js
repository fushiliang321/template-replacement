import { a as e, i as t, n, t as r } from "./browser-DoSoF-_k.js";
//#region src/worker/type.ts
var i = /* @__PURE__ */ function(e) {
	return e[e.replace = 0] = "replace", e[e.replaceProgress = 1] = "replaceProgress", e[e.sign = 2] = "sign", e[e.signReply = 3] = "signReply", e[e.methodCall = 4] = "methodCall", e[e.methodCallReply = 5] = "methodCallReply", e;
}({}), a = /* @__PURE__ */ new Set(["sign", "getWasmUrl"]), o = 20, s = class {
	#e = [];
	#t;
	#n = /* @__PURE__ */ new Map();
	#r = 1;
	constructor(e, t, n) {
		this.#t = e, this.setDispatcher(e), this.getWasmUrl = () => t, n && (this.sign = n);
	}
	setDispatcher(e) {
		e.addListener((e) => {
			let t = e.data;
			switch (t.type) {
				case i.methodCallReply:
					let e = t.data;
					if (!e) return;
					let n = this.#n.get(e.replyId);
					if (!n) return;
					e.error ? n.reject(e.error) : n.resolve(e.result), this.#n.delete(e.replyId);
					break;
				case i.methodCall:
					let r = t.data, o = r.method;
					if (!a.has(o)) return;
					let s = this[o];
					if (!s) return;
					let c = s.apply(this, r.params);
					return r.replyId ? new Promise((e, t) => {
						try {
							Promise.resolve(c).then((t) => {
								e({
									type: i.methodCallReply,
									data: {
										replyId: r.replyId,
										result: t
									}
								});
							}).catch(t);
						} catch (e) {
							t(e);
						}
					}) : void 0;
			}
		}), this.#t = e, this.#r = this.#t.concurrency();
	}
	#i(e, n) {
		let r = [];
		for (let e of n) if (e instanceof Array) for (let t of e) t?.uint8Array?.buffer?.length && r.push(t.uint8Array.buffer);
		let a = t();
		return this.#t.postMessage({
			type: i.methodCall,
			data: {
				replyId: a,
				method: e,
				params: n
			}
		}, r.length ? { transfer: r } : void 0), new Promise((e, t) => {
			this.#n.set(a, {
				resolve: e,
				reject: t
			});
		});
	}
	#a(t, n) {
		let r;
		if (r = this.#r > 1 && t.length > o ? e(t, Math.ceil(t.length / Math.round(t.length / o))) : [t], n) for (let e in r) r[e] = n(r[e]);
		return r;
	}
	async #o(e) {
		e ||= this.#e;
		let t = [];
		for (let n of e) t.push(n.getTransmitFileInfo());
		return (await Promise.all(t)).filter((e) => !!e);
	}
	clear() {
		this.#e.length = 0;
	}
	async #s(e, t) {
		let n = [];
		for (let r of t) n.push(this.#i(e, r));
		let r = await Promise.all(n);
		return Object.assign({}, ...r);
	}
	addTempFile(e) {
		this.#e.push(e);
	}
	async extractVariables(e) {
		let t = await this.#o(e), n = this.#a(t, (e) => [e]);
		return this.#s("extractVariables", n);
	}
	async extractMedias(e) {
		let t = await this.#o(e), n = this.#a(t, (e) => [e]);
		return this.#s("extractMedias", n);
	}
	async sign(e) {
		return "";
	}
	async execute(e, t) {
		let n = await this.#o(t), r = this.#a(n, (t) => [e, t]);
		return this.#s("execute", r);
	}
	async executeToZip(e, t) {
		let i = await this.#o(t);
		return new Promise((t, a) => {
			let o = [], s = [], c = new r((e, n, r) => {
				n.length && s.push(n), r && new Blob(s).arrayBuffer().then((e) => {
					t(new Uint8Array(e));
				});
			});
			this.#a(i, (t) => {
				o.push(new Promise((r, i) => {
					this.#i("execute", [e, t]).then((e) => {
						for (let t of Object.keys(e)) {
							let r = new n(t, { level: 9 });
							c.add(r), r.push(e[t], !0);
						}
						r();
					}).catch(i);
				}));
			}), Promise.all(o).then(() => {
				c.end();
			});
		});
	}
	async executeMultipleParams(e, t) {
		let n = await this.#o(t), r = [];
		this.#a(n, (t) => {
			r.push(this.#i("executeMultipleParams", [e, t]));
		});
		let i = await Promise.all(r), a = Array.from({ length: e.length }, () => ({}));
		for (let e of i) for (let t = 0; t < e.length; t++) Object.assign(a[t], e[t]);
		return a;
	}
	async executeMultipleParamsToZip(e, t) {
		let i = await this.#o(t);
		return new Promise((t) => {
			let a = [], o = [], s = new r((e, n, r) => {
				n.length && o.push(n), r && new Blob(o).arrayBuffer().then((e) => {
					t(new Uint8Array(e));
				});
			});
			this.#a(i, (t) => {
				a.push(new Promise((r, i) => {
					this.#i("executeMultipleParams", [e, t]).then((e) => {
						for (let t = 0; t < e.length; t++) {
							let r = e[t];
							for (let e of Object.keys(r)) {
								let i = new n(t + "/" + e, { level: 9 });
								s.add(i), i.push(r[e], !0);
							}
						}
						r();
					}).catch(i);
				}));
			}), Promise.all(a).then(() => {
				s.end();
			});
		});
	}
	fileEncrypt(e) {
		return this.#i("fileEncrypt", [e]);
	}
	async filesEncrypt(e) {
		let t = this.#a(e), n = [];
		for (let e of t) n.push(this.#i("filesEncrypt", [e]));
		return (await Promise.all(n)).flat();
	}
	async getWasmUrl() {
		return "";
	}
}, c = class {
	#e;
	#t = 0;
	#n = [];
	#r = [];
	constructor(e, t) {
		if (this.#e = Number(t), this.#e < 1) try {
			this.#e = navigator.hardwareConcurrency < 8 ? navigator.hardwareConcurrency : 8;
		} catch {}
		this.#e < 1 && (this.#e = 1);
		for (let t = 0; t < this.#e; t++) this.#i(e);
	}
	#i(e) {
		let t = new e();
		t.onmessage = async (e) => {
			let n = [];
			for (let t of this.#r) n.push(t(e));
			let r = await Promise.all(n);
			for (let e of r) e && t.postMessage(e);
		}, this.#n.push(t);
	}
	concurrency() {
		return this.#e;
	}
	postMessage(e, t) {
		this.#n[++this.#t] || (this.#t = 0), this.#n[this.#t].postMessage(e, t);
	}
	addListener(e) {
		this.#r.push(e);
	}
	removeListener(e) {
		for (let t in this.#r) if (this.#r[t] == e) {
			this.#r.splice(t, 1);
			return;
		}
	}
};
//#endregion
export { s as n, c as t };

//# sourceMappingURL=worker-DtLO-kQ1.js.map