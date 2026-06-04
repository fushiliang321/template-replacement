//#region \0@oxc-project+runtime@0.133.0/helpers/esm/checkPrivateRedeclaration.js
function e(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
//#endregion
//#region \0@oxc-project+runtime@0.133.0/helpers/esm/classPrivateMethodInitSpec.js
function t(t, n) {
	e(t, n), n.add(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.133.0/helpers/esm/classPrivateFieldInitSpec.js
function n(t, n, r) {
	e(t, n), n.set(t, r);
}
//#endregion
//#region \0@oxc-project+runtime@0.133.0/helpers/esm/assertClassBrand.js
function r(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
//#endregion
//#region \0@oxc-project+runtime@0.133.0/helpers/esm/classPrivateFieldSet2.js
function i(e, t, n) {
	return e.set(r(e, t), n), n;
}
//#endregion
//#region \0@oxc-project+runtime@0.133.0/helpers/esm/classPrivateFieldGet2.js
function a(e, t) {
	return e.get(r(e, t));
}
//#endregion
//#region \0@oxc-project+runtime@0.133.0/helpers/esm/asyncToGenerator.js
function o(e, t, n, r, i, a, o) {
	try {
		var s = e[a](o), c = s.value;
	} catch (e) {
		n(e);
		return;
	}
	s.done ? t(c) : Promise.resolve(c).then(r, i);
}
function s(e) {
	return function() {
		var t = this, n = arguments;
		return new Promise(function(r, i) {
			var a = e.apply(t, n);
			function s(e) {
				o(a, r, i, s, c, "next", e);
			}
			function c(e) {
				o(a, r, i, s, c, "throw", e);
			}
			s(void 0);
		});
	};
}
//#endregion
export { n as a, r as i, a as n, t as o, i as r, s as t };
