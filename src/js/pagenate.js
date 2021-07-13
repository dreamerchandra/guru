export default class Paginate {
  lastSnap = null
  static factory = {};

  constructor (key) {
    const createdObj = Paginate.factory[key];
    if (createdObj)
      return createdObj;
    Paginate.factory[key] = this;
  }

  async getNextPage (query, pageSize) {

    let finalQuery = await query.limit(pageSize)
    if (this.lastSnap) {
      finalQuery = query.startAfter(this.lastSnap)
    }

    const snaps = await finalQuery.get()
    this.lastSnap = snaps.docs[snaps.docs.length - 1]
    return snaps
  }

  invalidateLastPage () {
    this.lastSnap = null;
  }
}