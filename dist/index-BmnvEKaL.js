class h {
  #s;
  #r = 0;
  #e = [];
  #t = [];
  constructor(t, s) {
    if (this.#s = Number(s), !this.#s || this.#s < 1)
      try {
        this.#s = navigator.hardwareConcurrency < 8 ? navigator.hardwareConcurrency : 8;
      } catch {
      }
    (!this.#s || this.#s < 1) && (this.#s = 1);
    for (let r = 0; r < this.#s; r++)
      this.#i(t);
  }
  #i(t) {
    const s = new t();
    s.onmessage = async (r) => {
      const i = [];
      for (const e of this.#t)
        i.push(e(r));
      (await Promise.all(i)).forEach((e) => {
        e && s.postMessage(e);
      });
    }, this.#e.push(s);
  }
  concurrency() {
    return this.#s;
  }
  postMessage(t, s) {
    this.#e[++this.#r] || (this.#r = 0), this.#e[this.#r].postMessage(t, s);
  }
  addListener(t) {
    this.#t.push(t);
  }
  removeListener(t) {
    for (const s in this.#t)
      if (this.#t[s] == t) {
        this.#t.splice(s, 1);
        return;
      }
  }
}
export {
  h as w
};
