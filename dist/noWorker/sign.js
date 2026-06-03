//#region noWorker/sign.ts
var e = async (e) => {
	let { default: t } = await (e.polyfill ? import("../signPolyfill-Bmon7Eny.js") : import("../sign-DrJ62mok.js")), n = new t();
	return await n.init(), n;
};
//#endregion
export { e as default };

//# sourceMappingURL=sign.js.map