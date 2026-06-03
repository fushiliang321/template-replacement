//#region core/base.ts
var e = /* @__PURE__ */ new Map(), t = (t) => {
	let n = e.get(t);
	return n || (n = new Promise((e) => {
		t.default().then(() => {
			e(t);
		});
	}), e.set(t, n)), n;
};
//#endregion
export { t };

//# sourceMappingURL=base-CSS6UtgX.js.map