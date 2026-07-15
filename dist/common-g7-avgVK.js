import { n as e, r as t, t as n } from "./browser-DoSoF-_k.js";
//#region src/replace/base.ts
async function r(e = []) {
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
var i = class {
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
	async extractOneFileVariables(e, n) {
		let r = await n.getBuffer();
		if (r) {
			if (await n.type() === t.unknown && !n.isDecode) {
				console.warn("file type is unknown and not decode", n);
				return;
			}
			e[n.name] = this.core.extract_one_file_variable_names(r, n.isDecode);
		}
	}
	async extractVariables(e) {
		e ||= this.#e;
		let t = {}, n = [];
		for (let r of e) n.push(this.extractOneFileVariables(t, r));
		return await Promise.allSettled(n), t;
	}
	async extractOneFileMedias(e, n) {
		let r = await n.getBuffer();
		if (!r || await n.type() === t.unknown && !n.isDecode) return;
		let i = this.core.extract_one_file_medias(r, n.isDecode);
		if (e[n.name] = [], Array.isArray(i)) for (let { id: t, data: r } of i) t && r && e[n.name].push({
			id: t,
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
		let { noDecode: n, decode: i } = await r(t ?? this.#e), a = await this.handle(e, n.uint8Arrays, i.uint8Arrays), o = {}, s = 0;
		for (let e of n.names) o[e] = a[s++] ?? /* @__PURE__ */ new Uint8Array();
		for (let e of i.names) o[e] = a[s++] ?? /* @__PURE__ */ new Uint8Array();
		return o;
	}
	async executeToZip(t, i) {
		let { noDecode: a, decode: o } = await r(i ?? this.#e), s = await this.handle(t, a.uint8Arrays, o.uint8Arrays);
		return new Promise((t, r) => {
			let i = [], c = new n((e, n, r) => {
				n.length && i.push(n), r && new Blob(i).arrayBuffer().then((e) => {
					t(new Uint8Array(e));
				});
			}), l = 0;
			for (let t of a.names) {
				let n = new e(t, { level: 9 });
				c.add(n), n.push(s[l++] ?? /* @__PURE__ */ new Uint8Array(), !0);
			}
			for (let t of o.names) {
				let n = new e(t, { level: 9 });
				c.add(n), n.push(s[l++] ?? /* @__PURE__ */ new Uint8Array(), !0);
			}
			c.end();
		});
	}
	async executeMultipleParams(e, t) {
		let { noDecode: n, decode: i } = await r(t ?? this.#e), a = await this.handleMultipleParams(e, n.uint8Arrays, i.uint8Arrays), o = Array(e.length), s = 0;
		for (let t = 0; t < e.length; t++) {
			let e = {};
			for (let t of n.names) {
				let n = a[s++];
				n.length && (e[t] = n);
			}
			for (let t of i.names) {
				let n = a[s++];
				n.length && (e[t] = n);
			}
			o[t] = e;
		}
		return o;
	}
	async executeMultipleParamsToZip(t, i) {
		let { noDecode: a, decode: o } = await r(i ?? this.#e), s = await this.handleMultipleParams(t, a.uint8Arrays, o.uint8Arrays);
		return new Promise((r, i) => {
			let c = [], l = new n((e, t, n) => {
				t.length && c.push(t), n && new Blob(c).arrayBuffer().then((e) => {
					r(new Uint8Array(e));
				});
			}), u = 0;
			for (let n = 0; n < t.length; n++) {
				for (let t of a.names) {
					let r = s[u++];
					if (r.length) {
						let i = new e(n + "/" + t, { level: 9 });
						l.add(i), i.push(r, !0);
					}
				}
				for (let t of o.names) {
					let r = s[u++];
					if (r.length) {
						let i = new e(n + "/" + t, { level: 9 });
						l.add(i), i.push(r, !0);
					}
				}
			}
			l.end();
		});
	}
	async fileEncrypt(e) {
		return this.core.file_encrypt(e);
	}
	async filesEncrypt(e) {
		return this.core.files_encrypt(e);
	}
}, a = (e, t, n, r) => {
	let i = new t(n(e));
	return r && (i.sign = r), i;
};
//#endregion
export { i as n, a as t };

//# sourceMappingURL=common-g7-avgVK.js.map