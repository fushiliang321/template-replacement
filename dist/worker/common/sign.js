import { t as e } from "../../base-DxU2J59A.js";
//#region replace/sign.ts
var t = class extends e {
	async handle(e, t, n) {
		e.add_media = this.core.add_media;
		let r = [];
		for (let e of t) r.push(this.core.add_template(e, !1));
		for (let e of n) r.push(this.core.add_template(e, !0));
		let [i] = await e.toReplaceParams(), a = {
			files: r,
			variables: i
		}, o = this.core.replace_params_encode(a), s = await this.sign(o);
		return this.core.replace_batch(s, o.data);
	}
	async handleMultipleParams(e, t, n) {
		let r = [];
		for (let t of e) t.add_media = this.core.add_media, r.push(new Promise((e, n) => {
			t.toReplaceParams().then(([t]) => {
				e(t);
			}).catch(n);
		}));
		let i = [];
		for (let e of t) i.push(this.core.add_template(e, !1));
		for (let e of n) i.push(this.core.add_template(e, !0));
		let a = {
			files: i,
			variables: await Promise.all(r)
		}, o = this.core.replace_params_encode_multiple_params(a), s = await this.sign(o);
		return this.core.replace_batch_multiple_params(s, o.data);
	}
}, n = async (e) => {
	let { default: n } = await (e.polyfill ? import("../../signPolyfill-BvgRpapI.js") : import("../../sign-DZoTVy9T.js")), r = new t(await n());
	return e.sign && (r.sign = e.sign), r;
};
//#endregion
export { n as default };

//# sourceMappingURL=sign.js.map