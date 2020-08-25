import { xy2expr } from './alphabet';

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

  includes(ri, ci) {
    const { list = [] } = this;
    const ref = xy2expr(ci, ri);
    return list.includes(ref);
  }
}
