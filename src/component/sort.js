import { h } from './element';
import { cssPrefix } from '../config';

const textMaping = {
  cancel: '点击升序',
  asc: '点击降序',
  desc: '取消排序',
};
export default class SortFilter {
  constructor() {
    this.sortDescIndex = 0;
    this.el = h('div', `${cssPrefix}-tip`).hide();
  }

  set({
    isActived,
    order = 'cancel',
  }) {
    const myorder = order || 'cancel';
    if (isActived) {
      this.el.html(
        textMaping[myorder],
      );
      return;
    }
    this.el.html(
      textMaping.cancel,
    );
  }

  setOffset(v) {
    this.el.offset(v).show();
  }

  hide() {
    this.el.hide();
  }
}
