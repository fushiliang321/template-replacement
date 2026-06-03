//#region noWorker/general.ts
var e = async (e) => {
	let { default: t } = await (e.polyfill ? import("../generalPolyfill-BvcTgAzf.js") : import("../general-BF2jz1IM.js")), n = new t();
	return await n.init(), n;
};
//#endregion
export { e as default };

//# sourceMappingURL=general.js.map