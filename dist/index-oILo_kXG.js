class h {
  #s;
  #t = 0;
  #e = [];
  #r = [];
  constructor(r, s) {
    if (this.#s = Number(s), this.#s < 1)
      try {
        this.#s = navigator.hardwareConcurrency < 8 ? navigator.hardwareConcurrency : 8;
      } catch {
      }
    this.#s < 1 && (this.#s = 1);
    for (let t = 0; t < this.#s; t++)
      this.#i(r);
  }
  #i(r) {
    const s = new r();
    s.onmessage = async (t) => {
      const i = [];
      for (const e of this.#r)
        i.push(e(t));
      const o = await Promise.all(i);
      for (const e of o)
        e && s.postMessage(e);
    }, this.#e.push(s);
  }
  concurrency() {
    return this.#s;
  }
  postMessage(r, s) {
    this.#e[++this.#t] || (this.#t = 0), this.#e[this.#t].postMessage(r, s);
  }
  addListener(r) {
    this.#r.push(r);
  }
  removeListener(r) {
    for (const s in this.#r)
      if (this.#r[s] == r) {
        this.#r.splice(s, 1);
        return;
      }
  }
}
export {
  h as w
};
