//#region src/core/wasm/polyfill/general.ts
function e() {
	return import("./template_replacement_core_wasm_polyfill_bg-DJ0ptHDR.js");
}
async function t() {
	let { getWasmArrayBuffer: t } = await e();
	return await t();
}
async function n() {
	let { getWasmFile: t } = await e();
	return await t();
}
//#endregion
export { n, t };

//# sourceMappingURL=general-D9bHGGud.js.map