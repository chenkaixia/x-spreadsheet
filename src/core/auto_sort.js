import { xy2expr } from './alphabet';

const nextMaping = {
  cancel: 'asc',
  asc: 'desc',
  desc: 'cancel',
};
export default class AutoSort {
  constructor({
    ref,
    order,
    list,
    callback,
  }) {
    this.ref = ref;
    this.order = order;
    this.list = list;
    this.callback = callback;
  }

  setSort({
    ri,
    ci,
    order,
  }) {
    const ref = xy2expr(ci, ri);
    this.setData({
      ref,
      order: order || 'cancel',
    });
    this.callback({
      order,
      ref,
    });
  }

  next(name) {
    return nextMaping[name] || 'asc';
  }

  setData({
    ref,
    order,
    list,
    callback,
  }) {
    this.ref = ref || this.ref;
    this.order = order || this.order;
    this.list = list || this.list;
    this.callback = callback || this.callback;
  }

  getData() {
    const {
      ref, order, list, callback,
    } = this;
    return {
      order,
      ref,
      list,
      callback,
    };
  }

  isActived({ ri, ci }) {
    const ref = xy2expr(ci, ri);
    return this.ref === ref;
  }

  equal(ri, ci, pref) {
    const ref = xy2expr(ci, ri);
    return ref === pref;
  }

  includes(ri, ci) {
    const { list = [] } = this;
    const ref = xy2expr(ci, ri);
    return list.includes(ref);
  }
}
