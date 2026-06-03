//#region noWorker/general.ts
var e = async (e) => {
	let { default: t } = await (e.polyfill ? import("../generalPolyfill-B0UmD-GO.js") : import("../general-CEzyGpF3.js")), n = new t();
	return await n.init(), n;
};
//#endregion
export { e as default };

//# sourceMappingURL=general.js.map