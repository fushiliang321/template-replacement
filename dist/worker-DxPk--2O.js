//#region worker/index.ts
var e = class {
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
export { e as t };

//# sourceMappingURL=worker-DxPk--2O.js.map