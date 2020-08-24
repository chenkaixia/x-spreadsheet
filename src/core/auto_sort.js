class Sort {
  constructor(ci, order) {
    this.ci = ci;
    this.order = order;
  }

  asc() {
    return this.order === 'asc';
  }

  desc() {
    return this.order === 'desc';
  }
}

export default class AutoSort {
  constructor({ ref, order, list = [] }) {
    this.ref = ref;
    this.order = order;
    this.list = list;
  }

  setData({ ref, order, list = [] }) {
    this.ref = ref;
    this.order = order;
    this.list = list;
  }

  getData() {
    if (this.active()) {
      const { ref, sort } = this;
      return { ref, sort };
    }
    return {};
  }

  setSort(ci, order) {
    this.sort = order ? new Sort(ci, order) : null;
  }

  includes(ri, ci) {
    if (this.active()) {
      return this.hrange().includes(ri, ci);
    }
    return false;
  }

  getSort(ci) {
    const { sort } = this;
    if (sort && sort.ci === ci) {
      return sort;
    }
    return null;
  }

  getFilter(ci) {
    const { filters } = this;
    for (let i = 0; i < filters.length; i += 1) {
      if (filters[i].ci === ci) {
        return filters[i];
      }
    }
    return null;
  }

  filteredRows(getCell) {
    // const ary = [];
    // let lastri = 0;
    const rset = new Set();
    const fset = new Set();
    if (this.active()) {
      const { sri, eri } = this.range();
      const { filters } = this;
      for (let ri = sri + 1; ri <= eri; ri += 1) {
        for (let i = 0; i < filters.length; i += 1) {
          const filter = filters[i];
          const cell = getCell(ri, filter.ci);
          const ctext = cell ? cell.text : '';
          if (!filter.includes(ctext)) {
            rset.add(ri);
            break;
          } else {
            fset.add(ri);
          }
        }
      }
    }
    return { rset, fset };
  }

  hrange() {
    const r = this.range();
    r.eri = r.sri;
    return r;
  }

  active() {
    return this.ref !== null;
  }
}
