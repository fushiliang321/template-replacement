import { t as e } from "../../base-DxU2J59A.js";
//#region replace/general.ts
var t = class extends e {
	async handle(e, t, n) {
		let [r, i] = await e.toReplaceParams();
		return this.core.replace_batch(r, i, t, n);
	}
	async handleMultipleParams(e, t, n) {
		let r = [], i = [];
		for (let t of e) i.push(new Promise((e, n) => {
			t.toReplaceParams(r).then(([t]) => {
				e(t);
			}).catch(n);
		}));
		let a = await Promise.all(i);
		return this.core.replace_batch_multiple_params(a, r, t, n);
	}
}, n = async (e) => {
	let { default: n } = await (e.polyfill ? import("../../generalPolyfill-pm60jNMY.js") : import("../../general-35pXtgSb.js"));
	return new t(await n());
};
//#endregion
export { n as default };

//# sourceMappingURL=general.js.map