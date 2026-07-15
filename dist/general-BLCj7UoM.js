import { n as e } from "./common-g7-avgVK.js";
//#region src/replace/general.ts
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
};
//#endregion
export { t };

//# sourceMappingURL=general-BLCj7UoM.js.map