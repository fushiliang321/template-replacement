//#region src/index.ts
async function e(e) {
	let { default: t } = e.polyfill ? await import("./dispatcher/polyfill/general.js") : await import("./dispatcher/general.js");
	return await t();
}
async function t(e) {
	let { default: t } = e.polyfill ? await import("./dispatcher/polyfill/sign.js") : await import("./dispatcher/sign.js");
	return await t(e);
}
async function n(e) {
	let { default: t } = e.polyfill ? await import("./dispatcher/polyfill/workerGeneral.js") : await import("./dispatcher/workerGeneral.js");
	return await t(e);
}
async function r(e) {
	let { default: t } = e.polyfill ? await import("./dispatcher/polyfill/workerSign.js") : await import("./dispatcher/workerSign.js");
	return await t(e);
}
var i = (i = {}) => i.concurrency ? i.sign ? r(i) : n(i) : i.sign ? t(i) : e(i);
//#endregion
export { i as default };

//# sourceMappingURL=index.js.map