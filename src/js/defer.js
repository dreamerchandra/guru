export default class Defer {
  constructor () {
    this.promise = new Promise((res, rej) => {
      this._res = res;
      this._rej = rej;
    })
  }

  resolve = (val) => {
    this._res(val)
  }

  reject = (err) => {
    this._rej(err)
  }
}